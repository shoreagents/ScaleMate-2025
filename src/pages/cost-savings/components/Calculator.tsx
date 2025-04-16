import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const CurrencySelector = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.select`
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
`;

const InputTable = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const TableContent = styled.div`
  padding: 1.5rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr 3fr 1fr;
  gap: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr 3fr 40px;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #0F172A;
  background: #fff;
  &::placeholder {
    color: #A0AEC0;
    opacity: 1;
    font-weight: 400;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EF4444;
  cursor: pointer;
  font-size: 1.1rem;
  &:hover {
    color: #DC2626;
  }
`;

const AddButtonRow = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #2563EB;
    text-decoration: underline;
  }
`;

const ResultsPanel = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResultSection = styled.div`
  &:last-child {
    border-left: 1px solid #E5E7EB;
    padding-left: 2rem;
  }
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SavingsAmount = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: #84CC16;
  margin-bottom: 0.5rem;
`;

const InfoCard = styled.div`
  background-color: rgba(132, 204, 22, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
`;

const SavingsPercentage = styled.div`
  color: #84CC16;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export default function Calculator() {
  const [currency, setCurrency] = useState('USD');

  return (
    <Section id="calculator">
      <Container>
        <ContentWrapper>
          <CurrencySelector>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="AUD">AUD ($)</option>
              <option value="NZD">NZD ($)</option>
            </Select>
          </CurrencySelector>

          <InputTable>
            <TableContent>
              <HeaderRow>
                <div>Role Title</div>
                <div>Local Salary</div>
                <div>Quantity</div>
                <div></div>
              </HeaderRow>

              <InputRow>
                <Input type="text" placeholder="e.g. Marketing Manager" />
                <Input type="number" placeholder="5000" />
                <Input type="number" defaultValue="1" min="1" />
                <DeleteButton>
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </InputRow>

              <AddButtonRow>
                <AddButton>
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0.5rem' }} />
                  Add Another Role
                </AddButton>
              </AddButtonRow>
            </TableContent>
          </InputTable>

          <ResultsPanel>
            <ResultsGrid>
              <ResultSection>
                <ResultTitle>Monthly Comparison</ResultTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <ResultItem>
                    <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Local Cost:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>$15,000</span>
                  </ResultItem>
                  <ResultItem>
                    <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Offshore Cost:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#84CC16' }}>$4,500</span>
                  </ResultItem>
                  <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '1rem 0' }}></div>
                  <ResultItem>
                    <span style={{ fontWeight: '600' }}>Monthly Savings:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#84CC16' }}>$10,500</span>
                  </ResultItem>
                </div>
              </ResultSection>

              <ResultSection>
                <ResultTitle>Annual Projection</ResultTitle>
                <div style={{ marginBottom: '1.5rem' }}>
                  <SavingsAmount>$126,000</SavingsAmount>
                  <div style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Estimated yearly savings</div>
                </div>
                <InfoCard>
                  <SavingsPercentage>
                    <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
                    70% Cost Reduction
                  </SavingsPercentage>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.7)' }}>
                    Based on current market rates
                  </div>
                </InfoCard>
              </ResultSection>
            </ResultsGrid>
          </ResultsPanel>
        </ContentWrapper>
      </Container>
    </Section>
  );
} 