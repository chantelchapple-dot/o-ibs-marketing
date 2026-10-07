# O-IBS WEBSITE Phase 2 — readiness and owner approval

7 October 2026. Local draft only. **No commit, push or deployment.** This report supersedes the earlier Phase 2 placeholders for prices, support and company information.

Finalisation follow-up: [latest report](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/PHASE2-FINALISATION-REPORT.md) supersedes Contact-field details and submission-architecture findings below.

## Completed

- Published in the local export: O-IBS, registration **2026/798906/07**, South Africa. No physical/residential/business street address or public telephone number is published.
- Approved monthly prices shown consistently on homepage, Plans, Early Access and draft Terms: **Basic R190/month · Business R450/month · Complete R650/month**. Obsolete pricing-coming-soon copy removed from customer pages and metadata. No annual price, discount, setup/transaction fee or usage limit invented.
- Clear statement: **O-IBS is not currently registered for VAT; no VAT is presently charged.** No subscription VAT calculation, component or “VAT inclusive” claim. The separate application’s VAT record workflows concern customers’ businesses and are not a VAT charge on these subscription prices.
- Public **support@o-ibs.co.za** route included in footer, Contact, Help, early-access and relevant legal/trust pages. Support requests are handled by email; no response-time promise. Mailto spelling/destination checked; mailbox delivery was not tested or reconfigured. No extra mailbox invented.
- `/early-access` provides the requested application fields: name, business name/email/type, approximate employee count, helpful areas, plan and optional short message. It has an unchecked Privacy Policy acknowledgment, no marketing consent and no phone/identity-document/banking-data request.
- Start Early Access links lead to the application preview. Submission is visibly disabled. Local checks handle missing/invalid fields, allowlisted options and acknowledgment. No network submission, local/session storage, account creation, subscription or payment occurs. No fake “application received” state exists. The future receive → review → invite process is clearly conditional on the service becoming active.
- Three existing plan cards, navy/champagne palette, typography, hierarchy and responsive layout retained. Verified feature allocation retained, including inventory-dependent customer returns under **Complete**. Dashboard component, logo/artwork and core theme/dashboard styles match the committed baseline; homepage section structure and tagline are preserved. Only small form-specific styles were added to the existing content stylesheet.
- Footer retains Product, Company, Support and Trust & Legal groups. An empty owner-approved social-profile list is prepared; no social link is rendered. Future entries are restricted to valid HTTPS LinkedIn/Facebook/Instagram profile destinations.
- Privacy, Terms and POPIA pages use short plain-English summaries followed by fuller review drafts. AI & Data Use and Security describe reviewed controls and their limits; no compliance/security certification, guaranteed tax correctness, autonomous bank transfer, live banking feed or silent accounting-change claim.
- `/paia` is explicitly a status page, not a manual. No fictional PDF or officer name/contact exists. Final approved manual publication requires explicit approval metadata and a reviewed PDF; merely adding a file cannot publish it.
- Unique titles/descriptions, H1, canonical/Open Graph/Twitter URLs and existing social image/icons checked on 15 routes. Organization/WebSite JSON-LD uses owner-confirmed company identity and valid publisher references. No invented ratings, offers, customer count, VAT ID, officer, address or telephone. No Google rich-result eligibility is claimed. Paid-offer markup is omitted while public paid acceptance is closed.
- Privacy/Terms/POPIA/PAIA drafts remain `noindex,follow` and excluded from the sitemap. Eleven informational/marketing routes are included. Draft status is not a substitute for reviewed operational notices.

## Owner action required

**OWNER ACTION REQUIRED — Information Officer / POPIA governance**

O-IBS does not currently have a confirmed/registered Information Officer. Confirm the appropriate officer, appointment/registration, responsibilities and approved business contact procedure with qualified South African privacy/legal advice. A support address is not an officer appointment. Do not mark this complete on the strength of a marketing page.

**OWNER ACTION — Establish official O-IBS social profiles**

Priority: LinkedIn, Facebook, Instagram. Supply approved exact profile URLs later. No external account was created, and no fake/# links were published.

Other decisions needed: designate who reviews applications and handles support/privacy/legal concerns; confirm invitation criteria and actual beta terms; approve provider arrangements, retention/deletion and escalation procedures; supply the reviewed final PAIA manual. This task deliberately publishes no street address or telephone number. Counsel must resolve any statutory disclosure requirements through an owner-approved approach; the website must not invent or silently publish private particulars.

## Legal/professional review required

Qualified South African legal/privacy review is needed for Privacy, POPIA, Terms, beta acceptance, the final PAIA manual, contracting/disclosure particulars and officer governance. Confirm purposes/lawful grounds, responsible-party/operator roles, provider contracts, international processing, retention, rights/identity checks and incident responsibilities.

AI disclosures must be checked against the providers/settings actually enabled. The earlier Phase 2 read-only source review found OpenAI support, AI interpretation/extraction requests and `store:false`; that flag is not proof of all retention/training/transfer terms. Security descriptions reflect source controls, not a live penetration test, certification or audit of backup/monitoring/provider operations.

References for professional follow-up: [Information Regulator PAIA](https://inforegulator.org.za/paia/), [Information Officer FAQ](https://inforegulator.org.za/faq/), [POPIA](https://inforegulator.org.za/popia/), [security-compromise guidance](https://inforegulator.org.za/2025/08/19/fact-sheet-handling-of-security-compromises/). Schema selection follows [Schema.org Organization](https://schema.org/Organization). These sources do not certify O-IBS compliance.

## Required before closed-beta applications / further collection

The currently working invited-user staging service was not altered or retested as part of this marketing task. Before activating this website’s application service or expanding beta collection, resolve the applicable governance, reviewed collection notice/beta terms and operational safeguards; beta/free status should not be assumed to postpone legal duties.

**Exact infrastructure needed to activate the application form:**

1. An owner-approved HTTPS backend for the marketing form, preferably a same-origin `POST /api/early-access`. The current Static Site has no application handler. This is a proposed contract, not a provisioned endpoint. Keep it separate from application ledgers, customer records and staging databases.
2. Server-side validation of the supplied fields, bounded lengths/request size, allowlisted employee ranges/plans/help areas, privacy acknowledgment and notice version. Validate independently of the browser; reject unknown fields and malformed requests. Establish purpose/lawful basis with counsel rather than treating a checkbox as blanket legal consent.
3. Abuse controls appropriate to an unauthenticated public form: rate limiting, origin/CSRF protections as applicable, bot/spam controls and safe error responses. Keep credentials entirely on the server; no API keys in this static export.
4. Protected application storage or a durable delivery queue, with least-privilege reviewer access, retention/deletion rules, provider agreements and appropriate hosting/transfer arrangements. No public spreadsheet/bucket or storage of entries in the browser. Redact personal information from routine logs.
5. An approved transactional email/delivery service and confirmed sender/recipient routing, if receipt/reviewer/invitation emails are used. Monitor failed delivery and retries. An application is “received” only after durable acceptance; distinguish that from successful email delivery. Receipt messages must not imply acceptance, account creation or a paid subscription.
6. A human review/invitation workflow with named internal responsibility, protected access and minimal audit records. Approval/invitation remains controlled; the marketing form must not create accounts, activate plans, change accounting state or take payment.
7. Approved acceptance/error response contract and frontend integration, including timeout/retry/duplicate handling, accessible success/error states and end-to-end tests. Only then enable Send and publish a real received state. Reassess CSP/connect/form policy narrowly if the approved integration requires it.

The existing Contact preview likewise remains disabled. The confirmed support mailto link works as an email destination; secure online submission still requires its own approved handler. No backend, mail provider, secrets, environment variables or infrastructure were provisioned or changed here.

## Can wait until public paid launch

- Public production sign-in/onboarding destination and paid-subscription acceptance/checkout, separately approved. Existing invited users continue using the access route already supplied to them.
- Final commercial subscription, cancellation/refund and payment terms, approved invoicing/tax particulars, and any explicitly agreed service commitments. Monthly prices are already approved; they are not still provisional. Annual discounts, fees or limits remain absent unless later approved.
- Expanded help-centre material, further social content and optional independent security certification. Baseline support, privacy handling and incident responsibilities should not be deferred solely until payment.
- Reviewed paid-offer structured data and legal-page indexing when publication status permits. No promise of rich results.

## Test/build and security/privacy results

| Check | Result |
|---|---|
| Production static export | PASS — 15 routes, no application/database connections |
| ESLint | PASS |
| Static links/assets/anchors | PASS — 642 local references |
| SEO/schema/trust audit | PASS — unique metadata/H1/canonical/social URLs, Organization/WebSite graph/references, CSP hashes, distinct full page bodies, legal status and preserved design |
| Responsive | PASS — 105 checks: 15 routes at 1920, 1440, 1024, 768, 430, 390, 360; no horizontal overflow |
| Accessibility | PASS — 30 axe audits at 1440/390; zero selected WCAG 2/2.1 A/AA or best-practice violations |
| Interaction checks | PASS — menu keyboard/focus/Escape, explanatory details keyboard/tap, Bizzy samples, contact mock response/error/retry, unavailable real form, application validation/unchecked acknowledgment, reduced motion, 200% text at 390, plan comparison at 360 |
| Browser requests | PASS — no browser errors, failed asset requests or unexpected external requests |
| Security/privacy scans | PASS — no tested secret/private-data patterns in public text exports; staging link, real customer/business examples and obsolete dashboard asset absent; no fake social links or extra mailboxes |
| Form privacy | PASS — application submission disabled, no transmission/storage code, no pre-ticked consent and no fake receipt; contact disabled by default |
| Price/company checks | PASS — R190/R450/R650, no obsolete price placeholder/VAT-inclusive claim, consistent registration/support, no public street address/tel link or invented officer |
| Lighthouse mobile | Performance / Accessibility / Best Practices / SEO: **100 / 100 / 100 / 100**; LCP 1.4s, TBT 90ms, CLS 0 |
| Lighthouse desktop | **100 / 100 / 100 / 100**; LCP 0.4s, TBT 0ms, CLS 0 |
| Public release gate | Intentionally BLOCKED — backend activation, officer/legal/PAIA work and public paid access are not approved/ready |

Automated checks are not a legal opinion, security audit or substitute for manual assistive-technology testing. Local Lighthouse is lab evidence, not deployed field performance. Both complete Lighthouse JSON reports were retained; lingering CLI processes were stopped after report completion. Mailbox delivery and live infrastructure were not tested. Runtime dependencies remain zero.

## Scope and files

Exact uncommitted file inventory: [phase2-files.json](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-files.json). Changes consist of marketing source, generated static exports and QA/report evidence. New source includes company/trust modules, the safe early-access page/validation/browser module and the SEO/trust audit. The existing Phase 2 changes were preserved and refined.

No application repository, staging service, database/business data/ledgers, plan entitlements, DNS/domains, Render, environment files/values, email infrastructure, R2/Resend/OpenAI configuration or other external service was changed. The separate application has unrelated uncommitted work; it is not represented as clean. This marketing working tree intentionally remains uncommitted for approval.

## Approval previews

| Preview | File |
|---|---|
| Homepage pricing desktop | [1440](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-home-pricing-1440.png) |
| Homepage pricing mobile | [390](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-home-pricing-390.png) |
| Full Plans/Pricing | [Plans](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-pricing.png) |
| Early Access desktop | [1440](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-early-access-1440.png) |
| Early Access mobile | [390](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-early-access-390.png) |
| Footer | [Footer](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-footer.png) |
| Contact | [Contact](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-contact.png) |
| Privacy | [Privacy](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-privacy.png) |
| Terms | [Terms](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-terms.png) |
| POPIA | [POPIA](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-popia.png) |
| AI & Data Use | [AI & Data Use](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-ai-data.png) |
| Security | [Security](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-security.png) |
| PAIA status (additional) | [PAIA](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-paia.png) |

**STOP FOR OWNER APPROVAL. No commit, push or deployment.**
