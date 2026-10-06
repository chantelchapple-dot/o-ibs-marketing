import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {ESLint}=require('../.qa-tools/node_modules/eslint');
const eslint=new ESLint();const results=await eslint.lintFiles(['src','scripts','eslint.config.mjs']);const formatter=await eslint.loadFormatter('stylish');console.log(formatter.format(results)||'PASS: ESLint syntax and correctness rules.');if(results.some(r=>r.errorCount))process.exitCode=1;
