import React, { useState } from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { FiMenu, FiX, FiHome, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { FaHome, FaBell, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

const Sidebar = styled.aside<{ $isMobileMenuOpen: boolean }>`
  width: 16rem;
  background-color: white;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  height: 100vh;
  z-index: 20;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: ${props => props.$isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 100%;
    max-width: 300px;
    height: 100%;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  height: 3.5rem;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;

  &:hover {
    background-color: #F3F4F6;
  }

  @media (max-width: 768px) {
    display: flex;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: ${props => props.$active ? '#3B82F6' : 'rgba(15, 23, 42, 0.7)'};
  background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.1)' : '#F9FAFB'};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0;
  }
`;

const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

const NavText = styled.span`
  font-size: 0.875rem;
`;

const UnlockedBadge = styled.span`
  margin-left: 0.25rem;
  font-size: 0.75rem;
  color: #84CC16;
`;

const MobileMenuButton = styled.button<{ $isMobileMenuOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 31;
  background-color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: ${props => props.$isMobileMenuOpen ? 0 : 1};
  visibility: ${props => props.$isMobileMenuOpen ? 'hidden' : 'visible'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileOverlay = styled.div<{ $isMobileMenuOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
  opacity: ${props => props.$isMobileMenuOpen ? 1 : 0};
  visibility: ${props => props.$isMobileMenuOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavSection = styled.div`
  display: none;
  padding: 1rem;
  border-top: 1px solid #E5E7EB;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled(NavLink)`
  color: #EF4444;
  margin-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  padding-top: 1rem;

  &:hover {
    background-color: #FEE2E2;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding-top: 0.75rem;
  }
`;

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isUnlocked?: boolean;
}

interface DashboardSidebarProps {
  logoText: string;
  navItems: NavItem[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  logoText,
  navItems,
  activeTab,
  onTabClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (tabId: string) => {
    onTabClick(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <MobileMenuButton onClick={handleMobileMenuToggle} $isMobileMenuOpen={isMobileMenuOpen}>
        <FiMenu size={20} />
      </MobileMenuButton>
      <MobileOverlay 
        $isMobileMenuOpen={isMobileMenuOpen} 
        onClick={handleClose}
      />
      <Sidebar $isMobileMenuOpen={isMobileMenuOpen}>
        <SidebarContent>
          <LogoContainer>
            <LogoText>{logoText}</LogoText>
            <CloseButton onClick={handleClose}>
              <FiX size={20} />
            </CloseButton>
          </LogoContainer>
          <Nav>
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                $active={activeTab === item.id}
                onClick={() => handleNavClick(item.id)}
              >
                <NavIcon>{item.icon}</NavIcon>
                <NavText>
                  {item.label}
                  {item.isUnlocked && <UnlockedBadge>Unlocked</UnlockedBadge>}
                </NavText>
              </NavLink>
            ))}
          </Nav>
          <MobileNavSection>
            {/* Removed mobile navigation items */}
          </MobileNavSection>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar; 