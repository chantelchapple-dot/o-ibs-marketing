export function attachDelivery(form,{read,show,validate}){
 const button=form.querySelector('button[type="submit"]');let challenge=null,challengeAt=0,inflight=false,lastPayload='',submissionId='';
 const enabled=()=>form.dataset.enabled==='true'&&!!form.dataset.backend;
 async function token(){const response=await fetch(form.dataset.backend+'/api/form-token',{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(15_000)});const data=await response.json();if(!response.ok||typeof data.token!=='string'||data.noticeVersion!=='2026-10-07')throw Error('Token unavailable');challenge=data.token;challengeAt=Date.now();return challenge;}
 // Prefetching prepares the short anti-bot waiting period while the visitor fills the form.
 if(enabled())token().catch(()=>{challenge=null;});
 form.addEventListener('submit',async event=>{event.preventDefault();if(inflight)return;const result=validate();if(!result.valid)return;if(!enabled()){show('Online submissions are unavailable. Nothing has been sent or stored.','unavailable');return;}
 let failure='We could not confirm receipt. Your details remain on this page. Please retry safely or email support@o-ibs.co.za.';
 inflight=true;button.disabled=true;form.setAttribute('aria-busy','true');show('Sending securely…','pending');
 try{const clean=read(result),serialized=JSON.stringify(clean);if(lastPayload!==serialized){lastPayload=serialized;submissionId=crypto.randomUUID();}if(!challenge||Date.now()-challengeAt>25*60_000)await token();const wait=3100-(Date.now()-challengeAt);if(wait>0)await new Promise(resolve=>setTimeout(resolve,wait));
 const response=await fetch(form.dataset.backend+form.dataset.route,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({...clean,token:challenge,submissionId,noticeVersion:'2026-10-07'}),signal:AbortSignal.timeout(20_000)});const data=await response.json();
 if(response.status===429)failure='Too many attempts. Your details remain on this page. Please try again later or email support@o-ibs.co.za.';
 if(!response.ok||data.accepted!==true||typeof data.receipt!=='string'||!/^[a-f0-9]{64}$/.test(data.receipt))throw Error('Receipt not confirmed');
 show(form.dataset.route==='/api/early-access'?'Application received for review. Thank you for applying for O-IBS Early Access. If your business is selected for the closed beta, we’ll contact you by email. No account or subscription has been created. Email delivery may still be pending.':'Enquiry received. Thank you for contacting O-IBS. Email delivery may still be pending.','success');form.reset();lastPayload='';submissionId='';challenge=null;
 }catch{challenge=null;show(failure,'error');}
 finally{inflight=false;button.disabled=!enabled();form.removeAttribute('aria-busy');}
 });
}
