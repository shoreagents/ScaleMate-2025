import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faEye, 
  faArrowsUpDown,
  faArchive,
  faCloudUpload,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 1236px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1236px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1236px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
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

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1236px) {
    display: none;
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
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 1236px) {
    display: none;
  }
`;

const PreviewButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  color: #0F172A;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }

  @media (max-width: 1236px) {
    width: 100%;
  }
`;

const AddQuestionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 1236px) {
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

  @media (max-width: 1236px) {
    display: flex;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1366px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const QuestionsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;

  @media (max-width: 1024px) {
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

const QuestionText = styled.div`
  color: #0F172A;
`;

const TypeBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  font-size: 0.875rem;
`;

const CategoryBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
  font-size: 0.875rem;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const StatusDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #00E915;
  margin-right: 0.5rem;
`;

const TableActionButtons = styled.div`
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

const ScoringPanel = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const PanelTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TierItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TierLabel = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const TierValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #00E915;
`;

const Divider = styled.div`
  border-top: 1px solid #E5E7EB;
  margin: 1.5rem 0;
`;

const RangeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RangeItem = styled.div``;

const RangeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const RangeLabel = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const RangeValue = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ProgressBar = styled.div<{ $color: string }>`
  height: 0.5rem;
  background-color: ${props => `${props.$color}/20`};
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $color: string; $width: string }>`
  height: 100%;
  background-color: ${props => props.$color};
  border-radius: 9999px;
  width: ${props => props.$width};
`;

// Add a new wrapper for mobile layout
const MobileActionsGrid = styled.div`
  display: none;

  @media (max-width: 1236px) {
    display: grid;
    width: 100%;
    gap: 1rem;
    grid-template-rows: repeat(2, 1fr);
  }
`;

const MobileRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CardListContainer = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.25rem 1rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardQuestionText = styled.div`
  color: #0F172A;
  font-weight: 500;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardLabel = styled.span`
  color: #64748B;
  font-size: 0.875rem;
  min-width: 70px;
`;

const CardBadge = styled.span<{ $color: string; $bg: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.$bg};
  color: ${props => props.$color};
  font-size: 0.875rem;
`;

const CardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
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
  max-width: 35rem;
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
  border-radius: 9999px;
  &:hover { color: #0F172A; background: #F9FAFB; }
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

const AnswerOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AnswerOptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CorrectToggle = styled.button<{ $isCorrect: boolean }>`
  border-radius: 9999px;
  border: 2px solid ${props => props.$isCorrect ? '#84CC16' : '#E5E7EB'};
  background: ${props => props.$isCorrect ? '#84CC16' : 'white'};
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  &:focus { outline: 2px solid #3B82F6; }
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  &:focus { border-color: #3B82F6; outline: none; }
`;

const ScoreInput = styled.input`
  width: 4.5rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: #0F172A;
  text-align: right;
  background: white;
  &:focus { border-color: #3B82F6; outline: none; }
`;

const RemoveOptionButton = styled.button<{ $disabled?: boolean }>`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background: none;
  color: #EC297B;
  border: none;
  font-size: 1rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.3 : 1};
  transition: background 0.2s;
  &:hover { background: #F9FAFB; }
`;

const AddOptionButton = styled.button`
  margin-top: 0.5rem;
  color: #3B82F6;
  background: none;
  border: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  &:hover { color: #2563EB; }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid #E5E7EB;
  background: #F9FAFB;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem 1.5rem;
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
  &:hover { background-color: #F9FAFB; }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  &:hover { background-color: #2563EB; }
`;

const QuizManagerTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [questionText, setQuestionText] = useState('');
  const [answerOptions, setAnswerOptions] = useState([
    { text: '', score: '', isCorrect: false },
    { text: '', score: '', isCorrect: false },
    { text: '', score: '', isCorrect: false },
    { text: '', score: '', isCorrect: false }
  ]);
  const [segmentTag, setSegmentTag] = useState('');

  // Sample quiz questions data
  const exampleQuestions = [
    {
      id: 1,
      question: 'How many years of management experience do you have?',
      type: 'Slider',
      category: 'Experience',
      status: 'Active'
    },
    {
      id: 2,
      question: 'What is your preferred leadership style?',
      type: 'Multiple Choice',
      category: 'Leadership',
      status: 'Active'
    },
    {
      id: 3,
      question: 'How do you handle team conflicts?',
      type: 'Multiple Choice',
      category: 'Conflict Resolution',
      status: 'Draft'
    },
    {
      id: 4,
      question: 'Rate your communication skills (1-10)',
      type: 'Rating',
      category: 'Communication',
      status: 'Active'
    },
    {
      id: 5,
      question: 'What is your experience with remote team management?',
      type: 'Multiple Choice',
      category: 'Remote Work',
      status: 'Active'
    },
    {
      id: 6,
      question: 'How do you prioritize tasks in a project?',
      type: 'Multiple Choice',
      category: 'Project Management',
      status: 'Draft'
    }
  ];

  // Get unique categories and statuses for dropdowns
  const categories = ['All Categories', ...new Set(exampleQuestions.map(q => q.category))];
  const statuses = ['All Status', ...new Set(exampleQuestions.map(q => q.status))];

  // Filter questions based on search query and selected filters
  const filteredQuestions = exampleQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || question.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || question.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
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

  // Answer option handlers
  const handleOptionTextChange = (idx: number, value: string) => {
    setAnswerOptions(prev => prev.map((opt, i) => i === idx ? { ...opt, text: value } : opt));
  };
  const handleOptionScoreChange = (idx: number, value: string) => {
    setAnswerOptions(prev => prev.map((opt, i) => i === idx ? { ...opt, score: value } : opt));
  };
  const handleAddOption = () => {
    setAnswerOptions(prev => [...prev, { text: '', score: '', isCorrect: false }]);
  };
  const handleRemoveOption = (idx: number) => {
    if (answerOptions.length > 4) {
      setAnswerOptions(prev => prev.filter((_, i) => i !== idx));
    }
  };
  const handleToggleCorrect = (idx: number) => {
    setAnswerOptions(prev => prev.map((opt, i) => ({ ...opt, isCorrect: i === idx })));
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add question logic
    handleCloseModal();
  };

  return (
    <Container>
      <ActionsBar>
        {/* Desktop layout */}
        <SearchContainer>
          <SearchWrapper>
            <SearchInput 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon icon={faSearch} />
          </SearchWrapper>
          <FilterButtons>
            <FilterButton 
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterButton>
            <FilterButton 
              as="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </FilterButton>
          </FilterButtons>
        </SearchContainer>
        <ActionButtons>
          <PreviewButton>
            <FontAwesomeIcon icon={faEye} />
            Preview Quiz
          </PreviewButton>
          <AddQuestionButton onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faPlus} />
            Add Question
          </AddQuestionButton>
        </ActionButtons>
        {/* Mobile layout */}
        <MobileActionsGrid>
          <MobileRow>
            <SearchWrapper>
              <SearchInput 
                type="text" 
                placeholder="Search questions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>
            <FilterButton 
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterButton>
          </MobileRow>
          <MobileRow>
            <FilterButton 
              as="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </FilterButton>
            <PreviewButton>
              <FontAwesomeIcon icon={faEye} />
              Preview Quiz
            </PreviewButton>
          </MobileRow>
        </MobileActionsGrid>
      </ActionsBar>

      <ContentGrid>
        <>
          <QuestionsTable>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Question</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {filteredQuestions.map(question => (
                  <tr key={question.id}>
                    <TableCell>
                      <QuestionText>{question.question}</QuestionText>
                    </TableCell>
                    <TableCell>
                      <TypeBadge>{question.type}</TypeBadge>
                    </TableCell>
                    <TableCell>
                      <CategoryBadge>{question.category}</CategoryBadge>
                    </TableCell>
                    <TableCell>
                      <StatusIndicator>
                        <StatusDot style={{ 
                          backgroundColor: question.status === 'Active' ? '#00E915' : '#EC297B' 
                        }} />
                        {question.status}
                      </StatusIndicator>
                    </TableCell>
                    <TableCell>
                      <TableActionButtons>
                        <ActionButton>
                          <FontAwesomeIcon icon={faPen} />
                        </ActionButton>
                        <ActionButton>
                          <FontAwesomeIcon icon={faArrowsUpDown} />
                        </ActionButton>
                        <ActionButton $color="#EC297B">
                          <FontAwesomeIcon icon={faArchive} />
                        </ActionButton>
                      </TableActionButtons>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </QuestionsTable>
          {/* Card view for mobile/tablet */}
          <CardListContainer>
            {filteredQuestions.map(question => (
              <QuestionCard key={question.id}>
                <CardHeader>
                  <CardQuestionText>{question.question}</CardQuestionText>
                </CardHeader>
                <CardMeta>
                  <CardMetaRow>
                    <CardLabel>Type:</CardLabel>
                    <CardBadge $color="#3B82F6" $bg="rgba(59,130,246,0.1)">{question.type}</CardBadge>
                  </CardMetaRow>
                  <CardMetaRow>
                    <CardLabel>Category:</CardLabel>
                    <CardBadge $color="#00E915" $bg="rgba(0,233,21,0.1)">{question.category}</CardBadge>
                  </CardMetaRow>
                  <CardMetaRow>
                    <CardLabel>Status:</CardLabel>
                    <CardStatus>
                      <StatusDot style={{ 
                        backgroundColor: question.status === 'Active' ? '#00E915' : '#EC297B' 
                      }} />
                      {question.status}
                    </CardStatus>
                  </CardMetaRow>
                </CardMeta>
                <CardActions>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faArrowsUpDown} />
                  </ActionButton>
                  <ActionButton $color="#EC297B">
                    <FontAwesomeIcon icon={faArchive} />
                  </ActionButton>
                </CardActions>
              </QuestionCard>
            ))}
          </CardListContainer>
        </>
        <ScoringPanel>
          <PanelTitle>Scoring Logic</PanelTitle>
          
          <Section>
            <SectionTitle>Experience Tiers</SectionTitle>
            <TierList>
              <TierItem>
                <TierLabel>Junior (0-2 years)</TierLabel>
                <TierValue>+10 XP</TierValue>
              </TierItem>
              <TierItem>
                <TierLabel>Mid-Level (3-5 years)</TierLabel>
                <TierValue>+20 XP</TierValue>
              </TierItem>
              <TierItem>
                <TierLabel>Senior (6+ years)</TierLabel>
                <TierValue>+30 XP</TierValue>
              </TierItem>
            </TierList>
          </Section>

          <Divider />

          <Section>
            <SectionTitle>Outcome Ranges</SectionTitle>
            <RangeList>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Ready to Lead</RangeLabel>
                  <RangeValue>80-100 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#00E915">
                  <ProgressFill $color="#00E915" $width="100%" />
                </ProgressBar>
              </RangeItem>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Almost There</RangeLabel>
                  <RangeValue>50-79 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#3B82F6">
                  <ProgressFill $color="#3B82F6" $width="75%" />
                </ProgressBar>
              </RangeItem>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Need Training</RangeLabel>
                  <RangeValue>0-49 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#EC297B">
                  <ProgressFill $color="#EC297B" $width="45%" />
                </ProgressBar>
              </RangeItem>
            </RangeList>
          </Section>
        </ScoringPanel>
      </ContentGrid>

      <FloatingAddButton onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      {/* Create New Quiz Question Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Create New Quiz Question</ModalTitle>
            <CloseModalButton onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Question Text</FormLabel>
              <FormInput
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Enter your question here"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Answer Options <span style={{ color: '#EC297B' }}>*</span></FormLabel>
              <AnswerOptionsList>
                {answerOptions.map((opt, idx) => (
                  <AnswerOptionRow key={idx}>
                    <CorrectToggle
                      type="button"
                      $isCorrect={opt.isCorrect}
                      title="Mark as Correct"
                      onClick={() => handleToggleCorrect(idx)}
                    >
                      {opt.isCorrect && <FontAwesomeIcon icon={faCheck} style={{ color: '#fff', fontSize: 12 }} />}
                    </CorrectToggle>
                    <OptionInput
                      type="text"
                      value={opt.text}
                      onChange={e => handleOptionTextChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      required
                    />
                    <ScoreInput
                      type="number"
                      value={opt.score}
                      onChange={e => handleOptionScoreChange(idx, e.target.value)}
                      placeholder="Score"
                    />
                    <RemoveOptionButton
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      $disabled={answerOptions.length <= 4}
                      disabled={answerOptions.length <= 4}
                      title="Remove Option"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </RemoveOptionButton>
                  </AnswerOptionRow>
                ))}
              </AnswerOptionsList>
              <AddOptionButton type="button" onClick={handleAddOption}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} /> Add Option
              </AddOptionButton>
            </FormGroup>
            <FormGroup>
              <FormLabel>Segment or Result Tag</FormLabel>
              <FormInput
                type="text"
                value={segmentTag}
                onChange={e => setSegmentTag(e.target.value)}
                placeholder="E.g. Experience, Leadership"
              />
            </FormGroup>
            <ModalFooter>
              <CancelButton type="button" onClick={handleCloseModal}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: 8 }} />
                Add Question
              </SubmitButton>
            </ModalFooter>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default QuizManagerTab; 