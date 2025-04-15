import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import RoleBuilderHeroSection from './components/HeroSection';
import StepsBlock from './components/StepsBlock';
import PreviewBlueprint from './components/PreviewBlueprint';
import ResourceBlock from './components/ResourceBlock';
import FinalCTA from './components/FinalCTA';
import Footer from '@/components/layout/Footer';

const Container = styled.div`
  min-height: 100vh;
  background-color: #F9FAFB;
  display: flex;
  flex-direction: column;
`;

export default function RoleBuilderPage() {
  return (
    <>
      <Head>
        <title>Role Builder | ScaleMate - Build Your Offshore Team</title>
        <meta 
          name="description" 
          content="Create custom roles for your offshore team with our AI-powered Role Builder. Define responsibilities, skills, and requirements tailored to your business needs."
        />
      </Head>

      <Container>
        <RoleBuilderHeroSection />
        <StepsBlock />
        <PreviewBlueprint />
        <ResourceBlock />
        <FinalCTA />
        <Footer />
      </Container>
    </>
  );
} 