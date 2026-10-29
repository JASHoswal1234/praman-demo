// Lightweight browser-free smoke test for the dependency-free demo.
// Run with: node smoke_test.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { webcrypto } = require('node:crypto');
const { TextEncoder } = require('node:util');

async function run() {
  const storage = new Map();
  const root = { innerHTML: '' };
  const document = {
    title: '',
    documentElement: { classList: { add() {}, toggle() {}, contains() { return false; } } },
    querySelector(selector) { return selector === '#app' ? root : { innerHTML: '', addEventListener() {}, focus() {} }; },
    addEventListener() {},
  };
  const context = {
    document, window: { addEventListener() {}, scrollTo() {} },
    storage, root, process,
    location: { pathname: '/app/overview', search: '' },
    history: { pushState(_state, _title, path) { context.location.pathname = path; context.location.search = ''; } },
    localStorage: { getItem(key) { return storage.get(key) ?? null; }, setItem(key, value) { storage.set(key, String(value)); } },
    crypto: webcrypto, TextEncoder, console, Intl, Date, URLSearchParams,
    setTimeout, clearTimeout,
  };
  const source = fs.readFileSync('app.js', 'utf8');
  const checks = `
    (async () => {
      await ensureFingerprints();
      if (ROLE_OPTIONS.length !== 4 || ROLE_OPTIONS.join('|') !== 'Institution User|Regional Officer|AICTE Officer|Bank Verifier') throw Error('The four required roles are not configured exactly');
      role='Institution User';
      if (visibleFdrs().some(f=>f.institution!=='Aarohan Institute of Technology') || canAccessFdr(getFdr('fdr-1043'))) throw Error('Institution scope includes another institution');
      if (await service.requestVerification('fdr-1042') || service.clearance('rel-1042',0,'unauthorized') || service.checker('rel-1042','unauthorized')) throw Error('Institution role performed an unauthorized reviewer action');
      role='Regional Officer';
      if (visibleFdrs().some(f=>f.regionId!=='Maharashtra') || canAccessFdr(getFdr('fdr-1043'))) throw Error('Regional scope includes an out-of-region instrument');
      if (service.clearance('rel-1042',0,'unauthorized') || service.checker('rel-1042','unauthorized')) throw Error('Regional Officer performed an AICTE-only action');
      role='Bank Verifier';
      if (visibleFdrs().some(f=>!state.verifications.some(v=>v.fdrId===f.id&&v.assignedVerifierId===BANK_VERIFIER_ID)&&!state.releases.some(r=>r.fdrId===f.id&&r.assignedBankVerifierId===BANK_VERIFIER_ID))) throw Error('Bank Verifier scope contains an unassigned FDR');
      location.pathname='/demo';render();if((root.innerHTML.match(/name="role"/g)||[]).length!==4||!root.innerHTML.includes('Regional Officer')||!root.innerHTML.includes('Bank Verifier'))throw Error('Four-role entry screen is incomplete');
      location.pathname='/app/fdrs';render();if(!root.innerHTML.includes('Register unavailable'))throw Error('Bank Verifier can open the global FDR register');
      location.pathname='/app/fdrs/fdr-1043';render();if(root.innerHTML.includes('Linked evidence graph'))throw Error('Bank Verifier can open unrelated FDR detail');
      location.pathname='/app/verification';render();if(!root.innerHTML.includes('Assigned verification requests'))throw Error('Bank Verifier queue did not render');
      const assigned=state.verifications[0].assignedVerifierId;state.verifications[0].assignedVerifierId='other-verifier';
      if (visibleVerifications().some(v=>v.id===state.verifications[0].id) || service.bankResponse(state.verifications[0].id,'Confirmed in demo data','unauthorized')) throw Error('Bank Verifier accessed or changed an unassigned request');
      state.verifications[0].assignedVerifierId=assigned;
      role='AICTE Officer';
      if (!state.documents.every(d => /^[0-9a-f]{64}$/.test(d.hash))) throw Error('Seed files did not receive SHA-256 fingerprints');
      location.pathname='/app/overview';location.search='';
      render(); if (!document.querySelector('#app').innerHTML.includes('Release-readiness radar') || !root.innerHTML.includes('Portfolio under oversight') || !root.innerHTML.includes('assistant-launcher')) throw Error('Overview KPI, radar, or global assistant did not render');
      assistantOpen=true;assistantAnswerKey='mismatch';render();if(!root.innerHTML.includes('PRAMAAN keeps both values visible')||!root.innerHTML.includes('Inspect evidence passport'))throw Error('Floating assistant hardcoded response did not render');assistantOpen=false;assistantAnswerKey=null;
      for(const [path,needle] of [['/app/fdrs','FDR Register'],['/app/scrutiny','Scrutiny &amp; Exceptions'],['/app/verification','Bank Verification Queue'],['/app/maturities','Maturity &amp; Renewals'],['/app/releases','Release Workflow'],['/app/releases/rel-1042','Release review'],['/app/audit','Audit Trail'],['/app/policy','Policy Copilot'],['/app/settings','Settings &amp; Demo Controls']]){location.pathname=path;render();if(!root.innerHTML.includes(needle))throw Error('Required route did not render: '+path+' as '+role+'; '+root.innerHTML.slice(0,700))}
      role='Institution User';location.pathname='/app/submit';render();if(!root.innerHTML.includes('Submit an FDR'))throw Error('Institution submission wizard did not render');role='AICTE Officer';location.pathname='/app/overview';
      location.pathname='/login'; location.search=''; authMode='login'; render(); if(!root.innerHTML.includes('id="auth-login-form"')||!root.innerHTML.includes('id="auth-password"')||root.innerHTML.includes('Verified with evidence.')) throw Error('Login route is missing its form or includes excluded marketing copy');
      authMode='signup'; render(); if(!root.innerHTML.includes('id="auth-signup-form"')||!root.innerHTML.includes('id="auth-confirm-password"')) throw Error('Sign-up form did not render');
      location.pathname='/demo'; authMode='login';
      location.pathname='/app/fdrs/fdr-1043'; render(); if (!root.innerHTML.includes('Linked evidence graph') || !root.innerHTML.includes('Document versions & integrity')) throw Error('FDR passport evidence view did not render');
      navigate('/app/reconciliation'); if (!document.querySelector('#app').innerHTML.includes('Verified value coverage')) throw Error('Reconciliation route did not render');
      const initialAudit = state.audit.length;
      if (!service.reconcile() || state.reconciliations.length !== state.fdrs.length) throw Error('Reconciliation did not record each portal instrument');
      if (!state.reconciliations.some(x=>x.fdrId==='fdr-1043'&&x.issues.some(i=>i.includes('Amount differs'))) || !state.reconciliations.some(x=>x.fdrId==='fdr-1047'&&x.issues.some(i=>i.includes('Discharged')))) throw Error('Ledger mismatch signals were not derived');
      const escalations = service.dailySweep(); if (escalations < 1) throw Error('Daily sweep did not surface seeded maturity risk');
      role='Bank Verifier';const mismatchedRequest=state.verifications.find(v=>v.fdrId==='fdr-1043'&&v.status==='Awaiting bank response');const oldConfirmation=getFdr('fdr-1043').lastConfirmed;if(!mismatchedRequest||!service.bankResponse(mismatchedRequest.id,'Confirmed in demo data','Check for mismatch despite selected confirmation outcome')||getFdr('fdr-1043').status!=='Discrepancy detected — needs review'||getFdr('fdr-1043').verification==='Confirmed in demo data'||getFdr('fdr-1043').lastConfirmed!==oldConfirmation)throw Error('Mismatched bank-side fixture was incorrectly marked confirmed');
      role = 'AICTE Officer'; await service.requestVerification('fdr-1045');
      const request = state.verifications.find(v => v.fdrId === 'fdr-1045' && v.status === 'Awaiting bank response');
      if (!request || !request.expires || !request.documentFingerprint || request.consumed) throw Error('Single-use, expiring, fingerprint-bound request incomplete');
      role = 'Bank Verifier'; if (!service.bankResponse(request.id, 'Mismatch found', 'Synthetic mismatch smoke test')) throw Error('Bank response failed');
      if (!request.consumed || request.responseFingerprint !== request.documentFingerprint || !request.response.holder || !request.response.ifsc || !state.findings.some(f => f.fdrId === 'fdr-1045')) throw Error('Response fields, one-use state, fingerprint or finding missing');
      if (!state.findings.find(f=>f.fdrId==='fdr-1045'&&f.title.includes('Simulated bank'))?.description.includes('maturity') || !state.findings.find(f=>f.fdrId==='fdr-1045'&&f.title.includes('Simulated bank'))?.description.includes('ifsc')) throw Error('Explainable bank field mismatches were not listed');
      location.pathname='/app/fdrs/fdr-1045'; role='AICTE Officer'; render(); if (!root.innerHTML.includes('Simulated bank response') || !root.innerHTML.includes(request.documentFingerprint)) throw Error('Bank response did not update passport/evidence UI: '+root.innerHTML.slice(-1600));
      if (service.bankResponse(request.id, 'Confirmed in demo data', 'second use')) throw Error('Consumed request accepted a second response');
      role = 'AICTE Officer'; const before = state.documents.find(d => d.fdrId === 'fdr-1042');
      if (!service.simulateReplacement('fdr-1042')) throw Error('Document replacement action failed'); await ensureFingerprints();
      const versions = state.documents.filter(d => d.fdrId === 'fdr-1042').sort((a,b) => a.version-b.version);
      if (versions.length !== 2 || versions[1].previousHash !== before.hash || versions[1].hash === before.hash) throw Error('Version hash history did not link');
      state.documents.push({id:'duplicate-copy',fdrId:'fdr-1043',version:9,filename:'duplicate-copy.pdf',content:'same bytes',hash:versions[0].hash,created:iso(DEMO_DATE)}); await ensureFingerprints(); if(!state.findings.some(f=>f.fdrId==='fdr-1043'&&f.title.toLowerCase().includes('fingerprint reused'))) throw Error('Reused document fingerprint was not flagged');
      const release = state.releases.find(r => r.id === 'rel-1042'); role='AICTE Officer'; reviewerIdentity='M. Iyer';
      if (!service.recommend(release.id, 'maker test')) throw Error('Maker action failed');
      if (service.checker(release.id, 'same actor')) throw Error('Same simulated actor completed checker step');
      reviewerIdentity='S. Kulkarni'; if (!service.checker(release.id, 'different checker')) throw Error('Different checker was blocked');
      role='Bank Verifier'; if (!service.bankExecute(release.id, 'simulated execution test') || !release.status.includes('Resolved in demo')) throw Error('Bank execution confirmation did not resolve demo case');
      if (state.audit.length < initialAudit + 6) throw Error('Mutations did not create expected audit events');
      role='AICTE Officer'; location.pathname='/app/policy'; render(); if (!root.innerHTML.includes('PRAMAAN Copilot') || !root.innerHTML.includes('v1.1')) throw Error('Versioned policy and assistant view missing');
      role='Institution User'; const duplicate=service.submit({reference:'FDR/26/1042',institution:'Synthetic Test College',programme:'Engineering',bank:'State Bank of Deccan',branch:'Sample Branch',ifsc:'SBDK0000421',holder:'Synthetic Test College',amount:1000000,declaredAmount:1000000,issue:'2026-10-25',maturity:'2028-10-25',lien:'AICTE'}); if (!duplicate || duplicate.institution!=='Aarohan Institute of Technology' || !state.findings.some(x=>x.fdrId===duplicate.id&&x.title.includes('Duplicate FDR identifier'))) throw Error('Submission tenant assignment or duplicate ID finding failed');
      role='Regional Officer';if(!service.disposition(state.findings.find(x=>x.fdrId===duplicate.id&&x.status==='Open').id,'Correction requested','Please correct the submitted values.'))throw Error('Regional Officer could not request an in-scope correction');
      role='Institution User';if(!service.respondToCorrection(duplicate.id,{holder:'Aarohan Institute of Technology',declaredAmount:1000000,lien:'AICTE security deposit',response:'Corrected holder and lien details.'})||getFdr(duplicate.id).status!=='Institution response submitted — awaiting review')throw Error('Institution correction response did not update the same case');
      role='Regional Officer';location.pathname='/app/scrutiny';render();const returnedFinding=state.findings.find(x=>x.fdrId===duplicate.id&&x.status==='Institution responded — awaiting review');if(!root.innerHTML.includes(duplicate.reference)||!returnedFinding||!service.disposition(returnedFinding.id,'Reviewed — monitor','Follow-up review complete.'))throw Error('Correction response did not return to the regional review queue');
      role='Institution User';const releaseRequest=service.requestRelease(duplicate.id,'Request release review after the required review period.');if(!releaseRequest||releaseRequest.status!=='Pending clearances'||service.requestRelease(duplicate.id,'duplicate'))throw Error('Institution release request or duplicate guard failed');if(!loadState().fdrs.some(f=>f.id===duplicate.id)||!state.audit.some(e=>e.target===duplicate.reference&&e.action==='Institution release review requested'))throw Error('Mutations did not persist or link to audit history');
      role='AICTE Officer';service.reset(); if (state.fdrs.length !== 6 || state.documents.length !== 6 || state.reconciliations.length) throw Error('Reset did not restore seed state');
      role='AICTE Officer'; await service.requestVerification('fdr-1044'); const expired=state.verifications.find(v=>v.fdrId==='fdr-1044'); expired.expires=iso('2026-10-24'); role='Bank Verifier'; if(service.bankResponse(expired.id,'Confirmed in demo data','expired')) throw Error('Expired request was accepted');
      role='AICTE Officer'; await service.requestVerification('fdr-1047'); const bound=state.verifications.find(v=>v.fdrId==='fdr-1047'); const confirmedBefore=state.fdrs.find(f=>f.id==='fdr-1047').lastConfirmed; service.simulateReplacement('fdr-1047'); await ensureFingerprints(); role='Bank Verifier'; if(!service.bankResponse(bound.id,'Confirmed in demo data','copy changed during request')||!bound.documentChangedSinceRequest||state.fdrs.find(f=>f.id==='fdr-1047').lastConfirmed!==confirmedBefore) throw Error('Changed document was incorrectly treated as fresh confirmation');
      crypto=undefined; const fallback=await fingerprint('document'); if(!fallback.value.startsWith('DEMO-SHA256-FALLBACK-')||!fallback.method.includes('fallback')) throw Error('Deterministic hash fallback was not labelled');
      storage.set(STORE_KEY, '{ malformed'); if (loadState().fdrs.length !== 6) throw Error('Malformed browser storage did not fall back to seed data');
      localStorage = { getItem() { throw Error('storage disabled'); }, setItem() { throw Error('storage disabled'); } };
      if (loadState().fdrs.length !== 6) throw Error('Unavailable browser storage did not fall back to seed data');
      console.log('Smoke checks passed: four-role scopes and route rendering, institution correction/release requests, seed SHA-256 and labelled fallback, reconciliation and monitoring, single-use verification, mismatch-safe confirmation, passport propagation, changed-copy invalidation, document version history, maker/checker separation, simulated bank execution, audit, persistence, reset, malformed/unavailable storage fallback.');
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `;
  vm.runInNewContext(`${source}\n${checks}`, context, { filename: 'app.js' });
}
run();
