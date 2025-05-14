import React from 'react';
import styled from 'styled-components';
import { 
  FaBriefcase, 
  FaUsers, 
  FaGears, 
  FaArrowRight, 
  FaRegBookmark, 
  FaRegCopy 
} from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const DepartmentCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div<{ $selected?: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #6366F1;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const ContinueButton = styled.button`
  background-color: #3B82F6;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

interface RoleTitleSectionProps {
  $show: boolean;
}

const RoleTitleSection = styled.div<{ $show: boolean }>`
  margin-top: 2rem;
  opacity: ${props => props.$show ? 1 : 0};
  transform: translateY(${props => props.$show ? '0' : '20px'});
  transition: all 0.3s ease;
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
`;

const RoleTitleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const RoleTitleCard = styled.div<{ $selected: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const RoleTitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RoleTitleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RoleTitleIcon = styled.div<{ $selected?: boolean }>`
  font-size: 1.25rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
`;

const RoleTitleText = styled.h3`
  font-weight: 600;
  color: #0F172A;
  margin: 0;
`;

const RoleTitleDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.5rem 0 0;
`;

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Step1Props {
  selectedDepartment: string;
  selectedRoleTitle: string;
  onDepartmentSelect: (department: string) => void;
  onRoleTitleSelect: (title: string) => void;
  onContinue: () => void;
}

const Step1: React.FC<Step1Props> = ({
  selectedDepartment,
  selectedRoleTitle,
  onDepartmentSelect,
  onRoleTitleSelect,
  onContinue
}) => {
  const [showRoleTitles, setShowRoleTitles] = React.useState(false);
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedDepartment) {
      setShowRoleTitles(true);
    }
  }, [selectedDepartment]);

  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('departments')
          .select('*')
          .order('name');

        if (error) throw error;
        setDepartments(data || []);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const getRoleTitles = (department: string) => {
    switch (department) {
      case 'sales':
        return [
          { title: 'Sales Development Representative', description: 'Focus on outbound prospecting and lead generation' },
          { title: 'Account Executive', description: 'Manage full sales cycle and close deals' },
          { title: 'Sales Manager', description: 'Lead and coach sales team to achieve targets' }
        ];
      case 'marketing':
        return [
          { title: 'Marketing Coordinator', description: 'Support marketing campaigns and content creation' },
          { title: 'Digital Marketing Specialist', description: 'Manage digital channels and campaigns' },
          { title: 'Marketing Manager', description: 'Lead marketing strategy and team' }
        ];
      case 'customer-service':
        return [
          { title: 'Customer Support Representative', description: 'Handle customer inquiries and support tickets' },
          { title: 'Customer Success Manager', description: 'Ensure customer satisfaction and retention' },
          { title: 'Support Team Lead', description: 'Lead and mentor support team' }
        ];
      default:
        return [];
    }
  };

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase':
        return <FaBriefcase />;
      case 'users':
        return <FaUsers />;
      case 'gears':
        return <FaGears />;
      default:
        return <FaBriefcase />;
    }
  };

  if (isLoading) {
    return (
      <Section>
        <SectionTitle>Loading Departments...</SectionTitle>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionTitle>Error</SectionTitle>
        <p>{error}</p>
      </Section>
    );
  }

  return (
    <Section>
      <SectionTitle>Pick a Department</SectionTitle>
      <DepartmentGrid>
        {departments.map((dept) => (
          <DepartmentCard 
            key={dept.id}
            $selected={selectedDepartment === dept.id}
            onClick={() => onDepartmentSelect(dept.id)}
          >
            <CardHeader>
              <IconContainer $selected={selectedDepartment === dept.id}>
                {getDepartmentIcon(dept.icon)}
              </IconContainer>
              <RadioCircle $selected={selectedDepartment === dept.id}>
                {selectedDepartment === dept.id && <RadioDot />}
              </RadioCircle>
            </CardHeader>
            <CardTitle>{dept.name}</CardTitle>
            <CardDescription>{dept.description}</CardDescription>
          </DepartmentCard>
        ))}
      </DepartmentGrid>

      <RoleTitleSection $show={showRoleTitles}>
        <SectionTitle>Select Role Title</SectionTitle>
        <RoleTitleGrid>
          {getRoleTitles(selectedDepartment).map((role) => (
            <RoleTitleCard
              key={role.title}
              $selected={selectedRoleTitle === role.title}
              onClick={() => onRoleTitleSelect(role.title)}
            >
              <RoleTitleHeader>
                <RoleTitleInfo>
                  <RoleTitleIcon $selected={selectedRoleTitle === role.title}>
                    <FaBriefcase />
                  </RoleTitleIcon>
                  <RoleTitleText>{role.title}</RoleTitleText>
                </RoleTitleInfo>
                <RadioCircle $selected={selectedRoleTitle === role.title}>
                  {selectedRoleTitle === role.title && <RadioDot />}
                </RadioCircle>
              </RoleTitleHeader>
              <RoleTitleDescription>{role.description}</RoleTitleDescription>
            </RoleTitleCard>
          ))}
        </RoleTitleGrid>
      </RoleTitleSection>

      <ButtonContainer>
        <ContinueButton
          onClick={onContinue}
          disabled={!selectedDepartment || !selectedRoleTitle}
        >
          Continue to Tasks <FaArrowRight />
        </ContinueButton>
      </ButtonContainer>
    </Section>
  );
};

export default Step1; 