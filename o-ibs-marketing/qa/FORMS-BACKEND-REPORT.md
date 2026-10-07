# Website Phase 2 — isolated marketing backend preparation

7 October 2026. **Prepared locally; not committed, pushed or deployed. No Render/DNS/domain changes.**

## Completed

Implemented a dependency-free Node 24 service for Early Access and Contact, isolated in `forms-service/`. It imports only marketing validators, uses only bounded short-lived keyed metadata in memory and server-configured Resend credentials. It has no application database/client, account/company provisioning, financial/ledger/subscription/payment integration or application-secret access.

Server validation includes strict payload types/field allowlists/lengths, no attachments/phone, bounded JSON bodies, valid choices and Early Access acknowledgment. Notifications escape untrusted HTML and reject header controls; the recipient/provider are fixed by server configuration. Malformed requests, foreign origins, unsupported methods/encodings/media types and unknown routes fail safely.

Signed timing tokens, a honeypot and process-local rate counters provide basic abuse controls without a CAPTCHA. Memory cache/in-flight guards suppress local duplicates. Deterministic email bodies and stable HMAC keys let Resend suppress identical emails across restarts and instances for 24 hours. Rate counters reset on restart and are independent per process; one instance is recommended. Provider errors/timeouts do not succeed. No personal payload or provider error detail is logged.

Both frontends use a shared safe delivery controller when the public backend URL/flag are configured. They retain details on error and require an accepted receipt. Default export remains disabled. Privacy/POPIA wording explains the prepared conditional mechanism, email processing and remaining provider/retention/governance review; no speculative live-service claim was made. Design, pricing, company identity and entitlements remain approved.

## Local validation

- Seven Node test groups pass: malformed/type/length/choice/acknowledgment/token/method/CORS/attachment/header cases, HTML escaping, fixed mail routing, provider acknowledgment/errors/timeouts, concurrent duplicates, lost-acknowledgment retry across fresh/independent instances, memory reset/expiry/capacity, rate limits/spoofed forwarded headers, isolated Contact and fail-closed configuration.
- Configured browser QA passes against the actual local service with a mock Resend transport: application success, no automatic account/subscription, duplicate-button disabling, enquiry failure retaining fields, safe retry success; six responsive/axe audits at 1440/390/360, no violations or overflow. No real email sent.
- Standard production build, ESLint, static links/assets, SEO/schema/trust and public-output scans pass. Normal website suite: 105 responsive checks and 30 axe audits, no overflow/violations, no browser errors, broken assets or unexpected external requests. Exact evidence: `forms-browser.json`, `phase2-static.json`, `phase2-seo-trust.json`, `phase2-browser.json`.
- Tests do not establish real sender verification, mailbox delivery, live provider quotas/settings, deployed CORS/TLS or operational retention. Those remain required before activation.

## Setup and pending owner steps

[Exact Render/Resend setup guide](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/FORMS-SERVICE-SETUP.md) supplies the new service/repository/root/build/start/no-disk/health/runtime settings, variable names only, Resend verification/recipient/key steps, frontend pointing and live QA plan.

No real secret was read, copied, invented or requested in chat. No Resend configuration/mailbox verification is assumed complete. The future dedicated Render Web Service without a disk and narrowly scoped key need owner setup/approval; activation still requires deployment and actual email verification.

**OWNER ACTION REQUIRED — Information Officer / POPIA governance** remains. Professional South African review of Privacy/Terms/POPIA/PAIA, collection purpose/provider roles/transfers/retention and incident/request/beta terms remains. Official social profiles are still unestablished; no fake links added.

## Test-only previews

These demonstrate the configured local service with synthetic data and a mocked email provider, not a live deployment or real mailbox delivery:

- [Application receipt desktop](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/forms-test-application-success-1440.png)
- [Enquiry failure desktop](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/forms-test-contact-failure-1440.png)
- [Enquiry retry success mobile](C:/Users/chant/Documents/ChatGPT/Website/o-ibs-marketing/qa/forms-test-contact-success-390.png)

Final normal-export previews retain the current disabled state until configuration. Company/root/www/staging domains, the existing Static Site and the application/staging service are untouched.

## Files / approval state

New service: server, validation/email formatter, metadata store and two test files. New frontend shared delivery controller, enabled/disabled rendering/configuration/CSP integration, browser integration QA, blank configuration examples, policy wording and setup/report evidence. Exact combined Phase 2 file inventory is `phase2-files.json`; all non-ignored changed files remain in the marketing project.

The working tree is intentionally uncommitted. **No commit, push, deploy or infrastructure creation. STOP FOR OWNER APPROVAL.**
