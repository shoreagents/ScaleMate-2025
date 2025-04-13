import { TEST_CONFIG } from '../utils/constants';

export type TestCategory = typeof TEST_CONFIG.CATEGORIES[keyof typeof TEST_CONFIG.CATEGORIES];
export type TestStatus = typeof TEST_CONFIG.STATUS[keyof typeof TEST_CONFIG.STATUS];
export type SecurityTestType = typeof TEST_CONFIG.SECURITY[keyof typeof TEST_CONFIG.SECURITY];

export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  status: TestStatus;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  error?: Error;
  result?: unknown;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  tests: TestCase[];
  status: TestStatus;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
}

export interface TestReport {
  suiteId: string;
  testId: string;
  name: string;
  category: TestCategory;
  status: TestStatus;
  duration: number;
  timestamp: Date;
  error?: {
    message: string;
    stack?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface PerformanceMetrics {
  responseTime: number;
  loadTime: number;
  resourceCount: number;
  resourceSize: number;
  firstPaint: number;
  firstContentfulPaint: number;
}

export interface SecurityTestResult {
  type: SecurityTestType;
  passed: boolean;
  vulnerabilities: Array<{
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location?: string;
    recommendation?: string;
  }>;
}

export interface TestConfiguration {
  timeout?: number;
  retries?: number;
  parallel?: boolean;
  skip?: boolean;
  only?: boolean;
  metadata?: Record<string, unknown>;
} 