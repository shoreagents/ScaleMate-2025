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
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.div`
  position: relative;
  width: 16rem;

  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(15, 23, 42, 0.4);
  }
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

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
        <Button $primary>
          <FaPlus />
          Create New Course
        </Button>
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
            <CourseFooter>
              <div style={{ flex: 1 }} />
              <ActionButtons>
                <PreviewButton>Preview</PreviewButton>
                <Button $primary>Publish</Button>
              </ActionButtons>
            </CourseFooter>
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
    </Container>
  );
};

export default CourseManagerTab; 