import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft, faSlack, faShopify, faAmazon } from '@fortawesome/free-brands-svg-icons';

const Section = styled.section`
  padding: 5rem 0;
  background-color: white;
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
  margin-bottom: 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #F9FAFB;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  margin-right: 1rem;
`;

const ClientDetails = styled.div``;

const ClientName = styled.h4`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ClientRole = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

const TestimonialText = styled.p`
  color: rgba(15, 23, 42, 0.8);
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  opacity: 0.5;
`;

const LogoIcon = styled(FontAwesomeIcon)`
  font-size: 2.25rem;
`;

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <Title>What Our Clients Say</Title>
        <Grid>
          <Card>
            <ClientInfo>
              <Avatar 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                alt="Michael Roberts" 
              />
              <ClientDetails>
                <ClientName>Michael Roberts</ClientName>
                <ClientRole>CEO, TechFlow</ClientRole>
              </ClientDetails>
            </ClientInfo>
            <TestimonialText>
              "ScaleMate gave us the blueprint and confidence we needed to build our dream offshore team."
            </TestimonialText>
          </Card>
          <Card>
            <ClientInfo>
              <Avatar 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                alt="Sarah Chen" 
              />
              <ClientDetails>
                <ClientName>Sarah Chen</ClientName>
                <ClientRole>COO, GrowthMate</ClientRole>
              </ClientDetails>
            </ClientInfo>
            <TestimonialText>
              "We've cut costs by 70% while maintaining the same quality of work. The AI tools are game-changing."
            </TestimonialText>
          </Card>
          <Card>
            <ClientInfo>
              <Avatar 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                alt="David Thompson" 
              />
              <ClientDetails>
                <ClientName>David Thompson</ClientName>
                <ClientRole>Founder, DigitalPro</ClientRole>
              </ClientDetails>
            </ClientInfo>
            <TestimonialText>
              "The role templates and training flows helped us scale from 2 to 20 offshore staff in just 3 months."
            </TestimonialText>
          </Card>
        </Grid>
        <LogosContainer>
          <LogoIcon icon={faGoogle} />
          <LogoIcon icon={faMicrosoft} />
          <LogoIcon icon={faSlack} />
          <LogoIcon icon={faShopify} />
          <LogoIcon icon={faAmazon} />
        </LogosContainer>
      </Container>
    </Section>
  );
} 