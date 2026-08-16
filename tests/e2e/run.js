/*
 * SecondariesMatch — end-to-end test suite.
 * Drives index.html and analytics.html in headless Chromium via Playwright,
 * exercising every activation-playbook flow shipped in js/app.js + index.html.
 * Run with: npm run test:e2e (or `node tests/e2e/run.js`)
 */
const path = require('node:path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { startServer } = require('./server');

const ROOT = path.join(__dirname, '..', '..');
const PORT = 8919;
const BASE = `http://127.0.0.1:${PORT}`;

const tests = [];
function test(name, fn){ tests.push({ name, fn }); }

// ---------------------------------------------------------------------
// core marketplace
// ---------------------------------------------------------------------

test('page loads with hero, marketplace, and all sections present', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Where private market secondaries are priced');
  for (const sel of ['#marketplace', '#how-it-works', '#security', '#insights', 'footer']) {
    const count = await page.locator(sel).count();
    if (count === 0) throw new Error(`missing section ${sel}`);
  }
  const rowCount = await page.locator('.t-row').count();
  if (rowCount !== 8) throw new Error(`expected 8 fund rows, got ${rowCount}`);
});

test('asset-class tabs switch table columns', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.click('#asset-tabs button[data-asset="direct"]');
  const directHead = await page.locator('.t-head').innerText();
  if (!directHead.includes('Round / Security')) throw new Error('direct columns did not render');
  await page.click('#asset-tabs button[data-asset="real"]');
  const realHead = await page.locator('.t-head').innerText();
  if (!realHead.includes('Asset / Portfolio')) throw new Error('real-asset columns did not render');
});

test('search filters rows by name', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.fill('#f-search', 'Meridian');
  await page.waitForTimeout(100);
  const names = await page.locator('.row-primary').allInnerTexts();
  if (names.length !== 1 || !names[0].includes('Meridian')) throw new Error(`unexpected search results: ${JSON.stringify(names)}`);
});

test('row click opens the detail drawer with matching data', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.fill('#f-search', 'Meridian');
  await page.waitForTimeout(100);
  await page.click('.t-row >> nth=0');
  await page.waitForTimeout(150);
  const active = await page.locator('#drawer.active').count();
  if (active !== 1) throw new Error('drawer did not open');
  const name = await page.locator('#drawer-name').innerText();
  if (!name.includes('Meridian')) throw new Error(`drawer showed wrong listing: ${name}`);
});

test('live listing signals (bidders viewing / days to close) render for open listings', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  const secondary = await page.locator('.row-secondary').first().innerText();
  if (!/bidders viewing/.test(secondary)) throw new Error(`expected bidders-viewing signal in: ${secondary}`);
});

test('the "New" pill appears on the addedRecently listing', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  const newPillCount = await page.locator('.pill.new').count();
  if (newPillCount < 1) throw new Error('expected at least one "New" pill on the fund tab');
});

// ---------------------------------------------------------------------
// bid modal + verify-once gate
// ---------------------------------------------------------------------

test('first bid ever requires the one-time verification step; second bid skips it', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  // first bid: drawer -> submit -> verify step should appear
  await page.click('.t-row >> nth=0');
  await page.click('#drawer-action');
  await page.waitForTimeout(100);
  await page.fill('#m-bid-value', '92');
  await page.fill('#m-close-date', 'Q4 2026');
  await page.click('#m-primary');
  await page.waitForTimeout(100);
  const verifyVisible = await page.locator('#modal-step-verify').isVisible();
  if (!verifyVisible) throw new Error('expected the verify step to show on a member\'s first-ever bid');

  const primaryDisabled = await page.locator('#m-primary').isDisabled();
  if (!primaryDisabled) throw new Error('verify step should start disabled until the accreditation checkbox is ticked');
  await page.check('#m-accred-ack');
  await page.click('#m-primary'); // -> nda
  await page.waitForTimeout(100);
  await page.check('#m-nda-ack');
  await page.click('#m-primary'); // -> review
  await page.waitForTimeout(100);
  const summary = await page.locator('.summary-card').innerText();
  if (!summary.includes('92')) throw new Error(`review summary missing bid value: ${summary}`);
  await page.click('#m-primary'); // submit -> confirm
  await page.waitForTimeout(100);
  const confirmText = await page.locator('#m-confirm-text').innerText();
  if (!/Reference #SM-\d+/.test(confirmText)) throw new Error(`missing reference number in: ${confirmText}`);
  await page.click('#m-done');

  const verified = await page.evaluate(() => localStorage.getItem('sm_verified'));
  if (verified !== 'true') throw new Error('sm_verified was not persisted after completing the verify step');

  // second bid on a different listing: verify step must be skipped
  await page.click('#drawer-close');
  await page.click('.t-row >> nth=1');
  await page.click('#drawer-action');
  await page.waitForTimeout(100);
  const stepLabel = await page.locator('#modal-step-label').innerText();
  if (stepLabel.toLowerCase() !== 'step 1 of 3') throw new Error(`expected 3 total steps (verify skipped) on a repeat bid, got label: ${stepLabel}`);
  await page.fill('#m-bid-value', '85');
  await page.fill('#m-close-date', 'Q1 2027');
  await page.click('#m-primary');
  await page.waitForTimeout(100);
  const nowVisible = await page.locator('#modal-step-nda').isVisible();
  if (!nowVisible) throw new Error('second bid should go straight from bid terms to NDA, skipping verify');
});

test('a submitted bid appears in the My Activity panel', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.fill('#f-search', 'Meridian');
  await page.waitForTimeout(100);
  await page.click('.t-row >> nth=0');
  await page.click('#drawer-action');
  await page.fill('#m-bid-value', '92');
  await page.fill('#m-close-date', 'Q4 2026');
  await page.click('#m-primary');
  await page.check('#m-accred-ack');
  await page.click('#m-primary');
  await page.check('#m-nda-ack');
  await page.click('#m-primary');
  await page.click('#m-primary');
  await page.click('#m-done');
  await page.click('#drawer-close'); // the modal returns to the underlying drawer by design; close it before using nav

  await page.click('#open-activity');
  await page.waitForTimeout(100);
  const bidsHtml = await page.locator('#activity-bids').innerText();
  if (!bidsHtml.includes('Meridian')) throw new Error(`activity panel missing submitted bid: ${bidsHtml}`);
});

// ---------------------------------------------------------------------
// data room request
// ---------------------------------------------------------------------

test('requesting a data room updates the button state and activity log', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.fill('#f-search', 'Meridian');
  await page.waitForTimeout(100);
  await page.click('.t-row >> nth=0');
  await page.click('#drawer-request-room');
  await page.waitForTimeout(100);
  const label = await page.locator('#drawer-request-room').innerText();
  if (!label.includes('Requested')) throw new Error(`expected requested state, got: ${label}`);
  const disabled = await page.locator('#drawer-request-room').isDisabled();
  if (!disabled) throw new Error('data room button should be disabled after requesting');

  await page.click('#drawer-close');
  await page.click('#open-activity');
  await page.waitForTimeout(100);
  const roomsHtml = await page.locator('#activity-rooms').innerText();
  if (!roomsHtml.includes('Meridian')) throw new Error(`activity panel missing data room request: ${roomsHtml}`);
});

// ---------------------------------------------------------------------
// mandate-intent capture + price band + personalization
// ---------------------------------------------------------------------

test('mandate capture shows a live price band and personalizes the marketplace', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  await page.click('#open-mandate-nav');
  await page.waitForTimeout(100);
  await page.selectOption('#mandate-asset-class', 'direct');
  await page.selectOption('#mandate-check-size', '<$5M');
  await page.click('#mandate-primary');
  await page.waitForTimeout(100);
  const bandText = await page.locator('#mandate-band-range').innerText();
  if (!/\d+.*\d+/.test(bandText)) throw new Error(`price band did not render a range: ${bandText}`);
  const specialistVisible = await page.locator('#mandate-specialist-note').isVisible();
  if (specialistVisible) throw new Error('specialist note should not show for a sub-$10M mandate');

  await page.click('#mandate-primary'); // finish
  await page.waitForTimeout(200);
  const activeTab = await page.locator('#asset-tabs button.active').getAttribute('data-asset');
  if (activeTab !== 'direct') throw new Error(`expected marketplace personalized to direct, got ${activeTab}`);
  const banner = await page.locator('#personalized-banner').innerText();
  if (!banner.includes('Personalized for your mandate')) throw new Error(`personalization banner missing: ${banner}`);

  const mandate = await page.evaluate(() => JSON.parse(localStorage.getItem('sm_mandate')));
  if (!mandate || mandate.assetClass !== 'direct') throw new Error('mandate was not persisted correctly');
});

test('a $10M+ mandate shows the specialist routing message', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#open-mandate-nav');
  await page.selectOption('#mandate-check-size', '$10M+');
  await page.click('#mandate-primary');
  await page.waitForTimeout(100);
  const note = await page.locator('#mandate-specialist-note').innerText();
  if (!/specialist will reach out today/i.test(note)) throw new Error(`missing specialist note: ${note}`);
});

test('a saved mandate personalizes the marketplace on a later visit', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => localStorage.setItem('sm_mandate', JSON.stringify({ assetClass:'real', checkSize:'<$5M', sector:'any', ts: Date.now() })));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(150);
  const activeTab = await page.locator('#asset-tabs button.active').getAttribute('data-asset');
  if (activeTab !== 'real') throw new Error(`expected returning visit personalized to real assets, got ${activeTab}`);
});

// ---------------------------------------------------------------------
// save-a-search + return-trigger banner
// ---------------------------------------------------------------------

test('saving a search creates a chip and persists across reload', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.selectOption('#f-sector', 'Healthcare & Life Sciences');
  await page.click('#f-save');
  await page.waitForTimeout(100);
  const chipCount = await page.locator('#saved-row .chip').count();
  if (chipCount !== 1) throw new Error(`expected 1 saved-search chip, got ${chipCount}`);

  await page.reload({ waitUntil: 'domcontentloaded' });
  const chipCountAfterReload = await page.locator('#saved-row .chip').count();
  if (chipCountAfterReload !== 1) throw new Error('saved search did not persist across reload');
});

test('a new-match banner appears when a saved mandate matches an addedRecently listing', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => localStorage.setItem('sm_saved_mandates', JSON.stringify([{ assetClass:'fund', sector:'All', status:'All', ts: Date.now() }])));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(150);
  const banner = await page.locator('#new-match-banner').innerText();
  if (!/new listing/i.test(banner)) throw new Error(`expected new-match banner text, got: "${banner}"`);

  const dismissBtn = page.locator('#dismiss-new-match');
  if (await dismissBtn.count()) {
    await dismissBtn.click();
    await page.waitForTimeout(100);
    const bannerAfter = await page.locator('#new-match-banner').innerText();
    if (bannerAfter.trim() !== '') throw new Error('banner should be empty after dismissing');
  }
});

// ---------------------------------------------------------------------
// invite + digest
// ---------------------------------------------------------------------

test('invite modal shows a stable referral link', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#open-activity');
  await page.click('#activity-invite');
  await page.waitForTimeout(100);
  const link1 = await page.locator('#invite-link').innerText();
  if (!link1.includes('ref=SM-')) throw new Error(`unexpected referral link format: ${link1}`);
  await page.click('#invite-close');
  await page.click('#activity-invite');
  const link2 = await page.locator('#invite-link').innerText();
  if (link1 !== link2) throw new Error('referral link should be stable across opens');
});

test('digest opt-in persists across reload', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#open-activity');
  await page.check('#digest-opt-in');
  await page.waitForTimeout(100);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#open-activity');
  const checked = await page.locator('#digest-opt-in').isChecked();
  if (!checked) throw new Error('digest opt-in did not persist');
});

// ---------------------------------------------------------------------
// funnel dashboard
// ---------------------------------------------------------------------

test('analytics dashboard reflects events logged from the main site', async ({ page }) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  await page.click('#open-mandate-nav');
  await page.click('#mandate-primary');
  await page.click('#mandate-primary');
  await page.waitForTimeout(100);

  await page.click('.t-row >> nth=0');
  await page.click('#drawer-request-room');
  await page.waitForTimeout(100);

  await page.goto(`${BASE}/analytics.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(100);
  const funnelText = await page.locator('#funnel').innerText();
  if (!/Mandate captured at sign-up/.test(funnelText)) throw new Error('funnel dashboard missing expected step label');
  const rows = await page.locator('.funnel-row').count();
  if (rows !== 6) throw new Error(`expected 6 funnel rows, got ${rows}`);
  const eventsText = await page.locator('#events').innerText();
  if (!/mandate_captured/.test(eventsText) || !/data_room_requested/.test(eventsText)) {
    throw new Error(`events table missing expected event types: ${eventsText}`);
  }
});

// ---------------------------------------------------------------------
// runner
// ---------------------------------------------------------------------

async function main(){
  const server = await startServer(ROOT, PORT);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });

  let passed = 0, failed = 0;
  const failures = [];

  for (const { name, fn } of tests) {
    const context = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
    await context.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => consoleErrors.push('pageerror: ' + err.message));

    try {
      await fn({ page });
      const realErrors = consoleErrors.filter(e => !/fonts\.googleapis|ERR_CONNECTION_RESET|net::ERR_/i.test(e));
      if (realErrors.length) throw new Error('console errors: ' + JSON.stringify(realErrors));
      console.log(`ok - ${name}`);
      passed++;
    } catch (err) {
      console.log(`FAIL - ${name}`);
      console.log(`       ${err.message}`);
      failed++;
      failures.push(name);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n${passed} passed, ${failed} failed, ${tests.length} total`);
  if (failed > 0) {
    console.log('Failed: ' + failures.join(', '));
    process.exit(1);
  }
}

main().catch(err => { console.error('FATAL', err); process.exit(1); });
