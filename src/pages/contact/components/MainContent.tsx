import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormSection = styled.div`
  background-color: #F9FAFB;
  padding: 2rem;
  border-radius: 0.75rem;
`;

const BookingSection = styled.div`
  background-color: #F9FAFB;
  padding: 2rem;
  border-radius: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  height: 8rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const CalendarWidget = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  margin-bottom: 2rem;
`;

const CalendarPlaceholder = styled.div`
  text-align: center;
  padding: 2rem;
  border: 2px dashed #E5E7EB;
  border-radius: 0.5rem;
`;

const CalendarIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: #3B82F6;
  margin-bottom: 1rem;
`;

const PlaceholderText = styled.p`
  color: #1E293B;
`;

const FAQ = styled.div`
  margin-top: 1.5rem;
`;

const FAQTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E7EB;
`;

const FAQQuestion = styled.h4`
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const FAQAnswer = styled.p`
  color: #1E293B;
`;

export default function MainContent() {
  return (
    <Section id="contact-content">
      <Container>
        <Grid>
          <FormSection>
            <SectionTitle>Send Us a Message</SectionTitle>
            <Form>
              <FormGroup>
                <Label>Full Name</Label>
                <Input type="text" placeholder="Your name" />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="you@company.com" />
              </FormGroup>
              <FormGroup>
                <Label>Message Type</Label>
                <Select>
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <TextArea placeholder="Your message here..." />
              </FormGroup>
              <Button type="submit">Send Message</Button>
            </Form>
          </FormSection>

          <BookingSection>
            <SectionTitle>Book a Strategy Call</SectionTitle>
            <CalendarWidget>
              <CalendarPlaceholder>
                <CalendarIcon icon={faCalendar} />
                <PlaceholderText>Calendly Widget Embed Here</PlaceholderText>
              </CalendarPlaceholder>
            </CalendarWidget>

            <FAQ>
              <FAQTitle>Common Questions</FAQTitle>
              <FAQList>
                <FAQItem>
                  <FAQQuestion>How long is a strategy call?</FAQQuestion>
                  <FAQAnswer>Our initial strategy sessions are 30 minutes long.</FAQAnswer>
                </FAQItem>
                <FAQItem>
                  <FAQQuestion>What should I prepare?</FAQQuestion>
                  <FAQAnswer>Just bring your questions and scaling goals.</FAQAnswer>
                </FAQItem>
              </FAQList>
            </FAQ>
          </BookingSection>
        </Grid>
      </Container>
    </Section>
  );
} 