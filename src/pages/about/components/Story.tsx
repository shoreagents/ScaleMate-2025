import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRocket, faFlag } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
  background-color: #F9FAFB;
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

const TimelineGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconCircle = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #3B82F6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const TimelineLine = styled.div`
  width: 0.125rem;
  height: 100%;
  background-color: #E5E7EB;
`;

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: #1E293B;
`;

const timelineItems = [
  {
    id: 1,
    icon: faStar,
    title: "It Started With a Challenge",
    description: "In 2023, our founders experienced firsthand the complexities of scaling teams globally. The process was fragmented, time-consuming, and often overwhelming."
  },
  {
    id: 2,
    icon: faRocket,
    title: "We Grew Because of You",
    description: "Businesses needed more than just hiring solutions – they needed a complete system for scaling operations efficiently with both human talent and AI tools."
  },
  {
    id: 3,
    icon: faFlag,
    title: "Today, ScaleMate Helps Thousands",
    description: "We've built the ultimate scaling platform that combines offshore talent, AI tools, and proven systems to help businesses grow confidently."
  }
];

export default function Story() {
  return (
    <Section id="story-timeline">
      <Container>
        <Content>
          <TimelineGrid>
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.id} id={`timeline-${item.id}`}>
                <IconColumn>
                  <IconCircle>
                    <FontAwesomeIcon icon={item.icon} />
                  </IconCircle>
                  {index !== timelineItems.length - 1 && <TimelineLine />}
                </IconColumn>
                <Card>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </Card>
              </TimelineItem>
            ))}
          </TimelineGrid>
        </Content>
      </Container>
    </Section>
  );
} 