# VENUSA Website Starter (Next.js + TypeScript + Tailwind)

A mid‑luxe, production‑grade starter for VENUSA — aligned to the black‑white‑gold brand palette.
Clean, fast, and easy to extend. Use this as the public storefront (keep your ERP as a separate app
or mono‑repo package).

## Tech
- Next.js 14 (App Router, RSC)
- React 18
- TailwindCSS 3
- TypeScript + strict mode
- Zustand (ready if you want a cart state store)
- No backend DB included — products are mocked; replace with your ERP or a headless CMS.

## Quick start
```bash
pnpm install    # or npm/yarn
pnpm dev        # http://localhost:3000
```
*(If you see missing type errors, run `pnpm add -D typescript @types/react @types/node` again.)*

## Brand theme
- Colors: **Black** `#0E0E0F`, **Gold** `#C7A756`, **Gray** `#1C191A`, **White** `#FFFFFF`
- Fonts: You can add Lexend / Jura via `next/font` or local files.
- Components follow rounded `2xl` radii and soft shadows for a mid‑luxe feel.

## Where to edit
- Navigation: `src/lib/siteConfig.ts`
- Mock catalog: `src/lib/products.ts`
- Hero & sections: `src/components/*`
- Pages: `app/**`
- Styles/tokens: `app/globals.css`, `tailwind.config.ts`

## Switch to real data
- **Option A (ERP)**: Replace `app/api/products/route.ts` with a fetch that calls your ERP API (`/webservices/...`), then use server components for streaming and caching:
  ```ts
  // app/shop/page.tsx
  const res = await fetch(process.env.ERP_URL + '/products', { next: { revalidate: 60 } })
  const { items } = await res.json()
  ```
- **Option B (Headless CMS)**: Sanity, Strapi, or Payload – add SDK, define Product schema, query in server components.

## Payments & checkout
- Add Razorpay / Cashfree / Stripe as a Next.js Route Handler (`app/api/checkout`) and client hook.
- Cart state: create a Zustand store (`src/store/cart.ts`) with add/remove/clear and persist to `localStorage`.

## SEO
- Metadata is set in `app/layout.tsx`.
- Add `/sitemap.xml` and `robots.txt` via route handlers when you’re ready.
- Replace `public/og.jpg` with a real open graph image.

## Deploy
- Vercel (fast) or AWS (align with your infra). Set `NEXT_TELEMETRY_DISABLED=1`. Use build cache and image optimization.

## Notes
- The UI kit here is minimal by design. If you prefer shadcn/ui, you can install it later and swap the simple components.
- The SVG visuals in `public/images` are placeholders; swap with real mockups/photos.
