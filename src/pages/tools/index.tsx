import React from 'react';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import ToolGrid from './components/ToolGrid';
import FinalCTA from './components/FinalCTA';
import Footer from '../../components/layout/Footer';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function ToolsPage() {
  return (
    <PageContainer>
      <HeroSection />
      <FilterSection />
      <ToolGrid />
      <FinalCTA />
      <Footer />
    </PageContainer>
  );
} 