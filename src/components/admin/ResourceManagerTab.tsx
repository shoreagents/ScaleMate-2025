import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUpload, FaChevronDown, FaFilePdf, FaFileWord, FaPen, FaArchive, FaStar, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 1088px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1088px) {
    display: contents;
  }
`;

const SearchInput = styled.div`
  position: relative;
  width: 16rem;

  input {
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
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(15, 23, 42, 0.4);
  }

  @media (max-width: 1088px) {
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
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

  @media (max-width: 1088px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
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

  @media (max-width: 1088px) {
    width: 100%;
  }
`;

const UploadButton = styled.button`
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

  @media (max-width: 1088px) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`;

const TagFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const TagLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-right: 0.25rem;
`;

const TagButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: rgba(0, 152, 255, 0.2);
  }
`;

const TableContainer = styled.div`
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

const TableHeader = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

const ResourceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #0F172A;
`;

const StatusTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button<{ $color?: string }>`
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

const ResourceCard = styled.div`
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

const CardResourceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardDate = styled.span`
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
  max-width: 30rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2001;
`;

const ModalHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  &:hover {
    color: #0F172A;
  }
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

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const FileDropLabel = styled.label`
  display: block;
`;

const FileDropArea = styled.div<{ $dragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F9FAFB;
  border: 2px dashed #E5E7EB;
  border-color: ${props => props.$dragActive ? '#3B82F6' : '#E5E7EB'};
  border-radius: 0.75rem;
  padding: 2rem 0;
  cursor: pointer;
  transition: border-color 0.2s;
`;

const FileDropIcon = styled.div`
  color: #3B82F6;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FileDropText = styled.span`
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const FileDropButton = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #3B82F6;
  color: white;
  font-size: 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  margin-bottom: 0.25rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2563EB;
  }
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

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RadioLabel = styled.label<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${props => props.$color || '#0F172A'};
  font-weight: ${props => props.$color ? 600 : 400};
  cursor: pointer;
`;

const RadioInput = styled.input`
  accent-color: #3B82F6;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #F9FAFB;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2563EB;
  }
`;

const ResourceManagerTab: React.FC = () => {
  // Add filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedAccess, setSelectedAccess] = useState('All Access');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    file: null as File | null,
    type: '',
    tags: '',
    access: 'Free',
    dragActive: false
  });

  // Example resources data
  const exampleResources = [
    {
      id: 'res1',
      title: 'Team Scaling Guide 2025',
      type: 'PDF',
      status: 'Premium',
      lastUpdated: 'Jan 15, 2025',
      tags: ['Onboarding', 'Leadership'],
      icon: <FaFilePdf style={{ color: '#EC297B' }} />
    },
    {
      id: 'res2',
      title: 'Onboarding Checklist',
      type: 'DOC',
      status: 'Free',
      lastUpdated: 'Jan 10, 2025',
      tags: ['Onboarding', 'Templates'],
      icon: <FaFileWord style={{ color: '#0098FF' }} />
    },
    {
      id: 'res3',
      title: 'Delegation Framework',
      type: 'PDF',
      status: 'Premium',
      lastUpdated: 'Jan 12, 2025',
      tags: ['Delegation', 'Leadership'],
      icon: <FaFilePdf style={{ color: '#EC297B' }} />
    },
    {
      id: 'res4',
      title: 'Team Communication Template',
      type: 'DOC',
      status: 'Free',
      lastUpdated: 'Jan 8, 2025',
      tags: ['Templates', 'Communication'],
      icon: <FaFileWord style={{ color: '#0098FF' }} />
    },
    {
      id: 'res5',
      title: 'Leadership Playbook',
      type: 'PDF',
      status: 'Premium',
      lastUpdated: 'Jan 14, 2025',
      tags: ['Leadership', 'Guide'],
      icon: <FaFilePdf style={{ color: '#EC297B' }} />
    },
    {
      id: 'res6',
      title: 'Project Management Template',
      type: 'DOC',
      status: 'Free',
      lastUpdated: 'Jan 9, 2025',
      tags: ['Templates', 'Project Management'],
      icon: <FaFileWord style={{ color: '#0098FF' }} />
    }
  ];

  // Filter options
  const typeOptions = ['All Types', 'PDF', 'DOC'];
  const accessOptions = ['All Access', 'Premium', 'Free'];

  // Filter resources based on search query, type, access, and tag
  const filteredResources = exampleResources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'All Types' || resource.type === selectedType;

    const matchesAccess = selectedAccess === 'All Access' || resource.status === selectedAccess;

    const matchesTag = !selectedTag || resource.tags.includes(selectedTag);

    return matchesSearch && matchesType && matchesAccess && matchesTag;
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // Handle access filter change
  const handleAccessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccess(e.target.value);
  };

  // Handle tag filter change
  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.textContent || '';
    setSelectedTag(selectedTag === tag ? null : tag);
  };

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, dragActive: true }));
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, dragActive: false }));
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, dragActive: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };
  const handleFileClick = () => {
    document.getElementById('resource-file-input')?.click();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement upload resource logic
    handleCloseModal();
  };

  return (
    <Container>
      <ActionsContainer>
        <FilterGroup>
          <SearchInput>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchInput>
          <FilterSelect 
            value={selectedType} 
            onChange={handleTypeChange}
          >
            {typeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect 
            value={selectedAccess} 
            onChange={handleAccessChange}
          >
            {accessOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        <UploadButton onClick={handleOpenModal}>
          <FaUpload />
          Upload Resource
        </UploadButton>
      </ActionsContainer>

      <TagFilterContainer>
        <TagLabel>Popular Tags:</TagLabel>
        <TagButton 
          onClick={handleTagClick}
          style={{ 
            backgroundColor: selectedTag === 'Onboarding' ? 'rgba(0, 152, 255, 0.2)' : 'rgba(0, 152, 255, 0.1)'
          }}
        >
          Onboarding
        </TagButton>
        <TagButton 
          onClick={handleTagClick}
          style={{ 
            backgroundColor: selectedTag === 'Delegation' ? 'rgba(0, 152, 255, 0.2)' : 'rgba(0, 152, 255, 0.1)'
          }}
        >
          Delegation
        </TagButton>
        <TagButton 
          onClick={handleTagClick}
          style={{ 
            backgroundColor: selectedTag === 'Leadership' ? 'rgba(0, 152, 255, 0.2)' : 'rgba(0, 152, 255, 0.1)'
          }}
        >
          Leadership
        </TagButton>
        <TagButton 
          onClick={handleTagClick}
          style={{ 
            backgroundColor: selectedTag === 'Templates' ? 'rgba(0, 152, 255, 0.2)' : 'rgba(0, 152, 255, 0.1)'
          }}
        >
          Templates
        </TagButton>
      </TagFilterContainer>

      {/* Desktop/Tablet Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredResources.map(resource => (
              <TableRow key={resource.id}>
                <TableCell>
                  <ResourceTitle>
                    {resource.icon}
                    {resource.title}
                  </ResourceTitle>
                </TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>
                  <StatusTag $color={resource.status === 'Premium' ? '#EC297B' : '#00E915'}>
                    {resource.status}
                  </StatusTag>
                </TableCell>
                <TableCell>{resource.lastUpdated}</TableCell>
                <TableCell>
                  <ActionButtons>
                    <IconButton $color="#3B82F6" title="Edit">
                      <FaPen />
                    </IconButton>
                    <IconButton $color="#EC297B" title="Archive">
                      <FaArchive />
                    </IconButton>
                    <IconButton $color="#0098FF" title="Star">
                      <FaStar />
                    </IconButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile Card View */}
      <CardListContainer>
        {filteredResources.map(resource => (
          <ResourceCard key={resource.id}>
            <CardHeader>
              <CardTitleGroup>
                <CardResourceTitle>
                  {resource.icon}
                  {resource.title}
                </CardResourceTitle>
                <CardDate>{resource.lastUpdated}</CardDate>
              </CardTitleGroup>
            </CardHeader>
            <CardContent>
              <CardDetailRow>
                <CardLabel>Type:</CardLabel>
                <CardValue>{resource.type}</CardValue>
              </CardDetailRow>
              <CardDetailRow>
                <CardLabel>Status:</CardLabel>
                <CardValue>
                  <StatusTag $color={resource.status === 'Premium' ? '#EC297B' : '#00E915'}>
                    {resource.status}
                  </StatusTag>
                </CardValue>
              </CardDetailRow>
              <CardActions>
                <IconButton $color="#3B82F6" title="Edit">
                  <FaPen />
                </IconButton>
                <IconButton $color="#EC297B" title="Archive">
                  <FaArchive />
                </IconButton>
                <IconButton $color="#0098FF" title="Star">
                  <FaStar />
                </IconButton>
              </CardActions>
            </CardContent>
          </ResourceCard>
        ))}
      </CardListContainer>

      {/* Upload Resource Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Upload New Resource</ModalTitle>
            <CloseModalButton onClick={handleCloseModal}>
              <FaTimes />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter resource title"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>File Upload</FormLabel>
              <FileDropLabel>
                <FileDropArea
                  $dragActive={formData.dragActive}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleFileClick}
                  tabIndex={0}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFileClick()}
                  style={{ outline: 'none' }}
                >
                  <FileDropIcon><FaCloudUploadAlt /></FileDropIcon>
                  <FileDropText>Drag & drop a PDF or DOCX file here, or click to browse</FileDropText>
                  <FileDropButton>Choose File</FileDropButton>
                  <input
                    id="resource-file-input"
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  {formData.file && (
                    <span style={{ marginTop: 8, color: '#3B82F6', fontSize: '0.9em' }}>{formData.file.name}</span>
                  )}
                </FileDropArea>
              </FileDropLabel>
            </FormGroup>
            <FormGroup>
              <FormLabel>Resource Type</FormLabel>
              <FormSelect
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select type</option>
                <option>Guide</option>
                <option>Checklist</option>
                <option>Template</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Tags</FormLabel>
              <FormInput
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Add tags separated by commas"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Access Level</FormLabel>
              <RadioGroup>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="access"
                    checked={formData.access === 'Free'}
                    onChange={() => handleAccessChange('Free')}
                  />
                  Free
                </RadioLabel>
                <RadioLabel $color="#EC297B">
                  <RadioInput
                    type="radio"
                    name="access"
                    checked={formData.access === 'Gated'}
                    onChange={() => handleAccessChange('Gated')}
                  />
                  Gated
                </RadioLabel>
              </RadioGroup>
            </FormGroup>
            <ModalFooter>
              <CancelButton type="button" onClick={handleCloseModal}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">
                <FaUpload style={{ marginRight: 8 }} />
                Upload Resource
              </SubmitButton>
            </ModalFooter>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default ResourceManagerTab; 