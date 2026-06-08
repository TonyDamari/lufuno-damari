# Implementation Plan: Awwwards Redesign, Photography & SEO

## Overview

This plan transforms the existing Lufuno Damari portfolio into an awwwards-inspired cinematic experience. It covers data model updates, SEO metadata/JSON-LD, new components (ProjectItem, PhotographySection, Lightbox), refactoring of existing components (Navbar, SideMenu, Footer, AnimatedSection, HeroSection, SelectedWork), and property-based testing with fast-check.

## Tasks

- [x] 1. Data model updates and SEO metadata
  - [x] 1.1 Extend data models in `data/portfolio.ts`
    - Add `PhotoItem` interface with fields: id, title, category, src, alt, width, height
    - Extend `ContactInfo` interface with optional `facebookUrl` and `linkedinUrl` fields
    - Add `photographyItems: PhotoItem[]` to `PortfolioData` interface
    - Add at least 6 placeholder `PhotoItem` entries to `portfolioData` with descriptive alt text and realistic dimensions
    - Update `contact` object with actual social URLs from existing data
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x] 1.2 Implement SEO metadata export in `app/layout.tsx`
    - Replace the existing minimal metadata export with the full SEO metadata object
    - Include title, description, keywords (≥8 phrases including "videographer Johannesburg", "cinematographer South Africa", "photographer Johannesburg")
    - Add authors and robots (index, follow) fields
    - Add Open Graph metadata: og:title, og:description, og:image (1200×630), og:type (website), og:locale (en_ZA)
    - Add Twitter Card metadata: card (summary_large_image), title, description
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 1.3 Create `components/JsonLd.tsx` and embed structured data in layout
    - Create a server component `JsonLd` that renders `<script type="application/ld+json">` with serialized data
    - Embed Person schema (name, jobTitle array, url, address, sameAs) in `app/layout.tsx`
    - Embed CreativeWork schema (creator, genre, keywords) in `app/layout.tsx`
    - Ensure both schemas validate against Schema.org specification
    - _Requirements: 12.4, 12.5, 12.6_

  - [ ]* 1.4 Write property test for PhotoItem data integrity
    - **Property 5: PhotoItem Data Integrity**
    - Generate random PhotoItem objects and verify: alt length ≥ 10, width ∈ [800, 4000], height ∈ [600, 3000], src matches `/images/{filename}.{extension}` pattern
    - Install `fast-check` and configure test runner (Vitest) if not already set up
    - **Validates: Requirements 11.3, 11.5**

- [x] 2. Core component creation
  - [x] 2.1 Create `components/ProjectItem.tsx` with hover-reveal thumbnail
    - Implement horizontal row layout: index number, title, role with 1px border-bottom separator
    - Implement lerp-based cursor-following thumbnail using `requestAnimationFrame` with smoothing factor 0.1
    - Thumbnail: 300px width, 16:9 aspect ratio, positioned offset +20px from cursor on both axes
    - Scale animation: 0→1 on mouseenter (300ms ease-out), 1→0 on mouseleave (300ms ease-in)
    - Detect touch devices via `pointer: coarse` media query and hide thumbnail on touch
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 16.5_

  - [x] 2.2 Create `sections/PhotographySection.tsx` with masonry grid
    - Implement masonry grid using CSS `columns` property: 2 columns (< 768px), 2 columns (768–1023px), 3 columns (≥ 1024px)
    - Each Gallery_Item uses Next.js `<Image>` with lazy loading and `sizes="(max-width: 767px) 50vw, 33vw"`
    - Hover effect: scale(1.03) + brightness(110%) with 300ms CSS transition
    - Section heading using display typography scale (text-[8vw] lg:text-[4vw])
    - Pull data from `portfolioData.photographyItems`
    - On click, open lightbox with selected image index
    - _Requirements: 10.1, 10.2, 10.3, 10.7, 10.8, 10.9, 16.3_

  - [x] 2.3 Create `components/Lightbox.tsx` with wrap-around navigation
    - Full-screen overlay with semi-transparent backdrop (bg-black/90)
    - Framer Motion AnimatePresence for enter/exit transitions
    - Left/right arrow navigation + keyboard support (ArrowLeft, ArrowRight)
    - Wrap-around: past last → first, before first → last
    - Close button top-right corner, Escape key closes lightbox
    - Focus trapping within lightbox while open
    - Return focus to triggering Gallery_Item on close
    - _Requirements: 10.4, 10.5, 10.6_

  - [ ]* 2.4 Write property test for lerp-based thumbnail tracking convergence
    - **Property 2: Lerp-Based Thumbnail Tracking Convergence**
    - Generate random current/target positions, verify `next = current + (target - current) * 0.1` produces value strictly between current and target, converging monotonically without overshoot
    - **Validates: Requirements 7.2**

  - [ ]* 2.5 Write property test for lightbox navigation wrap-around
    - **Property 4: Lightbox Navigation Wrap-Around**
    - Generate random array lengths (N ≥ 1) and boundary indices, verify: forward from N−1 → 0, backward from 0 → N−1, forward from i → i+1, backward from i → i−1
    - **Validates: Requirements 10.6**

- [x] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Refactor existing components for awwwards aesthetic
  - [x] 4.1 Update `components/SelectedWork.tsx` to use ProjectItem list layout
    - Replace grid of `ProjectCard` with a vertical list of `ProjectItem` components
    - Section heading uses display typography (text-[8vw] lg:text-[4vw])
    - Maintain VideoModal integration for play functionality
    - _Requirements: 7.4, 1.2, 1.6_

  - [x] 4.2 Refactor `components/layout/Navbar.tsx` for Lufuno branding
    - Replace "Dennis Snellenberg" branding with "© Lufuno Damari" copyright mark
    - Add "Photography" link to the navigation items (Work, Photography, About, Contact)
    - Add `aria-label="Toggle menu"` to hamburger button
    - Ensure hamburger button is keyboard-focusable
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 3.4_

  - [x] 4.3 Update `components/layout/SideMenu.tsx` navigation and social links
    - Add "Photography" to navItems array (Home, Work, Photography, About, Contact)
    - Update social links to pull from `portfolioData.contact` (Instagram, Facebook)
    - Add Escape key handler to close SideMenu
    - Ensure SideMenu occupies 100% viewport width on mobile
    - _Requirements: 5.4, 5.5, 16.4_

  - [x] 4.4 Refactor `components/layout/Footer.tsx` to multi-column data-driven layout
    - Restructure to 3-column layout: copyright, nav links, social links (side-by-side ≥ 768px, stacked below)
    - Pull social URLs from `portfolioData.contact` (instagramUrl, facebookUrl, linkedinUrl)
    - Wrap each social link in Magnetic_Component
    - Conditionally render social links (omit if URL is undefined/null)
    - Dynamic year: "© {year} Lufuno Damari"
    - Each social link opens in new tab with proper anchor href
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 4.5 Enhance `sections/AnimatedSection.tsx`
    - Change `y: 20` → `y: 40` for more dramatic entrance
    - Change `duration: 0.5` → `duration: 0.6`
    - Replace `viewport: { margin: "-100px" }` with `viewport: { once: true, amount: 0.2 }` for 20% visibility threshold
    - Maintain reduced-motion handling (render immediately without animation)
    - Ensure pre-animation state (opacity: 0) remains accessible to screen readers
    - _Requirements: 15.1, 15.2, 15.3, 15.5, 15.6_

  - [ ]* 4.6 Write property test for magnetic displacement proportionality
    - **Property 1: Magnetic Displacement Proportionality**
    - Generate random (dx, dy) cursor offsets, verify resulting translation target equals (dx × 0.35, dy × 0.35)
    - **Validates: Requirements 3.1**

  - [ ]* 4.7 Write property test for conditional social link rendering
    - **Property 3: Conditional Social Link Rendering**
    - Generate random ContactInfo objects with mix of defined/undefined social URLs, verify rendered link count matches count of defined URLs
    - **Validates: Requirements 9.5**

- [x] 5. Hero, typography, and responsive refinements
  - [x] 5.1 Update `sections/HeroSection.tsx` typography and heading hierarchy
    - Update h1 to use `text-[8vw] lg:text-[4vw]` minimum sizing
    - Ensure single `<h1>` element contains Lufuno Damari's name
    - Add `priority` attribute to hero poster image
    - Verify semantic heading: only one h1 in the entire document
    - _Requirements: 1.2, 13.1, 13.5, 14.5_

  - [x] 5.2 Apply dark cinematic spacing and typography scale across all sections
    - Ensure all sections use dark background (#0a0a0a or equivalent ≤5% luminance)
    - Apply minimum 120px vertical padding between sections (≥ 1024px) and 64px (< 1024px)
    - Ensure all section headings use h2 elements with display typography scale
    - Ensure sub-headings within sections use h3 elements
    - Verify no heading level is skipped in the document
    - Body text colour no darker than #ededed with ≥4.5:1 contrast ratio
    - _Requirements: 1.1, 1.3, 1.5, 1.6, 13.2, 13.3, 13.4_

  - [ ]* 5.3 Write property test for heading hierarchy non-skip
    - **Property 6: Heading Hierarchy Non-Skip**
    - Generate random heading level sequences, verify no heading is more than one level deeper than its predecessor
    - **Validates: Requirements 13.4**

  - [ ]* 5.4 Write property test for meaningful image alt text bounds
    - **Property 7: Meaningful Image Alt Text Bounds**
    - Generate random alt text strings, verify length is between 5 and 125 characters inclusive for meaningful (non-decorative) images
    - **Validates: Requirements 14.1**

- [x] 6. Integration and wiring
  - [x] 6.1 Wire PhotographySection into page layout in `app/page.tsx`
    - Add PhotographySection between SelectedWork and SkillsSection
    - Wrap in AnimatedSection
    - Ensure all sections between HeroSection and Footer are wrapped in AnimatedSection
    - Update section ordering: Hero → QuickInfoBar → SelectedWork → Photography → Skills → About → Experience → CTA → Contact → Footer
    - _Requirements: 10.1, 15.4_

  - [x] 6.2 Ensure responsive behaviour and image optimization
    - Verify no horizontal overflow at 320px viewport width
    - Verify all photography and project images use Next.js Image component with explicit width, height, sizes props
    - Verify below-fold images use `loading="lazy"` and hero image uses `priority`
    - Ensure layout dimensions preserved on image load failure (alt text fallback, no layout shift)
    - Set decorative images to `alt=""`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 16.6_

  - [x] 6.3 Locomotive Scroll fallback and smooth scroll verification
    - Ensure Locomotive Scroll initialises within 3 seconds with Promise.race timeout
    - If initialisation fails, fall back to native browser scrolling while preserving navigation links and section anchors
    - Verify parallax on hero background video (≥30% speed differential)
    - Verify hero text opacity fades from 1→0 over first 80% scroll progress
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- The design specifies TypeScript throughout — all implementations use TypeScript/React
- Existing components (Preloader, Magnetic, RoundedButton, Curve) are largely preserved; refactoring focuses on Navbar, SideMenu, Footer, AnimatedSection, and SelectedWork
- The `ProjectCard` component is preserved but replaced by `ProjectItem` in the SelectedWork section

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "4.5"] },
    { "id": 3, "tasks": ["2.4", "2.5", "4.1", "4.2", "4.3", "4.4"] },
    { "id": 4, "tasks": ["4.6", "4.7", "5.1", "5.2"] },
    { "id": 5, "tasks": ["5.3", "5.4", "6.1"] },
    { "id": 6, "tasks": ["6.2", "6.3"] }
  ]
}
```
