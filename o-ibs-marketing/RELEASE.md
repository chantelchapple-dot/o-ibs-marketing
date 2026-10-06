# O-IBS marketing website — release preparation

The visual direction, homepage hero and synthetic dashboard were approved by the user. This phase preserves them and prepares the independent website for a later authorised release. **No commit, push, deployment or infrastructure change is authorised in this phase.**

## Architecture and separation

Twelve static HTML routes, a lightweight progressive-enhancement script and a separate optional contact client. No application business logic, application database access, authentication code, Resend SDK or storage client exists in the website. Only `dist/` is a potential hosting payload. Never publish `.env`, `.env.server`, `src/`, `.qa-tools/`, `qa/` or the entire workspace.

`PUBLIC_SITE_URL` is metadata configuration, not a domain connection. Application and approved trial URLs are explicit public values. Staging cannot be selected as the public app/trial destination. App URLs containing credentials or query parameters are rejected; invitation and verification controls remain the responsibility of the separate application.

## Preserved design and polish

- The approved two-line hero remains dominant, with one official header logo and the small gold brand eyebrow. Reporting is now explicitly included in the supporting copy.
- The approved HTML dashboard remains sharp and readable, with its exact KPI labels, fictional Demo Company, synthetic invoices/activity and a sample-data caption.
- The Product page now uses that same approved dashboard instead of the earlier image with generic identities.
- Sidebar branding, header/footer, icons and social imagery all derive from the one authoritative supplied `src/assets/o-ibs-logo.jpeg`. The original is unchanged. The smaller serving JPEG and icons are rendering derivatives, not redrawn marks. Provenance is recorded in `src/assets/brand-provenance.json`.
- No testimonials, customer logos, usage statistics, certifications or commercial prices were invented.
- Features retain the same grid treatment. Assets are represented cautiously with “where supported”; entitlements stay explicitly provisional as instructed by the user.
- Heading hierarchy, menu keyboard focus and 200% text enlargement were improved without changing the normal design.

## CTA routing and operational states

| Item | Current state | Before release |
|---|---|---|
| Sign In | `/help#sign-in`; explains that the production link is not configured | Approved `PUBLIC_APP_URL` |
| Trial / onboarding | Truthful **Request Early Access** → `/contact#early-access` | Set approved `PUBLIC_TRIAL_URL` and `PUBLIC_TRIAL_READY=true` only when the flow is actually ready |
| See How It Works | Working homepage anchor | Nothing outstanding |
| Navigation, pricing, Bizzy, features, legal links | Working clean routes | Final legal approval remains required |
| Enquiry form | Local validation; sending disabled | Approved same-origin backend and `PUBLIC_CONTACT_ENABLED=true` |
| Domain email links | Hidden until addresses are approved and configured | Verify each address is operational; set `PUBLIC_CONTACT_ADDRESSES_APPROVED=true` |

The temporary CTA is a readiness correction, not a new design. When signup is approved and configured, it becomes **Start Free Trial** automatically. No assumed `/register` route is created.

## Contact service contract — prepared, not connected

The client and shared validation contract support name, company, email, optional phone, category, message and an anti-spam honeypot. Required fields, lengths, category selection, email syntax and control characters are validated. The same validation must run server-side; client validation is not an abuse defence by itself.

Only an approved same-origin `/api/…` endpoint can be configured. The client uses POST JSON, a timeout and in-memory form state. It shows an accepted state only for a successful response containing `{ "accepted": true }`. Acceptance does not claim delivered email. Failure or an unconfirmed response preserves the fields for retry. The local preview returns 503 for API requests and never handles real mail.

Before connecting the service:

1. Select an approved backend independently of the accounting app and approve recipients, sender and a working O-IBS contact address.
2. Keep provider credentials server-side, using `.env.server.example` only as a name template.
3. Enforce request/body limits, shared validation, safe email escaping, same-origin/CSRF policy and durable rate limiting. Validate honeypot/anti-bot checks server-side. Consider duplicate handling/idempotency and proportionate abuse controls.
4. Decide approved logging, retention, deletion and redaction; never log enquiry bodies or secrets by default.
5. Return a truthful accepted/failure response without reflecting internal exceptions. Test provider failure and delivery with approved accounts.
6. Approve the final privacy notice and any appropriate consent wording before enabling submissions.

No DNS, sender verification, Resend keys or provider configuration were accessed. Do not enable sending merely because a URL has been filled in.

## Legal, trust and business approval

Privacy, Terms and POPIA pages are structured **drafts requiring professional legal review**, not attorney-approved documents. Their links work, they are `noindex,follow`, and they are excluded from the sitemap until final wording is approved.

The privacy draft covers account/contact details, business/customer/supplier information, uploaded documents, AI assistance, operators/transfers, cookies/logs, retention/deletion and rights/contact procedures. Terms cover the contracting party, authorised access, trials/plans, data, acceptable use, responsible AI, support, ending service and items for liability/dispute review. POPIA information links to the Information Regulator’s official resources without claiming compliance.

Approved legal entity details, privacy contacts, actual data flows/providers, retention arrangements and reviewed final terms remain necessary. Application plan/feature verification remains provisional by explicit user instruction. Security wording does not claim unsupported authentication, storage, backups, certifications or uptime guarantees.

Primary references checked: [Information Regulator POPIA resources](https://inforegulator.org.za/popia/), [official complaints information](https://inforegulator.org.za/complaints/), [MDN CSP guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

## Hosting preparation — no hosting chosen or modified

`dist/_headers` prepares CSP, MIME sniffing protection, referrer policy, frame restrictions, permission restrictions and HSTS for a compatible static host. CSP permits self-hosted scripts plus the exact JSON-LD hash, same-origin connections, and no embedding/plugins/form-native submission. Inline styles remain permitted to preserve approved styling; inline executable scripts and external script sources are not permitted. HSTS does not include subdomains, avoiding an unrequested policy for the separate app/staging hosts.

These headers are applied by the local preview for browser QA, except HSTS on local HTTP. Their presence in a file does **not** prove a future host applies them. The selected host must support or translate them, provide HTTPS, clean routes, gzip/Brotli compression and the branded 404/500 fallback documents. Verify the actual deployed response headers, indexing and caching after a separately approved release. The preview server is loopback-only and is not a production email/backend service.

## SEO and assets

Each page has unique titles/descriptions, canonical and Open Graph/Twitter metadata. The site-wide share image is 1200×630 and uses only the approved artwork and accurate product positioning. PNG browser/app icons exist at 32, 48, 180, 192 and 512px. The manifest uses browser display mode and does not claim to be the accounting app.

The sitemap covers nine indexable marketing routes. Robots references the intended canonical domain without connecting it. Website structured data contains no ratings, invented legal entity or prices. Unknown/error pages are marked noindex. The legacy public dashboard JPEG has been removed; the homepage/Product preview is HTML rather than a blurry screenshot.

## Analytics and cookies

No tracking or consent banner was added because no non-essential tracking exists. A future privacy-conscious approach should favour aggregate, minimal collection; document provider/log retention and evaluate consent before adding non-essential storage. No analytics keys or scripts are currently wired in. Re-audit CSP and privacy wording if this changes.

## Local commands and checks

Build, tests and preview require Node.js only:

```powershell
node scripts/build.mjs --production
node scripts/test.mjs
node scripts/serve.mjs
```

ESLint, axe and Lighthouse are isolated local QA tools under ignored `.qa-tools/`; they are never part of `dist/` and add zero runtime website dependencies. To recreate them with pnpm: `pnpm --dir .qa-tools add eslint axe-core lighthouse`. Browser QA and asset generation also use the bundled Playwright path or a configured `PLAYWRIGHT_PATH`, and installed Microsoft Edge. Lighthouse uses installed headless Chrome.

```powershell
node scripts/lint.mjs
node scripts/readiness-qa.mjs
node scripts/release-check.mjs
```

`release-check` intentionally returns a nonzero status while actual release inputs remain missing. A successful static production export is not approval to deploy. There is no TypeScript in this project; ESLint and Node syntax checks are the applicable code checks.

## Required before o-ibs.co.za goes live

1. Approve this local readiness pass and then explicitly authorise any commit, push or deployment.
2. Verify features/plan entitlements against the application and approve pricing/trial/beta conditions.
3. Configure approved operational app and onboarding destinations.
4. Approve legal identity, final policies, privacy/support contacts and request processes; replace draft content and remove draft indexing restrictions only after review.
5. Connect and test approved contact delivery or publish an operational, approved enquiry address.
6. Select an independent hosting target, confirm headers/compression/error routing, and plan the domain/HTTPS setup separately. No DNS instructions or records are invented here.
7. Recheck real-host HTTPS, metadata, sitemap, CTAs, sender delivery, accessibility and production performance after authorised publication.

## Safety confirmation

No DNS, staging application, accounting/customer records, databases, Render settings, Resend settings, Cloudflare R2, application authentication or production secrets/settings were changed. No real business/customer records were created. No commit, push, deployment, Sites registration or domain connection occurred. All automated contact responses were intercepted test fixtures; no email was sent.
