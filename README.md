# Sennheiser HD 559 – Scrollytelling Landing Page

A premium, cinematic, Apple-inspired product landing page for the Sennheiser HD 559 headphones. Built with high-performance scrolling mechanics, image-sequence animations, and a responsive, monochrome design system.

## 🚀 Live Demo
[https://sennheiser.melwyn.co.in](https://sennheiser.melwyn.co.in)

## ✨ Features
- **Cinematic Scrollytelling:** 600+ high-resolution image frames animated on scroll using a highly optimized HTML5 `<canvas>` engine.
- **Progressive Image Loading:** A smart, batched preloading strategy ensures instant First Contentful Paint. It loads the exact first frame instantly, backfills a "skeleton" (every 10th frame) for rapid scroll scrubbing, and drops the remaining frames into background download batches.
- **Premium Apple-Aesthetic:** A monochrome design system (true black, charcoal, off-white) with fluid `clamp()` typography that scales seamlessly from mobile to 1920px+ ultra-wide displays.
- **Glassmorphic Navigation:** Sticky navigation bar with blur effects, dynamic scroll states, and a clean URL-based section routing system (`/overview`, `/sound`, etc.).
- **SEO Optimized:** Comprehensive Open Graph tags, Twitter Cards, Canonical URLs, and Schema.org JSON-LD structured data (Product Schema).

## 🛠️ Tech Stack
- **Framework:** [Next.js 16.2.1](https://nextjs.org/) (App Router model)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation/Rendering:** Custom React Hooks + HTML5 `<canvas>`
- **Deployment:** Vercel (Recommended)

## 📂 Architecture & Key Technical Decisions

### 1. The Scroll Engine (`hooks/useScrollSequence.ts`)
Instead of using heavy video files which fail to scrub cleanly on mobile browsers, this repository utilizes a robust `requestAnimationFrame` image-drawing approach:
- Computes viewport scroll progress against a set "sticky" section height (e.g., `500vh`).
- Finds the nearest preloaded image frame to the current scroll metric and renders it efficiently via standard 2D context.
- Fallback mechanics search dynamically for the closest loaded frame if the exact target hasn't downloaded yet.

### 2. Design System (`app/globals.css`)
Tailwind utility-first styling combined with a custom CSS token mapping:
- Widespread use of CSS `clamp(min, preferred, max)` means all text overlays and headings resize continuously alongside the viewport natively — practically eliminating media-query "snapping".
- Implements a subtle dark radial gradient vignette covering the `<canvas>` components to guarantee AA-level text legibility while avoiding washout of the actual product imagery.

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Production

To construct the optimized production build:
```bash
npm run build
npm start
```

## 📄 License
This is a portfolio and demonstration project. Sennheiser and the Sennheiser logo are trademarks of Sennheiser electronic GmbH & Co. KG.
