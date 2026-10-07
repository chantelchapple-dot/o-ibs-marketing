# Website Phase 3 — product owner review

Prepared locally on master at c6a9396f35bee8db6d28bad41bbd7cfa179cb077. No commit, push or deployment. Phase 2 live forms acceptance remains separate and pending.

## Proposed customer experience

- Homepage and Product: sales request through accounting; supplier purchasing through accounting; Bizzy assistance and explicit financial confirmation.
- Features: three task groups mapped to the existing public Basic/Business/Complete comparison; no entitlement logic changed.
- FAQ: 17 native, keyboard-accessible disclosures about plans, VAT, invoicing, stock, banking, imports, documents, privacy, support and Early Access.
- Early Access: clearer review steps, no guaranteed acceptance, no automatic account or subscription; form contract untouched.
- All pages: FAQ link in Support footer. Legal page bodies remain unchanged drafts.

## SEO audit and changes

New FAQ canonical, unique title/description, OG/Twitter metadata and sitemap entry. Improved Product, Features and Pricing search-language metadata. Existing unique headings, canonicals, robots, sitemap and Organization/WebSite schema pass. No ratings, fake testimonials, FAQ rich-result promises or speculative social accounts. Legal/PAIA drafts remain noindex. Existing CSP schema hash and six security headers are unchanged.

## Verification

- Build and ESLint passed.
- 16 routes; 706 local link/asset references; SEO/schema/security/privacy scans passed.
- Seven backend test groups passed without real credentials or real delivery.
- Isolated mocked forms success/failure/retry and six enabled-form responsive/accessibility audits passed. No public submissions sent.
- Whole site: 112 layout checks at 360/390/430/768/1024/1440/1920; 32 axe audits, zero violations, no overflow/browser/asset failures.
- All 17 FAQ disclosures open and close by keyboard.
- Performance: homepage HTML 31,736 bytes, 8,531 gzip; loaded subresources 66,901 decoded bytes. Logo 28,763 bytes with fixed dimensions; homepage JavaScript 4,106 bytes; system fonts, no remote fonts/tracking. No new browser JavaScript or images. Lab risk audit only, not measured production field Core Web Vitals.

## Boundaries and owner review

Read-only application inspection now verifies the public plan mapping against server/feature-registry.js. The audit passed 138 plan checks. Basic includes customer balances and expense receipt capture; Business adds supplier invoices/payments, supplier-invoice capture, statements, credit notes/refunds, assets/depreciation, banking and detailed reports; Complete adds stock and purchasing. Capture HTTP and review code confirms JPG/PNG/PDF, explicit review, VAT evidence/treatment and preparation through the existing proposal workflow. Live reader configuration and operating plan-change policies remain owner confirmation items; no automatic plan switching is promised. Qualified South African legal/privacy review, Information Officer governance and Production Security & Data Protection remain separate mandatory gates. Social profiles stay unpublished until real official URLs are approved.

No forms backend, frontend delivery logic, form configuration, secrets, prices, DNS, Resend, email, Render, staging, application/database or R2 changes. Public deployment has not changed.

On approval the proposed marketing export adds /faq and updates content, metadata, footer navigation and a small disclosure style rule. Render must retain the existing public forms build settings; local default previews intentionally use disabled forms, while the live settings are untouched.

## Files changed

- o-ibs-marketing/dist/404.html
- o-ibs-marketing/dist/500.html
- o-ibs-marketing/dist/about/index.html
- o-ibs-marketing/dist/ai-data/index.html
- o-ibs-marketing/dist/assets/content.css
- o-ibs-marketing/dist/bizzy/index.html
- o-ibs-marketing/dist/contact/index.html
- o-ibs-marketing/dist/early-access/index.html
- o-ibs-marketing/dist/features/index.html
- o-ibs-marketing/dist/help/index.html
- o-ibs-marketing/dist/index.html
- o-ibs-marketing/dist/paia/index.html
- o-ibs-marketing/dist/popia/index.html
- o-ibs-marketing/dist/pricing/index.html
- o-ibs-marketing/dist/privacy/index.html
- o-ibs-marketing/dist/product/index.html
- o-ibs-marketing/dist/security/index.html
- o-ibs-marketing/dist/sitemap.xml
- o-ibs-marketing/dist/terms/index.html
- o-ibs-marketing/qa/phase2-browser.json
- o-ibs-marketing/qa/phase2-seo-trust.json
- o-ibs-marketing/qa/phase2-static.json
- o-ibs-marketing/scripts/build.mjs
- o-ibs-marketing/scripts/phase2-audit.mjs
- o-ibs-marketing/scripts/readiness-qa.mjs
- o-ibs-marketing/scripts/test.mjs
- o-ibs-marketing/src/content.css
- o-ibs-marketing/src/early-access-page.mjs
- o-ibs-marketing/src/plain-language.mjs
- dist/faq/index.html
- qa/phase3-performance.json
- scripts/phase3-qa.mjs
- src/launch-content.mjs
- o-ibs-marketing/qa/phase3-review.md

## Final content corrections and source evidence

Application source inspected read-only: C:/Users/chant/Desktop/Business-in-Your-Pocket, HEAD d053b373890f5b621e91337b2ec0ed2f06b3d972. Sources: server/feature-registry.js, server/capture-http.js, server/document-capture.js, server/capture-bizzy.js, public/document-capture.js and server/banking.js. No runtime, database or secret files were accessed. The banking implementation restricts sources to manual/statement import.

Early Access explicitly takes no payment, creates no account/subscription and guarantees no acceptance. Bizzy safeguards cover financial and stock changes. Supported receipt/supplier capture is accurately described, extraction is not approval and VAT is not automatically claimable. Real historical migration is not generally available until separate security/data-protection checks are complete. Sales journey wording now describes customer request/acceptance without implying a separate request-record feature.

Final QA: 138 central entitlement assertions, build/lint, 16 routes/706 link-assets, SEO/schema/privacy/security, 17 FAQ keyboard checks and whole-site responsive/axe regression. No live forms submissions, commits, pushes or deployments. Phase 2 mail delivery acceptance remains pending.

Additional files: scripts/entitlement-audit.mjs and qa/phase3-entitlements.json. The accompanying performance report is the latest local lab measurement, not field Core Web Vitals.
