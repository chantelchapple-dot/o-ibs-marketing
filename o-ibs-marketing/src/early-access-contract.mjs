export const helpAreas=['Quotes and invoices','Customers and payments','Expenses','Suppliers and purchases','Stock/inventory','Banking','Business reports','Accounting','Bizzy AI assistant','Not sure yet'];
export const employeeRanges=['Just me','2–5','6–10','11–25','26 or more','Not sure'];
export const interestPlans=['Basic','Business','Complete','Not sure'];
export function validateApplication(data){
 const errors={},clean={};
 for(const [key,label,max] of [['name','your name',120],['business','your business name',160],['email','your business email',254],['businessType','the type of business',120],['message','your message',1000]]){const value=String(data[key]||'').trim();clean[key]=value;if(key!=='message'&&!value)errors[key]=`Please enter ${label}.`;else if(value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))errors[key]=`Please shorten or check ${label}.`;}
 if(clean.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))errors.email='Please enter a valid business email.';
 for(const [key,options,label] of [['employees',employeeRanges,'an approximate employee count'],['plan',interestPlans,'a plan or Not sure']]){clean[key]=data[key];if(!options.includes(data[key]))errors[key]=`Please choose ${label}.`;}
 clean.areas=Array.isArray(data.areas)?data.areas:[];if(!clean.areas.length||clean.areas.some(a=>!helpAreas.includes(a)))errors.areas='Please choose an area of interest or Not sure yet.';
 clean.privacy=data.privacy===true;if(!clean.privacy)errors.privacy='Please acknowledge the Privacy Policy draft.';
 return {valid:!Object.keys(errors).length,errors,clean};
}
