import fs from 'node:fs';
const report=JSON.parse(fs.readFileSync('qa/release-readiness.json','utf8'));
if(!report.releaseReady){console.log('PUBLIC RELEASE NOT APPROVED:\n'+report.issues.map(issue=>'- '+issue).join('\n'));process.exitCode=1;}else console.log('Release requirements satisfied.');
