import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {communicationStates,renderCommunication} from '../forms-service/email/templates.mjs';
import {emailFixtures} from '../forms-service/email/fixtures.mjs';
import {createPreviewServer} from './serve.mjs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/chant/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const axe=fs.readFileSync('.qa-tools/node_modules/axe-core/axe.min.js','utf8');
const server=createPreviewServer(path.resolve(fileURLToPath(new URL('../.qa-tools/email-previews/',import.meta.url))));
server.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage(),external=[],errors=[];page.on('request',r=>{if(!r.url().startsWith(origin))external.push(r.url());});page.on('pageerror',e=>errors.push(e.message));
const report={syntheticOnly:true,templates:8,renderChecks:0,noCssChecks:0,accessibilityAudits:0,violations:[],realEmailSent:false};
try{
 for(const state of communicationStates){
  const email=renderCommunication(state,emailFixtures[state]);assert(email.html.length<50000);assert(email.text.length<15000);
  const response=await page.goto(origin+'/'+state+'.html');assert.equal(response.status(),200);
  for(const width of [360,390,600,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,state+' overflow '+width);report.renderChecks++;if([390,600].includes(width))await page.screenshot({path:'qa/phase5-'+state+'-'+width+'.png',fullPage:true});}
  await page.evaluate(axe);const result=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']},rules:{region:{enabled:false},'landmark-one-main':{enabled:false}}}));assert.equal(result.violations.length,0,JSON.stringify(result.violations.map(v=>v.id)));report.accessibilityAudits++;
  await page.setViewportSize({width:390,height:1000});await page.evaluate(()=>{document.querySelectorAll('[style]').forEach(e=>e.removeAttribute('style'));});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390,state+' fallback overflow');assert((await page.locator('body').innerText()).includes('support@o-ibs.co.za'));assert.equal(await page.evaluate(()=>getComputedStyle(document.body).color),'rgb(247, 245, 239)');report.noCssChecks++;
 }
 assert.equal(external.length,0);assert.equal(errors.length,0);report.noExternalRequests=true;report.totalHTMLBytes=communicationStates.reduce((n,s)=>n+renderCommunication(s,emailFixtures[s]).html.length,0);report.scope='Browser and CSS-stripped fallback checks; not actual Outlook/Gmail inbox certification.';
 fs.writeFileSync('qa/phase5-email-rendering.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
