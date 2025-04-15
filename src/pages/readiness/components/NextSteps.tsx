import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faTools, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Content = styled.div`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

interface IconContainerProps {
  color: string;
}

const IconContainer = styled.div<IconContainerProps>`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.color}10;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  .icon {
    font-size: 1.25rem;
    color: ${props => props.color};
  }
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

interface ActionLinkProps {
  color: string;
  hoverColor: string;
}

const ActionLink = styled.span<ActionLinkProps>`
  color: ${props => props.color};
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.hoverColor};
  }
`;

export default function NextSteps() {
  return (
    <Section id="next-steps">
      <Container>
        <Content>
          <Title>Recommended Next Steps</Title>
          <Grid>
            <Card>
              <IconContainer color="#3B82F6">
                <FontAwesomeIcon icon={faPuzzlePiece} className="icon" />
              </IconContainer>
              <CardTitle>Try Role Builder</CardTitle>
              <CardDescription>Create detailed role templates for your offshore team.</CardDescription>
              <ActionLink color="#3B82F6" hoverColor="#2563EB">
                Start Building →
              </ActionLink>
            </Card>

            <Card>
              <IconContainer color="#84CC16">
                <FontAwesomeIcon icon={faTools} className="icon" />
              </IconContainer>
              <CardTitle>Tool Stack</CardTitle>
              <CardDescription>Explore recommended tools for remote team management.</CardDescription>
              <ActionLink color="#84CC16" hoverColor="#65A30D">
                View Tools →
              </ActionLink>
            </Card>

            <Card>
              <IconContainer color="#EC297B">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
              </IconContainer>
              <CardTitle>Free Course</CardTitle>
              <CardDescription>Learn the basics of managing offshore teams effectively.</CardDescription>
              <ActionLink color="#EC297B" hoverColor="#BE185D">
                Start Learning →
              </ActionLink>
            </Card>
          </Grid>
        </Content>
      </Container>
    </Section>
  );
} 