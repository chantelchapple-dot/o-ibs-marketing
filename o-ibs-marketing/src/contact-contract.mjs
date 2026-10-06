export const contactCategories=['Early access / beta','Sales enquiry','Product question','Choosing a plan','Support direction','Privacy question'];
export function validateEnquiry(input){
  const limits={name:120,business:160,email:254,phone:40,message:5000};const clean={},errors={};
  for(const [field,max] of Object.entries(limits)){clean[field]=String(input[field]??'').trim();if(field!=='phone'&&!clean[field])errors[field]='Please complete this field.';else if(clean[field].length>max)errors[field]=`Use ${max} characters or fewer.`;else if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(clean[field]))errors[field]='Remove unsupported control characters.';}
  if(clean.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))errors.email='Enter a valid email address.';
  clean.topic=String(input.topic??'');if(!contactCategories.includes(clean.topic))errors.topic='Choose an enquiry category.';
  clean.website=String(input.website??'');if(clean.website)errors.website='This enquiry could not be accepted.';
  return {valid:Object.keys(errors).length===0,errors,clean};
}
