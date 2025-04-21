import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

interface NoNavbarLayoutProps {
  children: React.ReactNode;
}

const NoNavbarLayout: React.FC<NoNavbarLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default NoNavbarLayout; 