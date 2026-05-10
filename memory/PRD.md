# Green Plant Tech — $100K Masterpiece Landing Page (PRD)

## Original problem statement
> "Pushed the design of this page to the limits. We truly use the $10,000 agency or $50,000 agency to create an absolutely mind-blowing landing page for our biogas bread-and-butter biogas business in Poland."
> "Pure design masterpiece mode — take every section to the next level, expand the sections."
> "No SEO, no mobile-first, no forms/calculators — just design."

## Architecture
- **Stack:** Vite + React + Tailwind (frontend-only, no backend)
- **Single file:** `/app/greenplant.jsx` — 2576 lines, 38 components
- **Entry:** `/app/src/main.jsx` → `App.jsx`
- **Fonts:** Cormorant Garamond (editorial display) + Space Mono (technical)
- **Palette:** Pitchblack #020202 / Bourbon gold #C6A87C / Bone #EAE6DF / Methane teal #4ADE80 / Burnt orange accent #D97847
- **Language:** Polish throughout (target market: PL biogas industry)

## What was built (Iteration 1 — 10 May 2026)

### NEW signature sections added
1. **BootSequence** — 3.2s industrial control-system boot intro (terminal text, registration marks, "AUTH GRANTED")
2. **ReactorAnatomy** — Exploded SVG cross-section of digester (8 numbered callouts, blueprint "DWG-014 / SECTION A-A")
3. **MolecularProcess** — 4 fermentation phases (Hydroliza → Acydogeneza → Acetogeneza → Metanogeneza) with molecular SVG icons + chemical formulas
4. **EditorialQuote** — Full-bleed manifesto pull-quote (massive Cormorant, halftone background)
5. **PolandMap** — SVG of Poland with 8 installations (pulsing dots, animated rings, hoverable site list)
6. **Manifesto** — Paper-letter closing manifesto with wax seal, hand-signed by "Zarząd Green Plant Tech."

### Existing sections elevated
- **Hero** — KineticHeading split-letter reveal + live SCADA mini-panel (animated waveform, 4 live sensor readings)
- **TickerTape** — 3-layer kinetic (mono data + huge serif editorial + tiny doc refs)
- **Approach** — Editorial drop-cap "B", vertical "§ I" label, animated isometric reactor SVG
- **CTA** — Full-bleed kinetic "Czas na budowę." at 14rem, 4-column bottom band
- **Footer** — Print colophon (massive "GREEN plant TECH." watermark, type credits, ASCII leaf, coordinates)

### Design system primitives added
- `KineticHeading` — split-letter scroll-triggered reveal
- `BootSequence` — boot-row staggered terminal animation
- `HeroSCADAPanel` — live-updating sensor readings (1.4s tick)
- New CSS animations: boot-fade, boot-line-grow, boot-blink, draw-x, hero-in, kinetic-letter, orb-drift, wax-seal spin
- New textures: paper-grain (warm), halftone (dot grid), molecule-grid, hero-mesh, technical-grid
- `reg-mark` registration crosshairs (corner-frame editorial element)
- `vertical-writing` running side labels

## Section order (final tree)
BootSequence → Navbar → Hero → TickerTape → Approach → BlueprintProcess → ReactorAnatomy → ContractModels → FeedstockMatrix → MolecularProcess → EconomicsSection → SmartGrid → KineticBreak → EditorialQuote → CircularImpact → EnvironmentalImpact → PolandMap → ProjectsGallery → EditorialBento → TechStack → ScadaSystem → Leadership → OperationsMaintenance → SafetyStandards → TechnicalFAQ → Manifesto → CTA → Footer

(27 sections total, ~31,700 px tall on desktop)

## Backlog / Future opportunities
- P1: Add scroll-triggered cinematic background video (kukurydza field → reactor steel → control room)
- P1: Replace placeholder Unsplash images in ProjectsGallery + TechStack with bespoke commissioned photography
- P2: Add GSAP/Locomotive scroll for true editorial scroll-jacking
- P2: 1 signature interactive moment (ROI slider) — currently deferred per user choice
- P3: Mobile responsive pass (currently desktop-first per user choice)
- P3: SEO + OG image + LocalBusiness schema (currently deferred per user choice)

## Smart enhancement suggestion
**Press kit page.** A landing page this editorial deserves a `/press` route with downloadable hi-res renders, brand guidelines PDF, founder portraits, and a "as seen in" wall — biogas is a story-led category in Poland (Forbes, Puls Biznesu, Energetyka). One referral from a media piece pays for the whole site.
