import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {gzipSync} from 'node:zlib';
import {faqItems} from '../src/launch-content.mjs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/chant/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try{
 const page=await browser.newPage(),external=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173/'))external.push(r.url());});
 await page.goto('http://127.0.0.1:4173/faq');
 assert.equal(await page.locator('.faq-list details').count(),faqItems.length);
 for(const summary of await page.locator('.faq-list summary').all()){await summary.focus();await page.keyboard.press('Enter');assert(await summary.evaluate(el=>el.parentElement.open));await page.keyboard.press('Space');assert(!(await summary.evaluate(el=>el.parentElement.open)));}
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.screenshot({path:`qa/phase3-faq-${width}.png`,fullPage:true});}
 await page.goto('http://127.0.0.1:4173/');await page.locator('#how-it-works').scrollIntoViewIfNeeded();await page.setViewportSize({width:1440,height:1000});await page.locator('#how-it-works').screenshot({path:'qa/phase3-workflows-1440.png'});
 await page.goto('http://127.0.0.1:4173/features');for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.screenshot({path:`qa/phase3-features-${width}.png`,fullPage:true});}
 await page.goto('http://127.0.0.1:4173/');const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:new URL(r.name).pathname,bytes:r.decodedBodySize})));const payload=resources.reduce((n,r)=>n+r.bytes,0);const html=fs.readFileSync('dist/index.html');
 const scripts=fs.readdirSync('dist/assets').filter(f=>/\.(js|mjs)$/.test(f)).map(file=>({file,bytes:fs.statSync('dist/assets/'+file).size}));
 assert.equal(external.length,0,'Local preview must not contact forms, AI, fonts or tracking providers');
 assert(html.includes('width="1600" height="800"'),'Logo has explicit dimensions');
 const report={faqKeyboardDisclosures:faqItems.length,noExternalRequests:true,homepageHTMLBytes:html.length,homepageHTMLGzipBytes:gzipSync(html).length,homepageResourceBytes:payload,resources,scripts,fonts:'System font stack; no remote fonts',coreWebVitals:'Lab payload/risk audit only; no field CWV certification',changes:'Reuse existing CSS disclosure cards; no additional browser JavaScript or image assets'};
 fs.writeFileSync('qa/phase3-performance.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
