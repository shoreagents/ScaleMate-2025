import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import HeroSection from './components/HeroSection';
import MainContent from './components/MainContent';
import FinalCTA from './components/FinalCTA';
import Footer from '../../components/layout/Footer';

const Main = styled.main`
  background-color: #fff;
`;

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | ScaleMate</title>
        <meta 
          name="description" 
          content="Get in touch with ScaleMate. We're here to help you scale your business with AI-driven tools and offshore team management." 
        />
      </Head>
      <Main>
        <HeroSection />
        <MainContent />
        <FinalCTA />
        <Footer />
      </Main>
    </>
  );
} 