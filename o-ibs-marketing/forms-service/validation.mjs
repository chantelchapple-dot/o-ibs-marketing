import {validateApplication} from '../src/early-access-contract.mjs';
import {validateEnquiry} from '../src/contact-contract.mjs';
export const noticeVersion='2026-10-07';
export const emailPattern=/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
export function validateSubmission(kind,input){
 if(!input||typeof input!=='object'||Array.isArray(input))return null;
 const fields=kind==='early-access'?['name','business','email','businessType','employees','plan','areas','message','privacy']:['name','business','email','topic','message'];
 const metadata=['website','token','submissionId','noticeVersion'];
 if(Object.keys(input).some(key=>![...fields,...metadata].includes(key)))return null;
 if(fields.filter(key=>!['areas','privacy'].includes(key)).some(key=>typeof input[key]!=='string'))return null;
 if(kind==='early-access'&&(!Array.isArray(input.areas)||input.areas.length>10||input.areas.some(a=>typeof a!=='string')||new Set(input.areas).size!==input.areas.length||input.privacy!==true))return null;
 if(input.noticeVersion!==noticeVersion||typeof input.website!=='string'||input.website!==''||typeof input.token!=='string'||input.token.length>512||typeof input.submissionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(input.submissionId))return null;
 for(const key of fields.filter(k=>!['areas','privacy'].includes(k))){if(/[\u0000-\u001f\u007f]/.test(key==='message'?input[key].replace(/[\r\n\t]/g,''):input[key]))return null;}
 if(!emailPattern.test(input.email.trim())||input.email.length>254)return null;
 const result=kind==='early-access'?validateApplication(input):validateEnquiry(input);if(!result.valid)return null;
 const clean=Object.fromEntries(fields.map(key=>[key,result.clean[key]]));clean.email=clean.email.toLowerCase();if(clean.areas)clean.areas=[...clean.areas].sort();return {...clean,noticeVersion};
}
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function notification(kind,clean){
 const title=kind==='early-access'?'New O-IBS Early Access Application':'New O-IBS Contact Enquiry';
 const labels={name:'Name',business:'Business',email:'Email',businessType:'Type of business',employees:'Approximate employees',plan:'Plan of interest',areas:'Areas of interest',message:'Message',privacy:'Privacy acknowledgment',noticeVersion:'Privacy notice version'};
 const entries=Object.entries(clean).map(([key,value])=>[labels[key],Array.isArray(value)?value.join(', '):value===true?'Acknowledged':String(value||'(not supplied)')]);
 return {subject:`${title} — ${clean.business}`,reply_to:clean.email,text:title+'\n\n'+entries.map(([k,v])=>`${k}: ${v}`).join('\n')+'\n\nReview manually. No account, company, subscription or financial record has been created.',html:`<h1>${title}</h1><dl>${entries.map(([k,v])=>`<dt><strong>${escape(k)}</strong></dt><dd style="white-space:pre-wrap">${escape(v)}</dd>`).join('')}</dl><p>Review manually. No account, company, subscription or financial record has been created.</p>`};
}
