import React from 'react';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import { CourseGrid } from './components/CourseGrid';
import Leaderboard from './components/Leaderboard';
import { FinalCTA } from './components/FinalCTA';
import Footer from '../../components/layout/Footer';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function CoursesPage() {
  return (
    <PageContainer>
      <HeroSection />
      <FilterSection />
      <CourseGrid />
      <Leaderboard />
      <FinalCTA />
      <Footer />
    </PageContainer>
  );
} 