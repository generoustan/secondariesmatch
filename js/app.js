/*
 * SecondariesMatch — shared app logic.
 * Loaded as a plain <script> in the browser (attaches to window.App) and
 * required directly in Node for unit tests (module.exports).
 */
(function (root) {
  "use strict";

  // ---------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------

  const fundData = [
    {id:1,name:'Meridian Capital Partners VII, L.P.',manager:'Meridian Capital',tag:'Buyout',vintage:2017,sector:'Healthcare & Life Sciences',geography:'North America',nav:84.2,unfunded:12.6,ask:93,bidLow:88,bidHigh:92,status:'open',description:'Diversified buyout fund concentrated in healthcare services and life sciences tooling, seeking a full LP interest transfer.',gpTrackRecord:'3.1x gross MOIC across prior three funds',terms:'Standard ROFR; GP consent required',timeline:'6–8 weeks to close',documents:'LPA, capital account statements, most recent quarterly report, side letter summary'},
    {id:2,name:'Brightline Venture Fund IV',manager:'Brightline Ventures',tag:'Venture',vintage:2019,sector:'Enterprise Software',geography:'North America',nav:46.1,unfunded:8.4,ask:89,bidLow:84,bidHigh:88,status:'open',description:'Early-growth venture fund with concentrated enterprise SaaS exposure across 14 portfolio companies.',gpTrackRecord:'2.4x unrealized TVPI',terms:'No ROFR; transfer notice only',timeline:'4–6 weeks to close',documents:'LPA, cap table summary, latest NAV letter'},
    {id:3,name:'Cascade Credit Opportunities III',manager:'Cascade Credit',tag:'Credit',vintage:2016,sector:'Diversified',geography:'Europe',nav:112.7,unfunded:4.2,ask:96,bidLow:93,bidHigh:96,status:'closing',description:'Senior direct-lending vehicle in late harvest period with limited remaining unfunded commitment.',gpTrackRecord:'8.9% net IRR to date',terms:'ROFR waived by GP',timeline:'3–5 weeks to close',documents:'LPA, portfolio company schedule, distribution history'},
    {id:4,name:'Harborview Real Estate Fund V',manager:'Harborview Partners',tag:'Real Estate',vintage:2015,sector:'Industrial & Logistics',geography:'North America',nav:58.9,unfunded:2.1,ask:91,bidLow:87,bidHigh:90,status:'under_offer',description:'Core-plus industrial and logistics portfolio; currently in exclusivity with a counterparty.',gpTrackRecord:'1.9x realized MOIC on exited assets',terms:'GP consent required',timeline:'Pending exclusivity outcome',documents:'LPA, appraisal summaries, rent rolls'},
    {id:5,name:'Northgate Infrastructure Partners II',manager:'Northgate Capital',tag:'Infrastructure',vintage:2018,sector:'Energy Transition',geography:'Europe',nav:203.4,unfunded:31.8,ask:94,bidLow:90,bidHigh:93,status:'open',description:'Core infrastructure fund concentrated in renewable generation and grid assets across Western Europe.',gpTrackRecord:'11% net IRR since inception',terms:'ROFR applies; 30-day window',timeline:'8–10 weeks to close',documents:'LPA, asset-level operating reports, ESG disclosures'},
    {id:6,name:'Silverton Growth Equity VI',manager:'Silverton Partners',tag:'Buyout',vintage:2020,sector:'Consumer & Retail',geography:'Asia-Pacific',nav:71.3,unfunded:18.9,ask:87,bidLow:82,bidHigh:86,status:'open',addedRecently:true,description:'Growth buyout fund targeting branded consumer businesses across Southeast Asia.',gpTrackRecord:'2.1x unrealized MOIC',terms:'No ROFR',timeline:'6 weeks to close',documents:'LPA, quarterly reports, co-invest summary'},
    {id:7,name:'Ardmore Life Sciences Fund III',manager:'Ardmore Capital',tag:'Venture',vintage:2014,sector:'Healthcare & Life Sciences',geography:'North America',nav:39.6,unfunded:1.4,ask:78,bidLow:72,bidHigh:77,status:'closed',description:'Late-stage biotech venture fund; listing withdrawn pending GP restructuring.',gpTrackRecord:'0.8x TVPI, below-median vintage',terms:'Withdrawn — not currently transferable',timeline:'N/A',documents:'Not currently available'},
    {id:8,name:'Blackfriar Credit Partners IV',manager:'Blackfriar Capital',tag:'Credit',vintage:2021,sector:'Diversified',geography:'North America',nav:95.0,unfunded:22.3,ask:92,bidLow:89,bidHigh:92,status:'open',description:'Direct lending fund in early deployment with strong diversification across middle-market borrowers.',gpTrackRecord:'7.4% net IRR to date',terms:'ROFR applies',timeline:'6–8 weeks to close',documents:'LPA, loan schedule, quarterly valuation report'}
  ];
  const directData = [
    {id:1,name:'Vantage Robotics Inc.',round:'Series D Preferred',sector:'Industrial Tech',lastRoundVal:1200,ask:79,unfunded:18.4,status:'open',description:'Warehouse automation robotics company; seller is an early venture investor seeking partial liquidity.',gpTrackRecord:'N/A — direct company stake',terms:'ROFR held by company; 30-day notice',timeline:'6–8 weeks to close',documents:'Cap table, ROFR waiver, latest board deck'},
    {id:2,name:'Nimbus Health Systems',round:'Series C Preferred',sector:'Digital Health',lastRoundVal:640,ask:81,unfunded:6.2,status:'open',description:'Value-based care platform; stake held by a departing seed investor.',gpTrackRecord:'N/A — direct company stake',terms:'Company consent required',timeline:'4–6 weeks to close',documents:'Cap table, SPA template, financial summary'},
    {id:3,name:'Solara Grid Technologies',round:'Series E Preferred',sector:'Clean Energy',lastRoundVal:2400,ask:88,unfunded:34.0,status:'closing',description:'Grid-scale battery storage developer nearing a strategic round; strip sale from an existing fund investor.',gpTrackRecord:'N/A — direct company stake',terms:'ROFR waived',timeline:'3–4 weeks to close',documents:'Cap table, latest 409A, board consent'},
    {id:4,name:'Ferrovia Logistics',round:'Series B Preferred',sector:'Supply Chain',lastRoundVal:310,ask:85,unfunded:4.1,status:'open',addedRecently:true,description:'Cross-border freight platform; seller is a fund winding down its final vintage.',gpTrackRecord:'N/A — direct company stake',terms:'No ROFR',timeline:'4–5 weeks to close',documents:'Cap table, SPA template'},
    {id:5,name:'Cobalt Data Systems',round:'Series F Preferred',sector:'Enterprise Software',lastRoundVal:3800,ask:87,unfunded:52.0,status:'under_offer',description:'Late-stage data infrastructure company; currently in exclusivity with a strategic buyer.',gpTrackRecord:'N/A — direct company stake',terms:'Company consent required',timeline:'Pending exclusivity outcome',documents:'Cap table, board consent draft'},
    {id:6,name:'Meridian Biosciences',round:'Series C Preferred',sector:'Biotech',lastRoundVal:890,ask:72,unfunded:9.7,status:'closed',description:'Clinical-stage biotech; listing withdrawn pending trial readout.',gpTrackRecord:'N/A — direct company stake',terms:'Withdrawn',timeline:'N/A',documents:'Not currently available'},
    {id:7,name:'Argent Fintech Holdings',round:'Series D Preferred',sector:'Fintech',lastRoundVal:1600,ask:84,unfunded:21.5,status:'open',description:'Embedded payments infrastructure provider; seller is a fund-of-one seeking partial liquidity.',gpTrackRecord:'N/A — direct company stake',terms:'ROFR held by company',timeline:'5–7 weeks to close',documents:'Cap table, ROFR waiver, latest financials'}
  ];
  const realData = [
    {id:1,name:'Coastal Logistics Portfolio I',type:'Industrial Real Estate',vintage:2016,geography:'North America',nav:142.3,ask:90,unfunded:0,status:'open',description:'Last-mile industrial and logistics portfolio across four major North American metros.',gpTrackRecord:'6.2% average cap rate',terms:'GP consent required',timeline:'8–10 weeks to close',documents:'Rent rolls, appraisals, LPA'},
    {id:2,name:'Helios Solar Infrastructure Fund',type:'Renewable Infrastructure',vintage:2019,geography:'Europe',nav:267.8,ask:95,unfunded:0,status:'open',description:'Utility-scale solar generation assets across Iberia and Southern France.',gpTrackRecord:'9.8% net IRR since inception',terms:'ROFR applies',timeline:'8 weeks to close',documents:'Asset operating reports, PPAs summary, LPA'},
    {id:3,name:'Union Station Office Portfolio',type:'Office Real Estate',vintage:2013,geography:'North America',nav:61.4,ask:74,unfunded:0,status:'closing',description:'CBD office portfolio in secondary markets; pricing reflects sector-wide office discount.',gpTrackRecord:'Below-median vintage performance',terms:'No ROFR',timeline:'4–6 weeks to close',documents:'Appraisals, rent rolls'},
    {id:4,name:'Trellis Data Center Fund II',type:'Digital Infrastructure',vintage:2020,geography:'North America',nav:188.0,ask:97,unfunded:0,status:'open',description:'Hyperscale-leased data center portfolio with long-duration contracted revenue.',gpTrackRecord:'12.1% net IRR since inception',terms:'ROFR applies',timeline:'8–10 weeks to close',documents:'Lease abstracts, operating reports, LPA'},
    {id:5,name:'Meridian Toll Roads Partnership',type:'Transportation Infrastructure',vintage:2012,geography:'Europe',nav:340.6,ask:88,unfunded:0,status:'under_offer',description:'Mature toll-road concession portfolio; currently in exclusivity.',gpTrackRecord:'7.9% net IRR since inception',terms:'GP consent required',timeline:'Pending exclusivity outcome',documents:'Concession agreements summary, LPA'},
    {id:6,name:'Baywood Multifamily Fund IV',type:'Residential Real Estate',vintage:2017,geography:'North America',nav:97.5,ask:92,unfunded:0,status:'open',description:'Class-B multifamily portfolio across Sunbelt growth markets.',gpTrackRecord:'5.8% average cap rate',terms:'No ROFR',timeline:'5–7 weeks to close',documents:'Rent rolls, appraisals, LPA'}
  ];
  const insights = [
    {date:'July 2026',title:'Q2 2026 Secondary Pricing Survey',summary:'Buyout funds averaging 91% of NAV, up 3 points quarter-over-quarter as bid-ask spreads narrow across the market.'},
    {date:'June 2026',title:'GP-Led Continuation Vehicles: 2026 Outlook',summary:'Continuation vehicle volume on pace to exceed prior-year totals as sponsors extend holds on top-performing assets.'},
    {date:'May 2026',title:'Direct Secondaries in Late-Stage Tech',summary:'Discounts on late-stage venture and growth equity stakes have compressed as primary markets reopen.'}
  ];
  const sellerSteps = [
    {n:1,title:'Confidential intake & valuation benchmark',desc:'Share mandate details privately; receive an indicative pricing benchmark.'},
    {n:2,title:'Listing goes to vetted buyer pool',desc:'Distributed under NDA to accredited, KYC-verified institutional buyers only.'},
    {n:3,title:'Bids collected & compared',desc:'Review competing bids side-by-side with full transparency into terms.'},
    {n:4,title:'Negotiate, execute, close',desc:'Transfer documentation and closing support through final settlement.'}
  ];
  const buyerSteps = [
    {n:1,title:'Get verified',desc:'Complete accreditation and KYC to unlock full marketplace access.'},
    {n:2,title:'Filter live supply',desc:'Screen active mandates by sector, vintage, geography, and size.'},
    {n:3,title:'Request data room access',desc:'Review diligence materials under watermark and audit-trail controls.'},
    {n:4,title:'Submit bid, negotiate, close',desc:'Execute your order ticket with counsel support through to close.'}
  ];

  const GRID = {
    fund: 'minmax(280px,2fr) 110px 70px 160px 120px 100px 110px 90px 120px 140px 150px',
    direct: 'minmax(280px,2fr) 150px 150px 130px 130px 130px 140px 150px',
    real: 'minmax(280px,2fr) 170px 80px 130px 110px 100px 140px 150px'
  };

  const CHECK_SIZE_OPTIONS = ['<$5M', '$5M–$10M', '$10M+'];

  const FUNNEL_STEPS = [
    { type: 'mandate_captured', label: 'Mandate captured at sign-up' },
    { type: 'marketplace_viewed', label: 'Personalized marketplace viewed' },
    { type: 'filter_saved', label: 'Mandate saved as standing filter' },
    { type: 'data_room_requested', label: 'Data room requested' },
    { type: 'bid_modal_opened', label: 'Bid/offer ticket opened' },
    { type: 'bid_submitted', label: 'Bid/offer submitted (Activated)' }
  ];

  // ---------------------------------------------------------------------
  // Pure helpers
  // ---------------------------------------------------------------------

  function statusMeta(code){
    const m = {
      open: {label:'Open for Bids', color:'#0E7A4E'},
      closing: {label:'Closing Soon', color:'#8A6D1D'},
      under_offer: {label:'Under Offer', color:'#5B6478'},
      closed: {label:'Bidding Closed', color:'#B3261E'}
    };
    return m[code] || m.open;
  }

  function getDataset(kind){
    return kind === 'fund' ? fundData : kind === 'direct' ? directData : realData;
  }

  /** filters: {search, sector, status, vintageMin, vintageMax, navMin, navMax, assetClass} */
  function matches(r, filters){
    const ac = filters.assetClass;
    const name = (r.name || '').toLowerCase();
    if (filters.search && !name.includes(filters.search.toLowerCase())) return false;
    if (filters.sector && filters.sector !== 'All' && r.sector !== filters.sector) return false;
    if (filters.status && filters.status !== 'All' && r.status !== filters.status) return false;
    if (ac !== 'direct') {
      if (filters.vintageMin !== '' && filters.vintageMin != null && r.vintage < parseInt(filters.vintageMin, 10)) return false;
      if (filters.vintageMax !== '' && filters.vintageMax != null && r.vintage > parseInt(filters.vintageMax, 10)) return false;
    }
    const navVal = ac === 'direct' ? r.lastRoundVal : r.nav;
    if (filters.navMin !== '' && filters.navMin != null && navVal < parseFloat(filters.navMin)) return false;
    if (filters.navMax !== '' && filters.navMax != null && navVal > parseFloat(filters.navMax)) return false;
    return true;
  }

  /** Parses timeline strings like "6–8 weeks to close" into an average day count. Returns null when no real number is present — never fabricate one. */
  function parseTimelineDays(timeline){
    if (!timeline) return null;
    const m = String(timeline).match(/(\d+)(?:\s*[–-]\s*(\d+))?\s*weeks?/i);
    if (!m) return null;
    const lo = parseInt(m[1], 10);
    const hi = m[2] ? parseInt(m[2], 10) : lo;
    return Math.round(((lo + hi) / 2) * 7);
  }

  /** Deterministic, non-random signals derived from a listing's own data — never re-rolled per view. */
  function computeSignals(r){
    const spread = (r.bidHigh != null && r.bidLow != null) ? (r.ask - r.bidLow) : ((r.id * 7) % 6);
    const biddersViewing = Math.max(2, Math.min(11, Math.round(spread) + (r.status === 'closing' ? 3 : 0)));
    const daysToClose = parseTimelineDays(r.timeline);
    return { biddersViewing, daysToClose };
  }

  function mapRow(r, kind){
    const meta = statusMeta(r.status);
    const disabled = r.status === 'closed';
    const actionLabel = disabled ? 'Bidding Closed' : (kind === 'direct' ? 'Submit an Offer' : 'Submit a Bid');
    const signals = computeSignals(r);
    const base = {
      id:r.id, name:r.name, statusLabel:meta.label, statusColor:meta.color,
      rowOpacity: disabled ? 0.55 : 1, actionLabel, actionDisabled:disabled,
      description:r.description, gpTrackRecord:r.gpTrackRecord, terms:r.terms, timeline:r.timeline, documents:r.documents,
      addedRecently: !!r.addedRecently,
      biddersViewing: disabled ? null : signals.biddersViewing,
      daysToClose: disabled ? null : signals.daysToClose
    };
    if (kind === 'fund') {
      return Object.assign(base, {
        manager:r.manager, tag:r.tag, sub:r.manager, vintage:r.vintage, sector:r.sector, geography:r.geography,
        navDisplay:'$'+r.nav.toFixed(1)+'M', unfundedDisplay:'$'+r.unfunded.toFixed(1)+'M',
        askDisplay:r.ask+'%', bidDisplay:r.bidLow+'–'+r.bidHigh+'%', askValue:r.ask
      });
    }
    if (kind === 'direct') {
      return Object.assign(base, {
        round:r.round, sector:r.sector, sub:r.round, tag:r.round,
        navDisplay:'$'+r.lastRoundVal.toFixed(0)+'M', askDisplay:r.ask+'% implied',
        unfundedDisplay:'$'+r.unfunded.toFixed(1)+'M', askValue:r.ask
      });
    }
    return Object.assign(base, {
      type:r.type, tag:r.type, sub:r.type, sector:r.type, vintage:r.vintage, geography:r.geography,
      navDisplay:'$'+r.nav.toFixed(1)+'M', askDisplay:r.ask+'%', askValue:r.ask
    });
  }

  function sortRows(rows, sortBy, sortDir){
    const key = sortBy === 'nav' ? 'nav' : sortBy === 'ask' ? 'ask' : 'vintage';
    return rows.slice().sort((a,b)=>{
      const av = a[key] === undefined ? -Infinity : a[key];
      const bv = b[key] === undefined ? -Infinity : b[key];
      return sortDir === 'asc' ? av-bv : bv-av;
    });
  }

  /** The illustrative live price band shown at sign-up, before any account exists. */
  function priceBand(assetClass){
    const rows = getDataset(assetClass).filter(r => r.status !== 'closed');
    const asks = rows.map(r => r.ask).sort((a,b)=>a-b);
    if (asks.length === 0) return null;
    const low = asks[0];
    const high = asks[asks.length-1];
    const median = asks.length % 2 === 1
      ? asks[(asks.length-1)/2]
      : Math.round(((asks[asks.length/2 - 1] + asks[asks.length/2]) / 2) * 10) / 10;
    return { low, median, high, unit: assetClass === 'direct' ? '% implied' : '% of NAV', n: rows.length };
  }

  function isLargeMandate(checkSize){
    return checkSize === '$10M+';
  }

  /** Used both to personalize the first view and to compute the return-trigger banner. */
  const WILDCARD_SECTORS = ['any', 'All'];
  function matchesMandate(row, mandate){
    if (!mandate) return false;
    const wildcard = !mandate.sector || WILDCARD_SECTORS.includes(mandate.sector);
    if (!wildcard && row.sector && row.sector !== mandate.sector) return false;
    return true;
  }

  function newMatchesForMandate(mandate){
    if (!mandate || !mandate.assetClass) return [];
    const rows = getDataset(mandate.assetClass);
    return rows.filter(r => r.addedRecently && matchesMandate(r, mandate));
  }

  function summarizeEvents(events){
    const counts = {};
    FUNNEL_STEPS.forEach(s => { counts[s.type] = 0; });
    (events || []).forEach(e => {
      if (Object.prototype.hasOwnProperty.call(counts, e.type)) counts[e.type] += 1;
    });
    return FUNNEL_STEPS.map(s => ({ type: s.type, label: s.label, count: counts[s.type] }));
  }

  function referralCode(seed){
    const s = String(seed || Date.now());
    let hash = 0;
    for (let i = 0; i < s.length; i++) { hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0; }
    return 'SM-' + Math.abs(hash).toString(36).toUpperCase().slice(0, 6);
  }

  // ---------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------

  const App = {
    fundData, directData, realData, insights, sellerSteps, buyerSteps,
    GRID, CHECK_SIZE_OPTIONS, FUNNEL_STEPS,
    statusMeta, getDataset, matches, mapRow, sortRows,
    parseTimelineDays, computeSignals, priceBand, isLargeMandate,
    matchesMandate, newMatchesForMandate, summarizeEvents, referralCode
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
  } else {
    root.App = App;
  }
})(typeof window !== 'undefined' ? window : globalThis);
