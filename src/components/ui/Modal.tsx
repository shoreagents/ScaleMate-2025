import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
  z-index: 70;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  min-height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const ModalContent = styled.div<{ $size?: ModalProps['size'] }>`
  position: relative;
  width: 100%;
  max-width: ${props => {
    switch (props.$size) {
      case 'sm': return '24rem';
      case 'md': return '32rem';
      case 'lg': return '48rem';
      case 'xl': return '64rem';
      case 'full': return '100%';
      default: return '32rem';
    }
  }};
  max-height: calc(100vh - 2rem);
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
  transform: translateY(0);
  transition: transform 0.2s ease-out;

  @media (min-width: 640px) {
    max-height: calc(100vh - 3rem);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: #6b7280;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
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
        <ModalContent $size={size} className={className} ref={modalRef}>
          {(title || showCloseButton) && (
            <ModalHeader>
              {title && <ModalTitle>{title}</ModalTitle>}
              {showCloseButton && (
                <CloseButton onClick={onClose} aria-label="Close modal">
                  <XMarkIcon className="h-6 w-6" />
                </CloseButton>
              )}
            </ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalContainer>
    </>
  );
}; 