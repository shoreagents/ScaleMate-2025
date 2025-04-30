import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.75);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 50;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: auto;
  z-index: 50;
  display: flex;
  min-height: 100%;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 32rem;
  position: relative;
  transform: scale(1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #E5E7EB;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
`;

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick} />
      <ModalContainer onClick={handleOverlayClick}>
        <ModalContent>
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </ModalContent>
      </ModalContainer>
    </>
  );
}; 