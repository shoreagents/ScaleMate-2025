import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  flex: 1;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex: 2;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0;
  flex: 1;
  justify-content: flex-end;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
`;

const LoginButton = styled(AuthButton)`
  color: #000000;
  border: none;
  padding: 0.5rem 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SignupButton = styled(AuthButton)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 10px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>ScaleMate</Logo>
      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </NavLinks>
      <AuthButtons>
        <LoginButton href="/login">Login</LoginButton>
        <SignupButton href="/signup">Sign Up</SignupButton>
      </AuthButtons>
    </HeaderContainer>
  );
};

export default Header; 