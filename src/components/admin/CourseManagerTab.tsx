import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaUsers, FaBook, FaTrophy, FaPen, FaArchive } from 'react-icons/fa';

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

const CourseManagerTab: React.FC = () => {
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
        <FilterBarButton $primary>
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

      <FloatingAddButton>
        <FaPlus />
      </FloatingAddButton>
    </Container>
  );
};

export default CourseManagerTab; 