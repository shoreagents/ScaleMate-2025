import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCalculator, faCalendarCheck, faChevronRight, faHome, faNewspaper, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const Page = styled.div`
  padding-top: 8rem;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Category = styled.span<{ color: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.color}10;
  color: ${props => props.color};
  font-size: 0.875rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AuthorImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.p`
  font-weight: 500;
  color: #0F172A;
`;

const AuthorMeta = styled.p`
  font-size: 0.875rem;
  color: #1E293B;
`;

const HeroImage = styled.div`
  margin-bottom: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 1rem;
`;

const Content = styled.div`
  color: #1E293B;
  font-size: 1.125rem;
  line-height: 1.75;

  p {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #0F172A;
    margin: 3rem 0 1.5rem;
  }

  blockquote {
    border-left: 4px solid #3B82F6;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #1E293B;
  }

  blockquote p {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  blockquote footer {
    color: rgba(30, 41, 59, 0.6);
  }
`;

const InlineCTA = styled.div`
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin: 3rem 0;
`;

const CTAButton = styled(Link)`
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #2563EB;
  }
`;

const ShareSection = styled.div`
  border-top: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
  padding: 2rem 0;
  margin: 3rem 0;
`;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShareLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShareIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShareIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  color: #1E293B;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3B82F6;
  }
`;

const SaveButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1E293B;
  cursor: pointer;
`;

const RelatedArticles = styled.div`
  margin: 3rem 0;
`;

const RelatedTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 2rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RelatedCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const RelatedContent = styled.div`
  padding: 1.5rem;
`;

const RelatedCardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const RelatedCardDescription = styled.p`
  color: #1E293B;
  margin-bottom: 1rem;
`;

const FinalCTA = styled.div`
  background-color: #3B82F6;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  color: white;
`;

const FinalCTATitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const FinalCTADescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #F9FAFB;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: #EC297B;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #D91A6B;
  }
`;

const FooterWrapper = styled.footer`
  background-color: white;
  border-top: 1px solid #E5E7EB;
  padding: 3rem 0;
  margin-top: 5rem;
`;

const FooterContainer = styled.div`
  width: 100vw;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 12vw;
  @media (min-width: 1200px) {
    padding: 0 14rem;
  }
`;

const FooterGrid = styled.div`
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

const FooterLink = styled.span`
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

const BreadcrumbContainer = styled.div`
  margin-bottom: 2rem;
`;

const BreadcrumbList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.875rem;
`;

const BreadcrumbItem = styled(Link)`
  color: rgba(15, 23, 42, 0.6);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #3B82F6;
  }
`;

const BreadcrumbSeparator = styled(FontAwesomeIcon)`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.4);
`;

const BreadcrumbCurrent = styled.span`
  color: #0F172A;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function BlogPost() {
  return (
    <Page>
      <Container>
        <BreadcrumbContainer>
          <BreadcrumbList>
            <BreadcrumbItem href="/">
              <FontAwesomeIcon icon={faHome} />
              Home
            </BreadcrumbItem>
            <BreadcrumbSeparator icon={faChevronRight} />
            <BreadcrumbItem href="/blog">
              <FontAwesomeIcon icon={faNewspaper} />
              Blog
            </BreadcrumbItem>
            <BreadcrumbSeparator icon={faChevronRight} />
            <BreadcrumbCurrent>
              <FontAwesomeIcon icon={faFileLines} />
              5 Ways AI is Revolutionizing Offshore Teams
            </BreadcrumbCurrent>
          </BreadcrumbList>
        </BreadcrumbContainer>

        <Header>
          <CategoryContainer>
            <Category color="#00E915">Management</Category>
            <Category color="#3B82F6">Team Building</Category>
          </CategoryContainer>
          <Title>How AI is Revolutionizing Offshore Team Management</Title>
          <AuthorInfo>
            <AuthorImage 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
              alt="Author"
            />
            <AuthorDetails>
              <AuthorName>Sarah Johnson</AuthorName>
              <AuthorMeta>Feb 15, 2025 • 8 min read</AuthorMeta>
            </AuthorDetails>
          </AuthorInfo>
        </Header>

        <HeroImage>
          <Image 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6989de4866-e6e582bf1cc61928401b.png" 
            alt="modern office workspace with people working on computers"
          />
        </HeroImage>

        <Content>
          <p>
            The landscape of offshore team management is rapidly evolving, with artificial intelligence 
            playing an increasingly central role in how businesses coordinate, communicate, and collaborate 
            across borders...
          </p>

          <h2>The Rise of AI in Team Management</h2>
          <p>
            As organizations continue to embrace remote work and global talent pools, the need for 
            sophisticated management tools has never been greater...
          </p>

          <blockquote>
            <p>"The integration of AI tools has reduced our management overhead by 40% while improving team satisfaction scores."</p>
            <footer>- Tech Lead at Global Solutions Inc.</footer>
          </blockquote>

          <InlineCTA>
            <h3>Ready to Transform Your Team Management?</h3>
            <p>Try our AI-powered Role Builder and create your perfect offshore team structure.</p>
            <CTAButton href="/role-builder">
              Try Role Builder Free
            </CTAButton>
          </InlineCTA>

          <h2>Key Benefits of AI-Powered Management</h2>
          <p>
            Let's explore the transformative advantages that AI brings to offshore team coordination...
          </p>
        </Content>

        <ShareSection>
          <ShareContainer>
            <ShareLeft>
              <span>Share this article:</span>
              <ShareIcons>
                <ShareIcon icon={faTwitter} />
                <ShareIcon icon={faLinkedin} />
                <ShareIcon icon={faFacebook} />
              </ShareIcons>
            </ShareLeft>
            <SaveButton>
              <FontAwesomeIcon icon={faBookmark} />
              <span>Save</span>
            </SaveButton>
          </ShareContainer>
        </ShareSection>

        <RelatedArticles>
          <RelatedTitle>Related Articles</RelatedTitle>
          <RelatedGrid>
            <RelatedCard>
              <RelatedImage 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf70b247d3-dbb3403d056410e15683.png" 
                alt="data visualization" 
              />
              <RelatedContent>
                <RelatedCardTitle>10 Essential KPIs for Offshore Teams</RelatedCardTitle>
                <RelatedCardDescription>
                  Learn which metrics matter most when managing remote teams...
                </RelatedCardDescription>
              </RelatedContent>
            </RelatedCard>

            <RelatedCard>
              <RelatedImage 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/721ec49c03-9899fa14013c123abf13.png" 
                alt="team collaboration" 
              />
              <RelatedContent>
                <RelatedCardTitle>Building a Culture of Excellence</RelatedCardTitle>
                <RelatedCardDescription>
                  Strategies for fostering team spirit across time zones...
                </RelatedCardDescription>
              </RelatedContent>
            </RelatedCard>
          </RelatedGrid>
        </RelatedArticles>

        <FinalCTA>
          <FinalCTATitle>Start Your AI-Powered Team Journey</FinalCTATitle>
          <FinalCTADescription>
            Join thousands of businesses using ScaleMate to transform their offshore operations.
          </FinalCTADescription>
          <ButtonGroup>
            <PrimaryButton href="/quote">
              Get My Free Quote
              <FontAwesomeIcon icon={faCalculator} />
            </PrimaryButton>
            <SecondaryButton href="/contact">
              Book a Strategy Call
              <FontAwesomeIcon icon={faCalendarCheck} />
            </SecondaryButton>
          </ButtonGroup>
        </FinalCTA>
      </Container>
      <FooterWrapper>
        <FooterContainer>
          <FooterGrid>
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
                  <FooterLink onClick={() => window.location.href = '/quote'}>Quick Quote Calculator</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/cost-savings'}>Cost Savings Calculator</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/role-builder'}>AI-Powered Role Builder</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/readiness'}>Readiness Quiz</FooterLink>
                </LinkItem>
              </LinkList>
            </Column>
            <Column>
              <ColumnTitle>Learn</ColumnTitle>
              <LinkList>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/courses'}>Course Library</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/resources'}>Resource Library</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/tools'}>Tool Library</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/blog'}>Blog & Insights</FooterLink>
                </LinkItem>
              </LinkList>
            </Column>
            <Column>
              <ColumnTitle>Company</ColumnTitle>
              <LinkList>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/about'}>About</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/careers'}>Careers</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink onClick={() => window.location.href = '/contact'}>Contact</FooterLink>
                </LinkItem>
              </LinkList>
            </Column>
          </FooterGrid>
          <Copyright>
            <p>&copy; 2025 ScaleMate. All rights reserved.</p>
          </Copyright>
        </FooterContainer>
      </FooterWrapper>
    </Page>
  );
} 