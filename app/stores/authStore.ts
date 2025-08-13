// app/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDto } from '../api/generated';

interface AuthState {
  isAuthenticated: boolean;
  user: UserDto | null;
  setUser: (user: UserDto) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false })
    }),
    { 
      name: 'psinder-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);