# Requirements Document

## Introduction

This feature transforms the existing Lufuno Damari portfolio into an award-worthy cinematic experience inspired by the Dennis Snellenberg/olivierlarose awwwards-landing-page aesthetic. It introduces a dedicated Photography gallery section and enhances the site's SEO for videography, cinematography, and photography discoverability. All styling uses Tailwind CSS v4 exclusively. The existing tech stack (Next.js 16, React 19, Framer Motion 12, GSAP 3.15, Locomotive Scroll 5) remains unchanged.

## Glossary

- **Site**: The Lufuno Damari portfolio web application built with Next.js 16 App Router
- **Locomotive_Scroll**: The smooth scroll library (v5) providing inertia-based scrolling and parallax data attributes
- **GSAP**: GreenSock Animation Platform used for magnetic cursor effects and timeline-based animations
- **Framer_Motion**: React animation library used for mount/unmount transitions and scroll-linked animations
- **Preloader**: The full-screen loading animation that cycles through greeting words before revealing the page
- **SideMenu**: The off-canvas navigation panel that slides in from the right with an SVG curve reveal
- **Magnetic_Component**: A wrapper that applies GSAP-driven magnetic cursor-following behaviour to child elements
- **RoundedButton**: A pill-shaped button component with GSAP-animated fill effect on hover
- **Project_Item**: A clickable card representing a portfolio piece (video or photography) in the work sections
- **Photography_Section**: A new dedicated gallery section displaying Lufuno's photography work
- **Gallery_Item**: An individual photograph entry within the Photography Section
- **JSON_LD**: JSON-based Linked Data structured markup embedded in the page head for search engines
- **Open_Graph**: Meta tag protocol used by social platforms to display rich link previews
- **Heading_Hierarchy**: The semantic ordering of h1 through h6 tags on the page for accessibility and SEO
- **Viewport_Section**: A full-height (100vh) content block within the single-page layout

## Requirements

### Requirement 1: Dark Cinematic Visual Foundation

**User Story:** As a visitor, I want the site to have a dark cinematic aesthetic with large typography and generous spacing, so that it feels like a premium creative portfolio.

#### Acceptance Criteria

1. THE Site SHALL use a dark background colour with a maximum relative luminance of 5% (e.g., #0a0a0a) across all sections
2. THE Site SHALL render heading typography at display scale (minimum 4vw for section headings on viewports 1024px wide and above, and minimum 8vw on viewports below 1024px)
3. THE Site SHALL maintain a minimum of 120px vertical padding between Viewport_Sections on viewports 1024px wide and above, and a minimum of 64px vertical padding on viewports below 1024px
4. THE Site SHALL use Tailwind CSS v4 utility classes as the sole styling mechanism for all new and refactored components
5. THE Site SHALL implement a colour scheme where foreground text achieves a minimum contrast ratio of 4.5:1 against the dark background, with primary body text no darker than #ededed
6. THE Site SHALL render each Viewport_Section (Hero, Selected Work, Photography, Skills, About, Experience, CTA, and Contact) occupying at least 100vh on initial view on viewports 1024px wide and above

### Requirement 2: Smooth Scroll and Parallax

**User Story:** As a visitor, I want smooth inertia-based scrolling with parallax depth effects, so that the browsing experience feels fluid and cinematic.

#### Acceptance Criteria

1. WHEN the page loads, THE Site SHALL initialise Locomotive_Scroll to provide inertia-based smooth scrolling across the entire page within 3 seconds of the DOM content being ready
2. WHILE the user scrolls, THE Site SHALL apply parallax translation to the Hero background video element at a speed differential of at least 30% relative to foreground content, such that the background translates at no more than 70% of the foreground scroll distance
3. WHILE the user scrolls past the Hero section, THE Site SHALL reduce Hero text content opacity from 1.0 to 0.0, mapped linearly to the first 80% of the Hero section's scroll progress through the viewport
4. IF Locomotive_Scroll fails to initialise within 3 seconds or throws an error, THEN THE Site SHALL fall back to native browser scrolling while preserving all navigation links, buttons, and section anchors in a functional and interactive state
5. WHILE Locomotive_Scroll is active, THE Site SHALL maintain a frame rate of at least 30 fps during scroll interactions on devices that support requestAnimationFrame

### Requirement 3: Magnetic Cursor Interactions

**User Story:** As a visitor, I want interactive elements to respond to my cursor with a magnetic pull effect, so that the interface feels alive and engaging.

#### Acceptance Criteria

1. WHEN the cursor moves within a Magnetic_Component boundary, THE GSAP animation SHALL translate the element toward the cursor position by a factor of 0.35 of the cursor offset from the element center, using elastic.out easing with a duration of 1 second
2. WHEN the cursor leaves a Magnetic_Component boundary, THE GSAP animation SHALL return the element to its original position (x: 0, y: 0 translation) using elastic.out easing with a duration of 1 second
3. THE Site SHALL wrap all navigation links, social links, and RoundedButton instances in a Magnetic_Component
4. THE Site SHALL wrap the fixed navigation hamburger button in a Magnetic_Component
5. WHILE a Magnetic_Component animation is in progress, THE GSAP animation SHALL allow new cursor position updates to interrupt and override the current translation target without queuing

### Requirement 4: Rounded Button with Fill Animation

**User Story:** As a visitor, I want buttons to have a satisfying fill animation on hover, so that the interactive elements feel polished and intentional.

#### Acceptance Criteria

1. THE RoundedButton SHALL render with a pill shape (border-radius of 3em) and a 2px solid border
2. WHEN the cursor enters a RoundedButton, THE GSAP timeline SHALL animate a circular background element from top: 100% to top: -25% with width expanding to 150% over 0.4 seconds using power3.in easing, creating a fill-through effect
3. WHEN the cursor leaves a RoundedButton, THE GSAP timeline SHALL continue animating the circular background element from top: -25% to top: -150% with width at 125% over 0.25 seconds, so the background exits upward
4. THE RoundedButton SHALL accept a configurable backgroundColor prop with a default value of "#455CE9"
5. THE RoundedButton SHALL be wrapped in a Magnetic_Component to combine both magnetic cursor-follow and fill animation effects

### Requirement 5: Side Navigation with SVG Curve Reveal

**User Story:** As a visitor, I want the navigation menu to slide in with a curved edge animation, so that transitions feel smooth and distinctive.

#### Acceptance Criteria

1. WHEN the user activates the navigation toggle, THE SideMenu SHALL slide in from the right edge of the viewport with a Framer_Motion slide animation over 0.8 seconds using cubic-bezier(0.76, 0, 0.24, 1) easing
2. WHILE the SideMenu is open, THE Curve component SHALL render an SVG path that animates from a concave shape to a straight edge over 1 second with cubic-bezier(0.76, 0, 0.24, 1) easing
3. WHEN the user closes the SideMenu, THE Curve component SHALL animate the SVG path back to the concave shape over 0.8 seconds before the panel exits
4. THE SideMenu SHALL display navigation links (Home, Work, Photography, About, Contact) and social links (Instagram, Facebook)
5. WHEN the user presses the Escape key while the SideMenu is open, THE Site SHALL close the SideMenu

### Requirement 6: Preloader with Cycling Words

**User Story:** As a visitor, I want to see a branded loading animation with cycling words before the page reveals, so that the first impression is intentional and premium.

#### Acceptance Criteria

1. WHEN the page first loads, THE Preloader SHALL display a full-screen overlay at z-index 50 with a dark background (#141516)
2. WHILE the Preloader is active, THE Preloader SHALL cycle sequentially through a list of at least 5 multilingual greeting words, displaying the first word for 1000ms and each subsequent word for 150ms, stopping on the final word
3. WHEN a fixed 2000ms duration has elapsed after page load, THE Preloader SHALL exit with an upward slide animation over 800ms using a cubic-bezier ease and an SVG curve path transition over 700ms with a 300ms delay
4. WHILE the Preloader is active, THE Preloader SHALL prevent page scrolling by disabling scroll on the document body
5. WHEN the Preloader exit animation completes, THE Preloader SHALL re-enable page scrolling and reset the scroll position to the top of the page

### Requirement 7: Project Items with Hover Reveal Effects

**User Story:** As a visitor, I want project cards to reveal a thumbnail image that follows my cursor on hover, so that browsing work feels interactive and dynamic.

#### Acceptance Criteria

1. WHEN the cursor hovers over a Project_Item, THE Site SHALL reveal a thumbnail image that scales from transform scale(0) to scale(1) over 300ms with ease-out timing
2. WHILE the cursor moves over a Project_Item, THE revealed thumbnail SHALL follow the cursor position using lerp-based tracking with a smoothing factor of 0.1, updating on each animation frame
3. WHEN the cursor leaves a Project_Item, THE thumbnail SHALL scale from scale(1) to scale(0) over 300ms with ease-in timing and then set display to hidden
4. THE Project_Item list SHALL display project title and role in a horizontal layout with a 1px solid separator line between items
5. THE Project_Item thumbnail SHALL render at a fixed size of 300px width with 16:9 aspect ratio, positioned offset from the cursor by 20px on both axes

### Requirement 8: Navigation Transformation on Scroll

**User Story:** As a visitor, I want the navigation to minimise and transform as I scroll, so that it stays accessible without dominating the viewport.

#### Acceptance Criteria

1. WHILE the page scroll position is within one viewport height (0 to 100vh) from the top, THE Site SHALL display the full horizontal navigation bar with logo and text links in a fixed position at the top of the page
2. WHEN the user scrolls past one viewport height (scroll position exceeds 100vh), THE Site SHALL hide the full navigation bar and display a fixed circular hamburger button positioned 20px from the top edge and 20px from the right edge, animating from scale 0 to scale 1 over 250ms using power1.out easing
3. WHEN the user scrolls back within one viewport height (scroll position returns to 100vh or less), THE Site SHALL hide the circular hamburger button by animating from scale 1 to scale 0 over 250ms using power1.out easing, then restore the full navigation bar
4. IF the side menu is open when the user scrolls back within one viewport height, THEN THE Site SHALL close the side menu before restoring the full navigation bar
5. THE circular hamburger button SHALL be keyboard-focusable and include an accessible label indicating its purpose as a menu toggle

### Requirement 9: Footer with Columns and Magnetic Social Links

**User Story:** As a visitor, I want the footer to display contact and social information in a structured layout with magnetic hover effects, so that it matches the premium feel of the rest of the site.

#### Acceptance Criteria

1. THE Footer SHALL display content in a multi-column layout with exactly 3 distinct groups: a copyright column, a navigation links column, and a social links column, rendered side-by-side on viewports 768px and wider and stacked vertically on viewports below 768px
2. THE Footer SHALL wrap each social link (Instagram, Facebook, LinkedIn) in a Magnetic_Component so that each link element follows the cursor within a 35% displacement ratio on mousemove and returns to its origin on mouseleave
3. THE Footer SHALL display the current year dynamically in the copyright notice using the runtime date, formatted as "© {four-digit year} Lufuno Damari"
4. THE Footer SHALL render each social link (Instagram, Facebook, LinkedIn) as an anchor element using the corresponding URL from the portfolio data's contact object, opening in a new browser tab
5. IF a social media URL is not defined in the portfolio data, THEN THE Footer SHALL omit that social link from the rendered output rather than displaying a broken or placeholder link

### Requirement 10: Photography Section

**User Story:** As a visitor, I want a dedicated photography gallery section, so that I can see Lufuno's photography work alongside videography projects.

#### Acceptance Criteria

1. THE Site SHALL include a Photography_Section between the Selected Work section and the Skills section in the page layout
2. THE Photography_Section SHALL display between 4 and 12 Gallery_Items in a masonry-style grid layout with 2 columns on mobile viewports and 3 columns on viewports 768px and wider, where items have varying aspect ratios
3. WHEN the cursor hovers over a Gallery_Item, THE Site SHALL apply a scale transform of 1.03 and a brightness increase to 110% with a CSS transition duration of 300ms
4. WHEN a user clicks a Gallery_Item, THE Site SHALL open a lightbox overlay displaying the full-resolution image centered on a semi-transparent backdrop, with left/right arrow controls to navigate between images and a close button in the top-right corner to dismiss the overlay
5. WHEN the user presses the Escape key while the lightbox is open, THE Site SHALL close the lightbox overlay and return focus to the Gallery_Item that triggered it
6. IF the user navigates past the last image in the lightbox, THEN THE Site SHALL wrap to the first image, and if the user navigates before the first image, wrap to the last image
7. THE Photography_Section SHALL load images lazily using Next.js Image component with sizes attribute set to "(max-width: 767px) 50vw, 33vw"
8. THE Photography_Section SHALL include a section heading using the same display typography scale used in other Viewport_Sections
9. THE Photography_Section data SHALL be stored in the portfolio data file (data/portfolio.ts) as an array of PhotoItem objects following the existing data pattern

### Requirement 11: Photography Data Model

**User Story:** As a developer, I want photography data structured consistently with existing portfolio data, so that the codebase remains maintainable and extensible.

#### Acceptance Criteria

1. THE portfolio data file SHALL export a PhotoItem interface with fields: id (string), title (string), category (string), src (string), alt (string), width (number), height (number)
2. THE portfolio data file SHALL include a photographyItems array within the PortfolioData interface
3. THE photographyItems array SHALL contain at least 6 placeholder entries with descriptive alt text (minimum 10 characters each) and realistic dimensions (width between 800 and 4000 pixels, height between 600 and 3000 pixels)
4. THE PhotoItem category field SHALL support values including but not limited to: "portrait", "landscape", "event", "street", "editorial"
5. THE PhotoItem src field SHALL use paths relative to the public directory following the pattern "/images/{filename}.{extension}"

### Requirement 12: SEO Metadata and Structured Data

**User Story:** As a site owner, I want comprehensive SEO metadata targeting videography, cinematography, and photography keywords, so that the site ranks well in search engines for relevant queries.

#### Acceptance Criteria

1. THE Site SHALL define a metadata export in app/layout.tsx with title, description, keywords (containing at least 8 keyword phrases including "videographer Johannesburg", "cinematographer South Africa", "photographer Johannesburg"), authors, and robots (index, follow) fields
2. THE Site SHALL include Open_Graph metadata with og:title, og:description, og:image (minimum 1200x630px), og:type (website), and og:locale (en_ZA) properties
3. THE Site SHALL include Twitter Card metadata with twitter:card (summary_large_image), twitter:title, and twitter:description properties
4. THE Site SHALL embed a JSON_LD script in the page head conforming to Schema.org Person type with name, jobTitle (array including Videographer, Cinematographer, Photographer), url, address (Johannesburg, South Africa), and sameAs (array with at least 2 social profile URLs)
5. THE Site SHALL embed a JSON_LD script conforming to Schema.org CreativeWork type for the portfolio with creator, genre, and keywords properties
6. THE JSON_LD scripts SHALL validate against the Schema.org specification without errors

### Requirement 13: Semantic Heading Hierarchy

**User Story:** As a search engine crawler, I want the page to use a proper heading hierarchy, so that content structure is understood and indexed correctly.

#### Acceptance Criteria

1. THE Site SHALL use exactly one h1 element containing Lufuno Damari's name in the Hero section
2. THE Site SHALL use h2 elements for each section heading (Selected Work, Photography, Skills, About, Experience, Contact)
3. THE Site SHALL use h3 elements for sub-headings within sections (individual skill categories, project titles)
4. THE Site SHALL NOT skip heading levels (no h1 followed directly by h3 without an intervening h2)
5. THE Site SHALL contain no more than one h1 element in the entire document

### Requirement 14: Image and Performance Optimisation for SEO

**User Story:** As a site owner, I want images optimised with descriptive alt text and proper loading attributes, so that search engines index visual content and page speed remains high.

#### Acceptance Criteria

1. WHEN an img element conveys meaningful content, THE Site SHALL provide alt text that is between 5 and 125 characters in length and describes the subject, context, or action depicted in the image
2. WHEN an img element is purely decorative, THE Site SHALL set its alt attribute to an empty string (alt="") so screen readers skip it
3. THE Site SHALL use the Next.js Image component with explicit width, height, and sizes props for all photography and project thumbnail images to enable automatic format optimisation and responsive serving
4. WHEN an image is positioned below the initial viewport (below the first 100vh of page content), THE Site SHALL render it with loading="lazy" so it is not fetched until the user scrolls near it
5. THE Site SHALL apply the priority attribute to the hero section poster image and any image rendered within the first 100vh of page content, so the browser preloads those resources without lazy deferral
6. IF an image source fails to load, THEN THE Site SHALL preserve its layout dimensions (no layout shift) and display the alt text as a fallback

### Requirement 15: Animated Section Transitions

**User Story:** As a visitor, I want sections to animate into view as I scroll, so that the page feels dynamic rather than static.

#### Acceptance Criteria

1. WHEN a section wrapped in AnimatedSection scrolls into the viewport such that at least 20% of it is visible, THE AnimatedSection wrapper SHALL trigger a fade-up animation transitioning opacity from 0 to 1 and translateY from 40px to 0 over 600ms with an ease-out timing function
2. THE AnimatedSection wrapper SHALL use Framer Motion's whileInView with a viewport threshold of 0.2 to detect when 20% of the section is visible
3. THE AnimatedSection wrapper SHALL animate each section only once per page load and SHALL NOT re-trigger the animation when the section scrolls out of and back into the viewport
4. THE Site SHALL wrap all main content sections between HeroSection and Footer (including QuickInfoBar, SelectedWork, Photography, SkillsSection, AboutSection, ExperienceSection, CTASection, and ContactSection) in the AnimatedSection component
5. IF the user has enabled a reduced-motion preference in their operating system, THEN THE AnimatedSection wrapper SHALL render children immediately without animation, displaying them at full opacity with no transform
6. WHILE sections are in their pre-animation state (before scrolling into view), THE AnimatedSection wrapper SHALL keep section content visually hidden (opacity 0) but accessible to screen readers

### Requirement 16: Responsive Behaviour

**User Story:** As a mobile visitor, I want the site to adapt gracefully to smaller screens, so that the cinematic experience translates to all devices.

#### Acceptance Criteria

1. WHILE the viewport width is below 768px, THE Site SHALL render section heading typography at no smaller than 8vw font-size
2. WHILE the viewport width is below 768px, THE Site SHALL apply vertical spacing between sections of at least 64px
3. WHILE the viewport width is below 768px, THE Photography_Section SHALL display Gallery_Items in a two-column layout, and WHILE the viewport width is between 768px and 1023px, THE Photography_Section SHALL display Gallery_Items in a two-column layout, and on viewports 1024px and wider THE Photography_Section SHALL display Gallery_Items in a three-column layout
4. WHILE the viewport width is below 768px, THE SideMenu SHALL occupy 100% of the viewport width
5. WHILE the device has no fine pointer (pointer: coarse or pointer: none), THE Site SHALL not render Magnetic_Component cursor-follow effects
6. WHILE the viewport width is below 768px, THE Site SHALL render all content without horizontal overflow, requiring no horizontal scrolling at viewport widths down to 320px
