# ScaleMate Technical Context

## Technology Stack

### Frontend
- Next.js 14+ (TypeScript)
- Tailwind CSS
- ShadCN UI Components
- React Query
- Zustand (State Management)

### Backend
- Next.js API Routes
- Supabase
  - PostgreSQL Database
  - Authentication
  - Real-time subscriptions
  - Storage
- OpenAI API
- Postmark (Email)

### Development Tools
- TypeScript
- ESLint
- Prettier
- Jest
- Cypress
- GitHub Actions

## Architecture

### System Design
1. Frontend Architecture
   - Component-based structure
   - Atomic design principles
   - Server-side rendering
   - Static site generation
   - API route handlers

2. Backend Architecture
   - RESTful API design
   - GraphQL considerations
   - WebSocket integration
   - Queue system
   - Caching strategy

3. Database Design
   - Schema design
   - Indexing strategy
   - Migration management
   - Backup procedures
   - Data partitioning

4. Security Architecture
   - Authentication flow
   - Authorization rules
   - Data encryption
   - API security
   - Rate limiting

## Development Guidelines

### Code Standards
1. TypeScript
   - Strict mode
   - Type safety
   - Interface definitions
   - Generic types
   - Utility types

2. Component Structure
   - Atomic design
   - Props interface
   - State management
   - Error boundaries
   - Loading states

3. Testing Strategy
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance tests
   - Security tests

4. Documentation
   - Code comments
   - API documentation
   - Component documentation
   - Setup guides
   - Deployment guides

## Performance Considerations

### Optimization
1. Frontend
   - Code splitting
   - Lazy loading
   - Image optimization
   - Bundle size
   - Cache strategy

2. Backend
   - Query optimization
   - Connection pooling
   - Rate limiting
   - Caching
   - Load balancing

3. Database
   - Index optimization
   - Query performance
   - Connection management
   - Data partitioning
   - Backup strategy

4. Monitoring
   - Error tracking
   - Performance metrics
   - User analytics
   - System health
   - Resource usage

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes
│   ├── (marketing)/      # Public marketing pages
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/               # Shared UI components
│   └── features/         # Feature-specific components
├── features/             # Feature modules
│   ├── quote/            # Quote calculator feature
│   ├── quiz/             # Readiness quiz feature
│   ├── role-builder/     # Role builder feature
│   └── dashboard/        # User dashboard feature
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
│   ├── db/               # Database utilities
│   ├── prompts/          # AI prompt templates
│   └── utils/            # General utilities
├── schemas/              # Zod validation schemas
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── config/               # Configuration files
```

## Database Schema

### Core Tables

- **users**
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT,
    company TEXT,
    role TEXT,
    subscription_status TEXT DEFAULT 'free',
    xp_points INTEGER DEFAULT 0,
    readiness_score INTEGER,
    lead_score INTEGER
  );
  ```

- **user_events**
  ```sql
  CREATE TABLE user_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    event_type TEXT NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **tools**
  ```sql
  CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    access_level TEXT DEFAULT 'free',
    config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **courses**
  ```sql
  CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'beginner',
    access_level TEXT DEFAULT 'free',
    xp_reward INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **course_modules**
  ```sql
  CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id),
    title TEXT NOT NULL,
    content TEXT,
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **user_progress**
  ```sql
  CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    content_type TEXT NOT NULL,
    content_id UUID NOT NULL,
    status TEXT DEFAULT 'not_started',
    progress_percentage INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **badges**
  ```sql
  CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    criteria JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- **user_badges**
  ```sql
  CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    badge_id UUID REFERENCES badges(id),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

## API Endpoints

### Public Endpoints

- `GET /api/quote/calculate` - Calculate cost savings
- `GET /api/blog` - Get blog posts
- `GET /api/tools/public` - Get public tools

### Protected Endpoints

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/tools` - Get available tools
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/courses` - Get available courses
- `GET /api/courses/:id` - Get course details
- `POST /api/progress/update` - Update progress
- `GET /api/badges` - Get user badges

### Admin Endpoints

- `GET /api/admin/users` - Get all users
- `GET /api/admin/analytics` - Get analytics data
- `POST /api/admin/content` - Create/update content
- `GET /api/admin/leads` - Get qualified leads

## Authentication Flow

1. User signs up with email/password or magic link
2. Supabase Auth creates user record
3. JWT token issued and stored in secure HTTP-only cookie
4. Token refreshed automatically via Supabase client
5. RLS policies enforce access control based on user role

## Component Library

- **Button**: Primary, Secondary, Tertiary variants
- **Input**: Text, Number, Select, Checkbox, Radio
- **Card**: Standard, Interactive, Feature
- **Modal**: Standard, Confirmation, Form
- **Toast**: Success, Error, Info, Warning
- **Tabs**: Standard, Pills
- **Accordion**: Standard, Custom
- **Progress**: Linear, Circular
- **Badge**: Standard, Interactive
- **Avatar**: User, Company
- **Table**: Standard, Sortable, Paginated
- **Form**: Standard, Multi-step
- **Chart**: Line, Bar, Pie, Area

## State Management

- **User State**: React Context for global user data
- **UI State**: Local state with useState/useReducer
- **Form State**: React Hook Form
- **Server State**: SWR/React Query for data fetching
- **Cache**: In-memory cache for frequently accessed data

## Error Handling

- **Client-side**: Global error boundary + feature-level error handling
- **API**: Consistent error response format
- **Validation**: Zod schemas for all inputs
- **Logging**: Structured logging to Postgres + Vercel logs

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90 for all metrics
- **API Response Time**: < 300ms for 95th percentile
- **Database Query Time**: < 100ms for 95th percentile

## Testing Requirements

- **Unit Tests**: 80% coverage for business logic
- **Integration Tests**: All API endpoints and data flows
- **E2E Tests**: Critical user journeys
- **UI Tests**: All component variants and states
- **Performance Tests**: Load testing for public endpoints

## Security Requirements

- **Authentication**: Supabase Auth with JWT
- **Authorization**: Row Level Security (RLS)
- **Input Validation**: Zod schemas for all inputs
- **Output Encoding**: HTML escaping for all user-generated content
- **HTTPS**: Enforced for all connections
- **CORS**: Strict origin policy
- **Rate Limiting**: 100 requests per minute per IP
- **Data Encryption**: At-rest encryption for sensitive data

## Deployment Process

1. Code pushed to GitHub
2. Automated tests run
3. Build process creates optimized bundle
4. Preview deployment for PRs
5. Staging deployment on merge to main
6. Production deployment on release tag
7. Post-deployment health checks

## Monitoring Setup

- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Vercel Analytics
- **User Analytics**: Custom event tracking in Postgres
- **Database Monitoring**: Supabase dashboard
- **Uptime Monitoring**: External service checks

## AI Integration

- **Prompt Templates**: Stored in `/lib/prompts/`
- **API Configuration**: Environment variables for API keys
- **Rate Limiting**: 10 requests per minute per user
- **Fallback Strategy**: Cached responses for API failures
- **Token Usage**: Tracked and logged for cost management

## �� Related Documents

### Memory Bank Documents
- [Active Context](./activeContext.md) - Current development status and sprint goals
- [Product Context](./productContext.md) - Product vision, strategy, and feature overview
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