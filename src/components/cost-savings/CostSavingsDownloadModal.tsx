import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface CostSavingsDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;

  @media (max-width: 640px) {
    padding: 0.75rem;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0rem;
  color: rgb(31, 41, 55);
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 3rem;
  max-width: 32rem;
  font-size: 0.875rem;
`;

const DownloadContainer = styled.div`
  width: 100%;
  background-color: #F1F5F9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const DownloadIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  color: #64748B;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`;

const DownloadText = styled.p`
  color: #64748B;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ExploreText = styled.span`
  color: #6B7280;
  font-size: 0.875rem;
  margin-right: 0.25rem;
`;

const ExploreContainer = styled.div`
  margin-top: 0rem;
`;

const ExploreLink = styled.a`
  color: #F472B6;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #EC4899;
  }
`;

export const CostSavingsDownloadModal = ({ isOpen, onClose }: CostSavingsDownloadModalProps) => {
  useEffect(() => {
    if (isOpen) {
      handleDownload();
    }
  }, [isOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/cost-savings/download');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cost-savings-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Thanks! Your Report is on its way.</Title>
        
        <Description>
          Your detailed cost savings analysis report is now downloading. It includes monthly comparisons, annual projections, and ROI calculations.
        </Description>

        <DownloadContainer>
          <DownloadIcon>
            <DocumentIcon />
          </DownloadIcon>
          <DownloadText>Cost Savings Report Download in Progress</DownloadText>
        </DownloadContainer>

        <ExploreContainer>
          <ExploreText>Want to calculate another scenario?</ExploreText>
          <ExploreLink href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            Yes, please!
          </ExploreLink>
        </ExploreContainer>
      </Container>
    </Modal>
  );
}; 