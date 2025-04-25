import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faDownload,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

const SettingsTabs = styled.div`
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 1.5rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1rem;
  color: ${props => props.$active ? '#3B82F6' : 'rgba(15, 23, 42, 0.7)'};
  border-bottom: 2px solid ${props => props.$active ? '#3B82F6' : 'transparent'};
  font-weight: 500;
  background: none;
  border: none;
  
  &:hover {
    color: ${props => props.$active ? '#3B82F6' : '#0F172A'};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SettingsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const CardSection = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToggleSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleLabel = styled.div``;

const ToggleTitle = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const ToggleDescription = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const ToggleSlider = styled.div<{ $checked?: boolean }>`
  width: 2.75rem;
  height: 1.5rem;
  background-color: ${props => props.$checked ? '#3B82F6' : '#E5E7EB'};
  border-radius: 9999px;
  transition: all 0.2s;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BackupCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const BackupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const InfoLabel = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const InfoValue = styled.span`
  color: #0F172A;
`;

const StatusIndicator = styled.span`
  display: flex;
  align-items: center;
  color: #00E915;
`;

const StatusIcon = styled(FontAwesomeIcon)`
  margin-right: 0.25rem;
`;

const DownloadButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: white;
  }
`;

const LogsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const LogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LogItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
`;

const LogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const LogType = styled.span<{ $type: 'error' | 'info' }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.$type === 'error' ? '#EC297B' : '#0F172A'};
`;

const LogTime = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
`;

const LogMessage = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ViewLogsButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  color: #3B82F6;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: none;
  border: none;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const SystemSettingsTab: React.FC = () => {
  return (
    <Container>
      <SettingsTabs>
        <TabList>
          <TabButton $active>General</TabButton>
          <TabButton>Email</TabButton>
          <TabButton>API Keys</TabButton>
          <TabButton>Feature Flags</TabButton>
        </TabList>
      </SettingsTabs>

      <ContentGrid>
        <SettingsForm>
          <SettingsCard>
            <CardSection>
              <SectionTitle>Platform Settings</SectionTitle>
              <SettingGroup>
                <ToggleSetting>
                  <ToggleLabel>
                    <ToggleTitle>Maintenance Mode</ToggleTitle>
                    <ToggleDescription>Enable to block access during updates</ToggleDescription>
                  </ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput type="checkbox" />
                    <ToggleSlider />
                  </ToggleSwitch>
                </ToggleSetting>
                <InputGroup>
                  <InputLabel>Platform Name</InputLabel>
                  <Input type="text" defaultValue="ScaleMate" />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Support Email</InputLabel>
                  <Input type="email" defaultValue="support@scalemate.io" />
                </InputGroup>
              </SettingGroup>
            </CardSection>

            <CardSection>
              <SectionTitle>Security</SectionTitle>
              <SettingGroup>
                <ToggleSetting>
                  <ToggleLabel>
                    <ToggleTitle>Two-Factor Auth</ToggleTitle>
                    <ToggleDescription>Require 2FA for all admin users</ToggleDescription>
                  </ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput type="checkbox" defaultChecked />
                    <ToggleSlider $checked />
                  </ToggleSwitch>
                </ToggleSetting>
                <InputGroup>
                  <InputLabel>Session Timeout (minutes)</InputLabel>
                  <Input type="number" defaultValue="60" />
                </InputGroup>
              </SettingGroup>
            </CardSection>
          </SettingsCard>

          <ActionButtons>
            <ResetButton>Reset</ResetButton>
            <SaveButton>Save Changes</SaveButton>
          </ActionButtons>
        </SettingsForm>

        <SidePanel>
          <BackupCard>
            <CardTitle>System Backup</CardTitle>
            <BackupInfo>
              <InfoRow>
                <InfoLabel>Last Backup</InfoLabel>
                <InfoValue>Today, 03:45 AM</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Status</InfoLabel>
                <StatusIndicator>
                  <StatusIcon icon={faCheckCircle} />
                  Successful
                </StatusIndicator>
              </InfoRow>
              <DownloadButton>
                <FontAwesomeIcon icon={faDownload} />
                Download Latest Backup
              </DownloadButton>
            </BackupInfo>
          </BackupCard>

          <LogsCard>
            <CardTitle>System Logs</CardTitle>
            <LogsList>
              <LogItem>
                <LogHeader>
                  <LogType $type="error">API Error</LogType>
                  <LogTime>5 min ago</LogTime>
                </LogHeader>
                <LogMessage>Failed to connect to payment gateway</LogMessage>
              </LogItem>
              <LogItem>
                <LogHeader>
                  <LogType $type="info">System Update</LogType>
                  <LogTime>1 hour ago</LogTime>
                </LogHeader>
                <LogMessage>Successfully deployed v2.4.0</LogMessage>
              </LogItem>
              <ViewLogsButton>View All Logs</ViewLogsButton>
            </LogsList>
          </LogsCard>
        </SidePanel>
      </ContentGrid>
    </Container>
  );
};

export default SystemSettingsTab; 