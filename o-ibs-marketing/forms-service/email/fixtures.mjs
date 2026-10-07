export const syntheticSubmission={name:'Demo Owner — SYNTHETIC',business:'Demo Company — SYNTHETIC',email:'owner@example.invalid',message:'Synthetic preview only. No real enquiry or applicant.',website:'',token:'synthetic-preview-not-a-real-token',submissionId:'12345678-1234-4123-8123-123456789abc',noticeVersion:'2026-10-07'};
export const emailFixtures={
 'application-received':{name:'Demo Owner — SYNTHETIC',receipt:'a'.repeat(64)},
 invitation:{name:'Demo Owner — SYNTHETIC'},waitlist:{name:'Demo Owner — SYNTHETIC'},
 declined:{name:'Demo Owner — SYNTHETIC'},welcome:{name:'Demo Owner — SYNTHETIC'},
 'contact-received':{name:'Demo Owner — SYNTHETIC',topic:'Support direction',receipt:'b'.repeat(64)},
 'internal-contact':{...syntheticSubmission,topic:'Support direction'},
 'internal-early-access':{...syntheticSubmission,businessType:'Synthetic service business',employees:'2–5',plan:'Complete',areas:['Stock/inventory'],privacy:true}
};
