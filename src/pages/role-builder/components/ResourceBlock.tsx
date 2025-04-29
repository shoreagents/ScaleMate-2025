import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboardList, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Section = styled.section`
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const InnerContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.color};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
  font-size: 1.25rem;
  color: ${props => props.color};
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #0F172A;
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
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

export default function ResourceBlock() {
  return (
    <Section id="template-resources">
      <Container>
        <InnerContainer>
          <Grid>
            <Card>
              <IconWrapper color="rgba(236, 41, 123, 0.1)">
                <Icon icon={faBook} color="#EC297B" />
              </IconWrapper>
              <Title>Offload Bible</Title>
              <Description>
                Complete guide to delegating and managing offshore teams effectively.
              </Description>
              <ResourceLink href="#">
                Download Free Guide
                <ArrowIcon icon={faArrowRight} />
              </ResourceLink>
            </Card>

            <Card>
              <IconWrapper color="rgba(99, 102, 241, 0.1)">
                <Icon icon={faClipboardList} color="#6366F1" />
              </IconWrapper>
              <Title>Sample Role Templates</Title>
              <Description>
                Browse our library of pre-built role descriptions and KPIs.
              </Description>
              <ResourceLink href="#">
                View Templates
                <ArrowIcon icon={faArrowRight} />
              </ResourceLink>
            </Card>
          </Grid>
        </InnerContainer>
      </Container>
    </Section>
  );
} 