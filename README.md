# Andrew Sundaradhas — Portfolio

Personal portfolio for **Andrew Sundaradhas** — CS & Robotics engineer at VIT Chennai.
Single-page, dark-on-pastel **"sticker book"** aesthetic (Slush-inspired): inflatable
3D blue ribbons, a full rainbow sticker palette, oversized crushed display type, and
hand-cut black outlines on a pale paper canvas.

## Stack

- **Next.js 15** (App Router) · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Framer Motion** — scroll reveals, character reveal, counters, marquee
- **Lucide React** — icons
- Fonts via `next/font/google`: **Bowlby One** (display ≈ Lateral), **Inter** (UI/body ≈ Aeonik Pro), **JetBrains Mono** (terminal)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Project structure

```
app/
  layout.tsx            metadata, fonts, theme
  page.tsx              composes every section
  globals.css           design tokens + base styles (Tailwind v4 @theme)
  opengraph-image.tsx   dynamic OG/Twitter image
  sitemap.ts robots.ts  SEO
components/
  layout/   Marquee, Navbar, Footer
  sections/ Hero, About, Experience, Projects, Skills, Stats, Leadership, Contact
  ui/       Badge, Button, Card, Cursor, Reveal, Ribbon, SectionLabel, StatCard, Sticker, Terminal
lib/
  constants.ts          ALL copy + data (single source of truth)
  colors.ts             static sticker-color class maps
  utils.ts              cn() helper
```

## Customizing

- **Content**: edit `lib/constants.ts` — every headline, bullet, project, and stat lives there.
- **Colors / radii / fonts**: edit the `@theme` block in `app/globals.css`.
- **Résumé**: drop `Andrew-Sundaradhas-Resume.pdf` into `public/` (the navbar "Resume"
  button links to `/Andrew-Sundaradhas-Resume.pdf`).

## Contact form (Resend)

The Contact section has a working form that emails submissions to
`andrewsundaradhas56@gmail.com` via [Resend](https://resend.com), using a Next.js
Server Action ([app/actions/contact.ts](app/actions/contact.ts)). Replies go to the
visitor's address automatically (`replyTo`).

**Setup:**

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. (Production) Verify your sending domain at [resend.com/domains](https://resend.com/domains).
3. Copy `.env.example` → `.env.local` and fill in:
   ```bash
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_FROM_EMAIL="Andrew Sundaradhas <hello@andrewsundaradhas.dev>"
   ```
   - Without `RESEND_API_KEY`, the form shows a friendly "email me directly" message.
   - Without `CONTACT_FROM_EMAIL`, it falls back to Resend's `onboarding@resend.dev`
     test sender — **fine for local dev, but use a verified domain in production.**
4. On Vercel, add the same env vars under **Project → Settings → Environment Variables**.

The action validates input server-side, includes a honeypot for spam, and uses an
idempotency key so a double-submit within 24h isn't delivered twice.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config. Set the
production domain to update the absolute URLs in `app/layout.tsx`, `sitemap.ts`, and
`robots.ts` if you use something other than `andrewsundaradhas.dev`.

## Accessibility & performance

- Semantic landmarks, skip-to-content link, ARIA labels, visible focus rings.
- Every animation respects `prefers-reduced-motion`.
- Custom cursor is desktop/fine-pointer only.
- No layout shift; fonts preloaded via `next/font`.
