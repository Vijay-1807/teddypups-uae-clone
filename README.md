# 🐾 TeddyPups U.A.E. — 1:1 Pixel-Perfect Clone

[![Live Demo](https://img.shields.io/badge/Live%20Demo-TeddyPups%20Clone-25D366?style=for-the-badge&logo=vercel)](https://teddypups-uae.netlify.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-24130b?style=for-the-badge&logo=github)](https://github.com/Vijay-1807/teddypups-uae-clone)

A complete, high-fidelity 1:1 clone of the reference website **[TeddyPups U.A.E.](https://puppy.instabizweb.com/)**, matching its unique editorial storybook aesthetic, scrapbook elements, interactive widgets, typography, mobile responsiveness, and client-side adoption workflow.

Built for the **Insta Biz Web Technical Assessment** by **Bontha Vijay**.

---

## 🚀 Live Deliverables

| Deliverable | URL / Resource |
| :--- | :--- |
| **Live Website** | [https://teddypups-uae.netlify.app](https://teddypups-uae.netlify.app) |
| **GitHub Repository** | [https://github.com/Vijay-1807/teddypups-uae-clone](https://github.com/Vijay-1807/teddypups-uae-clone) |
| **Reference Website** | [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/) |

---

## 📑 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features & Implemented Routes](#key-features--implemented-routes)
3. [Design System, Colors & Typography](#design-system-colors--typography)
4. [Technologies & Tools Used](#technologies--tools-used)
5. [AI Tools & Exact Prompts](#ai-tools--exact-prompts)
6. [Implementation Decisions & Architecture](#implementation-decisions--architecture)
7. [Challenges Faced & Solutions](#challenges-faced--solutions)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [Local Development & Setup](#local-development--setup)
10. [Loom Video Walkthrough Script](#loom-video-walkthrough-script)

---

## 🌟 Project Overview

**TeddyPups U.A.E.** is a boutique luxury pet adoption and ethical sourcing service based in Downtown Dubai specializing in miniature teacup puppies (Maltipoo, Pomeranian, Korean Teacup Poodle, Cavapoo, Shih Tzu, etc.).

This clone replicates the exact visual language, component structure, color palette, responsive breakpoints, and interactive behaviors:
- Storybook scrapbook aesthetic with masking tape strips (`tp-tape`).
- Vintage admit-one perforated ticket stubs (`.tp-ticket`) for adopted puppies.
- Interactive SVG Teddy mascot (`MascotWidget`) that winks, reacts to cursor movement, tracks eyes, wiggles ears, and shows speech bubbles.
- Mad-Libs style interactive letterform with postage stamp styling for puppy inquiries.
- Comprehensive puppy filtering by breed (Cavapoo, Maltipoo, Pomeranian, Poodle, Shih Tzu), location origin (Downtown Dubai Showroom vs. Imported for you), and HD video availability.

---

## 🧭 Key Features & Implemented Routes

| Route | Page | Key Highlights |
| :--- | :--- | :--- |
| `/` | **Home Page** | Announcement pill, hero banner with rotating featured puppy cards, breed filter quick tabs, 2-tier adoption flow ("In Dubai" vs "Imported for you"), 3-step puppy journey, trust pillars, polaroid memories, FAQ preview, and bottom CTA banner. |
| `/puppies` | **Available Puppies** | 15 active available puppy profiles, instant client-side search, multi-category breed pills, location toggle, "With video" filter, and bottom "Already gone home" showcase. |
| `/puppies/:slug` | **Puppy Detail Page** | Dynamic profile for every puppy (e.g. `/puppies/maltipoo-max-male`), photo gallery with full-screen Lightbox, spec sheet, health guarantees, import roadmap, and pre-filled WhatsApp inquiry. |
| `/gone-home` | **Gone Home** | 24 adopted alumni puppies displayed in vintage perforated ticket stubs with admit-one stamp motif, heart watermark, and breed filters. |
| `/happy-families` | **Happy Families** | Scrapbook wall with masking tape, client testimonials (Sarah M., Omar & Fatima, Elena R.), and polaroid memory gallery with interactive Lightbox. |
| `/how-it-works` | **How It Works** | 4-stage adoption roadmap: Two ways home, Premium puppy promise, Delivery & collection, and Why choose us. |
| `/faq` | **Questions & Answers** | 9 interactive accordion questions with instant search and Schema.org FAQPage LD+JSON structured data. |
| `/contact` | **Visit & Contact** | Interactive Mad-Libs envelope letterform, Downtown Dubai showroom card, Google Maps link, and direct WhatsApp / Phone / Email actions. |

---

## 🎨 Design System, Colors & Typography

### Typography
- **Headings & Plush Serifs**: `Fraunces` (Google Fonts variable font with warm, soft curves).
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
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (SPA client-side navigation with route scroll restoration)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Version Control**: Git + GitHub CLI (`gh`)
- **Hosting & Deployment**: Netlify / Vercel SPA Hosting

---

## 🤖 AI Tools & Exact Prompts

During the development process, AI tools (Antigravity with Chrome DevTools Browser Subagent and Gemini 3.8 Flash) were utilized to accelerate inspection, structure extraction, and code scaffolding.

### Exact Prompts Provided:

1. **Website Deep Inspection & Scrape Prompt**:
   > *"Inspect the website https://puppy.instabizweb.com/ thoroughly. Extract the entire website structure, pages, design, colors, typography, layout, sections, images/assets, forms, interactions, responsive behavior, navigation, footer, and any backend/mock functionality. Return a complete breakdown with all HTML content, CSS styling, assets URLs, text content, and component structure so we can build an exact 1:1 pixel-perfect clone."*

2. **Style Extraction & Token Analysis Prompt**:
   > *"Extract CSS variables, computed font families, root background colors, button styles, custom Tailwind utility classes, and SVG illustrations from https://puppy.instabizweb.com/."*

3. **Data Model Synthesis Prompt**:
   > *"Synthesize a complete JavaScript data model containing all 15 available puppies, 24 adopted alumni tickets, 9 FAQ questions with verified answers, client testimonials, and showroom information matching the exact copy from the reference website."*

---

## 💡 Implementation Decisions & Architecture

1. **React SPA with Vite**:
   - Chosen for instantaneous sub-second route transitions, modular component architecture, and zero-hassle cloud deployment.
2. **Local Static Asset Bundling**:
   - 164 authentic original images and logos were downloaded into `public/media/` and `public/brand/` to ensure the clone operates with maximum performance without depending on third-party CDNs.
3. **Interactive Easter Egg Widget (`MascotWidget`)**:
   - Faithfully recreated the original custom SVG mascot doggie with dynamic eye-tracking math (`mousePos`), winking animations, speech bubble toggles, and click paw prints.
4. **Accessible Mad-Libs Letterform**:
   - Styled to match the vintage postage letter while providing modern form validation, state management, and prefilled WhatsApp handoff.

---

## 🧩 Challenges Faced & Solutions

1. **RSC (React Server Components) Data Extraction**:
   - *Challenge*: The reference website was built with Next.js Turbopack where puppy data was serialized inside `self.__next_f` script payloads rather than standard JSON REST APIs.
   - *Solution*: Developed a Python parser script that extracted the React Server Component chunks, decoded the unicode escapes, and recovered the complete structured puppy objects.
2. **Font & Layout Parity**:
   - *Challenge*: Replicating the hand-crafted scrapbook aesthetic with precise font pairing.
   - *Solution*: Linked Google Fonts (`Fraunces`, `Figtree`, and `Shantell Sans`) with custom CSS utilities for `.tp-tape` (masking tape effect) and `.tp-ticket` (perforated admit-one notches).
3. **SPA Deep Route Handling on Refresh**:
   - *Challenge*: Direct visits to `/puppies/maltipoo-max-male` on static hosting return 404 without server redirection.
   - *Solution*: Configured `public/_redirects` (`/*  /index.html  200`) to guarantee seamless client-side routing on all deployment providers.

---

## 🧪 Testing & Quality Assurance

- **Cross-Browser Verification**: Tested in Chromium, Edge, Firefox, and mobile viewport simulations (iPhone, iPad, Desktop 1920x1080).
- **Responsive Breakpoint Testing**: Verified header drawer toggle, mobile bottom bar appearance, responsive card grids, and ticket layouts.
- **Production Build Validation**: Ran `npm run build` with Vite producing zero warnings or errors.
- **Form & Navigation Verification**: Tested search queries, breed pills, origin toggles, video modals, photo lightboxes, and WhatsApp links.

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

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🎥 Loom Video Walkthrough Script

For the required video submission, follow this structured outline:

1. **Introduction (0:00 - 0:45)**:
   - Introduce yourself: *"Hi team, I'm Bontha Vijay, a 2026 graduate in AI & Data Science applying for Full-Stack Developer Engineer at Insta Biz Web."*
   - State the project goal: Building a 1:1 pixel-perfect clone of TeddyPups U.A.E. (`https://puppy.instabizweb.com/`).
2. **Side-by-Side Visual & Functional Comparison (0:45 - 2:30)**:
   - Walk through the Home page, showing the announcement banner, hero section, interactive Teddy mascot with cursor tracking, breed filtering, and two adoption flows.
   - Demonstrate `/puppies` with real-time search, breed filter pills, location origin, and video modal preview.
   - Open `/puppies/maltipoo-max-male` to showcase the photo gallery, lightbox, and pre-filled WhatsApp link.
   - Showcase `/gone-home` with the vintage admit-one ticket stub motif.
   - Showcase `/happy-families` polaroid memory wall and `/contact` Mad-Libs letter.
3. **Tech Stack & Architecture (2:30 - 3:45)**:
   - React 18, Vite, Tailwind CSS, React Router DOM, Lucide Icons.
   - Show project structure: `src/components`, `src/pages`, `src/data`, `public/media`.
4. **AI Tools & Workflow (3:45 - 4:45)**:
   - Explain how Chrome DevTools browser subagent was used to inspect CSS variables, fonts, and RSC payloads.
   - Highlight exact prompts and how design tokens were converted into Tailwind config.
5. **Challenges, Testing & Deployment (4:45 - 5:30)**:
   - Solving SPA fallback routing with `_redirects`.
   - Production build verification and deployment to live URL.
   - Conclusion and thank you.

---

*Submission by **Bontha Vijay** — Insta Biz Web Technical Round*

