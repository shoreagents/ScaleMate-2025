import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faShareNodes, faXmark, faLink, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

interface Quote {
  id: string;
  roleTitle: string;
  experienceLevel: string;
  keyTasks: string[];
  teamSize: number;
  offshoreCost: string;
  localCost: string;
  savings: string;
  savingsPercent: string;
  createdAt: string;
}

// Import base modal components
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

const Container = styled.div`
  padding: 1.5rem;
  background-color: #F9FAFB;
  
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

const TimeSelect = styled.select`
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

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;

  @media (min-width: 889px) {
    width: 100%;
  }
  @media (max-width: 888px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeaderCell = styled.th<{ $align?: string }>`
  padding: 1rem 1.5rem;
  text-align: ${props => props.$align || 'left'};
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
`;

const TableBody = styled.tbody`
  & > tr {
    border-bottom: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const TableCell = styled.td<{ $align?: string }>`
  padding: 1rem 1.5rem;
  text-align: ${props => props.$align || 'left'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const RoleTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RoleId = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CostText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SavingsText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #84CC16;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const ViewButton = styled.button`
  color: #3B82F6;
  font-size: 0.875rem;
  background: none;
  border: none;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const IconButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover {
    color: #0F172A;
  }
`;

const CardContainer = styled.div`
  display: none;
  
  @media (max-width: 888px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const QuoteCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.25rem;
  
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

const CardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardId = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDate = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const CostItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const CostLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CostValue = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SavingsValue = styled.span`
  font-size: 0.875rem;
  color: #84CC16;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const QuoteModalOverlay = styled(ModalOverlay)``;
const QuoteModalContent = styled(ModalContent)``;
const QuoteModalHeader = styled(ModalHeader)``;
const QuoteModalTitle = styled(ModalTitle)``;
const QuoteCloseModalButton = styled(CloseModalButton)``;

const QuoteFormGroup = styled(ModalFormGroup)``;
const QuoteFormLabel = styled(ModalFormLabel)``;
const QuoteFormInput = styled(ModalFormInput)``;
const QuoteFormSelect = styled(ModalFormSelect)``;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
  cursor: pointer;
  
  &:checked {
    background-color: #3B82F6;
    border-color: #3B82F6;
  }
`;

const CheckboxText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const QuoteButtonGroup = styled(ModalButtonGroup)``;
const QuotePrimaryButton = styled(ModalPrimaryButton)``;
const QuoteSecondaryButton = styled(ModalSecondaryButton)``;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ReportCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
`;

const ReportLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 0.25rem;
`;

const ReportValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
`;

const ReportSavingsValue = styled(ReportValue)`
  color: #84CC16;
`;

const ReportSavingsPercent = styled.div`
  font-size: 0.875rem;
  color: #84CC16;
`;

const TasksContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  margin-bottom: 1.5rem;
`;

const TasksTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const TasksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TaskTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #0098FF;
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const ShareOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ShareOption = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background-color: white;
  color: #0F172A;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }

  &.linkedin {
    color: #0077B5;
    &:hover {
      background-color: rgba(0, 119, 181, 0.1);
      border-color: #0077B5;
    }
  }

  &.facebook {
    color: #4267B2;
    &:hover {
      background-color: rgba(66, 103, 178, 0.1);
      border-color: #4267B2;
    }
  }

  &.x {
    color: #000000;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-color: #000000;
    }
  }

  &.copy-link {
    color: #3B82F6;
    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
      border-color: #3B82F6;
    }
  }
`;

const ShareIcon = styled.div<{ $color?: string }>`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color || 'inherit'};
`;

const ShareDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(15, 23, 42, 0.4);
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E5E7EB;
  }
  
  &::before {
    margin-right: 1rem;
  }
  
  &::after {
    margin-left: 1rem;
  }
`;

const CopySuccessMessage = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: -2.5rem;
  left: 0;
  right: 0;
  background-color: #84CC16;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-align: center;
  opacity: ${props => props.$show ? 1 : 0};
  transform: translateY(${props => props.$show ? '0' : '0.5rem'});
  transition: all 0.2s;
  pointer-events: none;
`;

const SavedQuotesTab: React.FC = () => {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = React.useState(false);
  const [isViewReportModalOpen, setIsViewReportModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [selectedQuote, setSelectedQuote] = React.useState<Quote | null>(null);
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table');

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isNewQuoteModalOpen) setIsNewQuoteModalOpen(false);
        if (isViewReportModalOpen) setIsViewReportModalOpen(false);
        if (isShareModalOpen) setIsShareModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isNewQuoteModalOpen, isViewReportModalOpen, isShareModalOpen]);

  React.useEffect(() => {
    if (isShareModalOpen && selectedQuote) {
      setShareUrl(`${window.location.origin}/quotes/${selectedQuote.id}`);
    }
  }, [isShareModalOpen, selectedQuote]);

  const handleViewReport = (quote: typeof selectedQuote) => {
    setSelectedQuote(quote);
    setIsViewReportModalOpen(true);
  };

  const handleShare = (quote: typeof selectedQuote) => {
    setSelectedQuote(quote);
    setIsShareModalOpen(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, closeFn: () => void) => {
    if (e.target === e.currentTarget) closeFn();
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/quotes/${selectedQuote?.id}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    });
  };

  const handleSocialShare = (platform: 'linkedin' | 'facebook' | 'x') => {
    const url = `${window.location.origin}/quotes/${selectedQuote?.id}`;
    const title = encodeURIComponent(`Check out this ScaleMate quote for ${selectedQuote?.roleTitle}`);
    const text = encodeURIComponent(`I found this great offshore role quote on ScaleMate!`);
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Container>
      <ActionsContainer id="quotes-actions">
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search quotes..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
          <TimeSelect>
            <option>All Time</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </TimeSelect>
        </SearchFilterGroup>
        <CreateButton onClick={() => setIsNewQuoteModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
          <span>New Quote</span>
        </CreateButton>
      </ActionsContainer>

      <FloatingAddButton>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      <TableContainer id="quotes-table">
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell style={{ width: '25%' }}>Role</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }}>Date Created</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }} $align="right">Offshore Cost</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }} $align="right">Local Cost</TableHeaderCell>
              <TableHeaderCell style={{ width: '10%' }} $align="right">Savings</TableHeaderCell>
              <TableHeaderCell style={{ width: '20%' }} $align="right">Actions</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <RoleInfo>
                  <RoleTitle>Senior Sales Manager</RoleTitle>
                  <RoleId>#Q-2025-001</RoleId>
                </RoleInfo>
              </TableCell>
              <TableCell>
                <DateText>March 15, 2025</DateText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$2,500/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$7,500/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <SavingsText>67%</SavingsText>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ViewButton onClick={() => handleViewReport({
                    id: '1',
                    roleTitle: 'Senior Sales Manager',
                    experienceLevel: '5+ years',
                    keyTasks: ['Lead Generation', 'Client Communication', 'Deal Closing', 'Sales Reporting'],
                    teamSize: 3,
                    offshoreCost: '$2,500',
                    localCost: '$7,500',
                    savings: '$5,000',
                    savingsPercent: '67%',
                    createdAt: '2024-03-15'
                  })}>View Report</ViewButton>
                  <IconButton title="Share" onClick={() => handleShare({
                    id: '1',
                    roleTitle: 'Senior Sales Manager',
                    experienceLevel: '5+ years',
                    keyTasks: ['Lead Generation', 'Client Communication', 'Deal Closing', 'Sales Reporting'],
                    teamSize: 3,
                    offshoreCost: '$2,500',
                    localCost: '$7,500',
                    savings: '$5,000',
                    savingsPercent: '67%',
                    createdAt: '2024-03-15'
                  })}>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>

      <CardContainer>
        <QuoteCard>
          <CardHeader>
            <CardInfo>
              <CardTitle>Senior Sales Manager</CardTitle>
              <CardId>#Q-2025-001</CardId>
              <CardDate>March 15, 2025</CardDate>
            </CardInfo>
          </CardHeader>
          <CardContent>
            <CostItem>
              <CostLabel>Offshore Cost</CostLabel>
              <CostValue>$2,500/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Local Cost</CostLabel>
              <CostValue>$7,500/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Savings</CostLabel>
              <SavingsValue>67%</SavingsValue>
            </CostItem>
          </CardContent>
          <CardFooter>
            <ViewButton>View Report</ViewButton>
            <CardActions>
              <IconButton title="Share">
                <FontAwesomeIcon icon={faShareNodes} />
              </IconButton>
            </CardActions>
          </CardFooter>
        </QuoteCard>

        <QuoteCard>
          <CardHeader>
            <CardInfo>
              <CardTitle>Executive Assistant</CardTitle>
              <CardId>#Q-2025-002</CardId>
              <CardDate>March 10, 2025</CardDate>
            </CardInfo>
          </CardHeader>
          <CardContent>
            <CostItem>
              <CostLabel>Offshore Cost</CostLabel>
              <CostValue>$1,800/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Local Cost</CostLabel>
              <CostValue>$5,000/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Savings</CostLabel>
              <SavingsValue>64%</SavingsValue>
            </CostItem>
          </CardContent>
          <CardFooter>
            <ViewButton>View Report</ViewButton>
            <CardActions>
              <IconButton title="Share">
                <FontAwesomeIcon icon={faShareNodes} />
              </IconButton>
            </CardActions>
          </CardFooter>
        </QuoteCard>
      </CardContainer>

      <QuoteModalOverlay $isOpen={isNewQuoteModalOpen} onClick={e => handleOverlayClick(e, () => setIsNewQuoteModalOpen(false))}>
        <QuoteModalContent onClick={e => e.stopPropagation()}>
          <QuoteModalHeader>
            <QuoteModalTitle>Create New Quote</QuoteModalTitle>
            <QuoteCloseModalButton onClick={() => setIsNewQuoteModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </QuoteCloseModalButton>
          </QuoteModalHeader>
          <form onSubmit={e => { e.preventDefault(); setIsNewQuoteModalOpen(false); }}>
            <QuoteFormGroup>
              <QuoteFormLabel>Role Title</QuoteFormLabel>
              <QuoteFormInput
                type="text"
                placeholder="e.g. Senior Sales Manager"
              />
            </QuoteFormGroup>
            <QuoteFormGroup>
              <QuoteFormLabel>Experience Level</QuoteFormLabel>
              <QuoteFormSelect>
                <option>Entry Level (0-2 years)</option>
                <option>Mid Level (3-5 years)</option>
                <option>Senior Level (6+ years)</option>
              </QuoteFormSelect>
            </QuoteFormGroup>
            <QuoteFormGroup>
              <QuoteFormLabel>Key Tasks</QuoteFormLabel>
              <CheckboxContainer>
                <CheckboxLabel>
                  <CheckboxInput type="checkbox" />
                  <CheckboxText>Lead Generation</CheckboxText>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput type="checkbox" />
                  <CheckboxText>Client Communication</CheckboxText>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput type="checkbox" />
                  <CheckboxText>Deal Closing</CheckboxText>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput type="checkbox" />
                  <CheckboxText>Sales Reporting</CheckboxText>
                </CheckboxLabel>
              </CheckboxContainer>
            </QuoteFormGroup>
            <QuoteFormGroup>
              <QuoteFormLabel>Team Size</QuoteFormLabel>
              <QuoteFormInput
                type="number"
                placeholder="1"
              />
            </QuoteFormGroup>
            <QuoteButtonGroup>
              <QuoteSecondaryButton type="button" onClick={() => setIsNewQuoteModalOpen(false)}>
                Cancel
              </QuoteSecondaryButton>
              <QuotePrimaryButton type="submit">
                Generate Quote
              </QuotePrimaryButton>
            </QuoteButtonGroup>
          </form>
        </QuoteModalContent>
      </QuoteModalOverlay>

      <QuoteModalOverlay $isOpen={isViewReportModalOpen} onClick={e => handleOverlayClick(e, () => setIsViewReportModalOpen(false))}>
        <QuoteModalContent style={{ maxWidth: 800, width: '100%' }} onClick={e => e.stopPropagation()}>
          <QuoteModalHeader>
            <QuoteModalTitle>Quote Report - {selectedQuote?.roleTitle}</QuoteModalTitle>
            <QuoteCloseModalButton onClick={() => setIsViewReportModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </QuoteCloseModalButton>
          </QuoteModalHeader>
          <ReportGrid>
            <ReportCard>
              <ReportLabel>Offshore Cost</ReportLabel>
              <ReportValue>{selectedQuote?.offshoreCost}</ReportValue>
            </ReportCard>
            <ReportCard>
              <ReportLabel>Local Cost</ReportLabel>
              <ReportValue>{selectedQuote?.localCost}</ReportValue>
            </ReportCard>
            <ReportCard>
              <ReportLabel>Monthly Savings</ReportLabel>
              <ReportSavingsValue>{selectedQuote?.savings}</ReportSavingsValue>
              <ReportSavingsPercent>{selectedQuote?.savingsPercent} savings</ReportSavingsPercent>
            </ReportCard>
          </ReportGrid>
          <TasksContainer>
            <TasksTitle>Key Tasks & Responsibilities</TasksTitle>
            <TasksList>
              {selectedQuote?.keyTasks.map((task: string, index: number) => (
                <TaskTag key={index}>{task}</TaskTag>
              ))}
            </TasksList>
          </TasksContainer>
          <QuoteButtonGroup>
            <QuoteSecondaryButton onClick={() => setIsViewReportModalOpen(false)}>
              Close
            </QuoteSecondaryButton>
            <QuotePrimaryButton>
              <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: 8 }} />
              Download PDF
            </QuotePrimaryButton>
          </QuoteButtonGroup>
        </QuoteModalContent>
      </QuoteModalOverlay>

      <QuoteModalOverlay $isOpen={isShareModalOpen} onClick={e => handleOverlayClick(e, () => setIsShareModalOpen(false))}>
        <QuoteModalContent style={{ maxWidth: 400, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
          <QuoteModalHeader>
            <QuoteModalTitle>Share Quote</QuoteModalTitle>
            <QuoteCloseModalButton onClick={() => setIsShareModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </QuoteCloseModalButton>
          </QuoteModalHeader>
          
          <QuoteFormGroup>
            <QuoteFormLabel>Send to Email</QuoteFormLabel>
            <QuoteFormInput
              type="email"
              placeholder="colleague@company.com"
            />
            <QuotePrimaryButton style={{ marginTop: '0.5rem', width: '100%' }}>
              Send Email
            </QuotePrimaryButton>
          </QuoteFormGroup>

          <ShareDivider>or share via</ShareDivider>

          <ShareOptionsGrid>
            <ShareOption 
              className="linkedin"
              onClick={() => handleSocialShare('linkedin')}
            >
              <ShareIcon $color="#0077B5">
                <FontAwesomeIcon icon={faLinkedin} />
              </ShareIcon>
              LinkedIn
            </ShareOption>
            
            <ShareOption 
              className="facebook"
              onClick={() => handleSocialShare('facebook')}
            >
              <ShareIcon $color="#4267B2">
                <FontAwesomeIcon icon={faFacebook} />
              </ShareIcon>
              Facebook
            </ShareOption>
            
            <ShareOption 
              className="x"
              onClick={() => handleSocialShare('x')}
            >
              <ShareIcon $color="#000000">
                <FontAwesomeIcon icon={faTwitter} />
              </ShareIcon>
              X
            </ShareOption>
            
            <ShareOption 
              className="copy-link"
              onClick={handleCopyLink}
            >
              <ShareIcon $color="#3B82F6">
                <FontAwesomeIcon icon={faCopy} />
              </ShareIcon>
              Copy Link
            </ShareOption>
          </ShareOptionsGrid>

          <CopySuccessMessage $show={showCopySuccess}>
            Link copied to clipboard!
          </CopySuccessMessage>

          <QuoteButtonGroup>
            <QuoteSecondaryButton onClick={() => setIsShareModalOpen(false)}>
              Cancel
            </QuoteSecondaryButton>
          </QuoteButtonGroup>
        </QuoteModalContent>
      </QuoteModalOverlay>
    </Container>
  );
};

export default SavedQuotesTab; 