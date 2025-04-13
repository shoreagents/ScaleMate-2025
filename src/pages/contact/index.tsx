import React, { useState } from 'react';
import styled from 'styled-components';

const ContactPage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 32rem;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 64rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ContactInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const InfoItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <ContactPage>
      <Container>
        <Content>
          <Title>Get in Touch</Title>
          <Description>
            Have questions about our services? We're here to help. Fill out the form or reach out directly.
          </Description>
        </Content>

        <ContactSection>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Button type="submit">Send Message</Button>
          </ContactForm>

          <ContactInfo>
            <InfoTitle>Contact Information</InfoTitle>
            
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>support@scalemate.com</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>+1 (555) 123-4567</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>
                123 Business Avenue<br />
                Suite 456<br />
                San Francisco, CA 94107
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Business Hours</InfoLabel>
              <InfoValue>
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday - Sunday: Closed
              </InfoValue>
            </InfoItem>
          </ContactInfo>
        </ContactSection>
      </Container>
    </ContactPage>
  );
} 