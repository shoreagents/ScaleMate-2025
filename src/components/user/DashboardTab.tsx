import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { supabase } from '@/lib/supabase';
import { 
  FaLightbulb, 
  FaMedal, 
  FaStar, 
  FaTrophy, 
  FaCrown,
  FaUser,
  FaFileInvoiceDollar,
  FaGraduationCap,
  FaClipboardCheck,
  FaUsers,
  FaScrewdriver,
  FaBook,
  FaCalendarDays
} from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';
import UserProfile from '@/components/user/UserProfile';
import ReadinessScore from './ReadinessScore';

interface DashboardTabProps {
  user?: {
    id: string;
    email: string;
    username: string;
    full_name: string;
    profile_picture: string | null;
    role: string;
  };
  activeTab: string;
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F9FAFB;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #F9FAFB;
  
  @media only screen and (max-width: 1023px) {
    padding: 1.5rem;
  }
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
  @media only screen and (max-width: 480px) {
    padding: 0.5rem;
  }
  @media only screen and (max-width: 320px) {
    padding: 0.25rem;
  }
`;

const WelcomeSection = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const WelcomeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  @media only screen and (max-width: 882px) {
    flex-direction: column;
    gap: 1rem;
  }
  
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const WelcomeText = styled.div``;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  
  @media only screen and (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const WelcomeSubtitle = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
`;

const TipBox = styled.div`
  background-color: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 32rem;
  
  @media only screen and (max-width: 882px) {
    width: 100%;
    max-width: 100%;
  }
  
  @media only screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const TipContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const TipIcon = styled.div`
  color: #3B82F6;
  font-size: 1.25rem;
  margin-top: 0.25rem;
`;

const TipText = styled.div``;

const TipTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
`;

const TipDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.25rem;
`;

const ProgressGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 883px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const ProgressCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.75rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const XPProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const XPProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const XPProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
  gap: 0.25rem;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const XPLevel = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const XPCount = styled.span`
  color: #0F172A;
`;

const ProgressBarContainer = styled.div`
  height: 0.5rem;
  background-color: #E5E7EB;
  border-radius: 9999px;
`;

const ProgressBarFill = styled.div<{ $width: string }>`
  height: 0.5rem;
  background-color: #84CC16;
  border-radius: 9999px;
  width: ${props => props.$width};
`;

const XPInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #84CC16;
  font-size: 0.875rem;

  span {
    color: rgba(15, 23, 42, 0.7);
  }
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media only screen and (max-width: 882px) {
    gap: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
  }
  
  @media only screen and (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const Badge = styled.div<{ $isLocked?: boolean }>`
  text-align: center;
  opacity: ${props => props.$isLocked ? 0.5 : 1};
`;

const BadgeIcon = styled.div<{ $color: string }>`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.$color};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: ${props => props.$color === '#E5E7EB' ? 'rgba(15, 23, 42, 0.3)' : props.$color.replace('/10', '')};
  font-size: 1.25rem;
  
  @media only screen and (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
`;

const BadgeLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
  
  @media only screen and (max-width: 320px) {
    font-size: 0.625rem;
  }
`;

const ActivityGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 883px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 882px) {
    grid-template-columns: 1fr;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const ActivityCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.75rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 480px) {
    margin-bottom: 0.75rem;
  }
`;

const ViewAllLink = styled.span`
  color: #3B82F6;
  font-size: 0.875rem;
  cursor: pointer;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const IconContainer = styled.div<{ $bgColor: string, $iconColor: string }>`
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.$bgColor};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$iconColor};
  flex-shrink: 0;
  
  @media only screen and (max-width: 320px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin: 0;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const ItemSubtext = styled.p`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.6);
  margin: 0;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.625rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 6rem;
  height: 0.25rem;
  background-color: #E5E7EB;
  border-radius: 9999px;
  margin-top: 0.25rem;
  
  @media only screen and (max-width: 480px) {
    max-width: 5rem;
  }
  
  @media only screen and (max-width: 320px) {
    max-width: 4rem;
  }
`;

const ProgressFill = styled.div<{ $width: string, $color: string }>`
  width: ${props => props.$width};
  height: 0.25rem;
  background-color: ${props => props.$color};
  border-radius: 9999px;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
  
  @media (min-width: 883px) and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const NextStepsCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 1023px) {
    padding: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.75rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
  
  @media only screen and (max-width: 882px) {
    grid-template-columns: 1fr;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
  }
  
  @media only screen and (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const StepItem = styled.div`
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.5rem;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const StepIcon = styled.div`
  color: #3B82F6;
`;

const StepTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
  white-space: normal;
  word-break: break-word;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.875rem;
  }
`;

const StepDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  white-space: normal;
  word-break: break-word;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const QuickLinksCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 1023px) {
    padding: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.75rem;
  }
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const LinkIcon = styled.div`
  color: rgba(15, 23, 42, 0.7);
`;

const LinkText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  
  @media only screen and (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const SuccessModal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d9d9d9cc;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media only screen and (max-width: 480px) {
    padding: 1.5rem;
    max-width: 90%;
  }
  
  @media only screen and (max-width: 320px) {
    padding: 1rem;
  }
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.success}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.success};
  
  @media only screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const SuccessMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  
  @media only screen and (max-width: 480px) {
    font-size: 0.8125rem;
    margin-bottom: 1.25rem;
  }
`;

const SuccessButton = styled.button`
  padding: 0.875rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem 1.25rem;
  }
`;

const TabContainer = styled.div`
  padding: 1.5rem;
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DashboardTab: React.FC<DashboardTabProps> = ({ user, activeTab }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(user);
  const [showProfile, setShowProfile] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData) {
        try {
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser) {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', authUser.id)
              .single();

            if (profile) {
              setUserData({
                id: authUser.id,
                email: authUser.email || '',
                username: authUser.user_metadata.username || '',
                full_name: `${profile.first_name} ${profile.last_name}`,
                profile_picture: profile.profile_picture,
                role: profile.role || ''
              });

              // Check if this is a Google sign-up user who just completed setup
              const isGoogleUser = authUser.app_metadata?.provider === 'google';
              const justCompletedSetup = profile.last_password_change && 
                new Date(profile.last_password_change).getTime() > Date.now() - 10000; // Within last 10 seconds

              if (isGoogleUser && justCompletedSetup) {
                setShowSuccessModal(true);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userData]);

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isLoading) {
    return null; // Don't render anything while loading
  }

  return (
    <>
      {!showSuccessModal && (
    <DashboardContainer>
      <DashboardHeader
        title="Dashboard"
            profilePicture={userData?.profile_picture}
        onLogout={handleLogout}
        onProfileClick={() => setShowProfile(true)}
        showProfile={showProfile}
      />
      {showProfile ? (
        <UserProfile />
      ) : (
        <MainContent>
          <WelcomeSection>
            <WelcomeContent>
              <WelcomeText>
                    <WelcomeTitle>Welcome back, {userData?.full_name}!</WelcomeTitle>
                <WelcomeSubtitle>Ready to scale your team today?</WelcomeSubtitle>
              </WelcomeText>
              <TipBox>
                <TipContent>
                  <TipIcon>
                    <FaLightbulb />
                  </TipIcon>
                  <TipText>
                    <TipTitle>Today's Tip</TipTitle>
                    <TipDescription>
                      Use our AI-powered Role Builder to create custom job descriptions in minutes!
                    </TipDescription>
                  </TipText>
                </TipContent>
              </TipBox>
            </WelcomeContent>
          </WelcomeSection>

          <ProgressGrid>
            <ProgressCard>
              <CardTitle>XP Progress</CardTitle>
              <XPProgressContainer>
                <XPProgressBar>
                  <XPProgressHeader>
                    <XPLevel>Level 3</XPLevel>
                    <XPCount>2,450 / 3,000 XP</XPCount>
                  </XPProgressHeader>
                  <ProgressBarContainer>
                    <ProgressBarFill $width="82%" />
                  </ProgressBarContainer>
                </XPProgressBar>
                <XPInfo>
                  <FaMedal />
                  <span>550 XP until next level</span>
                </XPInfo>
              </XPProgressContainer>
            </ProgressCard>

            <ProgressCard>
              <CardTitle>Badge Progress</CardTitle>
              <BadgeContainer>
                <Badge>
                  <BadgeIcon $color="#3B82F6/10">
                    <FaStar />
                  </BadgeIcon>
                  <BadgeLabel>Recruiter</BadgeLabel>
                </Badge>
                <Badge>
                  <BadgeIcon $color="#84CC16/10">
                    <FaTrophy />
                  </BadgeIcon>
                  <BadgeLabel>Scaling Pro</BadgeLabel>
                </Badge>
                <Badge $isLocked>
                  <BadgeIcon $color="#E5E7EB">
                    <FaCrown />
                  </BadgeIcon>
                  <BadgeLabel>Expert</BadgeLabel>
                </Badge>
              </BadgeContainer>
            </ProgressCard>
          </ProgressGrid>

          <ActivityGrid>
            <ActivityCard>
              <CardHeader>
                <CardTitle>Recent Roles</CardTitle>
                <ViewAllLink>View All</ViewAllLink>
              </CardHeader>
              <ActivityList>
                <ActivityItem>
                  <IconContainer $bgColor="rgba(59, 130, 246, 0.1)" $iconColor="#3B82F6">
                    <FaUser />
                  </IconContainer>
                  <ItemContent>
                    <ItemTitle>Senior VA</ItemTitle>
                    <ItemSubtext>Created 2 days ago</ItemSubtext>
                  </ItemContent>
                </ActivityItem>
                <ActivityItem>
                  <IconContainer $bgColor="rgba(59, 130, 246, 0.1)" $iconColor="#3B82F6">
                    <FaUser />
                  </IconContainer>
                  <ItemContent>
                    <ItemTitle>Customer Support</ItemTitle>
                    <ItemSubtext>Created 4 days ago</ItemSubtext>
                  </ItemContent>
                </ActivityItem>
              </ActivityList>
            </ActivityCard>

            <ActivityCard>
              <CardHeader>
                <CardTitle>Recent Quotes</CardTitle>
                <ViewAllLink>View All</ViewAllLink>
              </CardHeader>
              <ActivityList>
                <ActivityItem>
                  <IconContainer $bgColor="rgba(132, 204, 22, 0.1)" $iconColor="#84CC16">
                    <FaFileInvoiceDollar />
                  </IconContainer>
                  <ItemContent>
                    <ItemTitle>VA Team Quote</ItemTitle>
                    <ItemSubtext>$2,400/month</ItemSubtext>
                  </ItemContent>
                </ActivityItem>
              </ActivityList>
            </ActivityCard>

            <ActivityCard>
              <CardHeader>
                <CardTitle>Active Courses</CardTitle>
                <ViewAllLink>View All</ViewAllLink>
              </CardHeader>
              <ActivityList>
                <ActivityItem>
                  <IconContainer $bgColor="rgba(236, 41, 123, 0.1)" $iconColor="#EC297B">
                    <FaGraduationCap />
                  </IconContainer>
                  <ItemContent>
                    <ItemTitle>Hiring Mastery</ItemTitle>
                    <ProgressBar>
                      <ProgressFill $width="75%" $color="#EC297B" />
                    </ProgressBar>
                  </ItemContent>
                </ActivityItem>
              </ActivityList>
            </ActivityCard>
          </ActivityGrid>

          <BottomGrid>
            <NextStepsCard>
              <CardTitle>Suggested Next Steps</CardTitle>
              <StepsGrid>
                <StepItem>
                  <StepHeader>
                    <StepIcon>
                      <FaClipboardCheck />
                    </StepIcon>
                    <StepTitle>Complete Readiness Quiz</StepTitle>
                  </StepHeader>
                  <StepDescription>Get personalized scaling recommendations</StepDescription>
                </StepItem>
                <StepItem>
                  <StepHeader>
                    <StepIcon>
                      <FaUsers />
                    </StepIcon>
                    <StepTitle>Build Your First Role</StepTitle>
                  </StepHeader>
                  <StepDescription>Create a custom role description</StepDescription>
                </StepItem>
              </StepsGrid>
            </NextStepsCard>

            <QuickLinksCard>
              <CardTitle>Quick Links</CardTitle>
              <LinksList>
                <LinkItem href="#">
                  <LinkIcon>
                    <FaScrewdriver />
                  </LinkIcon>
                  <LinkText>Tools Library</LinkText>
                </LinkItem>
                <LinkItem href="#">
                  <LinkIcon>
                    <FaBook />
                  </LinkIcon>
                  <LinkText>Resources</LinkText>
                </LinkItem>
                <LinkItem href="#">
                  <LinkIcon>
                    <FaCalendarDays />
                  </LinkIcon>
                  <LinkText>Book Strategy Call</LinkText>
                </LinkItem>
              </LinksList>
            </QuickLinksCard>
          </BottomGrid>
        </MainContent>
      )}
    </DashboardContainer>
      )}

      <SuccessModal $isOpen={showSuccessModal}>
        <SuccessModalContent>
          <SuccessIcon>
            <FiCheck size={24} />
          </SuccessIcon>
          <SuccessTitle>Setup Completed</SuccessTitle>
          <SuccessMessage>
            Your account has been successfully set up. You can now use your new credentials to log in.
          </SuccessMessage>
          <SuccessButton onClick={handleSuccessContinue}>
            Continue
          </SuccessButton>
        </SuccessModalContent>
      </SuccessModal>
    </>
  );
};

export default DashboardTab; 