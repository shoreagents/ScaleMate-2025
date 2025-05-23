import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteDownloadModal = ({ isOpen, onClose }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/api/blueprints/download');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'job-blueprint.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Error downloading blueprint:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Your Blueprint is Ready!</Title>
        
        <Description>
          Get your complete job blueprint PDF with salary benchmarks, tools, KPIs, and more.
        </Description>

        <IconContainer>
          <IconWrapper>
            <DocumentIcon style={{ width: '2.5rem', height: '2.5rem' }} />
          </IconWrapper>
          <IconText>Complete Job Blueprint</IconText>
        </IconContainer>

        <ButtonContainer>
          <DownloadButton onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? 'Downloading...' : 'Download Blueprint'}
          </DownloadButton>
        </ButtonContainer>

        <ExploreContainer>
          <ExploreText>Want to have another quotation?</ExploreText>
          <ExploreLink href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            Yes, please!
          </ExploreLink>
        </ExploreContainer>
      </Container>
    </Modal>
  );
};

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

const IconContainer = styled.div`
  width: 100%;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;

  @media (min-width: 640px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
  }
`;

const IconText = styled.p`
  color: #64748B;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.25rem;

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

const DownloadButton = styled.button`
  width: 100%;
  background: #3B82F6;
  color: white;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563EB;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`;

const ExploreContainer = styled.div`
  margin-top: 0rem;
`;

const ExploreText = styled.span`
  color: #6B7280;
  font-size: 0.875rem;
  margin-right: 0.25rem;
`;

const ExploreLink = styled.a`
  color: #3B82F6;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #2563EB;
  }
`; 