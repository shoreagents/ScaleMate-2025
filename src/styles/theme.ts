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
    };
    text: {
      primary: string;
      secondary: string;
    };
    border: string;
    error: string;
    success: string;
    disabled: string;
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
      secondary: '#F9FAFB'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    },
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    disabled: '#9CA3AF'
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
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme; 