import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  AuthControllerApi,
  DogControllerApi,
  UserControllerApi
} from '../generated';
import { Configuration } from '../generated/configuration';

interface ApiAdapterConfig {
  baseURL: string;
  timeout?: number;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiAdapter {
  private axiosInstance: AxiosInstance;
  private authToken: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: { resolve: Function; reject: Function }[] = [];
  private readonly TOKEN_KEY = 'psinder_jwt_token';
  private readonly REFRESH_TOKEN_KEY = 'psinder_refresh_token';

  // Generated API clients
  public auth: AuthControllerApi;
  public dogs: DogControllerApi;
  public users: UserControllerApi;

  constructor(config: ApiAdapterConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.setupInterceptors();
    this.loadStoredToken();
    
    // Initialize generated API clients with configured axios instance
    const configuration = new Configuration({
      basePath: config.baseURL,
      accessToken: () => this.authToken || ''
    });
    
    this.auth = new AuthControllerApi(configuration, config.baseURL, this.axiosInstance);
    this.dogs = new DogControllerApi(configuration, config.baseURL, this.axiosInstance);
    this.users = new UserControllerApi(configuration, config.baseURL, this.axiosInstance);
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.authToken && !this.isAuthEndpoint(config.url || '')) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        
        if (__DEV__) {
          console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (__DEV__) {
          console.log(`API Response: ${response.status} ${response.config.url}`);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.axiosInstance(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshTokens();
            this.processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          } catch (refreshError) {
            await this.clearAuthToken();
            this.processQueue(refreshError, null);
            throw new Error('Session expired. Please login again.');
          } finally {
            this.isRefreshing = false;
          }
        }

        if (__DEV__) {
          console.error(`API Error:`, error.response?.status, error.response?.data);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: any, token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      error ? reject(error) : resolve(token);
    });
    this.failedQueue = [];
  }

  private isAuthEndpoint(url: string): boolean {
    return url.includes('/auth/');
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          return {
            message: data.message || 'Invalid input data',
            status,
            code: 'VALIDATION_ERROR'
          };
        
        case 401:
          this.clearAuthToken();
          return {
            message: 'Session expired. Please login again.',
            status,
            code: 'UNAUTHORIZED'
          };
        
        case 409:
          return {
            message: 'User already exists with that name',
            status,
            code: 'CONFLICT'
          };
        
        case 500:
          return {
            message: 'Server error. Please try again later.',
            status,
            code: 'SERVER_ERROR'
          };
        
        default:
          return {
            message: data.message || 'Something went wrong',
            status,
            code: 'UNKNOWN_ERROR'
          };
      }
    } else if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR'
      };
    } else {
      return {
        message: error.message || 'Unknown error occurred',
        code: 'UNKNOWN_ERROR'
      };
    }
  }

  private async loadStoredToken(): Promise<void> {
    try {
      const [storedToken, storedRefreshToken] = await Promise.all([
        SecureStore.getItemAsync(this.TOKEN_KEY),
        SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY)
      ]);

      if (storedToken) {
        this.authToken = storedToken;
      }

      if (storedRefreshToken) {
        this.refreshToken = storedRefreshToken;
      }
    } catch (error) {
      console.error('Failed to load stored token:', error);
    }
  }

  async setAuthToken(token: string): Promise<void> {
    this.authToken = token;
    try {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token securely:', error);
    }
  }

  async clearAuthToken(): Promise<void> {
    this.authToken = null;
    this.refreshToken = null;
    try {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
      await SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear stored token:', error);
    }
  }

  private async refreshTokens(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.auth.refreshToken({ refreshToken });

    if (!response.data.accessToken) {
      throw new Error('No access token received from refresh');
    }

    await this.setAuthToken(response.data.accessToken);

    if (response.data.refreshToken) {
      await this.setRefreshToken(response.data.refreshToken);
    }

    return response.data.accessToken;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  isAuthenticated(): boolean {
    return this.authToken !== null;
  }

  async setRefreshToken(token: string): Promise<void> {
    this.refreshToken = token;
    try {
      await SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store refresh token securely: ', error)
    }
  }
}

// Create singleton instance
const apiAdapter = new ApiAdapter({
  baseURL: 'http://192.168.0.185:8080',
  timeout: 10000,
});

export default apiAdapter;