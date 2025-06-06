import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faRobot, 
  faGrip, 
  faList,
  faBookmark,
  faGripVertical,
  faTrash,
  faPlus,
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const StackControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 1002px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FilterDropdown = styled.div`
  position: relative;
  min-width: 200px;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const DropdownButton = styled.select`
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1002px) {
    justify-content: flex-end;
  }
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.875rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  &:hover {
    color: #3B82F6;
  }
`;

const StackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ToolCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 1rem;
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #0098FF;
`;

const ToolTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $saved?: boolean }>`
  color: ${props => props.$saved ? '#00E915' : 'rgba(15, 23, 42, 0.4)'};
  font-size: 1.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const AddTagButton = styled.button`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 9999px;
  color: rgba(15, 23, 42, 0.4);
  
  &:hover {
    border-color: #0098FF;
    color: #0098FF;
  }
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  resize: none;
  height: 5rem;
  margin-bottom: 1rem;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const SecondaryButton = styled.button`
  padding: 0.75rem;
  background-color: transparent;
  color: rgba(15, 23, 42, 0.4);
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: #F9FAFB;
    color: #3B82F6;
    border-color: #3B82F6;
  }
`;

const AddNewCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
`;

const AddNewButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  &:hover {
    color: #3B82F6;
  }
`;

const AddNewIcon = styled(FontAwesomeIcon)`
  font-size: 1.875rem;
  margin-bottom: 0.5rem;
`;

// Modal styled components
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
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

const ModalContent = styled.div`
  width: 100%;
  max-width: 28rem;
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

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;

  @media (max-width: 640px) {
    font-size: 1.05rem;
  }
`;

const CloseModalButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #0F172A; }
`;

const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const ModalFormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #0F172A;
`;

const ModalFormInput = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ModalFormSelect = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ModalFormTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  min-height: 5rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const ModalPrimaryButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #2563EB; }
`;

const ModalSecondaryButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #F9FAFB; }
`;

const DeleteModalContent = styled(ModalContent)`
  background-color: #F9FAFB;
  text-align: center;
`;

const WarningIconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const WarningIcon = styled.div`
  color: #EF4444;
  font-size: 1.5rem;
`;

const DeleteModalDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
`;

const DeleteButton = styled(ModalPrimaryButton)`
  background-color: #EC297B;
  &:hover { background-color: #D61F69; }
`;

const SavedToolStackTab: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Tools');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filterOptions = [
    'All Tools',
    'Productivity',
    'Communication',
    'Project Management'
  ];

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    // Add tool logic here
  };

  const handleDeleteTool = () => {
    setIsDeleteModalOpen(false);
    // Delete tool logic here
  };

  return (
    <Container>
      <StackControls>
        <FilterDropdown>
          <DropdownButton value={selectedFilter} onChange={handleFilterSelect}>
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </DropdownButton>
        </FilterDropdown>
        <ViewControls>
          <ViewButton>
            <FontAwesomeIcon icon={faGrip} />
            <span>Grid View</span>
          </ViewButton>
          <ViewButton>
            <FontAwesomeIcon icon={faList} />
            <span>List View</span>
          </ViewButton>
        </ViewControls>
      </StackControls>

      <StackGrid>
        {/* Saved Tool 1 */}
        <ToolCard>
          <CardContent>
            <CardHeader>
              <ToolInfo>
                <ToolIcon icon={faComments} />
                <ToolTitle>Team Chat AI</ToolTitle>
              </ToolInfo>
              <ActionButtons>
                <ActionButton $saved>
                  <FontAwesomeIcon icon={faBookmark} />
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faGripVertical} />
                </ActionButton>
              </ActionButtons>
            </CardHeader>
            <TagsContainer>
              <Tag>Communication</Tag>
              <Tag>Teams</Tag>
              <AddTagButton>+ Add Tag</AddTagButton>
            </TagsContainer>
            <NotesTextarea placeholder="Add notes..." />
            <ButtonGroup>
              <PrimaryButton>Open Tool</PrimaryButton>
              <SecondaryButton onClick={() => setIsDeleteModalOpen(true)}>
                <FontAwesomeIcon icon={faTrash} />
              </SecondaryButton>
            </ButtonGroup>
          </CardContent>
        </ToolCard>

        {/* Saved Tool 2 */}
        <ToolCard>
          <CardContent>
            <CardHeader>
              <ToolInfo>
                <ToolIcon icon={faRobot} />
                <ToolTitle>AI Assistant Pro</ToolTitle>
              </ToolInfo>
              <ActionButtons>
                <ActionButton $saved>
                  <FontAwesomeIcon icon={faBookmark} />
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faGripVertical} />
                </ActionButton>
              </ActionButtons>
            </CardHeader>
            <TagsContainer>
              <Tag>Productivity</Tag>
              <AddTagButton>+ Add Tag</AddTagButton>
            </TagsContainer>
            <NotesTextarea placeholder="Add notes...">Using this for daily task automation.</NotesTextarea>
            <ButtonGroup>
              <PrimaryButton>Open Tool</PrimaryButton>
              <SecondaryButton onClick={() => setIsDeleteModalOpen(true)}>
                <FontAwesomeIcon icon={faTrash} />
              </SecondaryButton>
            </ButtonGroup>
          </CardContent>
        </ToolCard>

        {/* Add New Tool Card */}
        <AddNewCard>
          <AddNewButton onClick={() => setIsAddModalOpen(true)}>
            <AddNewIcon icon={faPlus} />
            <span>Add New Tool</span>
          </AddNewButton>
        </AddNewCard>
      </StackGrid>

      {/* Add New Tool Modal */}
      <ModalOverlay $isOpen={isAddModalOpen} onClick={e => handleOverlayClick(e, () => setIsAddModalOpen(false))}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Add New Tool</ModalTitle>
            <CloseModalButton onClick={() => setIsAddModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <form onSubmit={handleAddTool}>
            <ModalFormGroup>
              <ModalFormLabel>Tool Name</ModalFormLabel>
              <ModalFormInput type="text" placeholder="Enter tool name" required />
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Category</ModalFormLabel>
              <ModalFormSelect required>
                <option value="">Select category</option>
                <option value="Productivity">Productivity</option>
                <option value="Communication">Communication</option>
                <option value="Project Management">Project Management</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
              </ModalFormSelect>
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Tool Link</ModalFormLabel>
              <ModalFormInput type="url" placeholder="https://example.com" required />
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Reason for Adding (Optional)</ModalFormLabel>
              <ModalFormTextarea placeholder="Why are you adding this tool to your stack?" />
            </ModalFormGroup>
            <ModalButtonGroup>
              <ModalSecondaryButton type="button" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton type="submit">
                Add to My Stack
              </ModalPrimaryButton>
            </ModalButtonGroup>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* Delete Tool Modal */}
      <ModalOverlay $isOpen={isDeleteModalOpen} onClick={e => handleOverlayClick(e, () => setIsDeleteModalOpen(false))}>
        <DeleteModalContent onClick={e => e.stopPropagation()}>
          <WarningIconContainer>
            <WarningIcon>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </WarningIcon>
          </WarningIconContainer>
          <ModalTitle>Remove Tool</ModalTitle>
          <DeleteModalDescription>
            Are you sure you want to remove this tool from your stack? This action cannot be undone.
          </DeleteModalDescription>
          <ModalButtonGroup>
            <ModalSecondaryButton onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </ModalSecondaryButton>
            <DeleteButton onClick={handleDeleteTool}>
              Delete
            </DeleteButton>
          </ModalButtonGroup>
        </DeleteModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default SavedToolStackTab; 