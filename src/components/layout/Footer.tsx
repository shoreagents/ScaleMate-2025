import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const FooterWrapper = styled.footer`
  background-color: white;
  border-top: 1px solid #E5E7EB;
  padding: 3rem 0;
`;

const Container = styled.div`
  width: 100vw;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 12vw;
  @media (min-width: 1200px) {
    padding: 0 14rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BrandSection = styled.div`
  text-align: left;
`;

const BrandTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BrandDescription = styled.p`
  color: rgba(15, 23, 42, 0.6);
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.span`
  color: rgba(15, 23, 42, 0.6);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3B82F6;
  }
`;

const Column = styled.div`
  text-align: left;
`;

const ColumnTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LinkItem = styled.li``;

const Link = styled.span`
  color: rgba(15, 23, 42, 0.6);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3B82F6;
  }
`;

const Copyright = styled.div`
  border-top: 1px solid #E5E7EB;
  padding-top: 2rem;
  text-align: center;
  color: rgba(15, 23, 42, 0.6);
`;

export default function Footer() {
  return (
    <FooterWrapper id="footer">
      <Container>
        <Grid>
          <BrandSection>
            <BrandTitle>ScaleMate</BrandTitle>
            <BrandDescription>
              Empowering businesses to scale smarter with offshore teams and AI tools.
            </BrandDescription>
            <SocialLinks>
              <SocialIcon>
                <FontAwesomeIcon icon={faTwitter} />
              </SocialIcon>
              <SocialIcon>
                <FontAwesomeIcon icon={faLinkedin} />
              </SocialIcon>
              <SocialIcon>
                <FontAwesomeIcon icon={faFacebook} />
              </SocialIcon>
            </SocialLinks>
          </BrandSection>
          <Column>
            <ColumnTitle>Solutions</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link onClick={() => window.location.href = '/quote'}>Quick Quote Calculator</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/cost-savings'}>Cost Savings Calculator</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/role-builder'}>Role Builder</Link>
              </LinkItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Learn</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link onClick={() => window.location.href = '/courses'}>Courses</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/resources'}>Resource Downloads</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/tools'}>Tool Library</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/blog'}>Blog</Link>
              </LinkItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link onClick={() => window.location.href = '/about'}>About</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/careers'}>Careers</Link>
              </LinkItem>
              <LinkItem>
                <Link onClick={() => window.location.href = '/contact'}>Contact</Link>
              </LinkItem>
            </LinkList>
          </Column>
        </Grid>
        <Copyright>
          <p>&copy; 2025 ScaleMate. All rights reserved.</p>
        </Copyright>
      </Container>
    </FooterWrapper>
  );
} 