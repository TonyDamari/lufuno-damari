# Requirements Document

## Introduction

A modern, high-end one-page portfolio website for a junior videographer based in Johannesburg, South Africa. The site is built with Next.js (App Router), React, Tailwind CSS, and Framer Motion. Its primary goal is to help a junior videographer get hired by production houses and marketing agencies by presenting an agency-grade creative portfolio that drives visitors toward contacting the candidate.

## Glossary

- **Portfolio_Site**: The single-page Next.js web application serving as the videographer's portfolio
- **Hero_Section**: The full-width above-the-fold section containing the showreel embed, name, role, tagline, and CTA buttons
- **Showreel**: An embedded YouTube or Vimeo video iframe displaying the videographer's highlight reel
- **Quick_Info_Bar**: A horizontal bar below the hero displaying four key capability summaries
- **Selected_Work_Section**: A grid layout section showcasing 3–6 portfolio project cards
- **Project_Card**: An individual card within the Selected Work Section containing a video thumbnail, title, role, and description
- **Skills_Section**: A section displaying the videographer's skills split into Production and Post-production categories
- **About_Section**: A short professional bio section describing the videographer's background and goals
- **Experience_Section**: A minimal list of the videographer's roles and experience
- **CTA_Section**: A hiring-focused call-to-action section with contact buttons
- **Contact_Section**: The final section displaying email, phone, Instagram, and location details
- **Visitor**: Any person viewing the Portfolio_Site, typically a recruiter or agency representative

## Requirements

### Requirement 1: Hero Section Display

**User Story:** As a Visitor, I want to see an impactful cinematic hero section immediately on page load, so that I understand the videographer's identity and can watch their showreel without scrolling.

#### Acceptance Criteria

1. THE Hero_Section SHALL display as the first visible content on page load, occupying the full viewport width and at least 90% of the viewport height, using the site's dark colour theme
2. THE Hero_Section SHALL contain an embedded Showreel iframe (YouTube or Vimeo) displayed at a 16:9 aspect ratio as the largest visual element within the section
3. THE Hero_Section SHALL display the videographer's name as a placeholder "[Full Name]"
4. THE Hero_Section SHALL display the role line "Videographer · Video Editor · Camera Assistant"
5. THE Hero_Section SHALL display the location line "Johannesburg, South Africa"
6. THE Hero_Section SHALL display the tagline "Crafting clean, story-driven visuals for brands, events, and digital content."
7. THE Hero_Section SHALL contain two CTA buttons labelled "View Showreel" and "Contact"
8. WHEN the Visitor clicks "View Showreel", THE Hero_Section SHALL smooth-scroll the page to bring the Showreel embed into the center of the viewport
9. WHEN the Visitor clicks "Contact", THE Hero_Section SHALL smooth-scroll the page to the Contact_Section
10. IF the Showreel iframe fails to load, THEN THE Hero_Section SHALL display a fallback placeholder with the text "Showreel coming soon" in place of the iframe

### Requirement 2: Quick Info Bar

**User Story:** As a Visitor, I want to quickly scan the videographer's key capabilities, so that I can assess suitability at a glance.

#### Acceptance Criteria

1. THE Quick_Info_Bar SHALL display exactly four items in a single horizontal row below the Hero_Section, in the following order from left to right: "On-set production experience", "Video editing (Premiere Pro / DaVinci Resolve)", "Camera operation", "Available for freelance / junior roles"
2. THE Quick_Info_Bar SHALL render each item as a distinct text element with equal width allocation across the row
3. WHILE the viewport width is less than 768px, THE Quick_Info_Bar SHALL arrange items in a two-column, two-row grid layout maintaining the same item order (left-to-right, top-to-bottom)
4. IF the Quick_Info_Bar is rendered, THEN THE Quick_Info_Bar SHALL be positioned immediately after the Hero_Section with no intervening content

### Requirement 3: Selected Work Display

**User Story:** As a Visitor, I want to browse the videographer's portfolio projects, so that I can evaluate their work quality and range.

#### Acceptance Criteria

1. THE Selected_Work_Section SHALL display between 3 and 6 Project_Cards in a responsive grid layout with a single column below 768px viewport width, 2 columns between 768px and 1023px, and 3 columns at 1024px and above
2. WHEN a Project_Card is rendered, THE Project_Card SHALL display a video thumbnail image in 16:9 aspect ratio, a project title (maximum 60 characters), a role description (e.g. "Camera Assistant", "Editor"), and a project description of no more than 120 characters
3. WHEN the Visitor clicks a Project_Card thumbnail, THE Portfolio_Site SHALL open a video playback modal overlaying the current page
4. WHILE the viewport width is less than 768px, THE Selected_Work_Section SHALL display Project_Cards in a single-column layout
5. IF the video source for a Project_Card is unavailable or fails to load, THEN THE Portfolio_Site SHALL display the static thumbnail image with a visual indicator that the video is unavailable

### Requirement 4: Skills Display

**User Story:** As a Visitor, I want to see a categorised list of the videographer's technical skills, so that I can match them against job requirements.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills organized under two visible category headings labelled "Production" and "Post-production", with each category visually distinct from the other
2. THE Skills_Section SHALL display the following Production skills as individually readable items: "Camera operation", "On-set assisting", "Lighting basics"
3. THE Skills_Section SHALL display the following Post-production skills as individually readable items: "Adobe Premiere Pro", "DaVinci Resolve", "Social media editing (Reels, TikTok, Shorts)", "Basic colour correction"
4. WHILE the viewport width is less than 768px, THE Skills_Section SHALL stack the two skill categories vertically in a single-column layout

### Requirement 5: About Section

**User Story:** As a Visitor, I want to read a short professional bio, so that I understand the videographer's background and professional goals.

#### Acceptance Criteria

1. THE About_Section SHALL contain a professional bio paragraph between 50 and 150 words in length
2. THE About_Section SHALL communicate the following points: recent film/media graduate status, on-set assistant experience, passion for storytelling and fast-paced production environments, and availability for junior roles in production or editing
3. THE About_Section SHALL use language that is exclusively work-focused, containing no informal slang, no personal anecdotes unrelated to professional experience, and no references to hobbies or family
4. THE About_Section SHALL display a visible section heading that identifies it as the bio or about content

### Requirement 6: Experience Display

**User Story:** As a Visitor, I want to see the videographer's experience listed concisely, so that I can verify relevant work history.

#### Acceptance Criteria

1. THE Experience_Section SHALL display a visible section heading labelled "Experience"
2. THE Experience_Section SHALL display the following roles as an unordered list with exactly three items: "Production Assistant (freelance / student projects)", "Camera Assistant", "Video Editor (short-form content)"
3. THE Experience_Section SHALL display each role as a single line of text without additional metadata such as dates or company names
4. THE Experience_Section SHALL apply a minimum vertical spacing of 16px between list items and a minimum of 32px of padding above and below the section content

### Requirement 7: Call to Action Section

**User Story:** As a Visitor, I want a clear hiring-focused prompt, so that I am encouraged to contact the videographer about opportunities.

#### Acceptance Criteria

1. THE CTA_Section SHALL display the text "I am currently available for junior production roles, freelance work, and assistant positions in Johannesburg."
2. THE CTA_Section SHALL contain two CTA buttons labelled "Email me" and "Download CV"
3. WHEN the Visitor clicks "Email me", THE CTA_Section SHALL open the user's default email client with the videographer's email address pre-filled in the "To" field and a subject line pre-filled with "Opportunity: " followed by a placeholder role context
4. WHEN the Visitor clicks "Download CV", THE CTA_Section SHALL initiate a browser download of the videographer's CV as a PDF file no larger than 5 MB
5. IF the CV file is unavailable or fails to download, THEN THE CTA_Section SHALL display an error message indicating the file could not be retrieved and the button SHALL remain visible for retry

### Requirement 8: Contact Section

**User Story:** As a Visitor, I want to access the videographer's contact details, so that I can reach out about opportunities.

#### Acceptance Criteria

1. THE Contact_Section SHALL display an email address as a clickable mailto link that opens the Visitor's default email client with the videographer's email address pre-filled
2. WHERE phone number display is enabled, THE Contact_Section SHALL display a phone number in international format as a clickable tel link
3. WHEN the Visitor clicks the Instagram profile link, THE Contact_Section SHALL open the videographer's Instagram profile in a new browser tab
4. THE Contact_Section SHALL display the location "Johannesburg, South Africa" as static text

### Requirement 9: Dark Cinematic Design Theme

**User Story:** As a Visitor, I want the site to feel premium and cinematic, so that I perceive the videographer as a serious professional.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a dark colour theme with a background luminance no greater than 10% (e.g. #0a0a0a–#1a1a1a) and foreground text that meets WCAG AA contrast ratio (minimum 4.5:1 for body text, 3:1 for large text) across all sections
2. THE Portfolio_Site SHALL use Inter as the primary font family with a fallback stack of system sans-serif typefaces (e.g. -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)
3. THE Portfolio_Site SHALL apply a minimum of 64px vertical padding between sections and a minimum of 16px spacing between content elements within a section
4. WHEN a section or interactive element enters the viewport, THE Portfolio_Site SHALL trigger a Framer Motion animation with a duration between 300ms and 700ms, limited to opacity and vertical translate (max 20px movement) properties
5. IF the Visitor has enabled a reduced-motion preference in their operating system, THEN THE Portfolio_Site SHALL disable all scroll-triggered animations and display content without motion

### Requirement 10: Mobile-First Responsive Design

**User Story:** As a Visitor on a mobile device, I want the site to be fully usable and visually polished, so that I can review the portfolio on any screen size.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support three responsive layout ranges: mobile (320px to 767px), tablet (768px to 1023px), and desktop (1024px and above), with 320px as the minimum supported viewport width
2. WHILE the viewport width is less than 768px, THE Portfolio_Site SHALL display all sections in a single-column layout with interactive tap targets of at least 44×44 CSS pixels and no horizontal scrollbar visible
3. WHILE the viewport width is between 768px and 1023px, THE Portfolio_Site SHALL display content in a two-column grid layout where applicable (Selected_Work_Section, Quick_Info_Bar) while maintaining single-column layout for text-heavy sections (About_Section, Experience_Section)
4. THE Portfolio_Site SHALL render body text at a minimum font size of 16px and maintain a minimum contrast ratio of 4.5:1 for all text across all supported viewport sizes
5. THE Portfolio_Site SHALL ensure all images and media embeds scale proportionally without causing horizontal overflow at any supported viewport width

### Requirement 11: Performance Optimisation

**User Story:** As a Visitor, I want the site to load quickly on mobile networks, so that I do not abandon the page before seeing the content.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL achieve a Largest Contentful Paint (LCP) of under 2 seconds when tested on a simulated 4G connection (9 Mbps downstream, 1.5 Mbps upstream, 40ms RTT) with CPU throttling set to 4× slowdown
2. THE Portfolio_Site SHALL use the Next.js Image component for all raster images with automatic format optimisation, and SHALL apply lazy loading to images below the fold and eager loading to images within the Hero_Section
3. THE Portfolio_Site SHALL defer loading of all video embed iframes until the embed container is within 200px of the visible viewport, so that no video iframe is present in the initial HTML payload
4. THE Portfolio_Site SHALL avoid autoplay audio on any media element
5. THE Portfolio_Site SHALL deliver an initial page transfer size of no more than 500 KB (compressed) before lazy-loaded resources are fetched

### Requirement 12: Technical Architecture

**User Story:** As a developer, I want clean, maintainable code using modern tooling, so that the site can be extended and maintained efficiently.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be built using the Next.js App Router with TypeScript and React components, where shared UI elements are extracted into separate component files rather than duplicated
2. THE Portfolio_Site SHALL use Tailwind CSS utility classes for all styling with no inline style attributes or external CSS stylesheets beyond the global Tailwind base
3. THE Portfolio_Site SHALL use Framer Motion for animations
4. THE Portfolio_Site SHALL organise components within a dedicated directory (either `app/_components/` or a top-level `components/` folder) with each component in its own file named to match the component's export
5. THE Portfolio_Site SHALL use the `next/image` component for all raster image rendering
6. THE Portfolio_Site SHALL limit total page content to no more than 8 distinct sections, with no individual section exceeding 100vh in height at the desktop breakpoint (1024px)
7. THE Portfolio_Site SHALL use TypeScript for all source files with no use of the `any` type in component props or function signatures

### Requirement 13: Conversion-Focused UX

**User Story:** As the videographer (site owner), I want every element on the page to push visitors toward contacting me, so that I maximise my chances of being hired.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL place at least one CTA button linking to the Contact_Section or triggering a contact action (email client, scroll-to-contact) in each of the following locations: Hero_Section, CTA_Section, and Contact_Section
2. THE Portfolio_Site SHALL ensure the Showreel is the first interactive content element visible on page load, positioned above all other clickable or playable elements in the visual order
3. WHEN the bottom edge of the Hero_Section scrolls above the viewport top, THE Portfolio_Site SHALL display a fixed or sticky navigation element containing a "Contact" link that remains visible until the Visitor reaches the Contact_Section
4. THE Portfolio_Site SHALL render CTA buttons with a font size at least 4px larger than body text, a background colour that meets WCAG AA contrast ratio (at least 4.5:1 against surrounding background), and a minimum touch-target size of 44×44px
5. WHEN the Visitor clicks the "Contact" link in the sticky navigation element, THE Portfolio_Site SHALL scroll the page to the Contact_Section
