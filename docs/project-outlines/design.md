# 🎨 ScaleMate Design System

This document defines the styling framework for ScaleMate, focusing on visual elements, preloaders, CSS patterns, brand styling, breadcrumbs, and page blocks.

---

## 1. Brand Styling

### Logo Styling
- **Primary Logo**: Horizontal, full-color
- **Alt Version**: Icon only (used for favicon, compact UI)
- Maintain clear space around logo (min: 16px)
- Never distort, recolor, or stack logo improperly

### Color Palette

| Token         | Hex       | Usage                        |
|---------------|-----------|------------------------------|
| `primary`     | `#3B82F6` | Buttons, links, CTA blocks   |
| `secondary`   | `#22C55E` | XP, gamification, success    |
| `accent`      | `#8B5CF6` | Premium, AI, upsells         |
| `bg-light`    | `#F9FAFB` | Backgrounds                  |
| `bg-dark`     | `#111827` | Dark mode base               |
| `text-default`| `#1F2937` | Body copy                    |

These are reflected in `/styles/tokens/colors.json` and extend Tailwind's theme.

### Typography

| Type        | Font               | Weight | Use                      |
|-------------|--------------------|--------|---------------------------|
| Headings    | Inter               | 600–800| H1–H4 titles, hero text   |
| Body        | Inter               | 400–500| Paragraphs, UI text       |
| Code        | JetBrains Mono     | 400    | Inline code, prompts      |

Set via Tailwind Typography Plugin.

### Voice & Tone
- **Tone**: Clear, motivating, empowering
- **Avoid**: Buzzwords, corporate jargon, fear-based selling
- **Examples**:
  - ✅ "Build your offshore dream team"
  - ❌ "Cut costs with third-world labor"

---

## 2. Preloaders & Loading States

### Spinner Preloader
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(243, 244, 246, 0.1) 25%,
    rgba(243, 244, 246, 0.2) 37%,
    rgba(243, 244, 246, 0.1) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
```

### Progress Bar
```css
.progress-bar {
  height: 4px;
  background-color: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #3B82F6;
  transition: width 0.3s ease;
}
```

### Button Loading State
```css
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: button-spin 0.6s linear infinite;
}

@keyframes button-spin {
  to { transform: rotate(360deg); }
}
```

---

## 3. CSS Patterns

### Utility Classes
```css
/* Flexbox utilities */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Spacing utilities */
.mt-auto { margin-top: auto; }
.mb-auto { margin-bottom: auto; }
.ml-auto { margin-left: auto; }
.mr-auto { margin-right: auto; }

/* Text utilities */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### CSS Variables
```css
:root {
  /* Colors */
  --color-primary: #3B82F6;
  --color-secondary: #22C55E;
  --color-accent: #8B5CF6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### Media Queries
```css
/* Mobile first approach */
@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 768px) {
  /* Small desktop styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1280px) {
  /* Large desktop styles */
}
```

---

## 4. Breadcrumbs

### Basic Breadcrumbs
```css
.breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6B7280;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
  content: "/";
  margin: 0 0.5rem;
  color: #9CA3AF;
}

.breadcrumb-item a {
  color: #3B82F6;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.breadcrumb-item.active {
  color: #1F2937;
  font-weight: 500;
}
```

### Breadcrumb Component
```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index === items.length - 1 ? (
              <span className="active">{item.label}</span>
            ) : (
              <>
                <a href={item.href}>{item.label}</a>
                <span className="separator">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

---

## 5. Page Blocks

### Hero Block
```css
.hero-block {
  padding: 4rem 1rem;
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.hero-cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: white;
  color: #3B82F6;
  font-weight: 600;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
}
```

### Feature Block
```css
.feature-block {
  padding: 3rem 1rem;
  background-color: #F9FAFB;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-item {
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #3B82F6;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #6B7280;
  line-height: 1.5;
}
```

### Testimonial Block
```css
.testimonial-block {
  padding: 4rem 1rem;
  background-color: white;
}

.testimonial-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.testimonial-quote {
  font-size: 1.5rem;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 1rem;
}

.testimonial-name {
  font-weight: 600;
  color: #1F2937;
}

.testimonial-title {
  color: #6B7280;
  font-size: 0.875rem;
}
```

### CTA Block
```css
.cta-block {
  padding: 4rem 1rem;
  background-color: #3B82F6;
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: white;
  color: #3B82F6;
  font-weight: 600;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}
```

---

## 6. Responsive Design

### Container Sizes
```css
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### Responsive Typography
```css
html {
  font-size: 16px;
}

@media (min-width: 768px) {
  html {
    font-size: 18px;
  }
}

h1 {
  font-size: 2rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 3rem;
  }
}
```

### Responsive Images
```css
.responsive-image {
  max-width: 100%;
  height: auto;
}

.background-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

---

## 7. Animation & Transitions

### Fade In
```css
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide In
```css
.slide-in {
  transform: translateY(20px);
  opacity: 0;
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Scale In
```css
.scale-in {
  transform: scale(0.95);
  opacity: 0;
  animation: scaleIn 0.3s ease forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-shadow {
  transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

---

## 8. Dark Mode

### Dark Mode Variables
```css
:root {
  /* Light mode variables */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --border-color: #E5E7EB;
}

.dark {
  /* Dark mode variables */
  --bg-primary: #111827;
  --bg-secondary: #1F2937;
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --border-color: #374151;
}
```

### Dark Mode Toggle
```css
.theme-toggle {
  position: relative;
  width: 48px;
  height: 24px;
  background-color: #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-toggle::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.theme-toggle.dark {
  background-color: #3B82F6;
}

.theme-toggle.dark::before {
  transform: translateX(24px);
}
```

---

## 🎯 Final Notes

- All styling should be consistent with the ScaleMate brand identity
- Use CSS variables for colors, spacing, and typography
- Ensure all components are responsive and mobile-friendly
- Follow accessibility guidelines for all styling
- Use animations sparingly and purposefully
- Maintain dark mode compatibility for all components 

## 📚 Related Documents

- [API Documentation](./api-documentation.md) - API UI integration
- [Architecture Overview](./architecture.md) - System architecture and UI flow
- [Database Guide](./database-guide.md) - Data visualization components
- [Testing Platform](./testing.md) - UI testing procedures
- [Backup Strategy](./backup-history.md) - UI version control
- [Security Guidelines](./security.md) - UI security components
- [Deployment Strategy](./deployment.md) - UI deployment procedures
- [Prompt Engineering](./prompt-engineering.md) - AI-assisted UI design
- [In-Memory Bank](./in-memory-bank.md) - State management and UI caching

### Memory Bank Documents
- [Active Context](../../memory-bank/activeContext.md) - Current development status and sprint goals
- [Product Context](../../memory-bank/productContext.md) - Product vision, strategy, and feature overview
- [Technical Context](../../memory-bank/techContext.md) - Technology stack and architectural decisions
- [System Patterns](../../memory-bank/systemPatterns.md) - Architecture, implementation patterns, and file structure
- [Project Brief](../../memory-bank/projectbrief.md) - Project overview, objectives, and success criteria
- [Progress Tracking](../../memory-bank/progress.md) - Project milestones and current development status 