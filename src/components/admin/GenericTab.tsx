import React from 'react';
import styled from 'styled-components';
import type { ScaleMateTheme } from '@/styles/theme';

interface ThemeProps {
  theme: ScaleMateTheme;
}

const Card = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CardTitle = styled.h2<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ComingSoon = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '🚧';
    font-size: 1.25rem;
  }
`;

interface GenericTabProps {
  /** The title to display in the card header */
  title: string;
  /** Optional loading state */
  isLoading?: boolean;
  /** Optional custom message to display instead of "Content coming soon..." */
  message?: string;
  /** Optional className for styling */
  className?: string;
}

/**
 * GenericTab is a placeholder component used in the admin dashboard
 * for features that are under development or coming soon.
 * 
 * @example
 * ```tsx
 * <GenericTab title="Achievements Management" />
 * <GenericTab 
 *   title="Notifications" 
 *   message="Custom notification system coming soon..." 
 * />
 * ```
 */
const GenericTab: React.FC<GenericTabProps> = ({ 
  title, 
  isLoading = false,
  message = 'Content coming soon...',
  className 
}) => {
  return (
    <Card 
      className={className}
      role="region"
      aria-label={`${title} section`}
    >
      <CardTitle>{title}</CardTitle>
      <ComingSoon>
        {isLoading ? 'Loading...' : message}
      </ComingSoon>
    </Card>
  );
};

export default GenericTab; 