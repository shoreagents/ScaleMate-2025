import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDownloadModal } from '@/hooks/useDownloadModal';
import { supabase } from '@/lib/supabase';
import { CostSavingsAuthModal } from '@/components/cost-savings/CostSavingsAuthModal';
import { CostSavingsDownloadModal } from '@/components/cost-savings/CostSavingsDownloadModal';
import Link from 'next/link';

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CTAWrapper = styled.div`
  background-color: #3B82F6;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.button`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-width: 280px;

  @media (min-width: 768px) {
    width: 280px;
  }

  &:hover {
    background-color: #F9FAFB;
  }
`;

const SecondaryButton = styled.button`
  background-color: #EC297B;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-width: 280px;

  @media (min-width: 768px) {
    width: 280px;
  }

  &:hover {
    background-color: #D91A6B;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  width: 95%;
  max-width: 1200px;
  margin: 2rem;
  height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;

  &:hover {
    color: #1F2937;
  }
`;

const CalendlyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default function CTA() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen: isDownloadModalOpen, openModal, closeModal } = useDownloadModal();

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  };

  const handleBookStrategyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      openModal(() => setIsLoginModalOpen(false));
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoginModalOpen(false);
    openModal(() => setIsLoginModalOpen(false));
  };

  return (
      <Section>
        <Container>
          <CTAWrapper>
            <Title>Ready to Start Saving?</Title>
            <Description>
              Download your savings report or schedule a call to discuss your needs
            </Description>
            <ButtonGroup>
            <PrimaryButton onClick={handleDownloadClick}>
                Download Report
                <FontAwesomeIcon icon={faDownload} style={{ marginLeft: '0.5rem' }} />
              </PrimaryButton>
            <SecondaryButton onClick={handleBookStrategyClick}>
                Book Strategy Call
                <FontAwesomeIcon icon={faPhone} style={{ marginLeft: '0.5rem' }} />
              </SecondaryButton>
            </ButtonGroup>
          </CTAWrapper>
        </Container>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
            <CalendlyContainer>
              <iframe
                src="https://calendly.com/shoreagents-discovery-sessions-with-mark-nobleza/45min"
                title="Book a Strategy Call"
                style={{ width: '100%', height: '100%' }}
              />
            </CalendlyContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      <CostSavingsAuthModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <CostSavingsDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={closeModal}
      />
    </Section>
  );
} 