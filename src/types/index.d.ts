import { FC } from 'react';

export interface TestConfig {
  type: string;
  params?: Record<string, any>;
}

export interface TestResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface TestComponentProps {
  onTest: (config: TestConfig) => Promise<TestResult>;
}

declare module '@/components/test/ServiceChecker' {
  const ServiceChecker: FC<{}>;
  export default ServiceChecker;
}

declare module '@/components/test/AuthTester' {
  const AuthTester: FC<TestComponentProps>;
  export default AuthTester;
}

declare module '@/components/test/QuoteTester' {
  const QuoteTester: FC<TestComponentProps>;
  export default QuoteTester;
}

declare module '@/components/test/StyleTester' {
  const StyleTester: FC<TestComponentProps>;
  export default StyleTester;
}

declare module '@/components/test/RoleBuilderTester' {
  const RoleBuilderTester: FC<TestComponentProps>;
  export default RoleBuilderTester;
}

declare module '@/components/test/QuizTester' {
  const QuizTester: FC<TestComponentProps>;
  export default QuizTester;
}

declare module '@/components/test/ToolStackTester' {
  const ToolStackTester: FC<TestComponentProps>;
  export default ToolStackTester;
}

declare module '@/components/test/GamificationTester' {
  const GamificationTester: FC<TestComponentProps>;
  export default GamificationTester;
}

declare module '@/components/test/AiPromptTester' {
  const AiPromptTester: FC<TestComponentProps>;
  export default AiPromptTester;
}

declare module '@/components/test/PageCreatorPanel' {
  const PageCreatorPanel: FC<TestComponentProps>;
  export default PageCreatorPanel;
}

declare module '@/components/test/AnonUserTester' {
  const AnonUserTester: FC<TestComponentProps>;
  export default AnonUserTester;
}

declare module '@/components/test/EventTracker' {
  const EventTracker: FC<TestComponentProps>;
  export default EventTracker;
}

declare module '@/components/test/DbMigrationTester' {
  const DbMigrationTester: FC<TestComponentProps>;
  export default DbMigrationTester;
} 