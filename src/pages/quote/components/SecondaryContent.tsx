import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faGear, faGlobe, faBook, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  max-width: 5xl;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #0F172A;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.25rem;
`;

const FeatureContent = styled.div`
  margin-left: 1rem;
`;

const FeatureTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #0F172A;
`;

const FeatureDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const InfoCard = styled.div`
  background-color: #F9FAFB;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #3B82F6;
  margin-right: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
`;

const PreviewLink = styled.div`
  display: flex;
  align-items: center;
  color: #3B82F6;
  font-weight: 600;
  cursor: pointer;
`;

export default function SecondaryContent() {
  return (
    <Section id="quote-info">
      <Container>
        <Grid>
          <div>
            <Title>How We Calculate Your Quote</Title>
            <FeatureList>
              <FeatureItem>
                <IconWrapper>
                  <FontAwesomeIcon icon={faChartLine} color="#3B82F6" />
                </IconWrapper>
                <FeatureContent>
                  <FeatureTitle>Market Data Analysis</FeatureTitle>
                  <FeatureDescription>Real-time salary data from top offshore markets</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              <FeatureItem>
                <IconWrapper>
                  <FontAwesomeIcon icon={faGear} color="#3B82F6" />
                </IconWrapper>
                <FeatureContent>
                  <FeatureTitle>Role Complexity</FeatureTitle>
                  <FeatureDescription>Task analysis and skill requirement mapping</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              <FeatureItem>
                <IconWrapper>
                  <FontAwesomeIcon icon={faGlobe} color="#3B82F6" />
                </IconWrapper>
                <FeatureContent>
                  <FeatureTitle>Regional Factors</FeatureTitle>
                  <FeatureDescription>Location-based cost adjustments and benefits</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            </FeatureList>
          </div>
          <InfoCard>
            <CardHeader>
              <CardIcon icon={faBook} />
              <CardTitle>The Offload Bible</CardTitle>
            </CardHeader>
            <CardDescription>
              Your complete guide to building and managing offshore teams. Includes role templates, training frameworks, and management best practices.
            </CardDescription>
            <PreviewLink>
              <span>Preview Sample</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </PreviewLink>
          </InfoCard>
        </Grid>
      </Container>
    </Section>
  );
} 