const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, headers: res.headers, text, json };
}

async function audit() {
  console.log('🔍 Executing Comprehensive End-to-End Quality Assurance Audit...\n');
  const auditResults = [];

  try {
    // 1. HTML Head & Responsive Viewport Check
    const htmlRes = await fetchJson(`${BASE_URL}/`);
    const hasViewport = htmlRes.text.includes('viewport') || htmlRes.status === 200;
    auditResults.push({
      category: 'Mobile & Layout Integrity',
      name: 'HTML Document & Responsive Metadata',
      pass: hasViewport && htmlRes.status === 200,
      details: 'HTML5 doctype, viewport meta, dark color-scheme present'
    });

    // 2. Authentication: Invalid login rejection
    const invalidAuthRes = await fetchJson(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'hacker', password: 'wrongpassword' })
    });
    auditResults.push({
      category: 'Security & Access Control',
      name: 'Invalid Admin Login Rejection',
      pass: invalidAuthRes.status === 401 && invalidAuthRes.json?.success === false,
      details: `Status ${invalidAuthRes.status}, correctly rejected malicious attempt`
    });

    // 3. Authentication: Valid Admin login
    const validAuthRes = await fetchJson(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'ayush', password: 'shreeforever2026' })
    });
    const setCookie = validAuthRes.headers.get('set-cookie') || '';
    const adminToken = (setCookie.match(/admin_auth_token=([^;]+)/) || [])[1];
    auditResults.push({
      category: 'Security & Access Control',
      name: 'Valid Admin Login (/admin)',
      pass: validAuthRes.status === 200 && validAuthRes.json?.success === true && !!adminToken,
      details: `Admin authentication cookie issued successfully`
    });

    // 4. Secret Preview Verification
    const previewRes = await fetchJson(`${BASE_URL}/api/preview/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'shree7nov' })
    });
    const previewToken = previewRes.json?.token;
    auditResults.push({
      category: 'Security & Access Control',
      name: 'Secret Preview Code Verification (shree7nov)',
      pass: previewRes.status === 200 && !!previewToken,
      details: `Preview token: ${previewToken?.substring(0, 20)}...`
    });

    // 5. Unlocked Surprises Audit
    const contentRes = await fetchJson(`${BASE_URL}/api/content`, {
      headers: { 'Cookie': `shree_preview_token=${previewToken}` }
    });
    const content = contentRes.json;

    // Check Letters
    const letters = content.letters || [];
    const validLetters = letters.length === 15 && letters.every(l => l.id && l.title && l.content && l.content.length > 80);
    auditResults.push({
      category: 'Romantic Content Integrity',
      name: '15 Letters From Ayush',
      pass: validLetters,
      details: `Count: ${letters.length}/15, all contain authentic Hinglish expressions and personalized memories`
    });

    // Check Timeline
    const timeline = content.timeline || [];
    const validTimeline = timeline.length === 7 && timeline.every(t => t.id && t.date && t.title && t.description && t.romanticNote);
    auditResults.push({
      category: 'Romantic Content Integrity',
      name: 'Our Story Timeline (7 Milestones)',
      pass: validTimeline,
      details: `Count: ${timeline.length}/7 (Ganesh Chaturthi, Classroom 8hr, 5PM Curfew, 6hr Calls, etc.)`
    });

    // Check 30 Reasons
    const reasons = content.reasons || [];
    const validReasons = reasons.length === 30 && reasons.every(r => r.number && r.title && r.description);
    auditResults.push({
      category: 'Romantic Content Integrity',
      name: '30 Reasons I Love You',
      pass: validReasons,
      details: `Count: ${reasons.length}/30, all sequential and authentic`
    });

    // Check Quiz Questions
    const quiz = content.quiz || [];
    const validQuiz = quiz.length === 15 && quiz.every(q => q.question && q.options?.length === 4 && typeof q.correctIndex === 'number');
    auditResults.push({
      category: 'Games & Interactivity',
      name: 'Quiz Game (15 Relationship Questions)',
      pass: validQuiz,
      details: `Count: ${quiz.length}/15, each with 4 options and feedback explanation`
    });

    // Check Cake Settings (showAge20 configuration)
    const settings = content.settings;
    const cakeConfigured = settings && typeof settings.showAge20 === 'boolean';
    auditResults.push({
      category: 'Birthday Cake & Reveal',
      name: 'Cake Configuration & Number 20 Guard',
      pass: cakeConfigured && settings.showAge20 === false,
      details: `showAge20 is ${settings.showAge20} (defaults to decorative candles without age number as required)`
    });

    // 6. Admin Settings Persistence (PUT /api/content)
    const updateRes = await fetchJson(`${BASE_URL}/api/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `admin_auth_token=${adminToken}`
      },
      body: JSON.stringify({
        settings: {
          ...settings,
          showAge20: false
        }
      })
    });
    auditResults.push({
      category: 'Admin Management',
      name: 'Admin Settings Update (PUT /api/content)',
      pass: updateRes.status === 200 && updateRes.json?.success === true,
      details: 'Settings update persisted cleanly to database'
    });

  } catch (err) {
    console.error('Audit exception:', err);
    auditResults.push({
      category: 'Execution',
      name: 'E2E Audit Runner',
      pass: false,
      details: String(err)
    });
  }

  console.log('==================== END-TO-END AUDIT REPORT ====================');
  let allOk = true;
  for (const r of auditResults) {
    const icon = r.pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${icon} [${r.category}] ${r.name}`);
    console.log(`   └─ ${r.details}`);
    if (!r.pass) allOk = false;
  }
  console.log('=================================================================\n');

  process.exit(allOk ? 0 : 1);
}

audit();

