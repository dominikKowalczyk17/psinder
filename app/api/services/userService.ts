// app/api/services/userService.ts
import apiAdapter from '../client/ApiAdapter';
import { AuthResponse, CreateUserRequest, LoginRequest, UserDto } from '../generated';

export class UserService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiAdapter.auth.login(credentials);
    
    if (response.data.token) {
      await apiAdapter.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  static async register(userData: CreateUserRequest): Promise<UserDto> {
    const response = await apiAdapter.auth.register(userData);
    return response.data;
  }

  static async getAllUsers(): Promise<UserDto[]> {
    const response = await apiAdapter.users.getAllUsers();
    return response.data;
  }

  static async getUserById(id: number): Promise<UserDto> {
    const response = await apiAdapter.users.getUserById(id);
    return response.data;
  }

  static async updateUser(id: number, userData: CreateUserRequest): Promise<UserDto> {
    const response = await apiAdapter.users.updateUser(id, userData);
    return response.data;
  }

  static async deleteUser(id: number): Promise<void> {
    await apiAdapter.users.deleteUser(id);
  }
}