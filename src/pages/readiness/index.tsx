import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../../components/layout/Footer';
import ReadinessHeroSection from './components/HeroSection';
import QuizInterface from './components/QuizInterface';
import NextSteps from './components/NextSteps';

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export default function ReadinessPage() {
  return (
    <>
      <Head>
        <title>Readiness Quiz - ScaleMate</title>
        <meta name="description" content="Take our readiness quiz to assess your company's preparedness for offshore team expansion." />
      </Head>

      <ReadinessHeroSection />

      <Container>
        {/* Readiness quiz content will go here */}
      </Container>
      <NextSteps />
      <Footer />
    </>
  );
} 