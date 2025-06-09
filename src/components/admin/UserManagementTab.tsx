import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaPlus, 
  FaTrophy, 
  FaEye, 
  FaUser, 
  FaKey, 
  FaBan, 
  FaTimes, 
  FaBookOpen, 
  FaFilePdf, 
  FaFileAlt, 
  FaMedal, 
  FaUserPlus, 
  FaTrash,
  FaPencilAlt
} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1301px) {
    margin-bottom: 2rem;
    width: 100%;
  }

  @media (max-width: 1088px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;

  @media (max-width: 1301px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
    width: 100%;

    /* First row: Search and All Plans */
    & > div:first-child {
      grid-column: 1;
      grid-row: 1;
    }
    & > select:first-of-type {
      grid-column: 2;
      grid-row: 1;
    }

    /* Second row: Activity Level and Progress Status */
    & > select:nth-of-type(2) {
      grid-column: 1;
      grid-row: 2;
    }
    & > select:last-of-type {
      grid-column: 2;
      grid-row: 2;
    }
  }

  @media (max-width: 1088px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;

    /* Maintain the same 2-row layout */
    & > div:first-child {
      grid-column: 1;
      grid-row: 1;
    }
    & > select:first-of-type {
      grid-column: 2;
      grid-row: 1;
    }
    & > select:nth-of-type(2) {
      grid-column: 1;
      grid-row: 2;
    }
    & > select:last-of-type {
      grid-column: 2;
      grid-row: 2;
    }
  }

  @media (max-width: 467px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 0.75rem;

    /* Stack all items vertically */
    & > div:first-child {
      grid-column: 1;
      grid-row: 1;
    }
    & > select:first-of-type {
      grid-column: 1;
      grid-row: 2;
    }
    & > select:nth-of-type(2) {
      grid-column: 1;
      grid-row: 3;
    }
    & > select:last-of-type {
      grid-column: 1;
      grid-row: 4;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;
  min-width: 200px;
  max-width: 100%;

  @media (max-width: 1301px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 1088px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  color: #0F172A;
  background-color: white;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
`;

const StyledSelect = styled.select`
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
  min-width: 10rem;
  max-width: 200px;

  @media (max-width: 1301px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 1088px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
`;

const StyledButton = styled.button`
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
  background-color: #3B82F6;
  color: white;
  border: none;
  font-weight: 500;

  @media (max-width: 1301px) {
    display: none;
  }

  &:hover {
    background-color: #2563EB;
  }
`;

const FloatingActionButton = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  padding: 0;
  background-color: #3B82F6;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 1.25rem;
  }

  @media (max-width: 1301px) {
    display: flex;
  }

  &:hover {
    background-color: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
  }
`;

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
  border-bottom: 1px solid rgba(15, 23, 42, 0.1);
  transition: all 0.2s ease;
  cursor: pointer; /* Add cursor pointer to indicate clickable */

  &:hover {
    background-color: rgba(15, 23, 42, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }
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

  .user-name-container {
    display: flex;
    align-items: center;
    color: #0F172A; /* Reset color for name container */
    gap: 0.75rem; /* Add consistent gap between avatar and name */
  }

  .user-name {
    font-weight: 500; /* font-medium */
  }

  .user-email {
    font-size: 0.875rem;
    color: rgba(15, 23, 42, 0.7);
    display: block;
  }

  .agent-container {
    display: flex;
    align-items: center;
    color: #0F172A; /* Reset color for agent container */
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #0F172A;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const XPBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00E915;
  font-weight: 500;
`;

const PlanBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: rgba(15, 23, 42, 0.7);

  &:hover {
    background: rgba(15, 23, 42, 0.02);
  }

  &.danger {
    border-color: #EF4444;
    color: #EF4444;

    &:hover {
      background: rgba(239, 68, 68, 0.05);
    }
  }
`;

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
  width: 440px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;
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

  &:disabled {
    background-color: #F9FAFB;
    cursor: not-allowed;
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

const RolePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const RolePlanGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PasswordBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PasswordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AutoGenLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.6);
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  background-color: #F1F5F9;
  border-radius: 9999px;
  transition: all 0.2s;
  padding: 0.125rem;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0.125rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${props => props.$isActive ? '#3B82F6' : '#E5E7EB'};
    transform: ${props => props.$isActive ? 'translateX(1.25rem)' : 'translateX(0)'};
    transition: all 0.2s;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #2563EB;
  }
`;

const CardContainer = styled.div`
  display: none;

  @media (max-width: 887px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const UserCard = styled.div`
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 379px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CardUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;

  @media (max-width: 379px) {
    width: 100%;
  }
`;

const CardStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 379px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.6);
`;

const DetailValue = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  font-weight: 500;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  margin-top: 0.5rem;
`;

const DetailSidebarAside = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 24rem;
  height: 100%;
  background-color: #F1F5F9;
  border-left: 1px solid #E5E7EB;
  padding: 1.5rem;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(24rem)'};
  transition: transform 0.3s ease-in-out;
  z-index: 2000;
  overflow-y: auto;

  @media (max-width: 382px) {
    width: 100%;
    border-left: none;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0F172A;
`;

const CloseButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1.25rem;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }
`;

const SidebarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
`;

const UserInfoMain = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserAvatarLarge = styled(Avatar)`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`;

const UserNameLarge = styled.h3`
  font-weight: 600;
  color: #0F172A;
  margin: 0;
`;

const UserEmailSmall = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.6);
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  font-weight: 500;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SidebarActionButton = styled.button`
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

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    font-size: 1rem;
    color: rgba(15, 23, 42, 0.7);
  }
`;

// Add new styled components for action confirmation modals
const ActionConfirmModal = styled(ModalOverlay)`
  // Inherits from ModalOverlay
`;

const ActionConfirmContent = styled(ModalContent)`
  // Inherits from ModalContent
`;

const ActionConfirmTitle = styled.h3<{ $action?: 'reset' | 'ban' | 'delete' }>`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  width: 100%;
  color: ${props => 
    props.$action === 'delete' ? '#EF4444' :
    props.$action === 'ban' ? '#F59E0B' :
    '#3B82F6'
  };
`;

const ActionConfirmDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ActionConfirmButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CancelDeleteButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background-color: white;
  color: rgba(15, 23, 42, 0.7);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(15, 23, 42, 0.05);
    border-color: rgba(15, 23, 42, 0.2);
  }
`;

const ConfirmActionButton = styled.button<{ $action?: 'reset' | 'ban' | 'delete' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 0;
  background-color: ${props => 
    props.$action === 'delete' ? '#EF4444' :
    props.$action === 'ban' ? '#F59E0B' :
    '#3B82F6'
  };

  &:hover {
    background-color: ${props => 
      props.$action === 'delete' ? '#DC2626' :
      props.$action === 'ban' ? '#D97706' :
      '#2563EB'
    };
  }
`;

// Add the ViewDetailsButton styled component
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

// Add new styled components for action icons
const ActionIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  color: #3B82F6;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.375rem;
  margin-right: 0.5rem;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #2563EB;
    background-color: rgba(59, 130, 246, 0.1);
  }

  svg {
    font-size: 1rem;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface CreateUserFormData {
  name: string;
  email: string;
  role: string;
  plan: string;
  password: string;
  autoGeneratePassword: boolean;
}

const UserManagementTab: React.FC = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: '',
    email: '',
    role: '',
    plan: '',
    password: '',
    autoGeneratePassword: false
  });

  // Add filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('All Plans');
  const [selectedActivity, setSelectedActivity] = useState('Activity Level');
  const [selectedProgress, setSelectedProgress] = useState('Progress Status');

  // Example user data with 5 diverse users
  const exampleUsers = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      signupDate: 'Jan 15, 2025',
      xpLevel: 2450,
      planType: 'Pro',
      status: 'Active',
      activityLevel: 'High',
      progressStatus: 'Advanced'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.c@techcorp.io',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      signupDate: 'Feb 3, 2025',
      xpLevel: 1800,
      planType: 'Enterprise',
      status: 'Active',
      activityLevel: 'High',
      progressStatus: 'Intermediate'
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@startup.co',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      signupDate: 'Mar 1, 2025',
      xpLevel: 950,
      planType: 'Free',
      status: 'Active',
      activityLevel: 'Medium',
      progressStatus: 'Beginner'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma.w@enterprise.net',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      signupDate: 'Mar 15, 2025',
      xpLevel: 3200,
      planType: 'Enterprise',
      status: 'Active',
      activityLevel: 'High',
      progressStatus: 'Advanced'
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'd.kim@agency.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      signupDate: 'Apr 1, 2025',
      xpLevel: 1500,
      planType: 'Pro',
      status: 'Active',
      activityLevel: 'Medium',
      progressStatus: 'Intermediate'
    }
  ];

  // Filter users based on search query and selected filters
  const filteredUsers = exampleUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = selectedPlan === 'All Plans' || user.planType === selectedPlan;
    const matchesActivity = selectedActivity === 'Activity Level' || user.activityLevel === selectedActivity;
    const matchesProgress = selectedProgress === 'Progress Status' || user.progressStatus === selectedProgress;

    return matchesSearch && matchesPlan && matchesActivity && matchesProgress;
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle plan filter change
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(e.target.value);
  };

  // Handle activity level filter change
  const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(e.target.value);
  };

  // Handle progress status filter change
  const handleProgressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgress(e.target.value);
  };

  const handleOpenCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleCloseCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      plan: '',
      password: '',
      autoGeneratePassword: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleAutoGen = () => {
    setFormData(prev => ({
      ...prev,
      autoGeneratePassword: !prev.autoGeneratePassword,
      password: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleCloseCreateUserModal();
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCreateUserModalOpen) {
        handleCloseCreateUserModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCreateUserModalOpen]);

  // Add these to the UserManagementTab component's state
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'reset' | 'ban' | 'delete' | null>(null);

  // Add these handler functions
  const openUserDetailSidebar = (userData: any) => {
    setSelectedUser(userData);
    setIsDetailSidebarOpen(true);
  };

  const closeUserDetailSidebar = () => {
    setIsDetailSidebarOpen(false);
  };

  // Update the handleViewDetails function
  const handleViewDetails = (user: any) => {
    openUserDetailSidebar(user);
  };

  // Add useEffect for keyboard events
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDetailSidebarOpen) {
        closeUserDetailSidebar();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDetailSidebarOpen]);

  const handleResetPassword = () => {
    setActionType('reset');
    setIsActionModalOpen(true);
  };

  const handleBanUser = () => {
    setActionType('ban');
    setIsActionModalOpen(true);
  };

  const handleDeleteUser = () => {
    setActionType('delete');
    setIsActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false);
    setActionType(null);
  };

  const handleConfirmAction = () => {
    if (!actionType || !selectedUser) return;

    switch (actionType) {
      case 'reset':
        console.log('Reset password for:', selectedUser.id);
        // TODO: Implement password reset logic
        break;
      case 'ban':
        console.log('Ban user:', selectedUser.id);
        // TODO: Implement ban user logic
        break;
      case 'delete':
        console.log('Delete user:', selectedUser.id);
        // TODO: Implement delete user logic
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
    if (!actionType || !selectedUser) return null;

    const actionConfig = {
      reset: {
        title: 'Reset Password',
        description: `Are you sure you want to reset the password for ${selectedUser.name}? A password reset email will be sent to ${selectedUser.email}.`,
        confirmText: 'Reset Password'
      },
      ban: {
        title: 'Ban User',
        description: `Are you sure you want to ban ${selectedUser.name}? This will prevent them from accessing their account.`,
        confirmText: 'Ban User'
      },
      delete: {
        title: 'Delete User',
        description: `Are you sure you want to delete ${selectedUser.name}'s account? This action cannot be undone.`,
        confirmText: 'Delete User'
      }
    };

    return actionConfig[actionType];
  };

  // Add handleEditUser function with other handlers
  const handleEditUser = (user: any) => {
    // TODO: Implement edit functionality
    console.log('Edit user:', user.id);
  };

  return (
    <Container>
      <FilterBar>
        <FilterGroup>
          <SearchContainer>
            <StyledSearchInput 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon />
          </SearchContainer>
          <StyledSelect value={selectedPlan} onChange={handlePlanChange}>
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </StyledSelect>
          <StyledSelect value={selectedActivity} onChange={handleActivityChange}>
            <option>Activity Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </StyledSelect>
          <StyledSelect value={selectedProgress} onChange={handleProgressChange}>
            <option>Progress Status</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </StyledSelect>
        </FilterGroup>
        <StyledButton onClick={handleOpenCreateUserModal}>
          <FaPlus />
          <span>Create User</span>
        </StyledButton>
      </FilterBar>

      <TableWrapper>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Signup Date</TableHeaderCell>
              <TableHeaderCell>Plan Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Activity Level</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="user-name-container">
                    <Avatar src={user.avatarUrl} alt={user.name} />
                    <div>
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.signupDate}</TableCell>
                <TableCell>
                  <span className={`plan-badge ${user.planType.toLowerCase()}`}>
                    {user.planType}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`activity-badge ${user.activityLevel.toLowerCase()}`}>
                    {user.activityLevel}
                  </span>
                </TableCell>
                <TableCell>
                  <ActionButtonsContainer>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(user);
                      }}
                      title="View Details"
                    >
                      <FaEye />
                    </ActionIconButton>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                      title="Edit User"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionIconButton>
                    <ActionIconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                        setActionType('delete');
                        setIsActionModalOpen(true);
                      }}
                      title="Delete User"
                      style={{ color: '#EF4444' }}
                    >
                      <FaTrash />
                    </ActionIconButton>
                  </ActionButtonsContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      <CardContainer>
        {filteredUsers.map(user => (
          <UserCard key={user.id}>
            <CardHeader>
              <CardUserInfo>
                <Avatar src={user.avatarUrl} alt={user.name} />
                <UserDetails>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserDetails>
              </CardUserInfo>
              <CardStatus>
                <StatusBadge>{user.status}</StatusBadge>
                <PlanBadge>{user.planType}</PlanBadge>
              </CardStatus>
            </CardHeader>
            <CardDetails>
              <DetailItem>
                <DetailLabel>Signup Date</DetailLabel>
                <DetailValue>{user.signupDate}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>XP Level</DetailLabel>
                <DetailValue>
                  <XPBadge>
                    <span>{user.xpLevel.toLocaleString()} XP</span>
                    <FaTrophy />
                  </XPBadge>
                </DetailValue>
              </DetailItem>
            </CardDetails>
            <CardActions>
              <ActionButton 
                title="View Details" 
                onClick={() => handleViewDetails(user)}
              >
                <FaEye />
              </ActionButton>
              <ActionButton title="Impersonate">
                <FaUser />
              </ActionButton>
              <ActionButton title="Reset Password">
                <FaKey />
              </ActionButton>
              <ActionButton title="Ban User">
                <FaBan />
              </ActionButton>
            </CardActions>
          </UserCard>
        ))}
      </CardContainer>

      <FloatingActionButton onClick={handleOpenCreateUserModal} title="Create User">
        <FaPlus />
      </FloatingActionButton>

      <ModalOverlay $isOpen={isCreateUserModalOpen} onClick={handleCloseCreateUserModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Create New User</ModalTitle>
            <CloseModalButton onClick={handleCloseCreateUserModal}>
              <FaTimes />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleSubmit} autoComplete="off">
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
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
            <RolePlanContainer>
              <RolePlanGroup>
                <FormLabel>Role Type</FormLabel>
                <FormSelect
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="content-manager">Content Manager</option>
                </FormSelect>
              </RolePlanGroup>
              <RolePlanGroup>
                <FormLabel>Plan Tier</FormLabel>
                <FormSelect
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Plan</option>
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="custom">Custom</option>
                </FormSelect>
              </RolePlanGroup>
            </RolePlanContainer>
            <PasswordBlock>
              <PasswordHeader>
                <FormLabel>Password</FormLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AutoGenLabel>Auto-generate</AutoGenLabel>
                  <ToggleButton
                    type="button"
                    $isActive={formData.autoGeneratePassword}
                    onClick={handleToggleAutoGen}
                  />
                </div>
              </PasswordHeader>
              <FormInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={formData.autoGeneratePassword ? 'Auto-generated password' : 'Set password (optional)'}
                disabled={formData.autoGeneratePassword}
              />
            </PasswordBlock>
            <SubmitButton type="submit">
              <FaUserPlus />
              <span>Create User</span>
            </SubmitButton>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>

      {selectedUser && (
        <DetailSidebarAside $isOpen={isDetailSidebarOpen}>
          <SidebarHeader>
            <SidebarTitle>User Details</SidebarTitle>
            <CloseButton onClick={closeUserDetailSidebar}>
              <FaTimes />
            </CloseButton>
          </SidebarHeader>
          <SidebarContentWrapper>
            <InfoCard>
              <UserInfo>
                <Avatar src={selectedUser?.avatarUrl} alt={selectedUser?.name} />
                <div>
                  <UserName>{selectedUser?.name}</UserName>
                  <UserEmail>{selectedUser?.email}</UserEmail>
                </div>
              </UserInfo>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Signup Date</InfoLabel>
                  <InfoValue>{selectedUser?.signupDate}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Plan Type</InfoLabel>
                  <InfoValue>
                    <span className={`plan-badge ${selectedUser?.planType.toLowerCase()}`}>
                      {selectedUser?.planType}
                    </span>
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Status</InfoLabel>
                  <InfoValue>
                    <span className={`status-badge ${selectedUser?.status.toLowerCase()}`}>
                      {selectedUser?.status}
                    </span>
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Activity Level</InfoLabel>
                  <InfoValue>
                    <span className={`activity-badge ${selectedUser?.activityLevel.toLowerCase()}`}>
                      {selectedUser?.activityLevel}
                    </span>
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Progress Status</InfoLabel>
                  <InfoValue>
                    <span className={`progress-badge ${selectedUser?.progressStatus.toLowerCase()}`}>
                      {selectedUser?.progressStatus}
                    </span>
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>XP Level</InfoLabel>
                  <InfoValue>
                    <XPBadge>
                      <span>{selectedUser?.xpLevel.toLocaleString()} XP</span>
                      <FaTrophy />
                    </XPBadge>
                  </InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoCard>

            <ActionButtons>
              <ActionButton onClick={handleResetPassword}>
                <FaKey />
                Reset Password
              </ActionButton>
              <ActionButton onClick={handleBanUser}>
                <FaBan />
                Ban User
              </ActionButton>
              <ActionButton className="danger" onClick={handleDeleteUser}>
                <FaTrash />
                Delete User
              </ActionButton>
            </ActionButtons>
          </SidebarContentWrapper>
        </DetailSidebarAside>
      )}

      {/* Action Confirmation Modal */}
      {isActionModalOpen && actionType && (
        <ModalOverlay $isOpen={isActionModalOpen} onClick={handleCloseActionModal}>
          <ActionConfirmContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ActionConfirmTitle $action={actionType as 'reset' | 'ban' | 'delete'}>
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
                $action={actionType as 'reset' | 'ban' | 'delete'}
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

export default UserManagementTab;