import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 5rem 0;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #E5E7EB;
`;

const CardImage = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Category = styled.span`
  color: #3B82F6;
  font-size: 0.875rem;
  font-weight: 600;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.5rem 0 0.75rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const ReadMore = styled.span`
  display: inline-block;
  margin-top: 1rem;
  color: #3B82F6;
  font-weight: 600;
  cursor: pointer;
`;

export default function LatestInsights() {
  return (
    <Section id="content">
      <Container>
        <Title>Latest Insights</Title>
        <Grid>
          <Card>
            <CardImage 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c27651f163-956b6c23d213f4235432.png" 
              alt="modern office with people working on computers, business setting" 
            />
            <CardContent>
              <Category>SCALING STRATEGIES</Category>
              <CardTitle>5 Ways AI is Revolutionizing Offshore Teams</CardTitle>
              <CardDescription>
                Learn how artificial intelligence is transforming remote team management...
              </CardDescription>
              <ReadMore>Read More →</ReadMore>
            </CardContent>
          </Card>
          <Card>
            <CardImage 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a9dd1cc957-fa5a9744c8e7b551d839.png" 
              alt="people in meeting discussing business strategy, professional setting" 
            />
            <CardContent>
              <Category>CASE STUDY</Category>
              <CardTitle>How TechCo Saved $1.2M with Offshore Teams</CardTitle>
              <CardDescription>
                Discover how a tech startup scaled their operations while cutting costs...
              </CardDescription>
              <ReadMore>Read More →</ReadMore>
            </CardContent>
          </Card>
          <Card>
            <CardImage 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f5fd7cc724-9cef4ab9b001d10f2ac9.png" 
              alt="remote team collaboration, virtual meeting with diverse team members" 
            />
            <CardContent>
              <Category>GUIDE</Category>
              <CardTitle>The Ultimate Offshore Team Playbook</CardTitle>
              <CardDescription>
                Step-by-step guide to building and managing successful offshore teams...
              </CardDescription>
              <ReadMore>Read More →</ReadMore>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
} 