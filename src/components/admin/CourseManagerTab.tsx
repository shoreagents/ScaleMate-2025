import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaUsers, FaBook, FaTrophy, FaPen, FaArchive, FaPaperPlane, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const FiltersContainer = styled.div`
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

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1002px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
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

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const Select = styled.select`
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

const FilterBarButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  height: 2.5rem;
  box-sizing: border-box;

  ${props => props.$primary ? `
    background-color: #3B82F6;
    color: white;
    border: none;
    &:hover {
      background-color: #2563EB;
    }
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
  `}

  @media (max-width: 1002px) {
    display: none;
  }
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  height: 2.5rem;
  box-sizing: border-box;

  ${props => props.$primary ? `
    background-color: #3B82F6;
    color: white;
    border: none;
    &:hover {
      background-color: #2563EB;
    }
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
  `}
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

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CourseCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const CourseImage = styled.div`
  position: relative;
  height: 12rem;
`;

const CourseThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusTag = styled.span<{ $color: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.$color};
  color: white;
  font-size: 0.875rem;
  border-radius: 9999px;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const CourseType = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const CourseStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  color: rgba(15, 23, 42, 0.7);
`;

const StatIcon = styled.div<{ $color?: string }>`
  margin-right: 0.5rem;
  color: ${props => props.$color || 'inherit'};
`;

const CourseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarGroup = styled.div`
  display: flex;
  margin-right: -0.5rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: -0.5rem;
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

const PreviewButton = styled(Button)`
  margin-right: 0.5rem;
`;

const CenteredFooter = styled(CourseFooter)`
  justify-content: center;
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
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.25rem;
`;

const ModalSubtitle = styled.p`
  color: rgba(15, 23, 42, 0.6);
  font-size: 1rem;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
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

const CourseTypeButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const CourseTypeButton = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.$selected ? '#3B82F6' : '#E5E7EB'};
  background: ${props => props.$selected ? 'rgba(59, 130, 246, 0.1)' : 'white'};
  color: ${props => props.$selected ? '#3B82F6' : '#0F172A'};
  font-weight: ${props => props.$selected ? 600 : 400};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  box-shadow: ${props => props.$selected ? '0 0 0 2px #3B82F6' : 'none'};
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  width: 3rem;
  height: 1.75rem;
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
  left: ${props => props.$isActive ? '1.5rem' : '0.25rem'};
  top: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: left 0.2s;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
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

  &:hover {
    background-color: #2563EB;
  }
`;

const CourseManagerTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    type: 'Free',
    tags: '',
    xp: '',
    addModulesLater: true
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
  };
  const handleToggleModules = () => {
    setFormData(prev => ({ ...prev, addModulesLater: !prev.addModulesLater }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create course logic
    handleCloseModal();
  };

  return (
    <Container>
      <FiltersContainer>
        <FilterGroup>
          <SearchInput>
            <FaSearch />
            <input type="text" placeholder="Search courses..." />
          </SearchInput>
          <Select>
            <option>All Types</option>
            <option>Free Courses</option>
            <option>Premium Courses</option>
          </Select>
        </FilterGroup>
        <FilterBarButton $primary onClick={handleOpenModal}>
          <FaPlus />
          Create New Course
        </FilterBarButton>
      </FiltersContainer>

      <CoursesGrid>
        {/* Course Card 1 */}
        <CourseCard>
          <CourseImage>
            <CourseThumbnail 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8129a716c7-483d23aecd87f86a7c5b.png" 
              alt="modern online course thumbnail showing project management concepts, minimal design style" 
            />
            <StatusTag $color="#00E915">Active</StatusTag>
          </CourseImage>
          <CourseContent>
            <CourseHeader>
              <CourseTitle>Project Management Fundamentals</CourseTitle>
              <CourseType $color="#3B82F6">Premium</CourseType>
            </CourseHeader>
            <CourseStats>
              <StatItem>
                <StatIcon>
                  <FaUsers />
                </StatIcon>
                <span>234 Enrolled</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaBook />
                </StatIcon>
                <span>12 Modules</span>
              </StatItem>
              <StatItem>
                <StatIcon $color="#00E915">
                  <FaTrophy />
                </StatIcon>
                <span>500 XP</span>
              </StatItem>
            </CourseStats>
            <CourseFooter>
              <AvatarGroup>
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" />
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" />
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" />
              </AvatarGroup>
              <ActionButtons>
                <IconButton $color="#3B82F6" title="Edit">
                  <FaPen />
                </IconButton>
                <IconButton $color="#EC297B" title="Archive">
                  <FaArchive />
                </IconButton>
              </ActionButtons>
            </CourseFooter>
          </CourseContent>
        </CourseCard>

        {/* Course Card 2 */}
        <CourseCard>
          <CourseImage>
            <CourseThumbnail 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b4bdde4df1-6e1193f09828cf1a0343.png" 
              alt="digital marketing course thumbnail with social media icons, modern design" 
            />
            <StatusTag $color="#EC297B">Draft</StatusTag>
          </CourseImage>
          <CourseContent>
            <CourseHeader>
              <CourseTitle>Digital Marketing Essentials</CourseTitle>
              <CourseType $color="#00E915">Free</CourseType>
            </CourseHeader>
            <CourseStats>
              <StatItem>
                <StatIcon>
                  <FaUsers />
                </StatIcon>
                <span>0 Enrolled</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaBook />
                </StatIcon>
                <span>8 Modules</span>
              </StatItem>
              <StatItem>
                <StatIcon $color="#00E915">
                  <FaTrophy />
                </StatIcon>
                <span>300 XP</span>
              </StatItem>
            </CourseStats>
            <CenteredFooter>
              <PreviewButton as={Button}>Preview</PreviewButton>
              <Button $primary>Publish</Button>
            </CenteredFooter>
          </CourseContent>
        </CourseCard>

        {/* Course Card 3 */}
        <CourseCard>
          <CourseImage>
            <CourseThumbnail 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/086157b763-f979e2ff769e362e5de2.png" 
              alt="leadership skills course thumbnail with abstract team illustration, corporate style" 
            />
            <StatusTag $color="#00E915">Active</StatusTag>
          </CourseImage>
          <CourseContent>
            <CourseHeader>
              <CourseTitle>Leadership Skills 101</CourseTitle>
              <CourseType $color="#3B82F6">Premium</CourseType>
            </CourseHeader>
            <CourseStats>
              <StatItem>
                <StatIcon>
                  <FaUsers />
                </StatIcon>
                <span>156 Enrolled</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaBook />
                </StatIcon>
                <span>10 Modules</span>
              </StatItem>
              <StatItem>
                <StatIcon $color="#00E915">
                  <FaTrophy />
                </StatIcon>
                <span>400 XP</span>
              </StatItem>
            </CourseStats>
            <CourseFooter>
              <AvatarGroup>
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" />
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" />
              </AvatarGroup>
              <ActionButtons>
                <IconButton $color="#3B82F6" title="Edit">
                  <FaPen />
                </IconButton>
                <IconButton $color="#EC297B" title="Archive">
                  <FaArchive />
                </IconButton>
              </ActionButtons>
            </CourseFooter>
          </CourseContent>
        </CourseCard>
      </CoursesGrid>

      <FloatingAddButton onClick={handleOpenModal}>
        <FaPlus />
      </FloatingAddButton>

      {/* Create Course Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseModalButton onClick={handleCloseModal}>
            <FaTimes />
          </CloseModalButton>
          <ModalHeader>
            <ModalTitle>Create New Course</ModalTitle>
            <ModalSubtitle>Quickly scaffold a new course. You can add modules later.</ModalSubtitle>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Course Title</FormLabel>
              <FormInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Course Type</FormLabel>
              <CourseTypeButtonGroup>
                <CourseTypeButton
                  type="button"
                  $selected={formData.type === 'Free'}
                  onClick={() => handleTypeSelect('Free')}
                >
                  Free
                </CourseTypeButton>
                <CourseTypeButton
                  type="button"
                  $selected={formData.type === 'Premium'}
                  onClick={() => handleTypeSelect('Premium')}
                >
                  Premium
                </CourseTypeButton>
              </CourseTypeButtonGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>Tag(s)</FormLabel>
              <FormInput
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Ex: AI, Delegation"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>XP Reward</FormLabel>
              <FormInput
                type="number"
                name="xp"
                value={formData.xp}
                onChange={handleInputChange}
                placeholder="e.g. 200"
                style={{ border: '2px solid #00E915', color: '#0F172A', fontWeight: 600 }}
              />
            </FormGroup>
            <ToggleContainer>
              <FormLabel>Add Modules Later</FormLabel>
              <ToggleButton
                type="button"
                $isActive={formData.addModulesLater}
                onClick={handleToggleModules}
                aria-pressed={formData.addModulesLater}
              >
                <ToggleKnob $isActive={formData.addModulesLater} />
              </ToggleButton>
            </ToggleContainer>
            <SubmitButton type="submit">
              <FaPaperPlane style={{ marginRight: 8 }} />
              Create Course
            </SubmitButton>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default CourseManagerTab; 