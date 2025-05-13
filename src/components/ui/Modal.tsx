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

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.75);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 70;
  backdrop-filter: blur(2px);
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

const ModalContent = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 32rem;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #E5E7EB;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 640px) {
    transform: scale(1);
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
      <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick} />
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