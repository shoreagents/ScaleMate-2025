import styled, { css } from 'styled-components';

export const AdminButton = styled.button<{
  $primary?: boolean;
  $danger?: boolean;
  $iconOnly?: boolean;
  $fab?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ $iconOnly, $fab }) =>
    $fab ? '0' : $iconOnly ? '0.5rem' : '0 1rem'};
  height: ${({ $fab }) => ($fab ? '3.5rem' : '2.5rem')};
  width: ${({ $fab, $iconOnly }) => ($fab ? '3.5rem' : $iconOnly ? '2.5rem' : 'auto')};
  border-radius: ${({ $fab }) => ($fab ? '50%' : '0.5rem')};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  box-shadow: ${({ $fab }) =>
    $fab ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'};
  z-index: ${({ $fab }) => ($fab ? 1000 : 'auto')};
  position: ${({ $fab }) => ($fab ? 'fixed' : 'static')};
  bottom: ${({ $fab }) => ($fab ? '2rem' : 'auto')};
  right: ${({ $fab }) => ($fab ? '2rem' : 'auto')};

  ${({ $primary }) =>
    $primary &&
    css`
      background-color: #3B82F6;
      color: white;
      border: none;
      &:hover {
        background-color: #2563EB;
      }
    `}
  ${({ $danger }) =>
    $danger &&
    css`
      background-color: #EF4444;
      color: white;
      border: none;
      &:hover {
        background-color: #DC2626;
      }
    `}
  &:hover {
    background-color: ${({ $primary, $danger, $fab }) =>
      $primary || $danger || $fab ? undefined : '#F9FAFB'};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 888px) {
    width: ${({ $fab }) => ($fab ? '3.5rem' : '100%')};
    padding: ${({ $iconOnly, $fab }) =>
      $fab ? '0' : $iconOnly ? '0.5rem' : '0 0.5rem'};
  }
`; 