import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faArrowsSpin, faUsers } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 24px 0 rgba(59, 130, 246, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconBox = styled.div<{bg: string}>`
  width: 3rem;
  height: 3rem;
  background: ${({bg}) => bg};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span<{bg: string, color: string}>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: ${({bg}) => bg};
  color: ${({color}) => color};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardFooterText = styled.span`
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.6);
`;

const LearnMore = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #2563EB;
    text-decoration: underline;
  }
`;

export default function ToolGrid() {
  return (
    <Section id="tool-grid">
      <Container>
        <Grid>
          {/* Tool Card 1 */}
          <Card id="tool-1">
            <CardHeader>
              <IconBox bg="rgba(59,130,246,0.1)">
                <FontAwesomeIcon icon={faRobot} style={{color: '#3B82F6', fontSize: '2rem'}} />
              </IconBox>
              <BadgeGroup>
                <Badge bg="rgba(59,130,246,0.1)" color="#3B82F6">AI</Badge>
                <Badge bg="rgba(0,233,21,0.1)" color="#00E915">Easy</Badge>
              </BadgeGroup>
            </CardHeader>
            <CardTitle>UX Pilot</CardTitle>
            <CardDesc>AI-powered chat assistant for content creation and analysis.</CardDesc>
            <CardFooter>
              <CardFooterText>Best for: Content & Support</CardFooterText>
              <LearnMore>Learn More →</LearnMore>
            </CardFooter>
          </Card>
          {/* Tool Card 2 */}
          <Card id="tool-2">
            <CardHeader>
              <IconBox bg="rgba(0,152,255,0.1)">
                <FontAwesomeIcon icon={faArrowsSpin} style={{color: '#0098FF', fontSize: '2rem'}} />
              </IconBox>
              <BadgeGroup>
                <Badge bg="rgba(0,152,255,0.1)" color="#0098FF">Automation</Badge>
              </BadgeGroup>
            </CardHeader>
            <CardTitle>Zapier</CardTitle>
            <CardDesc>Connect apps and automate workflows without coding.</CardDesc>
            <CardFooter>
              <CardFooterText>Best for: Integration</CardFooterText>
              <LearnMore>Learn More →</LearnMore>
            </CardFooter>
          </Card>
          {/* Tool Card 3 */}
          <Card id="tool-3">
            <CardHeader>
              <IconBox bg="rgba(236,41,123,0.1)">
                <FontAwesomeIcon icon={faUsers} style={{color: '#EC297B', fontSize: '2rem'}} />
              </IconBox>
              <BadgeGroup>
                <Badge bg="rgba(236,41,123,0.1)" color="#EC297B">Onboarding</Badge>
              </BadgeGroup>
            </CardHeader>
            <CardTitle>Trainual</CardTitle>
            <CardDesc>Create and manage team training documentation.</CardDesc>
            <CardFooter>
              <CardFooterText>Best for: Training</CardFooterText>
              <LearnMore>Learn More →</LearnMore>
            </CardFooter>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
} 