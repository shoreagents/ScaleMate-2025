import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import HeroSection from './components/HeroSection';
import Calculator from './components/Calculator';
import CTA from './components/CTA';
import Footer from '../../components/layout/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function CostSavingsPage() {
  return (
    <>
      <Head>
        <title>Cost Savings Calculator | ScaleMate</title>
        <meta name="description" content="Calculate your potential cost savings with ScaleMate's AI-powered solutions." />
      </Head>
      <Container>
        <HeroSection />
        <Calculator />
        <CTA />
        <Footer />
      </Container>
    </>
  );
} 