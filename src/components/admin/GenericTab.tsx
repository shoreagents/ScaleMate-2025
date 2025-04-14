import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ComingSoon = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

interface GenericTabProps {
  title: string;
}

const GenericTab: React.FC<GenericTabProps> = ({ title }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <ComingSoon>Content coming soon...</ComingSoon>
    </Card>
  );
};

export default GenericTab; 