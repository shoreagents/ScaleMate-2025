import React from 'react';
import Head from 'next/head';
import HeroSection from './components/HeroSection';
import QuoteCalculator from './components/QuoteCalculator';

export default function Home() {
  return (
    <>
      <Head>
        <title>ScaleMate - Scale Your Team Without The Burnout</title>
        <meta name="description" content="Leverage offshore talent and AI tools to grow your business smarter. Trusted by 500+ companies across USA, Australia, and New Zealand." />
      </Head>

      <HeroSection />
      <QuoteCalculator />
    </>
  );
} 