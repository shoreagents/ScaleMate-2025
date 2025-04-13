import { FC } from 'react';
import { TestComponentProps } from '@/types';

declare const ServiceChecker: FC<{}>;
declare const AuthTester: FC<TestComponentProps>;
declare const QuoteTester: FC<TestComponentProps>;
declare const StyleTester: FC<TestComponentProps>;
declare const RoleBuilderTester: FC<TestComponentProps>;
declare const QuizTester: FC<TestComponentProps>;
declare const ToolStackTester: FC<TestComponentProps>;
declare const GamificationTester: FC<TestComponentProps>;
declare const AiPromptTester: FC<TestComponentProps>;
declare const PageCreatorPanel: FC<TestComponentProps>;
declare const AnonUserTester: FC<TestComponentProps>;
declare const EventTracker: FC<TestComponentProps>;
declare const DbMigrationTester: FC<TestComponentProps>;

export {
  ServiceChecker,
  AuthTester,
  QuoteTester,
  StyleTester,
  RoleBuilderTester,
  QuizTester,
  ToolStackTester,
  GamificationTester,
  AiPromptTester,
  PageCreatorPanel,
  AnonUserTester,
  EventTracker,
  DbMigrationTester
}; 