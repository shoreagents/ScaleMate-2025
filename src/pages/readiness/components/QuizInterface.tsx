import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 42%;
  }
`;

const QuizContainer = styled.div`
  max-width: 48rem;
  margin: 0;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ProgressLabel = styled.span`
  color: rgba(15, 23, 42, 0.6);
`;

const ProgressCount = styled.span`
  color: #84CC16;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #E5E7EB;
  border-radius: 9999px;
  height: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background-color: #84CC16;
  width: 0%;
  transition: width 0.5s ease-in-out;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  height: 460px;
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.125rem;
    margin-bottom: 0.875rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0;
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.5rem;
    padding-bottom: 0.125rem;
  }

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
`;

// Update OptionLabel with selection state
interface OptionLabelProps {
  isSelected: boolean;
}

const OptionLabel = styled.label<OptionLabelProps>`
  display: block;
  padding: 0.75rem;
  border: 1px solid ${props => props.isSelected ? '#84CC16' : '#E5E7EB'};
  border-radius: 0.5rem;
  cursor: default;
  transition: all 0.3s ease;
  background-color: ${props => props.isSelected ? 'rgba(132, 204, 22, 0.1)' : 'white'};
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.625rem;
  }

  &:hover {
    border-color: ${props => props.isSelected ? '#84CC16' : '#E5E7EB'};
    transform: none;
  }
`;

const OptionInput = styled.input`
  display: none;
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
`;

// Update RadioCircle with selection state
interface RadioCircleProps {
  isSelected: boolean;
}

const RadioCircle = styled.div<RadioCircleProps>`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${props => props.isSelected ? '#84CC16' : '#E5E7EB'};
  border-radius: 9999px;
  margin-right: 0.75rem;
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.625rem;
    height: 0.625rem;
    background-color: #84CC16;
    border-radius: 50%;
    opacity: ${props => props.isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const OptionText = styled.span`
  color: #0F172A;
  font-size: 0.875rem;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8125rem;
    line-height: 1.3;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

// Update NavButton with hover animation
const NavButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: not-allowed;
  opacity: 0.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  ${props => props.variant === 'primary' && `
    background-color: #3B82F6;
    color: white;
    border: none;

    &:hover {
      background-color: #2563EB;
      transform: translateX(4px);
    }
  `}

  ${props => props.variant === 'secondary' && `
    color: #0F172A;
    background-color: transparent;
    border: 1px solid #E5E7EB;

    &:hover {
      background-color: #F9FAFB;
      transform: translateX(-4px);
    }
  `}
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const ButtonIconRight = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How confident are you in identifying which tasks should be delegated to an offshore team?",
    options: [
      "I already have a full task list ready",
      "I have some ideas but not fully sure",
      "I know I need help but haven't started listing tasks",
      "I have no idea where to begin"
    ]
  },
  {
    id: 2,
    text: "What's your current setup for documenting workflows and processes?",
    options: [
      "We use SOPs and task trackers regularly",
      "We have basic documentation but it's outdated",
      "Everything is in people's heads or scattered notes",
      "We haven't documented anything yet"
    ]
  },
  {
    id: 3,
    text: "Do you currently use any AI tools in your business operations?",
    options: [
      "Yes, AI is integrated into key workflows",
      "We're testing AI tools here and there",
      "We're curious but haven't started yet",
      "Not at all — AI feels overwhelming"
    ]
  },
  {
    id: 4,
    text: "How familiar are you with the cost benefits of offshore staffing?",
    options: [
      "Very — I've already calculated my potential savings",
      "Somewhat — I've seen examples but not for my team",
      "I know it's cheaper, but not sure by how much",
      "I haven't looked into this yet"
    ]
  },
  {
    id: 5,
    text: "Do you already have specific roles in mind that you'd like to outsource?",
    options: [
      "Yes, I have a clear hiring plan",
      "I have some roles but still deciding",
      "I'm just starting to think about it",
      "I'm not sure which roles fit"
    ]
  },
  {
    id: 6,
    text: "How do you currently train or onboard new team members?",
    options: [
      "We have structured onboarding with templates",
      "It's semi-formal — some guides, some ad hoc",
      "We train verbally or by shadowing",
      "We don't really have a training process yet"
    ]
  },
  {
    id: 7,
    text: "What is your primary motivation for considering offshore and AI support?",
    options: [
      "To reduce overhead and scale faster",
      "To free up time and improve efficiency",
      "To modernize my business",
      "I'm just exploring what's possible"
    ]
  }
];

const ScoreOutput = styled.div`
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  padding: 1rem 2.5rem 2.5rem;
  height: 460px;
  display: flex;
  flex-direction: column;
`;

const ScoreTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 1rem 0;
`;

const ScoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScoreLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const ScoreValue = styled.span`
  font-size: 1.125rem;
  color: #84CC16;
  font-weight: 600;
`;

const ScoreDescription = styled.div`
  color: #64748B;
  line-height: 1.6;
  font-size: 1rem;
`;

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #F9FAFB;
  border-radius: 1rem;

  &:last-child {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 1.5rem;
    margin-top: 0.5rem;

    ${ScoreLabel} {
      margin-bottom: 0;
    }
  }
`;

interface ScoringLevel {
  range: string;
  level: string;
  description: string;
}

const scoringLevels: ScoringLevel[] = [
  {
    range: "0-7",
    level: "Not Yet Ready",
    description: "You're at the starting line. Explore our Tool Library and Courses to build foundational knowledge."
  },
  {
    range: "8-13",
    level: "Getting There",
    description: "You're exploring the right ideas. Start with our Role Builder or Quick Quote to make it real."
  },
  {
    range: "14-18",
    level: "Almost Ready",
    description: "You've got momentum! Let's sharpen your process. Download your Action Plan and connect with a strategist."
  },
  {
    range: "19-21",
    level: "Ready to Scale",
    description: "You're ready to build! Start delegating with confidence using your blueprint and book a Strategy Call."
  }
];

export default function QuizInterface() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Calculate scoring level based on total score
  const getScoringLevel = (score: number): ScoringLevel => {
    if (score <= 7) return scoringLevels[0];
    if (score <= 13) return scoringLevels[1];
    if (score <= 18) return scoringLevels[2];
    return scoringLevels[3];
  };

  useEffect(() => {
    let answerTimer: NodeJS.Timeout;
    let nextQuestionTimer: NodeJS.Timeout;

    if (!showScore) {
      // Handle question answering
      answerTimer = setTimeout(() => {
        const randomOption = Math.floor(Math.random() * questions[currentQuestionIndex].options.length);
        setSelectedOption(randomOption);
        const optionScore = 3 - randomOption;
        setTotalScore(prev => prev + optionScore);
      }, 1000);

      // Handle question progression
      nextQuestionTimer = setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
          setShowScore(true);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
        }
      }, 2000);
    } else {
      // Reset quiz after showing score for 5 seconds
      const resetTimer = setTimeout(() => {
        setShowScore(false);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setTotalScore(0);
      }, 5000);

      return () => clearTimeout(resetTimer);
    }

    return () => {
      clearTimeout(answerTimer);
      clearTimeout(nextQuestionTimer);
    };
  }, [currentQuestionIndex, showScore]);

  if (showScore) {
    const scoringLevel = getScoringLevel(totalScore);
    return (
      <QuizContainer>
        <ProgressContainer>
          <ProgressText>
            <ProgressLabel>Results</ProgressLabel>
            <ProgressCount>Score Summary</ProgressCount>
          </ProgressText>
          <ProgressBar>
            <ProgressFill style={{ width: '100%' }} />
          </ProgressBar>
        </ProgressContainer>

        <ScoreOutput>
          <ScoreTitle>Your Readiness Score</ScoreTitle>
          <ScoreDetails>
            <ScoreRow>
              <ScoreLabel>Total Score</ScoreLabel>
              <ScoreValue>{totalScore} / 21</ScoreValue>
            </ScoreRow>
            <ScoreRow>
              <ScoreLabel>Readiness Level</ScoreLabel>
              <ScoreValue>{scoringLevel.level}</ScoreValue>
            </ScoreRow>
            <ScoreRow>
              <ScoreLabel>What This Means:</ScoreLabel>
              <ScoreDescription>
                {scoringLevel.description}
              </ScoreDescription>
            </ScoreRow>
          </ScoreDetails>
        </ScoreOutput>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <QuizContainer>
      <ProgressContainer>
        <ProgressText>
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressCount>{currentQuestionIndex + 1} of {questions.length} Questions</ProgressCount>
        </ProgressText>
        <ProgressBar>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
      </ProgressContainer>

      <QuestionCard>
        <QuestionTitle>{currentQuestion.text}</QuestionTitle>
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionLabel 
              key={index}
              isSelected={selectedOption === index}
            >
              <OptionInput 
                type="radio" 
                name={`question-${currentQuestion.id}`}
                checked={selectedOption === index}
                onChange={() => {}}
                disabled
              />
              <OptionContent>
                <RadioCircle isSelected={selectedOption === index} />
                <OptionText>{option}</OptionText>
              </OptionContent>
            </OptionLabel>
          ))}
        </OptionsContainer>
      </QuestionCard>

      <NavigationContainer>
        <NavButton variant="secondary">
          <ButtonIcon icon={faArrowLeft} />
          Previous
        </NavButton>
        <NavButton variant="primary">
          Next Question
          <ButtonIconRight icon={faArrowRight} />
        </NavButton>
      </NavigationContainer>
    </QuizContainer>
  );
} 