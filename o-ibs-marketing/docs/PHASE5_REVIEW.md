# WEBSITE PHASE 5 — READY FOR PRODUCT OWNER REVIEW

7 October 2026. Local preparation only, on marketing master at 4701cd239e18f93794d53eab501bcb48f91d7eaa. No commit, push, deployment, live email or public form submission.

## Existing vs new

Already satisfied: approved Contact/Early Access form fields and validation; correct Contact category; distinct internal subjects; plain text and escaped HTML; validated applicant Reply-To; configured server-side Resend to the support mailbox; rate/anti-spam/duplicate protections; approved application/review journey. These are reused, not rebuilt.

New: six applicant/support operational templates; branded preview wrappers around the two existing internal notifications; one reusable navy/charcoal/champagne-gold email layout and footer; explicit communication-state identifiers; synthetic HTML/plain-text preview generator; local preview/rendering checks; operator workflow and security tests.

Current production notifications remain exactly unchanged. Prepared wrappers are not imported into the live server. Applicant acknowledgments are draft templates only, not automatic replies. This separates template/content review from activation, extra delivery failure handling and email-bombing risks. No new datastore, recipient queue, applicant registry or env variable is needed for this preparation.

## Design and footer

Table-based HTML, inline styles, system Arial/Helvetica fonts, readable navy panels and champagne-gold headings; text wordmark and complete plain-text alternative. No remote image/font, JavaScript, tracking pixel or newsletter behaviour. Legacy background/text colours preserve readability when CSS is removed; safe wrap points handle long references. The large existing logo banner is deliberately not loaded as a remote email image; an approved compact logo/CID treatment can be considered separately if desired.

Shared footer: O-IBS; Optimised Intelligent Business System; South Africa; support@o-ibs.co.za; o-ibs.co.za. Customer-friendly footer: “For your security, O-IBS will never ask you to send your password or banking login details by email.” No phone, address, VAT number, social links or Information Officer details.

## Eight drafts

Synthetic preview names and messages are not real applicants. Long canonical reference fixtures remain solely for security tests and are not displayed in customer drafts. Invitation/welcome placeholders are non-functional. The subjects of the two internal drafts reuse the existing validated synthetic business suffix; new recipient-facing subjects are fixed.

### application-received

Subject: **O-IBS Early Access — Application received**

[HTML preview](http://127.0.0.1:4185/application-received.html) · [Plain text](http://127.0.0.1:4185/application-received.txt)

O-IBS Early Access — Application received

Hello Demo Owner — SYNTHETIC,

Thank you for applying for O-IBS Early Access. We have received your application for review.

Receipt is not acceptance. O-IBS will review your business needs, and approved applicants will be contacted separately.

No O-IBS account or subscription has been created, and no payment has been taken. Applying does not guarantee acceptance.

Questions? Contact us at support@o-ibs.co.za.

### invitation

Subject: **You’re invited to O-IBS Early Access**

[HTML preview](http://127.0.0.1:4185/invitation.html) · [Plain text](http://127.0.0.1:4185/invitation.txt)

You’re invited to O-IBS Early Access

Hello Demo Owner — SYNTHETIC,

Your application has been approved, and your business is invited to controlled O-IBS Early Access.

Account setup will take place through the authorised invitation process. This email does not itself create an account, subscription or payment.

Follow only the authorised invitation supplied by O-IBS. Never forward an invitation link or share your password.

Questions? Contact us at support@o-ibs.co.za.

[AUTHORISED INVITATION LINK — NOT CONFIGURED; NON-FUNCTIONAL PREVIEW]

### waitlist

Subject: **O-IBS Early Access — Application update**

[HTML preview](http://127.0.0.1:4185/waitlist.html) · [Plain text](http://127.0.0.1:4185/waitlist.txt)

O-IBS Early Access — Application update

Hello Demo Owner — SYNTHETIC,

Thank you for your interest in O-IBS. We are welcoming businesses in carefully reviewed groups.

We are not able to invite your business at this time, and we cannot promise a future invitation. No account or subscription has been created and no payment has been taken.

Questions? Contact us at support@o-ibs.co.za.

### declined

Subject: **O-IBS Early Access — Application outcome**

[HTML preview](http://127.0.0.1:4185/declined.html) · [Plain text](http://127.0.0.1:4185/declined.txt)

O-IBS Early Access — Application outcome

Hello Demo Owner — SYNTHETIC,

Thank you for applying for O-IBS Early Access. After review, we are not proceeding with your application for the current programme.

No account or subscription has been created, and no payment has been taken.

Questions? Contact us at support@o-ibs.co.za.

### welcome

Subject: **Welcome to O-IBS**

[HTML preview](http://127.0.0.1:4185/welcome.html) · [Plain text](http://127.0.0.1:4185/welcome.txt)

Welcome to O-IBS

Hello Demo Owner — SYNTHETIC,

Welcome to O-IBS. Your account has been set up through our invitation process.

Follow the agreed setup guidance for your company. Review opening information, settings, accounting records and tax treatment with the person responsible for your accounts before relying on them.

Use only the authorised sign-in address supplied by O-IBS. Important changes to financial or stock records require review and confirmation.

Questions? Contact us at support@o-ibs.co.za.

[AUTHORISED SIGN-IN URL — NOT CONFIGURED; NON-FUNCTIONAL PREVIEW]

### contact-received

Subject: **O-IBS — We received your message**

[HTML preview](http://127.0.0.1:4185/contact-received.html) · [Plain text](http://127.0.0.1:4185/contact-received.txt)

O-IBS — We received your message

Hello Demo Owner — SYNTHETIC,

Thank you for contacting O-IBS. We have received your message.

Category / topic: Support direction

Our team will review your message.

Questions? Contact us at support@o-ibs.co.za.

### internal-contact

Subject: **New O-IBS Contact Enquiry — Demo Company — SYNTHETIC**

[HTML preview](http://127.0.0.1:4185/internal-contact.html) · [Plain text](http://127.0.0.1:4185/internal-contact.txt)

New O-IBS Contact Enquiry

Name: Demo Owner — SYNTHETIC
Business: Demo Company — SYNTHETIC
Email: owner@example.invalid
Category / topic: Support direction
Message: Synthetic preview only. No real enquiry or applicant.
Privacy notice version: 2026-10-07

Review manually. No account, company, subscription or financial record has been created.

### internal-early-access

Subject: **New O-IBS Early Access Application — Demo Company — SYNTHETIC**

[HTML preview](http://127.0.0.1:4185/internal-early-access.html) · [Plain text](http://127.0.0.1:4185/internal-early-access.txt)

New O-IBS Early Access Application

Name: Demo Owner — SYNTHETIC
Business: Demo Company — SYNTHETIC
Email: owner@example.invalid
Type of business: Synthetic service business
Approximate employees: 2–5
Plan of interest: Complete
Areas of interest: Stock/inventory
Message: Synthetic preview only. No real enquiry or applicant.
Privacy acknowledgment: Acknowledged
Privacy notice version: 2026-10-07

Review manually. No account, company, subscription or financial record has been created.

## Reply-To and envelope boundary

Existing internal notifications already use the backend-validated applicant email as Reply-To. New internal drafts reuse that logic unchanged, including header-injection rejection. MAIL_FROM and MAIL_TO are not changed. Applicant renderers return subject/HTML/plain text only; they cannot accept From, To, Reply-To or arbitrary subject fields. Future delivery must independently validate recipients and use the approved identity. No sender transport is introduced here.

## Security/privacy and operator workflow

See [EARLY_ACCESS_OPERATIONS.md](EARLY_ACCESS_OPERATIONS.md) for the detailed manual workflow, safeguards and gap analysis. Received → review → approved / waitlist / declined → authorised invitation → legitimate account setup → onboarding. Approval is a human decision; welcome follows confirmed account creation. Contact acknowledgment uses only the approved category, without message echo or a displayed internal receipt. Canonical receipts remain unchanged; length validation and synthetic stress fixtures are retained. No response time, acceptance, accounting migration, certification or future country support is promised.

Allowlisted/length-limited strings; HTML escaping; control-character/header-injection rejection; fixed subjects; safe exact-origin HTTPS URL validation; no secret/environment access; no raw headers/IP/hidden form metadata; no extra personal-data collection/store or unnecessary logging. No passwords/bank credentials/API keys/accounting databases requested. Public repository is documentation only; never store real applicant records or invitation links here. Existing production rate and duplicate behaviour stays intact. Duplicate acknowledgment spam is avoided by no automatic acknowledgment sender; tests prove duplicates still produce only one existing notification per form. Future automated activation needs a separately approved idempotency/recipient-abuse/retry design.

## QA

- 34 backend/template tests passed: 17 existing + 17 new. Includes escaping, Unicode, missing/oversized/invalid fields, malicious names/content, fixed subjects, safe Reply-To, secret exclusion, category and application fields, safe URL requirements and no duplicate extra mail.
- Eight templates: 32 rendering checks at 360/390/600/1440, eight CSS-stripped fallback checks, eight accessibility audits with zero violations, zero external requests; approximately 22 KB HTML across all eight drafts. Browser email-preview audits exclude web-only main-landmark requirements; actual inbox-client rendering is not certified.
- Production marketing build and lint passed. 16 routes/710 links/assets; SEO/schema, canonical/sitemap/robots, company identity, security policy/CSP hashes and privacy/secret-pattern checks passed. Existing headers/config unchanged.
- 138 entitlement checks passed; read-only registry audit, no application runtime/database access.
- Website: 112 existing + 48 Phase 4 responsive checks at the approved widths, 32 general + six mocked enabled-form accessibility audits, zero violations/errors. No mobile logo/menu overlap; menu, focus/keyboard, FAQ, reduced motion, form labels/errors and enlarged text passed.
- Existing mocked local form integration passed: success, provider failure, retry, preserved fields and disabled duplicate-submit button. No Resend/API delivery performed.
- All 17 FAQ disclosures operated by keyboard. No new public website JS, CSS, imagery, libraries or tracking; homepage payload audit passed. No field Core Web Vitals score claimed.
- Local email previews were visually inspected. Actual Outlook/Gmail/mobile-mail-client compatibility and a controlled delivered email remain for a later owner-approved acceptance step, not inferred from browser screenshots.

Evidence: [email rendering](../qa/phase5-email-rendering.json) and [regression totals](../qa/phase5-regression.json). Local gallery: http://127.0.0.1:4185/.

## Exact new files

- docs/EARLY_ACCESS_OPERATIONS.md
- forms-service/email.test.mjs
- forms-service/email/fixtures.mjs
- forms-service/email/layout.mjs
- forms-service/email/templates.mjs
- qa/phase5-email-rendering.json
- qa/phase5-regression.json
- scripts/email-preview-qa.mjs
- scripts/email-previews.mjs
- docs/PHASE5_REVIEW.md

Preview HTML/plain text in ignored .qa-tools/email-previews and images qa/phase5-*-{390,600}.png are local review artifacts. No existing tracked Phase 1–4 file is changed.

## Remaining application dependencies and owner decisions

1. Approve the content, design and manual operator workflow.
2. Decide whether acknowledgments are manual or later automated; automatic replies are deliberately not activated here.
3. Invitation/welcome depend on actual authorised app invitation URLs, recipient checks, expiry/revocation, account-created confirmation and approved sign-in URL. This phase creates none of them.
4. No fabricated decline reasons; any reason needs case-specific approval. No response-time commitment assumed.
5. Decide whether a compact approved logo image is wanted; current text branding avoids remote-image dependencies.
6. Before later activation, review actual email-client compatibility and approve any controlled delivery acceptance. Qualified legal/professional review, privacy/POPIA governance, Information Officer requirements and Production Security & Data Protection remain separate.

No public signup, account/company creation, subscriptions, billing/payments, production onboarding, marketing mailing-list subscription or real customer data. No DNS, Resend, email secrets, infrastructure, app/staging, accounting data, databases or R2 change. No Phase 6 started. STOP for product-owner review.
