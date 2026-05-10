# Green Plant Tech — $100K Masterpiece Landing Page (PRD)

## Original problem statement
> "Push to $50–100k agency tier. Take every section to the next level. Keep being extremely creative — every section totally unique."

## Architecture
- **Stack:** Vite + React + Tailwind (frontend-only)
- **Single file:** `/app/greenplant.jsx` — **3565 lines, 35+ sections**
- **Entry:** `/app/src/main.jsx` → mounts `greenplant.jsx`
- **Fonts:** Cormorant Garamond (editorial display) + Space Mono (technical)
- **Palette:** Pitchblack #020202 / Bourbon gold #C6A87C / Bone #EAE6DF / Methane teal #4ADE80 / Burnt orange accent #D97847
- **Language:** Polish throughout

## Final section tree (35 sections, top → bottom)
1. **BootSequence** — 3.2s industrial control-system boot intro
2. **Navbar**
3. **Hero** — KineticHeading + live SCADA mini-panel
4. **TickerTape** — 3 kinetic layers
5. **Approach** — Editorial drop-cap "B" + animated isometric reactor
6. **FieldToElectricity** — 5-chapter cinematic narrative (I. Kukurydza → V. Powrót)
7. **BlueprintProcess** — Execution sequence cards
8. **ReactorAnatomy** — Exploded SVG diagram, 8 numbered callouts
9. **MicrobialTaxonomy** — 4 bacteria specimen cards (Methanosarcina, Methanobacterium, Clostridium, Bacteroides)
10. **ContractModels** — EPC vs EPCM deal sheets
11. **FeedstockMatrix** — 5 substrate analysis with hoverable detail
12. **MaterialSamples** — Architect's moodboard (concrete, steel, EPDM, copper swatches)
13. **MolecularProcess** — 4 fermentation phases with chemical formulas
14. **ReactorClock** — 24h cycle clock with auto-rotating hour hand + event list
15. **EconomicsSection** — Cash flow chart + payback metrics
16. **EnergyComparison** — Biogas vs coal/wind/solar (4 dimensions, editorial bars)
17. **SmartGrid** — Distribution & integration nodes
18. **KineticBreak** — Marquee typography
19. **EditorialQuote** — Full-bleed pull-quote
20. **CircularImpact** — Poferment loop
21. **EnvironmentalImpact** — CO₂ reduction stats
22. **PolandMap** — SVG with 8 pulsing installation sites
23. **ProjectsGallery** — Cross-fade project showcase
24. **PressWall** — "As featured in" editorial wall + headline list
25. **EditorialBento** — Bento grid (żelbetowe komory, CHP)
26. **TechStack** — 4 Tier-1 hardware partners
27. **ScadaSystem** — Live dashboard mockup
28. **Leadership** — Department cards with security overlays
29. **OperationsMaintenance** — O&M SLA + services
30. **GanttBuild** — 14-month construction Gantt timeline (color-coded by category)
31. **SafetyStandards** — Compliance framework (ATEX, UDT, etc)
32. **TechnicalFAQ** — Documentation repository
33. **GlossaryLexicon** — 14-term A-to-U technical lexicon
34. **Manifesto** — Paper letter + wax seal closing manifesto
35. **CTA** — Full-bleed kinetic "Czas na budowę."
36. **Footer** — Print colophon with ghost wordmark

## Design system primitives
- **Atoms:** KineticHeading, AnimatedCounter, TextReveal, GlowCard, MagneticButton, FadeIn, BootSequence, HeroSCADAPanel, ScrollProgressBar, AmbientOrbs, CustomCursor, FilmGrain, Crosshair, SystemStatus
- **CSS:** boot animations, draw-line, kinetic-letter, orb-drift, wax-seal-spin, glow-card, hero-mesh, halftone, paper-grain, molecule-grid, technical-grid, bg-blueprint, bg-stripes, bg-topo, vertical-writing, reg-mark, scanline

## Iteration history
- **Iter 1 (10 May):** Added 6 new sections (Boot, ReactorAnatomy, MolecularProcess, EditorialQuote, PolandMap, Manifesto) + elevated Hero/TickerTape/Approach/CTA/Footer
- **Iter 2 (10 May):** Added 5 new sections (FieldToElectricity, ReactorClock, MicrobialTaxonomy, PressWall, GanttBuild)
- **Iter 3 (10 May):** Added 3 new sections (EnergyComparison, GlossaryLexicon, MaterialSamples)

## Backlog / Future opportunities
- P1: Bespoke commissioned photography (replace remaining Unsplash placeholders in ProjectsGallery + TechStack)
- P1: Custom 3D rendered hero/CTA imagery
- P2: Cursor-following spotlight effect on cards
- P2: GSAP scroll-jacking for parallax chapter narrative
- P3: Mobile responsive pass (deferred per user)
- P3: SEO + OG image + structured data (deferred per user)
- P3: Real contact form integration (deferred per user)

## Smart enhancement
**Press kit microsite at `/press`** — biogas is a story-driven category in PL (Forbes Polska, Puls Biznesu cover it regularly). Hi-res renders, founder portraits, downloadable brand guide PDF, "fact sheet for journalists" page. One media pickup pays for the whole site.
