import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnOverlayClick?: boolean;
}

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 32rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;
  
  @media (max-width: 640px) {
    max-width: 95vw;
    padding: 1rem;
    border-radius: 0.75rem;
  }
`;

export const ModalPrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563EB;
  }
`;

export const ModalSecondaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  min-height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
  padding-right: 2rem; // Make room for close button
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: #1F2937;
  }
`;

export const Modal = ({ isOpen, onClose, children, title, closeOnOverlayClick = false }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <ModalContainer isOpen={isOpen} onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </ModalContent>
      </ModalContainer>
    </>
  );
}; 