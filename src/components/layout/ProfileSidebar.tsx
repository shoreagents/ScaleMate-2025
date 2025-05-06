import React from 'react';
import styled from 'styled-components';
import { 
  FaTimes, FaUser, FaEnvelope, FaPhone, 
  FaCalendarAlt, FaHistory, FaCog, FaBell, FaLock, FaGlobe, FaSignOutAlt,
  FaChartLine, FaFileAlt, FaStar, FaClock, FaMale, FaFemale, FaTransgender, FaQuestion, FaAt, FaUserCircle,
  FaUserPlus
} from 'react-icons/fa';
import { FiX, FiUser } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faUserShield, faUserPlus, faUserEdit, faUserMinus, faUserCog, 
  faUsers, faBook, faQuestionCircle, faTrophy, faAward, faCertificate, 
  faFileAlt, faCommentAlt, faHeadset, faSlidersH, faPalette, faLanguage, 
  faMoneyBill, faCreditCard, faFileInvoiceDollar, faMoneyCheck, faFileInvoice, 
  faUndo, faTicketAlt, faPercent, faGift, faUserFriends, faHandshake, 
  faMoneyBillWave, faMoneyBillTransfer, faMoneyBillTrendUp, faExchangeAlt, 
  faWallet, faPlusCircle, faMinusCircle, faRandom, faPercentage, faInfoCircle, 
  faHandHoldingUsd, faCalculator, faBriefcase, faSitemap, faShareAlt, faStar,
  faLevelUpAlt, faShieldAlt, faSignInAlt, faKey, faMapMarkerAlt, faBuilding,
  faFileContract, faMoneyCheckAlt, faSync, faChartLine, faBell as faBellIcon,
  faCog as faCogIcon, faSignOutAlt as faSignOutAltIcon, faEnvelope as faEnvelopeIcon,
  faPhone as faPhoneIcon, faUserCircle as faUserCircleIcon, faGlobe as faGlobeIcon,
  faChartLine as faChartLineIcon, faAt, faUserCircle
} from '@fortawesome/free-solid-svg-icons';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    company?: string;
    joinedDate?: string;
    lastLogin?: string;
    avatar?: string;
    role?: string;
    gender?: string;
    user_id?: string;
    preferences?: {
      notifications: boolean;
      language: string;
      theme: 'light' | 'dark';
    };
    stats?: {
      leadsGenerated: number;
      rolesCreated: number;
      quotesSent: number;
    };
    recentActivity?: Array<{
      id: string;
      type: 'lead' | 'role' | 'quote';
      description: string;
      timestamp: string;
    }>;
    username?: string;
  };
}

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 24rem;
  height: 100%;
  background-color: #F8FAFC;
  border-left: 1px solid #E2E8F0;
  padding: 1.5rem;
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E2E8F0;
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  color: rgba(15,23,42,0.7);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  &:hover {
    color: #1E293B;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;;
  padding: 1.5rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 5rem;
  height: 5rem;
  min-width: 5rem;
  border-radius: 50%;
  background-color: #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(15,23,42,0.7);
  font-size: 1.75rem;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarPlaceholder = styled(Avatar)`
  background-color: #F1F5F9;
  color: rgba(15,23,42,0.7);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  align-items: center;
  text-align: center;
`;

const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
  word-break: break-word;
  line-height: 1.3;
  padding: 0 0.5rem;
`;

const ProfileRole = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  width: fit-content;
  text-align: center;
  background-color: ${props => {
    switch (props.children?.toString().toLowerCase()) {
      case 'admin':
        return '#EC489910';
      case 'moderator':
        return '#00E91510';
      case 'user':
        return '#3B82F610';
      default:
        return '#3B82F610';
    }
  }};
  color: ${props => {
    switch (props.children?.toString().toLowerCase()) {
      case 'admin':
        return '#EC4899';
      case 'moderator':
        return '#00E915';
      case 'user':
        return '#3B82F6';
      default:
        return '#3B82F6';
    }
  }};
`;

const DividerWithText = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 1.25rem;
  color: ${props => props.$isActive ? '#1E293B' : 'rgba(15,23,42,0.7)'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;

  &:hover {
    color: #1E293B;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E2E8F0;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const InfoList = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: ${props => props.$isVisible ? 1 : 0};
  max-height: ${props => props.$isVisible ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding-top: ${props => props.$isVisible ? '2rem' : '0'};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  display: flex;
  align-items: center;
  gap: 0.625rem;

  svg {
    color: rgba(15,23,42,0.7);
    flex-shrink: 0;
  }
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: rgba(15,23,42,0.7);
  font-weight: 500;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 1.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.625rem;

  svg {
    color: rgba(15,23,42,0.7);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.25rem 1rem;
  background-color: #F8FAFC;
  border-radius: 0.75rem;
  border: 1px solid #E2E8F0;

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1E293B;
    margin: 0 0 0.375rem 0;
  }

  p {
    font-size: 0.75rem;
    color: rgba(15,23,42,0.7);
    margin: 0;
    font-weight: 500;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityDate = styled.h4<{ $isActive: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.$isActive ? '#1E293B' : 'rgba(15,23,42,0.7)'};
  margin: 0;
  padding: 0.5rem 0;
  text-transform: none;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;

  &:hover {
    color: #1E293B;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E2E8F0;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const ActivityGroup = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  opacity: ${props => props.$isVisible ? 1 : 0};
  max-height: ${props => props.$isVisible ? 'none' : '0'};
  overflow: visible;
  transition: opacity 0.3s ease;
  padding-top: ${props => props.$isVisible ? '1rem' : '0'};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem;
  background-color: #F8FAFC;
  border-radius: 0.75rem;
  border: 1px solid #E2E8F0;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-height: 4rem;
  overflow: visible;

  &:hover {
    background-color: #F1F5F9;
  }

  svg {
    color: rgba(15,23,42,0.7);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: visible;

  p {
    font-size: 0.875rem;
    color: #1E293B;
    margin: 0;
    font-weight: 500;
    line-height: 1.4;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-line;
    max-width: 100%;
    overflow: visible;
  }

  span {
    font-size: 0.75rem;
    color: rgba(15,23,42,0.7);
    display: block;
    text-align: right;
    flex-shrink: 0;
  }
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.75rem;
  cursor: pointer;
  transition: color 0.2s;
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    color: #2563EB;
  }
`;

const PreferencesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreferenceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #F8FAFC;
  border-radius: 0.75rem;
  border: 1px solid #E2E8F0;

  div {
    display: flex;
    align-items: center;
    gap: 0.875rem;

    svg {
      color: rgba(15,23,42,0.7);
    }

    span {
      font-size: 0.875rem;
      color: #1E293B;
      font-weight: 500;
    }
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 2.75rem;
  height: 1.5rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E2E8F0;
    transition: .3s;
    border-radius: 1.5rem;

    &:before {
      position: absolute;
      content: "";
      height: 1.25rem;
      width: 1.25rem;
      left: 0.125rem;
      bottom: 0.125rem;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  input:checked + span {
    background-color: #3B82F6;
  }

  input:checked + span:before {
    transform: translateX(1.25rem);
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.875rem;
  background-color: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 0.75rem;
  color: #EF4444;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FEE2E2;
    border-color: #FECACA;
  }

  svg {
    flex-shrink: 0;
  }
`;

const getActivityIcon = (type: string, description: string) => {
  switch (type) {
    case 'profile':
      return <FontAwesomeIcon icon={faUserEdit} className="text-blue-500" />;
    case 'admin':
      return <FontAwesomeIcon icon={faUserShield} className="text-purple-500" />;
    case 'user_creation':
      return <FontAwesomeIcon icon={faUserPlus} className="text-green-500" />;
    case 'user_update':
      return <FontAwesomeIcon icon={faUserEdit} className="text-yellow-500" />;
    case 'user_deletion':
      return <FontAwesomeIcon icon={faUserMinus} className="text-red-500" />;
    case 'role_change':
      return <FontAwesomeIcon icon={faUserCog} className="text-indigo-500" />;
    case 'team':
      return <FontAwesomeIcon icon={faUsers} className="text-blue-500" />;
    case 'course':
      return <FontAwesomeIcon icon={faBook} className="text-green-500" />;
    case 'quiz':
      return <FontAwesomeIcon icon={faQuestionCircle} className="text-yellow-500" />;
    case 'achievement':
      return <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />;
    case 'xp':
      return <FontAwesomeIcon icon={faStar} className="text-yellow-500" />;
    case 'level':
      return <FontAwesomeIcon icon={faLevelUpAlt} className="text-green-500" />;
    case 'badge':
      return <FontAwesomeIcon icon={faAward} className="text-purple-500" />;
    case 'certificate':
      return <FontAwesomeIcon icon={faCertificate} className="text-blue-500" />;
    case 'resource':
      return <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />;
    case 'feedback':
      return <FontAwesomeIcon icon={faCommentAlt} className="text-blue-500" />;
    case 'support':
      return <FontAwesomeIcon icon={faHeadset} className="text-green-500" />;
    case 'notification':
      return <FontAwesomeIcon icon={faBellIcon} className="text-yellow-500" />;
    case 'security':
      return <FontAwesomeIcon icon={faShieldAlt} className="text-red-500" />;
    case 'settings':
      return <FontAwesomeIcon icon={faCogIcon} className="text-gray-500" />;
    case 'login':
      return <FontAwesomeIcon icon={faSignInAlt} className="text-green-500" />;
    case 'logout':
      return <FontAwesomeIcon icon={faSignOutAltIcon} className="text-red-500" />;
    case 'password':
      return <FontAwesomeIcon icon={faKey} className="text-blue-500" />;
    case 'email':
      return <FontAwesomeIcon icon={faEnvelopeIcon} className="text-blue-500" />;
    case 'phone':
      return <FontAwesomeIcon icon={faPhoneIcon} className="text-green-500" />;
    case 'location':
      return <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />;
    case 'company':
      return <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />;
    case 'position':
      return <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" />;
    case 'department':
      return <FontAwesomeIcon icon={faSitemap} className="text-purple-500" />;
    case 'bio':
      return <FontAwesomeIcon icon={faUserCircleIcon} className="text-blue-500" />;
    case 'social':
      return <FontAwesomeIcon icon={faShareAlt} className="text-blue-500" />;
    case 'preferences':
      return <FontAwesomeIcon icon={faSlidersH} className="text-gray-500" />;
    case 'theme':
      return <FontAwesomeIcon icon={faPalette} className="text-purple-500" />;
    case 'language':
      return <FontAwesomeIcon icon={faLanguage} className="text-blue-500" />;
    case 'timezone':
      return <FontAwesomeIcon icon={faGlobeIcon} className="text-green-500" />;
    case 'currency':
      return <FontAwesomeIcon icon={faMoneyBill} className="text-green-500" />;
    case 'notification_preferences':
      return <FontAwesomeIcon icon={faBellIcon} className="text-yellow-500" />;
    case 'privacy':
      return <FontAwesomeIcon icon={faUserShield} className="text-blue-500" />;
    case 'terms':
      return <FontAwesomeIcon icon={faFileContract} className="text-gray-500" />;
    case 'subscription':
      return <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />;
    case 'billing':
      return <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-green-500" />;
    case 'payment':
      return <FontAwesomeIcon icon={faMoneyCheck} className="text-green-500" />;
    case 'invoice':
      return <FontAwesomeIcon icon={faFileInvoice} className="text-blue-500" />;
    case 'refund':
      return <FontAwesomeIcon icon={faUndo} className="text-yellow-500" />;
    case 'coupon':
      return <FontAwesomeIcon icon={faTicketAlt} className="text-green-500" />;
    case 'discount':
      return <FontAwesomeIcon icon={faPercent} className="text-green-500" />;
    case 'gift':
      return <FontAwesomeIcon icon={faGift} className="text-red-500" />;
    case 'referral':
      return <FontAwesomeIcon icon={faUserFriends} className="text-blue-500" />;
    case 'affiliate':
      return <FontAwesomeIcon icon={faHandshake} className="text-green-500" />;
    case 'commission':
      return <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500" />;
    case 'payout':
      return <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-green-500" />;
    case 'withdrawal':
      return <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-yellow-500" />;
    case 'deposit':
      return <FontAwesomeIcon icon={faMoneyBillTrendUp} className="text-green-500" />;
    case 'transaction':
      return <FontAwesomeIcon icon={faExchangeAlt} className="text-blue-500" />;
    case 'balance':
      return <FontAwesomeIcon icon={faWallet} className="text-green-500" />;
    case 'credit':
      return <FontAwesomeIcon icon={faPlusCircle} className="text-green-500" />;
    case 'debit':
      return <FontAwesomeIcon icon={faMinusCircle} className="text-red-500" />;
    case 'transfer':
      return <FontAwesomeIcon icon={faRandom} className="text-blue-500" />;
    case 'exchange':
      return <FontAwesomeIcon icon={faExchangeAlt} className="text-yellow-500" />;
    case 'conversion':
      return <FontAwesomeIcon icon={faSync} className="text-blue-500" />;
    case 'rate':
      return <FontAwesomeIcon icon={faChartLineIcon} className="text-green-500" />;
    case 'fee':
      return <FontAwesomeIcon icon={faHandHoldingUsd} className="text-red-500" />;
    case 'tax':
      return <FontAwesomeIcon icon={faCalculator} className="text-gray-500" />;
    case 'vat':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'gst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'hst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'pst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'qst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'cst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'mst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'ast':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'nst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'sst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'ist':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'gst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'cst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'mst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'ast':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'nst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'sst':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'ist':
      return <FontAwesomeIcon icon={faPercentage} className="text-gray-500" />;
    case 'username':
      return <FontAwesomeIcon icon={faAt} className="text-blue-500" />;
    case 'name':
      return <FontAwesomeIcon icon={faUser} className="text-blue-500" />;
    case 'profile_picture':
      return <FontAwesomeIcon icon={faUserCircle} className="text-blue-500" />;
    case 'gender':
      return <FontAwesomeIcon icon={faUser} className="text-purple-500" />;
    case 'password_change':
      return <FontAwesomeIcon icon={faKey} className="text-green-500" />;
    case 'profile_picture_change':
      return <FontAwesomeIcon icon={faUserCircle} className="text-blue-500" />;
    case 'gender_change':
      // Extract the new gender from the description
      const genderMatch = description.match(/to\s+"([^"]+)"/i);
      const newGender = genderMatch ? genderMatch[1].toLowerCase() : null;
      
      if (newGender === 'male') {
        return <FaMale size={18} className="text-blue-500" />;
      } else if (newGender === 'female') {
        return <FaFemale size={18} className="text-pink-500" />;
      } else if (newGender === 'other') {
        return <FaTransgender size={18} className="text-purple-500" />;
      } else if (newGender === 'prefer not to say') {
        return <FaQuestion size={18} className="text-gray-500" />;
      }
      return <FaQuestion size={18} className="text-gray-500" />;
    default:
      return <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />;
  }
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose, profile }) => {
  const [isInfoVisible, setIsInfoVisible] = React.useState(false);
  const [visibleDates, setVisibleDates] = React.useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = React.useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = React.useState<Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    date: string;
    time: string;
  }>>([]);

  // Add click outside handler
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('profile-sidebar');
      if (sidebar && !sidebar.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  React.useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!profile?.user_id) return;

      try {
        const { data: activity, error } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', profile.user_id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setRecentActivity(activity.map(item => {
          const date = new Date(item.created_at);
          return {
            id: item.id,
            type: item.type,
            description: item.description,
            timestamp: date.toLocaleString(),
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }));
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    if (isOpen) {
      fetchRecentActivity();
    }
  }, [isOpen, profile]);

  // Group activities by date
  const groupedActivities = React.useMemo(() => {
    return recentActivity.reduce((groups, activity) => {
      const date = activity.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {} as Record<string, typeof recentActivity>);
  }, [recentActivity]);

  // Initialize visible dates when activities are loaded
  React.useEffect(() => {
    const dates = Object.keys(groupedActivities);
    const initialVisibility = dates.reduce((acc, date) => {
      acc[date] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setVisibleDates(initialVisibility);
  }, [groupedActivities]);

  // Initialize visible items when activities are loaded
  React.useEffect(() => {
    const dates = Object.keys(groupedActivities);
    const initialVisibility = dates.reduce((acc, date) => {
      acc[date] = 5; // Show first 5 items initially
      return acc;
    }, {} as Record<string, number>);
    setVisibleItems(initialVisibility);
  }, [groupedActivities]);

  const toggleDateVisibility = (date: string) => {
    setVisibleDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const showMoreItems = (date: string) => {
    setVisibleItems(prev => ({
      ...prev,
      [date]: prev[date] + 5
    }));
  };

  if (!profile) return null;

  return (
    <Sidebar $isOpen={isOpen} id="profile-sidebar">
      <SidebarHeader>
        <SidebarTitle>Profile Details</SidebarTitle>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </SidebarHeader>

      <SidebarContent>
        <Card>
          <ProfileHeader>
            {profile.avatar ? (
              <Avatar>
                <img src={profile.avatar} alt={profile.name} />
              </Avatar>
            ) : (
              <AvatarPlaceholder>
                <FiUser size={24} />
              </AvatarPlaceholder>
            )}
            <ProfileInfo>
              <ProfileName>{profile.name}</ProfileName>
              <ProfileRole>{profile.role}</ProfileRole>
            </ProfileInfo>
          </ProfileHeader>

          <DividerWithText 
            onClick={() => setIsInfoVisible(!isInfoVisible)}
            $isActive={isInfoVisible}
          >
            {isInfoVisible ? 'Hide Info' : 'Show Info'}
          </DividerWithText>

          <InfoList $isVisible={isInfoVisible}>
            <InfoItem>
              <InfoLabel>
                <FaEnvelope />
                Email
              </InfoLabel>
              <InfoValue>{profile.email}</InfoValue>
            </InfoItem>
            {profile.username && (
              <InfoItem>
                <InfoLabel>
                  <FaUser />
                  Username
                </InfoLabel>
                <InfoValue>@{profile.username}</InfoValue>
              </InfoItem>
            )}
            {profile.gender && (
              <InfoItem>
                <InfoLabel>
                  {profile.gender === 'male' ? <FaMale size={18} /> :
                   profile.gender === 'female' ? <FaFemale size={18} /> :
                   profile.gender === 'other' ? <FaTransgender size={18} /> :
                   profile.gender === 'prefer-not-to-say' ? <FaQuestion size={18} /> :
                   <FaQuestion size={18} />}
                  Gender
                </InfoLabel>
                <InfoValue>{profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}</InfoValue>
              </InfoItem>
            )}
            {profile.phone && (
              <InfoItem>
                <InfoLabel>
                  <FaPhone />
                  Phone
                </InfoLabel>
                <InfoValue>{profile.phone}</InfoValue>
              </InfoItem>
            )}
            <InfoItem>
              <InfoLabel>
                <FaCalendarAlt />
                Joined
              </InfoLabel>
              <InfoValue>{profile.joinedDate}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>
                <FaClock />
                Last Login
              </InfoLabel>
              <InfoValue>{profile.lastLogin}</InfoValue>
            </InfoItem>
          </InfoList>
        </Card>

        {profile.stats && (
          <Card>
            <SectionTitle>
              <FaChartLine />
              Performance Stats
            </SectionTitle>
            <StatsGrid>
              <StatItem>
                <h4>{profile.stats.leadsGenerated}</h4>
                <p>Leads</p>
              </StatItem>
              <StatItem>
                <h4>{profile.stats.rolesCreated}</h4>
                <p>Roles</p>
              </StatItem>
              <StatItem>
                <h4>{profile.stats.quotesSent}</h4>
                <p>Quotes</p>
              </StatItem>
            </StatsGrid>
          </Card>
        )}

        {recentActivity.length > 0 && (
          <Card>
            <SectionTitle>
              <FaHistory />
              Recent Activities
            </SectionTitle>
            <ActivityList>
              {Object.entries(groupedActivities).map(([date, activities]) => (
                <React.Fragment key={date}>
                  <ActivityDate 
                    onClick={() => toggleDateVisibility(date)}
                    $isActive={visibleDates[date]}
                  >
                    {date}
                  </ActivityDate>
                  <ActivityGroup $isVisible={visibleDates[date]}>
                    {activities.slice(0, visibleItems[date]).map((activity) => (
                      <ActivityItem key={activity.id}>
                        {getActivityIcon(activity.type, activity.description)}
                        <ActivityContent>
                          <p>{activity.description.replace('Removed Gender', 'Unset Gender')}</p>
                          <span>{activity.time}</span>
                        </ActivityContent>
                      </ActivityItem>
                    ))}
                    {activities.length > visibleItems[date] && (
                      <ShowMoreButton onClick={() => showMoreItems(date)}>
                        Show More
                      </ShowMoreButton>
                    )}
                  </ActivityGroup>
                </React.Fragment>
              ))}
            </ActivityList>
          </Card>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default ProfileSidebar; 