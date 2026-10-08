import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/chant/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const build=env=>execFileSync(process.execPath,['scripts/build.mjs','--production'],{env:{...process.env,...env},stdio:'pipe'});
// These paths are synthetic configuration fixtures, not claims of available app routes.
try{
 build({PUBLIC_LOGIN_READY:'true',PUBLIC_LOGIN_URL:'https://app.o-ibs.co.za/test-login',PUBLIC_SIGNUP_READY:'true',PUBLIC_SIGNUP_URL:'https://app.o-ibs.co.za/test-register'});
 const html=fs.readFileSync('dist/pricing/index.html','utf8');
 for(const plan of ['BASIC','BUSINESS','COMPLETE'])assert(html.includes('href="https://app.o-ibs.co.za/test-register?plan='+plan+'" aria-label="Get Started with '+plan+'"'));
 assert(html.includes('href="https://app.o-ibs.co.za/test-login">Log In</a>'));
}finally{build({PUBLIC_LOGIN_READY:'false',PUBLIC_SIGNUP_READY:'false'});}
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage();
try{
 for(const width of [360,375,390,430,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4173/pricing');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
  const mobile=await page.locator('.menu').isVisible();if(mobile)await page.locator('.menu').click();
  const scope=page.locator(mobile?'#navigation':'.nav-actions');
  assert(await scope.getByRole('link',{name:'Log In — coming soon'}).isVisible());
  assert.equal(await scope.getByRole('link',{name:'Log In — coming soon'}).getAttribute('aria-disabled'),'true');
  assert.equal(await scope.getByRole('link',{name:'Log In — coming soon'}).getAttribute('href'),null);
  const action=scope.getByRole('link',{name:'Get Started',exact:true});assert(await action.isVisible());assert.equal(await action.getAttribute('href'),'/early-access');
  await action.click();assert.equal(new URL(page.url()).pathname,'/early-access');
  await page.goto('http://127.0.0.1:4173/pricing');
  for(const plan of ['BASIC','BUSINESS','COMPLETE'])assert.equal(await page.getByRole('link',{name:'Get Started with '+plan,exact:true}).getAttribute('href'),'/early-access');
 }
 console.log('PASS: launch-disabled navigation/pricing at six widths; separately gated production URLs and three allowlisted plan parameters. No public submissions.');
}finally{await browser.close();}
