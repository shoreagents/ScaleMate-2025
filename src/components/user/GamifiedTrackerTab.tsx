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

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
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

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BadgeCard = styled.div<{ $locked?: boolean }>`
  background-color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  text-align: center;
  opacity: ${props => props.$locked ? 0.5 : 1};
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem;
  }
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ActivityCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 480px) {
    width: 100%;
  }
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const RewardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 480px) {
    width: 100%;
  }
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
    <MainContent>
      <Section>
        <SectionHeader>
          <SectionTitle>XP Progress</SectionTitle>
          <XPText>2,450 / 3,000 XP</XPText>
        </SectionHeader>
        <ProgressBar>
          <ProgressFill $width={82} />
        </ProgressBar>
        <ProgressInfo>550 XP until next level</ProgressInfo>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Badges</SectionTitle>
        </SectionHeader>
        <BadgesGrid>
          {/* Badge 1 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faRocket} />
            </BadgeIcon>
            <BadgeTitle>Rocket Starter</BadgeTitle>
            <BadgeDescription>Complete your first role blueprint</BadgeDescription>
          </BadgeCard>

          {/* Badge 2 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faCalculator} />
            </BadgeIcon>
            <BadgeTitle>Cost Master</BadgeTitle>
            <BadgeDescription>Create 5 cost calculations</BadgeDescription>
          </BadgeCard>

          {/* Badge 3 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faUsers} />
            </BadgeIcon>
            <BadgeTitle>Team Builder</BadgeTitle>
            <BadgeDescription>Build a team of 5+ members</BadgeDescription>
          </BadgeCard>

          {/* Badge 4 */}
          <BadgeCard>
            <BadgeIcon>
              <BadgeIconInner icon={faGraduationCap} />
            </BadgeIcon>
            <BadgeTitle>Learning Champion</BadgeTitle>
            <BadgeDescription>Complete 3 courses</BadgeDescription>
          </BadgeCard>

          {/* Badge 5 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faUsersGear} $locked />
            </BadgeIcon>
            <BadgeTitle>Role Master</BadgeTitle>
            <BadgeDescription>Create 10 role blueprints</BadgeDescription>
          </BadgeCard>

          {/* Badge 6 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faBook} $locked />
            </BadgeIcon>
            <BadgeTitle>Resource Guru</BadgeTitle>
            <BadgeDescription>Access all resource library items</BadgeDescription>
          </BadgeCard>

          {/* Badge 7 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faTrophy} $locked />
            </BadgeIcon>
            <BadgeTitle>Achievement Hunter</BadgeTitle>
            <BadgeDescription>Unlock 10 badges</BadgeDescription>
          </BadgeCard>

          {/* Badge 8 */}
          <BadgeCard $locked>
            <BadgeIcon $locked>
              <BadgeIconInner icon={faStar} $locked />
            </BadgeIcon>
            <BadgeTitle>Scale Master</BadgeTitle>
            <BadgeDescription>Reach level 10</BadgeDescription>
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
    </MainContent>
  );
};

export default GamifiedTrackerTab; 