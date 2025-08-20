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
    await UserService.logout(); 
    queryClient.clear();
  };

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error
  };
};