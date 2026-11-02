# 🐾 TeddyPups U.A.E. — 1:1 Pixel-Perfect Clone

[![Live Demo](https://img.shields.io/badge/Live%20Demo-TeddyPups%20Clone-25D366?style=for-the-badge&logo=vercel)](https://vijay-1807.github.io/teddypups-uae-clone/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-24130b?style=for-the-badge&logo=github)](https://github.com/Vijay-1807/teddypups-uae-clone)
[![Video Walkthrough](https://img.shields.io/badge/Video-Demonstration-4285F4?style=for-the-badge&logo=google-drive)](https://drive.google.com/file/d/1tywxtjrVhKtWXSiwVcXbwxeg8LLwrHI_/view?usp=sharing)

A complete, high-fidelity 1:1 clone of the reference website **[TeddyPups U.A.E.](https://puppy.instabizweb.com/)**, matching its unique editorial storybook aesthetic, scrapbook elements, interactive widgets, typography, mobile responsiveness, scroll-linked physics animations, and client-side adoption workflow.

Built for the **Insta Biz Web Technical Assessment** by **Bontha Vijay**.

---

## 🚀 Deliverables

| Deliverable | URL / Resource |
| :--- | :--- |
| **Live Website** | [https://vijay-1807.github.io/teddypups-uae-clone/](https://vijay-1807.github.io/teddypups-uae-clone/) |
| **GitHub Repository** | [https://github.com/Vijay-1807/teddypups-uae-clone](https://github.com/Vijay-1807/teddypups-uae-clone) |
| **Video Walkthrough** | [https://drive.google.com/file/d/1tywxtjrVhKtWXSiwVcXbwxeg8LLwrHI_/view?usp=sharing](https://drive.google.com/file/d/1tywxtjrVhKtWXSiwVcXbwxeg8LLwrHI_/view?usp=sharing) |
| **Reference Website** | [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/) |
| **Candidate Portfolio** | [https://vijaybontha.vercel.app/](https://vijaybontha.vercel.app/) |
| **Candidate LinkedIn** | [https://www.linkedin.com/in/bonthavijay](https://www.linkedin.com/in/bonthavijay) |

---

## 📑 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features & Implemented Routes](#key-features--implemented-routes)
3. [Interactive Animation Engine (Teddy's Journey)](#interactive-animation-engine-teddys-journey)
4. [Design System, Colors & Typography](#design-system-colors--typography)
5. [Technologies & Tools Used](#technologies--tools-used)
6. [AI Tools & Exact Prompts](#ai-tools--exact-prompts)
7. [Implementation Decisions & Architecture](#implementation-decisions--architecture)
8. [Challenges Faced & Solutions](#challenges-faced--solutions)
9. [Automated Testing & CI/CD Deployment](#automated-testing--cicd-deployment)
10. [Local Development & Setup](#local-development--setup)

---

## 🌟 Project Overview

**TeddyPups U.A.E.** is a boutique luxury pet adoption service based in Downtown Dubai specializing in miniature teacup puppies (Maltipoo, Pomeranian, Korean Teacup Poodle, Cavapoo, Shih Tzu, etc.).

This clone replicates the exact visual language, component structure, color palette, responsive breakpoints, and interactive behaviors:
- Storybook scrapbook aesthetic with masking tape strips (`.tp-tape`).
- Vintage admit-one perforated ticket stubs (`.tp-ticket`) for adopted puppies.
- Custom RequestAnimationFrame (RAF) interactive SVG puppy ("Teddy") with dynamic physics, tail wagging, eye-blinks, gaze tracking, ear flop, trick routines, and speech bubbles.
- Multi-anchor scroll engine tracking Teddy across 9 journey stops from the hero quilt to the sleeping basket.
- Sticky horizontal door conveyor ("Meet the pups" treadmill).
- Mad-Libs style interactive letterform with postage stamp styling for puppy inquiries.
- Comprehensive puppy filtering by breed, origin, and HD video availability.

---

## 🧭 Key Features & Implemented Routes

| Route | Page | Key Highlights |
| :--- | :--- | :--- |
| `/` | **Home Page** | Announcement pill, hero banner with rotating featured puppy cards, breed filter quick tabs, 2-tier adoption flow ("In Dubai" vs "Imported for you"), sticky horizontal door treadmill, 3-step puppy journey, trust pillars, polaroid memories, FAQ preview, and bottom CTA banner. |
| `/puppies` | **Available Puppies** | 15 active available puppy profiles, instant client-side search, multi-category breed pills, location toggle, "With video" filter, and bottom "Already gone home" showcase. Dynamic `RevealObserver` unmasks puppy photos on viewport entry. |
| `/puppies/:slug` | **Puppy Detail Page** | Dynamic profile for every puppy (e.g. `/puppies/maltipoo-max-male`), photo gallery with full-screen Lightbox, spec sheet, health guarantees, import roadmap, and pre-filled WhatsApp inquiry. |
| `/gone-home` | **Gone Home** | 24 adopted alumni puppies displayed in vintage perforated ticket stubs with admit-one stamp motif, heart watermark, and breed filters. |
| `/happy-families` | **Happy Families** | Scrapbook wall with masking tape, client testimonials (Sarah M., Omar & Fatima, Elena R.), and polaroid memory gallery with interactive Lightbox. |
| `/how-it-works` | **How It Works** | 4-stage adoption roadmap: Two ways home, Premium puppy promise, Delivery & collection, and Why choose us. |
| `/faq` | **Questions & Answers** | 9 interactive accordion questions with instant search and Schema.org FAQPage LD+JSON structured data. |
| `/contact` | **Visit & Contact** | Interactive Mad-Libs envelope letterform, Downtown Dubai showroom card, Google Maps link, and direct WhatsApp / Phone / Email actions. |

---

## 🐕 Interactive Animation Engine (Teddy's Journey)

The mascot subsystem in `src/components/pup/` provides full 1:1 parity with the reference site's scroll engine:
1. **`PupBuddyClass.js`**:
   - Continuous RAF loop simulating head/body/tail spring physics.
   - Mouse gaze-tracking (`pup.lookAt({ x, y })`) and focus-in listener on buttons/inputs.
   - Natural eye blinking (`Math.random()` timer intervals), ear flops, and tail-wag frequency modulation.
2. **`PupJourney.jsx`**:
   - Calculates 9 dynamic anchor points (`calculateStops()`).
   - Cubic Bezier path interpolation (`cubicBezier()`) with smoothstep easing between scenes.
   - Drops dynamic directional paw prints (`.pup-prints`) along the walking trajectory.
   - Triggers interactive click routines (`spin`, `beg`, `bow`, `hop`, `sneeze`, `love` with floating SVG hearts).
3. **Sticky Door Conveyor ("Meet the pups")**:
   - Sticky viewport locking (`.tp-meet__stage` with `position: sticky; top: 0; height: 100vh`).
   - Horizontal conveyor translation (`translate3d(curX, 0, 0)`) driven by scroll delta, opening doors as puppies arrive in view.

---

## 🎨 Design System, Colors & Typography

### Typography
- **Headings & Plush Serifs**: `Fraunces` (Variable font with warm, soft curves).
- **Body & Controls**: `Figtree` (Clean, geometric, highly legible sans-serif).
- **Handwritten Accents & Scrawls**: `Shantell Sans` (Whimsical cursive for notes, polaroid captions, and mascot dialogue).

### Color Palette
- **Milk Background**: `#fffdf8` (`--color-milk`) — Warm cream background.
- **Deep Cocoa Ink**: `#2a170e` (`--color-cocoa`) — Primary typography & borders.
- **Night Cocoa**: `#24130b` (`--night`) — Footer background.
- **Honey Accent**: `#f2be6b` / `#e4a85b` (`--color-honey`) — Warm golden highlight.
- **Toffee / Terracotta**: `#c2622b` / `#a24a1a` (`--color-toffee`) — Secondary accents.
- **Blush Soft**: `#f9cdbf` / `#fbe3b4` — Badges and illustration highlights.
- **WhatsApp Green**: `#25D366` — Floating and action CTA buttons.

---

## 🛠️ Technologies & Tools Used

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) (`lenis`) for inertial scroll smoothing
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (SPA client-side navigation with route scroll restoration)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Testing**: [Playwright](https://playwright.dev/) for headless browser visual regression and DOM assertions
- **CI/CD & Hosting**: GitHub Actions + GitHub Pages with static multi-route 200 generators (`post-build-routes.cjs`)

---

## 🤖 AI Tools & Exact Prompts

During the development process, AI tools (Antigravity with Chrome DevTools Browser Subagent and Gemini Flash) were utilized to accelerate inspection, structure extraction, and code scaffolding.

### Exact Prompts Provided:

1. **Website Deep Inspection & Scrape Prompt**:
   > *"Inspect the website https://puppy.instabizweb.com/ thoroughly. Extract the entire website structure, pages, design, colors, typography, layout, sections, images/assets, forms, interactions, responsive behavior, navigation, footer, and any backend/mock functionality. Return a complete breakdown with all HTML content, CSS styling, assets URLs, text content, and component structure so we can build an exact 1:1 pixel-perfect clone."*

2. **Scroll Animation Reverse-Engineering Prompt**:
   > *"Reverse-engineer the interactive Teddy puppy scroll journey from client chunks (177ya708_1zuj.js, 1063). Extract the 9 stop anchors, Bezier curve coordinates, spring physics, tail wagging, gaze tracking, trick routines, and treadmill door conveyor math into clean React/Vite components."*

3. **Clip-Path Mask & Container Debugging Prompt**:
   > *"Audit the layout where puppy cards show empty circular outlines on /puppies and the hero sticky container detaches. Inspect computed styles via Playwright, resolve overflow constraints (overflow-x: clip vs hidden), and implement an IntersectionObserver RevealScope to guarantee 100% visible puppy images."*

---

## 💡 Implementation Decisions & Architecture

1. **Zero-Dependency Static Asset Hosting**:
   - All 164 authentic original images, logos, and webfonts were bundled into `public/media/`, `public/brand/`, and `public/fonts/`, ensuring 100% offline availability and zero external CDN latency.
2. **Container Overflow Isolation**:
   - Resolved sticky detachment by switching `body` from `overflow-x: hidden` to `overflow-x: clip;` with `overflow-y: visible`. This avoids browser scroll-container trapping and allows `.tp-meet__stage` to stick seamlessly.
3. **Universal SPA Routing for GitHub Pages**:
   - `scripts/post-build-routes.cjs` pre-generates 46 static route HTML entry points in `dist/` alongside a fallback script in `index.html`, eliminating 404s on direct URL refreshes.

---

## 🧩 Challenges Faced & Solutions

1. **Puppy Cards Invisible Inside SVG Circular Outlines**:
   - *Challenge*: Cards with `data-armed="true"` without `data-revealed="true"` were masked to `clip-path: circle(0% at 50% 55%)` by stylesheet rules.
   - *Solution*: Developed a reactive `RevealObserver` matching the original Next.js `RevealScope` and set `data-revealed="true"` across all card components, restoring 100% photo visibility.
2. **Sticky Treadmill Section Detachment**:
   - *Challenge*: `.tp-meet__stage` failed to lock `sticky; top: 0` because ancestor `body` had `overflow-x: hidden`.
   - *Solution*: Modernized to `overflow-x: clip;`, maintaining horizontal boundary containment without hijacking vertical window scroll.
3. **Duplicate Actor Removal**:
   - *Challenge*: A duplicate frozen dog snapshot from scraped markup was rendered alongside the dynamic engine.
   - *Solution*: Traced DOM elements via Playwright, eliminated the static node, and ensured exactly one dynamic actor orchestrates the entire page.

---

## 🧪 Automated Testing & CI/CD Deployment

- **Playwright Automated Regression Suite**:
  - `scripts/verify-fixes-complete.cjs`: Asserts 20/20 puppy cards load real images with natural dimensions > 0 and no zero-clipping.
  - Verifies `.tp-meet__stage` sticky state (`meetStageTop === 0`) and horizontal track translation (`translate3d(-751.4px, 0px, 0px)`).
  - Asserts exactly 1 `.pup-actor` in the DOM.
- **GitHub Actions Pipeline**:
  - Automatically triggered on push to `master`. Builds Vite production bundles and deploys static artifacts to GitHub Pages with 100% pass rate.

---

## 💻 Local Development & Setup

```bash
# 1. Clone repository
git clone https://github.com/Vijay-1807/teddypups-uae-clone.git
cd teddypups-uae-clone

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production & generate static routes
npm run build

# 5. Preview production build
npm run preview
```

---

*Submission by **Bontha Vijay** — B.Tech AI & Data Science (2026 Batch)*  
*Portfolio: [https://vijaybontha.vercel.app/](https://vijaybontha.vercel.app/) | LinkedIn: [https://www.linkedin.com/in/bonthavijay](https://www.linkedin.com/in/bonthavijay)*
