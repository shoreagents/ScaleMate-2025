import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faCopy, 
  faTrash,
  faRobot,
  faTimes,
  faBold,
  faItalic,
  faLink,
  faList,
  faFeatherPointed
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 909px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 909px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
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

  @media (max-width: 909px) {
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

const CategorySelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;
  font-size: 0.875rem;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  height: 2.5rem;
  box-sizing: border-box;
  width: auto;

  @media (max-width: 909px) {
    width: 100%;
  }
`;

const NewPostButton = styled.button`
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

  @media (max-width: 909px) {
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

  @media (max-width: 909px) {
    display: flex;
  }
`;

const BlogTable = styled.div`
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

const PostTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TitleText = styled.span`
  color: #0F172A;
  font-weight: 500;
`;

const CategoryTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => `${props.$color}/10`};
  color: ${props => props.$color};
  font-size: 0.75rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
`;

const AuthorName = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const StatusBadge = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
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

const PostCard = styled.div`
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

const CardPostTitle = styled.h3`
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
  max-width: 26rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #0F172A; }
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

const ModalSubtitle = styled.p`
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.95rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

const TagInputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const TagChip = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  font-size: 0.75rem;
  font-weight: 600;
  gap: 0.25rem;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 0.9em;
  margin-left: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorSelect = styled.select`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;
  font-size: 0.875rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #0F172A;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  width: 2.5rem;
  height: 1.25rem;
  background-color: ${props => props.$isActive ? '#3B82F6' : '#E5E7EB'};
  border-radius: 9999px;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
`;

const ToggleKnob = styled.span<{ $isActive: boolean }>`
  position: absolute;
  left: ${props => props.$isActive ? '1.25rem' : '0.25rem'};
  top: 0.125rem;
  width: 1rem;
  height: 1rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: left 0.2s;
`;

const DateInput = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  &:hover { background-color: #2563EB; }
`;

const BlogTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    category: 'Leadership',
    tags: ['Leadership', 'Remote'],
    tagInput: '',
    author: 'Sarah Chen',
    authorAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
    schedule: false,
    scheduleDate: ''
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

  // Tag management
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, tagInput: e.target.value }));
  };
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',' || e.key === ' ') && formData.tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, prev.tagInput.trim()], tagInput: '' }));
      } else {
        setFormData(prev => ({ ...prev, tagInput: '' }));
      }
    }
  };
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  // Author select
  const authors = [
    { name: 'Sarah Chen', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' },
    { name: 'Mike Wilson', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg' },
    { name: 'Alex Patel', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' },
    { name: 'Lisa Tran', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg' }
  ];
  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = authors.find(a => a.name === e.target.value);
    setFormData(prev => ({ ...prev, author: e.target.value, authorAvatar: selected ? selected.avatar : '' }));
  };

  // Schedule toggle
  const handleToggleSchedule = () => {
    setFormData(prev => ({ ...prev, schedule: !prev.schedule, scheduleDate: '' }));
  };
  const handleScheduleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, scheduleDate: e.target.value }));
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create blog draft logic
    handleCloseModal();
  };

  return (
    <Container>
      <ActionsBar>
        <SearchContainer>
          <div style={{ position: 'relative' }}>
            <SearchInput type="text" placeholder="Search posts..." />
            <SearchIcon icon={faSearch} />
          </div>
          <CategorySelect>
            <option>All Categories</option>
            <option>Leadership</option>
            <option>Team Building</option>
            <option>Management</option>
          </CategorySelect>
        </SearchContainer>
        <NewPostButton onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faPlus} />
          New Post
        </NewPostButton>
      </ActionsBar>

      {/* Desktop/Tablet Table */}
      <BlogTable>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Author</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <PostTitle>
                  <TitleText>10 Tips for Scaling Remote Teams</TitleText>
                  <CategoryTag $color="#00E915">Leadership</CategoryTag>
                </PostTitle>
              </TableCell>
              <TableCell>
                <AuthorInfo>
                  <AuthorAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" />
                  <AuthorName>Sarah Chen</AuthorName>
                </AuthorInfo>
              </TableCell>
              <TableCell>
                <StatusBadge $color="#EC297B">Draft</StatusBadge>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Jan 15, 2025</span>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faCopy} />
                  </ActionButton>
                  <ActionButton $color="#EC297B">
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
            <tr>
              <TableCell>
                <PostTitle>
                  <TitleText>The Future of Work: AI Integration</TitleText>
                  <CategoryTag $color="#00E915">Technology</CategoryTag>
                </PostTitle>
              </TableCell>
              <TableCell>
                <AuthorInfo>
                  <AuthorAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" />
                  <AuthorName>Mike Wilson</AuthorName>
                </AuthorInfo>
              </TableCell>
              <TableCell>
                <StatusBadge $color="#00E915">Published</StatusBadge>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Jan 10, 2025</span>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faCopy} />
                  </ActionButton>
                  <ActionButton $color="#EC297B">
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </BlogTable>

      {/* Mobile Card View */}
      <CardListContainer>
        <PostCard>
          <CardHeader>
            <CardTitleGroup>
              <CardPostTitle>
                10 Tips for Scaling Remote Teams
                <CategoryTag $color="#00E915">Leadership</CategoryTag>
              </CardPostTitle>
              <CardDate>Jan 15, 2025</CardDate>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Author:</CardLabel>
              <CardValue>
                <AuthorInfo>
                  <AuthorAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" />
                  <AuthorName>Sarah Chen</AuthorName>
                </AuthorInfo>
              </CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Status:</CardLabel>
              <CardValue>
                <StatusBadge $color="#EC297B">Draft</StatusBadge>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <ActionButton>
                <FontAwesomeIcon icon={faPen} />
              </ActionButton>
              <ActionButton>
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
              <ActionButton $color="#EC297B">
                <FontAwesomeIcon icon={faTrash} />
              </ActionButton>
            </CardActions>
          </CardContent>
        </PostCard>

        <PostCard>
          <CardHeader>
            <CardTitleGroup>
              <CardPostTitle>
                The Future of Work: AI Integration
                <CategoryTag $color="#00E915">Technology</CategoryTag>
              </CardPostTitle>
              <CardDate>Jan 10, 2025</CardDate>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Author:</CardLabel>
              <CardValue>
                <AuthorInfo>
                  <AuthorAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" />
                  <AuthorName>Mike Wilson</AuthorName>
                </AuthorInfo>
              </CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Status:</CardLabel>
              <CardValue>
                <StatusBadge $color="#00E915">Published</StatusBadge>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <ActionButton>
                <FontAwesomeIcon icon={faPen} />
              </ActionButton>
              <ActionButton>
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
              <ActionButton $color="#EC297B">
                <FontAwesomeIcon icon={faTrash} />
              </ActionButton>
            </CardActions>
          </CardContent>
        </PostCard>
      </CardListContainer>

      <FloatingAddButton onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      {/* New Blog Draft Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseModalButton onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseModalButton>
          <ModalHeader>
            <ModalTitle>Start New Blog Draft</ModalTitle>
            <ModalSubtitle>Quickly set up your new post. All fields editable later.</ModalSubtitle>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Category</FormLabel>
              <CategorySelect
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
              >
                <option>Leadership</option>
                <option>Technology</option>
                <option>Management</option>
                <option>Team Building</option>
              </CategorySelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Tags</FormLabel>
              <TagInputRow>
                {formData.tags.map(tag => (
                  <TagChip key={tag} $color={tag === 'Leadership' ? '#00E915' : tag === 'Remote' ? '#0098FF' : '#3B82F6'}>
                    {tag}
                    <TagRemoveButton type="button" onClick={() => handleRemoveTag(tag)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </TagRemoveButton>
                  </TagChip>
                ))}
                <FormInput
                  type="text"
                  name="tagInput"
                  value={formData.tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add tag..."
                  style={{ minWidth: 80, flex: 1, fontSize: 12, borderRadius: 9999, padding: '0.25rem 0.75rem' }}
                />
              </TagInputRow>
            </FormGroup>
            <FormGroup>
              <FormLabel>Author</FormLabel>
              <AuthorRow>
                <AuthorAvatar src={formData.authorAvatar} />
                <AuthorSelect value={formData.author} onChange={handleAuthorChange}>
                  {authors.map(a => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </AuthorSelect>
              </AuthorRow>
            </FormGroup>
            <ToggleRow>
              <ToggleLabel>Schedule Publish</ToggleLabel>
              <ToggleButton
                type="button"
                $isActive={formData.schedule}
                onClick={handleToggleSchedule}
                aria-pressed={formData.schedule}
              >
                <ToggleKnob $isActive={formData.schedule} />
              </ToggleButton>
            </ToggleRow>
            {formData.schedule && (
              <FormGroup>
                <DateInput
                  type="datetime-local"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleScheduleDateChange}
                />
              </FormGroup>
            )}
            <SubmitButton type="submit">
              <FontAwesomeIcon icon={faFeatherPointed} />
              <span>Start Draft</span>
            </SubmitButton>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default BlogTab; 