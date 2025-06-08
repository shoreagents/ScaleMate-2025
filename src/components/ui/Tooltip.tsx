import React from 'react';
import styled from 'styled-components';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

const TooltipContainer = styled.div<{ $position: TooltipProps['position'] }>`
  position: relative;
  display: inline-block;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    padding: 4px 8px;
    background-color: #1F2937;
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
    z-index: 1000;

    ${props => {
      switch (props.$position) {
        case 'top':
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-4px);
            margin-bottom: 4px;
          `;
        case 'bottom':
          return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(4px);
            margin-top: 4px;
          `;
        case 'left':
          return `
            right: 100%;
            top: 50%;
            transform: translateY(-50%) translateX(-4px);
            margin-right: 4px;
          `;
        case 'right':
          return `
            left: 100%;
            top: 50%;
            transform: translateY(-50%) translateX(4px);
            margin-left: 4px;
          `;
        default:
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-4px);
            margin-bottom: 4px;
          `;
      }
    }}
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    transform: ${props => {
      switch (props.$position) {
        case 'top':
          return 'translateX(-50%) translateY(-8px)';
        case 'bottom':
          return 'translateX(-50%) translateY(8px)';
        case 'left':
          return 'translateY(-50%) translateX(-8px)';
        case 'right':
          return 'translateY(-50%) translateX(8px)';
        default:
          return 'translateX(-50%) translateY(-8px)';
      }
    }};
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  position = 'top', 
  children, 
  className 
}) => {
  return (
    <TooltipContainer 
      $position={position} 
      data-tooltip={text}
      className={className}
    >
      {children}
    </TooltipContainer>
  );
}; 