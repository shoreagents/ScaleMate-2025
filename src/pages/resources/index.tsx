import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import ResourcesHeroSection from './components/HeroSection';
import ResourceContent from './components/ResourceContent';
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

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Resources | ScaleMate</title>
        <meta 
          name="description" 
          content="Access valuable resources and tools to help scale your business effectively with ScaleMate." 
        />
      </Head>
      <Main>
        <ResourcesHeroSection />
        <ResourceContent />
      </Main>
      <Footer />
    </>
  );
} 