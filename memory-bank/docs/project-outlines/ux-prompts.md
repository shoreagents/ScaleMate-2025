# 🤖 ScaleMate UX Prompts

**Version**: v1.0.0  
**Last Updated**: 2024-04-08

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prompt Memory Rules](#prompt-memory-rules)
3. [Prompt Design Principles](#prompt-design-principles)
4. [User Interaction Models](#user-interaction-models)
5. [Core Prompt Patterns](#core-prompt-patterns)
6. [Role-Specific Prompts](#role-specific-prompts)
7. [Tool-Specific Prompts](#tool-specific-prompts)
8. [Voice & Tone Guidelines](#voice--tone-guidelines)
9. [Prompt Testing Framework](#prompt-testing-framework)
10. [Success Metrics](#success-metrics)
11. [Related Documents](#related-documents)
12. [Page-Specific Behavior](#page-specific-behavior)
13. [Component Templates](#component-templates)
14. [User Flow Patterns](#user-flow-patterns)

## 📝 Overview

This document defines the UX prompt patterns and guidelines for AI interactions within the ScaleMate platform. It serves as the central reference for designers, developers, and content creators to ensure consistent, effective, and on-brand AI interactions across the user experience.

## 🧩 Prompt Memory Rules

### Page Context Rules
- If `page is public` → no full dashboard shell, use conversion-first layout
- If `page is for logged-in user` → use XP, tool states, and dashboard layout
- If `page is for admin` → ignore gamification, focus on functional control panel

### User Journey Alignment
- Every page prompt must include:
  - User type (Anonymous, Free, Power, Admin)
  - Expected behavior
  - Key CTA (Call to Action)
- Match each interaction to journey stages:
  1. Anonymous → Free
  2. Free → Power User
  3. Power User → Lead Ready
  4. Lead Ready → Customer

### State-Based Modifications
- Public pages: Focus on conversion and value demonstration
- Authenticated pages: Emphasize progression and tool utility
- Admin pages: Prioritize functionality and data insights

## 🎯 Prompt Design Principles

### Human-Centered Design
- Focus on user needs, not AI capabilities
- Address actual pain points in offshore staffing
- Prioritize clarity over technical sophistication
- Optimize for user satisfaction over model performance

### Scaffolded Interactions
- Start with simple, guided prompts
- Progressively increase complexity as users gain familiarity
- Provide examples and templates for unfamiliar tasks
- Surface contextual help at potential confusion points

### Bias Mitigation
- Regularly review prompts for unintended bias
- Test prompts with diverse user personas
- Avoid demographic assumptions in language
- Ensure equitable outcomes across user groups

### Trust Building
- Set clear expectations about AI capabilities
- Provide transparent explanations of AI-generated content
- Allow users to verify and modify AI outputs
- Gracefully handle edge cases and errors

## 🔄 User Interaction Models

### 1. Direct Prompting
Users explicitly enter prompts to receive AI assistance.

**Implementation**:
```typescript
// Direct prompt component
const DirectPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const handleSubmit = async () => {
    const result = await aiService.getCompletion(prompt);
    setResponse(result);
  };
  
  return (
    <div className="prompt-container">
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the ideal executive assistant role..."
      />
      <button onClick={handleSubmit}>Generate</button>
      {response && <div className="response">{response}</div>}
    </div>
  );
};
```

### 2. Guided Prompting
Structured input fields and options that generate prompts behind the scenes.

**Implementation**:
```typescript
// Guided prompt component for role builder
const GuidedRolePrompt = () => {
  const [department, setDepartment] = useState('');
  const [seniority, setSeniority] = useState('');
  const [skills, setSkills] = useState([]);
  const [response, setResponse] = useState('');
  
  const handleGenerate = async () => {
    const promptTemplate = `Create a job description for a ${seniority} role in ${department} with the following skills: ${skills.join(', ')}`;
    const result = await aiService.getCompletion(promptTemplate);
    setResponse(result);
  };
  
  return (
    <div className="guided-prompt">
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select Department</option>
        <option value="Marketing">Marketing</option>
        <option value="Operations">Operations</option>
        <option value="Sales">Sales</option>
      </select>
      
      <select value={seniority} onChange={(e) => setSeniority(e.target.value)}>
        <option value="">Select Seniority</option>
        <option value="Junior">Junior</option>
        <option value="Mid-level">Mid-level</option>
        <option value="Senior">Senior</option>
      </select>
      
      <SkillSelector 
        selectedSkills={skills} 
        onChange={setSkills} 
      />
      
      <button onClick={handleGenerate}>Create Role Description</button>
      
      {response && <div className="response">{response}</div>}
    </div>
  );
};
```

### 3. Contextual Assistance
AI offers help based on user actions without explicit prompting.

**Implementation**:
```typescript
// Contextual assistant for dashboard
const ContextualAssistant = ({ userActivity, userProgress }) => {
  const [suggestion, setSuggestion] = useState('');
  
  // Monitor user activity and provide contextual help
  useEffect(() => {
    const generateSuggestion = async () => {
      const promptTemplate = `The user has ${userActivity.lastAction} and has completed ${userProgress.completedItems}. Their next logical step would be:`;
      const result = await aiService.getCompletion(promptTemplate);
      setSuggestion(result);
    };
    
    if (shouldShowSuggestion(userActivity, userProgress)) {
      generateSuggestion();
    }
  }, [userActivity, userProgress]);
  
  return suggestion ? (
    <div className="contextual-tip">
      <Icon name="lightbulb" />
      <p>{suggestion}</p>
      <button>Try This</button>
    </div>
  ) : null;
};
```

### 4. Interactive Refinement
Users and AI collaborate through iterative refinement cycles.

**Implementation**:
```typescript
// Interactive refinement for role builder
const InteractiveRoleRefiner = () => {
  const [iterations, setIterations] = useState([
    { prompt: 'Initial role description', response: 'Generated initial draft...' }
  ]);
  const [currentFeedback, setCurrentFeedback] = useState('');
  
  const handleRefine = async () => {
    const lastIteration = iterations[iterations.length - 1];
    const promptTemplate = `Refine this role description based on the feedback: 
      Original description: ${lastIteration.response}
      Feedback: ${currentFeedback}`;
    
    const result = await aiService.getCompletion(promptTemplate);
    
    setIterations([
      ...iterations,
      { prompt: currentFeedback, response: result }
    ]);
    setCurrentFeedback('');
  };
  
  return (
    <div className="interactive-refiner">
      <div className="iterations">
        {iterations.map((iteration, index) => (
          <div key={index} className="iteration">
            {index > 0 && <div className="feedback">{iteration.prompt}</div>}
            <div className="response">{iteration.response}</div>
          </div>
        ))}
      </div>
      
      <textarea
        value={currentFeedback}
        onChange={(e) => setCurrentFeedback(e.target.value)}
        placeholder="What would you like to change about this role description?"
      />
      
      <button onClick={handleRefine}>Refine Description</button>
    </div>
  );
};
```

## 📋 Core Prompt Patterns

### Information Extraction
Extracting structured data from user inputs.

**Template**:
```
Extract the following information from the user input:
- Role type
- Required skills
- Experience level
- Primary responsibilities

User input: {{user_input}}
```

**Example Implementation**:
```typescript
const extractJobDetails = async (userInput) => {
  const prompt = `
    Extract the following information from the user input:
    - Role type
    - Required skills
    - Experience level
    - Primary responsibilities
    
    User input: ${userInput}
  `;
  
  const result = await aiService.getCompletion(prompt);
  return parseExtractedData(result);
};
```

### Explanation Generation
Creating clear explanations of concepts or processes.

**Template**:
```
Explain {{concept}} in simple terms for someone who is considering offshore staffing.
Focus on practical implications and benefits. Use 2-3 short paragraphs.
```

**Example Implementation**:
```typescript
const generateExplanation = async (concept) => {
  const prompt = `
    Explain ${concept} in simple terms for someone who is considering offshore staffing.
    Focus on practical implications and benefits. Use 2-3 short paragraphs.
  `;
  
  return await aiService.getCompletion(prompt);
};
```

### Recommendation Generation
Providing personalized recommendations based on user data.

**Template**:
```
Based on the following information about the user:
- Business size: {{business_size}}
- Industry: {{industry}}
- Current staff: {{current_staff}}
- Budget: {{budget}}
- Goals: {{goals}}

Recommend:
1. The most suitable offshore roles to start with
2. Suggested team structure
3. Implementation timeline
```

**Example Implementation**:
```typescript
const generateRecommendations = async (userData) => {
  const { businessSize, industry, currentStaff, budget, goals } = userData;
  
  const prompt = `
    Based on the following information about the user:
    - Business size: ${businessSize}
    - Industry: ${industry}
    - Current staff: ${currentStaff}
    - Budget: ${budget}
    - Goals: ${goals}
    
    Recommend:
    1. The most suitable offshore roles to start with
    2. Suggested team structure
    3. Implementation timeline
  `;
  
  return await aiService.getCompletion(prompt);
};
```

### Content Transformation
Converting content from one format to another.

**Template**:
```
Transform the following rough notes into a professional {{document_type}}:

Notes:
{{user_notes}}

Format as a properly structured {{document_type}} with appropriate sections and professional language.
```

**Example Implementation**:
```typescript
const transformContent = async (userNotes, documentType) => {
  const prompt = `
    Transform the following rough notes into a professional ${documentType}:
    
    Notes:
    ${userNotes}
    
    Format as a properly structured ${documentType} with appropriate sections and professional language.
  `;
  
  return await aiService.getCompletion(prompt);
};
```

## 👥 Role-Specific Prompts

### Public Pages (Anonymous Users)

#### Homepage (`/`)
```plaintext
Create a sleek, modern SaaS-style homepage for a B2B platform called ScaleMate.

ScaleMate helps businesses scale through offshore staffing and AI tools. The homepage must clearly communicate its value proposition, highlight its tools, and encourage users to try the Quick Quote tool or sign up for a free account.

### Audience:
- Founders, operators, agencies, real estate teams, SaaS teams
- Located primarily in USA, Australia, New Zealand

### Style:
- Clean, premium SaaS look (inspired by Linear, Stripe, Notion)
- Light mode default, with optional dark mode
- Playful but smart (not too corporate)

### Sections to include:
1. **Hero Section** – Headline, Subtext, CTA
2. **Mini Quick Quote Calculator (Teaser)** – Basic role + cost preview
3. **How It Works** – Discover → Plan → Execute visual
4. **Platform Feature Grid** – Highlight each major tool
5. **Cost Comparison Graphic** – e.g., "Admin from $780/mo"
6. **Recent Blog Teasers** – Pull top articles
7. **Trust Signals** – Testimonials, logos, etc
8. **Final CTA Banner** – "Ready to Scale Without Burnout?"

### Notes:
- Sticky nav with Quote + Tools
- Mobile-first layout
- Blog CTA links to ScaleMate AI content
```

#### Cost Savings Calculator (`/cost-savings`)
```plaintext
Design a calculator page that compares local salaries vs offshore equivalents.

### Goal:
- Show cost justification with real inputs
- Drive conversion to signup/download

### Layout:
1. Hero with simple CTA
2. Repeatable input rows (Role, Salary, Count)
3. Graph output (monthly/annual savings)
4. CTA to download detailed blueprint (email gate)
5. Strategy call bonus CTA

### Notes:
- Pull currency from global header selector
- Graph output can use Supabase values
```

#### Quick Quote Tool (`/quote`)
```plaintext
Design a single-role calculator to give an instant offshore quote.

### Goal:
- Deliver perceived value quickly
- Use results to convert to signup

### Layout:
1. Input form (Role, Experience, Tasks, Count)
2. Teaser output (Offshore monthly cost)
3. CTA to view full blueprint (email gate)
4. Bonus download: Offload Bible

### Notes:
- Task selection improves pricing logic
- Anonymous users saved in Supabase w/ tracking
```

#### Role Builder Wizard (Intro) (`/role-builder`)
```plaintext
Landing page for the Role Builder tool that explains the benefits before signup.

### Goal:
- Warm user up with how it works
- Offer sample blueprint download
- Drive them to login/signup

### Layout:
1. Hero: "Build Your Next Offshore Role in Minutes"
2. Visual steps walkthrough (Dept → Tasks → Tools → Output)
3. Output preview (Job Description, Cost)
4. Bonus bundle (templates + delegation planner)
5. CTA: "Start Building" or "See Sample"
```

#### Outsourcing Readiness Quiz (`/readiness`)
```plaintext
Quiz-based assessment of how ready the business is to outsource and delegate.

### Goal:
- Educate and qualify the user
- Create personalized action plan
- Convert to signup to unlock plan

### Layout:
1. Hero headline + CTA
2. Quiz: 7–10 questions across team, tools, SOPs
3. Results: Score + summary label
4. Gated action plan: PDF or dashboard unlock
5. Gamification: XP, badge, bonus resource
```

#### AI + Automation Tool Library (`/tools`)
```plaintext
Curated tool directory for business owners, sorted by use case.

### Goal:
- Inspire with tools we use
- Encourage saving to stack (after login)

### Layout:
1. Hero: "Discover the AI Stack Behind Modern Teams"
2. Filters: Role, Tool Type, Difficulty
3. Cards: Logo, Name, Summary, Tags
4. Detail modal or subpage
5. CTA: Add to My Stack → login/signup
6. Sidebar display ads (internal CTAs)
```

#### Free Download Library (`/resources`)
```plaintext
Free lead magnet content hub with high-value PDF downloads.

### Includes:
- Offload Bible
- Task Delegation Playbook
- Role Blueprint Templates
- SOP Starters

### Layout:
1. Hero + CTA
2. Cards with download gates
3. Email prompt or login wall
4. Bonus CTA: Book a strategy call
5. Related blog/tool under each
```

#### Free + Premium Course Library (`/courses`)
```plaintext
Library of self-paced learning to guide users through scaling, delegation, AI, and outsourcing.

### Goal:
- Educate for conversion
- Gamify learning

### Layout:
1. Hero: "Learn to Scale Like a Pro"
2. Filter: Topics + Levels
3. Cards: Thumbnail, Title, Progress
4. CTA: Unlock All / Continue Learning
5. Preview premium content or upsell
```

#### SEO Blog Index (`/blog`)
```plaintext
Main content marketing hub with longform posts.

### Goal:
- Drive traffic via SEO
- Educate users organically
- Feed related tool/resource offers

### Layout:
1. Hero headline + CTA
2. Filter by category/tag
3. Blog cards: Image, Title, Author, Time
4. Sticky sidebar: Resource promos, quote CTAs

### Notes:
- Schema.org article + breadcrumbs
- Blog posts generated by AI + edited manually
```

#### Blog Article View (`/blog/[slug]`)
```plaintext
Single SEO blog post with structured content and embedded CTA logic.

### Goal:
- Engage reader with valuable longform post
- Offer relevant lead magnet / product CTAs

### Layout:
1. Hero w/ title, author, read time
2. Full article w/ formatting + visual content
3. Sticky ads / bonus CTA (Offload Bible, Courses)
4. Related content block
5. Chat With ScaleMate AI widget on scroll
```

#### About ScaleMate (`/about`)
```plaintext
Company story page to build trust, show mission, and connect with users emotionally.

### Layout:
1. Hero: Why We Built ScaleMate
2. Mission statement
3. Story: How it started
4. Values section (cards)
5. Team (optional visuals)
6. CTA: Try a Tool / Book Call
```

#### Contact / Book a Strategy Call (`/contact`)
```plaintext
Contact + booking interface for inquiries or live planning session.

### Layout:
1. Hero: "Talk to a Real Human"
2. Form: Name, Email, Message Type
3. Booking widget (Calendly or custom)
4. FAQ + timezone map (optional)
5. Follow-up CTA block

### Notes:
- Sends to Supabase + alerts admin
- Can redirect to quote or dashboard
```

### Authenticated Pages (Logged-in Users)

#### Dashboard (`/dashboard`)
```plaintext
Purpose: Central command center
Primary Goal: Provide quick access to key features

Key Components:
- Activity Overview:
  * Recent actions
  * Team updates
  * Task progress
  * Notifications

Quick Actions:
- Create new role
- Generate quote
- Access templates
- View analytics

User Journey Focus:
- Efficient navigation
- Progress tracking
- Action acceleration
- Feature discovery
```

#### Full Role Builder (`/role-builder`)
```plaintext
Purpose: Comprehensive role creation suite
Primary Goal: Enable detailed role planning

Key Components:
- Multi-step Wizard:
  * Role basics
  * Skill requirements
  * Experience mapping
  * Task definition
  * Team integration

AI Features:
- Smart suggestions
- Market analysis
- Skill optimization
- Task automation

User Journey Focus:
- Guided creation
- AI assistance
- Quality assurance
- Team alignment
```

#### Course Dashboard (`/courses`)
```plaintext
Purpose: Learning and development hub
Primary Goal: Enable skill development

Key Components:
- Course Library:
  * Available courses
  * Progress tracking
  * Certifications
  * Learning paths

Interactive Features:
- Course search
- Progress tracking
- Achievement badges
- Learning resources

User Journey Focus:
- Skill development
- Progress tracking
- Achievement recognition
- Continuous learning
```

#### Team Planner (`/team-planner`)
```plaintext
Purpose: Team composition and structure planning
Primary Goal: Optimize team structure for offshore integration

Key Components:
- Team Visualization:
  * Org chart builder
  * Role mapping
  * Reporting structure
  * Communication flow

Planning Tools:
- Cost optimization
- Skill distribution
- Workload balancing
- Timeline planning

User Journey Focus:
- Strategic planning
- Resource optimization
- Team alignment
- Implementation readiness
```

#### Task Delegation Framework (`/delegation`)
```plaintext
Purpose: Structured approach to task delegation
Primary Goal: Create effective delegation strategies

Key Components:
- Delegation Matrix:
  * Task categorization
  * Responsibility levels
  * Authority mapping
  * Communication protocols

Framework Tools:
- Task templates
- Checklist generators
- SOP builders
- Communication guides

User Journey Focus:
- Clear delegation
- Process standardization
- Quality assurance
- Team empowerment
```

#### Analytics Dashboard (`/analytics`)
```plaintext
Purpose: Performance and ROI tracking
Primary Goal: Measure and optimize offshore team performance

Key Components:
- Performance Metrics:
  * Productivity tracking
  * Quality assessment
  * Cost analysis
  * ROI calculation

Visualization Tools:
- Custom dashboards
- Trend analysis
- Comparative reports
- Export functionality

User Journey Focus:
- Data-driven decisions
- Performance optimization
- Resource allocation
- Strategic planning
```

#### Settings & Preferences (`/settings`)
```plaintext
Purpose: User account and platform configuration
Primary Goal: Customize platform experience

Key Components:
- Account Settings:
  * Profile management
  * Notification preferences
  * Security settings
  * Billing information

Platform Configuration:
- Default views
- Tool preferences
- Integration settings
- Team permissions

User Journey Focus:
- Personalization
- Security management
- Preference optimization
- Account control
```

### Admin Pages (Administrators)

#### Admin Dashboard (`/admin`)
```plaintext
Purpose: Platform management center
Primary Goal: Monitor and control platform operations

Key Components:
- System Overview:
  * User statistics
  * Platform health
  * Performance metrics
  * Security status

Management Tools:
- User management
- Content control
- System settings
- Analytics access

User Journey Focus:
- Efficient administration
- Quick problem resolution
- System monitoring
- Security management
```

#### Lead Management (`/admin/leads`)
```plaintext
Purpose: Lead tracking and conversion
Primary Goal: Optimize lead conversion process

Key Components:
- Lead Overview:
  * Lead status
  * Conversion rates
  * Source analysis
  * Timeline tracking

Management Tools:
- Lead assignment
- Communication logs
- Task management
- Conversion tracking

User Journey Focus:
- Lead qualification
- Conversion optimization
- Communication management
- Performance tracking
```

#### Content Management (`/admin/content`)
```plaintext
Purpose: Content administration
Primary Goal: Maintain platform content quality

Key Components:
- Content Library:
  * Articles
  * Templates
  * Resources
  * Documentation

Management Tools:
- Content editor
- Version control
- Publishing workflow
- Analytics access

User Journey Focus:
- Content quality
- Publishing efficiency
- Version management
- Performance tracking
```

#### User Management (`/admin/users`)
```plaintext
Purpose: User account administration
Primary Goal: Manage user accounts and permissions

Key Components:
- User Overview:
  * Account status
  * Subscription level
  * Usage statistics
  * Activity logs

Management Tools:
- Account creation
- Permission settings
- Subscription management
- Support access

User Journey Focus:
- Account administration
- Permission control
- Subscription management
- Support coordination
```

#### System Settings (`/admin/settings`)
```plaintext
Purpose: Platform configuration
Primary Goal: Configure system-wide settings

Key Components:
- Configuration Options:
  * Feature toggles
  * Integration settings
  * Security parameters
  * Notification rules

Management Tools:
- Setting controls
- Environment configuration
- API management
- Backup controls

User Journey Focus:
- System configuration
- Feature management
- Security control
- Integration administration
```

#### Analytics & Reporting (`/admin/analytics`)
```plaintext
Purpose: Platform performance analysis
Primary Goal: Track and optimize platform performance

Key Components:
- Performance Metrics:
  * User engagement
  * Feature adoption
  * Conversion rates
  * System performance

Reporting Tools:
- Custom reports
- Data export
- Trend analysis
- Alert configuration

User Journey Focus:
- Performance monitoring
- Data analysis
- Strategic planning
- Optimization focus
```

#### Support Center (`/admin/support`)
```plaintext
Purpose: Customer support management
Primary Goal: Provide efficient customer support

Key Components:
- Support Overview:
  * Ticket status
  * Response times
  * Resolution rates
  * Customer satisfaction

Support Tools:
- Ticket management
- Knowledge base
- Communication tools
- Escalation procedures

User Journey Focus:
- Efficient support
- Quick resolution
- Customer satisfaction
- Knowledge management
```

## 🎤 Tool-Specific Prompts

### Role Builder Assistant
```plaintext
Purpose: AI-powered role creation assistant
Primary Goal: Guide users through creating comprehensive role blueprints

Key Components:
- Contextual Guidance:
  * Industry-specific recommendations
  * Skill set suggestions
  * Task prioritization
  * Team integration advice

Interactive Features:
- Real-time suggestions
- Template application
- Skill gap analysis
- Market rate comparisons

Implementation Notes:
- Use OpenAI API for generation
- Cache common responses
- Implement rate limiting
- Save drafts to Supabase
```

### Onboarding Checklist Creator
```plaintext
Purpose: Generate customized onboarding plans
Primary Goal: Create structured onboarding processes for new roles

Key Components:
- Role-Specific Templates:
  * First week activities
  * Tool access setup
  * Documentation review
  * Team introductions

Customization Options:
- Industry-specific requirements
- Company size adjustments
- Remote vs. hybrid settings
- Compliance considerations

Implementation Notes:
- Pull from template library
- Allow user customization
- Export to PDF/Google Docs
- Track completion status
```

### Performance Review Guide
```plaintext
Purpose: Assist with creating performance review frameworks
Primary Goal: Establish clear evaluation criteria and feedback structures

Key Components:
- Review Framework:
  * KPI definition
  * Evaluation criteria
  * Feedback templates
  * Improvement plans

Customization Options:
- Role-specific metrics
- Industry benchmarks
- Company values alignment
- Cultural considerations

Implementation Notes:
- Integrate with role builder
- Save to user library
- Schedule review reminders
- Track implementation
```

## 🎤 Voice & Tone Guidelines

### Brand Voice Principles
- **Professional but approachable**: Expert knowledge with conversational delivery
- **Confident and solution-oriented**: Focus on solving problems, not just describing them
- **Empowering and supportive**: Help users feel capable and informed
- **Clear and concise**: Avoid jargon unless necessary, then explain it
- **Consistent across all interactions**: Maintain the same voice regardless of tool or page

### Tone Variations
- **Public pages**: More marketing-focused, emphasizing benefits and value
- **Authenticated pages**: More instructional and supportive, focusing on user success
- **Admin pages**: More direct and functional, prioritizing clarity and efficiency
- **Error messages**: Helpful and solution-oriented, never blaming the user
- **Success messages**: Celebratory but professional, reinforcing positive actions

### Language Guidelines
- Use active voice whenever possible
- Prefer present tense for instructions
- Keep sentences concise and direct
- Use second person ("you") to address users directly
- Avoid excessive exclamation marks or all caps
- Use industry terminology correctly and explain when necessary
- Maintain gender-neutral language
- Avoid cultural references that may not translate globally

### Visual Tone
- Use consistent iconography across the platform
- Maintain a clean, uncluttered aesthetic
- Use whitespace effectively to improve readability
- Ensure color usage aligns with brand guidelines
- Use typography hierarchy to guide attention
- Maintain responsive design principles across all devices

## 🧪 Prompt Testing Framework

### Testing Methodology
- **A/B Testing**: Compare different prompt variations for effectiveness
- **User Testing**: Gather feedback from real users on prompt clarity and effectiveness
- **Analytics Review**: Track completion rates, error rates, and user paths
- **Expert Review**: Have domain experts evaluate prompt quality and accuracy
- **Iterative Refinement**: Continuously improve prompts based on testing results

### Testing Criteria
- **Clarity**: Is the prompt easy to understand?
- **Effectiveness**: Does it produce the desired result?
- **Efficiency**: Does it require minimal user effort?
- **Consistency**: Does it align with other prompts in the system?
- **Accessibility**: Is it usable by people with diverse abilities?
- **Bias Check**: Does it avoid unintended bias or exclusion?

### Testing Process
1. **Define Success Metrics**: Establish clear criteria for what makes a prompt successful
2. **Create Test Cases**: Develop scenarios that test different aspects of the prompt
3. **Implement Testing**: Run tests with real users or simulated interactions
4. **Analyze Results**: Review data and feedback to identify patterns
5. **Refine Prompts**: Make targeted improvements based on findings
6. **Validate Changes**: Test refined prompts to confirm improvements
7. **Document Learnings**: Record insights for future prompt development

### Testing Tools
- **User Testing Platforms**: For gathering user feedback
- **Analytics Tools**: For tracking user behavior and completion rates
- **A/B Testing Software**: For comparing different prompt variations
- **Accessibility Checkers**: For ensuring inclusive design
- **Bias Detection Tools**: For identifying potential bias in language

## 📊 Success Metrics

### Key Performance Indicators (KPIs)
- **Conversion Rate**: Percentage of visitors who complete desired actions
- **Completion Rate**: Percentage of users who complete multi-step processes
- **Error Rate**: Percentage of interactions that result in errors or confusion
- **Time to Complete**: Average time users spend on specific tasks
- **User Satisfaction**: Ratings and feedback from users
- **Return Rate**: Percentage of users who return to use the platform again
- **Feature Adoption**: Percentage of users who utilize specific features
- **Support Requests**: Number of support requests related to specific prompts

### Measurement Methods
- **Analytics Tracking**: Monitor user behavior and interaction patterns
- **User Surveys**: Gather direct feedback on user experience
- **A/B Testing**: Compare different prompt variations
- **Heat Maps**: Visualize where users focus attention
- **Session Recordings**: Review actual user interactions
- **Support Ticket Analysis**: Identify common pain points
- **User Interviews**: Conduct in-depth discussions with users

### Benchmarking
- **Industry Standards**: Compare against similar platforms
- **Historical Data**: Track improvements over time
- **User Expectations**: Measure against user expectations
- **Best Practices**: Evaluate against established UX guidelines
- **Competitive Analysis**: Compare with competitor offerings

### Continuous Improvement
- **Regular Review**: Schedule periodic evaluation of prompt performance
- **User Feedback Integration**: Incorporate user suggestions into improvements
- **Iterative Refinement**: Make small, targeted improvements regularly
- **Documentation Updates**: Keep prompt documentation current with changes
- **Team Training**: Ensure all team members understand prompt best practices

## 📄 Related Documents

- [API Documentation](../api-documentation.md) - Details on API endpoints and integration
- [Architecture Overview](../architecture.md) - System architecture and component relationships
- [Database Guide](../database-guide.md) - Database schema and data management
- [Design System](../design.md) - UI/UX design principles and component library
- [Testing Platform](../testing.md) - Testing methodologies and frameworks
- [Backup Strategy](../backup-history.md) - Data backup and recovery procedures
- [Security Guidelines](../security.md) - Security measures and best practices
- [Deployment Strategy](../deployment.md) - Deployment processes and environments
- [Prompt Engineering](../prompt-engineering.md) - Advanced prompt engineering techniques

## 📄 Page-Specific Behavior

### Loading States
- **Initial Load**: Show skeleton screens with placeholder content
- **Data Fetching**: Display loading indicators for specific components
- **Form Submission**: Show progress indicators during submission
- **Error States**: Display helpful error messages with recovery options
- **Empty States**: Provide guidance when no data is available

### Navigation Patterns
- **Breadcrumbs**: Show hierarchical navigation path
- **Progress Indicators**: Display progress in multi-step processes
- **Back/Forward**: Maintain browser history for intuitive navigation
- **Deep Linking**: Support direct links to specific content
- **Mobile Navigation**: Optimize for touch interfaces on smaller screens

### Interaction Feedback
- **Hover States**: Provide visual feedback on interactive elements
- **Focus States**: Highlight focused elements for keyboard navigation
- **Active States**: Show active state for clicked elements
- **Success Feedback**: Confirm successful actions with visual cues
- **Error Feedback**: Clearly indicate errors with helpful messages

### Accessibility Considerations
- **Keyboard Navigation**: Ensure all functionality is accessible via keyboard
- **Screen Reader Support**: Provide appropriate ARIA attributes
- **Color Contrast**: Maintain sufficient contrast for readability
- **Text Alternatives**: Include alt text for images and icons
- **Focus Management**: Manage focus appropriately during interactions

## 📄 Component Templates

### Form Components
- **Input Fields**: Text, number, email, password, etc.
- **Selection Controls**: Checkboxes, radio buttons, dropdowns
- **Date/Time Pickers**: Calendar, time selection
- **File Upload**: Drag-and-drop, file browser
- **Form Validation**: Real-time validation, error messages
- **Submit Buttons**: Primary, secondary, tertiary actions

### Navigation Components
- **Headers**: Main navigation, user menu
- **Sidebars**: Category navigation, filters
- **Breadcrumbs**: Hierarchical navigation
- **Pagination**: Page navigation, infinite scroll
- **Tabs**: Content organization
- **Accordions**: Expandable content sections

### Content Components
- **Cards**: Content containers with consistent styling
- **Modals**: Overlay dialogs for focused interactions
- **Tooltips**: Contextual help and information
- **Alerts**: Notifications and status messages
- **Progress Indicators**: Loading states, progress bars
- **Tables**: Data organization and display

### Interactive Components
- **Buttons**: Primary, secondary, tertiary actions
- **Links**: Internal and external navigation
- **Icons**: Visual indicators and actions
- **Sliders**: Range selection, carousels
- **Toggles**: On/off switches, show/hide controls
- **Drag-and-Drop**: Reordering, file uploads

## 📄 User Flow Patterns

### Authentication Flows
- **Sign Up**: New user registration process
- **Sign In**: Returning user authentication
- **Password Recovery**: Reset forgotten passwords
- **Account Verification**: Email verification, 2FA setup
- **Session Management**: Timeout handling, remember me

### Onboarding Flows
- **Welcome Sequence**: Introduction to platform features
- **Profile Setup**: User information collection
- **Preferences**: User preference configuration
- **Tutorial**: Guided introduction to key features
- **First-Time User Experience**: Special guidance for new users

### Conversion Flows
- **Lead Generation**: Capture contact information
- **Free Trial**: Limited access to premium features
- **Upgrade Path**: Transition from free to paid plans
- **Checkout Process**: Payment and subscription setup
- **Confirmation**: Order confirmation and next steps

### Task Completion Flows
- **Multi-step Processes**: Guided completion of complex tasks
- **Progress Tracking**: Visual indication of task progress
- **Completion Confirmation**: Success messages and next steps
- **Error Recovery**: Handling and resolving errors
- **Save and Resume**: Interrupted task recovery

### Support Flows
- **Help Center**: Self-service support resources
- **Contact Forms**: Direct communication with support
- **FAQ**: Frequently asked questions
- **Chat Support**: Real-time assistance
- **Ticket System**: Issue tracking and resolution
