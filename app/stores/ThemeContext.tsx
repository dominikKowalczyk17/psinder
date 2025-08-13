import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../constants/Theme';

export type ThemeType = 'light' | 'dark';
export type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setTheme: (themeType: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@psinder_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const [theme, setCurrentTheme] = useState<Theme>(lightTheme);

  // Load saved theme preference on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme object when theme type changes
  useEffect(() => {
    setCurrentTheme(themeType === 'light' ? lightTheme : darkTheme);
  }, [themeType]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeType(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (newThemeType: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const setTheme = (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    saveThemePreference(newThemeType);
  };

  const toggleTheme = () => {
    const newThemeType = themeType === 'light' ? 'dark' : 'light';
    setTheme(newThemeType);
  };

  const value: ThemeContextType = {
    theme,
    themeType,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
