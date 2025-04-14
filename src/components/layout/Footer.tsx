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
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const BrandSection = styled.div`
  grid-column: span 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 2;
  }
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

const Column = styled.div``;

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
                <Link>Offshore Teams</Link>
              </LinkItem>
              <LinkItem>
                <Link>AI Tools</Link>
              </LinkItem>
              <LinkItem>
                <Link>Training</Link>
              </LinkItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link>About</Link>
              </LinkItem>
              <LinkItem>
                <Link>Careers</Link>
              </LinkItem>
              <LinkItem>
                <Link>Contact</Link>
              </LinkItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnTitle>Resources</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link>Blog</Link>
              </LinkItem>
              <LinkItem>
                <Link>Case Studies</Link>
              </LinkItem>
              <LinkItem>
                <Link>Help Center</Link>
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