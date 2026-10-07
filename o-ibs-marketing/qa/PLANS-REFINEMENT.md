# O-IBS plan-copy refinement — 7 October 2026

Marketing copy only; approved colours, typography, three cards, layout and responsive rules unchanged. No application code, entitlement, database, environment, Render, DNS or staging changes. No commit, push or deployment.

- Basic: Run the essentials — practical customer, quote, invoice, payment, expense, report and Bizzy tasks.
- Business: Know where your money stands — customer/supplier amounts owed, statements, credit notes, assets explained as what the business owns, bank matching, detailed reports and Bizzy assistance.
- Complete: Run your whole operation — products, quantities, orders, arriving stock, availability/reservations/reordering, stock value, reports and stock questions.
- Prices remain “Early-access pricing coming soon”; details remain provisional. No price or limit added.
- Returns are included under Complete, rather than Business: the reviewed application source maps customer-return/stock-return to the inventory feature. Entitlements were not changed.
- The South African section explains South African rand (ZAR) and value-added tax (VAT). The adjacent card now says “Bizzy helps. You stay in control.” and explicitly describes approval before important changes.
- Added plain-English meanings for assets, liabilities and profit; clarified Cost of Sales / COGS. Existing accessible explanations retain formal terms second.

Source changes: `scripts/build.mjs`, `src/plain-language.mjs`. Regenerated affected static HTML and current QA evidence. Existing prior work remains uncommitted.

Checks: build and ESLint pass; 13 routes and 524 links/assets pass; 91 responsive checks at 1920, 1440, 1024, 768, 430, 390 and 360 have no horizontal overflow; 26 automated accessibility audits have zero violations. Menu keyboard, explanation keyboard/tap, Bizzy interactions, contact unavailable/validation, reduced motion, 200% text and mobile comparison checks pass. No browser errors, failed requests or unexpected external requests. Automated audits do not replace manual assistive-technology user testing.

Previews: `plans-refined-1440.png`, `plans-refined-390.png` (Plans page); `plans-home-refined-1440.png`, `plans-home-refined-390.png` (homepage plans plus South African/Bizzy section). Preview images are local and Git-ignored.

Stopped for approval. Commercial/legal/contact/onboarding requirements from the previous review remain outstanding. Earlier Lighthouse measurements belong to the previous content snapshot; no new performance measurement was needed for this copy-only pass.
