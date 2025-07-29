import styled from 'styled-components';

// Base container component
export const Container = styled.div<{ $maxWidth?: string; $padding?: string }>`
  max-width: ${props => props.$maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.$padding || '0 1rem'};
  
  @media (min-width: 768px) {
    padding: ${props => props.$padding || '0 2rem'};
  }
`;

// Card component for weather displays
export const Card = styled.div<{ $elevation?: 'sm' | 'md' | 'lg' }>`
  background: #FFFFFF;
  border-radius: 1rem;
  box-shadow: ${props => {
    const shadows = {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    };
    return shadows[props.$elevation || 'md'];
  }};
  padding: 1.5rem;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

// Grid layout component
export const Grid = styled.div<{ $columns?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 1}, 1fr);
  gap: ${props => props.$gap || '1rem'};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => props.$columns || 1}, 1fr);
  }
`;

// Flex layout component
export const Flex = styled.div<{ 
  $direction?: 'row' | 'column'; 
  $justify?: string; 
  $align?: string; 
  $gap?: string;
  $wrap?: 'wrap' | 'nowrap';
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  justify-content: ${props => props.$justify || 'flex-start'};
  align-items: ${props => props.$align || 'stretch'};
  gap: ${props => props.$gap || '0'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
`;

// Button component
export const Button = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'outline'; 
  $size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props => {
    const sizeMap = {
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    };
    
    const variantMap = {
      primary: {
        backgroundColor: '#3B82F6',
        color: 'white',
        border: '',
        hoverBg: '#2563EB',
        hoverColor: 'white',
      },
      secondary: {
        backgroundColor: '#10B981',
        color: 'white',
        border: '',
        hoverBg: '#059669',
        hoverColor: 'white',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#3B82F6',
        border: '2px solid #3B82F6',
        hoverBg: '#3B82F6',
        hoverColor: 'white',
      },
    };
    
    const size = sizeMap[props.$size || 'md'];
    const variant = variantMap[props.$variant || 'primary'];
    
    return `
      padding: ${size.padding};
      font-size: ${size.fontSize};
      background-color: ${variant.backgroundColor};
      color: ${variant.color};
      ${variant.border ? `border: ${variant.border};` : ''}
      &:hover {
        background-color: ${variant.hoverBg};
        color: ${variant.hoverColor};
      }
    `;
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Text components
export const Text = styled.span<{ 
  $size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; 
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  $color?: string;
}>`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: ${props => {
    const sizes = {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    };
    return sizes[props.$size || 'base'];
  }};
  font-weight: ${props => {
    const weights = {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    };
    return weights[props.$weight || 'normal'];
  }};
  color: ${props => props.$color || '#1F2937'};
`;

// Heading component
export const Heading = styled.h1<{ 
  $level?: 1 | 2 | 3 | 4 | 5 | 6; 
  $color?: string;
}>`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  color: ${props => props.$color || '#1F2937'};
  margin: 0;
  
  font-size: ${props => {
    const sizes = {
      1: '2.25rem',
      2: '1.875rem',
      3: '1.5rem',
      4: '1.25rem',
      5: '1.125rem',
      6: '1rem',
    };
    return sizes[props.$level || 1];
  }};
`;

// Loading spinner component
export const Spinner = styled.div<{ $size?: string; $color?: string }>`
  width: ${props => props.$size || '2rem'};
  height: ${props => props.$size || '2rem'};
  border: 3px solid #9CA3AF;
  border-top: 3px solid ${props => props.$color || '#3B82F6'};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Error message component
export const ErrorMessage = styled.div`
  background: #EF444420;
  color: #EF4444;
  border: 1px solid #EF4444;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.875rem;
`; 