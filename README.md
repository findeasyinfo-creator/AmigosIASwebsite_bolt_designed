# Amigos IAS Academy Website

A professional, high-performance website for Amigos IAS Academy built with Next.js, React, and Tailwind CSS.

## Features

### Design Principles
- **Mobile-first responsive design** optimized for all devices
- **Outstanding UI** with smooth animations and micro-interactions
- **Color scheme** based on the Amigos IAS brand logo (orange, red, yellow accents)
- **Performance-focused** with Next.js optimization for fast loading
- **User-centric** with minimal cognitive load and intuitive navigation

### Key Pages

1. **Home Page**
   - Hero section with prominent CTAs
   - Statistics showcase
   - Why Choose section
   - Featured courses carousel
   - Top faculty profiles
   - Student testimonials
   - Latest announcements

2. **Current Affairs**
   - Advanced filtering by subject, paper, and date
   - Card-based magazine-style layout
   - Tagged content for easy navigation

3. **About Us**
   - Vision and mission statements
   - Director's message
   - Faculty profiles with expertise
   - Academy timeline

4. **Courses**
   - Categorized course listings
   - Detailed course information
   - Batch timings and fees
   - Direct enrollment links

5. **Admissions**
   - Multi-step form with progress indicator
   - Real-time validation with visual feedback
   - Chunking for reduced cognitive load
   - Progressive disclosure

6. **Resources & Blog**
   - Tabbed interface for easy navigation
   - Study materials
   - Strategy articles
   - Previous year papers
   - Video lectures
   - Faculty columns
   - Exam updates

7. **Results**
   - Interactive topper showcase
   - Filterable by year and rank
   - Success stories with testimonials
   - Direct course enrollment links

8. **Contact Us**
   - Enquiry form with validation
   - Contact information
   - WhatsApp integration
   - Google Maps placeholder

### Global Components

- **Sticky Header** with smooth scroll behavior
- **Comprehensive Footer** with quick links and social media
- **Mobile FAB** (Floating Action Bar) with:
  - Join Now button
  - Enquire button
  - WhatsApp chat integration

### Technical Features

- **Next.js 16** with App Router
- **Tailwind CSS 4** for styling
- **TypeScript** for type safety
- **Responsive design** with mobile-first approach
- **Form validation** with real-time feedback
- **Micro-interactions** for enhanced UX
- **SEO-optimized** structure

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build

```bash
npm run build
```

### Start Production

```bash
npm start
```

## Color Palette

Based on the Amigos IAS logo:

- **Primary Navy**: #1D3557 (Main brand color)
- **Primary Red**: #E63946 (Accent)
- **Primary Orange**: #F77F00 (Accent)
- **Primary Yellow**: #FCBF49 (Accent)
- **Secondary Green**: #06D6A0 (Growth/Success)
- **Secondary Blue**: #118AB2 (Trust)

## Project Structure

```
project/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/             # About Us page
│   ├── admissions/        # Admissions page
│   ├── contact/           # Contact page
│   ├── courses/           # Courses page
│   ├── current-affairs/   # Current Affairs page
│   ├── resources/         # Resources & Blog page
│   └── results/           # Results page
├── components/
│   ├── Header.tsx         # Global header
│   ├── Footer.tsx         # Global footer
│   └── MobileFAB.tsx      # Mobile floating action bar
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
└── package.json          # Dependencies

```

## Key UX Principles Implemented

1. **Chunking**: Breaking down complex information into manageable units
2. **Progressive Disclosure**: Showing essential information first, details on demand
3. **Consistency**: Unified design language across all pages
4. **Visual Hierarchy**: Clear structure with typography and spacing
5. **Micro-interactions**: Hover states, transitions, form validation feedback
6. **Mobile-First**: Optimized for thumb-friendly navigation
7. **Conversion Architecture**: Strategic CTA placement for lead generation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Next.js automatic code splitting
- Image optimization
- CSS optimization with Tailwind
- Fast page transitions
- Optimized for Core Web Vitals

## Future Enhancements

- Integration with Supabase database for dynamic content
- Admin panel for content management
- Online payment gateway integration
- Student dashboard
- Video streaming integration
- Advanced analytics

---

Built with excellence for UPSC aspirants.
