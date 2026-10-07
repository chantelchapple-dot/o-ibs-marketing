import {test} from 'node:test';
import assert from 'node:assert/strict';
import {contactCategories} from '../src/contact-contract.mjs';
import {validateSubmission,notification} from './validation.mjs';
const sample={name:'Synthetic QA',business:'Demo Company',email:'qa@example.invalid',message:'Synthetic enquiry.',website:'',token:'synthetic-token',submissionId:'12345678-1234-4123-8123-123456789abc',noticeVersion:'2026-10-07'};
for(const topic of contactCategories)test('Contact notification labels category: '+topic,()=>{
 const clean=validateSubmission('contact',{...sample,topic});assert(clean);
 const email=notification('contact',clean);
 assert(email.text.includes('Category / topic: '+topic));
 assert(email.html.includes('<dt><strong>Category / topic</strong></dt><dd style="white-space:pre-wrap">'+topic+'</dd>'));
 for(const content of [email.text,email.html])assert(!/undefined|null|\[object Object\]/.test(content));
});
test('Contact categories remain required and malformed or unsupported values are rejected',()=>{
 for(const topic of [undefined,null,'',{},[],42,'Unsupported category','<script>alert(1)</script>'])assert.equal(validateSubmission('contact',{...sample,topic}),null);
 const missing={...sample};assert.equal(validateSubmission('contact',missing),null);
});
test('Optional absent/blank content is intentionally presented and HTML is escaped',()=>{
 const clean=validateSubmission('contact',{...sample,topic:'General enquiry',name:'<QA & "owner">',message:'<script>alert("synthetic")</script> & review'});assert(clean);
 const email=notification('contact',clean);assert(!email.html.includes('<script>'));assert(email.html.includes('&lt;script&gt;'));assert(email.html.includes('&amp;'));assert(email.html.includes('&quot;'));
 const early={name:'QA',business:'Demo Company',email:'qa@example.invalid',businessType:'Retail',employees:'2–5',plan:'Basic',areas:['Expenses'],privacy:true,noticeVersion:'2026-10-07'};
 for(const message of [undefined,null,'']){const output=notification('early-access',{...early,message});assert(output.text.includes('Message: (not supplied)'));assert(!/undefined|null|\[object Object\]/.test(output.html+output.text));}
});
