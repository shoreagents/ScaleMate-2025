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
  faFileArrowDown
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
  padding: 1rem 1.5rem; /* px-6 py-4 */
  text-align: left;
  font-size: 0.875rem; /* text-sm */
  font-weight: 600; /* font-semibold */
  color: #0F172A;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem; /* px-6 py-4 */
  color: rgba(15, 23, 42, 0.7); /* text-[#0F172A]/70 for some cells */

  .lead-name-container {
    display: flex;
    align-items: center;
    color: #0F172A; /* Reset color for name container */
  }

  .lead-name {
    font-weight: 500; /* font-medium */
  }

  .agent-container {
    display: flex;
    align-items: center;
    color: #0F172A; /* Reset color for agent container */
  }
`;

const Avatar = styled.img`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  border-radius: 9999px; /* rounded-full */
  margin-right: 0.75rem; /* Default margin-right */

  &.agent-avatar {
    width: 1.5rem; /* w-6 */
    height: 1.5rem; /* h-6 */
    margin-right: 0.5rem; /* Default for agent avatar variant */
  }

  @media (max-width: 365px) {
    margin-right: 0; /* Remove margin-right on very small screens for the main avatar in CardSummary */
    
    &.agent-avatar { /* Specific styles for agent avatar in CardDetails at this breakpoint */
      width: 1.25rem; /* Smaller width for agent avatar: 20px */
      height: 1.25rem; /* Smaller height for agent avatar: 20px */
      margin-right: 0.25rem; /* Add a small gap next to the agent name */
    }
  }
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

const NoteItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem; /* space-x-3 */
`;

// Re-use Avatar for NoteAvatar, can use .agent-avatar class if sizes match or create specific one
// const NoteAvatar = styled(Avatar)``;

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

const NoteTimestamp = styled.span`
  font-size: 0.75rem; /* text-xs */
  color: rgba(15, 23, 42, 0.6); /* text-[#0F172A]/60 */
  margin-top: 0.25rem; /* mt-1 */
  display: block; /* To ensure it's under the bubble if flex-direction is column for NoteBubble parent */
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
    background-color: #F1F5F9;
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

const LeadManagementTab = () => {
  const [selectedLead, setSelectedLead] = useState<any>(null); // Can be a specific Lead type
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    source: 'Quote Tool',
    tags: [],
    assignedTo: 'Sarah M.',
    notes: ''
  });

  // Example lead data (taken from the single row in your HTML)
  const exampleLead = {
    id: '123',
    name: 'Michael Cooper',
    email: 'm.cooper@example.com',
    avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    source: 'Quote',
    tags: ['Hot', 'Qualified'],
    lastAction: 'Viewed pricing',
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
  };

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

  return (
    <Container>
      <FiltersContainer id="lead-filters">
        <FilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search leads..." />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <SelectsRow>
            <Select>
              <option>All Sources</option>
              <option>Quote</option>
              <option>Contact</option>
              <option>Quiz</option>
            </Select>
            <Select>
              <option>All Tags</option>
              <option>Hot</option>
              <option>Qualified</option>
              <option>Quiz-ready</option>
            </Select>
          </SelectsRow>
        </FilterGroup>
        
        <DateAndActionsGroup>
          <DateContainer>
            <DateInput type="date" />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow onClick={() => openLeadDetailSidebar(exampleLead)}>
              <TableCell>
                <div className="lead-name-container">
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Lead" />
                  <span className="lead-name">Michael Cooper</span>
                </div>
              </TableCell>
              <TableCell style={{ color: 'rgba(15, 23, 42, 0.7)' }}>m.cooper@example.com</TableCell>
              <TableCell>
                <Tag bgColor="rgba(0, 152, 255, 0.1)" textColor="#0098FF">Quote</Tag>
              </TableCell>
              <TableCell>
                <Tag bgColor="rgba(0, 233, 21, 0.1)" textColor="#00E915">Hot</Tag>
                <Tag bgColor="rgba(0, 152, 255, 0.1)" textColor="#0098FF">Qualified</Tag>
              </TableCell>
              <TableCell style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Viewed pricing</TableCell>
              <TableCell>
                <div className="agent-container">
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Agent" className="agent-avatar" />
                  <span>Sarah M.</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {/* Mobile Card View (Hidden on Desktop/Tablet) */}
      <CardListContainer>
        <LeadCard>
          <CardHeader onClick={() => openLeadDetailSidebar(exampleLead)}>
            <CardSummary>
              <Avatar src={exampleLead.avatarUrl} alt={exampleLead.name} />
              <CardNameEmailContainer>
                <CardName>{exampleLead.name}</CardName>
                <CardEmail>{exampleLead.email}</CardEmail>
              </CardNameEmailContainer>
            </CardSummary>
          </CardHeader>
          <CardDetails>
            <DetailRow>
              <DetailLabel>Source:</DetailLabel>
              <DetailValue>
                <Tag bgColor="rgba(0, 152, 255, 0.1)" textColor="#0098FF">{exampleLead.source}</Tag>
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Tags:</DetailLabel>
              <DetailValue className="tags-container">
                {exampleLead.tags.map(tag => (
                  <Tag 
                    key={tag} 
                    bgColor={tag === 'Hot' ? 'rgba(0, 233, 21, 0.1)' : 'rgba(0, 152, 255, 0.1)'} 
                    textColor={tag === 'Hot' ? '#00E915' : '#0098FF'}
                  >
                    {tag}
                  </Tag>
                ))}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Last Action:</DetailLabel>
              <DetailValue>{exampleLead.lastAction}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Assigned To:</DetailLabel>
              <DetailValue>
                <div className="agent-container">
                  <Avatar src={exampleLead.assignedTo.avatarUrl} alt={exampleLead.assignedTo.name} className="agent-avatar" />
                  <span>{exampleLead.assignedTo.name}</span>
                </div>
              </DetailValue>
            </DetailRow>
          </CardDetails>
        </LeadCard>
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
                      <NoteTimestamp>{note.timestamp}</NoteTimestamp>
                    </div>
                  </NoteItem>
                ))}
              </NotesContainer>
              <div style={{marginTop: '1rem'}}>
                <NoteTextarea placeholder="Add a note..." />
              </div>
            </InfoCard>
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
    </Container>
  );
};

export default LeadManagementTab; 