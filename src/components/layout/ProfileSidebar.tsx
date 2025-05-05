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
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
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
  font-size: 0.9375rem;
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
    <Sidebar $isOpen={isOpen}>
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
              Recent Activity
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
                        {activity.type === 'profile' && activity.description.includes('Gender') && (
                          activity.description.includes('to "Male"') ? <FaMale size={18} /> :
                          activity.description.includes('to "Female"') ? <FaFemale size={18} /> :
                          activity.description.includes('to "Other"') ? <FaTransgender size={18} /> :
                          activity.description.includes('to "Prefer-not-to-say"') ? <FaQuestion size={18} /> :
                          <FaQuestion size={18} />
                        )}
                        {activity.type === 'profile' && activity.description.includes('Phone') && <FaPhone size={18} />}
                        {activity.type === 'profile' && activity.description.includes('Username') && <FaAt size={18} />}
                        {activity.type === 'profile' && activity.description.includes('Password') && <FaLock size={18} />}
                        {activity.type === 'profile' && activity.description.includes('Profile Picture') && <FaUserCircle size={18} />}
                        {activity.type === 'admin' && <FaUserPlus size={18} />}
                        {activity.type === 'profile' && !activity.description.includes('Gender') && !activity.description.includes('Phone') && !activity.description.includes('Username') && !activity.description.includes('Password') && !activity.description.includes('Profile Picture') && <FaUser size={18} />}
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