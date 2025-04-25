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
  faList
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 16rem;
  font-size: 0.875rem;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
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
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;
  font-size: 0.875rem;
`;

const NewPostButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const BlogTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
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

const BlogTab: React.FC = () => {
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
        <NewPostButton>
          <FontAwesomeIcon icon={faPlus} />
          New Post
        </NewPostButton>
      </ActionsBar>

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
    </Container>
  );
};

export default BlogTab; 