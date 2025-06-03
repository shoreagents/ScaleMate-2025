import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faEyeSlash, 
  faStar as faStarSolid,
  faStar as faStarRegular,
  faRobot,
  faWandMagicSparkles,
  faCloudUpload,
  faTimes,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 1178px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1178px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1178px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;

  @media (max-width: 1178px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 16rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }

  @media (max-width: 1178px) {
    width: 100%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1178px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }

  @media (max-width: 1178px) {
    width: 100%;
  }
`;

const AddToolButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 1178px) {
    display: none;
  }
`;

const FloatingAddButton = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #2563EB;
    transform: scale(1.05);
  }

  @media (max-width: 1178px) {
    display: flex;
  }
`;

const ToolsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;

  @media (min-width: 889px) {
    overflow-x: auto;
  }
  @media (max-width: 888px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeader = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const TableBody = styled.tbody`
  & > tr {
    border-bottom: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ToolIcon = styled.div<{ $color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: ${props => `${props.$color}/10`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
`;

const ToolDetails = styled.div``;

const ToolName = styled.div`
  font-weight: 500;
  color: #0F172A;
`;

const ToolVersion = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

const CategoryTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  font-size: 0.875rem;
`;

const AccessLevelTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => `${props.$color}/10`};
  color: ${props => props.$color};
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $color?: string }>`
  padding: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  border-radius: 0.25rem;
  transition: all 0.2s;
  background: none;
  border: none;

  &:hover {
    color: ${props => props.$color || '#0F172A'};
  }
`;

const CardListContainer = styled.div`
  display: none;
  margin-top: 1.5rem;
  @media (max-width: 888px) {
    display: block;
  }
`;

const ToolCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CardTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardToolTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardVersion = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;

  @media (max-width: 456px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const CardLabel = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CardValue = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: left;
  &.font-medium {
    font-weight: 500;
    color: #0F172A;
  }

  @media (max-width: 456px) {
    width: 100%;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  padding-top: 0.75rem;
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
  max-width: 32rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2001;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E7EB;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
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

const ModalForm = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const FormInput = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const LogoUploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoPreview = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 0.75rem;
  background: #F9FAFB;
  border: 2px dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 2rem;
  color: #0F172A66;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UploadLogoButton = styled.button`
  padding: 0.5rem 1.25rem;
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

const FormSelect = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  background: white;
  resize: vertical;
  min-height: 2.5rem;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CheckboxInput = styled.input`
  accent-color: #6366F1;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  font-size: 0.75rem;
  font-weight: 600;
  gap: 0.25rem;
  margin-right: 0.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #2563EB; }
`;

const AIToolsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    logo: null as File | null,
    logoUrl: '',
    category: 'AI Assistant',
    useCase: '',
    link: '',
    verified: false
  });

  // Modal open/close handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Keyboard close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) handleCloseModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, logo: file, logoUrl: URL.createObjectURL(file) }));
    }
  };
  const handleLogoUploadClick = () => {
    document.getElementById('tool-logo-input')?.click();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add tool logic
    handleCloseModal();
  };

  return (
    <Container>
      <ActionsBar>
        <SearchContainer>
          <TopRow>
            <SearchWrapper>
              <SearchInput type="text" placeholder="Search tools..." />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>
            <FilterButton>AI Tools</FilterButton>
          </TopRow>
          <FilterButtons>
            <FilterButton>Automation</FilterButton>
            <FilterButton>Marketing</FilterButton>
          </FilterButtons>
        </SearchContainer>
        <AddToolButton onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Tool
        </AddToolButton>
      </ActionsBar>

      {/* Desktop/Tablet Table */}
      <ToolsTable>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Tool</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Access Level</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <ToolInfo>
                  <ToolIcon $color="#3B82F6">
                    <FontAwesomeIcon icon={faRobot} />
                  </ToolIcon>
                  <ToolDetails>
                    <ToolName>Role Copilot</ToolName>
                    <ToolVersion>v2.1.0</ToolVersion>
                  </ToolDetails>
                </ToolInfo>
              </TableCell>
              <TableCell>
                <CategoryTag>AI Assistant</CategoryTag>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>
                  AI-powered role description generator
                </span>
              </TableCell>
              <TableCell>
                <AccessLevelTag $color="#00E915">Premium</AccessLevelTag>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </ActionButton>
                  <ActionButton $color="#EC297B">
                    <FontAwesomeIcon icon={faStarSolid} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
            <tr>
              <TableCell>
                <ToolInfo>
                  <ToolIcon $color="#3B82F6">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </ToolIcon>
                  <ToolDetails>
                    <ToolName>Smart Quotes</ToolName>
                    <ToolVersion>v1.5.2</ToolVersion>
                  </ToolDetails>
                </ToolInfo>
              </TableCell>
              <TableCell>
                <CategoryTag>Automation</CategoryTag>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>
                  Automated quote generation system
                </span>
              </TableCell>
              <TableCell>
                <AccessLevelTag $color="#00E915">Free</AccessLevelTag>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faStarRegular} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </ToolsTable>

      {/* Mobile Card View */}
      <CardListContainer>
        <ToolCard>
          <CardHeader>
            <CardTitleGroup>
              <CardToolTitle>
                <ToolIcon $color="#3B82F6">
                  <FontAwesomeIcon icon={faRobot} />
                </ToolIcon>
                Role Copilot
              </CardToolTitle>
              <CardVersion>v2.1.0</CardVersion>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Category:</CardLabel>
              <CardValue>
                <CategoryTag>AI Assistant</CategoryTag>
              </CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Description:</CardLabel>
              <CardValue>AI-powered role description generator</CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Access Level:</CardLabel>
              <CardValue>
                <AccessLevelTag $color="#00E915">Premium</AccessLevelTag>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <ActionButton>
                <FontAwesomeIcon icon={faPen} />
              </ActionButton>
              <ActionButton>
                <FontAwesomeIcon icon={faEyeSlash} />
              </ActionButton>
              <ActionButton $color="#EC297B">
                <FontAwesomeIcon icon={faStarSolid} />
              </ActionButton>
            </CardActions>
          </CardContent>
        </ToolCard>

        <ToolCard>
          <CardHeader>
            <CardTitleGroup>
              <CardToolTitle>
                <ToolIcon $color="#3B82F6">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </ToolIcon>
                Smart Quotes
              </CardToolTitle>
              <CardVersion>v1.5.2</CardVersion>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Category:</CardLabel>
              <CardValue>
                <CategoryTag>Automation</CategoryTag>
              </CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Description:</CardLabel>
              <CardValue>Automated quote generation system</CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Access Level:</CardLabel>
              <CardValue>
                <AccessLevelTag $color="#00E915">Free</AccessLevelTag>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <ActionButton>
                <FontAwesomeIcon icon={faPen} />
              </ActionButton>
              <ActionButton>
                <FontAwesomeIcon icon={faEyeSlash} />
              </ActionButton>
              <ActionButton>
                <FontAwesomeIcon icon={faStarRegular} />
              </ActionButton>
            </CardActions>
          </CardContent>
        </ToolCard>
      </CardListContainer>

      <FloatingAddButton onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      {/* Add New Tool Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Add New Tool</ModalTitle>
            <CloseModalButton onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Tool Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Role Copilot"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Logo Upload</FormLabel>
              <LogoUploadRow>
                <LogoPreview>
                  {formData.logoUrl ? (
                    <LogoImage src={formData.logoUrl} alt="Logo Preview" />
                  ) : (
                    <FontAwesomeIcon icon={faCloudUpload} />
                  )}
                  <input
                    id="tool-logo-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleLogoChange}
                  />
                </LogoPreview>
                <UploadLogoButton type="button" onClick={handleLogoUploadClick}>
                  Upload Logo
                </UploadLogoButton>
              </LogoUploadRow>
            </FormGroup>
            <FormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option>AI Assistant</option>
                <option>Automation</option>
                <option>Marketing</option>
                <option>Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Use Case</FormLabel>
              <FormTextarea
                name="useCase"
                value={formData.useCase}
                onChange={handleInputChange}
                placeholder="Describe the main use case"
                rows={2}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Tool Link</FormLabel>
              <FormInput
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://"
                required
              />
            </FormGroup>
            <CheckboxRow>
              <CheckboxInput
                id="tool-verified"
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleInputChange}
              />
              <FormLabel htmlFor="tool-verified" style={{ marginBottom: 0, display: 'flex', alignItems: 'center' }}>
                <VerifiedBadge>
                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: 4 }} />
                  Verified by ScaleMate
                </VerifiedBadge>
              </FormLabel>
            </CheckboxRow>
            <ModalFooter>
              <SubmitButton type="submit">
                Add Tool
              </SubmitButton>
            </ModalFooter>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default AIToolsTab; 