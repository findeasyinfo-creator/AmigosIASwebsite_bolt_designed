# 🎨 Dual Theme Requirements - Amigos IAS Landing Page

## Overview
This document defines the requirements for implementing two distinct, premium themes for the Amigos IAS landing page. Both themes should be elegant, sophisticated, and suitable for a premium IAS coaching institute.

---

## Theme 1: Midnight Prestige (Current - Dark Theme)

### Design Philosophy
**"Celestial Excellence in Darkness"**
- Professional, premium, and authoritative
- Night sky with golden constellation aesthetic
- Represents the journey through darkness towards enlightenment
- Ideal for focused, serious learning environment

### Color Palette

#### Primary Colors
```css
--navy-primary: #0A1929        /* Deep midnight navy - Main backgrounds */
--navy-secondary: #1A2942      /* Rich navy - Secondary surfaces */
--navy-light: #2D3E5C          /* Lighter navy - Cards, borders */
--navy-accent: #3D5A80         /* Bright navy - Hover states */
```

#### Accent Colors
```css
--gold-primary: #D4AF37        /* Rich ceremonial gold - Primary actions */
--gold-secondary: #F2C94C      /* Bright gold - Gradients, highlights */
--gold-light: #FFE17B          /* Light gold - Text highlights, glow */
--gold-dark: #B8941F           /* Deep gold - Shadows, depth */
```

#### Neutral Colors
```css
--white: #FFFFFF               /* Pure white - Primary text */
--gray-light: #F5F7FA          /* Light gray - Subtle backgrounds */
--gray-medium: #E2E8F0         /* Medium gray - Borders, dividers */
--gray-dark: #4A5568           /* Dark gray - Secondary text */
```

### Visual Effects
- **Background**: Deep navy gradient with golden particle burst from upper-left
- **Glass-morphism**: Frosted glass effect on header/cards
- **Glow Effects**: Golden halos around important elements
- **Shadows**: Deep, dramatic shadows with gold tints
- **Animations**: Smooth, elegant transitions with star particles

### Typography
- **Headings**: Playfair Display (Serif) - Golden gradient
- **Body**: Inter - White/Light gray
- **Buttons**: Inter Bold - High contrast

---

## Theme 2: Sunset Radiance (New - Light Theme)

### Design Philosophy
**"Vibrant Energy & Success"**
- Bold, energetic, and inspiring
- Sunset gradient transitioning to soft cream
- Represents warmth, passion, and achievement
- Creates an inviting and optimistic atmosphere
- Gradual fade from top (vibrant) to bottom (soft)

### Color Palette

#### Primary Gradient Colors (Top Section - Hero)
```css
--orange-vibrant: #FF5722       /* Deep vibrant orange - Top background */
--orange-medium: #FF7043        /* Medium orange - Upper sections */
--orange-soft: #FF8A65          /* Soft orange - Mid sections */
--yellow-bright: #FFB74D        /* Bright yellow - Gradient blend */
--yellow-light: #FFD54F         /* Light yellow - Lower mid sections */
```

#### Transition Colors (Middle Sections)
```css
--peach-warm: #FFCCBC           /* Warm peach - Transition zone */
--cream-golden: #FFE0B2         /* Golden cream - Mid-lower sections */
--cream-soft: #FFF3E0           /* Soft cream - Lower sections */
--vanilla: #FFF8E1              /* Vanilla - Near bottom */
```

#### Bottom Colors (Footer)
```css
--cream-light: #FFFAF0          /* Light cream - Footer area */
--white-warm: #FFFEF9           /* Warm white - Final background */
--ivory: #FFFFF0                /* Ivory white - Cards on bottom */
```

#### Text & Accent Colors
```css
--text-primary: #2C1810         /* Deep brown - Primary text */
--text-secondary: #5D4037       /* Warm brown - Secondary text */
--text-tertiary: #8D6E63        /* Light brown - Tertiary text */
--accent-deep: #D84315          /* Deep orange-red - CTAs */
--accent-gold: #F57C00          /* Golden orange - Highlights */
```

#### Card & Border Colors
```css
--card-light: rgba(255, 255, 255, 0.95)  /* White cards with slight transparency */
--card-border: rgba(255, 87, 34, 0.2)    /* Orange tint borders */
--card-shadow: rgba(255, 87, 34, 0.15)   /* Orange-tinted shadows */
--border-soft: rgba(255, 152, 0, 0.3)    /* Soft orange borders */
```

### Visual Effects

#### **Seamless Wave Gradient Background**
The entire page uses a single flowing gradient with wave-like color transitions (no separate sections):

```css
background: 
  /* Flowing wave layers for smooth color blending */
  radial-gradient(ellipse 120% 80% at 50% 0%, #FF5722 0%, transparent 50%),
  radial-gradient(ellipse 100% 60% at 50% 20%, #FF7043 0%, transparent 60%),
  radial-gradient(ellipse 90% 70% at 50% 40%, #FFB74D 0%, transparent 70%),
  radial-gradient(ellipse 100% 80% at 50% 60%, #FFD54F 0%, transparent 80%),
  radial-gradient(ellipse 110% 90% at 50% 80%, #FFCCBC 0%, transparent 90%),
  linear-gradient(180deg, 
    #FF5722 0%,      /* Vibrant orange - top */
    #FF7043 15%,     /* Medium orange */
    #FF8A65 25%,     /* Soft orange */
    #FFB74D 40%,     /* Bright yellow */
    #FFD54F 55%,     /* Light yellow */
    #FFCCBC 70%,     /* Warm peach */
    #FFF3E0 85%,     /* Soft cream */
    #FFFEF9 100%     /* Warm white - bottom */
  );
```

#### **SVG Wave Overlays** (Between sections for enhanced fluidity):
```html
<!-- Layered semi-transparent wave SVGs -->
<svg class="wave-overlay" viewBox="0 0 1200 120">
  <path d="M0,64 C400,20 800,100 1200,64 L1200,120 L0,120 Z" 
        fill="url(#waveGradient)" opacity="0.4"/>
</svg>
```

#### **Wave Animation Effects**:
- Subtle wave motion animation on scroll
- Flowing wave patterns between sections
- Smooth color bleeding effect (no harsh boundaries)
- Organic, fluid transitions throughout the page

#### **Glass-Morphism Cards**:
```css
.card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 87, 34, 0.2);
  box-shadow: 
    0 8px 32px rgba(255, 87, 34, 0.15),
    0 2px 8px rgba(255, 152, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card:hover {
  border-color: rgba(255, 87, 34, 0.4);
  box-shadow: 
    0 12px 48px rgba(255, 87, 34, 0.25),
    0 4px 16px rgba(255, 152, 0, 0.2);
  transform: translateY(-4px);
}
```

#### **Additional Effects**:
- **Glow Effects**: Warm orange glow on hover/focus states
- **Shadows**: Soft, warm shadows adapting to background color intensity
- **Particles**: Floating warm light particles throughout
- **Sparkles**: Subtle sparkles on interactive elements
- **Transitions**: All color changes use smooth 400ms ease-in-out

### Typography
- **Headings**: Playfair Display (Serif) - Deep orange to gold gradient
- **Body**: Inter - Deep brown (#2C1810)
- **Buttons**: Inter Bold - White text on vibrant orange/gold background

---

## Component-Specific Requirements

### Header/Navigation

#### Midnight Prestige (Dark)
```
- Background: rgba(10, 20, 40, 0.95) with blur
- Logo: Full color with gold glow
- Nav Links: White → Gold on hover
- Buttons: Gold gradient with navy text
- Border: Subtle gold bottom border
```

#### Sunset Radiance (Light)
```
- Background: rgba(255, 255, 255, 0.85) with blur (floating on orange gradient)
- Logo: Full color with subtle shadow
- Nav Links: Deep brown → Orange-red on hover
- Buttons: Orange gradient (#FF5722 → #FF7043) with white text
- Border: Soft orange glow bottom border
```

---

### Hero Section

#### Midnight Prestige (Dark)
```
- Background: Navy gradient with star particles
- Heading: Gold gradient text with glow
- Subtext: Light gray
- CTA Buttons: Gold primary, outlined secondary
- Decorative: Golden constellation lines
```

#### Sunset Radiance (Light)
```
- Background: Vibrant orange-to-yellow gradient (#FF5722 → #FFB74D)
- Heading: Deep orange to gold gradient (#D84315 → #F57C00)
- Subtext: Deep brown (#2C1810)
- CTA Buttons: Vibrant orange primary (#FF5722) with white text, outlined secondary
- Decorative: Flowing waves, warm light particles, subtle sparkles
```

---

### Cards/Content Sections

#### Midnight Prestige (Dark)
```
- Card Background: rgba(26, 41, 66, 0.8) with glass effect
- Card Border: Gold with subtle glow
- Heading: Gold gradient
- Text: Light gray
- Hover: Lift animation with increased glow
- Icons: Gold with navy background
```

#### Sunset Radiance (Light)
```
- Card Background: rgba(255, 255, 255, 0.95) - Semi-transparent white
- Card Border: rgba(255, 87, 34, 0.2) - Soft orange tint
- Card Shadow: 0 8px 32px rgba(255, 87, 34, 0.15) - Warm orange shadow
- Heading: Deep orange (#D84315)
- Text: Deep brown (#2C1810)
- Hover: Lift animation with intensified orange shadow + border glow
- Icons: Orange gradient on white/cream background
- Backdrop: Slight blur effect for glass-morphism
```

---

### Buttons

#### Midnight Prestige (Dark)
```css
.btn-primary {
  background: linear-gradient(135deg, #D4AF37, #FFE17B);
  color: #0A1929;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
  border: none;
}

.btn-secondary {
  background: transparent;
  color: #FFE17B;
  border: 1px solid #D4AF37;
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.2);
}
```

#### Sunset Radiance (Light)
```css
.btn-primary {
  background: linear-gradient(135deg, #FF5722, #FF7043);
  color: #FFFFFF;
  box-shadow: 0 4px 16px rgba(255, 87, 34, 0.4);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #D84315, #FF5722);
  box-shadow: 0 6px 24px rgba(255, 87, 34, 0.5);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #FF5722;
  border: 2px solid #FF5722;
  box-shadow: 0 2px 8px rgba(255, 87, 34, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 87, 34, 0.1);
  border-color: #D84315;
  color: #D84315;
}
```

---

### Marquee/Ticker

#### Midnight Prestige (Dark)
```
- Background: Gold gradient
- Text: Navy blue with white shadow
- Animation: White shine overlay
```

#### Sunset Radiance (Light)
```
- Background: Orange to gold gradient (#FF7043 → #FFB74D)
- Text: White with deep orange shadow
- Animation: Flowing shine with sparkle overlay
```

---

### Footer

#### Midnight Prestige (Dark)
```
- Background: Deep navy (#0A1929)
- Heading: Gold
- Links: Light gray → Gold on hover
- Dividers: Gold with low opacity
- Copyright: Gray
```

#### Sunset Radiance (Light)
```
- Background: Soft cream to white gradient (#FFF8E1 → #FFFEF9)
- Heading: Deep orange (#D84315)
- Links: Deep brown → Orange on hover
- Dividers: Soft peach/cream
- Copyright: Warm brown
- Subtle texture: Light cream pattern
```

---

## Theme Toggle Behavior

### User Experience
1. **Smooth Transition**: 300ms ease-in-out for all color changes
2. **Persistence**: Theme choice saved to localStorage
3. **System Preference**: Default to user's OS theme preference
4. **No Flash**: Theme applied before page render
5. **All Components**: Every component respects theme

### Toggle Button
- **Position**: Top-right in header navigation
- **Icon**: ☀️ (sun) for light theme, 🌙 (moon) for dark theme
- **Label**: Accessible aria-label
- **Animation**: Smooth icon transition with rotation

### Implementation
```tsx
const [theme, setTheme] = useState<'dark' | 'light'>('dark');

useEffect(() => {
  // Load from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};
```

---

## Technical Implementation

### CSS Variables Structure
```css
/* Root contains both themes */
:root {
  /* Dark theme variables */
}

[data-theme="light"] {
  /* Light theme variables override */
  --navy-primary: var(--cream-primary);
  --navy-secondary: var(--cream-secondary);
  /* ... etc */
}
```

### Wave Background Implementation Example

```css
/* Light Theme - Flowing Wave Background */
[data-theme="light"] body {
  position: relative;
  background: linear-gradient(180deg, 
    #FF5722 0%,
    #FF7043 15%,
    #FF8A65 25%,
    #FFB74D 40%,
    #FFD54F 55%,
    #FFCCBC 70%,
    #FFF3E0 85%,
    #FFFEF9 100%
  );
  background-attachment: fixed;
  min-height: 100vh;
}

/* Flowing wave overlay for organic transitions */
[data-theme="light"] body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255, 87, 34, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse 100% 50% at 50% 25%, rgba(255, 138, 101, 0.3) 0%, transparent 60%),
    radial-gradient(ellipse 110% 55% at 50% 50%, rgba(255, 213, 79, 0.25) 0%, transparent 65%),
    radial-gradient(ellipse 100% 60% at 50% 75%, rgba(255, 204, 188, 0.2) 0%, transparent 70%);
  pointer-events: none;
  opacity: 1;
  z-index: 0;
}

/* Subtle wave animation */
[data-theme="light"] body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* Wave SVG pattern */
  opacity: 0.15;
  animation: waveFlow 20s ease-in-out infinite;
  z-index: 0;
}

@keyframes waveFlow {
  0%, 100% { 
    transform: translateY(0) scaleY(1); 
    opacity: 0.15; 
  }
  50% { 
    transform: translateY(-10px) scaleY(1.02); 
    opacity: 0.2; 
  }
}
```

### Component Updates Required
1. ✅ Header - Theme toggle already added
2. ⏳ globals.css - Add light theme variables
3. ⏳ All components - Use CSS variables (not hardcoded colors)
4. ⏳ Animations - Adjust for both themes
5. ⏳ Images/Icons - Theme-aware versions if needed

---

## Accessibility Requirements

### Both Themes Must Have:
- **Contrast Ratio**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus States**: Clear, visible focus indicators
- **Color Independence**: Information not conveyed by color alone
- **Motion**: Respect `prefers-reduced-motion`

### Testing Checklist:
- [ ] WCAG AA compliance for both themes
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works perfectly
- [ ] Theme transition doesn't break animations
- [ ] Text remains readable in all states

---

## Design Inspiration

### Midnight Prestige (Dark)
- **Inspiration**: Night sky, constellations, ceremonial gold medals
- **Mood**: Prestigious, focused, determined
- **Target**: Serious aspirants, evening/night study sessions

### Sunset Radiance (Light)
- **Inspiration**: Vibrant sunset, energy, warmth, flowing gradients
- **Mood**: Bold, inspiring, energetic, welcoming, optimistic
- **Target**: Daytime browsing, energetic atmosphere, broad appeal
- **Gradient Flow**: Top sections vibrant → middle sections warm → bottom sections soft and light

---

## Success Criteria

### Theme Implementation is Complete When:
1. ✅ Toggle button visible and functional
2. ⏳ All components support both themes
3. ⏳ No hardcoded colors remain in components
4. ⏳ Smooth transition between themes
5. ⏳ Theme persists across page reloads
6. ⏳ Meets accessibility standards
7. ⏳ Tested on mobile and desktop
8. ⏳ No console errors or warnings

---

## Future Enhancements (Optional)
- Auto-switch based on time of day
- Custom theme creator for users
- High contrast mode for accessibility
- Seasonal theme variations

---

**Status**: Requirements defined ✅  
**Next Step**: Implement light theme CSS variables and update components  
**Owner**: Development Team  
**Priority**: High
