# DEENHA World Series — One-Shot Redesign Prompt

> SUMMARY: Master one-shot prompt to redesign deenha.com into the interactive "DEENHA World Series" showroom.
> OWNER: Nadhir (nadhir24).
> WHEN: paste into an AI website builder / coding agent (Claude Code, Codex, Cursor, etc.) to drive the full redesign.
> KEYWORDS: world series, showroom, 3d loading, songket scroll, heritage, new series, abstract, scarves-only, site editor visibility, design tokens.
> ASSETS: Songket video + images live under public/images/Warisan Nusantara-.../Songket Scarves Series/ (songket-scroll-hero.mp4).
> SCOPE: only Scarves publicly active; other categories hidden but toggleable via Site Editor.
> RULE: no invented history, no Supabase egress, no secret exposure, real build/test/QA before "done".

---

Redesign the existing DEENHA website into an immersive interactive world called:

DEENHA WORLD SERIES

DEENHA should feel like entering a digital fashion showroom where every collection is a different world, atmosphere, and story.

This is an existing React/Vite/TypeScript/Tailwind project. Work inside the existing repository. Do not create a disconnected mockup or replace the current stack.

Before making changes, inspect:

- existing routes
- existing React components
- product data
- image utilities
- existing public/images assets
- existing video assets
- marketplace URLs
- Site Editor/admin functionality
- maintenance mode
- SEO and i18n infrastructure

Use existing functionality wherever possible. Do not break admin features, product data, authentication, SEO, or existing marketplace links.

If the Taste Skill is installed, use it as a design-quality constraint to avoid generic AI frontend layouts. DEENHA's brand rules, assets, and this prompt remain the source of truth.

==================================================
CORE CONCEPT — DEENHA WORLD SERIES
==================================================

DEENHA is not presented as a conventional ecommerce store.

It is an interactive digital world of modest fashion, textile, memory, place, and visual storytelling.

When visitors enter deenha.com, they should feel as though they are entering a cinematic digital showroom or virtual exhibition.

The first experience should be:

1. Loading screen from 0% to 100%.
2. Preload the essential 3D/showroom assets.
3. Reveal an interactive 3D-inspired world.
4. Show a DEENHA heritage model or fashion figure inside the world.
5. Show visual portals or objects representing:
   - Heritage Textile Worlds
   - New Series
   - Abstract New Arrivals
6. Clicking a portal or object opens its dedicated showcase world.

The experience should feel:

- cinematic
- premium
- mysterious
- editorial
- immersive
- culturally respectful
- tactile
- modern
- award-winning
- lightweight enough for real mobile users

Suggested opening copy:

"Welcome to DEENHA World Series."

Supporting copy:

"Explore worlds shaped by textile, place, memory, and contemporary modest fashion."

Do not make the opening feel like a normal product catalogue.

==================================================
LOADING EXPERIENCE
==================================================

Create a visual loading screen with a real progress indicator from 0% to 100%.

The progress should represent actual asset loading where practical, not an arbitrary fake timer.

Loading screen elements:

- DEENHA wordmark
- minimal progress percentage
- thin progress line or circular indicator
- subtle textile-inspired background motion
- short loading label such as "Preparing the collection…"

Loading requirements:

- preload only essential hero and 3D assets
- do not preload the entire product catalogue
- target loading completion under 3–5 seconds on a good mobile connection
- show a static fallback if 3D assets fail
- never leave users stuck on the loading screen
- provide a "Enter showroom" fallback if necessary
- support prefers-reduced-motion

If full 3D is too heavy, create a convincing 3D-inspired showroom using:

- CSS 3D transforms
- layered images
- perspective
- depth
- parallax
- sticky sections
- masked video
- animated light and shadow
- lightweight canvas only where necessary

Do not use heavy WebGL or a large 3D engine unless the existing project already supports it and performance remains acceptable.

==================================================
INTERACTIVE WORLD ENTRANCE
==================================================

After loading, reveal the main DEENHA World Series environment.

The scene should include:

- a central DEENHA heritage fashion figure or mannequin-like editorial model
- a visual portal for Heritage Textile Worlds
- a visual portal for New Series
- a visual portal for Abstract New Arrivals
- subtle floating labels or location markers
- ambient movement
- soft camera parallax
- clear clickable areas
- keyboard-accessible navigation
- mobile-friendly tap targets

The central model should not look like a generic 3D game character. It should feel like a premium fashion editorial figure or museum mannequin.

The interaction should be elegant and restrained:

- hover or pointer movement subtly changes camera depth
- clicking a portal transitions into that world
- clicking the central figure can open the DEENHA story or featured showcase
- users must always have a clear way to return home
- do not hide navigation completely
- do not rely only on hover

Use a cinematic transition between worlds:

- fade
- camera movement
- textile wipe
- soft scale transition
- layered image reveal

Avoid:

- game-like UI
- neon portals
- excessive particles
- chaotic camera movement
- confusing navigation
- infinite loading
- motion sickness
- giant text covering the entire screen

==================================================
CURRENT ACTIVE SCOPE
==================================================

Only the Scarves experience should be visible and active in the public navigation for now.

The following categories must exist in the data/configuration system but remain hidden by default:

- Dailywear
- Instant Hijab
- Pashmina
- Prayset
- Privé Deenha

Scarves must be the only visible active product category for this launch.

Create a configurable visibility system so these categories can later be enabled through the existing Site Editor/admin panel without requiring code changes.

Use configuration similar to:

- category enabled/disabled
- world visible/hidden
- collection visible/hidden
- new arrival visible/hidden

Do not delete the hidden categories. Preserve their existing data and routes where possible.

The Site Editor should be able to control:

- visible categories
- visible worlds
- featured collection
- hero media
- placeholder media
- collection ordering
- CTA labels
- CTA links
- story copy where the existing editor supports it

==================================================
WORLD STRUCTURE
==================================================

The visible public experience should contain three major world areas:

1. Heritage Textile Worlds
2. New Series
3. Abstract New Arrivals

--------------------------------------------------
WORLD 1 — HERITAGE TEXTILE WORLDS
--------------------------------------------------

This world contains the following scarf collections:

- Songket
- Parang
- Lombok
- Kawung
- Borneo

These collections should feel like different textile environments inside one larger Heritage World.

Each collection should have:

- collection title
- visual environment
- textile-focused hero media
- short editorial introduction
- image gallery
- material information
- relevant measurements
- finishing details
- care instructions
- styling guidance
- product cards
- Shopee CTA
- Tokopedia CTA

The visual environment for each collection may vary through:

- color
- lighting
- texture
- composition
- camera movement
- textile close-ups
- subtle atmospheric effects

Do not invent unsupported historical claims.

Keep the storytelling focused on:

- textile
- pattern
- material
- drape
- craft
- visual language
- contemporary wearability

Use the existing DEENHA assets as the source of truth.

--------------------------------------------------
SONGKET FLAGSHIP EXPERIENCE
--------------------------------------------------

Use the existing Songket assets from:

public/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/

Available assets include:

- IMG_6370.jpg
- IMG_6371.jpg
- IMG_6372.jpg
- IMG_6373.jpg
- IMG_6374.jpg
- IMG_6375.jpg
- IMG_6376.jpg
- IMG_6377.jpg
- IMG_6378.jpg
- IMG_6379.jpg
- songket-scroll-hero.mp4

Use this video:

public/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/songket-scroll-hero.mp4

Video facts:

- approximately 10 seconds
- 1280×720
- H.264 MP4
- approximately 3.83 MB

If useful, create a clean alias:

public/media/songket/hero.mp4

Do not delete or break the original file.

Songket should be the first flagship scroll experience inside the Heritage Textile World.

Scroll sequence:

0–20%:
- introduce Songket
- show the opening visual
- display title and short copy

20–50%:
- transition through Songket images
- reveal the scarf styling and pattern
- introduce material and drape

50–80%:
- use scroll-controlled video playback where browser seeking is smooth
- transition from wider product view into textile close-up
- emphasize folds, floral motifs, geometric ornament, and muted color palette

80–100%:
- reveal specifications
- reveal product cards
- show marketplace CTAs

Implement fallback hierarchy:

1. desktop scroll-scrubbing if smooth
2. desktop muted autoplay or timed transition if scrubbing stutters
3. image-sequence fallback if required
4. mobile poster plus muted loop or static fallback

Requirements:

- preload poster image
- pause video outside viewport
- only one video active at a time
- use IntersectionObserver
- respect prefers-reduced-motion
- never block page interaction if video fails

Suggested Songket copy:

"Threads of ceremony, translated for today."

--------------------------------------------------
WORLD 2 — NEW SERIES
--------------------------------------------------

The New Series world currently contains:

- Hagia Sophia
- Cairo

These should feel separate from the Heritage Textile Worlds.

The New Series is about contemporary DEENHA collections inspired by place, atmosphere, architecture, history, and visual memory.

Each series page should include:

- title
- location
- visual introduction
- factual context
- DEENHA's contemporary interpretation
- product/gallery media
- material details
- relevant measurements
- finishing
- care
- related products
- Shopee CTA
- Tokopedia CTA

Hagia Sophia and Cairo must not be presented with invented facts.

Clearly distinguish:

- actual historical or cultural context
- DEENHA's creative interpretation
- product design and styling

If final imagery or copy is not available, use clearly marked editable placeholders rather than fabricating content.

--------------------------------------------------
WORLD 3 — ABSTRACT NEW ARRIVALS
--------------------------------------------------

Add Abstract as a New Arrival world.

For now, Abstract should use replaceable placeholder media because the final user-supplied photos are not available yet.

The Abstract world should be visually prepared for:

- abstract textile photography
- color studies
- material close-ups
- folds
- shadows
- light
- movement
- editorial compositions
- experimental image sequences

Do not generate fake final images.

Use a configurable placeholder structure so the user can later replace:

- hero image
- gallery images
- video
- title
- description
- product links
- collection status

The Abstract world must already look intentional and premium even while using placeholder content.

==================================================
NAVIGATION AND INFORMATION ARCHITECTURE
==================================================

Public navigation should initially show:

- DEENHA
- World Series / Explore
- Scarves
- Journal
- Shop
- language selector

Do not show the hidden product categories publicly yet.

The hidden categories remain configurable:

- Dailywear
- Instant Hijab
- Pashmina
- Prayset
- Privé Deenha

Explore should contain:

- Heritage Textile Worlds
- New Series
- Abstract New Arrivals

Journal should remain separate from Explore.

Journal may contain:

- styling guides
- behind-the-scenes content
- material notes
- campaign stories
- studio process
- care guides
- brand updates

==================================================
DESIGN TOKENS
==================================================

Use these explicit design tokens. Do not guess the palette from vague adjectives.

Colors:

--ink: #1D1B19;
--charcoal: #292624;
--deep-brown: #3A2D27;
--warm-ivory: #F4F0E8;
--paper: #FAF9F5;
--muted-gold: #B59A62;
--terracotta: #A9654E;
--deep-indigo: #27364A;
--dusty-blue: #718093;
--soft-blush: #D8B9AD;
--muted-sage: #8A927D;
--border: #D9D1C4;
--muted-text: #746D66;
--white: #FFFFFF;

Use muted gold sparingly for accents, archive labels, dividers, and small highlights.

Typography:

Display:
- Cormorant Garamond
- fallback Georgia, serif

Interface:
- Inter
- fallback system-ui, sans-serif

Type scale:

- display-xl: clamp(3.5rem, 9vw, 9rem)
- display-lg: clamp(3rem, 7vw, 7rem)
- heading-xl: clamp(2.5rem, 5vw, 5rem)
- heading-lg: clamp(2rem, 4vw, 3.5rem)
- heading-md: clamp(1.5rem, 2.5vw, 2.25rem)
- body-lg: 1.25rem / 1.6
- body-md: 1rem / 1.6
- body-sm: 0.875rem / 1.5
- caption: 0.6875rem / 1.4
- archive-label: 0.6875rem / 1.2 with 0.16em letter spacing

Spacing:

Use a 4px base scale:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 96px
- 128px
- 160px

==================================================
PRODUCT SHOWCASE
==================================================

Every product showcase should feel like an editorial story rather than a generic product card.

Include:

- large visual gallery
- product name
- collection
- story/world label
- short editorial statement
- material
- measurements
- finishing
- care
- styling guidance
- related media
- related products
- Shopee button
- Tokopedia button

Only show relevant specification fields. Do not show empty fields or irrelevant labels such as diameter when not applicable.

Use existing canonical marketplace links. Never invent marketplace URLs.

Track outbound marketplace clicks with:

- event: marketplace_click
- marketplace: shopee or tokopedia
- product name
- collection
- page location
- world type

==================================================
PERFORMANCE
==================================================

The 3D opening must be visually impressive but lightweight.

Targets:

- mobile LCP under 2.5 seconds
- desktop LCP under 2 seconds
- Lighthouse mobile performance target 85+
- initial JavaScript under 250 KB gzip where practical
- preload only essential opening assets
- lazy-load all below-fold images
- only one video active at a time
- pause videos outside viewport
- use responsive image sizes
- use WebP/AVIF where available
- use poster images for videos
- do not load all product media on first visit
- provide static fallback for 3D failure
- provide reduced-motion fallback
- do not use heavy 3D libraries without measuring performance

Do not make users wait for every website asset before entering the experience.

==================================================
ACCESSIBILITY
==================================================

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels for interactive portals
- minimum 44px touch targets
- no hover-only information
- readable contrast
- reduced-motion behavior
- text alternatives for video
- clear return navigation
- accessible loading state
- accessible percentage/progress announcement where appropriate

==================================================
REUSABLE ARCHITECTURE
==================================================

Create or adapt reusable TypeScript components:

- WorldLoader
- WorldEntrance
- WorldPortal
- WorldScene
- WorldTransition
- ShowroomSection
- CollectionWorld
- ScrollStory
- TextileVideo
- MediaFallback
- HeritageSeries
- AbstractSeries
- ProductShowcase
- EditorialGallery
- MaterialDetails
- MarketplaceButtons
- VisibilityConfig
- StoryProgress
- MobileWorldExperience

Create typed data structures for:

- worlds
- series
- collections
- products
- abstract placeholders
- media variants
- material details
- measurements
- marketplace links
- visibility settings

Do not duplicate product data or hardcode the same content across components.

==================================================
SITE EDITOR CONFIGURATION
==================================================

Use the existing Site Editor/admin system where possible.

The Site Editor should eventually control:

- world visibility
- category visibility
- collection visibility
- featured world
- featured series
- hero media
- placeholder media
- collection order
- CTA labels
- CTA URLs
- story copy
- New Arrival status

Default visibility:

Visible:
- Scarves
- Heritage Textile Worlds
- Songket
- Parang
- Lombok
- Kawung
- Borneo
- New Series
- Hagia Sophia
- Cairo
- Abstract New Arrivals

Hidden:
- Dailywear
- Instant Hijab
- Pashmina
- Prayset
- Privé Deenha

Do not delete hidden categories. Make them toggleable.

==================================================
SEO AND ROUTES
==================================================

Preserve or improve:

- page titles
- meta descriptions
- Open Graph images
- canonical URLs
- descriptive alt text
- semantic headings
- structured product data where appropriate
- crawlable story text
- clean routes
- existing i18n support

Suggested route structure:

- /
- /world
- /world/heritage
- /world/heritage/songket
- /world/heritage/parang
- /world/heritage/lombok
- /world/heritage/kawung
- /world/heritage/borneo
- /world/new-series
- /world/new-series/hagia-sophia
- /world/new-series/cairo
- /world/abstract
- /scarves
- /product/:slug
- /journal

Adapt this to the existing router instead of breaking established routes.

==================================================
DEFINITION OF DONE
==================================================

Do not report completion from a plan or visual mockup.

The implementation is complete only when:

- the site opens with the DEENHA World Series loading experience
- loading progresses visibly toward 100%
- the interactive showroom entrance works
- the central model/figure and world portals are interactive
- Heritage Textile Worlds work
- Songket, Parang, Lombok, Kawung, and Borneo are reachable
- New Series contains Hagia Sophia and Cairo
- Abstract New Arrivals exists with replaceable placeholders
- only Scarves is publicly active as the product category
- hidden categories remain configurable through Site Editor/admin
- Songket uses the existing images and video
- Songket scroll/video fallback works
- product showcases use real product data
- Shopee and Tokopedia links work
- marketplace clicks are tracked
- mobile layout works
- reduced-motion fallback works
- SEO remains functional
- accessibility basics are implemented
- existing admin functionality is not broken
- no unsupported historical claims are invented
- no secrets are exposed
- no Supabase egress is introduced
- `npm run build` passes
- tests pass
- the app is run and visually checked
- performance issues are fixed before completion

The final result should feel like:

DEENHA is a world-series of wearable heritage, contemporary fashion, textile memory, and visual exploration.

Make it visually astonishing, but still fast, accessible, factual, editable, and commercially useful.
