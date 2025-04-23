import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

const Sidebar = styled.aside`
  width: 16rem;
  background-color: white;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  height: 100vh;
  z-index: 20;
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  height: 3.5rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

  &:hover {
    background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.1)' : '#F9FAFB'};
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
  return (
    <Sidebar>
      <SidebarContent>
        <LogoContainer>
          <LogoText>{logoText}</LogoText>
        </LogoContainer>
        <Nav>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              $active={activeTab === item.id}
              onClick={() => onTabClick(item.id)}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavText>{item.label}</NavText>
              {item.isUnlocked && <UnlockedBadge>Unlocked</UnlockedBadge>}
            </NavLink>
          ))}
        </Nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar; 