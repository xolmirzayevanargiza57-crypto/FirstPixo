const K = 'chatMessages';
const EM = ['❤️', '😂', '😮', '😢', '😡', '👍', '👎', '🔥', '🎉', '😍', '💯', '👏', '🤩', '😎', '✨', '💪', '⚡️', '🙏', '💀', '🫡'];
let imgD = null, rec = null, chunks = [], recOn = false, recS = 0, recT = null, holdT = null, pickI = -1;

const gm = () => JSON.parse(localStorage.getItem(K) || '[]');
const sm = v => localStorage.setItem(K, JSON.stringify(v));
const nt = () => new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
function ar(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100) + 'px' }

/* RENDER */
function render() {
  const b = document.getElementById('box'), ms = gm();
  b.innerHTML = '';
  if (!ms.length) {
    b.innerHTML = `<div class="empty"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Hozircha xabar yo'q</div>`;
    return;
  }
  ms.forEach((m, i) => b.appendChild(mk(m, i)));
  b.scrollTop = b.scrollHeight;
}

function mk(m, i) {
  const isA = m.sender === 'admin', isU = m.sender === 'user', isS = m.type === 'sticker';
  const w = document.createElement('div');
  w.className = 'mw ' + (isA ? 'R' : 'L');

  const l = document.createElement('div');
  l.className = 'sl';
  l.innerHTML = isA
    ? `<svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>Admin`
    : `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>Foydalanuvchi`;
  w.appendChild(l);

  const c = document.createElement('div');
  if (isS) {
    c.className = 'mc S'; c.textContent = m.content || '';
  } else {
    c.className = 'mc ' + (isA ? 'A' : 'U');

    const d = document.createElement('button');
    d.className = 'db';
    d.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>O'chirish`;
    d.onclick = e => { e.stopPropagation(); del(i) };
    c.appendChild(d);

    if (m.type === 'text') {
      const t = document.createElement('div'); t.className = 'mt'; t.textContent = m.content || ''; c.appendChild(t);
    } else if (m.type === 'image') {
      const lb = document.createElement('div'); lb.className = 'tl';
      lb.innerHTML = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Rasm`;
      c.appendChild(lb);
      const img = document.createElement('img'); img.className = 'ci'; img.src = m.content; c.appendChild(img);
    } else if (m.type === 'audio') {
      const lb = document.createElement('div'); lb.className = 'tl';
      lb.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>Ovozli xabar`;
      c.appendChild(lb);
      const au = document.createElement('audio'); au.controls = true; au.src = m.content; au.preload = 'metadata'; c.appendChild(au);
    }

    const tm = document.createElement('div'); tm.className = 'tm'; tm.textContent = m.time || ''; c.appendChild(tm);

    const sp = () => { holdT = setTimeout(() => { document.querySelectorAll('.mc').forEach(x => x.classList.remove('sd')); c.classList.add('sd'); }, 600) };
    const ep = () => clearTimeout(holdT);
    c.addEventListener('mousedown', sp); c.addEventListener('mouseup', ep); c.addEventListener('mouseleave', ep);
    c.addEventListener('touchstart', sp, { passive: true }); c.addEventListener('touchend', ep);
    document.addEventListener('click', e => { if (!c.contains(e.target)) c.classList.remove('sd'); });
  }
  w.appendChild(c);

  if (isA && !isS) {
    const rr = document.createElement('div'); rr.className = 'rr';
    buildR(rr, m, i); w.appendChild(rr);
  }
  return w;
}

function buildR(rr, m, i) {
  rr.innerHTML = '';
  Object.entries(m.reactions || {}).forEach(([e, n]) => {
    if (n <= 0) return;
    const ch = document.createElement('div');
    ch.className = 'rc' + ((m.myReactions || []).includes(e) ? ' me' : '');
    ch.innerHTML = `${e}<span class="rn">${n}</span>`;
    ch.onclick = () => togR(i, e); rr.appendChild(ch);
  });
  const ab = document.createElement('button'); ab.className = 'ra';
  ab.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>Reaktsiya`;
  ab.onclick = e => { e.stopPropagation(); openEP(i, rr, ab) };
  rr.appendChild(ab);
}

function openEP(i, rr, ab) {
  document.querySelectorAll('.ep').forEach(p => p.remove());
  if (pickI === i) { pickI = -1; return; } pickI = i;
  const p = document.createElement('div'); p.className = 'ep on';
  EM.forEach(e => {
    const s = document.createElement('span'); s.textContent = e;
    s.onclick = ev => { ev.stopPropagation(); togR(i, e); p.remove(); pickI = -1; };
    p.appendChild(s);
  });
  rr.insertBefore(p, ab);
  setTimeout(() => document.addEventListener('click', function h(e) {
    if (!p.contains(e.target)) { p.remove(); pickI = -1; document.removeEventListener('click', h); }
  }), 0);
}

function togR(i, e) {
  const ms = gm(); if (!ms[i]) return;
  ms[i].reactions = ms[i].reactions || {};
  ms[i].myReactions = ms[i].myReactions || [];
  const has = ms[i].myReactions.includes(e);
  if (has) {
    ms[i].myReactions = ms[i].myReactions.filter(x => x !== e);
    ms[i].reactions[e] = Math.max(0, (ms[i].reactions[e] || 1) - 1);
  } else {
    ms[i].myReactions.push(e);
    ms[i].reactions[e] = (ms[i].reactions[e] || 0) + 1;
  }
  sm(ms); render();
}

/* ✅ send() — HTML dagi onclick="send()" ga mos */
function send() {
  const ta = document.getElementById('mi');
  const txt = ta.value.trim();
  const now = nt();
  const ms = gm();
  let ok = false;
  if (imgD) {
    ms.push({ type: 'image', content: imgD, time: now, sender: 'admin' });
    clearImg(); ok = true;
  }
  if (txt) {
    ms.push({ type: 'text', content: txt, time: now, sender: 'admin' });
    ta.value = ''; ta.style.height = 'auto'; ok = true;
  }
  if (ok) { sm(ms); render(); }
}

/* IMAGE */
function pickImg(e) {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    imgD = ev.target.result;
    document.getElementById('pi').src = imgD;
    document.getElementById('pn').textContent = f.name;
    document.getElementById('pb').classList.add('on');
  };
  r.readAsDataURL(f);
}
function clearImg() {
  imgD = null;
  document.getElementById('pb').classList.remove('on');
  document.getElementById('fi').value = '';
}

/* AUDIO */
function toggleRec() { recOn ? stopRec() : startRec(); }

function startRec() {
  if (!navigator.mediaDevices?.getUserMedia) { alert('Mikrofon qo\'llab-quvvatlanmaydi!'); return; }
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg', 'audio/mp4'];
    const mt = types.find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
    rec = mt ? new MediaRecorder(stream, { mimeType: mt }) : new MediaRecorder(stream);
    chunks = [];
    rec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
      const r = new FileReader();
      r.onload = ev => {
        const ms = gm();
        ms.push({ type: 'audio', content: ev.target.result, time: nt(), sender: 'admin' });
        sm(ms); render();
      };
      r.readAsDataURL(blob);
      stream.getTracks().forEach(t => t.stop());
    };
    rec.start(100); recOn = true; recS = 0;
    document.getElementById('rb').classList.add('on');
    document.getElementById('mb').classList.add('rec');
    recT = setInterval(() => {
      recS++;
      const m = Math.floor(recS / 60), s = recS % 60;
      document.getElementById('rtt').textContent = `${m}:${String(s).padStart(2, '0')}`;
    }, 1000);
  }).catch(() => alert('Mikrofon ruxsati berilmadi!'));
}

function stopRec() {
  if (rec && recOn) rec.stop();
  recOn = false; clearInterval(recT);
  document.getElementById('rb').classList.remove('on');
  document.getElementById('mb').classList.remove('rec');
}

/* DELETE */
function del(i) {
  const ms = gm(); ms.splice(i, 1); sm(ms); render();
}

window.addEventListener('storage', render);
render();