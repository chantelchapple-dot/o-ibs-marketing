import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderCommunication,communicationStates} from './email/templates.mjs';
import {emailFixtures,syntheticSubmission} from './email/fixtures.mjs';
import {contactCategories} from '../src/contact-contract.mjs';
for(const state of communicationStates)test('Phase 5 renders '+state+' as HTML/plain text without delivery',()=>{
 const email=renderCommunication(state,emailFixtures[state]);assert(email.subject);assert(email.text.length>100);assert(email.html.includes('<table role="presentation"'));for(const value of ['O-IBS','Optimised Intelligent Business System','South Africa','support@o-ibs.co.za','https://o-ibs.co.za'])assert(email.text.includes(value)&&email.html.includes(value));assert(!/undefined|null|\[object Object\]/.test(email.text+email.html));assert(!/<script|<img|<form|<iframe|@import/i.test(email.html));assert(!Object.hasOwn(email,'from'));assert(!Object.hasOwn(email,'to'));assert(!email.attachments);
 if(['invitation','welcome'].includes(state)){assert(email.text.includes('NON-FUNCTIONAL PREVIEW'));assert(!email.html.includes('href="https://o-ibs.co.za/'));}
});
test('fixed applicant subjects, escaped malicious names, Unicode and optional names',()=>{
 for(const state of communicationStates.filter(s=>!s.startsWith('internal-'))){const a=renderCommunication(state,{...emailFixtures[state],name:'<img src=x onerror=alert(1)> Café 李 & "Owner"'});assert(!a.html.includes('<img'));assert(a.html.includes('&lt;img'));assert(a.html.includes('Café 李'));assert.equal(a.subject,renderCommunication(state,emailFixtures[state]).subject);assert(renderCommunication(state,{...emailFixtures[state],name:''}).text.includes('Hello,'));}
});
test('reject header injection, oversized fields, arbitrary envelopes and secret inputs without echoing values',()=>{
 for(const input of [{name:'x\r\nBcc: attacker@example.invalid'},{name:'x'.repeat(121)},{name:null},{name:{}},{name:['Owner']},{name:42},{to:'attacker@example.invalid'},{from:'attacker@example.invalid'},{reply_to:'attacker@example.invalid'},{RESEND_API_KEY:'synthetic-secret-never-echo'},{FORMS_HMAC_SECRET:'synthetic-secret-never-echo'},{constructor:'synthetic-secret-never-echo'}]){assert.throws(()=>renderCommunication('application-received',input),e=>!e.message.includes('synthetic-secret-never-echo')&&!e.message.includes('attacker@example.invalid'));}
 assert.throws(()=>renderCommunication('contact-received',{}));assert.throws(()=>renderCommunication('contact-received',{topic:'<script>bad</script>'}));assert.throws(()=>renderCommunication('application-received',{receipt:'bad-reference'}));
});
test('authorised URLs need an explicit matching approved public application origin; defaults have no links',()=>{
 const policy={approvedAppOrigin:'https://future.o-ibs.co.za'};
 const good=renderCommunication('invitation',{invitationUrl:'https://future.o-ibs.co.za/authorised-invite?synthetic=1'},policy);assert(good.html.includes('href="https://future.o-ibs.co.za/authorised-invite?synthetic=1"'));
 for(const invitationUrl of ['javascript:alert(1)','http://future.o-ibs.co.za/invite','https://attacker.invalid/invite','https://future.o-ibs.co.za.attacker.invalid/invite','https://user:password@future.o-ibs.co.za/invite','https://future.o-ibs.co.za:444/invite','https://future.o-ibs.co.za/invite\n','https://staging.o-ibs.co.za/invite','https://localhost/invite','https://future.o-ibs.co.za/invite%0a','https://future.o-ibs.co.za/invite%00'])assert.throws(()=>renderCommunication('invitation',{invitationUrl},policy));
 assert.throws(()=>renderCommunication('invitation',{invitationUrl:'https://future.o-ibs.co.za/invite'}));assert.throws(()=>renderCommunication('waitlist',{invitationUrl:'https://future.o-ibs.co.za/invite'},policy));
});
test('decline reason is operator supplied, optional, escaped and bounded; no fabricated reasons',()=>{
 const base=renderCommunication('declined');assert(!base.text.includes('Reviewed reason:'));
 const email=renderCommunication('declined',{approvedReason:'<b>Operator-reviewed synthetic reason</b>'});assert(email.html.includes('&lt;b&gt;'));assert.throws(()=>renderCommunication('declined',{approvedReason:'x'.repeat(301)}));assert.throws(()=>renderCommunication('welcome',{approvedReason:'Not a welcome field'}));
});
test('acknowledgement exposes only approved category/reference, never the submitted message',()=>{
 for(const topic of contactCategories){const email=renderCommunication('contact-received',{topic});assert(email.text.includes('Category / topic: '+topic));assert(!email.text.includes(syntheticSubmission.message));}
 assert.throws(()=>renderCommunication('contact-received',{topic:'General enquiry',message:'private'}));
});
test('internal drafts reuse strict existing fields, safe Reply-To and category labels; hidden/secret fields rejected',()=>{
 for(const state of ['internal-contact','internal-early-access']){const fixture=emailFixtures[state],email=renderCommunication(state,fixture);assert.equal(email.reply_to,fixture.email);assert(!email.html.includes(fixture.token));assert(!email.text.includes(fixture.submissionId));assert(!email.html.includes('website:'));for(const extra of [{email:'x@example.invalid\r\nBcc: a@b.invalid'},{business:'x\nSubject: injected'},{RESEND_API_KEY:'synthetic-secret-never-echo'},{IP:'127.0.0.1'},{attachments:[]}])assert.throws(()=>renderCommunication(state,{...fixture,...extra}),e=>!e.message.includes('synthetic-secret-never-echo'));}
 for(const topic of contactCategories)assert(renderCommunication('internal-contact',{...emailFixtures['internal-contact'],topic}).text.includes('Category / topic: '+topic));
 const early=renderCommunication('internal-early-access',{...emailFixtures['internal-early-access'],message:''});assert(early.text.includes('Message: (not supplied)'));assert(early.text.includes('Plan of interest: Complete'));assert(early.text.includes('Areas of interest: Stock/inventory'));
});

test('duplicate public submissions do not trigger prepared acknowledgements or extra provider deliveries',async()=>{
 const {createFormService}=await import('./server.mjs');const {once}=await import('node:events');let now=10000;const calls=[];
 const config={apiKey:'synthetic-provider-only',from:'noreply@o-ibs.co.za',to:'support@o-ibs.co.za',secret:'synthetic-32-character-test-key-only',origin:'https://o-ibs.co.za'};
 const {server,store}=createFormService(config,{clock:()=>now,providerFetch:async(_url,request)=>{calls.push(JSON.parse(request.body));return new Response(JSON.stringify({id:'synthetic-provider-id'}),{status:200});}});
 server.listen(0,'127.0.0.1');await once(server,'listening');const url='http://127.0.0.1:'+server.address().port;
 try{for(const [kind,state] of [['contact','internal-contact'],['early-access','internal-early-access']]){const tokenResponse=await fetch(url+'/api/form-token',{headers:{Origin:config.origin}});const {token}=await tokenResponse.json();now+=3001;const input={...emailFixtures[state],token};const send=()=>fetch(url+'/api/'+kind,{method:'POST',headers:{Origin:config.origin,'Content-Type':'application/json'},body:JSON.stringify(input)});const a=await send(),b=await send();assert.equal(a.status,200);assert.equal(b.status,200);assert.equal((await a.json()).receipt,(await b.json()).receipt);}assert.equal(calls.length,2);assert(calls.every(e=>e.subject.startsWith('New O-IBS')));assert(calls.every(e=>e.to.length===1&&e.to[0]===config.to));}
 finally{await new Promise(r=>server.close(r));store.close();}
});

test('large and absent values stay bounded, HTML wrap points cannot introduce markup, and secrets are never read from policy',()=>{
 const secret='SYNTHETIC_POLICY_SENTINEL_NOT_A_CREDENTIAL';const a=renderCommunication('application-received',{}, {apiKey:secret,FORMS_HMAC_SECRET:secret});assert(!JSON.stringify(a).includes(secret));
 const internal=renderCommunication('internal-contact',{...emailFixtures['internal-contact'],name:'李'.repeat(120),business:'D'.repeat(160),message:'<img src=x>'.repeat(400)});assert(!internal.html.includes('<img'));assert(internal.html.length<50000);assert(internal.html.includes('<wbr>'));assert(internal.text.includes('D'.repeat(160)));assert.throws(()=>renderCommunication('internal-contact',{...emailFixtures['internal-contact'],message:'x'.repeat(5001)}));
});

test('customer-friendly support/footer and omitted canonical receipts across all customer drafts',()=>{
 const reminder='For your security, O-IBS will never ask you to send your password or banking login details by email.';
 for(const state of communicationStates.filter(s=>!s.startsWith('internal-'))){const fixture={...emailFixtures[state]};const before=JSON.stringify(fixture),email=renderCommunication(state,fixture);assert.equal(JSON.stringify(fixture),before);assert(email.text.includes('Questions? Contact us at support@o-ibs.co.za.'));assert.equal(email.text.split(reminder).length-1,1);assert.equal(email.html.split(reminder).length-1,1);for(const output of [email.html,email.text]){assert(!/API keys|accounting databases|bank credentials|Submission reference|Operational communication/i.test(output));if(fixture.receipt)assert(!output.includes(fixture.receipt));}}
 for(const receipt of ['a'.repeat(65),'invalid-reference'])assert.throws(()=>renderCommunication('application-received',{receipt}));
});
