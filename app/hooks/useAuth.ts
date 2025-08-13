// app/hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserRequest, LoginRequest } from '../api/generated';
import { UserService } from '../api/services/userService';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { setUser, clearUser } = useAuthStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => UserService.login(credentials),
    onSuccess: (response) => {
      // Note: Your backend's login only returns AuthResponse with token
      // You'll need to fetch user data separately or modify backend to return user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: (userData: CreateUserRequest) => UserService.register(userData),
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const logout = async () => {
    clearUser();
    // await UserService.logout(); // implement this
    queryClient.clear();
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error
  };
};