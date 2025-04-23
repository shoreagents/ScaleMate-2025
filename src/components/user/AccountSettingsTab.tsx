import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const SectionContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: ${props => props.$variant === 'primary' ? '0.5rem 1.5rem' : '0.5rem 1rem'};
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: #3B82F6;
          color: white;
          border: none;
          &:hover {
            background-color: rgba(59, 130, 246, 0.9);
          }
        `;
      case 'danger':
        return `
          background-color: #EC297B;
          color: white;
          border: none;
          &:hover {
            background-color: rgba(236, 41, 123, 0.9);
          }
        `;
      default:
        return `
          border: 1px solid #E5E7EB;
          color: #0F172A;
          background-color: white;
          &:hover {
            background-color: #F9FAFB;
          }
        `;
    }
  }}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ToggleDescription = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
`;

const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.div<{ $checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.$checked ? '#3B82F6' : '#E5E7EB'};
  transition: .4s;
  border-radius: 1.5rem;

  &:before {
    position: absolute;
    content: "";
    height: 1rem;
    width: 1rem;
    left: 0.25rem;
    bottom: 0.25rem;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    transform: ${props => props.$checked ? 'translateX(1.5rem)' : 'translateX(0)'};
  }
`;

const DangerSection = styled(SectionContent)`
  border-color: #EC297B;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const AccountSettingsTab: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  return (
    <Container>
      {/* Profile Section */}
      <Section id="profile-section">
        <SectionTitle>Profile Information</SectionTitle>
        <SectionContent>
          <ProfileImageContainer>
            <ProfileImage src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Profile" />
            <Button>Change Photo</Button>
          </ProfileImageContainer>
          <Grid>
            <FormGroup>
              <Label>First Name</Label>
              <Input type="text" defaultValue="John" />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" defaultValue="Smith" />
            </FormGroup>
          </Grid>
          <FormGroup>
            <Label>Email Address</Label>
            <Input type="email" defaultValue="john@company.com" />
          </FormGroup>
        </SectionContent>
      </Section>

      {/* Business Information */}
      <Section id="business-section">
        <SectionTitle>Business Information</SectionTitle>
        <SectionContent>
          <FormGroup>
            <Label>Company Name</Label>
            <Input type="text" placeholder="Enter company name" />
          </FormGroup>
          <FormGroup>
            <Label>Industry</Label>
            <Select>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Team Size</Label>
            <Select>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201+</option>
            </Select>
          </FormGroup>
        </SectionContent>
      </Section>

      {/* Preferences */}
      <Section id="preferences-section">
        <SectionTitle>Preferences</SectionTitle>
        <SectionContent>
          <FormGroup>
            <Label>Preferred Currency</Label>
            <Select>
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>AUD ($)</option>
            </Select>
          </FormGroup>
          <ToggleContainer>
            <ToggleLabel>
              <Label>Email Notifications</Label>
              <ToggleDescription>Receive updates and newsletters</ToggleDescription>
            </ToggleLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <ToggleSlider $checked={emailNotifications} />
            </ToggleSwitch>
          </ToggleContainer>
        </SectionContent>
      </Section>

      {/* Security */}
      <Section id="security-section">
        <SectionTitle>Security</SectionTitle>
        <SectionContent>
          <FormGroup>
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" />
          </FormGroup>
          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" />
          </FormGroup>
        </SectionContent>
      </Section>

      {/* Danger Zone */}
      <Section id="danger-section">
        <SectionTitle style={{ color: '#EC297B' }}>Danger Zone</SectionTitle>
        <DangerSection>
          <ToggleContainer>
            <div>
              <h3 style={{ fontWeight: 500, color: '#0F172A' }}>Delete Account</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.7)' }}>
                This action cannot be undone
              </p>
            </div>
            <Button $variant="danger">Delete Account</Button>
          </ToggleContainer>
        </DangerSection>
      </Section>

      {/* Save Button */}
      <SaveButtonContainer>
        <Button $variant="primary">Save Changes</Button>
      </SaveButtonContainer>
    </Container>
  );
};

export default AccountSettingsTab; 