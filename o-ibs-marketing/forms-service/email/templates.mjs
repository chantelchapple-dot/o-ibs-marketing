import {emailLayout,escapeHtml} from './layout.mjs';
import {contactCategories} from '../../src/contact-contract.mjs';
import {validateSubmission,notification} from '../validation.mjs';
export const communicationStates=Object.freeze(['application-received','invitation','waitlist','declined','welcome','contact-received','internal-contact','internal-early-access']);
const subjects={'application-received':'O-IBS Early Access — Application received',invitation:'You’re invited to O-IBS Early Access',waitlist:'O-IBS Early Access — Application update',declined:'O-IBS Early Access — Application outcome',welcome:'Welcome to O-IBS','contact-received':'O-IBS — We received your message'};
function line(value,key,max=120){if(value===undefined||value==='')return '';if(typeof value!=='string'||value.length>max||/[\u0000-\u001f\u007f]/.test(value))throw Error('Invalid template field: '+key);return value.trim();}
function safeAppLink(value,approvedOrigin){
 if(!value)return null;
 let u,o;try{u=new URL(value);o=new URL(approvedOrigin);}catch{throw Error('Authorised application URL required');}
 if(u.protocol!=='https:'||o.protocol!=='https:'||u.username||u.password||o.username||o.password||o.pathname!=='/'||o.search||o.hash||u.port||o.port||u.hash||u.origin!==o.origin||!/^(?:[a-z0-9-]+\.)*o-ibs\.co\.za$/.test(u.hostname)||u.hostname==='staging.o-ibs.co.za'||value.length>2048||/[\s\u0000-\u001f\u007f]|%0[0-9a-f]|%1[0-9a-f]|%7f/i.test(value))throw Error('Unsafe or unapproved application URL');
 return u.href;
}
// Rendering only. These modules never send mail, read environment secrets or create application records.
export function renderCommunication(state,input={},policy={}){
 if(!communicationStates.includes(state))throw Error('Unsupported communication state');
 if(state.startsWith('internal-')){
  const kind=state==='internal-contact'?'contact':'early-access',clean=validateSubmission(kind,input);if(!clean)throw Error('Invalid internal notification fields');
  const current=notification(kind,clean);
  return {...current,...emailLayout({title:state==='internal-contact'?'Contact enquiry':'Early Access application',preview:'For manual O-IBS review',body:current.html.replace(/^<h1>[^<]*<\/h1>/,''),text:current.text})};
 }
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid template input');
 const allowed={name:120,topic:80,receipt:64,approvedReason:300,invitationUrl:2048,signInUrl:2048};
 if(Object.keys(input).some(k=>!Object.hasOwn(allowed,k)))throw Error('Unsupported template field');
 const values=Object.fromEntries(Object.entries(input).map(([k,v])=>[k,line(v,k,allowed[k])]));
 if(values.topic&&!contactCategories.includes(values.topic))throw Error('Invalid Contact category');
 if(values.receipt&&!/^[a-f0-9]{64}$/.test(values.receipt))throw Error('Invalid submission reference');
 if(state==='contact-received'&&!values.topic)throw Error('Contact category required');
 if(values.invitationUrl&&state!=='invitation'||values.signInUrl&&state!=='welcome'||values.approvedReason&&state!=='declined'||values.topic&&state!=='contact-received'||values.receipt&&!['contact-received','application-received'].includes(state))throw Error('Field does not belong to this communication state');
 const greeting=values.name?'Hello '+values.name+',':'Hello,';
 const paragraphs={
  'application-received':['Thank you for applying for O-IBS Early Access. We have received your application for review.','Receipt is not acceptance. O-IBS will review your business needs, and approved applicants will be contacted separately.','No O-IBS account or subscription has been created, and no payment has been taken. Applying does not guarantee acceptance.'],
  invitation:['Your application has been approved, and your business is invited to controlled O-IBS Early Access.','Account setup will take place through the authorised invitation process. This email does not itself create an account, subscription or payment.','Follow only the authorised invitation supplied by O-IBS. Never forward an invitation link or share your password.'],
  waitlist:['Thank you for your interest in O-IBS. We are welcoming businesses in carefully reviewed groups.','We are not able to invite your business at this time, and we cannot promise a future invitation. No account or subscription has been created and no payment has been taken.'],
  declined:['Thank you for applying for O-IBS Early Access. After review, we are not proceeding with your application for the current programme.',...(values.approvedReason?['Reviewed reason: '+values.approvedReason]:[]),'No account or subscription has been created, and no payment has been taken.'],
  welcome:['Welcome to O-IBS. Your account has been set up through our invitation process.','Follow the agreed setup guidance for your company. Review opening information, settings, accounting records and tax treatment with the person responsible for your accounts before relying on them.','Use only the authorised sign-in address supplied by O-IBS. Important changes to financial or stock records require review and confirmation.'],
  'contact-received':['Thank you for contacting O-IBS. We have received your message.','Category / topic: '+(values.topic||''),'Our team will review your message.']
 }[state];
 const link=state==='invitation'?safeAppLink(values.invitationUrl,policy.approvedAppOrigin):state==='welcome'?safeAppLink(values.signInUrl,policy.approvedAppOrigin):null;
 const placeholder=state==='invitation'?'[AUTHORISED INVITATION LINK — NOT CONFIGURED; NON-FUNCTIONAL PREVIEW]':state==='welcome'?'[AUTHORISED SIGN-IN URL — NOT CONFIGURED; NON-FUNCTIONAL PREVIEW]':null;
 // Canonical receipts remain validated and unchanged, but are not displayed to customers.
 const extra=null;
 const support='Questions? Contact us at support@o-ibs.co.za.';
 const body=[greeting,...paragraphs,...(extra?[extra]:[]),support].map(p=>`<p style="margin:0 0 18px">${escapeHtml(p)}</p>`).join('')+(link?`<p><a href="${escapeHtml(link)}" style="color:#ead4aa;font-weight:bold">${state==='invitation'?'Open your authorised invitation':'Sign in through your authorised address'}</a></p>`:placeholder?`<p style="border:1px solid #655947;padding:16px">${escapeHtml(placeholder)}</p>`:'');
 const text=[subjects[state],greeting,...paragraphs,...(extra?[extra]:[]),support,...(link?[link]:placeholder?[placeholder]:[])].join('\n\n');
 return {subject:subjects[state],...emailLayout({title:subjects[state],preview:paragraphs[0],body,text})};
}
