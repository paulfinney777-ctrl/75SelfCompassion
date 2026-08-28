'use strict';

/* ---------- Data ---------- */

const ITEMS = [
  { key: 'water', label: 'Gallon of water', sub: '128 oz across the day', icon: 'water' },
  { key: 'meal', label: 'Meal plan', sub: 'Eat the plan you set last night', icon: 'meal' },
  { key: 'pages', label: '10 pages', sub: 'Anything that feeds the inner life', icon: 'pages' },
  { key: 'gratitude', label: 'Vitamin G', sub: '3 written gratitudes', icon: 'gratitude' },
  { key: 'walk', label: '60-minute walk', sub: 'One hour, outside preferred', icon: 'walk' },
  { key: 'cold', label: 'Cold close', sub: '≥ 60 seconds, end of shower', icon: 'cold' },
  { key: 'pause', label: 'Pause practice', sub: 'One formal practice, 2–10 min', icon: 'heart' }
];

const ARCS = [
  { n: 1, start: 1, end: 15, name: 'Notice the critic without becoming him', practice: 'The Pause Practice, 1–3× a day' },
  { n: 2, start: 16, end: 30, name: 'Kindness in the body', practice: 'Supportive touch + Soften / Soothe / Allow' },
  { n: 3, start: 31, end: 45, name: 'You are not the only one', practice: 'Common-humanity Pause + loving-kindness' },
  { n: 4, start: 46, end: 60, name: 'Fierce compassion', practice: 'The Pause Practice, motivating version' },
  { n: 5, start: 61, end: 75, name: 'Integration & self-appreciation', practice: 'Body Scan / Giving & Receiving Compassion' }
];

const PAUSE_STEPS = [
  { eyebrow: 'Ground', phrase: 'Okay. Stop for a second.', caption: 'Feel your feet on the floor. Rest a hand somewhere steady — your chest, your arm, wherever feels grounding.', icon: 'heart' },
  { eyebrow: 'Name it', phrase: 'Yeah — this is genuinely hard.', caption: 'Let it be exactly as hard as it is. No inflating it, no brushing past it.', icon: 'rings' },
  { eyebrow: 'You’re not the only one', phrase: 'Plenty of people know this exact feeling.', caption: 'Struggling here doesn’t set you apart — it’s just what being human includes.', icon: 'circles' },
  { eyebrow: 'Offer yourself something', phrase: 'What do I actually need right now?', caption: 'Answer it the way you would for someone you love.', icon: 'heart', warm: true },
  { eyebrow: 'When it’s time to act', phrase: 'Alright. One small step — not the whole fix.', caption: 'Use this once the feeling has had its moment and it’s time to move.', icon: 'arrow', warm: true }
];

const ICONS = {
  water: '<path d="M12 3c3.5 4 6 7.2 6 10.2A6 6 0 1 1 6 13.2C6 10.2 8.5 7 12 3Z"/>',
  meal: '<path d="M4 12h16a8 8 0 0 1-16 0Z"/><path d="M9 12V9M12 12V7M15 12V9"/>',
  pages: '<path d="M12 6c-1.8-1.3-4-2-6.5-2v13c2.5 0 4.7.7 6.5 2 1.8-1.3 4-2 6.5-2V4c-2.5 0-4.7.7-6.5 2Z"/><path d="M12 6v13"/>',
  gratitude: '<path d="M12 21V11"/><path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5Z"/><path d="M12 14c0-2.5-1.7-4.2-4.2-4.2 0 2.5 1.7 4.2 4.2 4.2Z"/>',
  walk: '<path d="M8 4a2.2 2.2 0 0 1 2 2.4c0 1.6-1 2.6-1 4s.6 2 .6 3.3c0 1.5-1 2.3-2.1 2.3-1.3 0-2-1-2-2.4 0-1.4.7-2.1.7-3.6 0-1.2-.9-2-.9-3.4A2.2 2.2 0 0 1 8 4Z"/><path d="M16.5 9a2.2 2.2 0 0 1 2 2.4c0 1.6-1 2.6-1 4s.6 2 .6 3.3c0 1.5-1 2.3-2.1 2.3-1.3 0-2-1-2-2.4 0-1.4.7-2.1.7-3.6 0-1.2-.9-2-.9-3.4A2.2 2.2 0 0 1 16.5 9Z"/>',
  cold: '<path d="M12 3v18M5 7l14 10M19 7 5 17M4 12h16"/>',
  heart: '<path d="M12 20s-7-4.4-9.3-8.8C1.4 8 3 5 6.2 5c1.9 0 3.3 1 4.3 2.3.5.6.9 1.2 1.5 1.2s1-.6 1.5-1.2C14.5 6 15.9 5 17.8 5 21 5 22.6 8 21.3 11.2 19 15.6 12 20 12 20Z"/>',
  check: '<path d="M5 13l4 4 10-10"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M8 3v3M16 3v3"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="3"/><path d="M8.5 12.2l2 2 4-4.4"/>',
  path: '<path d="M4 20c3-6 5-10 8-10s5 4 8 10"/><circle cx="4" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="20" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1.3" fill="currentColor" stroke="none"/>',
  rings: '<circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="8.5"/>',
  circles: '<circle cx="9.5" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
  arrow: '<path d="M12 19V6"/><path d="M6 11.5l6-6.5 6 6.5"/>'
};

function icon(name, size) {
  size = size || 20;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

/* ---------- State ---------- */

const STORAGE_KEY = '75c_state_v1';

function defaultState() {
  return {
    onboarded: false,
    startDate: null, // 'YYYY-MM-DD'
    name: '',
    reminders: { morning: true, journal: true, pause: false },
    logs: {} // dateKey -> { water,meal,pages,gratitude,walk,cold,pause: 'undone'|'done'|'c', journal: {...} }
  };
}

let state = loadState();
const ui = { onboardStep: 0, onboardChoice: 'today', onboardCustomDate: '', pauseStep: 0, openArc: null, reviewExerciseOpen: false, liftDays: { M: true, T: false, W: true, T2: false, F: true, S: false, S2: false } };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed, { reminders: Object.assign({ morning: true, journal: true, pause: false }, parsed.reminders || {}) });
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
}

function getLog(dateKey) {
  if (!state.logs[dateKey]) {
    state.logs[dateKey] = { water: 'undone', meal: 'undone', pages: 'undone', gratitude: 'undone', walk: 'undone', cold: 'undone', pause: 'undone', journal: {} };
  }
  if (!state.logs[dateKey].journal) state.logs[dateKey].journal = {};
  return state.logs[dateKey];
}

/* ---------- Date helpers ---------- */

function dateKey(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function parseDateKey(k) {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function todayKey() { return dateKey(new Date()); }
function addDays(k, n) {
  const d = parseDateKey(k);
  d.setDate(d.getDate() + n);
  return dateKey(d);
}
function dayNumberFor(k) {
  if (!state.startDate) return null;
  const start = parseDateKey(state.startDate);
  const d = parseDateKey(k);
  return Math.floor((d - start) / 86400000) + 1;
}
function currentDayNumber() { return dayNumberFor(todayKey()); }
function dateKeyForDay(n) { return addDays(state.startDate, n - 1); }
function formatDateLong(k) {
  const d = parseDateKey(k);
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function nextMonday(fromKey) {
  const d = parseDateKey(fromKey);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const add = day === 1 ? 0 : (8 - day) % 7 || 7;
  const diff = day === 1 ? 0 : (1 - day + 7) % 7;
  const res = new Date(d);
  res.setDate(res.getDate() + (diff === 0 && day !== 1 ? diff : diff));
  return dateKey(res);
}

/* ---------- Router ---------- */

function currentRoute() {
  const h = location.hash.replace('#/', '') || 'today';
  return h;
}

function navigate(route) {
  location.hash = '#/' + route;
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  render();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

/* ---------- Render root ---------- */

function render() {
  const app = document.getElementById('app');
  let route = currentRoute();
  if (!state.onboarded && route !== 'onboarding') {
    location.hash = '#/onboarding';
    return;
  }
  if (state.onboarded && route === 'onboarding') route = 'today';

  let html = '';
  let withTabbar = true;
  switch (route) {
    case 'onboarding': html = renderOnboarding(); withTabbar = false; break;
    case 'today': html = renderToday(); break;
    case 'pause': html = renderPause(); break;
    case 'journal': html = renderJournal(); break;
    case 'journey': html = renderJourney(); break;
    case 'review': html = renderReview(); break;
    case 'settings': html = renderSettings(); withTabbar = false; break;
    default: html = renderToday(); route = 'today';
  }

  app.innerHTML = html;
  if (withTabbar) app.insertAdjacentHTML('beforeend', renderTabBar(route));
}

/* ---------- Shared bits ---------- */

function renderTabBar(active) {
  const tabs = [
    { key: 'today', label: 'Today', icon: 'clipboard' },
    { key: 'journal', label: 'Journal', icon: 'pages' },
    { key: 'journey', label: 'Journey', icon: 'path' },
    { key: 'pause', label: 'Pause', icon: 'heart' }
  ];
  return `<div class="tabbar">${tabs.map(t => `
    <div class="tab-item ${t.key === active ? 'active' : ''}" data-action="nav" data-key="${t.key}">
      ${icon(t.icon, 21)}
      <span>${t.label}</span>
    </div>`).join('')}</div>`;
}

function itemStyle(status) {
  if (status === 'done') return { bg: 'var(--sage)', border: 'var(--sage)' };
  if (status === 'c') return { bg: 'var(--terracotta)', border: 'var(--terracotta)' };
  return { bg: 'var(--card)', border: '#C9BFA8' };
}

function checkBtnHtml(itemKey, status) {
  const cls = status === 'done' ? 'done' : status === 'c' ? 'c' : '';
  const inner = status === 'done' ? icon('check', 17).replace('stroke="currentColor"', 'stroke="#FFFDF8"')
    : status === 'c' ? '<span class="c-letter">C</span>' : '';
  return `<div class="check-btn ${cls}" data-action="toggle-item" data-key="${itemKey}">${inner}</div>`;
}

/* ---------- Today ---------- */

function renderToday() {
  const today = todayKey();
  const log = getLog(today);
  const dayN = currentDayNumber();
  const doneCount = ITEMS.filter((it) => log[it.key] === 'done').length;
  const circumference = 2 * Math.PI * 27;
  const offset = circumference * (1 - doneCount / 7);
  const arc = ARCS.find((a) => dayN >= a.start && dayN <= a.end) || ARCS[0];
  const weekCCount = weekCompassionateCount(dayN);

  const dayLabel = dayN === null ? 'Not started' : dayN < 1 ? `Starts in ${1 - dayN} day${1 - dayN === 1 ? '' : 's'}`
    : dayN > 75 ? 'Day 75 of 75 · complete' : `Day ${dayN} of 75`;

  return `
  <div class="screen">
    <div class="header row-between" style="align-items:flex-start;">
      <div>
        <div class="eyebrow">75 Compassionate</div>
        <h1 class="page-title">Today</h1>
        <div class="subtitle">${dayLabel} · Arc ${arc.n}</div>
      </div>
      <div class="row" style="gap:10px;margin-top:2px;">
        <div class="back-btn" data-action="nav" data-key="settings">${icon('gear', 15)}</div>
        <div class="ring-wrap">
          <svg width="60" height="60" viewBox="0 0 64 64">
            <circle class="ring-track" cx="32" cy="32" r="27"/>
            <circle class="ring-fill" cx="32" cy="32" r="27" stroke-dasharray="${circumference}" style="stroke-dashoffset:${offset}"/>
          </svg>
          <div class="ring-label">${doneCount}/7</div>
        </div>
      </div>
    </div>

    <div class="callout callout-sage" style="margin-top:16px;">
      <div class="field-label upper" style="color:var(--sage-dark);">Arc ${arc.n} · Days ${arc.start}–${arc.end}</div>
      <div style="font-size:14px;color:var(--sage-dark);margin-top:2px;">${arc.name}</div>
    </div>

    <div class="section" style="margin-top:0;">
      ${ITEMS.map((it) => `
        <div class="item-row">
          ${checkBtnHtml(it.key, log[it.key])}
          <div class="item-icon">${icon(it.icon, 20)}</div>
          <div class="item-text">
            <div class="item-title">${it.label}</div>
            <div class="item-sub">${it.sub}</div>
          </div>
        </div>`).join('')}
    </div>

    <div class="callout callout-terracotta">
      ${icon('gratitude', 18)}
      <div>This week so far: <strong>${weekCCount} compassionate mark${weekCCount === 1 ? '' : 's'}</strong> noted — that&rsquo;s information, not failure.</div>
    </div>

    <div class="section nav-card" data-action="nav" data-key="pause">
      <div class="row" style="gap:10px;">
        <div class="nav-card-icon">${icon('heart', 17)}</div>
        <div>
          <div class="item-title">The Pause Practice</div>
          <div class="item-sub">60–90 seconds, anytime</div>
        </div>
      </div>
      <div style="color:#C9BFA8;">${icon('chevronRight', 18)}</div>
    </div>
  </div>`;
}

function weekCompassionateCount(dayN) {
  if (dayN === null) return 0;
  const weekStart = Math.max(1, dayN - ((dayN - 1) % 7));
  let count = 0;
  for (let n = weekStart; n <= dayN; n++) {
    const log = state.logs[dateKeyForDay(n)];
    if (!log) continue;
    ITEMS.forEach((it) => { if (log[it.key] === 'c') count++; });
  }
  return count;
}

/* ---------- Pause practice ---------- */

function renderPause() {
  const s = ui.pauseStep;
  const dots = [1, 2, 3, 4, 5].map((n) => `<div class="ob-dot ${s >= n ? 'on' : ''}" style="width:26px;"></div>`).join('');
  let body = '';
  let footer = '';

  if (s === 0) {
    body = `
      <div class="ob-mark">${icon('heart', 52)}</div>
      <h2 style="font-size:20px;margin-bottom:10px;">Your default 60&ndash;90 seconds</h2>
      <div class="step-caption">Any time it helps: a missed habit, a harsh inner voice, work stress, body image, a sharp word at home. Pause here.</div>`;
    footer = `<div class="btn btn-primary" data-action="pause-begin">Begin</div>`;
  } else {
    const step = PAUSE_STEPS[s - 1];
    body = `
      <div class="pulse-circle ${step.warm ? 'warm' : ''}">${icon(step.icon, 56)}</div>
      <div class="step-eyebrow">${step.eyebrow}</div>
      <div class="step-phrase">${step.phrase}</div>
      <div class="step-caption">${step.caption}</div>`;
    const backBtn = s > 1 ? `<div class="btn btn-secondary" data-action="pause-back">Back</div>` : '';
    const nextBtn = s === 5
      ? `<div class="btn btn-primary grow" data-action="pause-close">Close</div>`
      : `<div class="btn btn-primary grow" data-action="pause-next">Next</div>`;
    footer = `<div style="display:flex;gap:10px;">${backBtn}${nextBtn}</div>`;
  }

  return `
  <div class="screen" style="display:flex;flex-direction:column;min-height:100vh;min-height:100dvh;">
    <div class="header"><div class="eyebrow">75 Compassionate</div><h1 class="page-title">The Pause Practice</h1></div>
    <div class="ob-dots">${s > 0 ? dots : ''}</div>
    <div class="pause-body">${body}</div>
    <div class="ob-footer">${footer}</div>
  </div>`;
}

function handlePauseAction(action) {
  if (action === 'pause-begin') ui.pauseStep = 1;
  else if (action === 'pause-next') ui.pauseStep = Math.min(ui.pauseStep + 1, 5);
  else if (action === 'pause-back') ui.pauseStep = Math.max(ui.pauseStep - 1, 0);
  else if (action === 'pause-close') {
    const log = getLog(todayKey());
    log.pause = 'done';
    saveState();
    ui.pauseStep = 0;
  }
  render();
}

/* ---------- Journal ---------- */

const JOURNAL_FIELDS = [
  { key: 'g1', label: 'Vitamin G — gratitude 1', placeholder: 'Something specific from today', type: 'text' },
  { key: 'g2', label: 'Vitamin G — gratitude 2', placeholder: 'Something specific from today', type: 'text' },
  { key: 'g3', label: 'Vitamin G — gratitude 3', placeholder: 'Something specific from today', type: 'text' },
  { key: 'difficulty', label: 'One difficulty, named simply', placeholder: 'No case-building — just the sentence.', type: 'textarea' },
  { key: 'bodyFeel', label: 'Mindfulness — what I felt in the body was', placeholder: '…', type: 'text' },
  { key: 'humanShare', label: 'Common humanity — a human in my place might also', placeholder: '…', type: 'text' },
  { key: 'kindSentence', label: 'Kindness — what I’d say to a friend in this spot', placeholder: 'One sentence, said out loud.', type: 'textarea' },
  { key: 'mealPlanNext', label: 'Tomorrow’s meal plan, in five words', placeholder: '…', type: 'text' }
];

function renderJournal() {
  const today = todayKey();
  const log = getLog(today);
  const j = log.journal;

  const fieldsHtml = JOURNAL_FIELDS.map((f) => {
    const val = (j[f.key] || '').replace(/"/g, '&quot;');
    const control = f.type === 'textarea'
      ? `<textarea data-field="${f.key}" rows="2" placeholder="${f.placeholder}">${j[f.key] ? escapeHtml(j[f.key]) : ''}</textarea>`
      : `<input type="text" data-field="${f.key}" placeholder="${f.placeholder}" value="${val}"/>`;
    return `<div class="section"><div class="field-label">${f.label}</div>${control}</div>`;
  }).join('');

  const checksHtml = ITEMS.map((it) => {
    const on = log[it.key] === 'done';
    return `<div class="row-between" data-action="toggle-item" data-key="${it.key}" style="background:${on ? 'var(--sage-soft)' : 'var(--card)'};border:1px solid ${on ? '#C7DAC5' : 'var(--border)'};border-radius:11px;padding:9px 10px;cursor:pointer;">
      <div style="font-size:12.5px;font-weight:500;color:${on ? 'var(--sage-dark)' : 'var(--ink-soft)'};">${it.label}</div>
      <div style="width:18px;height:18px;border-radius:6px;background:${on ? 'var(--sage)' : '#D8D0BC'};flex-shrink:0;display:flex;align-items:center;justify-content:center;">${on ? icon('check', 12).replace('stroke="currentColor"', 'stroke="#FFFDF8"').replace('stroke-width="1.75"', 'stroke-width="3"') : ''}</div>
    </div>`;
  }).join('');

  return `
  <div class="screen">
    <div class="header">
      <div class="eyebrow">75 Compassionate</div>
      <h1 class="page-title">Evening Page</h1>
      <div class="subtitle">${formatDateLong(today)}</div>
    </div>
    <div class="callout callout-sage" style="margin-top:18px;">Five minutes. No essays required — concrete beats clever.</div>
    ${fieldsHtml}
    <div class="section">
      <div class="field-label">Tonight&rsquo;s seven</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">${checksHtml}</div>
    </div>
  </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ---------- Journey ---------- */

function renderJourney() {
  const dayN = currentDayNumber();
  const overallPct = dayN === null ? 0 : Math.max(0, Math.min(100, Math.round((dayN / 75) * 100)));
  if (ui.openArc === null) ui.openArc = ARCS.find((a) => dayN >= a.start && dayN <= a.end)?.n || 1;

  const arcsHtml = ARCS.map((arc) => {
    const isOpen = ui.openArc === arc.n;
    const totalPast = Math.max(0, Math.min((dayN || 0) - 1, arc.end) - arc.start + 1);
    const pct = Math.round((totalPast / (arc.end - arc.start + 1)) * 100);
    let inner;
    if (isOpen) {
      const dots = [];
      for (let n = arc.start; n <= arc.end; n++) {
        const status = dayStatus(n, dayN);
        const st = status === 'today' ? { bg: 'var(--card)', border: 'var(--sage)' } : itemStyle(status === 'done' ? 'done' : status === 'c' ? 'c' : 'undone');
        dots.push(`<div class="day-dot" style="background:${st.bg};border:1.5px solid ${st.border};"></div>`);
      }
      inner = `<div class="field-label" style="margin:0 16px 10px;color:var(--ink-faint);font-weight:400;font-size:12.5px;">Daily practice: ${arc.practice}</div><div class="day-grid">${dots.join('')}</div>`;
    } else {
      inner = `<div class="arc-progress"><div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div></div>`;
    }
    return `<div class="arc-card">
      <div class="arc-head" data-action="toggle-arc" data-key="${arc.n}">
        <div>
          <div class="field-label upper">Arc ${arc.n} · Days ${arc.start}–${arc.end}</div>
          <div class="item-title" style="margin-top:2px;">${arc.name}</div>
        </div>
        <div class="arc-chevron" style="transform:rotate(${isOpen ? 180 : 0}deg);">${icon('chevronDown', 18)}</div>
      </div>
      ${inner}
    </div>`;
  }).join('');

  return `
  <div class="screen">
    <div class="header">
      <div class="eyebrow">75 Compassionate</div>
      <h1 class="page-title">Your Journey</h1>
      <div class="subtitle">${dayN === null ? 'Not started' : dayN > 75 ? 'Day 75 of 75' : `Day ${Math.max(dayN, 1)} of 75`}</div>
    </div>
    <div class="section"><div class="progress-track thick"><div class="progress-fill" style="width:${overallPct}%;"></div></div></div>
    <div class="callout-quote section">&ldquo;You never get sent back to Day 1 by a missed gallon.&rdquo;</div>
    <div class="legend">
      <span><span class="dot" style="background:var(--sage);"></span>Done</span>
      <span><span class="dot" style="background:var(--terracotta);"></span>Compassionate</span>
      <span><span class="dot" style="background:var(--card);border:1.5px solid var(--sage);"></span>Today</span>
      <span><span class="dot" style="background:var(--card);border:1.5px solid #D8D0BC;"></span>Ahead</span>
    </div>
    <div class="section nav-card" data-action="nav" data-key="review">
      <div class="row" style="gap:10px;">
        <div class="nav-card-icon">${icon('calendar', 17)}</div>
        <div><div class="item-title">Sunday Review</div><div class="item-sub">10 minutes, once a week</div></div>
      </div>
      <div style="color:#C9BFA8;">${icon('chevronRight', 18)}</div>
    </div>
    ${arcsHtml}
  </div>`;
}

function dayStatus(n, dayN) {
  if (dayN !== null && n === dayN) return 'today';
  if (dayN === null || n > dayN) return 'future';
  const log = state.logs[dateKeyForDay(n)];
  if (!log) return 'future';
  const anyC = ITEMS.some((it) => log[it.key] === 'c');
  if (anyC) return 'c';
  const allDone = ITEMS.every((it) => log[it.key] === 'done');
  if (allDone) return 'done';
  return 'future';
}

/* ---------- Sunday review ---------- */

function renderReview() {
  const dayN = currentDayNumber() || 1;
  const weekStart = Math.max(1, dayN - ((dayN - 1) % 7));
  const weekEnd = Math.min(75, weekStart + 6);
  const letters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const stripHtml = [];
  for (let n = weekStart; n <= weekStart + 6; n++) {
    const status = n > 75 ? 'future' : dayStatus(n, dayN);
    const st = status === 'today' ? { bg: 'var(--card)', border: 'var(--sage)' } : itemStyle(status === 'done' ? 'done' : status === 'c' ? 'c' : 'undone');
    stripHtml.push(`<div class="col"><div class="letter">${letters[n - weekStart]}</div><div class="week-dot" style="background:${st.bg};border:1.5px solid ${st.border};"></div></div>`);
  }

  const cCount = weekCompassionateCount(dayN);
  const review = state.reviews && state.reviews[weekStart] || {};

  const liftHtml = Object.keys(ui.liftDays).map((key) => {
    const letter = key.replace('2', '');
    const on = ui.liftDays[key];
    return `<div class="chip ${on ? 'on' : ''}" style="text-align:center;padding:10px 0;font-size:12.5px;" data-action="toggle-lift" data-key="${key}">${letter}</div>`;
  }).join('');

  return `
  <div class="screen">
    <div class="header">
      <div class="eyebrow">75 Compassionate</div>
      <h1 class="page-title">Sunday Review</h1>
      <div class="subtitle">10 minutes · Days ${weekStart}–${weekEnd}</div>
    </div>
    <div class="week-strip">${stripHtml.join('')}</div>
    <div class="callout callout-terracotta">
      ${icon('gratitude', 18)}
      <div>This week: <strong>${cCount} compassionate mark${cCount === 1 ? '' : 's'}</strong> logged. That&rsquo;s information, not failure.</div>
    </div>
    <div class="section">
      <div class="field-label">This week, in the body — one sentence</div>
      <input type="text" data-field="review:bodySentence" placeholder="What was this week actually like?" value="${escapeAttr(review.bodySentence)}"/>
    </div>
    <div class="section">
      <div class="field-label">One adjustment for next week</div>
      <textarea data-field="review:adjustment" rows="2" placeholder="Kinder and more true — not easier in a sneaky way.">${escapeHtml(review.adjustment || '')}</textarea>
    </div>
    <div class="section card" style="padding:0;overflow:hidden;">
      <div class="row-between" style="padding:14px 16px;cursor:pointer;" data-action="toggle-review-exercise">
        <div>
          <div class="field-label upper">This week&rsquo;s exercise</div>
          <div class="item-title" style="margin-top:2px;">How would you treat a friend?</div>
        </div>
        <div class="arc-chevron" style="transform:rotate(${ui.reviewExerciseOpen ? 180 : 0}deg);">${icon('chevronDown', 18)}</div>
      </div>
      ${ui.reviewExerciseOpen ? `
      <div style="padding:0 16px 16px;">
        <div style="font-size:13px;color:var(--ink-faint);line-height:1.5;margin-bottom:12px;">Two columns, side by side: what you&rsquo;d say to a friend who did what you did this week, and what you actually said to yourself.</div>
        <div class="field-label">What I&rsquo;d say to a friend</div>
        <textarea data-field="review:friendText" rows="2" placeholder="…" style="margin-bottom:10px;">${escapeHtml(review.friendText || '')}</textarea>
        <div class="field-label">What I said to myself</div>
        <textarea data-field="review:selfText" rows="2" placeholder="…" style="margin-bottom:10px;">${escapeHtml(review.selfText || '')}</textarea>
        <div class="field-label">This week, I&rsquo;m borrowing the line</div>
        <input type="text" data-field="review:borrowLine" placeholder="…" value="${escapeAttr(review.borrowLine)}"/>
      </div>` : ''}
    </div>
    <div class="section">
      <div class="field-label">Set your three lift days</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;">${liftHtml}</div>
    </div>
  </div>`;
}

function escapeAttr(s) { return escapeHtml(s || ''); }

/* ---------- Settings ---------- */

function renderSettings() {
  const dayN = currentDayNumber();
  const arc = dayN ? (ARCS.find((a) => dayN >= a.start && dayN <= a.end) || ARCS[ARCS.length - 1]) : ARCS[0];
  const initial = (state.name || 'You').trim().charAt(0).toUpperCase() || 'Y';

  function toggleRow(key, title, sub) {
    const on = state.reminders[key];
    return `<div class="row-between" style="padding:14px 16px;border-bottom:1px solid var(--border-soft);">
      <div><div class="item-title">${title}</div><div class="item-sub" style="margin-top:2px;">${sub}</div></div>
      <div class="switch ${on ? 'on' : ''}" data-action="toggle-reminder" data-key="${key}"><div class="switch-knob"></div></div>
    </div>`;
  }

  return `
  <div class="screen no-tabbar">
    <div class="header row" style="gap:12px;">
      <div class="back-btn" data-action="nav" data-key="today">${icon('back', 17)}</div>
      <h1 style="font-size:23px;">Settings</h1>
    </div>

    <div class="section" style="margin-top:18px;display:flex;align-items:center;gap:14px;">
      <div class="avatar">${initial}</div>
      <input type="text" data-field="settings:name" placeholder="Your name" value="${escapeAttr(state.name)}" style="flex:1;"/>
    </div>

    <div class="section">
      <div class="field-label upper" style="margin-bottom:8px;">Your cycle</div>
      <div class="card" style="padding:14px 16px;display:flex;flex-direction:column;gap:12px;">
        <div class="row-between">
          <div class="item-title">${dayN === null ? 'Not started' : dayN < 1 ? `Starts in ${1 - dayN} day${1 - dayN === 1 ? '' : 's'}` : dayN > 75 ? 'Day 75 of 75' : `Day ${dayN} of 75`}</div>
          <div class="item-sub">Arc ${arc.n}</div>
        </div>
        <div>
          <div class="item-sub" style="margin-bottom:6px;">Start date</div>
          <input type="date" data-field="settings:startDate" value="${state.startDate || ''}"/>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="field-label upper" style="margin-bottom:8px;">Reminders</div>
      <div class="card" style="overflow:hidden;">
        ${toggleRow('morning', 'Morning check-in', 'Water, meal plan, gratitude')}
        ${toggleRow('journal', 'Evening journal', 'A nudge for the nine-line page')}
        ${toggleRow('pause', 'Pause practice nudge', 'A gentle check mid-afternoon')}
      </div>
      <div class="item-sub" style="margin-top:8px;">Reminders are saved as preferences — push notifications aren&rsquo;t wired up yet in this early build.</div>
    </div>

    <div class="section">
      <div class="field-label upper" style="margin-bottom:8px;">Reading list</div>
      <div class="reading-card"><div class="item-title" style="font-size:13.5px;">The Mindful Self-Compassion Workbook</div><div class="item-sub">Kristin Neff &amp; Christopher Germer</div></div>
      <div class="reading-card"><div class="item-title" style="font-size:13.5px;">Self-Compassion</div><div class="item-sub">Kristin Neff</div></div>
    </div>

    <div class="section" style="margin-bottom:36px;">
      <div class="field-label upper" style="margin-bottom:8px;">About</div>
      <div class="about-text">75 Compassionate &middot; version 0.1 (early build)</div>
      <div class="about-text" style="margin-top:6px;">Independently developed. Not affiliated with or endorsed by any self-compassion research organization or program. The reading list above credits the researchers whose published work informed this app.</div>
    </div>
  </div>`;
}

/* ---------- Onboarding ---------- */

function renderOnboarding() {
  const s = ui.onboardStep;
  const dots = s > 0 ? [1, 2, 3].map((n) => `<div class="ob-dot ${s >= n ? 'on' : ''}"></div>`).join('') : '';
  const skip = s === 1 ? `<div class="ob-skip" data-action="ob-skip">Skip</div>` : '';

  let body = '';
  let footer = '';

  if (s === 0) {
    body = `
      <div style="text-align:center;">
        <div class="ob-mark">${icon('gratitude', 46)}</div>
        <div class="eyebrow" style="margin-bottom:8px;">Welcome</div>
        <h1 style="font-size:30px;line-height:1.2;margin-bottom:14px;">75 Compassionate</h1>
        <div class="step-caption">A 75-day practice in self-kindness, common humanity, and mindfulness — grounded in self-compassion research.</div>
        <div class="item-sub" style="margin-top:10px;">Same daily container as 75 Hard. A different relationship to it.</div>
      </div>
      <div class="about-text" style="text-align:center;margin-top:32px;">Independently developed. Not affiliated with or endorsed by any self-compassion research organization or program.</div>`;
    footer = `<div class="btn btn-primary" data-action="ob-next">Get Started</div>`;
  } else if (s === 1) {
    body = `
      <div class="eyebrow" style="margin-bottom:8px;color:var(--terracotta-text);">The one rule</div>
      <h2 style="font-size:25px;line-height:1.28;margin-bottom:14px;">You don&rsquo;t restart the clock.</h2>
      <div class="step-caption" style="margin-bottom:22px;">Miss a day? Name it, take a 60-second Pause Practice, mark it with a <strong style="color:var(--ink);">C</strong> — not an X — and continue tomorrow. Consistency is the point. Perfection is not.</div>
      <div class="ingredient-row"><div class="ingredient-icon">${icon('rings', 16)}</div><div><div class="item-title" style="font-size:13.5px;">Mindfulness</div><div class="item-sub">Notice what&rsquo;s actually here</div></div></div>
      <div class="ingredient-row"><div class="ingredient-icon">${icon('circles', 16)}</div><div><div class="item-title" style="font-size:13.5px;">Common humanity</div><div class="item-sub">You&rsquo;re not the only one who struggles</div></div></div>
      <div class="ingredient-row" style="margin-bottom:0;"><div class="ingredient-icon" style="background:var(--terracotta-soft);color:var(--terracotta-text);">${icon('heart', 16)}</div><div><div class="item-title" style="font-size:13.5px;">Self-kindness</div><div class="item-sub">Meet it gently, not harshly</div></div></div>`;
    footer = navPair();
  } else if (s === 2) {
    const opts = [['today', 'Start today'], ['tomorrow', 'Start tomorrow'], ['monday', 'Start next Monday']];
    body = `
      <div class="eyebrow" style="margin-bottom:8px;">Set your start</div>
      <h2 style="font-size:25px;line-height:1.28;margin-bottom:10px;">When does Day 1 begin?</h2>
      <div class="step-caption" style="margin-bottom:20px;">Pick a start date — your 75 days count from there. Change it any time before you begin.</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
        ${opts.map(([key, label]) => `<div class="chip ${ui.onboardChoice === key ? 'on' : ''}" data-action="ob-pick" data-key="${key}">${label}</div>`).join('')}
      </div>
      <div class="field-label" style="margin-bottom:6px;">Or choose a date</div>
      <input type="date" data-field="ob:customDate" value="${ui.onboardCustomDate}"/>`;
    footer = navPair();
  } else if (s === 3) {
    const label = ui.onboardChoice === 'custom' ? (ui.onboardCustomDate || 'on your chosen date')
      : ui.onboardChoice === 'today' ? 'today' : ui.onboardChoice === 'tomorrow' ? 'tomorrow' : 'next Monday';
    body = `
      <div style="text-align:center;">
        <div class="ob-mark" style="background:var(--terracotta-soft);color:var(--terracotta-text);">${icon('check', 46)}</div>
        <div class="eyebrow" style="margin-bottom:8px;">You&rsquo;re set</div>
        <h2 style="font-size:24px;line-height:1.3;margin-bottom:14px;">Day 1 begins ${label}.</h2>
        <div class="step-caption">Seventy-five days of showing up unevenly is the whole practice. You only leave if you decide to stop.</div>
      </div>`;
    footer = `<div class="btn btn-primary" data-action="ob-finish">Enter 75 Compassionate</div>`;
  }

  return `
  <div class="ob-wrap">
    <div class="ob-dots row-between">${dots}${skip}</div>
    <div class="ob-body">${body}</div>
    <div class="ob-footer">${footer}</div>
  </div>`;

  function navPair() {
    return `<div style="display:flex;gap:10px;">
      <div class="btn btn-secondary" data-action="ob-back">Back</div>
      <div class="btn btn-primary grow" data-action="ob-next">Next</div>
    </div>`;
  }
}

function resolveOnboardStartDate() {
  const today = todayKey();
  if (ui.onboardChoice === 'today') return today;
  if (ui.onboardChoice === 'tomorrow') return addDays(today, 1);
  if (ui.onboardChoice === 'monday') return nextMonday(today);
  if (ui.onboardChoice === 'custom' && ui.onboardCustomDate) return ui.onboardCustomDate;
  return today;
}

function handleOnboardAction(action, key) {
  if (action === 'ob-next') ui.onboardStep = Math.min(ui.onboardStep + 1, 3);
  else if (action === 'ob-back') ui.onboardStep = Math.max(ui.onboardStep - 1, 0);
  else if (action === 'ob-skip') ui.onboardStep = 2;
  else if (action === 'ob-pick') ui.onboardChoice = key;
  else if (action === 'ob-finish') {
    state.startDate = resolveOnboardStartDate();
    state.onboarded = true;
    saveState();
    ui.onboardStep = 0;
    navigate('today');
    return;
  }
  render();
}

/* ---------- Event delegation ---------- */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  const key = el.dataset.key;

  if (action === 'nav') { navigate(key); return; }

  if (action.startsWith('ob-')) { handleOnboardAction(action, key); return; }
  if (action.startsWith('pause-')) { handlePauseAction(action); return; }

  if (action === 'toggle-item') {
    const log = getLog(todayKey());
    const order = ['undone', 'done', 'c'];
    log[key] = order[(order.indexOf(log[key]) + 1) % 3];
    saveState();
    render();
    return;
  }

  if (action === 'toggle-arc') {
    ui.openArc = ui.openArc === Number(key) ? null : Number(key);
    render();
    return;
  }

  if (action === 'toggle-review-exercise') { ui.reviewExerciseOpen = !ui.reviewExerciseOpen; render(); return; }

  if (action === 'toggle-lift') { ui.liftDays[key] = !ui.liftDays[key]; render(); return; }

  if (action === 'toggle-reminder') {
    state.reminders[key] = !state.reminders[key];
    saveState();
    render();
    return;
  }
});

document.addEventListener('input', (e) => {
  const el = e.target.closest('[data-field]');
  if (!el) return;
  const field = el.dataset.field;
  const val = el.value;

  if (field.startsWith('review:')) {
    const dayN = currentDayNumber() || 1;
    const weekStart = Math.max(1, dayN - ((dayN - 1) % 7));
    if (!state.reviews) state.reviews = {};
    if (!state.reviews[weekStart]) state.reviews[weekStart] = {};
    state.reviews[weekStart][field.split(':')[1]] = val;
    saveState();
    return;
  }
  if (field.startsWith('settings:')) {
    const sub = field.split(':')[1];
    if (sub === 'name') state.name = val;
    if (sub === 'startDate' && val) state.startDate = val;
    saveState();
    if (sub === 'startDate') render();
    return;
  }
  if (field.startsWith('ob:')) {
    ui.onboardCustomDate = val;
    ui.onboardChoice = 'custom';
    return;
  }
  // journal fields (today's log)
  const log = getLog(todayKey());
  log.journal[field] = val;
  saveState();
});
