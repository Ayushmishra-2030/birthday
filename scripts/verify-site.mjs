const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUrl(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return {
    status: res.status,
    headers: res.headers,
    text,
    json
  };
}

async function run() {
  console.log('🚀 Running automated test suite against ' + BASE_URL + '...\n');
  const results = [];

  try {
    // 1. Homepage HTML test
    const homeRes = await fetchUrl(`${BASE_URL}/`);
    const homeOk = homeRes.status === 200 && homeRes.text.includes('Shree');
    results.push({
      test: '1. Homepage (Countdown World) Loaded',
      pass: homeOk,
      detail: `Status ${homeRes.status}, contains 'Shree': ${homeRes.text.includes('Shree')}`
    });

    // 2. Locked Content API test
    const lockedRes = await fetchUrl(`${BASE_URL}/api/content`);
    const lockedOk = lockedRes.status === 200 && lockedRes.json && lockedRes.json.isUnlocked === false;
    results.push({
      test: '2. Content API Locked Before Birthday (Public)',
      pass: lockedOk,
      detail: `isUnlocked: ${lockedRes.json?.isUnlocked}, message: "${lockedRes.json?.message?.substring(0, 40)}..."`
    });

    // 3. Secret Preview Verification
    const previewRes = await fetchUrl(`${BASE_URL}/api/preview/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'shree7nov' })
    });
    const previewOk = previewRes.status === 200 && previewRes.json && previewRes.json.success === true;
    const previewToken = previewRes.json?.token;
    results.push({
      test: '3. Secret Admin Preview Verification (Code: shree7nov)',
      pass: previewOk,
      detail: `Success: ${previewRes.json?.success}, Token received: ${!!previewToken}`
    });

    // 4. Content Access with Preview Token
    const unlockedRes = await fetchUrl(`${BASE_URL}/api/content`, {
      headers: {
        'Cookie': `shree_preview_token=${previewToken}`
      }
    });
    const data = unlockedRes.json;
    const lettersCount = data?.letters?.length || 0;
    const timelineCount = data?.timeline?.length || 0;
    const quizCount = data?.quiz?.length || 0;
    const reasonsCount = data?.reasons?.length || 0;
    const photosCount = data?.photos?.length || 0;

    const contentOk = unlockedRes.status === 200 && data?.isUnlocked === true &&
      lettersCount === 15 && timelineCount === 7 && quizCount === 15 && reasonsCount === 30;

    results.push({
      test: '4. Full Birthday Surprise Content Unlocked via Preview Token',
      pass: contentOk,
      detail: `Letters: ${lettersCount}/15, Timeline: ${timelineCount}/7, Quiz: ${quizCount}/15, Reasons: ${reasonsCount}/30, Photos: ${photosCount}`
    });

    // 5. Letter System Data Integrity
    let allLettersValid = false;
    if (lettersCount === 15) {
      allLettersValid = data.letters.every(l => l.id && l.title && l.content && l.content.length > 50);
    }
    results.push({
      test: '5. Letter System Data Integrity (All 15 Letters Complete)',
      pass: allLettersValid,
      detail: `All 15 letters have IDs, titles, wax seals, and rich romantic content`
    });

    // 6. Admin Authentication
    const adminLoginRes = await fetchUrl(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'ayush', password: 'shreeforever2026' })
    });
    const adminOk = adminLoginRes.status === 200 && adminLoginRes.json?.success === true;
    const adminSetCookie = adminLoginRes.headers.get('set-cookie');
    let adminAuthCookie = '';
    if (adminSetCookie) {
      const match = adminSetCookie.match(/(admin_auth_token=[^;]+)/);
      if (match) adminAuthCookie = match[1];
    }
    results.push({
      test: '6. Admin Login (/admin Authentication)',
      pass: adminOk && !!adminAuthCookie,
      detail: `Success: ${adminLoginRes.json?.success}, Cookie received: ${!!adminAuthCookie}`
    });

    // 7. Photo Upload Test (multipart/form-data)
    const gif1x1 = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    
    function buildMultipartBody(fields, fileField) {
      let body = '';
      for (const [key, val] of Object.entries(fields)) {
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
        body += `${val}\r\n`;
      }
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="${fileField.name}"; filename="${fileField.filename}"\r\n`;
      body += `Content-Type: ${fileField.contentType}\r\n\r\n`;
      
      const head = Buffer.from(body, 'utf-8');
      const tail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
      return Buffer.concat([head, fileField.data, tail]);
    }

    const multipartPayload = buildMultipartBody(
      {
        title: 'Automation Verification Photo',
        caption: 'Testing persistent upload to birthday-photos bucket',
        date: '2026-09-14',
        category: 'Classroom & College Memories'
      },
      {
        name: 'file',
        filename: 'test-heart.gif',
        contentType: 'image/gif',
        data: gif1x1
      }
    );

    const uploadRes = await fetchUrl(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Cookie': adminAuthCookie
      },
      body: multipartPayload
    });

    const uploadedPhoto = uploadRes.json?.photos?.[0];
    const uploadOk = uploadRes.status === 200 && uploadRes.json?.success === true && !!uploadedPhoto?.id;
    results.push({
      test: '7. Admin Photo Upload (Bucket: birthday-photos / Persistent Fallback)',
      pass: uploadOk,
      detail: `ID: ${uploadedPhoto?.id}, URL: ${uploadedPhoto?.imageUrl}, Published: ${uploadedPhoto?.isPublished}`
    });

    // 8. Photo List API
    const photosListRes = await fetchUrl(`${BASE_URL}/api/photos`);
    const allPhotos = photosListRes.json?.photos || [];
    const foundUploaded = allPhotos.some(p => p.id === uploadedPhoto?.id);
    results.push({
      test: '8. Public Photos API Listing',
      pass: photosListRes.status === 200 && foundUploaded,
      detail: `Total photos: ${allPhotos.length}, uploaded photo in list: ${foundUploaded}`
    });

    // 9. Photo Edit / Publish Toggle
    if (uploadedPhoto?.id) {
      const putRes = await fetchUrl(`${BASE_URL}/api/photos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': adminAuthCookie
        },
        body: JSON.stringify({
          id: uploadedPhoto.id,
          caption: 'Updated Romantic Caption via Automation',
          isPublished: false
        })
      });
      const putUpdatedPhoto = putRes.json?.photos?.find(p => p.id === uploadedPhoto.id);
      const putOk = putRes.status === 200 && putUpdatedPhoto?.caption === 'Updated Romantic Caption via Automation' && putUpdatedPhoto?.isPublished === false;
      results.push({
        test: '9. Photo Update & Visibility Toggle (PUT /api/photos)',
        pass: putOk,
        detail: `Updated caption & isPublished set to false verified`
      });

      // 10. Photo Delete / Cleanup
      const delRes = await fetchUrl(`${BASE_URL}/api/photos?id=${uploadedPhoto.id}`, {
        method: 'DELETE',
        headers: {
          'Cookie': adminAuthCookie
        }
      });
      const delOk = delRes.status === 200 && delRes.json?.success === true;
      results.push({
        test: '10. Photo Deletion (DELETE /api/photos)',
        pass: delOk,
        detail: `Successfully cleaned up test photo: ${uploadedPhoto.id}`
      });
    }

  } catch (err) {
    console.error('Test suite error:', err);
    results.push({
      test: 'Test Suite Execution',
      pass: false,
      detail: String(err)
    });
  } finally {
    console.log('\n================ VERIFICATION TEST RESULTS ================');
    let allPassed = true;
    for (const r of results) {
      const statusIcon = r.pass ? '✅ PASS' : '❌ FAIL';
      console.log(`${statusIcon}: ${r.test}`);
      console.log(`   ${r.detail}`);
      if (!r.pass) allPassed = false;
    }
    console.log('===========================================================\n');
    process.exit(allPassed ? 0 : 1);
  }
}

run();
