import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
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
    </HeaderContainer>
  );
};

export default Header; 