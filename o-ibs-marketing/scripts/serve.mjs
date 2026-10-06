import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';
export function createPreviewServer(root=path.resolve('dist')){
  const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
  return http.createServer((req,res)=>{
    try{
      const headerFile=path.join(root,'_headers');
      if(fs.existsSync(headerFile))for(const line of fs.readFileSync(headerFile,'utf8').split('\n')){const match=line.match(/^  ([^:]+): (.*)$/);if(match&&match[1]!=='Strict-Transport-Security')res.setHeader(match[1],match[2]);}
      res.setHeader('Cache-Control','no-cache');
      const error=(status)=>{const file=path.join(root,status===500?'500.html':'404.html');res.writeHead(status,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?'':fs.readFileSync(file));};
      if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');res.writeHead(req.url?.startsWith('/api/')?503:405,{'Content-Type':'application/json'}).end(JSON.stringify({accepted:false,error:'This service is unavailable.'}));return;}
      let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);}catch{error(400);return;}
      if(pathname.includes('\0')||pathname.includes('\\')){error(400);return;}
      let file=path.resolve(root,'.'+pathname);
      if(file!==root&&!file.startsWith(root+path.sep)){error(403);return;}
      if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
      if(!fs.existsSync(file)){error(404);return;}
      const extension=path.extname(file);let body=fs.readFileSync(file);
      if(/\b(?:gzip)\b/.test(req.headers['accept-encoding']||'')&&['.html','.css','.js','.mjs','.xml','.txt','.webmanifest'].includes(extension)){body=gzipSync(body);res.setHeader('Content-Encoding','gzip');res.setHeader('Vary','Accept-Encoding');}
      res.writeHead(200,{'Content-Type':types[extension]||'application/octet-stream'});
      res.end(req.method==='HEAD'?'':body);
    }catch{if(!res.headersSent)res.writeHead(500,{'Content-Type':'text/html; charset=utf-8'});res.end('<!doctype html><html lang="en"><title>Service unavailable | O-IBS</title><h1>Service temporarily unavailable</h1><p>Please try again later.</p></html>');}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))createPreviewServer().listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
