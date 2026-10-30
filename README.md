# Girvi Baba — website

React 19.3 · Vite 8.3 · TypeScript 6 · Tailwind CSS 4.3 · TanStack Query 5.105 · Motion 14 · react-hook-form + zod · Vitest.

## Run

```bash
npm install          # Node 20.19+ required
cp .env.example .env # then fill in the real phone / WhatsApp number
npm run dev          # http://localhost:5173
npm run check        # lint + typecheck + tests + production build
npm run build        # output in dist/
npm run preview      # serve the production build locally
```

## Mock data and the API

The site runs entirely on mock data until a backend exists:

- `src/mocks/rates.ts` — sample valuation rates (gold/silver price per gram, loan-to-value and depreciation per item) and the example items shown in the hero card.
- `src/api/client.ts` — the only place that talks to a server. With `VITE_API_URL` unset it serves the mocks with realistic latency; set it and the same functions call `GET /rates` and `POST /estimates`.
- `src/lib/estimate.ts` — the estimate engine (pure, unit-tested). Gold and silver follow the RBI loan-to-value slabs in `src/lib/ltv.ts`.
- Enquiries (`src/features/enquiry/api.ts`) are stored in `sessionStorage` while `demoMode` is on.

All data access goes through TanStack Query hooks (`src/features/estimate/hooks.ts`, `src/features/enquiry/hooks.ts`), so loading, error and retry states work the same with mocks or a real API.

## Project structure

```
src/
  api/            API client (mock ↔ real switch)
  mocks/          Mock data
  content/        Page copy: items, FAQs, documents, legal topics
  config/site.ts  Business details and contact numbers
  features/
    estimate/     5-step loan calculator (wizard, hooks, config)
    enquiry/      Enquiry forms, schema (zod), hooks
  components/
    sections/     Page sections (Hero, LoanCalculator, Invest, LegalAdvice…)
    layout/       Header, Footer, floating Call/WhatsApp
    ui/           Buttons, headings, animated number…
    illustrations/ Inline SVG item drawings
  lib/            Estimate engine, RBI LTV rules, formatting
```

## Configure contact details

Set these in `.env` (or edit the fallbacks in `src/config/site.ts`):

| Variable | Example | Used for |
| --- | --- | --- |
| `VITE_API_URL` | `https://api.girvibaba.in` | Real backend; leave empty for mock data |
| `VITE_CONTACT_PHONE` | `+91 98765 43210` | Call buttons (`tel:` links) |
| `VITE_WHATSAPP_NUMBER` | `919876543210` | WhatsApp buttons (`wa.me`) |
| `VITE_WHATSAPP_MESSAGE` | `Hello Girvi Baba…` | Pre-filled WhatsApp text |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_ADDRESS` | | Contact section |

If a number is not set, Call/WhatsApp buttons scroll to the enquiry form instead of dialling — nothing is invented.

## Editing content

- **Pledge items** (cards, hero chips, rotating headline word, form options): `pledgeItems` in `src/content/home.ts`.
- **Invest / Legal advice / FAQs / documents / rights**: same file.
- **Colours & type**: `@theme` block in `src/index.css` — copper (actions), plum (dark surfaces), blush and canvas backgrounds; Sora headings, Hanken Grotesk body.
- **Valuation rates**: `src/mocks/rates.ts` (or your API's `/rates`).
- **Enquiries**: demo-only (saved in `sessionStorage`). Replace `submitEnquiry` in `src/features/enquiry/api.ts` with a real API call and set `demoMode: false` in `src/config/site.ts`.
