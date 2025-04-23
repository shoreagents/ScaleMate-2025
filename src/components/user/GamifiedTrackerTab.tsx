import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faCalculator, 
  faUsers, 
  faGraduationCap,
  faUsersGear,
  faBook,
  faTrophy,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const XPText = styled.span`
  color: #00E915;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  height: 1rem;
  background-color: #F9FAFB;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background-color: #00E915;
  border-radius: 9999px;
  width: ${props => props.$width}%;
`;

const ProgressInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const BadgeCard = styled.div<{ $locked?: boolean }>`
  background-color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  text-align: center;
  opacity: ${props => props.$locked ? 0.5 : 1};
`;

const BadgeIcon = styled.div<{ $locked?: boolean }>`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 0.75rem;
  background-color: ${props => props.$locked ? 'rgba(15, 23, 42, 0.1)' : 'rgba(0, 233, 21, 0.1)'};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeIconInner = styled(FontAwesomeIcon)<{ $locked?: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.$locked ? 'rgba(15, 23, 42, 0.4)' : '#00E915'};
`;

const BadgeTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
`;

const BadgeDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const ActivityCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActivityIcon = styled(FontAwesomeIcon)`
  color: #3B82F6;
`;

const ActivityText = styled.span`
  color: #0F172A;
`;

const ActivityXP = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

const RewardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #F9FAFB;
  border-radius: 0.5rem;
`;

const RewardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RewardIcon = styled(FontAwesomeIcon)`
  color: #00E915;
`;

const RewardText = styled.span`
  color: #0F172A;
`;

const RewardXP = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #00E915;
`;

const GamifiedTrackerTab: React.FC = () => {
  return (
    <Container>
      {/* XP Progress Section */}
      <Section>
        <SectionHeader>
          <SectionTitle>Current Level: Power User</SectionTitle>
          <XPText>2,450 / 3,000 XP</XPText>
        </SectionHeader>
        <ProgressBar>
          <ProgressFill $width={82} />
        </ProgressBar>
        <ProgressInfo>550 XP needed for next level: Expert Navigator</ProgressInfo>
      </Section>

      {/* Badges Grid */}
      <Section>
        <SectionTitle>Earned Badges</SectionTitle>
        <BadgesGrid>
          {/* Badge 1 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faRocket} />
            </BadgeIcon>
            <BadgeTitle>First Flight</BadgeTitle>
            <BadgeDescription>Created first role</BadgeDescription>
          </BadgeCard>

          {/* Badge 2 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faCalculator} />
            </BadgeIcon>
            <BadgeTitle>Cost Master</BadgeTitle>
            <BadgeDescription>10 quotes generated</BadgeDescription>
          </BadgeCard>

          {/* Badge 3 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faUsers} $locked />
            </BadgeIcon>
            <BadgeTitle>Team Builder</BadgeTitle>
            <BadgeDescription>Build 5-person team</BadgeDescription>
          </BadgeCard>

          {/* Badge 4 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faGraduationCap} $locked />
            </BadgeIcon>
            <BadgeTitle>Course Pro</BadgeTitle>
            <BadgeDescription>Complete 3 courses</BadgeDescription>
          </BadgeCard>
        </BadgesGrid>
      </Section>

      {/* Activity Summary */}
      <ActivityGrid>
        {/* Recent Actions */}
        <ActivityCard>
          <SectionTitle>Recent Actions</SectionTitle>
          <ActivityList>
            <ActivityItem>
              <ActivityInfo>
                <ActivityIcon icon={faUsersGear} />
                <ActivityText>Created Sales Manager Role</ActivityText>
              </ActivityInfo>
              <ActivityXP>+100 XP</ActivityXP>
            </ActivityItem>
            <ActivityItem>
              <ActivityInfo>
                <ActivityIcon icon={faCalculator} />
                <ActivityText>Generated Cost Analysis</ActivityText>
              </ActivityInfo>
              <ActivityXP>+50 XP</ActivityXP>
            </ActivityItem>
            <ActivityItem>
              <ActivityInfo>
                <ActivityIcon icon={faBook} />
                <ActivityText>Downloaded Resource Guide</ActivityText>
              </ActivityInfo>
              <ActivityXP>+25 XP</ActivityXP>
            </ActivityItem>
          </ActivityList>
        </ActivityCard>

        {/* Next Rewards */}
        <ActivityCard>
          <SectionTitle>Coming Up Next</SectionTitle>
          <ActivityList>
            <RewardItem>
              <RewardInfo>
                <RewardIcon icon={faTrophy} />
                <RewardText>Unlock Premium Templates</RewardText>
              </RewardInfo>
              <RewardXP>550 XP</RewardXP>
            </RewardItem>
            <RewardItem>
              <RewardInfo>
                <RewardIcon icon={faStar} />
                <RewardText>Expert Navigator Badge</RewardText>
              </RewardInfo>
              <RewardXP>1000 XP</RewardXP>
            </RewardItem>
          </ActivityList>
        </ActivityCard>
      </ActivityGrid>
    </Container>
  );
};

export default GamifiedTrackerTab; 