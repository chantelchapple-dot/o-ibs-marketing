import {validateEnquiry} from './contact-contract.mjs';
import {attachDelivery} from './form-delivery.js';
const form=document.getElementById('contact-form');
if(form){
 const status=form.querySelector('.form-message');const show=(text,state)=>{status.textContent=text;status.dataset.state=state;};
 function validate(){const result=validateEnquiry(Object.fromEntries(new FormData(form)));for(const field of ['name','business','email','topic','message']){const input=form.elements.namedItem(field),error=document.getElementById(field+'-error');input.setAttribute('aria-invalid',String(!!result.errors[field]));error.textContent=result.errors[field]||'';}if(!result.valid){show('Please review the highlighted fields. Nothing has been sent.','error');const first=Object.keys(result.errors).find(k=>k!=='website');if(first)form.elements.namedItem(first).focus();}return result;}
 document.getElementById('check-enquiry')?.addEventListener('click',()=>{if(validate().valid)show('Your enquiry is ready. Online sending is not enabled; nothing has been sent or stored.','ready');});
 attachDelivery(form,{validate,show,read:result=>result.clean});
}
