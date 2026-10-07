import http from 'node:http';
import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {MetadataStore} from './store.mjs';
import {emailPattern,validateSubmission,notification,noticeVersion} from './validation.mjs';
export function readServiceConfig(env=process.env){
 const required=['RESEND_API_KEY','MAIL_FROM','MAIL_TO','FORMS_HMAC_SECRET','FORMS_ALLOWED_ORIGIN'];for(const name of required)if(!env[name])throw Error('Missing server configuration: '+name);
 if(env.FORMS_ALLOWED_ORIGIN!=='https://o-ibs.co.za')throw Error('FORMS_ALLOWED_ORIGIN must be the approved marketing origin');
 if(!emailPattern.test(env.MAIL_FROM)||!emailPattern.test(env.MAIL_TO)||!env.MAIL_FROM.endsWith('@o-ibs.co.za')||!env.MAIL_TO.endsWith('@o-ibs.co.za'))throw Error('Use configured O-IBS sender and recipient addresses');
 if(env.FORMS_HMAC_SECRET.length<32)throw Error('FORMS_HMAC_SECRET must contain at least 32 characters');
 return {apiKey:env.RESEND_API_KEY,from:env.MAIL_FROM,to:env.MAIL_TO,secret:env.FORMS_HMAC_SECRET,origin:env.FORMS_ALLOWED_ORIGIN};
}
export function createFormService(config,{store,providerFetch=fetch,clock=Date.now}={}){
 const hash=value=>crypto.createHmac('sha256',config.secret).update(value).digest('hex');
 const inflight=new Set();const db=store||new MetadataStore();
 function token(){const value=Buffer.from(JSON.stringify({time:clock(),nonce:crypto.randomUUID()})).toString('base64url');return value+'.'+hash(value);}
 function validToken(value){try{const [body,signature,...extra]=value.split('.');if(extra.length||!signature||signature.length!==64||!crypto.timingSafeEqual(Buffer.from(hash(body)),Buffer.from(signature)))return false;const data=JSON.parse(Buffer.from(body,'base64url').toString());const age=clock()-data.time;return typeof data.time==='number'&&typeof data.nonce==='string'&&age>=3000&&age<=30*60*1000;}catch{return false;}}
 const server=http.createServer(async(req,res)=>{
  const send=(status,payload)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(payload));};
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'none'; frame-ancestors 'none'");res.setHeader('Referrer-Policy','no-referrer');
  let route;try{route=new URL(req.url,'http://localhost').pathname;}catch{send(400,{accepted:false,error:'Invalid request.'});return;}
  if(route==='/healthz'){send(req.method==='GET'?200:405,req.method==='GET'?{ok:true}:{accepted:false,error:'Method not allowed.'});return;}
  if(!['/api/form-token','/api/early-access','/api/contact'].includes(route)){send(404,{accepted:false,error:'Not found.'});return;}
  if(req.headers.origin!==config.origin){send(403,{accepted:false,error:'Origin not allowed.'});return;}
  res.setHeader('Access-Control-Allow-Origin',config.origin);res.setHeader('Vary','Origin');
  if(req.method==='OPTIONS'){if(req.headers['access-control-request-method']!==(route==='/api/form-token'?'GET':'POST')||(req.headers['access-control-request-headers']||'').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean).some(h=>h!=='content-type')){send(403,{accepted:false,error:'Preflight denied.'});return;}res.setHeader('Access-Control-Allow-Methods',route==='/api/form-token'?'GET':'POST');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.writeHead(204);res.end();return;}
  if(req.method!==(route==='/api/form-token'?'GET':'POST')){res.setHeader('Allow',route==='/api/form-token'?'GET, OPTIONS':'POST, OPTIONS');send(405,{accepted:false,error:'Method not allowed.'});return;}
  try{
   const now=clock();db.cleanup(now);
   if(!db.limit('requests',120,60_000,now)){res.setHeader('Retry-After','60');send(429,{accepted:false,error:'Please try again later.'});return;}
   if(route==='/api/form-token'){send(200,{token:token(),noticeVersion});return;}
   if(req.headers['content-type']?.split(';')[0].trim().toLowerCase()!=='application/json'){send(415,{accepted:false,error:'JSON required. Attachments are not accepted.'});return;}
   if(req.headers['content-encoding']){send(415,{accepted:false,error:'Unsupported encoding.'});return;}
   if(Number(req.headers['content-length'])>16_384){send(413,{accepted:false,error:'Request too large.'});req.resume();return;}
   const chunks=[];let bytes=0;for await(const chunk of req){bytes+=chunk.length;if(bytes>16_384){send(413,{accepted:false,error:'Request too large.'});return;}chunks.push(chunk);}
   let input;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{send(400,{accepted:false,error:'Malformed request.'});return;}
   const kind=route.split('/').at(-1),clean=validateSubmission(kind,input);
   if(!clean||!validToken(input.token)){send(422,{accepted:false,error:'Please check your fields, reload the form and try again.'});return;}
   // Hash the exact immutable provider body: identical notifications share a key across processes.
   const email={from:config.from,to:[config.to],...notification(kind,clean)};
   const id=hash(kind+':'+input.submissionId),digest=hash(JSON.stringify(email));
   let record=db.byId(id);if(record&&record.digest!==digest){send(409,{accepted:false,error:'This submission changed. Reload before starting a new submission.'});return;}
   record=record||db.byDigest(digest);
   if(record?.state==='accepted'){send(200,{accepted:true,receipt:record.id});return;}
   if(record&&inflight.has(record.id)){res.setHeader('Retry-After','5');send(409,{accepted:false,error:'This submission is still processing. Wait before retrying.'});return;}
   if(!db.limit('sender:'+hash(clean.email),5,60*60_000,now)||!db.limit('emails-minute',20,60_000,now)||!db.limit('emails-day',200,24*60*60_000,now)){res.setHeader('Retry-After','60');send(429,{accepted:false,error:'Too many attempts. Please try again later.'});return;}
   record=record||db.insert(id,digest,now);inflight.add(record.id);
   try{
    const response=await providerFetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+config.apiKey,'Content-Type':'application/json','Idempotency-Key':'oibs-forms/v1/'+digest},body:JSON.stringify(email),signal:AbortSignal.timeout(12_000)});
    const result=await response.json();if(!response.ok||typeof result.id!=='string'||!result.id||result.error)throw Error('Provider did not accept');
    db.accepted(record.id);send(200,{accepted:true,receipt:record.id});
   }catch{send(503,{accepted:false,error:'We could not confirm receipt. Your details remain on this page. Please retry or email support@o-ibs.co.za.'});}finally{inflight.delete(record.id);}
  }catch{if(!res.headersSent)send(503,{accepted:false,error:'This service is temporarily unavailable.'});else res.end();}
 });
 const maintenance=setInterval(()=>{try{db.cleanup(clock());}catch{/* Fail closed on future requests; never log payloads. */}},60_000);maintenance.unref();server.on('close',()=>clearInterval(maintenance));
 server.requestTimeout=20_000;server.headersTimeout=10_000;server.keepAliveTimeout=5000;return {server,store:db};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const config=readServiceConfig();const {server,store}=createFormService(config);server.listen(Number(process.env.PORT||10000),'0.0.0.0',()=>console.log('Marketing form service ready.'));process.on('SIGTERM',()=>server.close(()=>{store.close();process.exit(0);}));}catch{console.error('Marketing form service could not start. Check required server configuration.');process.exitCode=1;}
}
