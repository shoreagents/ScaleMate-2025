import React from 'react';
import Head from 'next/head';
import HeroSection from './home/components/HeroSection';
import QuoteCalculator from './home/components/QuoteCalculator';
import HowItWorks from './home/components/HowItWorks';
import ToolHighlights from './home/components/ToolHighlights';
import LatestInsights from './home/components/LatestInsights';
import Testimonials from './home/components/Testimonials';
import FinalCTA from './home/components/FinalCTA';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>ScaleMate - Scale Your Team Without The Burnout</title>
        <meta name="description" content="Leverage offshore talent and AI tools to grow your business smarter. Trusted by 500+ companies across USA, Australia, and New Zealand." />
      </Head>

      <HeroSection />
      <QuoteCalculator />
      <HowItWorks />
      <ToolHighlights />
      <LatestInsights />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
} 