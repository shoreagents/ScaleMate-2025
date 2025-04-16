import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faHeart, faBrain } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0F172A;
  text-align: center;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #F9FAFB;
  padding: 1.5rem;
  border-radius: 0.75rem;
`;

const IconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    color: #3B82F6;
    font-size: 1.25rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #1E293B;
`;

const values = [
  {
    id: 'value-1',
    icon: faBolt,
    title: "Empowering",
    description: "We give businesses the tools and confidence to scale beyond boundaries."
  },
  {
    id: 'value-2',
    icon: faHeart,
    title: "Friendly",
    description: "We make complex processes simple and enjoyable."
  },
  {
    id: 'value-3',
    icon: faBrain,
    title: "Intelligent",
    description: "We leverage AI and data to make smart scaling decisions."
  }
];

export default function Values() {
  return (
    <Section id="values">
      <Container>
        <Title>Our Values</Title>
        <Grid>
          {values.map(value => (
            <Card key={value.id} id={value.id}>
              <IconContainer>
                <FontAwesomeIcon icon={value.icon} />
              </IconContainer>
              <CardTitle>{value.title}</CardTitle>
              <CardDescription>{value.description}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
} 