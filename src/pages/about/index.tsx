import React from 'react';
import styled from 'styled-components';

const AboutPage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 48rem;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContent = styled.div`
  p {
    font-size: 1.125rem;
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ValueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function About() {
  return (
    <AboutPage>
      <Container>
        <Hero>
          <Title>About ScaleMate</Title>
          <Subtitle>
            We're revolutionizing how businesses build and manage offshore teams,
            making global talent acquisition seamless and efficient.
          </Subtitle>
        </Hero>

        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <SectionContent>
            <TextContent>
              <p>
                ScaleMate was born from a simple observation: businesses struggle to
                find and manage offshore talent effectively. Our founders, having
                experienced these challenges firsthand, set out to create a solution
                that would make offshore team building as simple as possible.
              </p>
              <p>
                Since our inception, we've helped hundreds of companies build
                successful offshore teams, saving them time and resources while
                maintaining quality and cultural alignment.
              </p>
            </TextContent>
            <ImageContainer>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Our team working together"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageContainer>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Our Team</SectionTitle>
          <TeamGrid>
            <TeamMember>
              <MemberImage>
                <img
                  src="https://images.unsplash.com/photo-1567218820-0a0e3f0a0a0a"
                  alt="John Doe"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </MemberImage>
              <MemberName>John Doe</MemberName>
              <MemberRole>CEO & Co-Founder</MemberRole>
            </TeamMember>
            <TeamMember>
              <MemberImage>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d62a656b8a"
                  alt="Jane Smith"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </MemberImage>
              <MemberName>Jane Smith</MemberName>
              <MemberRole>CTO & Co-Founder</MemberRole>
            </TeamMember>
            <TeamMember>
              <MemberImage>
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e24671852"
                  alt="Mike Johnson"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </MemberImage>
              <MemberName>Mike Johnson</MemberName>
              <MemberRole>Head of Operations</MemberRole>
            </TeamMember>
          </TeamGrid>
        </Section>

        <Section>
          <SectionTitle>Our Values</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueTitle>Excellence</ValueTitle>
              <ValueDescription>
                We strive for excellence in everything we do, from matching talent
                to supporting our clients throughout their journey.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Innovation</ValueTitle>
              <ValueDescription>
                We continuously innovate our processes and technology to provide
                the best possible experience for our clients and their teams.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Transparency</ValueTitle>
              <ValueDescription>
                We believe in open and honest communication, providing clear
                insights into our processes and pricing.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Partnership</ValueTitle>
              <ValueDescription>
                We view our relationship with clients as a partnership, working
                together to achieve their business goals.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </Section>
      </Container>
    </AboutPage>
  );
} 