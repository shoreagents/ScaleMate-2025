# 🧩 System Patterns

This document defines the **architecture, implementation patterns, file structure, and dev rules** for the ScaleMate platform — used by both Cursor and human devs.

---

## 1. Architectural Patterns

### TypeScript-First Stack
- All components, hooks, pages, and logic are written in **TypeScript**
- Shared types live in `/types/` or `/schemas/`
- Enforced via `tsconfig.json` with `strict: true`
- Used in:
  - Component props and logic
  - Edge Functions
  - Form schemas and API payloads

### Monolithic App w/ Modular Design
- Framework: **Next.js (App Router)** with **Supabase backend**
- Reason: unified build, instant deploy via Vercel, ideal for B2B SaaS UX
- Modules follow **feature-first structure** to simulate microservices

### Event-Driven Architecture (Lite)
- Key Events: `quote_requested`, `quiz_submitted`, `resource_downloaded`, `course_started`
- Strategy: Inserted into a `user_events` table; later triggers scoring, emails, or AI nudges

### CQRS Consideration
- Read-heavy system; slight CQRS via separate DB views for admin analytics vs. user-facing tools
- No full write/read separation needed yet, but structure supports future async updates

---

## 2. Design Patterns

### Component Patterns
- Atomic Design: atoms (buttons), molecules (form groups), organisms (quote form)
- Shared in `/components/ui/`, organized by type and feature

### State Management
- Local: `useState`, `useReducer`
- Global: Minimal use of React Context for user/profile data
- Preference for server-side hydration via Supabase sessions

### Data Fetching
- `useQuery` (SWR / React Query in later phase)
- Optimistic updates in forms (quotes, role builder)
- Error handling via toast + inline error zones

### Form Handling
- `react-hook-form` + `zod` validation
- Centralized validation schema per feature
- Auto-reset, error bubbles, inline submit state

---

## 3. Code Organization

### TypeScript Usage
- All `.tsx` for components, `.ts` for logic
- Shared types across frontend and backend
- Zod schemas infer types for safety and reuse
- Supabase responses and inserts are typed using custom interfaces

### Feature-Based Folder Structure
- `/features/quote/`, `/features/quiz/`, `/features/dashboard/`
- Shared: `/components/ui/`, `/lib/`, `/hooks/`, `/schemas/`, `/db/`

### Module Boundaries
- All state + logic scoped to feature dir
- Reusable logic abstracted to `/lib/` or `/hooks/`
- No shared mutation logic across features without wrapping function

---

## 4. API Design Patterns

- REST-style endpoints inside `/app/api/` or Supabase edge functions
- JSON response, 200 for success, 4xx/5xx for errors
- Status codes + message in every response: `{ status, message, data }`
- Edge Functions for: quote engine, AI prompts, scoring logic

---

## 5. Database Patterns

### Access Layer
- Supabase SDK w/ `db.ts` interface
- All inserts scoped to `auth.uid()`
- No direct admin writes without elevated role check

### Schema
- Relational Postgres
- Normalized, with some JSON columns (e.g. `quiz_meta`, `tool_config`)
- Indexes on foreign keys, user_id, slugs, timestamps

### Migrations
- SQL-based, via `/migrations/` folder
- Naming: `001_init_schema.sql`, `002_add_readiness_scores.sql`
- Backup on each deploy, rollback via `down.sql` pairs

---

## 6. Authentication & Authorization

### Auth Flow
- Supabase email/password + magic link
- JWTs for session context, auto-refresh enabled
- Admins use separate elevated role with session flag

### RBAC
- Roles: `anon`, `user`, `premium`, `admin`
- RLS per table (e.g. `user_id = auth.uid()` for quotes, events)
- Admin bypass via `IS_MEMBER_OF('admin')`

---

## 7. Error Handling

### UI-Level
- Global error boundary for fatal errors
- Feature-level catch blocks
- Toast system for transient/user errors

### API-Level
- Try/catch in every endpoint + Edge Function
- Response format: `{ status: 'error', message, code }`
- Logging planned via Postgres or Vercel logs

---

## 8. Testing Patterns

- Unit tests for logic (quote, quiz scoring)
- Cypress for E2E (auth, user journey, XP flow)
- Playwright snapshot tests for UI regressions
- QA Test Dashboard for tool previews

---

## 9. Performance Optimization

### Frontend
- Code splitting by route
- Lazy loading for heavy panels (Role Builder, Quiz)
- SVG + CDN for assets

### Backend
- Edge Functions isolate load from DB
- Indexes, upserts, conditional joins
- Batch inserts (e.g. quiz results, events)

---

## 10. Security

- Input: `zod` validation client + server
- Output: HTML escaping, no dangerous innerHTML
- HTTPS enforced
- Supabase policies enforced on every DB interaction
- Auth cookie scoped + secure

---

## 11. Deployment Patterns

- CI/CD: GitHub → Vercel
- Feature flags via `.env`
- Preview branches auto-deploy to Vercel preview links
- Manual staging approvals before production

---

## 12. Monitoring & Logging

- Activity tracked in `user_events` table
- Admin view of user interactions
- Vercel analytics + optional Logflare for errors
- AI prompt logging via `ai_logs` table

---

## 13. AI Integration Patterns

### Prompt Management
- Centralized prompt templates in `/lib/prompts/`
- Version-controlled with semantic versioning
- A/B testing capability for prompt effectiveness

### AI Service Integration
- OpenAI API integration via Edge Functions
- Rate limiting and token usage tracking
- Fallback mechanisms for API failures

### AI Response Handling
- Structured response parsing with Zod schemas
- Error handling for malformed AI responses
- Caching strategies for expensive AI operations

---

## 14. Content Management Patterns

### Course Content
- Markdown-based with frontmatter for metadata
- Versioned in Git with content history
- Rendered via MDX with custom components

### Tool Templates
- JSON-based configuration for tools
- Versioned with semantic versioning
- Admin UI for template management

### Blog Content
- Markdown with AI-enhanced metadata
- SEO optimization patterns
- Content scheduling and publishing workflow

---

## 15. Gamification Patterns

### XP System
- Centralized XP calculation service
- Event-based XP awards
- Level progression with rewards

### Badge System
- Achievement definitions in database
- Event listeners for badge triggers
- Badge display and notification system

### Progress Tracking
- Progress calculation based on completion
- Visual progress indicators
- Personalized next steps recommendations 

## 📚 Related Documents

### Memory Bank Documents
- [Active Context](./activeContext.md) - Current development status and sprint goals
- [Product Context](./productContext.md) - Product vision, strategy, and feature overview
- [Technical Context](./techContext.md) - Technology stack and architectural decisions
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