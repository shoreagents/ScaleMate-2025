import React from 'react';
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
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0F172A;
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
  font-size: 1.125rem;
  max-width: 32rem;
`;

const IconContainer = styled.div`
  width: 100%;
  background-color: rgba(244, 114, 182, 0.1);
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F472B6;
`;

const IconText = styled.p`
  color: #0F172A;
  font-weight: 600;
  font-size: 1.25rem;
`;

const DownloadButton = styled.button`
  width: 100%;
  background-color: #F472B6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #EC4899;
    transform: translateY(-1px);
  }
`;

const BuildAnotherButton = styled.button`
  width: 100%;
  background-color: white;
  color: #0F172A;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

export const CostSavingsDownloadModal = ({ isOpen, onClose }: CostSavingsDownloadModalProps) => {
  const handleDownload = async () => {
    try {
      // TODO: Implement actual download logic
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
        <Title>Your Report is Ready!</Title>
        
        <Description>
          Your detailed cost savings analysis report has been generated, including monthly comparisons and annual projections.
        </Description>

        <IconContainer>
          <IconWrapper>
            <DocumentIcon style={{ width: '2.5rem', height: '2.5rem' }} />
          </IconWrapper>
          <IconText>Cost Savings Report</IconText>
        </IconContainer>

        <DownloadButton onClick={handleDownload}>
          Download Report
        </DownloadButton>

        <BuildAnotherButton onClick={onClose}>
          Calculate Another Scenario
        </BuildAnotherButton>
      </Container>
    </Modal>
  );
}; 