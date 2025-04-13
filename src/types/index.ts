export interface TestResult {
  success: boolean;
  message?: string;
  details?: any;
  data?: any;
}

export interface TestConfig {
  type?: string;
  prompt?: string;
  service?: string;
  data?: any;
}

export interface TestComponentProps {
  onTest: (config: TestConfig) => Promise<TestResult>;
} 