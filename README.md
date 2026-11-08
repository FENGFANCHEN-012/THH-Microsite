# I AM 40 — The Helping Hand 40th Anniversary Microsite

Microsite for The Helping Hand (THH) 40th anniversary, exported from the Figma Make
file "Anniversary Microsite Homepage".

Pages: Home (`/`), History (`/journey`) and Donor Impact (`/impact`). Routing uses the URL path, so a static host needs to serve `index.html` for unknown paths (SPA fallback).

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # preview the build
```

Stack: React 19, Vite, Tailwind CSS 4, TypeScript.
