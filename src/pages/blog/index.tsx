import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const BlogPage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 32rem;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 64rem;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogCard = styled(Link)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
`;

const BlogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BlogDate = styled.span``;

const BlogAuthor = styled.span``;

const BlogCategory = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'How to Build an Effective Offshore Team',
    excerpt: 'Learn the key strategies and best practices for building and managing a successful offshore development team.',
    date: 'April 15, 2024',
    author: 'John Smith',
    category: 'Team Building',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
  },
  {
    id: 2,
    title: 'The Future of Remote Work in 2024',
    excerpt: 'Explore the latest trends and predictions for remote work and how they impact offshore staffing.',
    date: 'April 10, 2024',
    author: 'Sarah Johnson',
    category: 'Remote Work',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72'
  },
  {
    id: 3,
    title: 'Cost Optimization Strategies for Startups',
    excerpt: 'Discover how startups can leverage offshore talent to optimize costs while maintaining quality.',
    date: 'April 5, 2024',
    author: 'Michael Chen',
    category: 'Startups',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    id: 4,
    title: 'Cultural Integration in Global Teams',
    excerpt: 'Tips and strategies for fostering cultural understanding and collaboration in distributed teams.',
    date: 'March 28, 2024',
    author: 'Emily Rodriguez',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
  },
  {
    id: 5,
    title: 'AI Tools for Remote Team Management',
    excerpt: 'How artificial intelligence is transforming the way we manage and collaborate with remote teams.',
    date: 'March 20, 2024',
    author: 'David Kim',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    id: 6,
    title: 'Scaling Your Business with Offshore Talent',
    excerpt: 'A comprehensive guide to scaling your business operations using offshore resources effectively.',
    date: 'March 15, 2024',
    author: 'Lisa Wong',
    category: 'Business Growth',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095'
  }
];

export default function Blog() {
  return (
    <BlogPage>
      <Container>
        <Content>
          <Title>Our Blog</Title>
          <Description>
            Insights, tips, and best practices for building and managing successful offshore teams.
          </Description>
        </Content>

        <BlogGrid>
          {blogPosts.map((post) => (
            <BlogCard key={post.id} href={`/blog/${post.id}`}>
              <BlogImage style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <BlogContent>
                <BlogCategory>{post.category}</BlogCategory>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogAuthor>by {post.author}</BlogAuthor>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </BlogPage>
  );
} 