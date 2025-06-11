import React, { useState, useEffect } from 'react';
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
  faFeatherPointed,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import NewBlogPost from '../ui/NewBlogPost';

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

/**
 * BlogTab component for admin dashboard.
 * @param {function} onTitleChange - Optional callback to set the parent header title dynamically.
 * @param {boolean} isNewPostMode - Whether the new post screen is active (controlled by parent).
 * @param {function} setIsNewPostMode - Function to set new post mode (controlled by parent).
 */
const BlogTab: React.FC<{
  onTitleChange?: (title: string) => void;
  isNewPostMode?: boolean;
  setIsNewPostMode?: (val: boolean) => void;
}> = ({ onTitleChange, isNewPostMode = false, setIsNewPostMode }) => {
  // Add filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Example blog posts data
  const examplePosts = [
    {
      id: 'post1',
      title: '10 Tips for Scaling Remote Teams',
      category: 'Leadership',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      status: 'Draft',
      date: 'Jan 15, 2025',
      tags: ['Leadership', 'Remote']
    },
    {
      id: 'post2',
      title: 'The Future of Work: AI Integration',
      category: 'Technology',
      author: {
        name: 'Mike Wilson',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      status: 'Published',
      date: 'Jan 10, 2025',
      tags: ['Technology', 'AI']
    },
    {
      id: 'post3',
      title: 'Building High-Performance Teams',
      category: 'Team Building',
      author: {
        name: 'Alex Patel',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      status: 'Draft',
      date: 'Jan 12, 2025',
      tags: ['Team Building', 'Leadership']
    },
    {
      id: 'post4',
      title: 'Effective Project Management Strategies',
      category: 'Management',
      author: {
        name: 'Lisa Tran',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      status: 'Published',
      date: 'Jan 8, 2025',
      tags: ['Management', 'Strategy']
    },
    {
      id: 'post5',
      title: 'Remote Team Communication Best Practices',
      category: 'Team Building',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      status: 'Draft',
      date: 'Jan 14, 2025',
      tags: ['Remote', 'Communication']
    },
    {
      id: 'post6',
      title: 'AI Tools for Team Productivity',
      category: 'Technology',
      author: {
        name: 'Mike Wilson',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      status: 'Published',
      date: 'Jan 9, 2025',
      tags: ['Technology', 'Productivity']
    }
  ];

  // Filter posts based on search query, category, and status
  const filteredPosts = examplePosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;

    const matchesStatus = selectedStatus === 'All Status' || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  // Update the parent title when isNewPostMode changes
  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(isNewPostMode ? 'New Blog Post' : 'Blog Management');
    }
  }, [isNewPostMode, onTitleChange]);

  // Replace handleOpenNewPost to use setIsNewPostMode
  const handleOpenNewPost = () => setIsNewPostMode && setIsNewPostMode(true);

  if (isNewPostMode) {
    return (
      <Container>
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => setIsNewPostMode && setIsNewPostMode(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#3B82F6', fontWeight: 600, fontSize: 18, padding: 0, cursor: 'pointer', width: 'fit-content' }}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        </div>
        <NewBlogPost />
      </Container>
    );
  }

  return (
    <Container>
      <ActionsBar>
        <SearchContainer>
          <div style={{ position: 'relative' }}>
            <SearchInput 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon icon={faSearch} />
          </div>
          <CategorySelect value={selectedCategory} onChange={handleCategoryChange}>
            <option>All Categories</option>
            <option>Leadership</option>
            <option>Team Building</option>
            <option>Management</option>
            <option>Technology</option>
          </CategorySelect>
          <CategorySelect value={selectedStatus} onChange={handleStatusChange}>
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </CategorySelect>
        </SearchContainer>
        <NewPostButton onClick={handleOpenNewPost}>
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
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <TableCell>
                  <PostTitle>
                    <TitleText>{post.title}</TitleText>
                    <CategoryTag $color="#00E915">{post.category}</CategoryTag>
                  </PostTitle>
                </TableCell>
                <TableCell>
                  <AuthorInfo>
                    <AuthorAvatar src={post.author.avatar} />
                    <AuthorName>{post.author.name}</AuthorName>
                  </AuthorInfo>
                </TableCell>
                <TableCell>
                  <StatusBadge $color={post.status === 'Published' ? '#00E915' : '#EC297B'}>
                    {post.status}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>{post.date}</span>
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
            ))}
          </TableBody>
        </Table>
      </BlogTable>

      {/* Mobile Card View */}
      <CardListContainer>
        {filteredPosts.map(post => (
          <PostCard key={post.id}>
            <CardHeader>
              <CardTitleGroup>
                <CardPostTitle>
                  {post.title}
                  <CategoryTag $color="#00E915">{post.category}</CategoryTag>
                </CardPostTitle>
                <CardDate>{post.date}</CardDate>
              </CardTitleGroup>
            </CardHeader>
            <CardContent>
              <CardDetailRow>
                <CardLabel>Author:</CardLabel>
                <CardValue>
                  <AuthorInfo>
                    <AuthorAvatar src={post.author.avatar} />
                    <AuthorName>{post.author.name}</AuthorName>
                  </AuthorInfo>
                </CardValue>
              </CardDetailRow>
              <CardDetailRow>
                <CardLabel>Status:</CardLabel>
                <CardValue>
                  <StatusBadge $color={post.status === 'Published' ? '#00E915' : '#EC297B'}>
                    {post.status}
                  </StatusBadge>
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
        ))}
      </CardListContainer>

      <FloatingAddButton onClick={handleOpenNewPost}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>
    </Container>
  );
};

export default BlogTab; 