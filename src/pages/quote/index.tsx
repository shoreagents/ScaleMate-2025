import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import QuoteHeroSection from './components/HeroSection';
import FormSection from './components/FormSection';
import SecondaryContent from './components/SecondaryContent';
import Footer from '../../components/layout/Footer';

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export default function QuotePage() {
  return (
    <>
      <Head>
        <title>Get a Quote - ScaleMate</title>
        <meta name="description" content="Get a customized quote for your offshore team needs with ScaleMate." />
      </Head>

      <QuoteHeroSection />
      <FormSection />
      <SecondaryContent />
      <Footer />
    </>
  );
} 