# ScaleMate Product Context

## 1. Product Vision & Strategy

ScaleMate is a next-gen business enablement platform that helps founders and operators scale through offshore staffing, automation, and AI integration. It is positioned not as a hiring platform, but as an educational and tactical growth engine. 

Its unique value lies in:
- Giving business owners tools to *design and deploy* their ideal offshore team
- Gamifying their journey from delegation overwhelm → systemized scale
- Acting as a lead generation engine for future backend staffing and service opportunities

### Technical Evolution
- Phase 1: Public tools, user onboarding, lead capture
- Phase 2: Interactive role builders, quiz scoring, gated content
- Phase 3: AI agents, smart automation assistants, partner integrations

### Integration Points
- Supabase (auth, DB, storage, RLS)
- Payoneer (future subscription payments)
- Vercel (frontend deployment)
- OpenAI (AI workflows)

## 2. User Journey & Experience

### User Types:
- **Anonymous Visitor**: Can use quote preview tools, blog content
- **Registered User (Free)**: Unlocks quiz, role builder, tools
- **Premium User**: Unlocks advanced training, downloadable assets
- **Admin**: Manages platform, users, content, lead pipeline

### Key Journeys:
1. Anonymous → Public Page → Auth → Tool Use → Content Unlocks → Scoring → Admin Lead Panel
2. Signup → Role Builder or Readiness Quiz → Get Blueprint
3. User scores XP → Unlocks badges, content, CTA to strategy call
4. Admin views lead quality → triggers CRM pipeline

### Personalization:
- Users tagged by usage, quiz score, engagement
- Suggested tools/content auto-surface in dashboard
- In-platform CTAs adapt to user stage

## 3. Core Features & Functionality

Each feature supports lead qualification and user education.

- **Quick Quote Calculator**
  - Inputs: Role, level, currency
  - Output: Cost savings, monthly rate, CTA to signup
  - Public-facing with teaser data

- **Cost Savings Calculator**
  - Inputs: Local salaries, staff count
  - Output: ROI graph, lead capture option

- **Role Builder Wizard**
  - Inputs: Department → Tasks → AI-enhanced JD output
  - Output: PDF blueprint
  - Requires login

- **Readiness Quiz**
  - Interactive form → Readiness score
  - Output: Score + resource unlocks
  - Triggers lead segmentation

- **Tool Library**
  - Browse tools by function
  - Save to stack
  - Filters: Ops, AI, Marketing

- **Course Library**
  - Free & Premium content
  - Gamified with XP + badges

- **Blog System**
  - SEO-optimized, AI-written content
  - Includes structured metadata, author models

- **Gamified Dashboard**
  - Progress tracking, unlockables, user nudges

## 4. Technical Architecture

- **Frontend**: Next.js + TypeScript  
- **UI**: Tailwind CSS + ShadCN  
- **Backend**: Supabase (Postgres, Edge Functions, RLS)  
- **Hosting**: Vercel  
- **AI**: OpenAI, future Claude integrations

### System Flow:
Anonymous → Public Page → Auth → Tool Use → Content Unlocks → Scoring → Admin Lead Panel

### Auth:
- Supabase Auth
- RLS policies per user type
- Admin login via secure role policy

## 5. Content Management

- Stored in Supabase Buckets (PDFs, images, video)
- Course content tied to metadata (level, tags, premium)
- Blog content via markdown w/ AI metadata enrichment
- Admin can version resources + archive
- Tools: markdown editor + CMS fields

## 6. Analytics & Tracking

- Track all activity: blog views, button clicks, time on page
- Events: quote view, quiz score, tool opens, course start
- Tracked via Supabase + optional Segment
- Lead Scoring: combines quiz, usage depth, XP, profile completion
- Admin dashboard shows: recent activity, readiness funnel, download logs

## 7. AI & Automation Components

- AI Role Builder: Prompt-based JD creation
- Smart CTAs: Suggest action based on usage
- AI course module summarizers (later phase)
- AI agent preview: Simulate VA/AI workflows
- AI to manage quotes, content, communication, and smart calculations for all tools

## 8. Security & Compliance

- Supabase RLS for secure row access
- GDPR-style email opt-in
- Sensitive data (lead notes, PDFs) scoped to user
- Admin logging of all platform writes
- Backups via Supabase + Vercel deploy history

## 9. Performance Requirements

- Target: 50K MAU, scalable via edge functions
- Response time: <300ms for tool use
- Blog + Tool caching via Vercel
- Dynamic quote logic isolated in edge functions

## 10. Testing Strategy

- All tools first deployed to Test Dashboard with easy toggle for:
  - Anonymous user simulation
  - 1-click user creation
  - Tracking test flows
  - Course and quote tool testing
- Unit tests for quote logic, quiz, role builder
- UI snapshot testing via Playwright or Cypress
- Load testing for public tools
- QA panel in test platform: run triggers + view output
- Manual user flow review before each deploy

## 11. Data Models & Relationships

### User Data
- Profile: Basic info, preferences, subscription status
- Activity: Tool usage, content consumption, quiz results
- Progress: XP points, badges, unlocked content
- Lead Score: Calculated from engagement metrics

### Content Data
- Courses: Modules, lessons, resources, premium flags
- Tools: Configuration, inputs, outputs, access levels
- Blog: Posts, categories, metadata, author info
- Templates: Role descriptions, workflows, checklists

### Analytics Data
- Events: User actions, timestamps, context
- Metrics: Calculated values, aggregated stats
- Reports: Generated insights, visualizations
- Alerts: Threshold-based notifications

## 12. API Structure

### Public Endpoints
- Quote calculator
- Blog content
- Public tools preview
- Authentication flows

### Protected Endpoints
- User profile management
- Tool access and configuration
- Content delivery
- Progress tracking

### Admin Endpoints
- User management
- Content management
- Analytics access
- System configuration

## 13. Deployment Strategy

### Environments
- Development: Feature branches, local testing
- Staging: Pre-production validation
- Production: Live environment

### CI/CD Pipeline
- Automated testing on PR
- Staging deployment on merge to main
- Production deployment on release tags
- Rollback procedures

### Monitoring
- Error tracking via Sentry
- Performance monitoring via Vercel
- Database monitoring via Supabase
- Custom event tracking for business metrics 

## 📚 Related Documents

### Memory Bank Documents
- [Active Context](./activeContext.md) - Current development status and sprint goals
- [Technical Context](./techContext.md) - Technology stack and architectural decisions
- [System Patterns](./systemPatterns.md) - Architecture, implementation patterns, and file structure
- [Project Brief](./projectbrief.md) - Project overview, objectives, and success criteria
- [Progress Tracking](./progress.md) - Project milestones and current development status

### Project Outlines
- [API Documentation](../docs/project-outlines/api-documentation.md) - API structure and endpoints
- [Architecture Overview](../docs/project-outlines/architecture.md) - System architecture and design
- [Database Guide](../docs/project-outlines/database-guide.md) - Database schema and operations
- [Design System](../docs/project-outlines/design.md) - UI/UX design principles and components
- [Testing Platform](../docs/project-outlines/testing.md) - Testing methodologies and tools
- [Backup Strategy](../docs/project-outlines/backup-history.md) - Data backup and recovery
- [Security Guidelines](../docs/project-outlines/security.md) - Security principles and implementation
- [Deployment Strategy](../docs/project-outlines/deployment.md) - Deployment process and environments
- [In-Memory Bank](../docs/project-outlines/in-memory-bank.md) - Caching and state management
- [Prompt Engineering](../docs/project-outlines/prompt-engineering.md) - AI prompt design and optimization 