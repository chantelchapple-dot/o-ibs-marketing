# O-IBS marketing website

Independent static marketing site. The approved design and synthetic O-IBS dashboard are preserved. No accounting application, database, authentication, email provider or storage service is connected.

See [RELEASE.md](RELEASE.md) for configuration, contact integration, business/legal approval, deployment preparation and safety boundaries. See [qa/READINESS-REPORT.md](qa/READINESS-REPORT.md) for final results, file changes and all nine requested previews.

## Run locally

```powershell
node scripts/build.mjs --production
node scripts/test.mjs
node scripts/serve.mjs
```

Preview: http://127.0.0.1:4173. Stop with Ctrl+C. Build/preview/tests require Node.js only, with no package installation or runtime dependencies. The production export rejects local or non-HTTPS public URLs; exporting is not deploying.

## Configuration

Only public values from `.env.example` are consumed by the static generator. App and trial URLs are explicit and are never derived from staging. Until trial access is approved, the CTA says Request Early Access. Sign In leads to local getting-started guidance until an approved production URL exists.

Contact sending remains disabled. Local validation works, and accepted/failure/retry states are ready for an approved same-origin backend. Domain email links appear only when operational addresses are explicitly configured and approved. `.env.server.example` names future server-only mail settings; it is never consumed or exported by this static site.

## Source map

- `scripts/build.mjs`: page templates, public configuration, metadata, sitemap, robots, errors and header preparation.
- `src/config.mjs`: validated public URLs/readiness and operational-contact settings.
- `src/home-dashboard.mjs` and `.css`: approved synthetic dashboard shared by Home/Product.
- `src/site.css`, `src/product-reference.css`, `src/readiness.css`: approved theme and narrowly scoped readiness/accessibility polish.
- `src/site.js`: mobile menu, labelled sample Bizzy demonstrations and dynamic copyright year.
- `src/contact-page.mjs`, `src/contact-contract.mjs`, `src/contact.js`: form rendering, shared validation and optional approved-service response handling.
- `src/legal-pages.mjs`: structured unapproved Privacy, Terms and POPIA drafts.
- `src/assets/o-ibs-logo.jpeg`: unchanged authoritative supplied brand artwork. Serving logo, icon and social assets are derivatives with recorded provenance.
- `scripts/serve.mjs`: loopback-only preview with headers, compression and safe errors; no email service.
- `scripts/test.mjs`, `scripts/readiness-qa.mjs`, `scripts/lint.mjs`: static, configuration, browser, axe and ESLint checks.
- `scripts/brand-assets.mjs`: repeatable brand derivation using the original artwork and browser rendering.
- `scripts/release-check.mjs`: reports unresolved release requirements; currently returns a nonzero status intentionally.
- `dist/`: generated hosting payload only.
- `qa/`: reports and review images, never part of the public export.

## Audit tools

ESLint, axe-core and Lighthouse live in ignored `.qa-tools/`, separate from the website. Recreate with `pnpm --dir .qa-tools add eslint axe-core lighthouse`. Browser checks use bundled Playwright or `PLAYWRIGHT_PATH` and installed Edge. Lighthouse uses installed headless Chrome. The repository contains no TypeScript.

```powershell
node scripts/lint.mjs
node scripts/readiness-qa.mjs
node scripts/release-check.mjs
```

Privacy, Terms and POPIA remain drafts requiring professional review and are excluded from indexing. Prices and entitlement descriptions remain provisional as instructed. Final app/trial URLs, legal/entity details, contact operations and independent hosting setup remain launch prerequisites. Nothing was committed, pushed, deployed or connected to o-ibs.co.za.
