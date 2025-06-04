import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEllipsis, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faFilePdf, faCopy } from '@fortawesome/free-regular-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  overflow-x: hidden;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const ActionsContainer = styled.div`
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

const SearchFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1002px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
`;

const DepartmentSelect = styled.select`
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
  width: auto;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;

  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 1002px) {
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

  @media (max-width: 1002px) {
    display: flex;
  }
`;

const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RoleCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
  }
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const RoleInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const RoleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  word-break: break-word;
  
  @media only screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const RoleDate = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
`;

const MenuButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  flex-shrink: 0;
  
  &:hover {
    color: #0F172A;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ $type: 'department' | 'status' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: ${props => props.$type === 'department' ? 'rgba(0, 152, 255, 0.1)' : 'rgba(132, 204, 22, 0.1)'};
  color: ${props => props.$type === 'department' ? '#0098FF' : '#84CC16'};
  white-space: nowrap;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
    padding: 0.25rem 0.375rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    padding-top: 0.75rem;
  }
`;

const ViewDetailsButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  white-space: nowrap;
  
  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  
  &:hover {
    color: #0F172A;
  }
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

const ModalTitle = styled.h2`
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
  min-height: 4rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const ModalPrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
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
  padding: 0.75rem 1.5rem;
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

const ModalTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  background-color: ${props => props.$color}1A;
  color: ${props => props.$color};
  white-space: nowrap;
`;

const ModalSectionTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

const ModalList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.95rem;
`;

const ModalToolBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  color: #0F172A;
  white-space: nowrap;
`;

const CenteredModalButtonGroup = styled(ModalButtonGroup)`
  justify-content: center;
  > button {
    flex: 1 1 0;
    min-width: 120px;
    max-width: 180px;
  }
`;

const roleCards = [
  {
    title: 'Senior Sales Manager',
    date: 'Created March 15, 2025',
    department: 'Sales',
    status: 'Full-time',
    level: 'Senior Level',
    description: 'Lead and manage the sales team to achieve revenue targets. Develop strategic sales plans, mentor junior sales staff, and maintain key client relationships. Drive business growth through effective sales strategies and market analysis.',
    tasks: [
      'Develop and execute sales strategies',
      'Manage client relationships and negotiations',
      'Lead team meetings and training sessions',
      'Analyze sales data and market trends',
    ],
    tools: ['Salesforce', 'HubSpot', 'Microsoft Office', 'Zoom'],
  },
  {
    title: 'Executive Assistant',
    date: 'Created March 10, 2025',
    department: 'Admin',
    status: 'Part-time',
    level: 'Senior Level',
    description: 'Support executives with scheduling, correspondence, and administrative tasks. Maintain confidentiality and ensure smooth office operations.',
    tasks: [
      'Manage executive calendars',
      'Coordinate meetings and travel',
      'Prepare reports and presentations',
      'Handle confidential information',
    ],
    tools: ['Google Workspace', 'Slack', 'Zoom'],
  },
  {
    title: 'Operations Manager',
    date: 'Created March 5, 2025',
    department: 'Operations',
    status: 'Full-time',
    level: 'Mid Level',
    description: 'Oversee daily operations, optimize processes, and manage team performance. Ensure operational efficiency and compliance with company policies.',
    tasks: [
      'Optimize operational processes',
      'Manage team schedules and performance',
      'Ensure compliance with policies',
      'Coordinate cross-departmental projects',
    ],
    tools: ['Asana', 'Microsoft Office', 'Slack'],
  },
];

const RolesBlueprintTab: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [viewRole, setViewRole] = React.useState<typeof roleCards[0] | null>(null);
  const [roleTitle, setRoleTitle] = React.useState('');
  const [roleDept, setRoleDept] = React.useState('');
  const [roleDesc, setRoleDesc] = React.useState('');
  const [isDownloadConfirmOpen, setIsDownloadConfirmOpen] = React.useState(false);
  // New modal states for action buttons
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editRole, setEditRole] = React.useState<typeof roleCards[0] | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDept, setEditDept] = React.useState('');
  const [editDesc, setEditDesc] = React.useState('');
  const [isActionDownloadConfirmOpen, setIsActionDownloadConfirmOpen] = React.useState(false);
  const [isDuplicateConfirmOpen, setIsDuplicateConfirmOpen] = React.useState(false);
  const [duplicateRole, setDuplicateRole] = React.useState<typeof roleCards[0] | null>(null);

  // Accessibility: close modal on escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCreateModalOpen) setIsCreateModalOpen(false);
        if (isViewModalOpen) setIsViewModalOpen(false);
        if (isDownloadConfirmOpen) setIsDownloadConfirmOpen(false);
        if (isEditModalOpen) setIsEditModalOpen(false);
        if (isActionDownloadConfirmOpen) setIsActionDownloadConfirmOpen(false);
        if (isDuplicateConfirmOpen) setIsDuplicateConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCreateModalOpen, isViewModalOpen, isDownloadConfirmOpen, isEditModalOpen, isActionDownloadConfirmOpen, isDuplicateConfirmOpen]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, closeFn: () => void) => {
    if (e.target === e.currentTarget) closeFn();
  };

  // Open Edit Modal and prefill data
  const handleEditClick = (role: typeof roleCards[0]) => {
    setEditRole(role);
    setEditTitle(role.title);
    setEditDept(role.department);
    setEditDesc(role.description);
    setIsEditModalOpen(true);
  };

  // Open Action Download PDF Confirmation
  const handleActionDownloadClick = (role: typeof roleCards[0]) => {
    setViewRole(role);
    setIsActionDownloadConfirmOpen(true);
  };

  // Open Duplicate Confirmation
  const handleDuplicateClick = (role: typeof roleCards[0]) => {
    setDuplicateRole(role);
    setIsDuplicateConfirmOpen(true);
  };

  return (
    <MainContent>
      <ActionsContainer id="roles-actions">
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search roles..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
          <DepartmentSelect>
            <option>All Departments</option>
            <option>Sales</option>
            <option>Admin</option>
            <option>Operations</option>
          </DepartmentSelect>
        </SearchFilterGroup>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Create New Role</span>
        </CreateButton>
      </ActionsContainer>

      <FloatingAddButton onClick={() => setIsCreateModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      <RolesGrid id="roles-grid">
        {roleCards.map((role, idx) => (
          <RoleCard key={role.title} id={`role-card-${idx + 1}`}>
          <CardHeader>
            <RoleInfo>
                <RoleTitle>{role.title}</RoleTitle>
                <RoleDate>{role.date}</RoleDate>
            </RoleInfo>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsis} />
            </MenuButton>
          </CardHeader>
          <TagsContainer>
              <Tag $type="department">{role.department}</Tag>
              <Tag $type="status">{role.status}</Tag>
              <Tag $type="status">{role.level}</Tag>
          </TagsContainer>
          <CardFooter>
              <ViewDetailsButton onClick={() => { setViewRole(role); setIsViewModalOpen(true); }}>View Details</ViewDetailsButton>
            <ActionButtons>
                <ActionButton title="Edit" onClick={() => handleEditClick(role)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </ActionButton>
                <ActionButton title="Download PDF" onClick={() => handleActionDownloadClick(role)}>
                <FontAwesomeIcon icon={faFilePdf} />
              </ActionButton>
                <ActionButton title="Duplicate" onClick={() => handleDuplicateClick(role)}>
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
            </ActionButtons>
          </CardFooter>
        </RoleCard>
        ))}
      </RolesGrid>

      {/* Create New Role Modal */}
      <ModalOverlay $isOpen={isCreateModalOpen} onClick={e => handleOverlayClick(e, () => setIsCreateModalOpen(false))}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Create New Role</ModalTitle>
            <CloseModalButton onClick={() => setIsCreateModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          <form onSubmit={e => { e.preventDefault(); setIsCreateModalOpen(false); }}>
            <ModalFormGroup>
              <ModalFormLabel>Role Title</ModalFormLabel>
              <ModalFormInput
                type="text"
                placeholder="e.g. Senior Marketing Manager"
                value={roleTitle}
                onChange={e => setRoleTitle(e.target.value)}
              />
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Department</ModalFormLabel>
              <ModalFormSelect
                value={roleDept}
                onChange={e => setRoleDept(e.target.value)}
              >
                <option value="">Select Department</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Admin</option>
                <option>Customer Service</option>
                <option>Finance</option>
                <option>HR</option>
              </ModalFormSelect>
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Description (Optional)</ModalFormLabel>
              <ModalFormTextarea
                placeholder="Brief description of the role..."
                value={roleDesc}
                onChange={e => setRoleDesc(e.target.value)}
              />
            </ModalFormGroup>
            <ModalButtonGroup>
              <ModalSecondaryButton type="button" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton type="submit">
                Start Building Role
              </ModalPrimaryButton>
            </ModalButtonGroup>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* View Details Modal */}
      <ModalOverlay $isOpen={isViewModalOpen} onClick={e => handleOverlayClick(e, () => setIsViewModalOpen(false))}>
        <ModalContent style={{ maxWidth: 700, width: '100%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{viewRole?.title || ''}</ModalTitle>
            <CloseModalButton onClick={() => setIsViewModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          {viewRole && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <ModalTag $color="#0098FF">{viewRole.department}</ModalTag>
                <ModalTag $color="#00E915">{viewRole.status}</ModalTag>
                <ModalTag $color="#EC297B">{viewRole.level}</ModalTag>
              </div>
              <div>
                <ModalSectionTitle>Job Description</ModalSectionTitle>
                <p style={{ color: 'rgba(15,23,42,0.7)', lineHeight: 1.7 }}>{viewRole.description}</p>
              </div>
              <div>
                <ModalSectionTitle>Key Tasks</ModalSectionTitle>
                <ModalList>
                  {viewRole.tasks.map((task, i) => (
                    <ModalListItem key={i}>
                      <FontAwesomeIcon icon={faCheck} color="#84CC16" style={{ fontSize: '1rem' }} />
                      <span>{task}</span>
                    </ModalListItem>
                  ))}
                </ModalList>
              </div>
              <div>
                <ModalSectionTitle>Required Tools</ModalSectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {viewRole.tools.map((tool, i) => (
                    <ModalToolBadge key={i}>{tool}</ModalToolBadge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <ModalButtonGroup>
            <ModalSecondaryButton type="button" onClick={() => setIsDownloadConfirmOpen(true)}>
              <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: 8 }} />
              Download PDF
            </ModalSecondaryButton>
          </ModalButtonGroup>
        </ModalContent>
      </ModalOverlay>

      {/* Download PDF Confirmation Modal */}
      <ModalOverlay $isOpen={isDownloadConfirmOpen} onClick={e => handleOverlayClick(e, () => setIsDownloadConfirmOpen(false))}>
        <ModalContent style={{ maxWidth: 400, width: '100%' }} onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Download Role PDF</ModalTitle>
            <CloseModalButton onClick={() => setIsDownloadConfirmOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <FontAwesomeIcon icon={faFilePdf} color="#3B82F6" style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
            <div style={{ fontWeight: 500, color: '#0F172A', margin: '1rem 0 0.5rem 0' }}>{viewRole?.title || 'Role PDF'}</div>
            <div style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.95rem' }}>Download a PDF summary of this role, including description, tasks, and tools.</div>
          </div>
          <CenteredModalButtonGroup>
            <ModalSecondaryButton onClick={() => setIsDownloadConfirmOpen(false)}>
              Cancel
            </ModalSecondaryButton>
            <ModalPrimaryButton onClick={() => setIsDownloadConfirmOpen(false)}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span>Download PDF</span>
            </ModalPrimaryButton>
          </CenteredModalButtonGroup>
        </ModalContent>
      </ModalOverlay>

      {/* Edit Modal */}
      <ModalOverlay $isOpen={isEditModalOpen} onClick={e => handleOverlayClick(e, () => setIsEditModalOpen(false))}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Edit Role</ModalTitle>
            <CloseModalButton onClick={() => setIsEditModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          <form onSubmit={e => { e.preventDefault(); setIsEditModalOpen(false); }}>
            <ModalFormGroup>
              <ModalFormLabel>Role Title</ModalFormLabel>
              <ModalFormInput
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Department</ModalFormLabel>
              <ModalFormSelect
                value={editDept}
                onChange={e => setEditDept(e.target.value)}
              >
                <option value="">Select Department</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Admin</option>
                <option>Customer Service</option>
                <option>Finance</option>
                <option>HR</option>
              </ModalFormSelect>
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Description (Optional)</ModalFormLabel>
              <ModalFormTextarea
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />
            </ModalFormGroup>
            <ModalButtonGroup>
              <ModalSecondaryButton type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton type="submit">
                Save Changes
              </ModalPrimaryButton>
            </ModalButtonGroup>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* Action Download PDF Confirmation Modal */}
      <ModalOverlay $isOpen={isActionDownloadConfirmOpen} onClick={e => handleOverlayClick(e, () => setIsActionDownloadConfirmOpen(false))}>
        <ModalContent style={{ maxWidth: 400, width: '100%' }} onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Download Role PDF</ModalTitle>
            <CloseModalButton onClick={() => setIsActionDownloadConfirmOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <FontAwesomeIcon icon={faFilePdf} color="#3B82F6" style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
            <div style={{ fontWeight: 500, color: '#0F172A', margin: '1rem 0 0.5rem 0' }}>{viewRole?.title || 'Role PDF'}</div>
            <div style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.95rem' }}>Download a PDF summary of this role, including description, tasks, and tools.</div>
          </div>
          <CenteredModalButtonGroup>
            <ModalSecondaryButton onClick={() => setIsActionDownloadConfirmOpen(false)}>
              Cancel
            </ModalSecondaryButton>
            <ModalPrimaryButton onClick={() => setIsActionDownloadConfirmOpen(false)}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span>Download PDF</span>
            </ModalPrimaryButton>
          </CenteredModalButtonGroup>
        </ModalContent>
      </ModalOverlay>

      {/* Duplicate Confirmation Modal */}
      <ModalOverlay $isOpen={isDuplicateConfirmOpen} onClick={e => handleOverlayClick(e, () => setIsDuplicateConfirmOpen(false))}>
        <ModalContent style={{ maxWidth: 400, width: '100%' }} onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Duplicate Role</ModalTitle>
            <CloseModalButton onClick={() => setIsDuplicateConfirmOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </CloseModalButton>
          </ModalHeader>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <FontAwesomeIcon icon={faCopy} color="#3B82F6" style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
            <div style={{ fontWeight: 500, color: '#0F172A', margin: '1rem 0 0.5rem 0' }}>{duplicateRole?.title || 'Role'}</div>
            <div style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.95rem' }}>Are you sure you want to duplicate this role?</div>
          </div>
          <CenteredModalButtonGroup>
            <ModalSecondaryButton onClick={() => setIsDuplicateConfirmOpen(false)}>
              Cancel
            </ModalSecondaryButton>
            <ModalPrimaryButton onClick={() => setIsDuplicateConfirmOpen(false)}>
              <FontAwesomeIcon icon={faCopy} />
              <span>Duplicate</span>
            </ModalPrimaryButton>
          </CenteredModalButtonGroup>
        </ModalContent>
      </ModalOverlay>
    </MainContent>
  );
};

export default RolesBlueprintTab; 