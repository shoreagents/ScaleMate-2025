import '@testing-library/jest-dom';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const actual = jest.requireActual('styled-components');
  return {
    ...actual,
    createGlobalStyle: jest.fn(),
  };
});

// Set up environment variables
process.env.NEXT_PUBLIC_ENABLE_TEST_DASHBOARD = 'true';
process.env.NEXT_PUBLIC_TEST_ENV = 'test';

// Global test setup
beforeAll(() => {
  // Add any global setup here
});

afterAll(() => {
  // Add any global cleanup here
});

// Add custom matchers
expect.extend({
  toHaveStyleRule(received, property, value) {
    const { getComputedStyle } = window;
    const element = received;
    const computedStyle = getComputedStyle(element);
    const pass = computedStyle[property] === value;

    return {
      pass,
      message: () =>
        `expected ${received} to have CSS property "${property}: ${value}"`,
    };
  },
}); 