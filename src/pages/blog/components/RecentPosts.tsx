import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Section = styled.section`
  padding: 3rem 0;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.article`
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #F0FDF4;
  color: #00E915;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: #1E293B;
  margin-bottom: 1.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const posts = [
  {
    id: 1,
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6989de4866-e6e582bf1cc61928401b.png',
    category: 'Scaling',
    title: '5 Key Metrics for Measuring Offshore Team Success',
    description: 'Learn how to effectively track and measure the performance of your offshore team with these essential metrics.',
    author: {
      name: 'Michael Chen',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      date: 'Feb 10, 2025',
      readTime: '6 min read'
    }
  },
  {
    id: 2,
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6989de4866-e6e582bf1cc61928401b.png',
    category: 'AI Tools',
    title: 'Top AI Tools for Remote Team Management',
    description: 'Discover the best AI-powered tools that can help you manage your remote team more effectively.',
    author: {
      name: 'Emily Rodriguez',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      date: 'Feb 8, 2025',
      readTime: '5 min read'
    }
  },
  {
    id: 3,
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6989de4866-e6e582bf1cc61928401b.png',
    category: 'Operations',
    title: 'Streamlining Communication Across Time Zones',
    description: 'Practical tips for maintaining effective communication with teams spread across different time zones.',
    author: {
      name: 'David Kim',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      date: 'Feb 5, 2025',
      readTime: '7 min read'
    }
  }
];

export default function RecentPosts() {
  return (
    <Section>
      <Title>Recent Articles</Title>
      <Grid>
        {posts.map((post) => (
          <Card key={post.id}>
            <ImageWrapper>
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
            <Content>
              <Category>{post.category}</Category>
              <CardTitle>{post.title}</CardTitle>
              <Description>{post.description}</Description>
              <AuthorInfo>
                <AuthorImage
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />
                <AuthorDetails>
                  <AuthorName>{post.author.name}</AuthorName>
                  <PostMeta>{post.author.date} • {post.author.readTime}</PostMeta>
                </AuthorDetails>
              </AuthorInfo>
              <ReadMoreLink href="/blog/inner-blog">
                Read Article
                <ArrowIcon icon={faArrowRight} />
              </ReadMoreLink>
            </Content>
          </Card>
        ))}
      </Grid>
    </Section>
  );
} 