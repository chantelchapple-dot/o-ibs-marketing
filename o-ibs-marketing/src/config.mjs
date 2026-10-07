import {company} from './company.mjs';
import fs from 'node:fs';
export function readConfig(overrides={}){
  const local={};
  if(fs.existsSync('.env'))for(const line of fs.readFileSync('.env','utf8').split(/\r?\n/)){const match=line.match(/^([A-Z_]+)=(.*)$/);if(match)local[match[1]]=match[2].trim();}
  const get=(key,fallback='')=>overrides[key]??process.env[key]??local[key]??fallback;
  const enabled=key=>get(key)==='true';
  function publicUrl(key,fallback=''){
    const value=get(key,fallback);if(!value)return '';
    let parsed;try{parsed=new URL(value);}catch{throw Error(`${key} must be a valid URL`);}
    const localHost=['localhost','127.0.0.1','[::1]'].includes(parsed.hostname);
    if(parsed.protocol!=='https:'&&!(parsed.protocol==='http:'&&localHost))throw Error(`${key} requires HTTPS, except local development`);
    if(parsed.username||parsed.password||parsed.search)throw Error(`${key} cannot contain credentials or query parameters`);
    if(parsed.hostname==='staging.o-ibs.co.za'&&key!=='PUBLIC_STAGING_APP_URL')throw Error('Staging cannot be a public application or trial destination');
    return parsed.href.replace(/\/$/,'');
  }
  const origin=publicUrl('PUBLIC_SITE_URL','https://o-ibs.co.za');
  if(new URL(origin).pathname!=='/'||new URL(origin).hash)throw Error('PUBLIC_SITE_URL must be an origin without a path');
  const app=publicUrl('PUBLIC_APP_URL'),trial=publicUrl('PUBLIC_TRIAL_URL');
  const trialReady=enabled('PUBLIC_TRIAL_READY');if(trialReady&&!trial)throw Error('Approved trial access requires PUBLIC_TRIAL_URL');
  const formsUrl=publicUrl('PUBLIC_FORMS_API_URL');if(formsUrl){const u=new URL(formsUrl);if(u.pathname!=='/'||u.hash||(!u.hostname.endsWith('.onrender.com')&&!['127.0.0.1','localhost'].includes(u.hostname)))throw Error('Form backend must be an isolated Render origin');}
  const formsEnabled=enabled('PUBLIC_FORMS_ENABLED');if(formsEnabled&&!formsUrl)throw Error('Enabled forms require PUBLIC_FORMS_API_URL');
  const contactEndpoint=get('PUBLIC_CONTACT_ENDPOINT');
  if(contactEndpoint&&!/^\/api\/[a-zA-Z0-9/_-]+$/.test(contactEndpoint))throw Error('Contact endpoint must be an approved same-origin /api/ path');
  const contactEnabled=formsEnabled||enabled('PUBLIC_CONTACT_ENABLED');if(contactEnabled&&!formsEnabled&&!contactEndpoint)throw Error('Enabled contact service requires an approved endpoint');
  const addressesApproved=enabled('PUBLIC_CONTACT_ADDRESSES_APPROVED');
  const address=key=>{const value=get(key);if(value&&!/^[a-zA-Z0-9._+-]+@o-ibs\.co\.za$/i.test(value))throw Error(`${key} must be an approved O-IBS domain address`);return addressesApproved?value:'';};
  const contactEmail=address('PUBLIC_CONTACT_EMAIL'),supportEmail=company.supportEmail,privacyEmail=address('PUBLIC_PRIVACY_EMAIL');
  const releaseIssues=[];
  if(!app)releaseIssues.push('Approved production sign-in URL is missing.');
  if(!trialReady)releaseIssues.push('Public onboarding is not open; Start Early Access uses a reviewed invitation-based application journey; public registration is closed.');
  if(!contactEnabled)releaseIssues.push('Online enquiries and early-access applications have no active secure delivery/storage service. Email support is available.');
  releaseIssues.push('Final legal policies, Information Officer governance, PAIA manual and privacy procedures need professional approval.');
  releaseIssues.push('Monthly prices are approved; public paid access and final subscription/cancellation terms are not approved.');
  return {formsEnabled,formsUrl:formsEnabled?formsUrl:'',origin,app,trial:trialReady?trial:'',trialReady,contactEndpoint:contactEnabled?contactEndpoint:'',contactEnabled,contactEmail,supportEmail,privacyEmail,releaseIssues};
}
