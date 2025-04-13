import '@testing-library/jest-dom';
import { expect, jest } from '@jest/globals';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

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