import styled from 'styled-components';

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media only screen and (max-width: 767px) {
    margin-top: 1.5rem;
    gap: 0.75rem;
  }

  @media only screen and (max-width: 480px) {
    margin-top: 1.25rem;
    gap: 0.5rem;
    flex-direction: column;
    width: 100%;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background-color: white;
  color: #0F172A;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }

  @media only screen and (max-width: 767px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

export const ContinueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #6366F1;
  color: white;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #4F46E5;
  }

  &:disabled {
    background-color: #E5E7EB;
    cursor: not-allowed;
  }

  @media only screen and (max-width: 767px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #6366F1;
  color: white;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #4F46E5;
  }

  &:disabled {
    background-color: #E5E7EB;
    cursor: not-allowed;
  }

  @media only screen and (max-width: 767px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

export const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background-color: white;
  color: #0F172A;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
    border-color: #6366F1;
    color: #6366F1;
  }

  @media only screen and (max-width: 767px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`; 