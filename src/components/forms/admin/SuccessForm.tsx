import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';
import { Modal } from '../../ui/Modal';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onModalStateChange?: (isOpen: boolean) => void;
}

const SuccessModal: FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  onModalStateChange,
}) => {
  useEffect(() => {
    if (isOpen) {
      onModalStateChange?.(true);
    }
  }, [isOpen, onModalStateChange]);

  const handleClose = () => {
    onClose();
    onModalStateChange?.(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Success"
      size="sm"
      showCloseButton={false}
    >
      <SuccessContainer>
        <SuccessText>{message}</SuccessText>
      </SuccessContainer>

      <ButtonGroup>
        <CloseModalButton type="button" onClick={handleClose}>
          Continue
        </CloseModalButton>
      </ButtonGroup>
    </Modal>
  );
};

// Styled Components
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
`;

const SuccessText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  flex: 1;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CloseModalButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
  }
`;

export default SuccessModal; 