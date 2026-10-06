# O-IBS production-readiness report — 6 October 2026

Local readiness work is complete for review. The approved visual identity, hero and synthetic dashboard are preserved. **The site is not authorised or operationally ready for public release.** Business/legal/contact/application inputs remain explicit launch gates. Nothing was committed, pushed or deployed.

## Improvements

Truthful readiness-dependent CTAs; validated app/onboarding configuration; working menu focus; shared approved dashboard on Home/Product; consistent authoritative logo and optimised delivery image; five icon sizes and a branded social image; structured legal drafts; contact validation and honest response states; security headers; compression; branded 404/500 errors; expanded technical SEO; accessibility/text-enlargement corrections. Plan entitlements remain provisional as explicitly requested. The original supplied brand artwork is unchanged.

## Results

| Check | Result |
|---|---|
| Production-mode static export | PASS — 12 routes plus 404/500, headers, sitemap, robots and manifest |
| ESLint | PASS — syntax/correctness rules, no errors |
| Static/configuration tests | PASS — 439 local links/assets, negative URL/configuration cases, validation and asset checks |
| Browser/responsive checks | PASS — 84 route/width combinations across 1920, 1440, 1024, 768, 430, 390, 360px |
| axe accessibility | Zero violations in 24 desktop/mobile audits across 12 routes |
| Text enlargement | PASS — 200% text at 390px, no horizontal overflow |
| Menu, Bizzy and contact states | PASS — keyboard menu, five synthetic questions, unavailable/validation states and intercepted accepted/failure/retry fixtures |
| Console / resources / external requests | No unexpected errors, broken requests or unsolicited external requests |
| Public-build privacy/secret scan | PASS — 24 text files; no common secret/private-data/development-host patterns detected |
| Runtime dependencies | Zero |
| Isolated QA-tool dependency audit | 185 packages; zero reported advisories |
| Lighthouse mobile: performance | 100/100 |
| Lighthouse mobile: accessibility | 100/100 |
| Lighthouse mobile: best practices | 100/100 |
| Lighthouse mobile: SEO | 100/100 |
| Release gate | Intentionally BLOCKED — missing launch inputs; not a build/test failure |

Lighthouse 13.5.0, local mobile lab run: FCP 0.9 s, LCP 1.4 s, CLS 0, blocking time 0 ms. These results do not establish real-host Core Web Vitals or guarantee identical scores after deployment. No TypeScript is present; a separate type-check stage is not applicable. Automated accessibility checks are not a complete WCAG or assistive-technology certification. Axe marked some gradient/text contrast checks for manual review; primary light/gold/muted text pairs were inspected against dark surfaces.

## Files updated

- [scripts/build.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/build.mjs)
- [scripts/serve.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/serve.mjs)
- [scripts/test.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/test.mjs)
- [src/site.js](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/site.js)
- [src/home-dashboard.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/home-dashboard.mjs)
- [src/home-dashboard.css](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/home-dashboard.css)
- [.env.example](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/.env.example)
- [.gitignore](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/.gitignore)
- [package.json](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/package.json)
- [README.md](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/README.md)
- [qa/QA.md](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/QA.md)

Generated HTML and existing public assets under dist/ were regenerated. The obsolete public dashboard-reference JPEG was removed so generic reference identities are no longer served. No application repository files were modified.

## New source/configuration files

- [src/config.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/config.mjs)
- [src/contact-page.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/contact-page.mjs)
- [src/contact-contract.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/contact-contract.mjs)
- [src/contact.js](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/contact.js)
- [src/legal-pages.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/legal-pages.mjs)
- [src/readiness.css](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/readiness.css)
- [scripts/brand-assets.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/brand-assets.mjs)
- [scripts/lint.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/lint.mjs)
- [scripts/readiness-qa.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/readiness-qa.mjs)
- [scripts/release-check.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/scripts/release-check.mjs)
- [eslint.config.mjs](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/eslint.config.mjs)
- [.env.server.example](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/.env.server.example)
- [RELEASE.md](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/RELEASE.md)
- [src/assets/o-ibs-logo-display.jpeg](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/o-ibs-logo-display.jpeg)
- [src/assets/favicon-32.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/favicon-32.png)
- [src/assets/favicon-48.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/favicon-48.png)
- [src/assets/apple-touch-icon.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/apple-touch-icon.png)
- [src/assets/icon-192.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/icon-192.png)
- [src/assets/icon-512.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/icon-512.png)
- [src/assets/social-share.png](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/social-share.png)
- [src/assets/brand-provenance.json](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/src/assets/brand-provenance.json)

New generated export files include dist/500.html, dist/_headers, dist/site.webmanifest, contact modules, branded icon/social assets and readiness styles. New QA reports and nine review PNGs are under qa/. Ignored .qa-tools/ holds local audit packages and their lockfile only; it is not included in the website export.

## SEO, navigation and CTA audit

Unique titles/descriptions, canonical URLs, Open Graph/Twitter metadata and approved-brand share imagery exist on all 12 routes. Homepage wording explicitly covers South African SME invoicing, purchases, inventory, banking, accounting, reporting and Bizzy. Website structured data is limited to accurate name/origin/description. Nine-route sitemap and valid robots.txt are present. Unapproved legal drafts and errors are marked noindex.

Internal links and anchors resolve. Request Early Access opens the clear enquiry preview while signup is unavailable. A configured, approved trial destination plus PUBLIC_TRIAL_READY=true switches the existing styled CTA to Start Free Trial. Sign In uses getting-started guidance until PUBLIC_APP_URL is approved. Valid production routing was tested as configuration fixtures, not by accessing a real app or signup flow. Staging cannot be accidentally configured as the production app/trial destination.

## Remaining placeholders and approvals

- Approved operational production app and onboarding URLs.
- Real signup readiness, trial/beta terms, pricing and business-approved entitlement verification.
- Professional legal review, responsible legal entity, privacy/Information Officer and request-process details.
- Confirmed support/contact addresses and an approved, tested contact backend or operational enquiry address.
- Application security controls, providers and retention arrangements verified against actual implementation before publishing additional claims.
- Independent static hosting choice, HTTPS, actual header/compression/error routing support and authorised domain setup.

Privacy/Terms/POPIA are clearly marked drafts, not attorney-approved copy. Prices and feature entitlements remain provisional. No business addresses or certifications were invented. Contact send remains disabled; its future success/failure states were tested using intercepted synthetic responses, never live email. See [RELEASE.md](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/RELEASE.md) for the complete release checklist and backend contract.

## Safety confirmation

No DNS, staging application/data, database, Render configuration, Resend configuration, Cloudflare R2, production settings, application authentication or secrets were changed. No real customer/business records were created, and no application data was accessed. No email was sent. No commit, push, deploy, Site registration or domain connection occurred.

## Requested final previews

### Homepage desktop — 1440px

![Homepage desktop — 1440px](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-home-1440.png)

### Homepage mobile — 390px

![Homepage mobile — 390px](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-home-390.png)

### Bizzy section desktop

![Bizzy section desktop](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-bizzy.png)

### Features desktop

![Features desktop](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-features.png)

### Pricing desktop

![Pricing desktop](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-pricing.png)

### Contact page

![Contact page](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-contact.png)

### Footer / legal navigation

![Footer / legal navigation](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-footer.png)

### Representative legal page — Privacy draft

![Representative legal page — Privacy draft](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-legal.png)

### Branded 404 page

![Branded 404 page](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/readiness-404.png)
