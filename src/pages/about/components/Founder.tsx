import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Section = styled.section`
  padding: 4rem 0;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
  border-radius: 9999px;
  overflow: hidden;
`;

const Details = styled.div``;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

const Role = styled.p`
  color: #1E293B;
`;

const Quote = styled.blockquote`
  font-size: 1.125rem;
  color: #1E293B;
  font-style: italic;
`;

export default function Founder() {
  return (
    <Section id="founder-message">
      <Container>
        <Card>
          <ProfileContainer>
            <ImageWrapper>
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="Founder"
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
            <Details>
              <Name>Mark Thompson</Name>
              <Role>Founder & CEO</Role>
            </Details>
          </ProfileContainer>
          <Quote>
            "We're building ScaleMate to be more than just a platform – it's a partnership in your growth journey. Every feature we create is designed to make scaling your business more accessible and achievable."
          </Quote>
        </Card>
      </Container>
    </Section>
  );
} 