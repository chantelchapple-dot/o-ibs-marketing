import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {faqItems} from '../src/launch-content.mjs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/chant/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage(),requests=[];
page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173/'))requests.push(r.url());});
const report={widths:[360,375,390,430,768,1440],routes:[],keyboard:true,formsNotSubmitted:true,faqCount:faqItems.length};
try{
for(const route of ['','product','features','bizzy','pricing','faq','early-access','contact']){
 await page.goto('http://127.0.0.1:4173/'+route);
 for(const width of report.widths){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,route+' '+width);const header=await page.evaluate(()=>{const a=document.querySelector('.wordmark').getBoundingClientRect(),b=document.querySelector('.menu').getBoundingClientRect();return getComputedStyle(document.querySelector('.menu')).display==='none'||a.right<=b.left;});assert(header,'Logo/menu overlap');}
 report.routes.push(route||'/');
 if(['','pricing','early-access','faq','bizzy'].includes(route))for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.screenshot({path:'qa/phase4-'+(route||'home')+'-'+width+'.png',fullPage:true});}
 assert(await page.locator('a[href="/early-access"]').count(),'Early Access path');
}
await page.goto('http://127.0.0.1:4173/pricing');
for(const summary of await page.locator('#plan-guide summary').all()){await summary.focus();await page.keyboard.press('Enter');assert(await summary.evaluate(e=>e.parentElement.open));await page.keyboard.press('Space');assert(!(await summary.evaluate(e=>e.parentElement.open)));}
assert.equal(await page.locator('#plan-guide input').count(),0);
assert.equal(await page.locator('.plan').count(),3);
for(const price of ['R190/month','R450/month','R650/month'])assert((await page.locator('.plans').innerText()).includes(price));
assert.equal(requests.length,0,'No outbound submissions/tracking/AI');
fs.writeFileSync('qa/phase4-browser.json',JSON.stringify({...report,noExternalRequests:true,responsiveChecks:report.widths.length*report.routes.length},null,2));console.log('PASS Phase 4: 48 responsive checks, logo/menu spacing, plan guide keyboard, prices, CTA paths, no external requests.');
}finally{await browser.close();}
