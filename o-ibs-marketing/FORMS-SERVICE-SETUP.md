# O-IBS marketing forms — disk-free Render / Resend setup

Prepared locally on 7 October 2026. Recommendation **A — Render Web Service without persistent disk**. This supersedes the earlier disk-based proposal. Nothing has been committed, pushed, deployed or configured in Render/DNS. The existing Static Site and accounting/staging application are untouched.

## Why no disk

These forms forward validated submissions to Resend for internal email review. They need neither a local inbox nor an offline queue. Success requires Resend's explicit accepted email ID; errors/timeouts return failure and the browser retains the fields. Provider acceptance is not a guarantee of inbox delivery: monitor Resend delivery/bounce status and the receiving mailbox before activation.

The earlier SQLite disk contained keyed hashes, status, timestamps and rate counters, not submissions. Its only benefit was preserving local counters/cache across restart. That benefit does not justify a disk and its deployment constraints for these modest marketing forms. No database, Redis or disk is required. Email itself necessarily contains the personal details; confirm Resend/mailbox retention and access arrangements before enabling collection. No offline retry/background sending is promised.

## Exact Render configuration

Create only after separate deployment approval: **New → Web Service → Git Provider**.

| Setting | Value |
|---|---|
| Name | `o-ibs-marketing-forms` |
| Repository | `chantelchapple-dot/o-ibs-marketing` |
| Branch | `master` (code must first be approved and published) |
| Root Directory | `o-ibs-marketing` |
| Runtime / Language | Node |
| Compute plan | `0.5c-512mb` (formerly Starter; 0.5 CPU / 512 MB) |
| Instance count | 1; do not enable autoscaling |
| Build Command | `node --test forms-service/*.test.mjs` |
| Start Command | `node forms-service/server.mjs` |
| Health Check Path | `/healthz` |
| Auto-Deploy | Off initially |
| Persistent Disk | None — do not add one |
| Address | Render-assigned HTTPS `onrender.com` URL; no custom domain |

The smallest paid web-service compute plan is recommended for predictable availability without free-service cold starts; approve its displayed price before creation. A free instance would save service cost but can sleep and take about a minute to wake, exceeding the browser timeout. The user would receive a truthful failure and need to retry. No infrastructure has been purchased. [Render compute plans](https://render.com/docs/compute-plans), [Render pricing](https://render.com/pricing), [free-service limitations](https://render.com/docs/free).

## Environment-variable names

On the **new forms service only**:

- `RESEND_API_KEY`
- `MAIL_FROM`
- `MAIL_TO`
- `FORMS_HMAC_SECRET`
- `FORMS_ALLOWED_ORIGIN`
- `NODE_VERSION`

Render supplies `PORT`; do not add `FORMS_DATA_DIR`. Node major 24 is tested. The allowed origin must be the canonical marketing origin, not staging. Sender/recipient must be confirmed plain O-IBS domain email addresses; `support@o-ibs.co.za` is approved publicly but mailbox operation is not assumed. Generate a new high-entropy HMAC secret of at least 32 characters directly through secure owner-controlled tooling. Keep it stable across restarts, deployments and any instances. Rotation changes duplicate keys and invalidates timing tokens; coordinate it outside an outstanding retry window. Never paste secrets into Codex. Do not copy application credentials or add database/storage/AI environment variables.

## Rate limiting and duplicate protection

- Validation, a blank honeypot, signed timing tokens (three-second minimum, thirty-minute expiry), bounded request size, strict field allowlists and no attachments remain enforced. CORS is origin restriction, not proof that a visitor is human; sophisticated bots can imitate a browser.
- Each process applies fixed-window limits: 120 allowed-origin requests/minute, five email attempts per normalized email/hour, twenty email attempts/minute and two hundred/day. Email identities are keyed hashes. Forwarded IP headers are ignored; no IP is stored. Memory maps are capped at 4,096 entries each and fail closed at capacity. Expired metadata is removed each minute and before valid-origin requests. Cached duplicate status expires after 23 hours; rate counters expire within at most 24 hours. Form bodies exist only transiently while processing and are never written to disk or logged.
- **Rate counters reset on restart and are independent per instance.** The daily limit is a process abuse control, not a durable daily spending guarantee. Keep one instance and no autoscaling. If sustained abuse or a strict shared quota later requires durable shared counters, review a small managed rate-limit store or bot challenge separately. A local disk would still not coordinate multiple instances. Review the marketing key/provider quota and delivery monitoring before activation; provider throttling also returns failure.
- The server HMACs the exact deterministic email body into a provider idempotency key. No changing server timestamp is included in that body. Exact identical notifications use the same body/key even after a restart, on a different instance or when a visitor gets a new submission UUID. The stable secret and sender/recipient must match. Changed content or configuration produces a different notification/key.
- Resend retains idempotency keys for **24 hours**, returning the original accepted response for a repeated identical request rather than sending again. This covers a crash/lost response after Resend accepted an email: retry reconstructs the identical body and key without local persistence. Local cache/in-flight guards avoid repeated calls within one process; Resend is the shared duplicate authority across processes. Concurrent provider conflicts return failure and can be retried; they are never reported as success. [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
- Identical content can legitimately send again after the provider window expires. This is bounded duplicate protection, not indefinite exactly-once delivery. Editing fields means a new submission; a timed-out original may already have been accepted. Retry unchanged fields first. There is no offline queue: if Resend is unavailable, the browser reports failure and offers retry/email fallback rather than claiming receipt.
- Successful receipt requires a positive provider acknowledgment (or a cached earlier acknowledgment). No applicant account, company, subscription, ledger or financial record is created. No application database is accessed.

## Resend preparation

Confirm `o-ibs.co.za` is already verified for sending and the intended sender is covered. Confirm the receiving support mailbox works and is monitored; domain sending verification does not create a mailbox. Create a **new marketing-only sending key**, restricted to the verified domain, and enter it directly in the new service's secret UI. Do not reuse application keys. Keep internal notification tracking disabled; review processing/retention/TLS without changing shared settings that affect application mail. No Resend account settings or DNS were changed here. If sender verification needs DNS records, obtain separate approval for the exact Resend-supplied records; preserve existing routing and receiving MX records.

[Resend domains](https://resend.com/docs/dashboard/domains/introduction), [restricted API keys](https://resend.com/docs/dashboard/api-keys/introduction).

## Frontend activation later

Frontend configuration names only:

- `PUBLIC_FORMS_API_URL`
- `PUBLIC_FORMS_ENABLED`

After backend verification, use the new HTTPS service origin (no path/query/credentials) and enable the forms in a separately approved marketing build. The build adds that exact origin to CSP and sends no cookies/application sessions. No email credential belongs in these public settings. The current normal export keeps sending disabled. Existing Static Site settings/domains are unchanged. A future push to master may trigger its existing deployment, so coordinate publication and activation approval.

## QA after configuration

Local credential-free tests cover strict validation/methods/CORS, injection, oversized/malformed requests, attachments, signed-token timing, safe provider errors and real timeout, memory caps/expiry/reset, spoofed headers, concurrent submits, and lost-acknowledgment retries across fresh and independent service instances with a simulated provider idempotency ledger. Configured browser tests cover both forms, failure retaining input and safe retry, keyboard/accessibility/responsive widths. No real email is sent locally.

Before activation: verify actual service HTTPS/health/CORS; confirmed sender and recipient; synthetic real emails accepted/delivered/inbox and reply-to; provider conflict/throttling/timeout and unchanged retry after restart; retained fields and honest receipt wording; access/retention/bounce monitoring; public-output secret scan, CSP, links/assets and desktop/mobile layouts. Confirm staging/application remain untouched. Resend's real retention and delivery behavior cannot be established by mocks alone. Owner Information Officer/POPIA and legal/processing review remain required.

**Prepared only. Stop for approval; no commit, push, deployment, DNS or infrastructure creation.**
