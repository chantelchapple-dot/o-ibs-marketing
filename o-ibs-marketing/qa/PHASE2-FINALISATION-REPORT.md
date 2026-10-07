# O-IBS Website Phase 2 — finalisation report

7 October 2026. **LOCAL ONLY — no commit, push, deployment or infrastructure changes.** This report supersedes the previous report’s Contact-field details and proposed submission architecture. The approved visual design and owner-confirmed business information are preserved.

## A. Completed

Removed the optional phone field from Contact, its browser-validation loop and enquiry payload contract. Contact now has only Name, Company, Email, Subject/category and Message, plus the existing hidden anti-spam field. No replacement personal-information field or attachment upload was added. Privacy now explicitly describes those five visible fields and states that no phone number is requested. POPIA did not contain a website phone-collection claim requiring removal.

Contact warns against submitting passwords, banking credentials or unnecessary confidential financial information. Early Access retains the approved minimal fields and unchecked Privacy acknowledgment. No marketing consent is requested.

Basic remains **R190/month**, Business **R450/month**, Complete **R650/month**. O-IBS is not VAT registered and no VAT is presently charged. No annual prices, discounts, fees, limits or promotional prices were introduced. Public paid subscriptions remain closed. Company identity remains O-IBS, registration **2026/798906/07**, South Africa, with **support@o-ibs.co.za** and the approved tagline. No public street address or telephone number is published. Returns remain under Complete where inventory access is required.

Navy/charcoal/champagne-gold design, branding, layouts, homepage structure and dashboard remain preserved. AI & Data Use retains “Bizzy helps. You stay in control”, human review and the separation between prepared work and confirmed financial changes. Legal pages retain their professional-review notices; no officer, PAIA manual, certification or social profile was invented.

**Form activation is blocked by the current deployment architecture.** Both forms remain visibly unavailable and cannot claim receipt. No backend was fabricated, no browser email key was added and no production success preview was manufactured.

## B. Tests passed

- Production build: 15 static routes. ESLint and static tests pass.
- 642 internal links/assets/anchors; unique metadata/H1, canonical/social URLs, Organization/WebSite schema/references, CSP hash, sitemap/draft indexing and preserved homepage design pass.
- 105 responsive checks: all 15 routes at 1920, 1440, 1024, 768, 430, 390 and 360. No horizontal overflow.
- 30 axe audits at desktop/mobile: zero selected WCAG 2/2.1 A/AA and best-practice violations. Keyboard/menu/details, Bizzy demonstrations, 200% text, reduced motion and mobile plan comparison pass. Automated audits do not replace assistive-technology testing.
- Contact phone removal checked in rendered HTML and browser DOM. Contact/application local validation and unavailable states pass. Acknowledgment starts unchecked. Default submission buttons remain disabled. No unexpected network calls, browser errors or failed assets in the browser run.
- Public-output scans pass for tested secrets, private/staging/customer identifiers, unapproved email addresses and fake social links. Pricing, VAT wording, registration and support address checks pass.
- Local inactive endpoints return `accepted:false`/503 for POST/PUT/PATCH/DELETE/OPTIONS, including malformed, excessive and injection-shaped payloads. GET to nonexistent API routes returns 404. Twenty rapid POST requests remain unavailable without false success. **These checks demonstrate unavailability, not implemented server validation or rate limiting.**
- The existing Contact mock tests exercise future accepted/error/retry behaviour using browser-intercepted synthetic responses only. They do not demonstrate real email delivery. Early Access has no success implementation masquerading as a live service.
- Previous final homepage Lighthouse lab reports remain applicable to its unchanged markup: mobile/desktop 100 in Performance, Accessibility, Best Practices and SEO. The new finalisation checks were rerun; Lighthouse was not rerun for a Contact-only field removal.

### Submission-security tests that cannot pass yet

| Requested check | Status |
|---|---|
| Real server validation, field limits, direct endpoint requests and method handling | BLOCKED — no deployed handler |
| HTML/script and email/header injection handling | BLOCKED for email backend; inactive local endpoint does not accept requests |
| Rate limiting and anti-spam under rapid submissions | BLOCKED — no backend protection implemented |
| Idempotent delivery and duplicate-button handling | Submission disabled; backend behaviour cannot be verified |
| Real provider failure, timeout/retry and no false success | BLOCKED — no configured delivery integration |
| Secret/environment disclosure in generated assets | Scans pass; no mail secret introduced or read |
| Access to application/staging database | No connection/import/integration exists in marketing form code; application database was neither accessed nor modified |
| Minimal logging of application personal data | No form backend/logging exists; future implementation must avoid payload logging |

## C. Early Access submission architecture

Read-only inspection of the authenticated Render dashboard confirmed:

- Service: **o-ibs-marketing — Static Site**.
- Repository: `chantelchapple-dot/o-ibs-marketing`, branch `master`.
- Root directory: `o-ibs-marketing`.
- Build: `node scripts/build.mjs --production`.
- Publish directory: `dist`.
- Deployed baseline: `0eb0405f210d68f115f8e755c8e9bf72689fa330`; this Phase 2 work is local and not deployed.

Repository inspection found static export scripts and a local-only preview server. That preview server explicitly returns unavailable responses to API submissions and is not a production mail handler. There is no marketing backend/serverless handler or deployment manifest provisioning one. The `.env.server.example` contains names/placeholders for a future backend, not an operational Resend integration. No application-project credentials were inspected or copied.

Render Static Sites publish static files; they do not run a Node email handler at request time. Dynamic request processing requires a web service or another approved serverless endpoint. See [Render Static Sites](https://render.com/docs/static-sites) and [Render Web Services](https://render.com/docs/web-services).

**Smallest recommended infrastructure addition:** one isolated marketing-only HTTPS form backend, for example a separate Render Web Service for Early Access and Contact, leaving the existing Static Site, domains and application/staging service untouched. The service may use its own `onrender.com` address, so no DNS/domain move is necessary. Approve its runtime/plan/cost separately before provisioning. No new service was created here.

A later frontend integration would call that exact approved backend URL, with CORS restricted to `https://o-ibs.co.za`, narrow CSP permission and no browser credentials/API keys. Origin restrictions are not sufficient anti-spam protection by themselves. The backend must validate bounded JSON server-side, allowlist choices and methods, neutralise email/header injection, escape submitted text in HTML email, reject attachments, limit request size and rate, and implement safe retries/idempotency. Use a rate-limit/idempotency mechanism appropriate to the actual service topology and restarts.

The initial delivery should send an internal email titled `New O-IBS Early Access Application — [Business Name]`, sanitising the name and header fields. Only verified sender/recipient configuration may be used. A provider handoff acknowledgment must be distinguished from final inbox delivery; failures require monitoring/reconciliation and must never be reported as a confirmed success. The accepted-response contract and meaning of “Application received” must be agreed and tested before activation.

Review/invitations stay manual. The service must have no application-database credentials or account/company/subscription/payment/ledger-provisioning integrations. No separate staging/application database is needed for this email workflow.

## D. Contact submission architecture

Use the same approved marketing-only backend with a separate Contact route and bounded Name/Company/Email/Category/Message payload. Route only to a configured O-IBS recipient; do not manufacture departments. No attachments or phone number. Apply the same validation, injection protection, rate limiting, idempotency and truthful error/acceptance contract.

Contact remains disabled now. The public support mailto link is preserved, but the sender identity and recipient-mailbox delivery have **not** been verified by this task. Publication approval for an address does not establish provider/mailbox configuration.

## E. Environment/configuration still required

Existing example backend variable names only — **no values inspected, published or changed**:

- `MAIL_PROVIDER`, `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`.
- `CONTACT_ALLOWED_ORIGIN`, `CONTACT_RATE_LIMIT_PER_MINUTE`.
- `CONTACT_RATE_LIMIT_STORE`, `CONTACT_ANTIBOT_SECRET` if the chosen protections require them.
- `CONTACT_RETENTION_DAYS` if the implementation retains submissions/queue records; define actual retention rather than enabling an unused variable.

Resend is an option, not a confirmed marketing provider. Provision a dedicated appropriately scoped marketing credential through the provider/Render secret interfaces, **never by pasting its value into chat** and never by copying application secrets. Confirm the sender domain/identity and receiving mailbox with the owner’s mail/provider configuration.

The approved backend URL, frontend enable flags, CSP/CORS and response contract will require explicit integration work once the service exists. Existing `PUBLIC_CONTACT_ENABLED`/`PUBLIC_CONTACT_ENDPOINT` assume a same-origin endpoint and cannot simply be pointed at an arbitrary external service; implement and test the chosen URL configuration deliberately. Early Access likewise has no enabling backend URL yet. No flags were activated, and no environment/example files were changed in this finalisation pass.

## F. Owner actions required

- Approve the isolated marketing form service/provider and its plan/cost before infrastructure provisioning, then arrange sender/recipient verification and secure credential entry outside chat.
- **OWNER ACTION REQUIRED — Information Officer / POPIA governance.** Confirm appointment/registration responsibilities and approved public contact particulars with professional advice. No officer details are invented or completion claimed.
- **OWNER ACTION — Establish official O-IBS LinkedIn, Facebook and Instagram profiles.** No accounts/links were created.
- Assign application reviewers, invitation responsibility and support/privacy/legal routing. Supply the final reviewed PAIA manual and approved beta acceptance arrangements.

## G. Professional legal/privacy review required

Privacy, Terms, POPIA and PAIA remain professional-review drafts/status information. Review purposes/lawful grounds, notices/acknowledgment, provider roles/contracts/locations/transfers, retention/deletion, request and incident procedures, contracting disclosures and beta terms. No final retention period, officer appointment or compliance certification is claimed.

Policy text currently describes the actual inactive previews accurately. Revise it for the actual provider/delivery/retention mechanism only when that mechanism has been implemented and verified. Do not describe speculative infrastructure as operational.

## H. Required before closed-beta application activation

Approved service and isolated credentials; verified sender/recipient; reviewed collection notice; real server validation/injection/method/abuse/duplicate tests; provider failure and retry tests; truthful receipt semantics; protected reviewer access, retention/incident procedures and manual invitations. Resolve applicable Information Officer/POPIA/PAIA duties with counsel. This is not an instruction to disrupt existing invited-user staging access.

## I. Can wait until public paid launch

Public paid subscription/checkout, approved production sign-in/onboarding URL, final commercial cancellation/refund/payment terms and any future expressly approved limits/fees. Monthly prices are already approved. Expanded help content, official social content and optional certification can follow. Baseline privacy/support/incident responsibilities should not be deferred simply because access is free or in beta.

## J. Files changed and working tree

Finalisation edits: `src/contact-page.mjs`, `src/contact-contract.mjs`, `src/contact.js`, `src/legal-pages.mjs`, `scripts/test.mjs`, `scripts/readiness-qa.mjs`, regenerated static files and QA/report evidence. Exact combined Phase 2 inventory is [phase2-files.json](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-files.json).

The marketing working tree is intentionally uncommitted for approval. Inventory checks confirm changed/untracked non-ignored files are restricted to the marketing project’s Phase 2 source/export/QA work, with no unrelated workspace files. Preview PNGs are ignored by Git. No application repository, staging service/data/ledgers, DNS/domains, Render configuration, environment values, R2/Resend/OpenAI configuration or other external service was modified.

## Final previews

| Preview | File |
|---|---|
| Homepage desktop / mobile | [1440](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-home-1440.png) · [390](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-home-390.png) |
| Pricing | [Plans](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-pricing.png) |
| Early Access desktop / mobile | [1440](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-early-access-1440.png) · [390](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-early-access-390.png) |
| Application unavailable state | [Synthetic local check — no submission](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-application-unavailable-390.png) |
| Successful / failed real email submission | NOT GENERATED — no operational backend. Showing a genuine receipt/delivery failure is blocked; no mock is presented as live delivery. |
| Contact desktop / mobile | [1440](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-contact.png) · [390](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-contact-390.png) |
| Footer | [Footer](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-footer.png) |
| Privacy | [Privacy](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-privacy.png) |
| POPIA | [POPIA](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-popia.png) |
| AI & Data Use | [AI & Data Use](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-ai-data.png) |
| Security | [Security](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/phase2-security.png) |

**STOP FOR OWNER APPROVAL — no commit, push or deployment.**
