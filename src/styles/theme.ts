export const theme = {
  colors: {
    primary: '#3B82F6', // Blue
    secondary: '#10B981', // Green
    accent: '#F59E0B', // Amber
    background: '#F8FAFC', // Light gray
    surface: '#FFFFFF', // White
    text: {
      primary: '#1F2937', // Dark gray
      secondary: '#6B7280', // Medium gray
      light: '#9CA3AF', // Light gray
    },
    weather: {
      sunny: '#F59E0B',
      cloudy: '#6B7280',
      rainy: '#3B82F6',
      snowy: '#E5E7EB',
    },
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    xxl: '3rem',   // 48px
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem',  // 8px
    lg: '1rem',    // 16px
    xl: '1.5rem',  // 24px
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export type Theme = typeof theme; 