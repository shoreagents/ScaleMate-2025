import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.75);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  min-height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: visible;
  transform: translateY(0);
  transition: transform 0.2s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: color 0.2s;
  z-index: 2;
  &:hover {
    color: #111827;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const ModalHeader = styled.div`
  padding: 24px 32px 12px 32px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const ModalBody = styled.div`
  padding: 32px;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <ModalContainer $isOpen={isOpen} onClick={handleOverlayClick}>
        <ModalContent className={className} ref={modalRef}>
          {showCloseButton && (
            <CloseButton onClick={onClose} aria-label="Close modal">
              <FaTimes size={20} />
            </CloseButton>
          )}
          {title && (
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalContainer>
    </>
  );
};
