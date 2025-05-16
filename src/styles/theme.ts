import { DefaultTheme } from 'styled-components';

// Define our theme type explicitly
export type ScaleMateTheme = {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      hover: string;
      active: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    border: string;
    error: string;
    success: string;
    disabled: string;
    error15: string; // 15% opacity version of error color
    primary15: string; // 15% opacity version of primary color
    success15: string;
    warning: string;
    warning15: string;
    info: string;
    info15: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  fonts: {
    sans: string;
    weights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

// Extend the DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme extends ScaleMateTheme {}
}

export const theme: ScaleMateTheme = {
  colors: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    secondary: '#6B7280',
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
      hover: '#F1F5F9',
      active: '#E2E8F0'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF'
    },
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    disabled: '#9CA3AF',
    error15: '#EF444426', // 15% opacity version of error color
    primary15: '#3B82F626', // 15% opacity version of primary color
    success15: '#10B98126',
    warning: '#F59E0B',
    warning15: '#F59E0B26',
    info: '#3B82F6',
    info15: '#3B82F626'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease'
  },
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme; 