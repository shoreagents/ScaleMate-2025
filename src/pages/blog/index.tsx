import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import BlogHeroSection from './components/HeroSection';
import SearchFilter from './components/SearchFilter';
import FeaturedPost from './components/FeaturedPost';
import RecentPosts from './components/RecentPosts';
import FinalCTA from './components/FinalCTA';
import Footer from '../../components/layout/Footer';

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Main = styled.main`
  min-height: 100vh;
`;

const ContentSection = styled.section`
  padding: 4rem 0;
`;

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | ScaleMate</title>
        <meta 
          name="description" 
          content="Insights, tips, and strategies for scaling your business with offshore teams and AI." 
        />
      </Head>
      <Main>
        <BlogHeroSection />
        <ContentSection>
          <Container>
            <SearchFilter />
            <FeaturedPost />
            <RecentPosts />
          </Container>
        </ContentSection>
        <FinalCTA />
      </Main>
      <Footer />
    </>
  );
} 