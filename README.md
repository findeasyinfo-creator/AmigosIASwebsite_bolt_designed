# Amigos IAS Landing Page - Next.js

Modern Next.js conversion of the Amigos IAS UPSC coaching landing page with component-based architecture and modular CSS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **CSS Modules** for scoped component styling
- **Google Fonts** (Poppins & Playfair Display) optimized loading
- **Responsive Design** matching original
- **Modern React Patterns** (hooks, client components where needed)
- **Hero Panel** with background image support
- **Modern Testimonial Cards** with horizontal scroll

## 📁 Project Structure

```
nextjs-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx             # Main page composing all sections
│   │   └── globals.css          # Global styles & CSS variables
│   └── components/
│       ├── Header/              # Sticky header with mobile menu
│       │   ├── index.tsx
│       │   └── Header.module.css
│       ├── Marquee/             # Announcement marquee
│       ├── Hero/                # Hero carousel with panel design
│       ├── Trusted/             # Trust indicators section
│       ├── Courses/             # Courses grid (placeholder)
│       ├── Faculty/             # Faculty slider (placeholder)
│       ├── Testimonials/        # Modern horizontal scroll cards
│       ├── Demo/                # Demo videos (placeholder)
│       └── Footer/              # Footer section
├── public/
│   └── assets/                  # Images (copy your assets here)
│       ├── amigos-logo.png
│       ├── hero-banner.jpg
│       └── hero-bg.jpg          # Background for hero panel
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.ts
```

## 🛠️ Setup & Installation

### 1. Navigate to the project

```powershell
cd "d:\projects\landing page\nextjs-landing"
```

### 2. Install dependencies

```powershell
npm install
```

### 3. Copy assets

Copy your images from the original project to `public/assets/`:

```powershell
# Create assets directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public\assets"

# Copy logo
Copy-Item "..\assets\amigos-logo.png" "public\assets\" -Force

# Copy hero banner
Copy-Item "..\assets\hero-banner.jpg" "public\assets\" -Force

# Copy hero background (from your WhatsApp image)
Copy-Item "C:\Users\sivak\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\TempState\61EB1BF9204A81F413B1287C2C563853\WhatsApp Image 2025-11-10 at 12.08.02_7e385168.jpg" "public\assets\hero-bg.jpg" -Force
```

### 4. Run development server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling Approach

### CSS Modules
Each component has its own `.module.css` file for scoped styles:

```tsx
import styles from './Header.module.css'

<header className={styles.header}>
  ...
</header>
```

### Global Styles
CSS variables and animations are in `src/app/globals.css`:

```css
:root {
  --deep-saffron: #E97122;
  --soft-amber: #F6C36B;
  --royal-navy: #1A2341;
  ...
}
```

### Tailwind CSS
Available for utility classes, but preflight disabled to preserve custom styles.

## 🔧 Customization

### Colors
Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --deep-saffron: #E97122;  /* Change hero orange tint */
  --royal-navy: #1A2341;     /* Change header background */
}
```

### Hero Background
Replace `public/assets/hero-bg.jpg` with your preferred background image.

### Testimonials
Edit testimonial data in `src/components/Testimonials/index.tsx`:

```tsx
const testimonials = [
  {
    name: 'Your Name',
    rank: 'AIR X • 2024',
    image: '/path/to/image.jpg',
    stars: 5,
    text: 'Your testimonial...',
    tilt: 'tilt1'  // tilt1, tilt2, or tilt3
  },
  ...
]
```

## 📦 Building for Production

```powershell
npm run build
npm start
```

The optimized production build will be in `.next/` directory.

## 🚢 Deployment

### Vercel (Recommended)
```powershell
npm i -g vercel
vercel
```

### Other Platforms
- **Netlify**: Connect your Git repo
- **AWS Amplify**: Use the Next.js build preset
- **Docker**: Use official Next.js Dockerfile

## 🔄 Migration Notes

### From Original HTML/CSS
- All sections converted to React components
- Inline styles moved to CSS Modules
- JavaScript carousel logic → React hooks (useState)
- Marquee element → React component (could upgrade to CSS animation)

### What's Different
- **No jQuery** - Pure React hooks
- **Image Optimization** - Next.js `<Image>` component
- **Font Loading** - Optimized via `next/font/google`
- **Module Bundling** - Automatic code splitting

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## ⚠️ Known Issues / TODOs

- ✅ Header with mobile menu
- ✅ Hero carousel with panel design
- ✅ Modern testimonial cards
- ⚠️ Courses section (placeholder - needs full implementation)
- ⚠️ Faculty section (placeholder - needs video integration)
- ⚠️ Demo section (placeholder - needs YouTube embed)
- ⚠️ Footer (simplified - needs full links)

## 📞 Support

For questions or issues, refer to the original project documentation or Next.js resources.

---

**Built with ❤️ using Next.js 14**
