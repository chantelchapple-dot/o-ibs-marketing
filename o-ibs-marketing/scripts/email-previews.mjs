import fs from 'node:fs';
import path from 'node:path';
import {renderCommunication,communicationStates} from '../forms-service/email/templates.mjs';
import {emailFixtures} from '../forms-service/email/fixtures.mjs';
import {escapeHtml} from '../forms-service/email/layout.mjs';
import {createPreviewServer} from './serve.mjs';
const root=path.resolve('.qa-tools/email-previews');fs.mkdirSync(root,{recursive:true});
const index=[];
for(const state of communicationStates){const email=renderCommunication(state,emailFixtures[state]);fs.writeFileSync(path.join(root,state+'.html'),email.html);fs.writeFileSync(path.join(root,state+'.txt'),email.subject+'\n\n'+email.text);index.push(`<li><strong>${escapeHtml(email.subject)}</strong> — <a href="/${state}.html">HTML preview</a> · <a href="/${state}.txt">plain text</a></li>`);}
fs.writeFileSync(path.join(root,'index.html'),`<!doctype html><html lang="en-ZA"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>O-IBS synthetic email previews</title><body><main><h1>O-IBS — Phase 5 email review</h1><p>Local synthetic previews only. No email is sent. No invitation link works. These templates are not connected to production delivery.</p><p>Internal drafts reuse the existing validated notification fields with the proposed branded wrapper. Current production notifications remain unchanged.</p><ul>${index.join('')}</ul></main></body></html>`);
fs.writeFileSync(path.join(root,'_headers'),"/*\n  Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n");
console.log('Rendered eight synthetic HTML/plain-text drafts. No delivery capability or credentials used.');
if(process.argv.includes('--serve'))createPreviewServer(root).listen(4185,'127.0.0.1',()=>console.log('Local review: http://127.0.0.1:4185/'));
