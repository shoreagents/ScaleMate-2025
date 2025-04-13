import { ApiResponse } from './api';

export type TestResult = {
  success: boolean;
  message: string;
  details?: unknown;
};

export type TestFunction = () => Promise<TestResult>;

export type TestConfig = {
  name: string;
  description?: string;
  timeout?: number;
  retries?: number;
  metadata?: Record<string, unknown>;
};

export const runTest = async (testFn: TestFunction): Promise<TestResult> => {
  try {
    return await testFn();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      details: error
    };
  }
};

export const validateApiResponse = <T>(response: ApiResponse<T>): TestResult => {
  if (response.error) {
    return {
      success: false,
      message: response.message || response.error.message,
      details: response.error
    };
  }

  if (!response.data) {
    return {
      success: false,
      message: 'No data returned from API',
      details: response
    };
  }

  return {
    success: true,
    message: 'API request successful',
    details: response.data
  };
};

export const formatTestResult = (result: TestResult): string => {
  const status = result.success ? '✅ PASS' : '❌ FAIL';
  const details = result.details ? `\nDetails: ${JSON.stringify(result.details, null, 2)}` : '';
  return `${status}: ${result.message}${details}`;
}; 