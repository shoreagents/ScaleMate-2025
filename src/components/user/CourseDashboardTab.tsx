import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faAward, 
  faMedal, 
  faTrophy, 
  faLock 
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const ProgressOverview = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const OverviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
`;

const HeaderText = styled.div`
  min-width: 0;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  flex-shrink: 0;

  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #E5E7EB;
  }
`;

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin-right: auto;
  }
`;

const XPText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

const BadgesContainer = styled.div`
  display: flex;
  margin-left: -0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media only screen and (max-width: 767px) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
  }
`;

const BadgeCircle = styled.div<{ $bgColor: string, $iconColor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$iconColor};
  flex-shrink: 0;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CourseCard = styled.div<{ $locked?: boolean }>`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  opacity: ${props => props.$locked ? 0.7 : 1};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
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
  flex-wrap: wrap;
`;

const StatusBadge = styled.span<{ $type: 'progress' | 'new' | 'completed' | 'locked' }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;
  
  ${props => {
    switch (props.$type) {
      case 'progress':
        return 'background-color: #DBEAFE; color: #3B82F6;';
      case 'new':
        return 'background-color: #DCFCE7; color: #16A34A;';
      case 'completed':
        return 'background-color: #DCFCE7; color: #16A34A;';
      case 'locked':
        return 'background-color: #F3F4F6; color: #4B5563;';
    }
  }}
`;

const XPBadge = styled.span`
  font-size: 0.875rem;
  color: #00E915;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
`;

const CourseTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 0.5rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0 0 1rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #F9FAFB;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $width: number; $completed?: boolean }>`
  height: 0.5rem;
  border-radius: 9999px;
  width: ${props => props.$width}%;
  background-color: ${props => props.$completed ? '#00E915' : '#3B82F6'};
  transition: width 0.3s ease;
`;

const Button = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: 0.75rem 0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.$primary ? `
    background-color: #3B82F6;
    color: white;
    border: none;
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.9);
    }
  ` : `
    background-color: transparent;
    color: #3B82F6;
    border: 1px solid #3B82F6;
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
    }
  `}
`;

const LockedMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.875rem;
  padding: 0.75rem;
  white-space: nowrap;
`;

const CourseDashboardTab: React.FC = () => {
  return (
    <MainContent>
      <ProgressOverview>
        <OverviewHeader>
          <HeaderText>
            <Title>Your Learning Journey</Title>
            <Subtitle>Complete courses to earn XP and unlock badges</Subtitle>
          </HeaderText>
          <StatsContainer>
            <XPContainer>
              <FontAwesomeIcon icon={faStar} style={{ color: '#00E915' }} />
              <XPText>2,450 XP</XPText>
            </XPContainer>
            <BadgesContainer>
              <BadgeCircle $bgColor="#DBEAFE" $iconColor="#3B82F6">
                <FontAwesomeIcon icon={faAward} />
              </BadgeCircle>
              <BadgeCircle $bgColor="#DCFCE7" $iconColor="#00E915">
                <FontAwesomeIcon icon={faMedal} />
              </BadgeCircle>
              <BadgeCircle $bgColor="#F3E8FF" $iconColor="#9333EA">
                <FontAwesomeIcon icon={faTrophy} />
              </BadgeCircle>
            </BadgesContainer>
          </StatsContainer>
        </OverviewHeader>
      </ProgressOverview>

      <CourseGrid>
        {/* In Progress Course */}
        <CourseCard>
          <CardContent>
            <CardHeader>
              <StatusBadge $type="progress">In Progress</StatusBadge>
              <XPBadge>+200 XP</XPBadge>
            </CardHeader>
            <CourseTitle>Offshore Team Management Mastery</CourseTitle>
            <CourseDescription>Learn essential strategies for managing distributed teams effectively.</CourseDescription>
            <ProgressContainer>
              <ProgressHeader>
                <span>Progress</span>
                <span>65%</span>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill $width={65} />
              </ProgressBar>
            </ProgressContainer>
            <Button $primary>Continue Course</Button>
          </CardContent>
        </CourseCard>

        {/* Available Course */}
        <CourseCard>
          <CardContent>
            <CardHeader>
              <StatusBadge $type="new">New</StatusBadge>
              <XPBadge>+300 XP</XPBadge>
            </CardHeader>
            <CourseTitle>Remote Communication Excellence</CourseTitle>
            <CourseDescription>Master the art of effective remote team communication.</CourseDescription>
            <ProgressContainer>
              <ProgressHeader>
                <span>Progress</span>
                <span>0%</span>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill $width={0} />
              </ProgressBar>
            </ProgressContainer>
            <Button>Start Course</Button>
          </CardContent>
        </CourseCard>

        {/* Completed Course */}
        <CourseCard>
          <CardContent>
            <CardHeader>
              <StatusBadge $type="completed">Completed</StatusBadge>
              <XPBadge>
                <FontAwesomeIcon icon={faMedal} style={{ color: '#00E915' }} />
                +150 XP
              </XPBadge>
            </CardHeader>
            <CourseTitle>Offshore Hiring Fundamentals</CourseTitle>
            <CourseDescription>Essential guide to hiring and onboarding offshore talent.</CourseDescription>
            <ProgressContainer>
              <ProgressHeader>
                <span>Progress</span>
                <span>100%</span>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill $width={100} $completed />
              </ProgressBar>
            </ProgressContainer>
            <Button>Review Course</Button>
          </CardContent>
        </CourseCard>

        {/* Locked Course */}
        <CourseCard $locked>
          <CardContent>
            <CardHeader>
              <StatusBadge $type="locked">Locked</StatusBadge>
              <XPBadge>+250 XP</XPBadge>
            </CardHeader>
            <CourseTitle>Advanced Team Scaling Strategies</CourseTitle>
            <CourseDescription>Complete previous courses to unlock this advanced module.</CourseDescription>
            <ProgressContainer>
              <LockedMessage>
                <FontAwesomeIcon icon={faLock} />
                <span>Complete "Offshore Team Management Mastery" to unlock</span>
              </LockedMessage>
            </ProgressContainer>
          </CardContent>
        </CourseCard>
      </CourseGrid>
    </MainContent>
  );
};

export default CourseDashboardTab; 