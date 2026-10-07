# O-IBS Early Access communication operations — Phase 5 draft

Prepared for product-owner review. This document is in the PUBLIC marketing repository: it is guidance, not an applicant register. Never put applicant names, email addresses, decisions, tokens or case notes in Git, GitHub issues, committed fixtures or public preview files.

## Gap analysis

| Area | Existing and already satisfied | New Phase 5 preparation |
| --- | --- | --- |
| Contact | Approved category/fields, distinct subject, safe validated Reply-To, escaped HTML and plain text | Separate Contact receipt template; proposed branded wrapper for the current internal notification |
| Early Access | Approved application fields, distinct subject, privacy acknowledgment, manual-review/no-account footer | Received, invitation, waitlist, declined and future welcome templates; proposed branded internal wrapper |
| Delivery | Existing server-side Resend integration to configured support mailbox; no browser credentials | No new sender, service, environment variable, credentials or transport |
| Replies | Internal notifications already use validated applicant email as Reply-To | Reused unchanged; acknowledgements have no caller-controlled Reply-To |
| Abuse controls | Strict fields/lengths, CORS, rate limits, honeypot/timed token, bounded HMAC metadata and Resend idempotency | Renderer validates allowed fields and URLs; no automatic outgoing applicant mail |
| Support | Email support@o-ibs.co.za; approved Contact form | Operator triage and manual acknowledgment guidance |
| Templates | Current internal notices include all approved labels; no applicant automatic reply | Reusable navy/gold HTML, plain text and footer; eight synthetic previews |
| Tests | Approved backend and marketing QA | Template security tests, duplicate/no-auto-ack integration test and email rendering QA |

## Current runtime boundary

Phase 5 templates are NOT imported by server.mjs. Public form behaviour and the Phase 2 provider payload remain unchanged. A successful submission still only acknowledges provider acceptance for the existing internal notification; it is not an applicant approval and does not prove inbox delivery. No automatic applicant acknowledgment is enabled, including Contact.

The new internal previews reuse notification() and validateSubmission() rather than duplicating the category/field map. Their branded wrapper is a proposal only; existing production notification subject/body is preserved until explicitly approved for integration.

## Manual state workflow

1. APPLICATION RECEIVED: check the actual support inbox notification. Confirm the form type, fields and reply address. The `application-received` template confirms receipt only. Canonical receipts remain unchanged. Customer drafts omit them because there is no established short customer-facing reference; no new identifier or persistence is introduced.
2. UNDER REVIEW: product owner reviews business fit, required plan/tools, controlled-beta capacity and separate readiness gates. Do not promise timing, acceptance, migration, tax advice or general availability.
3. APPROVED, WAITLIST or DECLINED: only an authorised human makes the decision. `waitlist` says not onboarding now and does not promise future acceptance. `declined` defaults to no reason; an operator may add a concise, reviewed, appropriate reason. Do not disclose internal assessments or invent reasons.
4. APPROVED — INVITATION PENDING: approval alone does not create an account. Do not send the invitation draft as though a working link exists. The actual application must supply an authorised secure invitation, recipient and lifecycle after that app work is approved. Verify the business and recipient before sending `invitation`.
5. INVITATION SENT: record the communication privately and allow account setup only through the authorised application process. Never make up a URL/token or use public registration as a workaround.
6. ACCOUNT CREATED / ONBOARDING: only after independent confirmation that the legitimate account exists may `welcome` be used. Supply the approved application sign-in URL. Review company setup/opening information with the person responsible for the accounts; controlled historical-data migration remains behind its separate launch gate.

Contact states: RECEIVED → category triage → assigned for handling → manually answered → closed. `contact-received` uses the exact approved category and no displayed internal reference and no message echo and no response-time promise. It is not a mailing-list signup.

## Sending and duplicate safeguards

There is no Phase 5 send CLI, recipient list, queue, database or automatic state machine. Local previews cannot send email. They are not proof of receipt, approval or account creation.

Until a separate activation is approved, continue the existing support-mailbox workflow. Prepared acknowledgments/status drafts may only be sent after owner approval, with recipient verification. Use the existing controlled O-IBS identity; never change MAIL_FROM to an applicant address. Existing internal Reply-To is already supported and validated by the production provider path.

Before a manual message, check the private email conversation for the state already sent. Send once per reviewed state; a duplicate form receipt is not a new application. Human operators should coordinate in the existing mailbox/conversation. Do not store a new applicant register in the public repo.

Future automated acknowledgments require a separate design/activation approval: tie each message to a verified submission receipt and communication state, fixed sender, validated recipient and stable provider idempotency key/body; define retry/failure handling and abuse limits. Do not infer recipient possession from a public form: sending to attacker-supplied addresses can create email-bombing/reflection risk. Preserve the internal notification's success/failure semantics and never falsely claim acknowledgment delivery. Current rate counters are process-local; Resend notification idempotency spans provider retries within its window. Template changes alter the body-derived notification digest, so a rollout of the proposed internal wrapper needs a retry/duplicate plan, not a blind replacement.

## Security and privacy

- Never email passwords, bank credentials, API keys or complete accounting databases.
- Never invent invitation URLs/tokens. Treat authorised invitation links as confidential; do not paste them into Codex, fixtures, screenshots, Git or public logs.
- Verify recipient/business and decision before communicating sensitive operational details. Do not send a welcome before account creation or an invitation before the authorised invitation exists.
- Use only the existing authorised sender. No arbitrary From/To/subject override is accepted by new renderers. Operator delivery/envelope control is separate from the pure rendering function.
- HTML values are escaped. Recipient/user fields use existing backend validation; line fields reject control characters. No raw headers, IPs, tokens, honeypot contents or secrets are included.
- Contact acknowledgment does not echo the message or business data. Applicant templates use optional name and, no message echo or displayed canonical receipt.
- Do not subscribe applicants to marketing. These messages are operational; newsletters need a separate lawful consent/unsubscribe model.
- No new personal information, retention store, tracking pixel, external font, JS, attachment or analytics is added. Use existing confidential mailbox handling; qualified legal review must establish the final retention/deletion and communication basis. Do not claim POPIA compliance or certification.

## URLs and preview policy

`renderCommunication(state, fields, {approvedAppOrigin})` is a server-side pure renderer, not a public API. Only an authorised operator/application integration may supply future URLs and the independently approved application origin. Link origins must match exactly, use HTTPS and an O-IBS public hostname, and must have no embedded credentials, non-default port, hash, whitespace or staging hostname. These syntax checks do not create, approve or validate a real invitation token; that remains the application's responsibility. Do not treat a syntactically valid link as owner approval or guarantee that an application route exists.

With no supplied URL, invitation/welcome show a visible NON-FUNCTIONAL PREVIEW placeholder and no action button/link. Only the verified public website/support links are active. Fixtures use `.invalid` email addresses and clearly synthetic names; the reference hex values are synthetic security fixtures, not actual submission receipts, and are omitted from customer previews. Never replace them with customer data.

## Local review commands

From the marketing project directory:

```
node scripts/email-previews.mjs
node scripts/email-previews.mjs --serve
node --test forms-service/*.test.mjs
node scripts/email-preview-qa.mjs
```

The preview server binds only 127.0.0.1:4185. HTML and plain-text outputs go to ignored `.qa-tools/email-previews/`. Review all eight templates at http://127.0.0.1:4185/. No credentials, network provider or delivery action is required. Tests use a mocked provider only.

Email HTML uses tables, inline styles, legacy background/text colours and a system font. O-IBS is rendered as a readable text wordmark: the existing large banner logo is not added as a remote image, which avoids image blocking/load privacy concerns and unnecessary payload. Plain text remains complete if HTML is unavailable.

## Product-owner decisions / separate dependencies

- Approve wording, visual design and manual triage workflow before any commit, deployment or operational use.
- Decide whether acknowledgments should remain manual or later be automatic. Automatic delivery is deliberately NOT implemented/activated in this draft.
- Approve any decline reason case by case; no standard reasons or response-time promise is inferred.
- The application must provide authorised invitations, recipient checks, expiry/revocation and confirmed account-created events/sign-in URL. None is built in the marketing repo.
- Product owner must confirm controlled Early Access capacity and launch readiness; app Phase 10, production security/data protection, qualified legal review, POPIA governance and Information Officer work remain separate.
- Before later release, obtain compatibility evidence from actual Outlook/Gmail/other clients and, if approved, one controlled delivery test. Browser rendering is not proof of inbox rendering or delivery.

No Phase 1–4 journey/features were rebuilt. No public signup, billing, accounts, subscriptions, app/staging integration, new secrets or infrastructure are introduced.
