import styled from 'styled-components';
import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface NavTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

const TabContainer = styled.div<{ $variant: 'vertical' | 'horizontal' }>`
  display: flex;
  flex-direction: ${props => props.$variant === 'vertical' ? 'column' : 'row'};
  gap: ${props => props.$variant === 'vertical' ? 'var(--spacing-xs)' : 'var(--spacing-sm)'};
  padding: var(--spacing-sm);
  background: var(--bg-light);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabButton = styled.button<{ 
  $active: boolean;
  $variant: 'vertical' | 'horizontal';
  $size: 'sm' | 'md' | 'lg';
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: ${props => props.$variant === 'vertical' ? '100%' : 'auto'};
  padding: ${props => {
    switch (props.$size) {
      case 'sm': return '0.5rem 1rem';
      case 'lg': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  background: ${props => props.$active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-default)'};
  border: none;
  border-radius: 0.5rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: ${props => {
    switch (props.$size) {
      case 'sm': return '0.875rem';
      case 'lg': return '1.125rem';
      default: return '1rem';
    }
  }};
  text-align: left;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? '0.5' : '1'};
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$active ? 
      'linear-gradient(135deg, var(--color-primary), var(--color-accent))' : 
      'var(--bg-light)'};
    opacity: ${props => props.$active ? '1' : '0'};
    transition: opacity var(--transition-fast);
    z-index: 0;
  }

  &:hover {
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
    background: ${props => props.$active ? 
      'var(--color-primary)' : 
      'var(--bg-light)'};
    box-shadow: ${props => props.$disabled ? 'none' : 'var(--shadow-sm)'};
  }

  &:active {
    transform: translateY(0);
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: ${props => props.$variant === 'vertical' ? 'column' : 'row'};
    align-items: ${props => props.$variant === 'vertical' ? 'flex-start' : 'center'};
    gap: ${props => props.$variant === 'vertical' ? '0.25rem' : '0.5rem'};
  }

  .icon {
    font-size: ${props => {
      switch (props.$size) {
        case 'sm': return '1rem';
        case 'lg': return '1.5rem';
        default: return '1.25rem';
      }
    }};
    opacity: ${props => props.$active ? '1' : '0.7'};
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    font-weight: 600;
    color: inherit;
  }

  .description {
    font-size: ${props => {
      switch (props.$size) {
        case 'sm': return '0.75rem';
        case 'lg': return '0.875rem';
        default: return '0.75rem';
      }
    }};
    opacity: 0.8;
    color: inherit;
  }
`;

const Badge = styled.span<{ $variant: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.$variant) {
      case 'success': return 'var(--color-secondary)';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return 'var(--color-primary)';
    }
  }};
  color: white;
`;

export const NavTabs: React.FC<NavTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  variant = 'horizontal',
  size = 'md'
}) => {
  return (
    <TabContainer $variant={variant}>
      {tabs.map(tab => (
        <TabButton
          key={tab.id}
          $active={activeTab === tab.id}
          $variant={variant}
          $size={size}
          $disabled={tab.disabled || false}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          title={tab.disabled ? 'This feature is not available yet' : undefined}
        >
          <div className="content">
            {tab.icon && <span className="icon">{tab.icon}</span>}
            <div className="info">
              <span className="label">{tab.label}</span>
              {tab.description && (
                <span className="description">{tab.description}</span>
              )}
            </div>
          </div>
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default NavTabs; 