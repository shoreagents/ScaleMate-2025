import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  padding: 4rem 0;
  background: white;
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

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #0F172A;
`;

const PreviewCard = styled.div<{ isVisible: boolean }>`
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1px solid #E5E7EB;
  opacity: 0;
  animation: ${slideUp} 0.6s ease-out forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RightColumn = styled.div`
  @media (min-width: 768px) {
    border-left: 1px solid #E5E7EB;
    padding-left: 2rem;
  }
`;

const RoleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const Section2 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #0F172A;
`;

const List = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  color: rgba(15, 23, 42, 0.7);
  & > li {
    margin-bottom: 0.25rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const Cost = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #EC297B;
`;

const ExperienceLevel = styled.div`
  color: rgba(15, 23, 42, 0.7);
`;

const Button = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

export default function PreviewBlueprint() {
  const [isVisible, setIsVisible] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (previewRef.current) {
      observer.observe(previewRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExportPDF = () => {
    // Implementation of handleExportPDF function
  };

  return (
    <Section id="preview-output">
      <Container>
        <InnerContainer>
          <Title>Preview Generated Role Blueprint</Title>
          <PreviewCard ref={previewRef} isVisible={isVisible}>
            <Grid>
              <div>
                <RoleTitle>Digital Marketing Specialist</RoleTitle>
                <Section2>
                  <SectionTitle>Key Responsibilities</SectionTitle>
                  <List>
                    <li>Social media management</li>
                    <li>Content creation and scheduling</li>
                    <li>Analytics reporting</li>
                    <li>Email marketing campaigns</li>
                  </List>
                </Section2>
                <Section2>
                  <SectionTitle>Required Tools</SectionTitle>
                  <TagContainer>
                    <Tag>Hootsuite</Tag>
                    <Tag>Canva</Tag>
                    <Tag>Google Analytics</Tag>
                  </TagContainer>
                </Section2>
              </div>
              <RightColumn>
                <Section2>
                  <SectionTitle>Monthly Cost Estimate</SectionTitle>
                  <Cost>$1,200</Cost>
                </Section2>
                <Section2>
                  <SectionTitle>Experience Level</SectionTitle>
                  <ExperienceLevel>3-5 years</ExperienceLevel>
                </Section2>
                <Button
                  onClick={handleExportPDF}
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                    border: 'none',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#2563EB')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#3B82F6')}
                >
                  Export as PDF
                  <FontAwesomeIcon icon={faFilePdf} />
                </Button>
              </RightColumn>
            </Grid>
          </PreviewCard>
        </InnerContainer>
      </Container>
    </Section>
  );
} 