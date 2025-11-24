# Project Structure Guide

## Overview
This Next.js 14 project is organized with a clean separation between the landing page and additional pages. The landing page design and functionality remain completely unchanged.

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing Page (unchanged)
│   ├── layout.tsx                # Root layout (unchanged)
│   ├── globals.css               # Global styles (unchanged)
│   ├── ThemeProvider.tsx         # Theme context (unchanged)
│   ├── about/
│   │   ├── page.tsx              # About page wrapper
│   │   ├── faculty/
│   │   │   └── page.tsx          # Faculty page wrapper
│   │   └── results/
│   │       └── page.tsx          # Results page wrapper
│   ├── courses/
│   │   └── page.tsx              # Courses page wrapper
│   ├── current-affairs/
│   │   └── page.tsx              # Current Affairs page wrapper
│   ├── resources/
│   │   └── page.tsx              # Resources & Blog page wrapper
│   └── contact/
│       └── page.tsx              # Contact page wrapper
├── components/
│   ├── Header/                   # Navigation (updated with Next.js Link)
│   ├── Footer/                   # Footer (unchanged)
│   ├── Hero/                     # Hero section (unchanged)
│   ├── [other existing components]  # All landing page components (unchanged)
│   └── pages/                    # Page-specific content components
│       ├── AboutPageContent.tsx
│       ├── FacultyPageContent.tsx
│       ├── ResultsPageContent.tsx
│       ├── CoursesPageContent.tsx
│       ├── CurrentAffairsPageContent.tsx
│       ├── ResourcesPageContent.tsx
│       └── ContactPageContent.tsx
```

## How to Add Your Page Content

### Step 1: Replace Content Components
When you upload your page code, replace the placeholder content in the respective component file:

**For About page:**
- Replace content in: `src/components/pages/AboutPageContent.tsx`

**For Faculty page:**
- Replace content in: `src/components/pages/FacultyPageContent.tsx`

**For Results page:**
- Replace content in: `src/components/pages/ResultsPageContent.tsx`

**For Courses page:**
- Replace content in: `src/components/pages/CoursesPageContent.tsx`

**For Current Affairs page:**
- Replace content in: `src/components/pages/CurrentAffairsPageContent.tsx`

**For Resources page:**
- Replace content in: `src/components/pages/ResourcesPageContent.tsx`

**For Contact page:**
- Replace content in: `src/components/pages/ContactPageContent.tsx`

### Step 2: Page Structure Template
Each page follows this consistent structure:

```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import YourPageContent from '@/components/pages/YourPageContent'

export const metadata = {
  title: 'Your Page Title - Amigos IAS',
  description: 'Your page description',
}

export default function YourPage() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <YourPageContent />
      <Footer />
    </>
  )
}
```

### Step 3: Content Component Template
Your content components should follow this pattern:

```tsx
'use client'

export default function YourPageContent() {
  return (
    <main>
      {/* Your page content here */}
    </main>
  )
}
```

## Key Features Preserved

### 🔒 Landing Page Unchanged
- All landing page components remain exactly as they were
- Design, animations, and functionality preserved
- Same layout structure and styling

### 🎨 Theme System Intact
- Dark/Light theme toggle works across all pages
- Theme context available in all page components
- Consistent styling system maintained

### 📱 Responsive Navigation
- Header component updated with Next.js Link for proper routing
- Mobile menu functionality preserved
- Navigation works seamlessly between pages

### ⚡ Performance Optimized
- Each page is a separate route with proper metadata
- Shared components (Header, Footer) are reused
- Lazy loading and Next.js optimizations maintained

## Available Routes

- `/` - Landing Page (unchanged)
- `/about` - About page
- `/about/faculty` - Faculty page (dropdown under About)
- `/about/results` - Results page (dropdown under About)
- `/courses` - Courses page
- `/current-affairs` - Current Affairs page
- `/resources` - Resources & Blog page
- `/contact` - Contact page

## Development Commands

```bash
# Development server
npm run dev

# Development on port 3001
npm run dev:3001

# Build for production
npm run build

# Start production server
npm start
```

## Next Steps

1. Upload your page content one by one
2. Replace the corresponding component in `src/components/pages/`
3. Maintain the existing theme and styling system
4. Test each page to ensure proper integration

Your landing page remains completely untouched and all existing functionality is preserved!