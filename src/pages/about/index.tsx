import React from 'react';
import Head from 'next/head';
import HeroSection from './components/HeroSection';
import Mission from './components/Mission';
import Story from './components/Story';
import Values from './components/Values';
import Founder from './components/Founder';
import Footer from '../../components/layout/Footer';
import styled from 'styled-components';

const Main = styled.main`
  background-color: #fff;
`;

const AboutSection = styled.div`
  padding: 4rem 0;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #1E293B;
  max-width: 48rem;
  margin: 0 auto 4rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #0F172A;
`;

const SectionContent = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContent = styled.div`
  p {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #1E293B;
    margin-bottom: 1rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #0F172A;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: #1E293B;
  margin-bottom: 0.5rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ValueCard = styled.div`
  background-color: #F8FAFC;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #0F172A;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: #1E293B;
`;

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | ScaleMate</title>
        <meta 
          name="description" 
          content="Learn about ScaleMate's mission to empower businesses with scaling superpowers through AI-driven tools and offshore team management." 
        />
      </Head>
      <Main>
        <HeroSection />
        <Mission />
        <Story />
        <Values />
        <Founder />
        <Footer />
      </Main>
    </>
  );
} 