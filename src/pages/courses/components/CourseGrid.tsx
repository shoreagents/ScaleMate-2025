import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import { CoursesAuthModal } from '../../../components/courses/CoursesAuthModal';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background: #F9FAFB;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const CardImageWrapper = styled.div<{bg: string}>`
  height: 12rem;
  background: ${({bg}) => bg};
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BadgeGroup = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span<{bg: string, color: string}>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  background: ${({bg}) => bg};
  color: ${({color}) => color};
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardFooterLeft = styled.div`
  display: flex;
  align-items: center;
  color: rgba(15, 23, 42, 0.4);
  font-size: 1rem;
`;

const CardFooterText = styled.span`
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.6);
`;

const CourseLink = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: #2563EB;
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-left: 0.25rem;
  font-size: 0.875rem;
`;

export default function CourseGrid() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleStartCourse = (courseId: string) => {
    if (!user) {
      setSelectedCourseId(courseId);
      setIsAuthModalOpen(true);
      return;
    }
    // Handle course start for authenticated users
    // TODO: Implement course start logic
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (selectedCourseId) {
      // Start the course after successful authentication
      handleStartCourse(selectedCourseId);
    }
  };

  return (
    <>
      <Section id="course-grid">
        <Container>
          <Grid>
            {/* Course Card 1 */}
            <Card id="course-1">
              <CardImageWrapper bg="rgba(59,130,246,0.1)">
                <CardImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6f542091d1-d3051b85f3425d637eb3.png" alt="modern business training course thumbnail with AI theme, minimalist" />
                <BadgeGroup>
                  <Badge bg="#00E915" color="#fff">100 XP</Badge>
                  <Badge bg="#fff" color="#3B82F6">Free</Badge>
                </BadgeGroup>
              </CardImageWrapper>
              <CardContent>
                <CardTitle>AI Basics for Business</CardTitle>
                <CardDesc>Learn how to leverage AI tools in your business operations.</CardDesc>
                <CardFooter>
                  <CardFooterLeft>
                    <FontAwesomeIcon icon={faClock} style={{marginRight: '0.5rem'}} />
                    <CardFooterText>2.5 hours</CardFooterText>
                  </CardFooterLeft>
                  <CourseLink onClick={() => handleStartCourse('course-1')}>
                    Start Course
                    <ArrowIcon icon={faArrowRight} />
                  </CourseLink>
                </CardFooter>
              </CardContent>
            </Card>
            {/* Course Card 2 */}
            <Card id="course-2">
              <CardImageWrapper bg="rgba(236,41,123,0.1)">
                <CardImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6b2e33c16d-cf18f37385c31a5e77a3.png" alt="team delegation and management course thumbnail, professional style" />
                <BadgeGroup>
                  <Badge bg="#00E915" color="#fff">150 XP</Badge>
                  <Badge bg="#EC297B" color="#fff">Premium</Badge>
                </BadgeGroup>
              </CardImageWrapper>
              <CardContent>
                <CardTitle>Delegation Mastery</CardTitle>
                <CardDesc>Master the art of effective task delegation and team management.</CardDesc>
                <CardFooter>
                  <CardFooterLeft>
                    <FontAwesomeIcon icon={faClock} style={{marginRight: '0.5rem'}} />
                    <CardFooterText>4 hours</CardFooterText>
                  </CardFooterLeft>
                  <CourseLink as={Link} href={`/courses/course-2/preview`}>
                    Preview
                    <ArrowIcon icon={faArrowRight} />
                  </CourseLink>
                </CardFooter>
              </CardContent>
            </Card>
            {/* Course Card 3 */}
            <Card id="course-3">
              <CardImageWrapper bg="rgba(0,152,255,0.1)">
                <CardImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5957270779-07c26e609a2883f5668e.png" alt="system automation course thumbnail, tech focused" />
                <BadgeGroup>
                  <Badge bg="#00E915" color="#fff">200 XP</Badge>
                  <Badge bg="#fff" color="#3B82F6">Free</Badge>
                </BadgeGroup>
              </CardImageWrapper>
              <CardContent>
                <CardTitle>Systems & Automation</CardTitle>
                <CardDesc>Build scalable systems and automate routine tasks.</CardDesc>
                <CardFooter>
                  <CardFooterLeft>
                    <FontAwesomeIcon icon={faClock} style={{marginRight: '0.5rem'}} />
                    <CardFooterText>3 hours</CardFooterText>
                  </CardFooterLeft>
                  <CourseLink onClick={() => handleStartCourse('course-3')}>
                    Start Course
                    <ArrowIcon icon={faArrowRight} />
                  </CourseLink>
                </CardFooter>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      <CoursesAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
} 