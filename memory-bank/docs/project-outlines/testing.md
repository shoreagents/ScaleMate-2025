# 🧪 ScaleMate Testing Platform & Strategy

## 📋 Overview
The ScaleMate Testing Platform is a comprehensive internal testing environment running on port 4000 that allows developers to test all aspects of the platform, including functionality, page creation, styling, and text content. This internal test dashboard simulates and validates every major feature of the ScaleMate platform, allowing developers, designers, and QA to debug, preview, and iterate functionality before full rollout.

## 🚀 Quick Start
```bash
# Start the test environment
npm run test:env

# Access the test dashboard
http://localhost:4000/test-dashboard

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 🔧 Test Environment Setup

### Environment Variables
```env
NEXT_PUBLIC_ENABLE_TEST_DASHBOARD=true
NEXT_PUBLIC_TEST_ENV=development
NEXT_PUBLIC_SUPABASE_URL=your_test_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_key
```

### Database Setup
```sql
-- Test database initialization
CREATE TABLE test_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  role TEXT,
  created_at TIMESTAMP
);

-- Test tracking table
CREATE TABLE test_events (
  id UUID PRIMARY KEY,
  event_type TEXT,
  user_id UUID,
  timestamp TIMESTAMP,
  metadata JSONB
);
```

## 📐 Testing Strategy

### 1. Unit Testing
- Framework: Jest
- Coverage Target: 80%
- Focus Areas:
  - Components
  - Hooks
  - Utilities
  - Services
  - State Management

### 2. Integration Testing
- Framework: Jest + React Testing Library
- Coverage Target: 70%
- Focus Areas:
  - Component Integration
  - API Integration
  - State Integration
  - Service Integration
  - Flow Testing

### 3. E2E Testing
- Framework: Cypress
- Coverage Target: 60%
- Focus Areas:
  - User Flows
  - Critical Paths
  - Error Scenarios
  - Performance
  - Security

## 📂 Test Organization

### Directory Structure
```
tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── services/
│   └── stores/
├── integration/
│   ├── flows/
│   ├── api/
│   ├── state/
│   └── services/
└── e2e/
    ├── flows/
    ├── scenarios/
    └── performance/
```

### Test Dashboard Structure
```
/pages
  /test
    index.tsx                // Test Dashboard
/components/test
  AuthPanel.tsx
  QuotePanel.tsx
  QuizTester.tsx
  RoleBuilderTester.tsx
  AiPromptRunner.tsx
  EventTracker.tsx
  AnonUserSimulator.tsx
  PageCreatorPanel.tsx
  StyleTesterPanel.tsx
```

## ⚙️ Test Configuration

### Jest Configuration
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Cypress Configuration
```javascript
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: true,
  },
};
```

## 🧩 Testing Modules Overview

### ✅ AUTH + SESSION MODULE
```typescript
// components/test/AuthTester.tsx
const testAuth = async () => {
  // Test sign up
  const signUp = await testSignUp({
    email: 'test@example.com',
    password: 'Test123!'
  });
  
  // Test login
  const login = await testLogin({
    email: 'test@example.com',
    password: 'Test123!'
  });
  
  // Test session
  const session = await testSession();
  
  return {
    signUpSuccess: signUp.success,
    loginSuccess: login.success,
    sessionValid: session.valid
  };
};
```

**Actions:**
- [x] UI Implemented: Sign Up Test User (Email + Password)
- [x] UI Implemented: Sign In Test User
- [x] UI Implemented: Logout Session
- [x] UI Implemented: Password Reset Flow Trigger
- [x] UI Implemented: View Current Session, User Role Type, Auth Token

**Output:** [x] UI Implemented: Display area for Supabase session object, RLS check, decoded JWT, cookie status

### 📈 QUOTE ENGINE TESTING
```typescript
// components/test/QuoteTester.tsx
const testQuoteEngine = async () => {
  // Test quick quote
  const quote = await testQuickQuote({
    teamSize: 5,
    roles: ['developer', 'designer'],
    location: 'Philippines'
  });
  
  // Test salary comparison
  const comparison = await testSalaryComparison({
    localSalary: 80000,
    offshoreSalary: 25000
  });
  
  // Test PDF export
  const pdf = await testPDFExport(quote.id);
  
  return {
    quoteGenerated: quote.success,
    comparisonValid: comparison.success,
    pdfCreated: pdf.success
  };
};
```

**Actions:**
- [ ] UI Implemented: Run Quick Quote with test data
- [ ] UI Implemented: Compare Local vs Offshore Salaries (Auto logic from pricing table)
- [ ] UI Implemented: Trigger PDF Export Blueprint

**Output:** [ ] UI Implemented: Display area for Quote JSON, PDF URL, pricing match debug

### 📝 ROLE BUILDER PREVIEW
```typescript
// components/test/RoleBuilderTester.tsx
const testRoleBuilder = async () => {
  // Test JD generation
  const jd = await testJDGeneration({
    department: 'Engineering',
    taskSet: ['frontend', 'backend', 'devops'],
    tools: ['React', 'Node.js', 'AWS']
  });
  
  // Test KPI suggestions
  const kpis = await testKPISuggestions(jd.id);
  
  // Test PDF export
  const pdf = await testPDFExport(jd.id);
  
  return {
    jdGenerated: jd.success,
    kpisValid: kpis.success,
    pdfCreated: pdf.success
  };
};
```

**Inputs:** [ ] UI Implemented: Department, Task Set, Tools
**Actions:**
- [ ] UI Implemented: Generate JD via AI
**Output:** [ ] UI Implemented: Display area for Job Description, KPI Suggestions, Export PDF

### 📊 READINESS QUIZ TESTER
```typescript
// components/test/QuizTester.tsx
const testReadinessQuiz = async () => {
  // Auto-fill quiz
  const quiz = await autoFillQuiz({
    answers: [
      { questionId: 1, answer: 'Yes' },
      { questionId: 2, answer: 'No' },
      { questionId: 3, answer: 'Sometimes' }
    ]
  });
  
  // Test readiness state
  const state = await testReadinessState('High');
  
  // Test action plan
  const plan = await testActionPlan(quiz.id);
  
  return {
    quizCompleted: quiz.success,
    stateValid: state.success,
    planGenerated: plan.success
  };
};
```

**Actions:**
- [ ] UI Implemented: Auto-fill and Submit Quiz (simulate answers)
- [ ] UI Implemented: Select readiness state output (Low / Medium / High)
**Output:** [ ] UI Implemented: Display area for Readiness Label, PDF Action Plan, score debug

### 🛠 TOOL STACK TESTER
```typescript
// components/test/ToolStackTester.tsx
const testToolStack = async () => {
  // Test user tool stack
  const userStack = await testUserToolStack({
    userId: 'test-user-id',
    tools: ['tool1', 'tool2']
  });
  
  // Test anonymous tool stack
  const anonStack = await testAnonToolStack({
    sessionId: 'test-session-id',
    tools: ['tool1']
  });
  
  // Test tool search
  const search = await testToolSearch('tag:automation');
  
  return {
    userStackSaved: userStack.success,
    anonStackSaved: anonStack.success,
    searchWorking: search.success
  };
};
```

**Actions:**
- [ ] UI Implemented: Save Tool to Stack (User)
- [ ] UI Implemented: Save Tool to Stack (Anonymous)
- [ ] UI Implemented: Search Tool by Tag
**Output:** [ ] UI Implemented: Display area for Tool JSON, user_id or anon_session_id link

### 🎮 GAMIFICATION ENGINE TESTER
```typescript
// components/test/GamificationTester.tsx
const testGamification = async () => {
  // Test XP award
  const xp = await testXPAward({
    userId: 'test-user-id',
    amount: 100,
    reason: 'Completed quiz'
  });
  
  // Test badge unlock
  const badge = await testBadgeUnlock({
    userId: 'test-user-id',
    badgeId: 'badge-1'
  });
  
  // Test level up
  const level = await testLevelUp('test-user-id');
  
  return {
    xpAwarded: xp.success,
    badgeUnlocked: badge.success,
    levelUp: level.success
  };
};
```

**Actions:**
- [ ] UI Implemented: Award XP (Manual)
- [ ] UI Implemented: Unlock Badge (Simulated Trigger)
**Output:** [ ] UI Implemented: Display area for Total XP, User Level, Badge Inventory

### 🧠 AI PROMPT TESTER
```typescript
// components/test/AiPromptTester.tsx
const testAiPrompt = async () => {
  // Test custom prompt
  const prompt = await testCustomPrompt({
    prompt: 'Generate a job description for a senior developer',
    model: 'gpt-4'
  });
  
  // Test prompt with context
  const contextPrompt = await testContextPrompt({
    prompt: 'Generate a job description',
    context: { role: 'senior developer', skills: ['React', 'Node.js'] },
    model: 'gpt-4'
  });
  
  return {
    promptSuccess: prompt.success,
    contextPromptSuccess: contextPrompt.success
  };
};
```

**Input:** [ ] UI Implemented: Custom Prompt (e.g., generate JD, SOP)
**Actions:**
- [ ] UI Implemented: Run Prompt using GPT/Claude
**Output:** [ ] UI Implemented: Display area for Raw JSON + Markdown Renderer

## 🔬 UI & Content Testing

### 1. Page Creation & Styling Tests
```typescript
// pages/test/page-creator.tsx
interface PageTest {
  route: string;
  layout: 'public' | 'dashboard' | 'admin';
  components: string[];
  styles: {
    theme: 'light' | 'dark';
    responsive: boolean;
    animations: boolean;
  };
}

const testPageCreation = async (config: PageTest) => {
  // Test page creation
  const page = await createTestPage(config);
  
  // Test responsive design
  await testResponsiveLayout(page);
  
  // Test styling consistency
  await validateStyles(page);
  
  // Test animations
  await testAnimations(page);
  
  return {
    success: true,
    pageId: page.id,
    styleScore: calculateStyleScore(page),
    responsiveScore: calculateResponsiveScore(page)
  };
};
```

**Panel UI:** [ ] UI Implemented: `PageCreatorPanel`

### 2. Text & Content Testing
```typescript
// utils/test-content.ts
interface ContentTest {
  type: 'heading' | 'body' | 'button' | 'form';
  content: string;
  style: {
    fontSize: string;
    fontWeight: string;
    color: string;
    lineHeight: string;
  };
}

const testContent = async (content: ContentTest) => {
  // Test text rendering
  const rendered = await renderContent(content);
  
  // Test accessibility
  const a11y = await testAccessibility(rendered);
  
  // Test responsive text
  const responsive = await testResponsiveText(rendered);
  
  return {
    success: true,
    contentId: rendered.id,
    a11yScore: a11y.score,
    responsiveScore: responsive.score
  };
};
```

### 3. Database Testing
```typescript
// utils/test-database.ts
const testDatabase = async () => {
  // Test table creation
  const table = await createTestTable({
    name: 'test_table',
    columns: [
      { name: 'id', type: 'UUID' },
      { name: 'data', type: 'JSONB' }
    ]
  });
  
  // Test RLS policies
  const rls = await testRLSPolicies(table);
  
  // Test queries
  const queries = await testQueries(table);
  
  return {
    tableCreated: table.success,
    rlsWorking: rls.success,
    queriesWorking: queries.success
  };
};
```

**Panel UI:** [ ] UI Implemented: `DbMigrationTester` (from dashboard structure)

## 🧍 User Flow Testing

### Anonymous User Testing
```typescript
// components/test/AnonUserTester.tsx
const testAnonymousUser = async () => {
  // Test anonymous quote view
  const quoteView = await testAnonQuoteView();
  
  // Test anonymous resource view
  const resourceView = await testAnonResourceView();
  
  // Test anonymous quiz
  const quiz = await testAnonQuiz();
  
  // Test resource download attempt
  const download = await testResourceDownload();
  
  // Test save role attempt
  const saveRole = await testSaveRoleAttempt();
  
  return {
    quoteViewSuccess: quoteView.success,
    resourceViewSuccess: resourceView.success,
    quizSuccess: quiz.success,
    downloadTriggered: download.triggered,
    saveRoleTriggered: saveRole.triggered
  };
};
```

**Actions:**
- [ ] UI Implemented: Trigger Anonymous View: Quote Tool
- [ ] UI Implemented: Trigger Anonymous View: Blog/Resource Page
- [ ] UI Implemented: Start Quiz Anonymously
- [ ] UI Implemented: Attempt Resource Download (triggers CTA/email)
- [ ] UI Implemented: Attempt Save Role (prompts login modal)

**Trackers:** [ ] UI Implemented: Display area for `session_id`, localStorage state, cookies

### Component Testing
```typescript
import { renderComponent, findElement, clickElement } from '../utils';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    renderComponent(Button, { children: 'Click me' });
    expect(findElement('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = jest.fn();
    renderComponent(Button, { onClick, children: 'Click me' });
    await clickElement(findElement('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Integration Test Example
```typescript
import { renderComponent, findElement, clickElement } from '../utils';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    renderComponent(LoginForm, { onSubmit });

    await userEvent.type(findElement('email-input'), 'test@example.com');
    await userEvent.type(findElement('password-input'), 'password123');
    await clickElement(findElement('submit-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### E2E Test Example
```typescript
describe('Authentication Flow', () => {
  it('successfully logs in user', () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## 📊 EVENT + TRACKING TESTING
```typescript
// components/test/EventTracker.tsx
const testEventTracking = async () => {
  // Test quote tool view
  const quoteView = await testTrackEvent('viewed_quote_tool');
  
  // Test quiz start
  const quizStart = await testTrackEvent('started_quiz');
  
  // Test email submission
  const emailSubmit = await testTrackEvent('submitted_email');
  
  // Test download attempt
  const download = await testTrackEvent('download_attempt');
  
  // Test CTA click
  const ctaClick = await testTrackEvent('cta_clicked');
  
  return {
    quoteViewTracked: quoteView.success,
    quizStartTracked: quizStart.success,
    emailSubmitTracked: emailSubmit.success,
    downloadTracked: download.success,
    ctaClickTracked: ctaClick.success
  };
};
```

**Triggered Events:**
- [ ] UI Implemented: Track: Viewed Quote Tool
- [ ] UI Implemented: Track: Started Quiz
- [ ] UI Implemented: Track: Submitted Email
- [ ] UI Implemented: Track: Download Attempt
- [ ] UI Implemented: Track: CTA Clicked (Strategy Call, Booklet, etc)

**Output:** [ ] UI Implemented: Display area for Internal Event Log, JSON viewer

## 🖥️ Test Dashboard Interface

### Page Creation Panel
```tsx
// components/test/PageCreatorPanel.tsx
const PageCreatorPanel = () => {
  return (
    <div className="test-panel">
      <h2>Page Creation Testing</h2>
      
      {/* Route Configuration */}
      <div className="test-section">
        <h3>Route Setup</h3>
        <input type="text" placeholder="Route path" />
        <select>
          <option>Public Layout</option>
          <option>Dashboard Layout</option>
          <option>Admin Layout</option>
        </select>
      </div>
      
      {/* Component Selection */}
      <div className="test-section">
        <h3>Components</h3>
        <div className="component-list">
          {/* Component checkboxes */}
        </div>
      </div>
      
      {/* Style Testing */}
      <div className="test-section">
        <h3>Style Testing</h3>
        <div className="style-controls">
          {/* Style controls */}
        </div>
      </div>
      
      {/* Preview */}
      <div className="test-preview">
        {/* Live preview */}
      </div>
    </div>
  );
};
```
**Status:** [ ] UI Implemented

### Style Testing Panel
```tsx
// components/test/StyleTesterPanel.tsx
const StyleTesterPanel = () => {
  return (
    <div className="test-panel">
      <h2>Style Testing</h2>
      
      {/* Theme Testing */}
      <div className="test-section">
        <h3>Theme Testing</h3>
        <button onClick={() => testTheme('light')}>Test Light Theme</button>
        <button onClick={() => testTheme('dark')}>Test Dark Theme</button>
      </div>
      
      {/* Responsive Testing */}
      <div className="test-section">
        <h3>Responsive Testing</h3>
        <div className="viewport-controls">
          {/* Viewport size controls */}
        </div>
      </div>
      
      {/* Animation Testing */}
      <div className="test-section">
        <h3>Animation Testing</h3>
        <div className="animation-controls">
          {/* Animation controls */}
        </div>
      </div>
    </div>
  );
};
```
**Status:** [x] UI Implemented (Basic)

## 🛠️ Test Utilities

### Component Testing Utilities
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const renderComponent = (Component: React.ComponentType, props = {}) => {
  return render(<Component {...props} />);
};

export const findElement = (testId: string) => {
  return screen.getByTestId(testId);
};

export const clickElement = async (element: HTMLElement) => {
  await userEvent.click(element);
};
```

### API Testing Utilities
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const mockApi = (path: string, response: any) => {
  return rest.get(`/api${path}`, (req, res, ctx) => {
    return res(ctx.json(response));
  });
};

export const setupMockServer = (handlers: any[]) => {
  return setupServer(...handlers);
};
```

## ❗ Error Handling & Resolution

### Common Errors & Solutions
```typescript
// utils/test-error-handler.ts
interface TestError {
  code: string;
  message: string;
  solution: string;
}

const errorSolutions: Record<string, TestError> = {
  'AUTH_001': {
    code: 'AUTH_001',
    message: 'Authentication failed',
    solution: 'Check Supabase credentials and ensure test user exists'
  },
  'STYLE_001': {
    code: 'STYLE_001',
    message: 'Style inconsistency detected',
    solution: 'Run style validator and check theme tokens'
  },
  'PAGE_001': {
    code: 'PAGE_001',
    message: 'Page creation failed',
    solution: 'Verify route configuration and component imports'
  },
  'QUOTE_001': {
    code: 'QUOTE_001',
    message: 'Quote calculation failed',
    solution: 'Check pricing table and calculation logic'
  },
  'QUIZ_001': {
    code: 'QUIZ_001',
    message: 'Quiz submission failed',
    solution: 'Verify form validation and submission logic'
  },
  'TOOL_001': {
    code: 'TOOL_001',
    message: 'Tool stack operation failed',
    solution: 'Check database permissions and tool data structure'
  }
};

const handleTestError = (error: TestError) => {
  console.error(`Error ${error.code}: ${error.message}`);
  console.log(`Solution: ${error.solution}`);
  
  // Log error to test tracking
  logTestError(error);
  
  // Show error in UI
  showErrorNotification(error);
};
```

## 📝 Test Results & Reporting

### Test Report Generator
```typescript
// utils/test-reporter.ts
interface TestReport {
  timestamp: Date;
  tests: {
    pageCreation: boolean;
    styling: boolean;
    content: boolean;
    auth: boolean;
    database: boolean;
    quoteEngine: boolean;
    roleBuilder: boolean;
    readinessQuiz: boolean;
    toolStack: boolean;
    gamification: boolean;
    aiPrompt: boolean;
    anonymousUser: boolean;
    eventTracking: boolean;
  };
  errors: TestError[];
  performance: {
    pageLoad: number;
    styleRender: number;
    dbQuery: number;
    aiResponse: number;
  };
}

const generateTestReport = async (): Promise<TestReport> => {
  // Run all tests
  const results = await runAllTests();
  
  // Generate report
  const report: TestReport = {
    timestamp: new Date(),
    tests: results,
    errors: collectErrors(),
    performance: measurePerformance()
  };
  
  // Save report
  await saveTestReport(report);
  
  return report;
};
```

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm run test:unit
      - name: Run integration tests
        run: npm run test:integration
      - name: Run E2E tests
        run: npm run test:e2e
```

## 🔐 ACCESS RULES
- Accessible only via environment variable flag: `NEXT_PUBLIC_ENABLE_TEST_DASHBOARD=true`
- Requires valid Supabase session
- Available in **Staging only**, hidden from Production

## 🔧 Test Environment Maintenance

### Regular Tasks
```bash
# Clean test database
npm run test:clean

# Reset test environment
npm run test:reset

# Update test data
npm run test:update-data

# Generate test reports
npm run test:report
```

### Monitoring
```typescript
// utils/test-monitor.ts
const monitorTestEnvironment = () => {
  // Check database health
  checkDatabaseHealth();
  
  // Verify test user accounts
  verifyTestUsers();
  
  // Monitor test performance
  trackTestPerformance();
  
  // Alert on issues
  alertOnIssues();
};
```

## 🔒 Security Considerations

1. **Test Environment Isolation**
   - Separate test database
   - Isolated test users
   - Limited permissions
   - No production data

2. **Access Control**
   - Developer authentication required
   - Role-based access
   - Activity logging
   - IP restrictions

3. **Data Protection**
   - Encrypted test data
   - Regular cleanup
   - No sensitive information
   - Secure connections

## ✅ Best Practices

1. **Test Organization**
   - Group related tests
   - Use descriptive names
   - Follow AAA pattern (Arrange-Act-Assert)
   - Maintain test isolation
   - Use proper setup/teardown

2. **Page Creation Testing**
   - Always test responsive layouts
   - Verify component hierarchy
   - Check style consistency
   - Test dark mode compatibility

3. **Style Testing**
   - Use consistent theme tokens
   - Test all breakpoints
   - Verify animation performance
   - Check accessibility contrast

4. **Content Testing**
   - Verify text rendering
   - Check responsive typography
   - Test content overflow
   - Validate translations

5. **Error Handling**
   - Log all test errors
   - Provide clear solutions
   - Track error patterns
   - Update error documentation

6. **Functionality Testing**
   - Test all user flows
   - Verify data persistence
   - Check API integrations
   - Validate business logic

7. **Test Coverage**
   - Focus on critical paths
   - Test edge cases
   - Test error scenarios
   - Test performance
   - Test security

8. **Test Maintenance**
   - Regular updates
   - Remove obsolete tests
   - Update test data
   - Monitor performance
   - Review coverage

9. **Test Documentation**
   - Clear descriptions
   - Document assumptions
   - Explain test data
   - Document setup
   - Maintain examples

## 🚀 Future Enhancements

1. **Testing Modules**
   - Supabase Storage Upload Tester (file + access rules)
   - Form UX Validator (course submissions, blog CMS)
   - Edge Function Runner (mock API logic calls)
   - Mobile Sim Preview (viewport + touch tester)
   - Feature Flag Toggle Tester

2. **Automated Testing**
   - CI/CD integration
   - Automated reports
   - Performance benchmarks
   - Error tracking

3. **UI Improvements**
   - Better error visualization
   - Real-time preview
   - Component library
   - Style guide integration

4. **Testing Tools**
   - Visual regression testing
   - Load testing
   - Security scanning
   - Accessibility checking 

## Database Testing and Migrations

### Supabase SQL Connection Testing

To ensure smooth operation of the ScaleMate platform, it's essential to test database connections and migrations. The following tests should be executed before deploying any schema changes.

#### Connection Testing

```typescript
// Test connection to Supabase
const testDbConnection = async () => {
  try {
    // Basic connection test
    const { data, error } = await supabase.from('system_health').select('status').limit(1);
    
    if (error) throw error;
    
    console.log('✅ Database connection successful');
    document.getElementById('connection-status').textContent = 'Connected';
    document.getElementById('connection-status').className = 'status-connected';
    
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    document.getElementById('connection-status').textContent = 'Disconnected';
    document.getElementById('connection-status').className = 'status-error';
    
    return { 
      success: false, 
      message: `Connection failed: ${error.message}`,
      error 
    };
  }
};

// Test connection with credentials
const testWithCredentials = async (connectionString) => {
  try {
    const conn = new DatabaseConnection(connectionString);
    const result = await conn.query('SELECT NOW()');
    return { success: true, timestamp: result.rows[0].now };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

#### Migration Testing UI

Our testing platform includes a dedicated panel for SQL migrations:

```html
<div class="test-panel" id="migration-panel">
  <h3>SQL Migration Testing</h3>
  <div class="test-controls">
    <select id="migration-selector">
      <option value="">Select a migration to test</option>
      <!-- Dynamically populated from /supabase/migrations/ -->
    </select>
    <button id="run-migration">Test Migration</button>
    <button id="reset-database">Reset Test DB</button>
  </div>
  <div class="results-container">
    <pre id="migration-results"></pre>
  </div>
</div>
```

### SQL Migration Testing

Following our [SQL Migration System Guidelines](./sql-migration-guide.md), you should test migrations using these commands:

```bash
# Reset local database to test all migrations from scratch
supabase db reset

# View current migration status
supabase migration list

# Test a specific migration (without applying it)
supabase db diff --schema public --file test_migration.sql

# Generate test data for the migration
node scripts/generate-test-data.js --migration=004_add_quotes_table
```

#### Migration Test Process

1. **Prepare Test Database**
   ```javascript
   const prepareTestDb = async () => {
     const statusElement = document.getElementById('test-db-status');
     statusElement.textContent = 'Preparing test database...';
     
     try {
       // Reset to a clean state
       await executeCommand('supabase db reset --test-environment');
       
       // Verify tables exist
       const { data, error } = await supabase.from('migrations').select('name, executed_at').order('executed_at', { ascending: true });
       
       if (error) throw error;
       
       // Display migrations in UI
       const migrationsElement = document.getElementById('applied-migrations');
       migrationsElement.innerHTML = data.map(m => `<li>${m.name} (${new Date(m.executed_at).toLocaleString()})</li>`).join('');
       
       statusElement.textContent = 'Test database ready';
       statusElement.className = 'status-success';
       
       return { success: true, migrations: data };
     } catch (error) {
       statusElement.textContent = `Error: ${error.message}`;
       statusElement.className = 'status-error';
       
       return { success: false, error: error.message };
     }
   };
   ```

2. **Test RLS Policies**
   ```javascript
   const testRlsPolicies = async () => {
     const results = [];
     
     // Test as regular user
     await supabase.auth.signIn({ email: 'test-user@example.com', password: 'test-password' });
     
     // Try to access own data (should succeed)
     const { data: ownData, error: ownError } = await supabase
       .from('profiles')
       .select('*')
       .eq('user_id', (await supabase.auth.getUser()).data.user.id);
       
     results.push({
       test: 'Access own profile',
       success: !ownError,
       details: ownError ? ownError.message : `Retrieved ${ownData.length} rows`
     });
     
     // Try to access another user's data (should fail)
     const { data: otherData, error: otherError } = await supabase
       .from('profiles')
       .select('*')
       .neq('user_id', (await supabase.auth.getUser()).data.user.id)
       .limit(1);
       
     results.push({
       test: 'Access another user profile',
       success: otherError !== null, // Should fail with permission error
       details: otherError ? `Expected error: ${otherError.message}` : 'FAILED: Was able to access other user data'
     });
     
     // Display results
     document.getElementById('rls-test-results').innerHTML = results.map(r => 
       `<div class="test-result ${r.success ? 'success' : 'failure'}">
         <span class="test-name">${r.test}</span>
         <span class="test-details">${r.details}</span>
       </div>`
     ).join('');
     
     return results;
   };
   ```

### Common SQL Testing Errors and Resolutions

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `23505` | Unique violation | Check for duplicate entries in test data |
| `42P01` | Undefined table | Migration order issue or missing table creation |
| `42703` | Undefined column | Column name typo or missing column addition |
| `23503` | Foreign key violation | Ensure referenced data exists |
| `42P07` | Duplicate table | Add `IF NOT EXISTS` to CREATE TABLE |
| `42501` | Permission denied | RLS policy issue or role permissions |

Each of these errors has specific debug steps in the test platform:

```javascript
const handleMigrationError = (error) => {
  const errorCode = error.code;
  const errorMessage = document.getElementById('error-message');
  
  switch(errorCode) {
    case '23505': // Unique violation
      errorMessage.innerHTML = `
        <strong>Unique Constraint Violation:</strong>
        <p>Check for duplicate entries in your test data or seed files.</p>
        <pre>${error.message}</pre>
        <button onclick="showDuplicateChecker()">Run Duplicate Checker</button>
      `;
      break;
      
    case '42P01': // Undefined table
      errorMessage.innerHTML = `
        <strong>Table Not Found:</strong>
        <p>Verify migration order or check for missing table creation.</p>
        <pre>${error.message}</pre>
        <button onclick="showExistingTables()">Show Existing Tables</button>
      `;
      break;
    
    // Other error types...
    
    default:
      errorMessage.innerHTML = `
        <strong>SQL Error:</strong>
        <pre>${error.message}</pre>
        <button onclick="showDetailedError()">Show Debug Details</button>
      `;
  }
};
```

### Migration Script Generator

The testing platform includes a tool to help generate migration fixes based on common patterns:

```javascript
// Sample fix generator for common migration issues
const generateMigrationFix = (issueType, params) => {
  const templates = {
    uniqueConstraint: `
-- Fix for unique constraint violation
ALTER TABLE "${params.table}" 
DROP CONSTRAINT IF EXISTS "${params.constraint}";

ALTER TABLE "${params.table}"
ADD CONSTRAINT "${params.constraint}" 
UNIQUE (${params.columns.join(', ')});
    `,
    
    addColumnIfNotExists: `
-- Add column if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = '${params.table}' 
    AND column_name = '${params.column}'
  ) THEN
    ALTER TABLE "public"."${params.table}" 
    ADD COLUMN "${params.column}" ${params.type} ${params.constraints || ''};
  END IF;
END $$;
    `,
    
    // Other templates...
  };
  
  return templates[issueType] || '-- No template available for this issue type';
};
```

For complete migration testing protocols, refer to our [SQL Migration System Guide](./sql-migration-guide.md). 

## 📚 Related Documents

- [API Documentation](./api-documentation.md) - API testing procedures
- [Architecture Overview](./architecture.md) - System architecture testing
- [Database Guide](./database-guide.md) - Database testing procedures
- [Design System](./design.md) - UI component testing
- [Backup Strategy](./backup-history.md) - Backup testing procedures
- [Security Guidelines](./security.md) - Security testing procedures
- [Deployment Strategy](./deployment.md) - Deployment testing procedures
- [Prompt Engineering](./prompt-engineering.md) - AI-assisted testing
- [In-Memory Bank](./in-memory-bank.md) - State and cache testing

### Memory Bank Documents
- [Active Context](../../memory-bank/activeContext.md) - Current development status and sprint goals
- [Product Context](../../memory-bank/productContext.md) - Product vision, strategy, and feature overview
- [Technical Context](../../memory-bank/techContext.md) - Technology stack and architectural decisions
- [System Patterns](../../memory-bank/systemPatterns.md) - Architecture, implementation patterns, and file structure
- [Project Brief](../../memory-bank/projectbrief.md) - Project overview, objectives, and success criteria
- [Progress Tracking](../../memory-bank/progress.md) - Project milestones and current development status 