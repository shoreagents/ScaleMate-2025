export const TEST_CONFIG = {
  // Timeouts
  DEFAULT_TIMEOUT: 5000,
  EXTENDED_TIMEOUT: 10000,
  
  // Test Categories
  CATEGORIES: {
    AUTH: 'Authentication',
    API: 'API Integration',
    DATABASE: 'Database',
    PERFORMANCE: 'Performance',
    SECURITY: 'Security',
    UI: 'User Interface',
    INTEGRATION: 'Integration',
    E2E: 'End-to-End'
  },
  
  // Test Statuses
  STATUS: {
    PENDING: 'Pending',
    RUNNING: 'Running',
    PASSED: 'Passed',
    FAILED: 'Failed',
    SKIPPED: 'Skipped',
    ERROR: 'Error'
  },
  
  // Performance Thresholds (in milliseconds)
  PERFORMANCE: {
    RESPONSE_TIME: {
      EXCELLENT: 100,
      GOOD: 300,
      ACCEPTABLE: 1000,
      POOR: 3000
    },
    LOAD_TIME: {
      EXCELLENT: 1000,
      GOOD: 2000,
      ACCEPTABLE: 3000,
      POOR: 5000
    }
  },
  
  // Security Test Types
  SECURITY: {
    XSS: 'Cross-Site Scripting',
    CSRF: 'Cross-Site Request Forgery',
    SQL_INJECTION: 'SQL Injection',
    AUTH_BYPASS: 'Authentication Bypass',
    RATE_LIMIT: 'Rate Limiting'
  }
} as const;

export const TEST_MESSAGES = {
  START: 'Starting test...',
  COMPLETE: 'Test completed',
  TIMEOUT: 'Test timed out',
  SKIP: 'Test skipped',
  ERROR: {
    TIMEOUT: 'Test exceeded timeout limit',
    NETWORK: 'Network error occurred',
    AUTH: 'Authentication error',
    VALIDATION: 'Validation error',
    UNKNOWN: 'An unknown error occurred'
  }
} as const; 