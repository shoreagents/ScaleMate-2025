import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;

  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 500px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  flex: 1;

  @media (min-width: 768px) {
    width: 50%;
    height: 500px;
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Badge = styled.span`
  color: #00E915;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #1E293B;
  margin-bottom: 1.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AuthorImage = styled(Image)`
  border-radius: 9999px;
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.p`
  font-weight: 500;
  color: #0F172A;
`;

const PostMeta = styled.p`
  font-size: 0.875rem;
  color: #1E293B;
`;

const ReadMoreLink = styled(Link)`
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

export default function FeaturedPost() {
  return (
    <Section id="featured-post">
      <Container>
        <Card>
          <CardContent>
            <ImageWrapper>
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6989de4866-e6e582bf1cc61928401b.png"
                alt="modern office workspace with people working on computers, professional business environment"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </ImageWrapper>
            <ContentWrapper>
              <Badge>Featured Article</Badge>
              <Title>How AI is Revolutionizing Offshore Team Management</Title>
              <Description>
                Discover how modern businesses are leveraging artificial intelligence to streamline their offshore operations and boost productivity...
              </Description>
              <AuthorInfo>
                <AuthorImage
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  alt="Author"
                  width={40}
                  height={40}
                />
                <AuthorDetails>
                  <AuthorName>Sarah Johnson</AuthorName>
                  <PostMeta>Feb 15, 2025 • 8 min read</PostMeta>
                </AuthorDetails>
              </AuthorInfo>
              <ReadMoreLink href="#">
                Read Article
                <ArrowIcon icon={faArrowRight} />
              </ReadMoreLink>
            </ContentWrapper>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}