import React, { FC } from 'react';
import styled from 'styled-components';
import { FiAlertTriangle } from 'react-icons/fi';
import { UserRole, Admin } from '../../../types/admin';
import { Modal } from '../../ui/Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  isSubmitting: boolean;
  userToDelete: UserRole | Admin | null;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onModalStateChange,
  isSubmitting,
  userToDelete
}) => {
  const handleClose = () => {
    onClose();
    onModalStateChange?.(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  if (!userToDelete) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete User"
      size="md"
      closeOnOverlayClick={false}
    >
      <WarningContainer>
        <WarningText>
          Are you sure you want to delete {userToDelete.first_name} {userToDelete.last_name}?
          This action cannot be undone.
        </WarningText>
      </WarningContainer>

      <ButtonGroup>
        <CancelButton type="button" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </CancelButton>
        <DeleteButton 
          type="button" 
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Deleting...' : 'Yes, Delete!'}
        </DeleteButton>
      </ButtonGroup>
    </Modal>
  );
};

// Styled Components
const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
`;

const WarningText = styled.p`
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

const CancelButton = styled(Button)`
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }

  &:disabled {
    background: transparent;
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const DeleteButton = styled(Button)`
  background: #EF4444;
  border: none;
  color: white;

  &:hover:not(:disabled) {
    background: #DC2626;
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
  }
`;

export default DeleteConfirmationModal; 