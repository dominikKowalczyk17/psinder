/**
 * Theme constants for consistent styling across the app with light/dark mode support
 */

// Carnation color palette
const carnation = {
  50: '#fff1f1',
  100: '#ffe1e1',
  200: '#ffc7c7',
  300: '#ffa0a0',
  400: '#ff6b6b',
  500: '#f83b3b',
  600: '#e51d1d',
  700: '#c11414',
  800: '#a01414',
  900: '#841818',
  950: '#480707',
};

// Light and Dark theme configurations
export const lightTheme = {
  // Primary brand colors using carnation palette
  primary: carnation[400],        // #ff6b6b - Main brand color
  primaryLight: carnation[300],   // #ffa0a0 - Light variant
  primaryDark: carnation[600],    // #e51d1d - Dark variant
  primarySubtle: carnation[100],  // #ffe1e1 - Very light variant for backgrounds
  
  // Text colors
  text: {
    primary: '#1A1A1A',         // Main headings and important text
    secondary: '#4A4A4A',       // Secondary headings and medium importance text
    tertiary: '#6B6B6B',        // Body text and descriptions
    quaternary: '#8A8A8A',      // Subtle text and captions
    inverse: '#FFFFFF',         // White text for dark backgrounds
    accent: carnation[500],     // #f83b3b - Accent text (stronger brand color)
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: carnation[50],    // #fff1f1 - Very subtle carnation tint
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // UI colors
  border: {
    light: '#E0E0E0',
    medium: carnation[200],     // #ffc7c7 - Carnation-tinted borders
    dark: carnation[300],       // #ffa0a0 - Stronger carnation borders
  },
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: carnation[600],       // #e51d1d - Use carnation for error states
  info: '#2196F3',
  
  // Energy level colors
  energy: {
    low: '#4CAF50',
    medium: '#FF9800',
    high: carnation[500],      // #f83b3b - Use carnation for high energy
    veryHigh: carnation[700],  // #c11414 - Darker carnation for very high energy
  },
};

export const darkTheme = {
  // Primary brand colors using carnation palette (slightly adjusted for dark mode)
  primary: carnation[400],        // #ff6b6b - Main brand color
  primaryLight: carnation[300],   // #ffa0a0 - Light variant
  primaryDark: carnation[600],    // #e51d1d - Dark variant
  primarySubtle: carnation[950],  // #480707 - Dark variant for backgrounds
  
  // Text colors (inverted for dark mode)
  text: {
    primary: '#FFFFFF',         // Main headings and important text
    secondary: '#E0E0E0',       // Secondary headings and medium importance text
    tertiary: '#B0B0B0',        // Body text and descriptions
    quaternary: '#8A8A8A',      // Subtle text and captions
    inverse: '#1A1A1A',         // Dark text for light backgrounds
    accent: carnation[300],     // #ffa0a0 - Lighter accent for dark mode
  },
  
  // Background colors (dark mode)
  background: {
    primary: '#121212',         // Dark primary background
    secondary: '#1E1E1E',       // Slightly lighter dark background
    tertiary: carnation[950],   // #480707 - Very dark carnation tint
    card: '#1E1E1E',           // Card background
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // UI colors (adjusted for dark mode)
  border: {
    light: '#333333',
    medium: carnation[800],     // #a01414 - Dark carnation borders
    dark: carnation[700],       // #c11414 - Stronger dark carnation borders
  },
  
  // Status colors (adjusted for dark mode visibility)
  success: '#66BB6A',
  warning: '#FFA726',
  error: carnation[400],       // #ff6b6b - Brighter error for dark mode
  info: '#42A5F5',
  
  // Energy level colors (adjusted for dark mode)
  energy: {
    low: '#66BB6A',
    medium: '#FFA726',
    high: carnation[400],      // #ff6b6b - Brighter for dark mode
    veryHigh: carnation[300],  // #ffa0a0 - Even brighter for visibility
  },
};

// Default export for backward compatibility - will be overridden by theme context
export const Colors = lightTheme;

export const Typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
  },
  
  // Font weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Helper function to get energy color
export const getEnergyColor = (energy: string) => {
  switch (energy.toLowerCase()) {
    case 'low': return Colors.energy.low;
    case 'medium': return Colors.energy.medium;
    case 'high': return Colors.energy.high;
    case 'very high': return Colors.energy.veryHigh;
    default: return Colors.text.quaternary;
  }
};

// Helper function to get carnation color by shade
export const getCarnationColor = (shade: keyof typeof carnation) => {
  return carnation[shade];
};

// Helper function to create carnation color with opacity
export const getCarnationWithOpacity = (shade: keyof typeof carnation, opacity: number) => {
  const color = carnation[shade];
  const rgb = color.replace('#', '');
  const r = parseInt(rgb.substr(0, 2), 16);
  const g = parseInt(rgb.substr(2, 2), 16);
  const b = parseInt(rgb.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
