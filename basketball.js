// ============================================================
//  BASKETBALL MINI-GAME
//  localStorage: level saqlanadi, restart da o'chiriladi
// ============================================================

const LS_KEY = 'basketball_level'; // localStorage kaliti

/* ── localStorage HELPERS ── */
function saveLevel(lvl) {
  try {
    localStorage.setItem(LS_KEY, lvl);
    showSavedBadge();
  } catch(e) {}
}

function loadLevel() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v ? parseInt(v) : 1;
  } catch(e) { return 1; }
}

function clearLevel() {
  try { localStorage.removeItem(LS_KEY); } catch(e) {}
}

// "Saqlandi" badge ko'rsatish
let badgeTimer = null;
function showSavedBadge() {
  const b = document.getElementById('savedBadge');
  b.classList.add('show');
  clearTimeout(badgeTimer);
  badgeTimer = setTimeout(() => b.classList.remove('show'), 1800);
}

/* ── AUDIO ── */
let audioCtx = null;
function getAC() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playSound(type) {
  try {
    const ac = getAC();
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    if (type === 'shoot') {
      o.type = 'sine';
      o.frequency.setValueAtTime(260, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(110, ac.currentTime + 0.18);
      g.gain.setValueAtTime(0.22, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.18);
      o.start(); o.stop(ac.currentTime + 0.18);
    } else if (type === 'score') {
      [0, 0.08, 0.16].forEach((t, i) => {
        const oo = ac.createOscillator(), gg = ac.createGain();
        oo.connect(gg); gg.connect(ac.destination);
        oo.type = 'triangle';
        oo.frequency.setValueAtTime([523,659,784][i], ac.currentTime + t);
        gg.gain.setValueAtTime(0.3, ac.currentTime + t);
        gg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.3);
        oo.start(ac.currentTime + t); oo.stop(ac.currentTime + t + 0.32);
      });
    } else if (type === 'bounce') {
      o.type = 'sine';
      o.frequency.setValueAtTime(170, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(78, ac.currentTime + 0.1);
      g.gain.setValueAtTime(0.14, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
      o.start(); o.stop(ac.currentTime + 0.1);
    } else if (type === 'streak') {
      [0,0.07,0.14,0.21,0.28].forEach((t, i) => {
        const oo = ac.createOscillator(), gg = ac.createGain();
        oo.connect(gg); gg.connect(ac.destination);
        oo.type = 'square';
        oo.frequency.setValueAtTime([392,440,494,523,587][i], ac.currentTime + t);
        gg.gain.setValueAtTime(0.1, ac.currentTime + t);
        gg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.14);
        oo.start(ac.currentTime + t); oo.stop(ac.currentTime + t + 0.2);
      });
    }
  } catch(e) {}
}

/* ── CANVAS ── */
const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');
let W, H;

function resize() {
  const tb = document.getElementById('topBar');
  W = window.innerWidth;
  H = window.innerHeight - tb.offsetHeight;
  canvas.width  = W;
  canvas.height = H;
}
window.addEventListener('resize', () => { resize(); resetBall(); resetHoop(); });
resize();

/* ── SIZES ── */
function sz() {
  const s = Math.min(W, H);
  const scale = W > 900 ? 1.18 : W > 600 ? 1.08 : 1.0;
  return {
    ballR      : s * 0.048 * scale,
    hoopW      : s * 0.19  * scale,
    rimR       : s * 0.012 * scale,
    hoopY      : Math.max(80, H * 0.13),
    ballStartY : H * 0.68,
  };
}

/* ── STATE ── */
let score = 0, level = 1, streak = 0;
let shooting = false, dragging = false, scored = false;
let ball  = { x:0, y:0, vx:0, vy:0, r:0, trail:[] };
let hoop  = { x:0, y:0, w:0, rimR:0, dir:1, speed:0 };
let dragStart = {x:0,y:0}, dragNow = {x:0,y:0};

/* ── INIT ──
   Sahifa ochilganda localStorage dan level yuklanadi.
   Restart tugmasi bosilganda localStorage tozalanib level=1 dan boshlanadi. */
function init(fromRestart = false) {
  if (fromRestart) {
    // ✅ Restart: localStorage ni o'chir, level 1 dan boshlash
    clearLevel();
    score = 0; level = 1; streak = 0;
  } else {
    // ✅ Sahifa ochilganda: saqlangan levalni yukla
    score = 0; streak = 0;
    level = loadLevel();
  }
  updateUI();
  resetBall();
  resetHoop();
}

function resetBall() {
  const s = sz();
  ball.r  = s.ballR;
  ball.x  = W / 2;
  ball.y  = s.ballStartY;
  ball.vx = ball.vy = 0;
  ball.trail = [];
  shooting = false; dragging = false;
}

function resetHoop() {
  const s = sz();
  hoop.y    = s.hoopY;
  hoop.w    = s.hoopW;
  hoop.rimR = s.rimR;
  hoop.x    = W / 2;
  hoop.dir  = 1;
  hoop.speed = (0.55 + (level - 1) * 0.30) * (W > 900 ? 1.25 : 1.0);
}

function updateUI() {
  const sd = document.getElementById('scoreDisplay');
  sd.textContent = score;
  sd.classList.remove('bump'); void sd.offsetWidth; sd.classList.add('bump');
  setTimeout(() => sd.classList.remove('bump'), 200);
  document.getElementById('lvlText').textContent = `Level ${level}`;
}

/* ── INPUT ── */
function topH() { return document.getElementById('topBar').offsetHeight; }
function getP(e) {
  return e.touches
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY - topH() }
    : { x: e.clientX,            y: e.clientY - topH() };
}

canvas.addEventListener('mousedown',  onDown);
canvas.addEventListener('touchstart', onDown, { passive:false });
canvas.addEventListener('mousemove',  onMove);
canvas.addEventListener('touchmove',  onMove, { passive:false });
canvas.addEventListener('mouseup',    onUp);
canvas.addEventListener('touchend',   onUp);

function onDown(e) {
  e.preventDefault();
  if (shooting) return;
  dragging = true;
  dragStart = dragNow = getP(e);
  document.getElementById('hint').style.opacity = '0';
}
function onMove(e) { e.preventDefault(); if (dragging) dragNow = getP(e); }
function onUp(e) {
  e.preventDefault();
  if (!dragging || shooting) return;
  dragging = false;
  const dx = dragStart.x - dragNow.x;
  const dy = dragStart.y - dragNow.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 16) return;

  const s       = sz();
  const maxDrag = Math.min(W, H) * 0.55;
  const power   = Math.min(dist, maxDrag);
  const norm    = power / maxDrag;
  const maxSpd  = 24 + level * 0.8;

  ball.vx = (dx / dist) * norm * maxSpd * 0.50;
  ball.vy = (dy / dist) * norm * maxSpd;
  ball.x  = W / 2;
  ball.y  = s.ballStartY;
  ball.trail = [];
  shooting = true; scored = false;
  playSound('shoot');
}

/* ── PHYSICS ── */
const GRAVITY  = 0.48;
const BOUNCEY  = 0.36;
const FRICTION = 0.80;

function update() {
  if (!shooting) return;

  ball.trail.push({ x:ball.x, y:ball.y, age:0 });
  if (ball.trail.length > 26) ball.trail.shift();
  ball.trail.forEach(p => p.age++);

  ball.vy += GRAVITY;
  ball.x  += ball.vx;
  ball.y  += ball.vy;

  if (!scored) checkScore();

  if (ball.x - ball.r < 0) {
    ball.x = ball.r; ball.vx = Math.abs(ball.vx) * FRICTION; playSound('bounce');
  }
  if (ball.x + ball.r > W) {
    ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx) * FRICTION; playSound('bounce');
  }
  if (ball.y + ball.r > H) {
    ball.y  = H - ball.r;
    ball.vy *= -BOUNCEY;
    ball.vx *= FRICTION;
    playSound('bounce');
    if (Math.abs(ball.vy) < 2.2) setTimeout(() => { resetBall(); scored = false; }, 400);
  }

  const hw = hoop.w / 2;
  [{x: hoop.x - hw, y: hoop.y}, {x: hoop.x + hw, y: hoop.y}].forEach(rim => {
    const d = Math.hypot(ball.x - rim.x, ball.y - rim.y);
    if (d < ball.r + hoop.rimR * 3) {
      const a = Math.atan2(ball.y - rim.y, ball.x - rim.x);
      ball.vx = Math.cos(a) * Math.abs(ball.vx + ball.vy) * 0.46;
      ball.vy = Math.sin(a) * Math.abs(ball.vy) * 0.48;
      playSound('bounce');
    }
  });
}

/* ── SCORE CHECK ── */
function checkScore() {
  const hw = hoop.w / 2 * 0.82;
  const inX = ball.x > hoop.x - hw && ball.x < hoop.x + hw;
  const inY = ball.y > hoop.y - hoop.rimR && ball.y < hoop.y + hoop.rimR * 4.5;
  if (inX && inY && ball.vy > 0) {
    scored = true; score++; streak++;
    level = 1 + Math.floor(score / 3);

    // ✅ Har gol bo'lganda yangi levalni localStorage ga saqlash
    saveLevel(level);

    playSound('score');
    showNiceShot();
    spawnParticles(hoop.x, hoop.y);
    if (streak >= 3) { playSound('streak'); showStreak(streak); }
    updateUI(); resetHoop();
    setTimeout(() => { resetBall(); scored = false; }, 720);
  }
}

/* ── HOOP ── */
function updateHoop() {
  const mg = hoop.w * 0.88;
  hoop.x += hoop.dir * hoop.speed;
  if (hoop.x > W - mg) { hoop.x = W - mg; hoop.dir = -1; }
  if (hoop.x < mg)     { hoop.x = mg;     hoop.dir =  1; }
}

/* ── UI ── */
const niceShotEl = document.getElementById('niceShot');
function showNiceShot() {
  const msgs = ['🏀 Ajoyib!','🔥 Zo\'r!','💥 Perfect!','⭐ Superrr!','🎯 To\'g\'ri!','👑 CHAMPION!'];
  niceShotEl.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  niceShotEl.classList.remove('show'); void niceShotEl.offsetWidth; niceShotEl.classList.add('show');
}
const streakEl = document.getElementById('streakMsg');
function showStreak(n) {
  const m = {3:'🔥 3 ketma-ket!',4:'💫 4 ketma-ket!',5:'🌟 5 KETMA-KET!!!',6:'👑 LEGEND!'};
  streakEl.textContent = m[Math.min(n,6)] || `🔥 ${n} ketma-ket!`;
  streakEl.classList.remove('show'); void streakEl.offsetWidth; streakEl.classList.add('show');
}
function spawnParticles(px, py) {
  const cols = ['#ffd700','#ff6b1a','#ff3333','#ffffff','#ffcc00','#ff88cc'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size  = 5 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;
    const dist  = 50 + Math.random() * 110;
    const th    = topH();
    el.style.cssText = `width:${size}px;height:${size}px;background:${cols[i%cols.length]};
      left:${px}px;top:${py+th}px;--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;
      box-shadow:0 0 7px ${cols[0]};`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1050);
  }
}

/* ── DRAW ── */
function draw() {
  c.clearRect(0, 0, W, H);
  drawBg(); drawHoop(); drawTrail(); drawBall();
  if (dragging && !shooting) drawAim();
}

function drawBg() {
  const s = sz();
  c.save();
  c.strokeStyle = 'rgba(255,107,26,0.045)'; c.lineWidth = 1;
  c.beginPath(); c.arc(W/2, s.ballStartY + ball.r*2, H*0.15, 0, Math.PI*2); c.stroke();
  c.beginPath(); c.arc(W/2, H*0.85, H*0.30, Math.PI, 0); c.stroke();
  c.restore();
  const gr = c.createRadialGradient(W/2, H, 0, W/2, H, H*0.7);
  gr.addColorStop(0, 'rgba(255,107,26,0.07)');
  gr.addColorStop(1, 'transparent');
  c.fillStyle = gr; c.fillRect(0,0,W,H);
  const hg = c.createRadialGradient(W/2, hoop.y, 0, W/2, hoop.y, W*0.35);
  hg.addColorStop(0, 'rgba(255,50,50,0.04)');
  hg.addColorStop(1, 'transparent');
  c.fillStyle = hg; c.fillRect(0,0,W,H);
}

function drawHoop() {
  const hw = hoop.w / 2, rr = hoop.rimR;
  const bX = hoop.x + hw + rr * 5;
  c.save();
  c.shadowColor = 'rgba(255,50,50,0.55)'; c.shadowBlur = 18;
  c.strokeStyle = '#cc2222'; c.lineWidth = rr * 3.2;
  c.beginPath(); c.moveTo(bX, hoop.y - hoop.w*0.32); c.lineTo(bX, hoop.y + hoop.w*0.30); c.stroke();
  c.restore();
  c.save();
  c.strokeStyle = 'rgba(255,90,90,0.30)'; c.lineWidth = 1.2;
  c.strokeRect(bX - rr*3.25, hoop.y - hoop.w*0.14, rr*6.5, hoop.w*0.24);
  c.restore();
  c.save();
  c.strokeStyle = 'rgba(255,255,255,0.17)'; c.lineWidth = 1;
  const netH = hoop.w * 0.60;
  for (let i = 0; i <= 9; i++) {
    const t = i/9, tx = hoop.x - hw + hoop.w*t;
    const bx = hoop.x - hw*0.32 + hoop.w*0.32*t + hw*0.16;
    c.beginPath(); c.moveTo(tx, hoop.y); c.lineTo(bx, hoop.y+netH); c.stroke();
  }
  for (let i = 1; i <= 4; i++) {
    const t = i/5, sp = hw*(1-t*0.42), ny = hoop.y+netH*t;
    c.beginPath(); c.moveTo(hoop.x-sp, ny); c.lineTo(hoop.x+sp, ny); c.stroke();
  }
  c.restore();
  c.save();
  c.shadowColor = '#ff4444'; c.shadowBlur = 24;
  c.strokeStyle = '#ff3333'; c.lineWidth = rr * 3.5;
  c.beginPath(); c.moveTo(hoop.x-hw, hoop.y); c.lineTo(hoop.x+hw, hoop.y); c.stroke();
  [hoop.x-hw, hoop.x+hw].forEach(rx => {
    c.beginPath(); c.arc(rx, hoop.y, rr*2.4, 0, Math.PI*2);
    c.fillStyle = '#ff3333'; c.fill();
  });
  c.restore();
}

function drawTrail() {
  ball.trail.forEach(p => {
    const alpha = (1-p.age/26)*0.40, r = ball.r*(1-p.age/26)*0.62;
    if (r < 0.5) return;
    c.save(); c.globalAlpha = alpha;
    c.beginPath(); c.arc(p.x, p.y, r, 0, Math.PI*2);
    c.fillStyle = '#ff8c42'; c.shadowColor = '#ff6b1a'; c.shadowBlur = 9;
    c.fill(); c.restore();
  });
}

function drawBall() {
  const r = ball.r;
  c.save();
  c.shadowColor = 'rgba(255,107,26,0.95)'; c.shadowBlur = 34;
  const gr = c.createRadialGradient(ball.x-r*0.3, ball.y-r*0.3, r*0.07, ball.x, ball.y, r);
  gr.addColorStop(0, '#ffb84d'); gr.addColorStop(0.5, '#ff6b1a'); gr.addColorStop(1, '#bf3508');
  c.beginPath(); c.arc(ball.x, ball.y, r, 0, Math.PI*2);
  c.fillStyle = gr; c.fill(); c.restore();
  c.save();
  c.strokeStyle = 'rgba(0,0,0,0.40)'; c.lineWidth = r*0.093;
  c.beginPath(); c.arc(ball.x, ball.y, r*0.97, 0.08, Math.PI-0.08); c.stroke();
  c.beginPath(); c.arc(ball.x, ball.y, r*0.97, Math.PI+0.08, -0.08); c.stroke();
  c.beginPath();
  c.moveTo(ball.x, ball.y-r*0.97);
  c.bezierCurveTo(ball.x+r*0.52, ball.y-r*0.5, ball.x+r*0.52, ball.y+r*0.5, ball.x, ball.y+r*0.97);
  c.stroke();
  c.beginPath();
  c.moveTo(ball.x, ball.y-r*0.97);
  c.bezierCurveTo(ball.x-r*0.52, ball.y-r*0.5, ball.x-r*0.52, ball.y+r*0.5, ball.x, ball.y+r*0.97);
  c.stroke(); c.restore();
  c.save();
  const hl = c.createRadialGradient(ball.x-r*0.33, ball.y-r*0.37, 0, ball.x-r*0.18, ball.y-r*0.18, r*0.56);
  hl.addColorStop(0, 'rgba(255,255,255,0.48)'); hl.addColorStop(1, 'transparent');
  c.beginPath(); c.arc(ball.x, ball.y, r, 0, Math.PI*2);
  c.fillStyle = hl; c.fill(); c.restore();
}

function drawAim() {
  const dx = dragStart.x - dragNow.x, dy = dragStart.y - dragNow.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 16) return;
  const s = sz(), maxDrag = Math.min(W,H)*0.55;
  const norm = Math.min(dist, maxDrag) / maxDrag;
  const maxSpd = 24 + level*0.8;
  let vx = (dx/dist)*norm*maxSpd*0.50, vy = (dy/dist)*norm*maxSpd;
  let px = W/2, py = s.ballStartY;
  c.save();
  for (let t = 0; t < 34; t++) {
    px += vx*0.66; py += vy*0.66; vy += GRAVITY*0.66;
    const alpha = 0.60 - t*0.016;
    if (alpha <= 0) break;
    c.globalAlpha = alpha;
    c.beginPath(); c.arc(px, py, 4, 0, Math.PI*2);
    c.fillStyle = '#ffd700'; c.shadowColor = '#ffd700'; c.shadowBlur = 8;
    c.fill();
  }
  c.restore();
  c.save(); c.globalAlpha = 0.42;
  c.beginPath(); c.arc(W/2, s.ballStartY, ball.r+8, 0, Math.PI*2);
  c.strokeStyle = '#ffd700'; c.lineWidth = 2; c.setLineDash([4,5]); c.stroke();
  c.restore();
}

/* ── LOOP ── */
function loop() { updateHoop(); update(); draw(); requestAnimationFrame(loop); }

// ✅ Restart tugmasi: fromRestart=true → localStorage tozalanadi
document.getElementById('restartBtn').addEventListener('click', () => init(true));

// Sahifa ochilganda saqlangan level yuklanadi
init(false);
loop();