import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 50;
  border-bottom: 1px solid #E5E7EB;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.span`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3B82F6;
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LoginButton = styled(Link)`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: #3B82F6;
  }
`;

const SignUpButton = styled.span`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo href="/">ScaleMate</Logo>
          <Nav>
            <NavItem>Solutions</NavItem>
            <NavItem>Tools</NavItem>
            <NavItem>Pricing</NavItem>
            <NavItem>Resources</NavItem>
          </Nav>
          <AuthSection>
            <LoginButton href="/login">Login</LoginButton>
            <SignUpButton>Sign Up Free</SignUpButton>
          </AuthSection>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default Header; 