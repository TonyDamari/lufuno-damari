# Implementation Plan: Videographer Portfolio

## Overview

Build a single-page dark cinematic portfolio website for a junior videographer using Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. The implementation follows a component-per-file architecture with a static data layer, server-first rendering strategy, and client components only where interactivity is required.

## Tasks

- [x] 1. Set up project foundation and data layer
  - [x] 1.1 Configure root layout with Inter font, dark theme, and metadata
    - Replace Geist fonts with Inter via `next/font/google`
    - Set `<html>` dark class and dark background on `<body>`
    - Update metadata (title, description) for SEO
    - Add smooth scroll behaviour via CSS
    - _Requirements: 9.1, 9.2, 12.1_

  - [x] 1.2 Create static data file `data/portfolio.ts`
    - Define all TypeScript interfaces: `Project`, `SkillCategory`, `ExperienceRole`, `ContactInfo`, `PortfolioData`
    - Export the `portfolioData` singleton with placeholder content
    - Ensure no use of `any` type
    - _Requirements: 12.7, 5.1, 5.2_

  - [x] 1.3 Set up global styles in `app/globals.css`
    - Import Tailwind layers
    - Define CSS custom properties for dark theme colours
    - Add base dark background and text colour
    - Add smooth scroll-behavior on html element
    - _Requirements: 9.1, 9.3, 12.2_

  - [x] 1.4 Create `CTAButton` reusable component
    - Implement as Server Component rendering `<a>` when `href` is provided, `<button>` when `onClick` is provided
    - Support `primary` and `secondary` variants with WCAG AA contrast
    - Support `download` prop for CV download
    - Apply min 44×44px touch target and font size 4px larger than body text
    - _Requirements: 13.4, 10.2, 7.2_

- [x] 2. Implement Hero Section and showreel
  - [x] 2.1 Create `HeroSection` server component
    - Full viewport width, minimum 90vh height
    - Display name placeholder, role line, location, and tagline from data
    - Include "View Showreel" and "Contact" CTA buttons
    - "View Showreel" smooth-scrolls to showreel embed; "Contact" scrolls to `#contact`
    - Dark cinematic background styling
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 13.1, 13.2_

  - [x] 2.2 Create `ShowreelEmbed` client component
    - `"use client"` directive with Intersection Observer for lazy loading
    - Render iframe only when container is within 200px of viewport
    - Display 16:9 aspect ratio iframe with accessible title
    - Implement 5-second timeout fallback: show "Showreel coming soon" if iframe fails to load
    - Provide retry action on fallback state
    - _Requirements: 1.2, 1.10, 11.3, 11.4_

- [x] 3. Implement Quick Info Bar and Selected Work
  - [x] 3.1 Create `QuickInfoBar` server component
    - Display exactly 4 capability items in a horizontal row on desktop
    - Equal width allocation across items
    - Switch to 2×2 grid below 768px
    - Position immediately after Hero Section
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.2 Create `SelectedWork` section component with `ProjectCard` and `VideoModal`
    - `SelectedWork` renders responsive grid: 1 col (<768px), 2 cols (768–1023px), 3 cols (≥1024px)
    - `ProjectCard` (client component): displays thumbnail (16:9), title, role, description; click opens modal
    - `VideoModal` (client component): dark overlay with 16:9 iframe, closes on overlay click / Escape / close button, traps focus, prevents body scroll
    - Handle unavailable video: show thumbnail with "Video unavailable" badge, disable click
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 11.3_

- [x] 4. Checkpoint — Verify hero and content sections render
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Skills, About, and Experience sections
  - [x] 5.1 Create `SkillsSection` server component
    - Two visible category headings: "Production" and "Post-production"
    - Each skill as an individually readable item
    - Two-column layout on desktop, single-column stack below 768px
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 5.2 Create `AboutSection` server component
    - Display section heading identifying bio/about content
    - Render professional bio paragraph (50–150 words placeholder)
    - Work-focused language communicating graduate status, experience, passion, availability
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 5.3 Create `ExperienceSection` server component
    - Section heading "Experience"
    - Unordered list with exactly 3 roles from data
    - Single-line text per role, no dates or company names
    - Minimum 16px vertical spacing between items, 32px padding above/below section
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 6. Implement CTA and Contact sections
  - [x] 6.1 Create `CTASection` server component
    - Display availability text from data
    - "Email me" button opens mailto with pre-filled To and Subject
    - "Download CV" button initiates PDF download with error handling
    - On download failure, display inline error message; button remains for retry
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 13.1_

  - [x] 6.2 Create `ContactSection` server component
    - Email as clickable mailto link
    - Phone as clickable tel link (conditionally rendered when phone is not null)
    - Instagram link opening in new tab
    - Location as static text "Johannesburg, South Africa"
    - Section id `contact` for scroll targeting
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 13.1_

- [x] 7. Implement StickyNav and AnimatedSection
  - [x] 7.1 Create `StickyNav` client component
    - `"use client"` with scroll event listener
    - Visible after Hero Section bottom edge scrolls above viewport top
    - Hidden when Contact Section enters viewport
    - Fixed bar at top with dark background, contains "Contact" link
    - "Contact" link smooth-scrolls to `#contact`
    - _Requirements: 13.3, 13.5_

  - [x] 7.2 Create `AnimatedSection` client component with Framer Motion
    - Install `framer-motion` dependency
    - `"use client"` wrapper using `useInView`
    - Animate from `opacity: 0, y: 20` to `opacity: 1, y: 0`
    - Duration 500ms, triggers once per element
    - Respect `prefers-reduced-motion`: skip animation and render immediately
    - Support optional `delay` and `className` props
    - _Requirements: 9.4, 9.5, 12.3_

  - [x] 7.3 Wrap all page sections with `AnimatedSection`
    - Apply animation wrapper to each section in `app/page.tsx`
    - Stagger delays for visual flow (0, 0.1, 0.2, etc.)
    - Ensure Hero Section uses minimal/no delay
    - _Requirements: 9.4_

- [x] 8. Assemble page and apply responsive design
  - [x] 8.1 Wire all components together in `app/page.tsx`
    - Import and render all sections in correct order: Hero, QuickInfoBar, SelectedWork, Skills, About, Experience, CTA, Contact
    - Include `StickyNav` at page level
    - Apply section spacing (minimum 64px vertical padding between sections)
    - Limit to 8 sections, none exceeding 100vh at desktop
    - _Requirements: 12.6, 9.3, 12.1_

  - [x] 8.2 Apply mobile-first responsive styles across all components
    - Verify single-column layout below 768px
    - Ensure 44×44px minimum tap targets on mobile
    - Verify no horizontal scrollbar at any supported width (320px minimum)
    - Body text minimum 16px font size
    - All images and media scale proportionally without overflow
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 9. Performance optimisation and image handling
  - [x] 9.1 Configure `next/image` for all raster images
    - Use `next/image` for all project thumbnails and any other raster images
    - Apply `priority` (eager loading) for Hero Section images
    - Apply `loading="lazy"` for below-fold images
    - Ensure automatic format optimisation
    - _Requirements: 11.2, 12.5_

  - [x] 9.2 Verify performance constraints
    - Ensure no video iframes in initial HTML payload (deferred via Intersection Observer)
    - Ensure no autoplay audio on any media element
    - Verify initial page transfer stays within 500 KB compressed target
    - _Requirements: 11.1, 11.3, 11.4, 11.5_

- [x] 10. Final checkpoint — Full build and validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All components use TypeScript with no `any` types in props or function signatures
- Server Components are the default; `"use client"` only for interactive components (ShowreelEmbed, ProjectCard, VideoModal, StickyNav, AnimatedSection)
- Content is managed via `data/portfolio.ts` — no CMS or API integration needed
- Framer Motion must be installed as a dependency (`npm install framer-motion`)
- The design has no Correctness Properties section (UI rendering project), so property-based tests are not included
- Checkpoints ensure incremental validation of rendering and functionality
- Each task references specific requirement numbers for traceability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["1.4", "7.2"] },
    { "id": 2, "tasks": ["2.1", "2.2", "3.1", "5.1", "5.2", "5.3"] },
    { "id": 3, "tasks": ["3.2", "6.1", "6.2"] },
    { "id": 4, "tasks": ["7.1", "7.3"] },
    { "id": 5, "tasks": ["8.1"] },
    { "id": 6, "tasks": ["8.2", "9.1"] },
    { "id": 7, "tasks": ["9.2"] }
  ]
}
```
