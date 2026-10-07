# O-IBS plain-language website refinement

Review date: 6 October 2026. Local marketing website only. Ready for content/design approval; **not approved for deployment**.

The existing premium navy/champagne-gold theme, original logo assets, typography, header layout, dashboard component and responsive foundations remain intact. No application or staging code, data, authentication, Render configuration, DNS, environment variables or external services were changed. No commit, push or deployment was made. Application repository working tree remains clean.

## 1. Files changed

Editable implementation: `scripts/build.mjs`, `scripts/readiness-qa.mjs`, `scripts/test.mjs`, `src/config.mjs`, `src/legal-pages.mjs`, `src/site.js`; new `src/plain-language.mjs` and `src/content.css`.

The config-module changes update release-check explanations only. They do not alter configuration values, environment files, endpoint availability or sign-in destinations.

Generated export: 13 route HTML files (including new `/ai-data`), 404/500 pages, sitemap, the updated demo JavaScript and new content CSS. The shared footer and CTA explain why other route exports changed.

Evidence: `qa/content-static.json`, `qa/content-browser.json`, `qa/content-lighthouse-mobile.json`, `qa/content-lighthouse-desktop.json`, this report and updated `qa/release-readiness.json`. The exact file inventory is in `qa/content-files.json`. Previous readiness evidence was preserved.

Original `site.css`, `product-reference.css`, `readiness.css`, `home-dashboard.mjs`, `home-dashboard.css`, original logo, icons and social-preview artwork are unchanged. Runtime dependency count remains zero.

## 2. Homepage

Preserved “Your business. One intelligent system.” and the brand eyebrow. Supporting copy explains everyday quotes, invoices, customers, suppliers, stock, banking and accounting. Primary CTA is “Start Early Access”; secondary is “See how O-IBS works”; Sign in remains available through existing access guidance.

The site states it is preparing for early access / closed beta. Public registration is not open. The early-access CTA opens the existing enquiry preview; submissions remain disabled and no entered information is transmitted or stored.

Added eight everyday capability cards, concrete workflow guides, optional accounting explanations and a visible trust/AI summary. The approved synthetic Demo Company dashboard and its exact KPI labels remain unchanged.

## 3. Plain language

Lead with selling, buying, stock, expenses, customer balances and supplier balances. Explain professional tools through their purpose. Keep plan and workspace availability qualifications. The copy avoids implying a public paid service or guaranteed feature rollout.

## 4. Accounting terminology

Fourteen optional explanations connect everyday language with the formal application terms: Accounts Receivable, Accounts Payable, Revenue, Expenses, Cost of Goods Sold, Bank Reconciliation, General Ledger, Trial Balance, VAT position, Balance Sheet, Profit & Loss, VAT Report, Journal entry and Chart of accounts.

Formal terms stay available to bookkeepers and accountants. The approved application preview retains Net invoiced, Net receipts, Expenses and Receivables. Trial Balance explains that balanced entries can still contain mistakes; VAT wording calls for eligibility and tax-treatment checks.

## 5. Bizzy

Eight working synthetic examples cover money owed by customers, suppliers owed, monthly sales, attention items, reorder stock, quote preparation, invoice context and payment-reminder drafting.

Quote preparation asks for the missing customer, specific product and unit price. Invoice lookup makes the need for an identified invoice clear. Reminder copy states draft/manual sharing; no message is sent. Important financial changes are presented for approval. The static demonstrations make no network calls or business changes.

## 6. Workflow demonstrations

Three ordered guides illustrate quote → acceptance → invoice → recorded payment → updated customer balance; purchase order → goods received → supplier invoice → recorded payment; and imported bank transactions → suggested matches → review → confirmation → matched records.

Recording a payment does not transfer money. The bank workflow uses imported or manually recorded transactions and does not promise a live feed. These guides complement the existing product dashboard and interactive Bizzy examples; no real customer screenshot was added.

## 7. Plans and pricing

Basic explains everyday sales/expenses; Business explains supplier balances, bank matching and detailed accounting; Complete adds stock, purchase orders and goods received. A short accessible comparison is provided on Plans.

All details remain provisional. All price placeholders say “Early-access pricing coming soon.” No price, trial duration, billing limit or paid availability was invented. Groupings were checked against the read-only application feature registry, without treating that source review as commercial approval.

## 8. Trust/security

Explain customer control, approval of important changes, and the distinction between recording and transferring money. Source-backed safeguards include password hashing, signed-in session checks, company membership/permissions and company/feature checks for stored documents.

No bank-grade, unhackable, 100% secure, certification, fully compliant, guaranteed storage encryption or uptime claim was added. Implementation safeguards are distinguished from operating configuration and provider arrangements still requiring review.

## 9. Legal, privacy and AI

Added `/ai-data`: when AI may be enabled, request wording and user-supplied details, uploaded requisition text/images/PDF pages, purpose of processing, supported OpenAI implementation, error risk and approval boundaries. Clarifies that asking the provider not to store a response does not establish all retention/training/transfer arrangements.

Added “The short version” to Privacy, Terms and POPIA, preserving detailed drafts and prominent professional-review notices. Terms retain an Acceptable Use and security section. Footer links include AI & Data Use, Privacy Policy, Terms, POPIA / Privacy, Security & Trust, Help / Support and Sign in.

## 10. SEO

13 unique page titles and descriptions; one H1 per page; matching canonical and Open Graph/Twitter metadata. Added the informational AI page to the sitemap. Privacy/Terms/POPIA drafts remain noindex,follow and outside the sitemap. Existing favicon, manifest, social artwork, structured data and robots are retained.

## 11. Accessibility

26 axe audits across all 13 routes at 1440 and 390: **zero violations** for the selected WCAG 2/2.1 A/AA and best-practice checks. Automated checks do not replace assistive-technology testing.

Native explanations operate with Enter/Space and tap; their content is not hover-only. Menu focus and Escape tested. All eight Bizzy prompts tested, with pressed states and live answer updates. Contact labels, validation and disabled submission tested. Future submission response states tested only with intercepted local synthetic responses. Reduced motion and 200% text enlargement at 390 tested, with no overflow. Plan table has caption and row/column headers and fits at 360.

## 12. Responsive and visual review

91 route/width checks: all 13 routes at 1920, 1440, 1024, 768, 430, 390 and 360. **Zero horizontal overflow**. Zero browser errors, failed requests or unexpected external requests in the functional test run.

Reviewed desktop/mobile homepage, Bizzy, workflow guide, accounting explanations and mobile plan comparison. Final whole-page previews: `content-home-1440.png` and `content-home-390.png`; readable hero crops: `content-hero-1440.png` and `content-hero-390.png`. Additional section/page review images are local and ignored by Git.

## 13. Build, performance and privacy checks

Production export, ESLint and static checks pass. **13 routes and 524 local links/assets** checked, including destinations and anchors. Public-output scans found zero tested secret/private-data patterns or unapproved contact addresses. Preview server rejects environment-file access, returns safe invalid-path errors and keeps the contact endpoint unavailable. Security headers remain present.

Local Lighthouse mobile: Performance/Accessibility/Best practices/SEO **100/100/100/100**; LCP 1.4 seconds, total blocking time 0 ms, CLS 0. Desktop: **100/100/100/100**; LCP 0.4 seconds, total blocking time 0 ms, CLS 0. These are local simulated lab measurements, not production-network or field results. Audit reports completed; lingering CLI processes were stopped after the reports were written.

No new runtime dependencies, fonts, trackers, persistence or external requests were introduced. Scripts were run directly with Node because npm is unavailable on this shell; they are the existing package script targets.

## 14. Unsupported claims corrected or avoided

- Removed customer returns from the Business plan claim; the current source gates returns through inventory functionality.
- Used “What do I owe suppliers?” rather than promising a “this week” payables query; that period is not supported by the reviewed read-intent implementation.
- No automatic reminder sending, guessed quote prices, standalone ambiguous invoice lookup, live bank feed, bank transfers or autonomous accounting promise.
- No final prices, paid subscription availability, unverified security guarantees or legally settled data-ownership contract language.

## 15. Professional review still required

Privacy, Terms and POPIA remain unapproved drafts. AI provider arrangements and operating details must be reviewed alongside them. A qualified South African legal/privacy professional must approve the responsible entity, Information Officer, lawful grounds/roles, provider and international-transfer arrangements, retention/deletion, privacy-request channels, acceptable use, service/liability terms and final commercial provisions before broad commercial launch.

## 16. Remaining recommendations and audience review

Owner: everyday capabilities and examples explain the product without prior bookkeeping knowledge. Bookkeeper: workflows and accounting/report labels remain discoverable. Accountant: formal report names and careful VAT/adjustment language remain available. Beta customer: preparation status, provisional plans, disabled enquiries and current sign-in guidance are explicit. These are editorial reviews, not interviews or user studies.

Next steps require separate approval: approve the copy/previews; arrange legal/privacy review; confirm commercial plans/limits/pricing; establish an approved functioning enquiry/support channel; publish approved onboarding/sign-in destinations when appropriate. Recheck source/runtime alignment and live website headers/performance before deployment. The release check intentionally remains blocked on these items. No deployment action is authorised by this report.
