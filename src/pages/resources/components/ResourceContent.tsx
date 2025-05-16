import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilePdf, 
  faFileLines, 
  faFileExcel,
  faLock,
  faCheck,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import { ResourcesAuthModal } from '../../../components/auth-modals/resources/ResourcesAuthModal';

const Section = styled.section`
  padding: 3rem 0;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: 1px solid #E5E7EB;
  background: ${({active}) => (active ? '#3B82F6' : '#fff')};
  color: ${({active}) => (active ? '#fff' : '#0F172A')};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({active}) => (active ? '#2563EB' : '#F9FAFB')};
    color: ${({active}) => (active ? '#fff' : '#0F172A')};
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResourceCard = styled.div`
  background: #F9FAFB;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #EC297B;
`;

const Badge = styled.span<{ premium?: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => props.premium ? '#EC297B' : 'rgba(0, 233, 21, 0.1)'};
  color: ${props => props.premium ? '#fff' : '#00E915'};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0F172A;
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const DownloadButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const LockOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LockContent = styled.div`
  text-align: center;
`;

const LockIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #EC297B;
  margin-bottom: 0.5rem;
`;

const LockText = styled.p`
  color: #0F172A;
  font-weight: 500;
`;

const SidebarCard = styled.div`
  position: sticky;
  top: 6rem;
  background-color: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const SidebarDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
`;

const CreateAccountButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  border: none;
  justify-content: center;
  margin-bottom: 1.5rem;
  &:hover {
    background-color: #2563EB;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  color: #00E915;
  margin-right: 0.75rem;
`;

const FeatureText = styled.span`
  font-size: 0.875rem;
`;

const ResourceLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-left: 0.25rem;
  font-size: 0.875rem;
`;

export default function ResourceContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const handleCreateAccount = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // Update UI state to reflect authenticated user
    // No page refresh needed as useAuth hook will update automatically
  };

  return (
    <Section id="resources-content">
      <Container>
        <ContentWrapper>
          <MainContent>
            <Filters>
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
              >
                All Resources
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'checklists'} 
                onClick={() => setActiveFilter('checklists')}
              >
                Checklists
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'templates'} 
                onClick={() => setActiveFilter('templates')}
              >
                Templates
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'guides'} 
                onClick={() => setActiveFilter('guides')}
              >
                Guides
              </FilterButton>
            </Filters>

            <ResourceGrid>
              {/* Resource Card 1 */}
              <ResourceCard>
                <CardContent>
                  <CardHeader>
                    <CardIcon icon={faFilePdf} />
                    <Badge>Free</Badge>
                  </CardHeader>
                  <CardTitle>Delegation Checklist</CardTitle>
                  <CardDescription>
                    Complete checklist for delegating tasks effectively to your offshore team.
                  </CardDescription>
                  <ResourceLink href="#">
                    Download Template
                    <ArrowIcon icon={faArrowRight} />
                  </ResourceLink>
                </CardContent>
              </ResourceCard>

              {/* Resource Card 2 (Premium/Locked) */}
              <ResourceCard style={{ position: 'relative' }}>
                <LockOverlay>
                  <LockContent>
                    <LockIcon icon={faLock} />
                    <LockText>Login to Access</LockText>
                  </LockContent>
                </LockOverlay>
                <CardContent>
                  <CardHeader>
                    <CardIcon icon={faFileLines} />
                    <Badge premium>Premium</Badge>
                  </CardHeader>
                  <CardTitle>AI Integration Guide</CardTitle>
                  <CardDescription>
                    Step-by-step guide to implementing AI tools in your workflow.
                  </CardDescription>
                  <ResourceLink href="#">
                    Download Template
                    <ArrowIcon icon={faArrowRight} />
                  </ResourceLink>
                </CardContent>
              </ResourceCard>

              {/* Resource Card 3 */}
              <ResourceCard>
                <CardContent>
                  <CardHeader>
                    <CardIcon icon={faFileExcel} />
                    <Badge>Free</Badge>
                  </CardHeader>
                  <CardTitle>KPI Tracking Template</CardTitle>
                  <CardDescription>
                    Ready-to-use Excel template for tracking team performance.
                  </CardDescription>
                  <ResourceLink href="#">
                    Download Template
                    <ArrowIcon icon={faArrowRight} />
                  </ResourceLink>
                </CardContent>
              </ResourceCard>
            </ResourceGrid>
          </MainContent>

          <Sidebar>
            <SidebarCard>
              <SidebarTitle>Unlock All Resources</SidebarTitle>
              <SidebarDescription>
                Create a free account to access premium templates and guides.
              </SidebarDescription>
              <CreateAccountButton onClick={handleCreateAccount}>
                Create Free Account
              </CreateAccountButton>
              <FeatureList>
                <FeatureItem>
                  <CheckIcon icon={faCheck} />
                  <FeatureText>50+ Premium Templates</FeatureText>
                </FeatureItem>
                <FeatureItem>
                  <CheckIcon icon={faCheck} />
                  <FeatureText>AI-Ready Playbooks</FeatureText>
                </FeatureItem>
                <FeatureItem>
                  <CheckIcon icon={faCheck} />
                  <FeatureText>Monthly Updates</FeatureText>
                </FeatureItem>
              </FeatureList>
            </SidebarCard>
          </Sidebar>
        </ContentWrapper>
      </Container>

      <ResourcesAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Section>
  );
} 