import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
// Read only the pure feature registry and source text. Never initialise application services.
const app=process.env.OIBS_APPLICATION_SOURCE||'C:/Users/chant/Desktop/Business-in-Your-Pocket';
const registry=app+'/server/feature-registry.js';
const {plans,actionFeatures}=await import(pathToFileURL(registry));
const groups={BASIC:['customers','quotes','quote_acceptance','quote_conversion','invoices','customer_payments','customer_balances','expenses','expense_categories','basic_reports','bizzy_basic','requisitions'],BUSINESS:['statements','credit_notes','refunds','suppliers','accounts_payable','assets','depreciation','banking','bank_reconciliation','bank_rules','smart_matching','chart_of_accounts','general_ledger','manual_journals','trial_balance','profit_loss','balance_sheet','vat_reports','period_locks','accounting_integrity','advanced_reports','bizzy_bookkeeping'],COMPLETE:['inventory','stock_control','stock_ledger','stock_reservations','stock_availability','stock_valuation','reorder_planning','purchase_orders','goods_received','inventory_accounting','inventory_reports','bizzy_inventory']};
const tier=['BASIC','BUSINESS','COMPLETE'];
for(const [minimum,features] of Object.entries(groups))for(const feature of features)for(const plan of tier)assert.equal(plans[plan].features.includes(feature),tier.indexOf(plan)>=tier.indexOf(minimum),`${feature}: ${plan}`);
assert.equal(actionFeatures['customer-return'],'inventory');assert.equal(actionFeatures['customer-refund'],'refunds');assert.equal(actionFeatures['supplier-invoice'],'accounts_payable');assert.equal(actionFeatures['supplier-payment'],'accounts_payable');
const capture=fs.readFileSync(app+'/server/capture-http.js','utf8');assert(capture.includes("b.kind==='expense'?'expenses':'accounts_payable'"));assert(capture.includes("['image/jpeg','image/png','application/pdf']"));
const review=fs.readFileSync(app+'/server/document-capture.js','utf8');assert(review.includes('b.reviewed===true'));assert(review.includes('vatEvidenceConfirmed'));assert(review.includes('propose(s,r.kind,body)'));
const faq=fs.readFileSync('src/launch-content.mjs','utf8');for(const copy of ['take payment','financial or stock records','VAT is not automatically claimable','Real historical accounting-data migration is not generally available','Expense receipt capture is available from Basic; supplier-invoice capture requires Business or Complete'])assert(faq.includes(copy),copy);
const early=fs.readFileSync('src/early-access-page.mjs','utf8');assert(early.includes('does not take payment, create an account or subscription, or guarantee acceptance'));
fs.writeFileSync('qa/phase3-entitlements.json',JSON.stringify({readOnlyApplicationAudit:true,registrySHA256:crypto.createHash('sha256').update(fs.readFileSync(registry)).digest('hex'),advertisedFeatureGroups:groups,planChecks:Object.values(groups).flat().length*3,capturePermissionsAndReviewVerified:true,unresolvedAdvertisedEntitlements:[],liveFeatureConfigurationVerified:false},null,2));
console.log('PASS: '+Object.values(groups).flat().length*3+' central registry plan checks; receipt/supplier capture permissions, formats, review and VAT safeguards; marketing boundaries. No application runtime/database accessed.');
