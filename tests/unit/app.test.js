const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const App = require(path.join(__dirname, '..', '..', 'js', 'app.js'));

// ---------------------------------------------------------------------
// statusMeta
// ---------------------------------------------------------------------

test('statusMeta returns the right label/color for each known status', () => {
  assert.equal(App.statusMeta('open').label, 'Open for Bids');
  assert.equal(App.statusMeta('closing').label, 'Closing Soon');
  assert.equal(App.statusMeta('under_offer').label, 'Under Offer');
  assert.equal(App.statusMeta('closed').label, 'Bidding Closed');
});

test('statusMeta falls back to "open" for an unknown status code', () => {
  assert.equal(App.statusMeta('bogus').label, 'Open for Bids');
});

// ---------------------------------------------------------------------
// getDataset
// ---------------------------------------------------------------------

test('getDataset returns the matching dataset for each asset class', () => {
  assert.equal(App.getDataset('fund'), App.fundData);
  assert.equal(App.getDataset('direct'), App.directData);
  assert.equal(App.getDataset('real'), App.realData);
});

// ---------------------------------------------------------------------
// matches
// ---------------------------------------------------------------------

test('matches filters by case-insensitive name search', () => {
  const row = App.fundData.find(r => r.id === 1); // Meridian Capital Partners VII
  assert.equal(App.matches(row, { assetClass:'fund', search:'meridian' }), true);
  assert.equal(App.matches(row, { assetClass:'fund', search:'MERIDIAN' }), true);
  assert.equal(App.matches(row, { assetClass:'fund', search:'nonexistent' }), false);
});

test('matches filters by sector and status', () => {
  const row = App.fundData.find(r => r.id === 1); // Healthcare & Life Sciences, open
  assert.equal(App.matches(row, { assetClass:'fund', sector:'Healthcare & Life Sciences' }), true);
  assert.equal(App.matches(row, { assetClass:'fund', sector:'Venture' }), false);
  assert.equal(App.matches(row, { assetClass:'fund', status:'open' }), true);
  assert.equal(App.matches(row, { assetClass:'fund', status:'closed' }), false);
  assert.equal(App.matches(row, { assetClass:'fund', sector:'All', status:'All' }), true);
});

test('matches applies vintage range only outside the direct asset class', () => {
  const row = App.fundData.find(r => r.id === 1); // vintage 2017
  assert.equal(App.matches(row, { assetClass:'fund', vintageMin:'2018', vintageMax:'' }), false);
  assert.equal(App.matches(row, { assetClass:'fund', vintageMin:'2010', vintageMax:'2020' }), true);
  // direct listings have no `vintage` field — the vintage filter must be skipped, not crash or exclude
  const directRow = App.directData[0];
  assert.equal(App.matches(directRow, { assetClass:'direct', vintageMin:'2018', vintageMax:'' }), true);
});

test('matches applies the NAV range against lastRoundVal for direct stakes', () => {
  const directRow = App.directData.find(r => r.id === 1); // lastRoundVal 1200
  assert.equal(App.matches(directRow, { assetClass:'direct', navMin:'1000', navMax:'1500' }), true);
  assert.equal(App.matches(directRow, { assetClass:'direct', navMin:'1300', navMax:'' }), false);
  const fundRow = App.fundData.find(r => r.id === 1); // nav 84.2
  assert.equal(App.matches(fundRow, { assetClass:'fund', navMin:'80', navMax:'90' }), true);
  assert.equal(App.matches(fundRow, { assetClass:'fund', navMin:'90', navMax:'' }), false);
});

// ---------------------------------------------------------------------
// mapRow
// ---------------------------------------------------------------------

test('mapRow formats fund rows with % of NAV pricing and marks closed listings disabled', () => {
  const open = App.mapRow(App.fundData.find(r => r.id === 1), 'fund');
  assert.equal(open.askDisplay, '93%');
  assert.equal(open.navDisplay, '$84.2M');
  assert.equal(open.actionLabel, 'Submit a Bid');
  assert.equal(open.actionDisabled, false);

  const closed = App.mapRow(App.fundData.find(r => r.id === 7), 'fund');
  assert.equal(closed.actionDisabled, true);
  assert.equal(closed.actionLabel, 'Bidding Closed');
  assert.equal(closed.biddersViewing, null);
  assert.equal(closed.daysToClose, null);
});

test('mapRow formats direct-stake rows with implied-percentage pricing', () => {
  const row = App.mapRow(App.directData.find(r => r.id === 1), 'direct');
  assert.equal(row.askDisplay, '79% implied');
  assert.equal(row.navDisplay, '$1200M');
  assert.equal(row.actionLabel, 'Submit an Offer');
});

test('mapRow surfaces the addedRecently flag for personalization/return-trigger use', () => {
  const flagged = App.mapRow(App.fundData.find(r => r.id === 6), 'fund');
  const notFlagged = App.mapRow(App.fundData.find(r => r.id === 1), 'fund');
  assert.equal(flagged.addedRecently, true);
  assert.equal(notFlagged.addedRecently, false);
});

// ---------------------------------------------------------------------
// sortRows
// ---------------------------------------------------------------------

test('sortRows sorts numerically by nav, ask, and vintage in both directions', () => {
  const byNavDesc = App.sortRows(App.fundData, 'nav', 'desc');
  for (let i = 1; i < byNavDesc.length; i++) assert.ok(byNavDesc[i-1].nav >= byNavDesc[i].nav);

  const byNavAsc = App.sortRows(App.fundData, 'nav', 'asc');
  for (let i = 1; i < byNavAsc.length; i++) assert.ok(byNavAsc[i-1].nav <= byNavAsc[i].nav);

  const byAskDesc = App.sortRows(App.fundData, 'ask', 'desc');
  for (let i = 1; i < byAskDesc.length; i++) assert.ok(byAskDesc[i-1].ask >= byAskDesc[i].ask);

  const byVintageAsc = App.sortRows(App.fundData, 'vintage', 'asc');
  for (let i = 1; i < byVintageAsc.length; i++) assert.ok(byVintageAsc[i-1].vintage <= byVintageAsc[i].vintage);
});

test('sortRows does not mutate the input array', () => {
  const before = App.fundData.map(r => r.id);
  App.sortRows(App.fundData, 'nav', 'asc');
  const after = App.fundData.map(r => r.id);
  assert.deepEqual(before, after);
});

// ---------------------------------------------------------------------
// parseTimelineDays
// ---------------------------------------------------------------------

test('parseTimelineDays averages a "N–M weeks" range into days', () => {
  assert.equal(App.parseTimelineDays('6–8 weeks to close'), 49); // avg 7 weeks * 7
  assert.equal(App.parseTimelineDays('4–6 weeks to close'), 35); // avg 5 weeks * 7
});

test('parseTimelineDays handles a single-number "N weeks" phrase', () => {
  assert.equal(App.parseTimelineDays('8 weeks to close'), 56);
});

test('parseTimelineDays returns null instead of fabricating a number when none is present', () => {
  assert.equal(App.parseTimelineDays('Pending exclusivity outcome'), null);
  assert.equal(App.parseTimelineDays('N/A'), null);
  assert.equal(App.parseTimelineDays(''), null);
  assert.equal(App.parseTimelineDays(null), null);
});

// ---------------------------------------------------------------------
// computeSignals
// ---------------------------------------------------------------------

test('computeSignals derives bidders-viewing deterministically from a listing\'s own fields', () => {
  const row = App.fundData.find(r => r.id === 1);
  const a = App.computeSignals(row);
  const b = App.computeSignals(row);
  assert.equal(a.biddersViewing, b.biddersViewing, 'must be stable across calls, never re-rolled per view');
  assert.ok(a.biddersViewing >= 2 && a.biddersViewing <= 11);
});

test('computeSignals ties daysToClose to parseTimelineDays for the same listing', () => {
  const row = App.fundData.find(r => r.id === 1);
  const signals = App.computeSignals(row);
  assert.equal(signals.daysToClose, App.parseTimelineDays(row.timeline));
});

// ---------------------------------------------------------------------
// priceBand
// ---------------------------------------------------------------------

test('priceBand excludes closed listings and computes low/median/high from ask prices', () => {
  const band = App.priceBand('fund');
  const openAsks = App.fundData.filter(r => r.status !== 'closed').map(r => r.ask);
  assert.equal(band.low, Math.min(...openAsks));
  assert.equal(band.high, Math.max(...openAsks));
  assert.equal(band.n, openAsks.length);
  assert.ok(band.low <= band.median && band.median <= band.high);
});

test('priceBand labels direct-stake pricing as implied percentage', () => {
  const band = App.priceBand('direct');
  assert.equal(band.unit, '% implied');
});

// ---------------------------------------------------------------------
// isLargeMandate
// ---------------------------------------------------------------------

test('isLargeMandate is true only for the $10M+ tier', () => {
  assert.equal(App.isLargeMandate('$10M+'), true);
  assert.equal(App.isLargeMandate('<$5M'), false);
  assert.equal(App.isLargeMandate('$5M–$10M'), false);
  assert.equal(App.isLargeMandate(undefined), false);
});

// ---------------------------------------------------------------------
// matchesMandate / newMatchesForMandate
// ---------------------------------------------------------------------

test('matchesMandate matches on sector when a specific sector is given', () => {
  const row = App.fundData.find(r => r.id === 6); // Consumer & Retail
  assert.equal(App.matchesMandate(row, { sector:'Consumer & Retail' }), true);
  assert.equal(App.matchesMandate(row, { sector:'Venture' }), false);
});

test('matchesMandate treats "any" sector and no mandate as pass-through / no-match respectively', () => {
  const row = App.fundData.find(r => r.id === 6);
  assert.equal(App.matchesMandate(row, { sector:'any' }), true);
  assert.equal(App.matchesMandate(row, null), false);
});

test('newMatchesForMandate returns only addedRecently listings from the mandate\'s asset class', () => {
  const fundMatches = App.newMatchesForMandate({ assetClass:'fund', sector:'any' });
  assert.ok(fundMatches.some(r => r.id === 6 && r.name === 'Silverton Growth Equity VI'));
  assert.ok(fundMatches.every(r => r.addedRecently === true));

  const directMatches = App.newMatchesForMandate({ assetClass:'direct', sector:'any' });
  assert.ok(directMatches.some(r => r.id === 4 && r.name === 'Ferrovia Logistics'));
});

test('newMatchesForMandate returns nothing for a null/incomplete mandate', () => {
  assert.deepEqual(App.newMatchesForMandate(null), []);
  assert.deepEqual(App.newMatchesForMandate({}), []);
});

// ---------------------------------------------------------------------
// summarizeEvents
// ---------------------------------------------------------------------

test('summarizeEvents counts events per funnel step and zero-fills missing steps', () => {
  const events = [
    { type:'mandate_captured', ts:1 },
    { type:'mandate_captured', ts:2 },
    { type:'bid_submitted', ts:3 },
    { type:'unknown_event_type', ts:4 }
  ];
  const summary = App.summarizeEvents(events);
  const byType = Object.fromEntries(summary.map(s => [s.type, s.count]));
  assert.equal(byType.mandate_captured, 2);
  assert.equal(byType.bid_submitted, 1);
  assert.equal(byType.marketplace_viewed, 0);
  assert.equal(summary.length, App.FUNNEL_STEPS.length);
});

test('summarizeEvents handles an empty or missing event list', () => {
  const summary = App.summarizeEvents([]);
  assert.ok(summary.every(s => s.count === 0));
  const summaryUndefined = App.summarizeEvents(undefined);
  assert.ok(summaryUndefined.every(s => s.count === 0));
});

// ---------------------------------------------------------------------
// referralCode
// ---------------------------------------------------------------------

test('referralCode is deterministic for the same seed and matches the SM-XXXXXX format', () => {
  const a = App.referralCode('member-42');
  const b = App.referralCode('member-42');
  assert.equal(a, b);
  assert.match(a, /^SM-[A-Z0-9]{1,6}$/);
});

test('referralCode differs for different seeds (no accidental collisions on obvious inputs)', () => {
  const a = App.referralCode('member-1');
  const b = App.referralCode('member-2');
  assert.notEqual(a, b);
});
