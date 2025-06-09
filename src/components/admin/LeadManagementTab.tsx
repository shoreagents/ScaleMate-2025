// LeadManagementTab.tsx cleared. See LeadManagementTab.tsx.backup for the previous implementation.

import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faDownload, 
  faPlus,
  faChevronDown,
  faChevronUp,
  faTimes,
  faArrowRight,
  faFileArrowDown,
  faTrash,
  faEye,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  position: relative; /* For positioning FAB if needed, though fixed is usually viewport-relative */
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 1339px) { /* Desktop */
    flex-direction: row;
    gap: 1rem; 
    justify-content: space-between; 
  }

  @media (max-width: 1338px) {
    flex-direction: column;
    gap: 1.5rem; 
    align-items: stretch;
  }

  @media (max-width: 888px) {
    gap: 1rem; // Adjust gap for more rows
  }
`;

const FilterGroup = styled.div` 
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 888px) { /* Mobile */
    flex-direction: column;
    align-items: stretch; 
  }
  @media (min-width: 1339px) { /* Desktop */
    flex: 3 1 auto; /* Grow more, shrink, basis auto. Ratio example: 3 for FilterGroup, 1 for DateContainer */
    min-width: 0; /* Allow shrinking below content size */
  }
`;

const SelectsRow = styled.div`
  display: flex;
  gap: 0.75rem; 

  & > * { 
    flex: 1; 
    min-width: 0; 
  }

  @media (max-width: 888px) { /* Mobile */
    width: 100%; 
  }

  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    flex: 1; 
    min-width: 0;
  }
  @media (min-width: 1339px) { /* Desktop - within FilterGroup */
    flex: 1 1 22rem; /* Example basis for two selects, can grow/shrink */
    min-width: 16rem; /* Minimum for two selects */
  }
`;

const SearchContainer = styled.div`
  position: relative;

  @media (max-width: 888px) { /* Mobile */
    width: 100%; 
  }

  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    flex: 1; 
    min-width: 0;
  }
  @media (min-width: 1339px) { /* Desktop - within FilterGroup */
    flex: 1 1 18rem; /* Example basis, can grow/shrink */
    min-width: 12rem; 
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  /* width: 16rem; -- Default width for desktop REMOVED */
  font-size: 0.875rem;
  height: 2.5rem; 
  box-sizing: border-box; 
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }

  @media (max-width: 1338px) { /* Tablet and Mobile */
    width: 100%; 
  }
  @media (min-width: 1339px) { /* Desktop */
    width: 100%; /* Fills SearchContainer */
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
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
  height: 2.5rem; /* Consistent height */
  box-sizing: border-box; /* Ensure padding & border are included in height */

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DateContainer = styled.div`
  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    flex: 1; 
    min-width: 0;
  }
  @media (min-width: 1339px) { /* Desktop */
    flex: 1 1 10rem; 
    min-width: 8rem; 
  }
  @media (max-width: 888px) { /* Mobile */
    flex: 1;
    min-width: 0;
  }
`;

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  height: 2.5rem; 
  box-sizing: border-box; 

  @media (max-width: 888px) { /* Mobile */
    width: 100%; /* Fills DateContainer */
  }

  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    width: 100%; 
  }

  @media (min-width: 1339px) { /* Desktop */
    width: 100%; 
  }
`;

const DateAndActionsGroup = styled.div`
  @media (min-width: 1339px) { /* Desktop */
    display: contents; 
  }

  @media (max-width: 1338px) { /* Tablet & Mobile (tablet specifics were for its children) */
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    gap: 1rem; 
    width: 100%; 
  }

  @media (max-width: 888px) { /* Mobile specific adjustments for row layout */
    flex-direction: row; /* Ensure it's a row */
    gap: 0.75rem;      /* Match SelectsRow gap */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 1339px) { /* Desktop */
    margin-left: auto; 
    flex-shrink: 1; 
  }

  @media (max-width: 1338px) { /* Tablet & Mobile general */
    margin-left: 0; 
  }

  @media (max-width: 888px) { /* Mobile specific */
    flex: 1; /* Corrected: Make ButtonGroup take 50% of row space */
    min-width: 0;
    /* width: 100%; was removed, this is correct */
  }

  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    flex: 1; 
    min-width: 0;
    display: flex; 
    gap: 0.75rem; 
  }
`;

const StyledButton = styled.button<{ $primary?: boolean; $isFabHidden?: boolean }>`
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

  ${props => props.$isFabHidden && `
    @media (max-width: 888px) {
      display: none;
    }
  `}

  @media (max-width: 888px) { /* Mobile */
    ${props => !props.$primary && !props.$isFabHidden && `
      width: 100%; 
    `}
  }

  @media (min-width: 889px) and (max-width: 1338px) { /* Tablet */
    flex: 1; /* Each button takes 50% of ButtonGroup width, like Selects */
    min-width: 0;
  }
`;

const FloatingAddButton = styled.button`
  display: none; /* Hidden by default */
  @media (max-width: 888px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem; /* 56px */
    height: 3.5rem; /* 56px */
    background-color: #3B82F6;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-size: 1.5rem; /* For the + icon */
    cursor: pointer;
    z-index: 1000; /* Current z-index */
    transition: background-color 0.2s, transform 0.2s;

    &:hover {
      background-color: #2563EB;
      transform: scale(1.05);
    }
  }
`;

// Styled components for the Table
const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.75rem; 
  border: 1px solid #E5E7EB;
  margin-top: 1.5rem; 

  @media (min-width: 889px) {
    overflow-x: auto; /* Enable horizontal scrolling on tablet/desktop */
  }

  @media (max-width: 888px) {
    display: none; /* Hide table on mobile */
  }
`;

const StyledTable = styled.table`
  width: 100%;
  @media (min-width: 889px) {
     /* min-width: 60rem; */ /* Example: Set a min-width for the table itself if needed */
  }
`;

const TableHeader = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableBody = styled.tbody`
  & tr {
    transition: background-color 0.15s ease-in-out;
  }
  & tr:hover {
    background-color: #F9FAFB;
  }
  & tr td {
    /* For divide-y effect, apply border-top to all but first row's cells if not using direct divide class */
  }
  /* More robust divide-y would be: */
  & > tr:not(:first-child) {
    border-top: 1px solid #E5E7EB;
  }
`;

const TableRow = styled.tr`
  /* hover:bg-[#F9FAFB] is handled by TableBody hover */
  /* cursor-pointer can be added if rows are interactive */
  cursor: pointer; 
`;

const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  color: rgba(15, 23, 42, 0.7);

  .lead-name-container {
    display: flex;
    align-items: center;
    color: #0F172A;
    gap: 0.75rem;
  }

  .lead-name {
    font-weight: 500;
  }

  .lead-email {
    font-size: 0.875rem;
    color: rgba(15, 23, 42, 0.7);
    display: block;
  }
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const Tag = styled.span<{
  bgColor?: string;
  textColor?: string;
}>`
  display: inline-block;
  padding: 0.25rem 0.5rem; /* px-2 py-1 */
  background-color: ${props => props.bgColor || 'rgba(0, 152, 255, 0.1)'}; /* Default for Quote */
  color: ${props => props.textColor || '#0098FF'};
  border-radius: 9999px; /* rounded-full */
  font-size: 0.875rem; /* text-sm */
  margin-right: 0.5rem; /* mr-2 for multiple tags */

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 365px) {
    font-size: 0.75rem; /* 12px */
    padding: 0.125rem 0.375rem; /* Adjust padding slightly for smaller font */
  }
`;

// --- Styled Components for Mobile Card View ---
const CardListContainer = styled.div`
  display: none; /* Hidden by default */
  margin-top: 1.5rem;

  @media (max-width: 888px) {
    display: block; /* Visible on mobile */
  }
`;

const LeadCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #E5E7EB; /* Always show border as if open */
`;

const CardSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Default gap */

  @media (max-width: 365px) {
    gap: 0.5rem; /* Reduced gap for very small screens */
  }
`;

const CardName = styled.span`
  font-weight: 500;
  color: #0F172A;

  @media (max-width: 365px) {
    font-size: 0.8125rem; /* 13px - Corrected syntax */
  }
`;

const CardEmail = styled.span`
  font-size: 0.875rem; /* 14px default for card view - Corrected syntax */
  color: rgba(15, 23, 42, 0.7);
  display: block; 

  @media (max-width: 365px) {
    font-size: 0.75rem; /* 12px - Corrected syntax */
  }
`;

const CardNameEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardDetails = styled.div`
  padding: 1rem;
  background-color: #F9FAFB; /* Slightly different background for details */
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 365px) {
    font-size: 0.75rem; /* 12px */
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const DetailValue = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: right;

  /* For tags, allow them to wrap if many */
  &.tags-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.25rem; /* Gap between tags */
  }
`;

// --- Styled Components for Detail Sidebar ---
const DetailSidebarAside = styled.aside<{
  $isOpen: boolean;
}>`
  position: fixed;
  right: 0;
  top: 0;
  width: 24rem; /* w-96 (96*0.25rem) */
  height: 100%;
  background-color: #F1F5F9; /* bg-[#F1F5F9] */
  border-left: 1px solid #E5E7EB;
  padding: 1.5rem; /* p-6 */
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(24rem)'}; /* translate-x-96 */
  transition: transform 0.3s ease-in-out; /* duration-200 is fast, using 300ms */
  z-index: 2000; /* Ensure it's above other content like FAB */
  overflow-y: auto; /* Allow scrolling for long content */

  @media (max-width: 382px) {
    width: 100%;
    border-left: none; /* Remove border when full width */
    /* Adjust transform for full width slide */
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem; /* mb-6 */
`;

const SidebarTitle = styled.h2`
  font-size: 1.125rem; /* text-lg */
  font-weight: 700; /* font-bold */
  color: #0F172A;
`;

const CloseButton = styled.button`
  color: rgba(15, 23, 42, 0.4); /* text-[#0F172A]/40 */
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1.25rem; /* Make icon a bit larger */

  &:hover {
    color: #0F172A;
  }
`;

const SidebarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 0.75rem; /* rounded-xl */
  padding: 1rem; /* p-4 */
`;

const LeadInfoMain = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem; /* mb-4 */
`;

const LeadAvatarLarge = styled(Avatar)` /* Reusing and extending Avatar */
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  margin-right: 1rem; /* mr-4 */
`;

const LeadNameLarge = styled.h3`
  font-weight: 600; /* font-semibold */
  color: #0F172A;
  margin: 0;
`;

const LeadEmailSmall = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: rgba(15, 23, 42, 0.7); /* text-[#0F172A]/70 */
  margin: 0;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem; /* text-sm */
  font-weight: 600; /* font-semibold */
  color: #0F172A;
  margin-bottom: 0.5rem; /* mb-2 */
`;

const SourceFunnelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space-x-2 */
  margin-bottom: 1rem; /* mb-4 */
`;

const InterestScoreContainer = styled.div`
  margin-bottom: 1rem; /* mb-4 */
`;

const InterestScoreBarBackground = styled.div`
  width: 100%;
  background-color: #F9FAFB;
  border-radius: 9999px; /* rounded-full */
  height: 0.5rem; /* h-2 */
`;

const InterestScoreBar = styled.div`
  background-color: #00E915;
  height: 0.5rem; /* h-2 */
  border-radius: 9999px; /* rounded-full */
`;

const InterestScoreText = styled.span`
  font-size: 0.875rem; /* text-sm */
  color: rgba(15, 23, 42, 0.7); /* text-[#0F172A]/70 */
  margin-top: 0.25rem; /* mt-1 */
  display: block;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
`;

const NoteBubble = styled.div`
  flex: 1;
  background-color: #F9FAFB;
  border-radius: 0.5rem; /* rounded-lg */
  padding: 0.75rem; /* p-3 */

  p {
    font-size: 0.875rem; /* text-sm */
    color: #0F172A;
    margin: 0;
  }
`;

const NoteFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
`;

const NoteTimestamp = styled.span`
  font-size: 0.75rem; /* text-xs */
  color: rgba(15, 23, 42, 0.6); /* text-[#0F172A]/60 */
`;

const NoteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NoteActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.8);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: #0F172A;
    background-color: rgba(15, 23, 42, 0.05);
  }

  &:active {
    background-color: rgba(15, 23, 42, 0.1);
  }
`;

const NoteItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem; /* space-x-3 */
`;

const NoteTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem; /* rounded-lg */
  padding: 0.75rem; /* p-3 */
  font-size: 0.875rem; /* text-sm */
  min-height: 5rem; /* Give some default height */
  resize: vertical;

  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

// Add new styled component after NoteTextarea
const NoteInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SendButton = styled.button`
  align-self: flex-end;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #2563EB;
  }

  &:disabled {
    background-color: #93C5FD;
    cursor: not-allowed;
  }
`;

// Add these styled components after the existing styled components
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  z-index: 2000; /* Increased from 50 to 2000 to be above FAB */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

const ModalContent = styled.div`
  width: 440px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001; /* Increased from 50 to 2001 to be above overlay */
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
  text-align: center;
  width: 100%;
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
  display: block;
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

const FormTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  resize: none;
  min-height: 6rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagButton = styled.button<{ $isSelected: boolean; $tagType: 'hot' | 'qualified' | 'quiz-ready' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #E5E7EB;
  transition: all 0.2s;
  cursor: pointer;

  ${props => {
    switch (props.$tagType) {
      case 'hot':
        return `
          color: #00E915;
          background-color: ${props.$isSelected ? 'rgba(0, 233, 21, 0.1)' : 'white'};
          border-color: ${props.$isSelected ? '#00E915' : '#E5E7EB'};
          &:hover {
            background-color: rgba(0, 233, 21, 0.1);
          }
          &:focus {
            box-shadow: 0 0 0 2px #00E915;
          }
        `;
      case 'qualified':
        return `
          color: #0098FF;
          background-color: ${props.$isSelected ? 'rgba(0, 152, 255, 0.1)' : 'white'};
          border-color: ${props.$isSelected ? '#0098FF' : '#E5E7EB'};
          &:hover {
            background-color: rgba(0, 152, 255, 0.1);
          }
          &:focus {
            box-shadow: 0 0 0 2px #0098FF;
          }
        `;
      case 'quiz-ready':
        return `
          color: #3B82F6;
          background-color: ${props.$isSelected ? 'rgba(59, 130, 246, 0.1)' : 'white'};
          border-color: ${props.$isSelected ? '#3B82F6' : '#E5E7EB'};
          &:hover {
            background-color: rgba(59, 130, 246, 0.1);
          }
          &:focus {
            box-shadow: 0 0 0 2px #3B82F6;
          }
        `;
    }
  }}
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

// Add these types before the component
type TagType = 'hot' | 'qualified' | 'quiz-ready';

interface FormData {
  fullName: string;
  email: string;
  source: string;
  tags: TagType[];
  assignedTo: string;
  notes: string;
}

const ExportModalOverlay = styled.div<{ $isOpen: boolean }>`
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

const ExportModalContent = styled.div`
  width: 440px;
  background-color: #F9FAFB;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExportIconContainer = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    font-size: 1.75rem;
    color: #6366F1;
  }
`;

const ExportModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ExportModalDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ExportModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid #E5E7EB;
  color: rgba(15, 23, 42, 0.8);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const DownloadButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 0.5rem;
  background-color: #3B82F6;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

// Add these styled components after the existing styled components
const DeleteLeadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #FECACA;
    border-color: #F87171;
  }

  svg {
    font-size: 1rem;
  }
`;

const DeleteConfirmModal = styled(ModalOverlay)`
  // Inherits from ModalOverlay
`;

const DeleteConfirmContent = styled(ModalContent)`
  // Inherits from ModalContent
`;

const DeleteConfirmTitle = styled(ModalTitle)`
  color: #DC2626;
`;

const DeleteConfirmDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DeleteConfirmButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CancelDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background-color: white;
  color: #0F172A;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 0;

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

const ConfirmDeleteButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 0.5rem;
  background-color: #DC2626;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #B91C1C;
  }
`;

// Add new styled components for comment delete confirmation
const CommentDeleteModal = styled(ModalOverlay)`
  // Inherits from ModalOverlay
`;

const CommentDeleteContent = styled(ModalContent)`
  // Inherits from ModalContent
`;

const CommentDeleteTitle = styled(ModalTitle)`
  color: #DC2626;
`;

const CommentDeleteDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CommentDeleteButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background: none;
  color: #3B82F6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.375rem;

  &:hover {
    color: #2563EB;
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

// Add new styled component for action icons
const ActionIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  border: none;
  background: none;
  color: #3B82F6;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.375rem;
  margin-right: 0.375rem;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #2563EB;
    background-color: rgba(59, 130, 246, 0.1);
  }

  svg {
    font-size: 0.875rem;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Update badge styles to match UserManagementTab
const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
`;

const PlanBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
`;

// Add styled components at the top with other styled components
const ActionConfirmContent = styled(ModalContent)`
  width: 440px;
  padding: 1.5rem;
`;

const ActionConfirmTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
  text-align: center;
  width: 100%;
`;

const ActionConfirmDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin: 1rem 0 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ActionConfirmButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  width: 100%;
`;

const ConfirmActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #EF4444;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 0;

  &:hover {
    background-color: #DC2626;
  }
`;

const LeadManagementTab = () => {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    source: 'Quote Tool',
    tags: [],
    assignedTo: 'Sarah M.',
    notes: ''
  });
  const [newNote, setNewNote] = useState('');
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  // Example lead data with 5 diverse leads
  const exampleLeads = [
    {
      id: '123',
      name: 'Michael Cooper',
      email: 'm.cooper@example.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      source: 'Quote',
      tags: ['Hot', 'Qualified'],
      lastAction: 'Viewed pricing',
      lastActionDate: '2024-04-09',
      assignedTo: {
        name: 'Sarah M.',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      interestScore: 85,
      notes: [
        {
          id: 'note1',
          agentAvatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
          text: 'Showed high interest in VA services. Following up next week.',
          timestamp: '2 hours ago'
        }
      ]
    },
    {
      id: '124',
      name: 'Emma Rodriguez',
      email: 'emma.r@techstartup.io',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      source: 'Quiz',
      tags: ['Quiz-ready', 'Hot'],
      lastAction: 'Completed readiness quiz',
      lastActionDate: '2024-04-08',
      assignedTo: {
        name: 'Mark D.',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      interestScore: 92,
      notes: [
        {
          id: 'note1',
          agentAvatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
          text: 'Scored high on leadership assessment. Interested in executive coaching.',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: '125',
      name: 'James Wilson',
      email: 'jwilson@enterprise.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      source: 'Contact',
      tags: ['Qualified'],
      lastAction: 'Requested demo',
      lastActionDate: '2024-04-07',
      assignedTo: {
        name: 'Julia R.',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg'
      },
      interestScore: 78,
      notes: [
        {
          id: 'note1',
          agentAvatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
          text: 'Enterprise client looking for team training solutions.',
          timestamp: '3 hours ago'
        }
      ]
    },
    {
      id: '126',
      name: 'Sophia Chen',
      email: 'sophia.c@startup.co',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
      source: 'Quote',
      tags: ['Hot', 'Quiz-ready'],
      lastAction: 'Downloaded pricing guide',
      lastActionDate: '2024-04-06',
      assignedTo: {
        name: 'Sarah M.',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      interestScore: 88,
      notes: [
        {
          id: 'note1',
          agentAvatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
          text: 'Startup founder interested in team development package.',
          timestamp: '4 hours ago'
        }
      ]
    },
    {
      id: '127',
      name: 'David Thompson',
      email: 'dthompson@corporate.net',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
      source: 'Contact',
      tags: ['Qualified'],
      lastAction: 'Scheduled call',
      lastActionDate: '2024-04-05',
      assignedTo: {
        name: 'Mark D.',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      interestScore: 75,
      notes: [
        {
          id: 'note1',
          agentAvatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
          text: 'HR Director looking for leadership development program.',
          timestamp: '5 hours ago'
        }
      ]
    }
  ];

  // Filter leads based on search query, source filter, tag filter, and date filter
  const filteredLeads = exampleLeads.filter(lead => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.source.toLowerCase().includes(searchLower) ||
      lead.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      lead.lastAction.toLowerCase().includes(searchLower) ||
      lead.assignedTo.name.toLowerCase().includes(searchLower)
    );

    const matchesSource = selectedSource === 'All Sources' || lead.source === selectedSource;
    const matchesTag = selectedTag === 'All Tags' || lead.tags.includes(selectedTag);
    
    // Add date filtering
    const matchesDate = !selectedDate || lead.lastActionDate === selectedDate;

    return matchesSearch && matchesSource && matchesTag && matchesDate;
  });

  const openLeadDetailSidebar = (leadData: any) => {
    setSelectedLead(leadData);
    setIsDetailSidebarOpen(true);
  };

  const closeLeadDetailSidebar = () => {
    setIsDetailSidebarOpen(false);
    // Optionally, clear selectedLead after transition: setTimeout(() => setSelectedLead(null), 300);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTagToggle = (tag: TagType) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement lead creation logic
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  const handleOpenExportModal = () => {
    setIsExportModalOpen(true);
  };

  const handleCloseExportModal = () => {
    setIsExportModalOpen(false);
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export logic
    console.log('Exporting leads CSV...');
    handleCloseExportModal();
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteLead = () => {
    // TODO: Implement lead deletion logic
    console.log('Deleting lead:', selectedLead.id);
    handleCloseDeleteModal();
    closeLeadDetailSidebar();
  };

  const handleDeleteNote = (noteId: string) => {
    setNoteToDelete(noteId);
    setIsCommentDeleteModalOpen(true);
  };

  const handleCloseCommentDeleteModal = () => {
    setIsCommentDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleConfirmDeleteNote = () => {
    if (noteToDelete) {
      // TODO: Implement note deletion logic
      console.log('Deleting note:', noteToDelete);
      handleCloseCommentDeleteModal();
    }
  };

  // Add useEffect for keyboard events
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExportModalOpen) {
        handleCloseExportModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExportModalOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        handleCloseDeleteModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDeleteModalOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCommentDeleteModalOpen) {
        handleCloseCommentDeleteModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCommentDeleteModalOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(e.target.value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleEditNote = (noteId: string) => {
    // TODO: Implement edit note logic
    console.log('Edit note:', noteId);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  const handleSendNote = () => {
    if (!newNote.trim()) return;
    
    // TODO: Implement note sending logic
    console.log('Sending note:', newNote);
    
    // Clear the input after sending
    setNewNote('');
  };

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false);
    setActionType(null);
    setLeadToDelete(null);
  };

  const handleConfirmAction = () => {
    if (!actionType || !leadToDelete) return;

    switch (actionType) {
      case 'delete':
        console.log('Delete lead:', leadToDelete.id);
        // TODO: Implement delete lead logic
        break;
    }

    handleCloseActionModal();
  };

  // Add useEffect for action modal keyboard events
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActionModalOpen) {
        handleCloseActionModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isActionModalOpen]);

  const getActionModalContent = () => {
    if (!actionType || !leadToDelete) return null;

    const actionConfig = {
      delete: {
        title: 'Delete Lead',
        description: `Are you sure you want to delete this lead? This action cannot be undone.`,
        confirmText: 'Delete Lead'
      }
    };

    return actionConfig[actionType];
  };

  // Add handleEditLead function with other handlers
  const handleEditLead = (lead: any) => {
    // TODO: Implement edit functionality
    console.log('Edit lead:', lead.id);
  };

  return (
    <Container>
      <FiltersContainer id="lead-filters">
        <FilterGroup>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <SelectsRow>
            <Select value={selectedSource} onChange={handleSourceChange}>
              <option>All Sources</option>
              <option>Quote</option>
              <option>Contact</option>
              <option>Quiz</option>
            </Select>
            <Select value={selectedTag} onChange={handleTagChange}>
              <option>All Tags</option>
              <option>Hot</option>
              <option>Qualified</option>
              <option>Quiz-ready</option>
            </Select>
          </SelectsRow>
        </FilterGroup>
        
        <DateAndActionsGroup>
          <DateContainer>
            <DateInput 
              type="date" 
              value={selectedDate}
              onChange={handleDateChange}
            />
          </DateContainer>
          <ButtonGroup>
            <StyledButton onClick={handleOpenExportModal}>
              <FontAwesomeIcon icon={faDownload} />
              Export CSV
            </StyledButton>
            <StyledButton $primary $isFabHidden onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faPlus} />
              Add Lead
            </StyledButton>
          </ButtonGroup>
        </DateAndActionsGroup>
      </FiltersContainer>

      {/* Desktop Table (Hidden on Mobile) */}
      <TableWrapper id="lead-table">
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Source</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
              <TableHeaderCell>Last Action</TableHeaderCell>
              <TableHeaderCell>Assigned To</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="lead-name-container">
                    <Avatar src={lead.avatarUrl} alt={lead.name} />
                    <span className="lead-name">{lead.name}</span>
                  </div>
                </TableCell>
                <TableCell style={{ color: 'rgba(15, 23, 42, 0.7)' }}>{lead.email}</TableCell>
                <TableCell>
                  <Tag 
                    bgColor={
                      lead.source === 'Quote' ? 'rgba(0, 152, 255, 0.1)' :
                      lead.source === 'Quiz' ? 'rgba(59, 130, 246, 0.1)' :
                      'rgba(15, 23, 42, 0.1)'
                    }
                    textColor={
                      lead.source === 'Quote' ? '#0098FF' :
                      lead.source === 'Quiz' ? '#3B82F6' :
                      '#0F172A'
                    }
                  >
                    {lead.source}
                  </Tag>
                </TableCell>
                <TableCell>
                  {lead.tags.map(tag => (
                    <Tag 
                      key={tag}
                      bgColor={
                        tag === 'Hot' ? 'rgba(0, 233, 21, 0.1)' :
                        tag === 'Qualified' ? 'rgba(0, 152, 255, 0.1)' :
                        'rgba(59, 130, 246, 0.1)'
                      }
                      textColor={
                        tag === 'Hot' ? '#00E915' :
                        tag === 'Qualified' ? '#0098FF' :
                        '#3B82F6'
                      }
                    >
                      {tag}
                    </Tag>
                  ))}
                </TableCell>
                <TableCell style={{ color: 'rgba(15, 23, 42, 0.7)' }}>{lead.lastAction}</TableCell>
                <TableCell>
                  <div className="lead-name-container">
                    <Avatar src={lead.assignedTo?.avatarUrl || '/default-avatar.png'} alt={lead.assignedTo?.name || 'Unassigned'} />
                    <span className="lead-name">{lead.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ActionButtonsContainer>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        openLeadDetailSidebar(lead);
                      }}
                      title="View Details"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionIconButton>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditLead(lead);
                      }}
                      title="Edit Lead"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionIconButton>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeadToDelete(lead);
                        setActionType('delete');
                        setIsActionModalOpen(true);
                      }}
                      title="Delete Lead"
                      style={{ color: '#EF4444' }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionIconButton>
                  </ActionButtonsContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {/* Mobile Card View (Hidden on Desktop/Tablet) */}
      <CardListContainer>
        {filteredLeads.map(lead => (
          <LeadCard key={lead.id}>
            <CardHeader onClick={() => openLeadDetailSidebar(lead)}>
              <CardSummary>
                <Avatar src={lead.avatarUrl} alt={lead.name} />
                <CardNameEmailContainer>
                  <CardName>{lead.name}</CardName>
                  <CardEmail>{lead.email}</CardEmail>
                </CardNameEmailContainer>
              </CardSummary>
            </CardHeader>
            <CardDetails>
              <DetailRow>
                <DetailLabel>Source:</DetailLabel>
                <DetailValue>
                  <Tag 
                    bgColor={
                      lead.source === 'Quote' ? 'rgba(0, 152, 255, 0.1)' :
                      lead.source === 'Quiz' ? 'rgba(59, 130, 246, 0.1)' :
                      'rgba(15, 23, 42, 0.1)'
                    }
                    textColor={
                      lead.source === 'Quote' ? '#0098FF' :
                      lead.source === 'Quiz' ? '#3B82F6' :
                      '#0F172A'
                    }
                  >
                    {lead.source}
                  </Tag>
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Tags:</DetailLabel>
                <DetailValue className="tags-container">
                  {lead.tags.map(tag => (
                    <Tag 
                      key={tag}
                      bgColor={
                        tag === 'Hot' ? 'rgba(0, 233, 21, 0.1)' :
                        tag === 'Qualified' ? 'rgba(0, 152, 255, 0.1)' :
                        'rgba(59, 130, 246, 0.1)'
                      }
                      textColor={
                        tag === 'Hot' ? '#00E915' :
                        tag === 'Qualified' ? '#0098FF' :
                        '#3B82F6'
                      }
                    >
                      {tag}
                    </Tag>
                  ))}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Last Action:</DetailLabel>
                <DetailValue>{lead.lastAction}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Assigned To:</DetailLabel>
                <DetailValue>
                  <div className="lead-name-container">
                    <Avatar src={lead.assignedTo?.avatarUrl || '/default-avatar.png'} alt={lead.assignedTo?.name || 'Unassigned'} />
                    <span className="lead-name">{lead.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                </DetailValue>
              </DetailRow>
            </CardDetails>
          </LeadCard>
        ))}
      </CardListContainer>

      <FloatingAddButton onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      {/* Lead Detail Sidebar */}
      {selectedLead && (
        <DetailSidebarAside $isOpen={isDetailSidebarOpen}>
          <SidebarHeader>
            <SidebarTitle>Lead Details</SidebarTitle>
            <CloseButton onClick={closeLeadDetailSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </SidebarHeader>
          <SidebarContentWrapper>
            {/* Lead Info Card */}
            <InfoCard>
              <LeadInfoMain>
                <LeadAvatarLarge src={selectedLead.avatarUrl} alt={selectedLead.name} />
                <div>
                  <LeadNameLarge>{selectedLead.name}</LeadNameLarge>
                  <LeadEmailSmall>{selectedLead.email}</LeadEmailSmall>
                </div>
              </LeadInfoMain>
              <SourceFunnelContainer>
                <SectionTitle>Lead Source</SectionTitle>
                <Tag bgColor="rgba(0, 152, 255, 0.1)" textColor="#0098FF">{selectedLead.source}</Tag>
                <FontAwesomeIcon icon={faArrowRight} style={{color: 'rgba(15, 23, 42, 0.4)', fontSize: '0.875rem'}} />
                {selectedLead.tags.includes('Qualified') && 
                  <Tag bgColor="rgba(0, 233, 21, 0.1)" textColor="#00E915">Qualified</Tag>}
              </SourceFunnelContainer>
              <InterestScoreContainer>
                <SectionTitle>Interest Score</SectionTitle>
                <InterestScoreBarBackground>
                  <InterestScoreBar style={{ width: `${selectedLead.interestScore}%` }} />
                </InterestScoreBarBackground>
                <InterestScoreText>{selectedLead.interestScore}% - High Interest</InterestScoreText>
              </InterestScoreContainer>
            </InfoCard>

            {/* Notes & Comments Card */}
            <InfoCard>
              <SectionTitle style={{marginBottom: '1rem'}}>Notes & Comments</SectionTitle>
              <NotesContainer>
                {selectedLead.notes.map((note: any) => (
                  <NoteItem key={note.id}>
                    <Avatar src={note.agentAvatarUrl} alt="Agent" className="agent-avatar" />
                    <div style={{flex: 1}}>
                      <NoteBubble>
                        <p>{note.text}</p>
                      </NoteBubble>
                      <NoteFooter>
                        <NoteTimestamp>{note.timestamp}</NoteTimestamp>
                        <NoteActions>
                          <NoteActionButton 
                            onClick={() => handleEditNote(note.id)}
                            title="Edit note"
                          >
                            Edit
                          </NoteActionButton>
                          <NoteActionButton 
                            onClick={() => handleDeleteNote(note.id)}
                            title="Delete note"
                          >
                            Delete
                          </NoteActionButton>
                        </NoteActions>
                      </NoteFooter>
                    </div>
                  </NoteItem>
                ))}
              </NotesContainer>
              <NoteInputContainer>
                <NoteTextarea 
                  placeholder="Add a note..." 
                  value={newNote}
                  onChange={handleNoteChange}
                />
                <SendButton 
                  onClick={handleSendNote}
                  disabled={!newNote.trim()}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                  Send
                </SendButton>
              </NoteInputContainer>
            </InfoCard>

            <DeleteLeadButton onClick={handleOpenDeleteModal}>
              <FontAwesomeIcon icon={faTrash} />
              Delete Lead
            </DeleteLeadButton>
          </SidebarContentWrapper>
        </DetailSidebarAside>
      )}

      {/* Add Lead Modal */}
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Add New Lead</ModalTitle>
            <CloseModalButton onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormInput
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Source</FormLabel>
              <FormSelect
                name="source"
                value={formData.source}
                onChange={handleInputChange}
              >
                <option>Quote Tool</option>
                <option>Contact Form</option>
                <option>Quiz</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Tags</FormLabel>
              <TagsContainer>
                <TagButton
                  type="button"
                  $tagType="hot"
                  $isSelected={formData.tags.includes('hot')}
                  onClick={() => handleTagToggle('hot')}
                >
                  Hot
                </TagButton>
                <TagButton
                  type="button"
                  $tagType="qualified"
                  $isSelected={formData.tags.includes('qualified')}
                  onClick={() => handleTagToggle('qualified')}
                >
                  Qualified
                </TagButton>
                <TagButton
                  type="button"
                  $tagType="quiz-ready"
                  $isSelected={formData.tags.includes('quiz-ready')}
                  onClick={() => handleTagToggle('quiz-ready')}
                >
                  Quiz-Ready
                </TagButton>
              </TagsContainer>
            </FormGroup>
            <FormGroup>
              <FormLabel>Assigned To</FormLabel>
              <FormSelect
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
              >
                <option>Sarah M.</option>
                <option>Mark D.</option>
                <option>Julia R.</option>
                <option>Admin Team</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Notes</FormLabel>
              <FormTextarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add notes or context..."
                rows={3}
              />
            </FormGroup>
            <SubmitButton type="submit">Save Lead</SubmitButton>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>

      <ExportModalOverlay $isOpen={isExportModalOpen} onClick={handleCloseExportModal}>
        <ExportModalContent onClick={e => e.stopPropagation()}>
          <ExportIconContainer>
            <FontAwesomeIcon icon={faFileArrowDown} />
          </ExportIconContainer>
          <ExportModalTitle>Export All Lead Records?</ExportModalTitle>
          <ExportModalDescription>
            This will download a CSV of all leads including name, email, status, and assigned roles.
          </ExportModalDescription>
          <ExportModalButtons>
            <CancelButton onClick={handleCloseExportModal}>
              Cancel
            </CancelButton>
            <DownloadButton onClick={handleExportCSV}>
              Download CSV
            </DownloadButton>
          </ExportModalButtons>
        </ExportModalContent>
      </ExportModalOverlay>

      <DeleteConfirmModal $isOpen={isDeleteModalOpen} onClick={handleCloseDeleteModal}>
        <DeleteConfirmContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <DeleteConfirmTitle>Delete Lead</DeleteConfirmTitle>
            <CloseModalButton onClick={handleCloseDeleteModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <DeleteConfirmDescription>
            Are you sure you want to delete this lead? This action cannot be undone.
          </DeleteConfirmDescription>
          <DeleteConfirmButtons>
            <CancelDeleteButton onClick={handleCloseDeleteModal}>
              Cancel
            </CancelDeleteButton>
            <ConfirmDeleteButton onClick={handleDeleteLead}>
              Delete Lead
            </ConfirmDeleteButton>
          </DeleteConfirmButtons>
        </DeleteConfirmContent>
      </DeleteConfirmModal>

      {/* Add Comment Delete Confirmation Modal */}
      <CommentDeleteModal $isOpen={isCommentDeleteModalOpen} onClick={handleCloseCommentDeleteModal}>
        <CommentDeleteContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <CommentDeleteTitle>Delete Comment</CommentDeleteTitle>
            <CloseModalButton onClick={handleCloseCommentDeleteModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <CommentDeleteDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
          </CommentDeleteDescription>
          <CommentDeleteButtons>
            <CancelDeleteButton onClick={handleCloseCommentDeleteModal}>
              Cancel
            </CancelDeleteButton>
            <ConfirmDeleteButton onClick={handleConfirmDeleteNote}>
              Delete Comment
            </ConfirmDeleteButton>
          </CommentDeleteButtons>
        </CommentDeleteContent>
      </CommentDeleteModal>

      {/* Add the action modal before the closing Container tag */}
      {isActionModalOpen && (
        <ModalOverlay $isOpen={isActionModalOpen} onClick={handleCloseActionModal}>
          <ActionConfirmContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ActionConfirmTitle style={{ color: '#EF4444' }}>
                {getActionModalContent()?.title}
              </ActionConfirmTitle>
            </ModalHeader>
            <ActionConfirmDescription>
              {getActionModalContent()?.description}
            </ActionConfirmDescription>
            <ActionConfirmButtons>
              <CancelDeleteButton onClick={handleCloseActionModal}>
                Cancel
              </CancelDeleteButton>
              <ConfirmActionButton 
                onClick={handleConfirmAction}
                style={{ backgroundColor: '#EF4444' }}
              >
                {getActionModalContent()?.confirmText}
              </ConfirmActionButton>
            </ActionConfirmButtons>
          </ActionConfirmContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default LeadManagementTab; 