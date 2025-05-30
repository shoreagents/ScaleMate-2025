import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'accent';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  'data-testid'?: string;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  disabled?: boolean;
}

// Design system colors from design.md
const colors = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  secondary: '#6B7280',
  secondaryDark: '#4B5563',
  success: '#10B981',
  successDark: '#059669',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  warning: '#F59E0B',
  warningDark: '#D97706',
  info: '#3B82F6',
  infoDark: '#2563EB',
  light: '#F3F4F6',
  dark: '#1F2937',
  textLight: '#F9FAFB',
  textDark: (props: { theme: { colors: { text: { primary: string } } } }) => props.theme.colors.text.primary,
  border: '#E5E7EB',
  disabled: '#9CA3AF',
  accent: '#8B5CF6',
  accentHover: '#7C3AED'
};

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${colors.primary};
        color: ${colors.textLight};
        &:hover:not(:disabled) {
          background-color: ${colors.primaryDark};
          transform: translateY(-2px);
        }
      `;
    case 'secondary':
      return css`
        background-color: ${colors.secondary};
        color: ${colors.textLight};
        &:hover:not(:disabled) {
          background-color: ${colors.secondaryDark};
          transform: translateY(-2px);
        }
      `;
    case 'accent':
      return css`
        background-color: ${colors.accent};
        color: ${colors.textLight};
        &:hover:not(:disabled) {
          background-color: ${colors.accentHover};
          transform: translateY(-2px);
        }
      `;
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: var(--transition-normal);
  
  ${props => getButtonStyles(props.$variant)}
  ${props => getButtonSize(props.$size)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &.btn-loading {
    position: relative;
    color: transparent;
    
    &::after {
      content: "";
      position: absolute;
      width: 1rem;
      height: 1rem;
      top: 50%;
      left: 50%;
      margin: -0.5rem 0 0 -0.5rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: button-spin 0.6s linear infinite;
    }
  }

  @keyframes button-spin {
    to { transform: rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 