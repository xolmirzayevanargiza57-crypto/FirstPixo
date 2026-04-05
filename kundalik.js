let tasks = JSON.parse(localStorage.getItem('pixo_tasks') || '[]');
let currentView = 'daily';
let currentFilter = 'all';
let selectedPriority = 'mid';
let selectedReminder = null;
let editId = null;
let selectedWeekDay = null;
let alarmInterval = null;
let alarmContext = null;
let isAlarmPlaying = false;

const DAYS_UZ = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shah'];
const MONTHS_UZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

// ===== ALARM =====
function startAlarm(taskName) {
    if (isAlarmPlaying) return;
    isAlarmPlaying = true;
    alarmContext = new (window.AudioContext || window.webkitAudioContext)();

    function beep(t, freq, dur) {
        const osc = alarmContext.createOscillator();
        const gain = alarmContext.createGain();
        osc.connect(gain); gain.connect(alarmContext.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + dur * 0.5);
        osc.frequency.exponentialRampToValueAtTime(freq, t + dur);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.35, t + 0.01);
        gain.gain.setValueAtTime(0.35, t + dur - 0.04);
        gain.gain.linearRampToValueAtTime(0, t + dur);
        osc.start(t); osc.stop(t + dur);
    }

    function playPattern() {
        if (!alarmContext) return;
        const n = alarmContext.currentTime;
        beep(n + 0.0, 880, 0.14); beep(n + 0.2, 880, 0.14); beep(n + 0.4, 880, 0.14);
        beep(n + 0.7, 1100, 0.38); beep(n + 1.2, 880, 0.14); beep(n + 1.4, 880, 0.14);
        beep(n + 1.6, 880, 0.14); beep(n + 1.9, 1100, 0.38);
    }

    playPattern();
    alarmInterval = setInterval(playPattern, 2600);

    // Alarm overlay
    const el = document.createElement('div');
    el.id = 'alarmOverlay';
    el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.93);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);animation:alarmFadeIn 0.3s ease;';
    el.innerHTML = `
    <style>
      @keyframes ringRotate{0%{transform:rotate(-18deg)}50%{transform:rotate(18deg)}100%{transform:rotate(-18deg)}}
      @keyframes alarmPulse{0%,100%{transform:scale(1);box-shadow:0 4px 24px rgba(255,68,68,0.4)}50%{transform:scale(1.04);box-shadow:0 8px 40px rgba(255,68,68,0.7)}}
      @keyframes waveAnim{0%,100%{transform:scaleY(1);opacity:0.5}50%{transform:scaleY(2);opacity:1}}
      @keyframes alarmFadeIn{from{opacity:0}to{opacity:1}}
      .a-box{background:#181818;border:1px solid rgba(255,80,80,0.25);border-radius:24px;padding:32px 26px;text-align:center;max-width:290px;width:88%;box-shadow:0 0 80px rgba(255,68,68,0.2);}
      .a-bell-wrap{display:flex;justify-content:center;margin-bottom:16px;}
      .a-bell{width:56px;height:56px;stroke:#ff6f00;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;animation:ringRotate 0.45s ease-in-out infinite;transform-origin:50% 8%;}
      .a-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:6px;}
      .a-sub{font-size:12px;color:#777;margin-bottom:8px;}
      .a-task{font-size:13px;color:#eee;margin-bottom:20px;background:rgba(255,255,255,0.05);border-radius:10px;padding:10px 14px;border:1px solid rgba(255,255,255,0.07);}
      .a-waves{display:flex;justify-content:center;align-items:center;gap:4px;margin-bottom:22px;height:38px;}
      .w{width:4px;border-radius:99px;background:linear-gradient(180deg,#ff4444,#ff8800);}
      .w1{height:12px;animation:waveAnim 0.65s 0.00s ease-in-out infinite;}
      .w2{height:22px;animation:waveAnim 0.65s 0.08s ease-in-out infinite;}
      .w3{height:16px;animation:waveAnim 0.65s 0.16s ease-in-out infinite;}
      .w4{height:32px;animation:waveAnim 0.65s 0.24s ease-in-out infinite;}
      .w5{height:20px;animation:waveAnim 0.65s 0.32s ease-in-out infinite;}
      .w6{height:28px;animation:waveAnim 0.65s 0.40s ease-in-out infinite;}
      .w7{height:14px;animation:waveAnim 0.65s 0.48s ease-in-out infinite;}
      .w8{height:24px;animation:waveAnim 0.65s 0.56s ease-in-out infinite;}
      .w9{height:18px;animation:waveAnim 0.65s 0.64s ease-in-out infinite;}
      .a-stop{width:100%;padding:15px;border-radius:14px;background:linear-gradient(135deg,#ff3333,#ff6f00);border:none;color:#fff;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;animation:alarmPulse 1s ease-in-out infinite;display:flex;align-items:center;justify-content:center;gap:8px;}
      .a-stop svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;}
    </style>
    <div class="a-box">
      <div class="a-bell-wrap">
        <svg class="a-bell" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
          <line x1="12" y1="2" x2="12" y2="4"/>
        </svg>
      </div>
      <div class="a-title">Vaqt tugadi!</div>
      <div class="a-sub">Deadline yetdi</div>
      <div class="a-task">${taskName}</div>
      <div class="a-waves">
        <div class="w w1"></div><div class="w w2"></div><div class="w w3"></div>
        <div class="w w4"></div><div class="w w5"></div><div class="w w6"></div>
        <div class="w w7"></div><div class="w w8"></div><div class="w w9"></div>
      </div>
      <button class="a-stop" onclick="stopAlarm()">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
        To'xtatish
      </button>
    </div>
  `;
    document.body.appendChild(el);

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pixo — Vaqt tugadi!', { body: '"' + taskName + '" deadline yetdi!' });
    }
}

function stopAlarm() {
    isAlarmPlaying = false;
    clearInterval(alarmInterval);
    alarmInterval = null;
    if (alarmContext) { alarmContext.close(); alarmContext = null; }
    const el = document.getElementById('alarmOverlay');
    if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }
}

// ===== INIT =====
function init() {
    const now = new Date();
    document.getElementById('todayBadge').textContent =
        `${DAYS_UZ[now.getDay()]}, ${now.getDate()} ${MONTHS_UZ[now.getMonth()]}`;
    selectedWeekDay = toDateStr(now);
    renderAll();
    checkDeadlines();
    setInterval(checkDeadlines, 30000);
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function toDateStr(d) { return d.toISOString().slice(0, 10); }
function save() { localStorage.setItem('pixo_tasks', JSON.stringify(tasks)); }

// ===== DEADLINES =====
function checkDeadlines() {
    if (isAlarmPlaying) return;
    const now = new Date();
    tasks.filter(t => !t.done && t.deadline).forEach(t => {
        const dl = new Date(t.deadline);
        const diff = dl - now;
        if (diff >= -35000 && diff <= 35000) { startAlarm(t.name); return; }
        if (t.reminder && !t.reminderFired) {
            const rt = new Date(dl.getTime() - t.reminder * 60000);
            if (Math.abs(rt - now) <= 35000) {
                t.reminderFired = true; save();
                showToast('"' + t.name + '" — ' + reminderLabel(t.reminder) + ' qoldi!', 'bell');
            }
        }
    });
}

// ===== RENDER =====
function renderAll() { updateStats(); currentView === 'daily' ? renderDaily() : renderWeekly(); }

function updateStats() {
    const today = toDateStr(new Date());
    const td = tasks.filter(t => t.date === today);
    const total = td.length, done = td.filter(t => t.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById('statTotal').textContent = tasks.length;
    document.getElementById('statDone').textContent = tasks.filter(t => t.done).length;
    document.getElementById('statLeft').textContent = tasks.filter(t => !t.done).length;
    document.getElementById('progressPct').textContent = pct + '%';
    document.getElementById('progressFill').style.width = pct + '%';
}

// SVG icons inline
const ICONS = {
    check: `<svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:#fff;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"><polyline points="20 6 9 17 4 12"/></svg>`,
    edit: `<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bell: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    star: `<svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`,
    zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    minus: `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    alert: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

function wrapIcon(svg, size = 12) {
    return svg.replace('<svg ', `<svg style="width:${size}px;height:${size}px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round" `);
}

function priorityColor(p) { return p === 'high' ? '#ff6f00' : p === 'mid' ? '#ffd166' : '#555'; }
function priorityLabel(p) {
    return p === 'high' ? ['chip-orange', wrapIcon(ICONS.star) + ' Yuqori']
        : p === 'mid' ? ['chip-yellow', wrapIcon(ICONS.zap) + ' O\'rta']
            : ['chip-gray', wrapIcon(ICONS.minus) + ' Past'];
}

function deadlineChip(deadline) {
    if (!deadline) return '';
    const now = new Date(), dl = new Date(deadline), diff = dl - now, hrs = diff / 3600000;
    let cls;
    if (diff < 0) cls = 'chip-red';
    else if (hrs < 3) cls = 'chip-red';
    else if (hrs < 24) cls = 'chip-yellow';
    else cls = 'chip-green';
    return `<span class="chip ${cls}">${wrapIcon(ICONS.clock)} ${formatDL(deadline)}</span>`;
}

function formatDL(dl) {
    const d = new Date(dl);
    return `${d.getDate()} ${MONTHS_UZ[d.getMonth()].slice(0, 3)}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function reminderLabel(r) {
    return r == 15 ? '15 daq' : r == 30 ? '30 daq' : r == 60 ? '1 soat' : r == 1440 ? '1 kun' : r + ' daq';
}

function applyFilter(list) {
    const now = new Date();
    if (currentFilter === 'all') return list;
    if (currentFilter === 'high') return list.filter(t => t.priority === 'high');
    if (currentFilter === 'mid') return list.filter(t => t.priority === 'mid');
    if (currentFilter === 'low') return list.filter(t => t.priority === 'low');
    if (currentFilter === 'done') return list.filter(t => t.done);
    if (currentFilter === 'overdue') return list.filter(t => t.deadline && new Date(t.deadline) < now && !t.done);
    return list;
}

function taskCardHTML(t, delay = 0) {
    const [pClass, pLabel] = priorityLabel(t.priority);
    const dl = deadlineChip(t.deadline);
    const rem = t.reminder ? `<span class="chip chip-purple">${wrapIcon(ICONS.bell)} ${reminderLabel(t.reminder)} oldin</span>` : '';
    return `
  <div class="task-card ${t.done ? 'done' : ''}" style="--pcolor:${priorityColor(t.priority)};animation-delay:${delay}s">
    <div class="task-top">
      <div class="task-check ${t.done ? 'checked' : ''}" onclick="toggleDone('${t.id}')">
        ${t.done ? ICONS.check : ''}
      </div>
      <div class="task-body">
        <div class="task-title">${t.name}</div>
        ${t.desc ? `<div class="task-desc">${t.desc}</div>` : ''}
        <div class="task-meta">
          <span class="chip ${pClass}">${pLabel}</span>
          ${dl}${rem}
        </div>
      </div>
      <div class="task-actions">
        <div class="icon-btn" onclick="editTask('${t.id}')">${wrapIcon(ICONS.edit, 14)}</div>
        <div class="icon-btn del" onclick="deleteTask('${t.id}')">${wrapIcon(ICONS.trash, 14)}</div>
      </div>
    </div>
  </div>`;
}

const EMPTY_SVG = `<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`;

function renderDaily() {
    const today = toDateStr(new Date());
    let list = applyFilter(tasks.filter(t => t.date === today));
    const pending = list.filter(t => !t.done), done = list.filter(t => t.done);
    let html = '';
    if (!list.length) {
        html = `<div class="empty">${EMPTY_SVG}<p>Hech qanday vazifa yo'q</p><small>Yuqoridagi + tugmani bosing</small></div>`;
    } else {
        if (pending.length) {
            html += `<div class="section-title">Bajarilmagan (${pending.length})</div>`;
            pending.forEach((t, i) => { html += taskCardHTML(t, i * 0.06); });
        }
        if (done.length) {
            html += `<div class="section-title">Bajarilgan (${done.length})</div>`;
            done.forEach(t => { html += taskCardHTML(t); });
        }
    }
    document.getElementById('taskList').innerHTML = html;
}

function renderWeekly() {
    const now = new Date(), dow = now.getDay();
    const mon = new Date(now); mon.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    let wh = '';
    for (let i = 0; i < 7; i++) {
        const d = new Date(mon); d.setDate(mon.getDate() + i);
        const ds = toDateStr(d);
        const hasTasks = tasks.some(t => t.date === ds);
        const isToday = ds === toDateStr(now);
        const isActive = ds === selectedWeekDay;
        wh += `<div class="day-btn ${isActive ? 'active' : ''} ${isToday ? 'today' : ''} ${hasTasks ? 'has-tasks' : ''}" onclick="selectWeekDay('${ds}')">
      <div class="day-name">${DAYS_UZ[d.getDay()]}</div>
      <div class="day-num">${d.getDate()}</div>
      <div class="day-dot"></div>
    </div>`;
    }
    document.getElementById('weekGrid').innerHTML = wh;
    let list = applyFilter(tasks.filter(t => t.date === selectedWeekDay));
    let html = '';
    if (!list.length) {
        html = `<div class="empty">${EMPTY_SVG}<p>Bu kun uchun vazifa yo'q</p></div>`;
    } else {
        list.forEach((t, i) => { html += taskCardHTML(t, i * 0.06); });
    }
    document.getElementById('weekTaskList').innerHTML = html;
}

function selectWeekDay(ds) { selectedWeekDay = ds; renderWeekly(); }

function toggleDone(id) {
    const t = tasks.find(x => x.id === id); if (!t) return;
    t.done = !t.done; save();
    showToast(t.done ? 'Vazifa bajarildi!' : 'Vazifa qaytarildi', t.done ? 'check' : 'clock');
    renderAll();
}

function deleteTask(id) {
    tasks = tasks.filter(x => x.id !== id); save();
    showToast("Vazifa o'chirildi", 'trash');
    renderAll();
}

function editTask(id) {
    const t = tasks.find(x => x.id === id); if (!t) return;
    editId = id;
    document.getElementById('taskName').value = t.name;
    document.getElementById('taskDesc').value = t.desc || '';
    document.getElementById('taskDeadline').value = t.deadline || '';
    selectPriority(t.priority);
    selectedReminder = null;
    document.querySelectorAll('.reminder-opt').forEach(e => e.classList.remove('selected'));
    if (t.reminder) selectReminder(String(t.reminder));
    document.getElementById('modalTitle').innerHTML = `
    <svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:var(--accent);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
    Vazifani tahrirlash`;
    openModal();
}

function saveTask() {
    const name = document.getElementById('taskName').value.trim();
    if (!name) { showToast('Vazifa nomini kiriting!', 'alert'); return; }
    const deadline = document.getElementById('taskDeadline').value;
    const desc = document.getElementById('taskDesc').value.trim();
    const today = toDateStr(new Date());
    if (editId) {
        const t = tasks.find(x => x.id === editId);
        if (t) { t.name = name; t.desc = desc; t.deadline = deadline; t.priority = selectedPriority; t.reminder = selectedReminder; t.reminderFired = false; }
        editId = null;
        showToast('Vazifa yangilandi!', 'edit');
    } else {
        tasks.push({ id: Date.now().toString(), name, desc, deadline, priority: selectedPriority, reminder: selectedReminder, done: false, date: today, created: new Date().toISOString(), reminderFired: false });
        showToast("Yangi vazifa qo'shildi!", 'check');
    }
    save(); closeModal(); renderAll();
}

function openModal() { document.getElementById('modalOverlay').classList.add('show'); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); editId = null; }
function closeModalOutside(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }

function selectPriority(p) {
    selectedPriority = p;
    ['high', 'mid', 'low'].forEach(k => { const el = document.getElementById('p-' + k); el.className = 'priority-opt'; if (k === p) el.classList.add('selected-' + k); });
}

function selectReminder(r) {
    selectedReminder = selectedReminder == r ? null : r;
    ['15', '30', '60', '1440'].forEach(k => { document.getElementById('r-' + k).classList.toggle('selected', k == selectedReminder); });
}

function switchView(v, btn) {
    currentView = v;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('dailyView').style.display = v === 'daily' ? 'block' : 'none';
    document.getElementById('weeklyView').style.display = v === 'weekly' ? 'block' : 'none';
    renderAll();
}

function setFilter(f, el) {
    currentFilter = f;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active'); renderAll();
}

let toastTimer;
function showToast(msg, iconKey = 'check') {
    const iconMap = {
        check: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--green);fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"><polyline points="20 6 9 17 4 12"/></svg>`,
        trash: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--red);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>`,
        edit: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:#60a5fa;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        bell: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:#c084fc;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
        alert: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--yellow);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        clock: `<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--text2);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    };
    const el = document.getElementById('toast');
    el.innerHTML = (iconMap[iconKey] || '') + msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

init();

// ===== WINDOW CLICK — istalgan joyga bosganda modal yopiladi =====
window.addEventListener('click', function (e) {
    const overlay = document.getElementById('modalOverlay');

    // Modal overlay o'zi yoki uning tashqarisiga bosilsa
    if (overlay && overlay.classList.contains('show')) {
        const modal = overlay.querySelector('.modal');

        // Agar click modal ichiga tegmagan bo'lsa — yopiladi
        if (!modal.contains(e.target)) {
            closeModal();
        }
    }
});

// ===== ESCAPE tugmasi bilan ham yopiladi =====
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
        stopAlarm();
    }
});