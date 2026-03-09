# eixo.design — Project Guidelines

## Design Rules
- No hover effects on non-actionable elements. Only buttons, links, and interactive controls should have hover states.
- Keep code DRY — no duplicate styles or components. Extract shared patterns into tokens or shared CSS.
- All design tokens live in `src/styles/tokens.css`. Always use existing tokens — never hardcode rgba, hex, spacing, or typography values. If a token doesn't exist, use the closest one. Only add new tokens if truly needed and no existing token works.
- Use consistent inline SVG arrows everywhere (no Unicode arrows, no icon fonts). All arrows follow the same stroke style (width=2, linecap=round, linejoin=round).

## Tech Stack
- Astro 5 (static output) + React for interactive islands
- Vanilla CSS with custom properties (no preprocessor)
- Cloudflare Pages for hosting, Cloudflare Workers for contact form (Brevo API)
- Bilingual: EN (/) and PT (/pt/) — all content in `src/content.js`

## Structure
- `src/pages/` — Astro pages (index, pt/index, 404, privacy)
- `src/layouts/Layout.astro` — shared layout, meta, scripts
- `src/components/` — React components (Accordion, Testimonials) + their CSS
- `src/styles/` — shared CSS (tokens, shared, section-specific)
- `worker/` — Cloudflare Worker for contact form
