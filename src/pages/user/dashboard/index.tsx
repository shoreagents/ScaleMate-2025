import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserHeader from '@/components/user/UserHeader';
import { FiHome, FiUser, FiDollarSign, FiBarChart2, FiBookmark, FiBook, FiTool, FiAward, FiSettings } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: white;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  
  img {
    height: 32px;
    width: auto;
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: 1rem;

  &:not(:first-child) {
    border-top: 1px solid #E5E7EB;
    padding-top: 1rem;
  }
`;

const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: ${props => props.$active ? '#111827' : '#6B7280'};
  text-decoration: none;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  background-color: ${props => props.$active ? '#F3F4F6' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #F3F4F6;
    color: #111827;
  }

  svg {
    margin-right: 0.75rem;
  }
`;

const Content = styled.main`
  margin-left: 250px;
  padding-top: 4rem;
  width: calc(100% - 250px);
  min-height: 100vh;
`;

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <div>Dashboard Content</div>;
      case 'role-builder':
        return <div>Role Builder Content</div>;
      case 'quote-calculator':
        return <div>Quote Calculator Content</div>;
      case 'team-savings':
        return <div>Team Savings Content</div>;
      case 'readiness-score':
        return <div>Readiness Score Content</div>;
      case 'saved-blueprints':
        return <div>Saved Blueprints Content</div>;
      case 'saved-quotes':
        return <div>Saved Quotes Content</div>;
      case 'resource-library':
        return <div>Resource Library Content</div>;
      case 'course-dashboard':
        return <div>Course Dashboard Content</div>;
      case 'ai-tool-library':
        return <div>AI Tool Library Content</div>;
      case 'saved-tool-stack':
        return <div>Saved Tool Stack Content</div>;
      case 'gamified-tracker':
        return <div>Gamified Tracker Content</div>;
      case 'account-settings':
        return <div>Account Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <Container>
      <Sidebar>
        <Logo>
          <img src="/logo.svg" alt="ScaleMate" />
        </Logo>
        <Nav>
          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('dashboard')} $active={activeSection === 'dashboard'}>
              <FiHome size={20} />
              Dashboard
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('role-builder')} $active={activeSection === 'role-builder'}>
              <FiUser size={20} />
              Role Builder
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('quote-calculator')} $active={activeSection === 'quote-calculator'}>
              <FiDollarSign size={20} />
              Quote Calculator
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('team-savings')} $active={activeSection === 'team-savings'}>
              <FiBarChart2 size={20} />
              Team Savings
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('readiness-score')} $active={activeSection === 'readiness-score'}>
              <FiBarChart2 size={20} />
              Readiness Score
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('saved-blueprints')} $active={activeSection === 'saved-blueprints'}>
              <FiBookmark size={20} />
              Saved Blueprints
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('saved-quotes')} $active={activeSection === 'saved-quotes'}>
              <FiBookmark size={20} />
              Saved Quotes
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('resource-library')} $active={activeSection === 'resource-library'}>
              <FiBook size={20} />
              Resource Library
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('course-dashboard')} $active={activeSection === 'course-dashboard'}>
              <FiBook size={20} />
              Course Dashboard
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('ai-tool-library')} $active={activeSection === 'ai-tool-library'}>
              <FiTool size={20} />
              AI Tool Library
            </NavItem>
            <NavItem href="#" onClick={() => handleNavClick('saved-tool-stack')} $active={activeSection === 'saved-tool-stack'}>
              <FiTool size={20} />
              Saved Tool Stack
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('gamified-tracker')} $active={activeSection === 'gamified-tracker'}>
              <FiAward size={20} />
              Gamified Tracker
            </NavItem>
          </NavSection>

          <NavSection>
            <NavItem href="#" onClick={() => handleNavClick('account-settings')} $active={activeSection === 'account-settings'}>
              <FiSettings size={20} />
              Account Settings
            </NavItem>
          </NavSection>
        </Nav>
      </Sidebar>

      <UserHeader activeSection={activeSection} user={mockUser} />

      <Content>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default DashboardPage; 