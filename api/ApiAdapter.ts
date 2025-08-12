import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

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
  private readonly TOKEN_KEY = 'psinder_jwt_token';

  constructor(config: ApiAdapterConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.setupRequestInterceptors();
    this.setupResponseInterceptors();
    
    this.loadStoredToken();
  }

  /**
   * Load JWT token from secure storage on app startup
   * TODO: Should we validate the token with backend or just assume it's valid?
   */
  private async loadStoredToken(): Promise<void> {
    try {
      const storedToken = await SecureStore.getItemAsync(this.TOKEN_KEY);
      if (storedToken) {
        this.authToken = storedToken;
        // TODO: Should we validate token with backend here?
        // What if it's expired? Should we auto-refresh?
      }
    } catch (error) {
      // TODO: How should we handle SecureStore errors?
      console.error('Failed to load stored token:', error);
    }
  }

  private setupRequestInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Only add auth token to protected endpoints
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
  }

  private setupResponseInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (__DEV__) {
          console.log(`API Response: ${response.status} ${response.config.url}`);
        }
        return response;
      },
      (error) => {
        if (__DEV__) {
          console.error(`API Error:`, error.response?.status, error.response?.data);
        }
        return Promise.reject(this.handleError(error));
      }
    );
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

  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post(endpoint, data, config);
    return response.data;
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(endpoint, config);
    return response.data;
  }

  /**
   * Store JWT token securely and update instance
   * TODO: Should we also store token expiration time?
   */
  async setAuthToken(token: string): Promise<void> {
    this.authToken = token;
    try {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token securely:', error);
      // TODO: Should we fallback to AsyncStorage or fail completely?
    }
  }

  /**
   * Clear JWT token from memory and storage
   */
  async clearAuthToken(): Promise<void> {
    this.authToken = null;
    try {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear stored token:', error);
    }
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  /**
   * Check if user is currently authenticated
   * TODO: Should this also validate token expiration?
   */
  isAuthenticated(): boolean {
    return this.authToken !== null;
  }
}

const apiAdapter = new ApiAdapter({
  baseURL: 'http://192.168.0.185:8080/api',
  timeout: 10000,
});

export default apiAdapter;