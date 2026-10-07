import {validateApplication} from './early-access-contract.mjs';
import {attachDelivery} from './form-delivery.js';
const form=document.getElementById('early-access-form');
if(form){
 const status=form.querySelector('.form-message');const show=(text,state)=>{status.textContent=text;status.dataset.state=state;};
 function check(){const data=Object.fromEntries(new FormData(form));data.areas=[...form.querySelectorAll('[name="areas"]:checked')].map(input=>input.value);data.privacy=form.elements.namedItem('privacy').checked;const result=validateApplication(data);
 for(const key of ['name','business','email','businessType','employees','plan','message','privacy']){form.elements.namedItem(key).setAttribute('aria-invalid',String(!!result.errors[key]));document.getElementById(key+'-error').textContent=result.errors[key]||'';}
 form.querySelector('fieldset').setAttribute('aria-invalid',String(!!result.errors.areas));document.getElementById('areas-error').textContent=result.errors.areas||'';
 if(!result.valid){show('Please review the highlighted fields. Nothing has been sent or stored.','error');const key=Object.keys(result.errors)[0];(key==='areas'?form.querySelector('[name="areas"]'):form.elements.namedItem(key)).focus();}return result;
 }
 document.getElementById('check-application')?.addEventListener('click',()=>{if(check().valid)show('Your fields look ready. Applications are not open yet; nothing has been sent or stored.','ready');});
 attachDelivery(form,{validate:check,show,read:result=>({...result.clean,website:form.elements.namedItem('website').value})});
}
