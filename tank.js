// ══════════════════════════════
//  AUDIO ENGINE (Web Audio API)
// ══════════════════════════════
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playShoot(color) {
  try {
    const ac = getAudio();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(color === 'p1' ? 320 : 280, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.12);
    g.gain.setValueAtTime(0.18, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    o.start(); o.stop(ac.currentTime + 0.13);
  } catch(e){}
}

function playHit() {
  try {
    const ac = getAudio();
    // Noise burst
    const bufLen = ac.sampleRate * 0.1;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const g = ac.createGain();
    src.connect(g); g.connect(ac.destination);
    g.gain.setValueAtTime(0.35, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
    src.start(); src.stop(ac.currentTime + 0.11);
  } catch(e){}
}

function playExplosion() {
  try {
    const ac = getAudio();
    const bufLen = ac.sampleRate * 0.6;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * (1 - i/bufLen);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const g = ac.createGain();
    src.connect(g); g.connect(ac.destination);
    g.gain.setValueAtTime(0.7, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.55);
    src.start(); src.stop(ac.currentTime + 0.6);
  } catch(e){}
}

function playEngine(tank) {
  // subtle rumble using short oscillator bursts — called per frame (throttled)
  // kept lightweight, skip for now (would need AudioWorklet for clean engine sound)
}

function playWin() {
  try {
    const ac = getAudio();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'square';
      o.frequency.value = freq;
      const t = ac.currentTime + i * 0.13;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.15, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.start(t); o.stop(t + 0.26);
    });
  } catch(e){}
}

// ══════════════════════════════
//  CONSTANTS
// ══════════════════════════════
const TANK_SPEED = 2.3;
const TANK_TURN  = 0.048;
const BULLET_SPD = 6;
const BULLET_DMG = 18;
const FIRE_CD    = 480; // ms

// ══════════════════════════════
//  STATE
// ══════════════════════════════
const keys = {};
let gameRunning = false;
let animId = null;
let tanks, bullets, particles;

// ══════════════════════════════
//  CANVAS
// ══════════════════════════════
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  const wrap = document.getElementById('canvasWrap');
  canvas.width  = wrap.clientWidth  || window.innerWidth;
  canvas.height = wrap.clientHeight || window.innerHeight - 52;
}

window.addEventListener('resize', () => { resizeCanvas(); });

// ══════════════════════════════
//  KEYBOARD INPUT
// ══════════════════════════════
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  if ([' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))
    e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

// ══════════════════════════════
//  MOBILE INPUT — pointer events
// ══════════════════════════════
const mobileMap = {
  'mb-w':' w', 'mb-a':'a', 'mb-s':'s', 'mb-d':'d', 'mb-space':' ',
  'mb-up':'ArrowUp','mb-left':'ArrowLeft','mb-right':'ArrowRight','mb-down':'ArrowDown','mb-enter':'Enter'
};

function bindMobile(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  const on  = () => { keys[key] = true;  el.classList.add('pressed'); };
  const off = () => { keys[key] = false; el.classList.remove('pressed'); };
  el.addEventListener('pointerdown',  e => { e.preventDefault(); on(); });
  el.addEventListener('pointerup',    e => { e.preventDefault(); off(); });
  el.addEventListener('pointerleave', e => { e.preventDefault(); off(); });
  el.addEventListener('pointercancel',e => { e.preventDefault(); off(); });
}

// Bind after DOM ready (already in DOMContentLoaded equivalent — script at bottom)
Object.entries(mobileMap).forEach(([id, key]) => {
  // key starts with ' w' check: the space btn maps to ' ' 
  const realKey = key.startsWith(' w') ? 'w' : key.startsWith(' ') ? ' ' : key;
  bindMobile(id, realKey === '' ? ' ' : realKey);
});

// Fix mb-w → 'w' (not space)
(function(){
  const el = document.getElementById('mb-w');
  if (!el) return;
  el.onpointerdown = e => { e.preventDefault(); keys['w'] = true; el.classList.add('pressed'); };
  el.onpointerup   = e => { e.preventDefault(); keys['w'] = false; el.classList.remove('pressed'); };
  el.onpointerleave= e => { e.preventDefault(); keys['w'] = false; el.classList.remove('pressed'); };
  el.onpointercancel=e => { e.preventDefault(); keys['w'] = false; el.classList.remove('pressed'); };
})();
// Fix mb-space → ' '
(function(){
  const el = document.getElementById('mb-space');
  if (!el) return;
  el.onpointerdown = e => { e.preventDefault(); keys[' '] = true; el.classList.add('pressed'); };
  el.onpointerup   = e => { e.preventDefault(); keys[' '] = false; el.classList.remove('pressed'); };
  el.onpointerleave= e => { e.preventDefault(); keys[' '] = false; el.classList.remove('pressed'); };
  el.onpointercancel=e=>{ e.preventDefault(); keys[' '] = false; el.classList.remove('pressed'); };
})();

// ══════════════════════════════
//  TANK FACTORY
// ══════════════════════════════
function makeTank(x, y, angle, c, controls) {
  return { x, y, angle, hp:100, maxHp:100, lastFire:0,
           color:c.body, trackColor:c.track, turretColor:c.turret,
           controls, w:36, h:28, moving:false };
}

// ══════════════════════════════
//  MENU / START
// ══════════════════════════════
function startGame() {
  // Resume AudioContext on user gesture
  try { getAudio().resume(); } catch(e){}
  document.getElementById('menuScreen').style.display = 'none';
  document.getElementById('gameScreen').classList.add('active');
  resizeCanvas();
  initGame();
}

function backToMenu() {
  gameRunning = false;
  cancelAnimationFrame(animId);
  document.getElementById('gameScreen').classList.remove('active');
  document.getElementById('menuScreen').style.display = 'flex';
}

function initGame() {
  resizeCanvas();
  const W = canvas.width, H = canvas.height;

  tanks = [
    makeTank(W * .18, H * .5, 0,
      {body:'#00ff88', track:'#009944', turret:'#00cc66'},
      {up:'w', down:'s', left:'a', right:'d', fire:' '}),
    makeTank(W * .82, H * .5, Math.PI,
      {body:'#ff3355', track:'#991133', turret:'#cc2244'},
      {up:'ArrowUp', down:'ArrowDown', left:'ArrowLeft', right:'ArrowRight', fire:'Enter'})
  ];
  bullets   = [];
  particles = [];
  gameRunning = true;

  // Clear all keys to avoid stuck inputs after menu
  Object.keys(keys).forEach(k => delete keys[k]);

  document.getElementById('winOverlay').classList.remove('show');
  updateHUD();
  cancelAnimationFrame(animId);
  loop();
}

// ══════════════════════════════
//  GAME LOOP
// ══════════════════════════════
function loop() {
  if (!gameRunning) return;
  update();
  drawAll();
  animId = requestAnimationFrame(loop);
}

// ══════════════════════════════
//  UPDATE
// ══════════════════════════════
function update() {
  const W = canvas.width, H = canvas.height;
  const now = Date.now();

  tanks.forEach((t, idx) => {
    if (t.hp <= 0) return;
    const c = t.controls;
    t.moving = false;

    if (keys[c.left])  t.angle -= TANK_TURN;
    if (keys[c.right]) t.angle += TANK_TURN;

    if (keys[c.up] || keys[c.down]) {
      t.moving = true;
      const dir = keys[c.up] ? 1 : -1;
      const nx = t.x + Math.cos(t.angle) * TANK_SPEED * dir;
      const ny = t.y + Math.sin(t.angle) * TANK_SPEED * dir;
      const hw = t.w / 2 + 5, hh = t.h / 2 + 5;
      t.x = Math.max(hw, Math.min(W - hw, nx));
      t.y = Math.max(hh, Math.min(H - hh, ny));
    }

    if (keys[c.fire] && now - t.lastFire > FIRE_CD) {
      t.lastFire = now;
      bullets.push({
        x:  t.x + Math.cos(t.angle) * 26,
        y:  t.y + Math.sin(t.angle) * 26,
        vx: Math.cos(t.angle) * BULLET_SPD,
        vy: Math.sin(t.angle) * BULLET_SPD,
        owner: t,
        ownerIdx: idx
      });
      playShoot(idx === 0 ? 'p1' : 'p2');
    }
  });

  // Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.vx; b.y += b.vy;

    if (b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10) {
      bullets.splice(i, 1); continue;
    }

    let hit = false;
    for (const t of tanks) {
      if (t === b.owner || t.hp <= 0) continue;
      if (Math.abs(b.x - t.x) < t.w / 2 + 2 && Math.abs(b.y - t.y) < t.h / 2 + 2) {
        t.hp = Math.max(0, t.hp - BULLET_DMG);
        spawnParticles(b.x, b.y, t.color, 16);
        bullets.splice(i, 1);
        hit = true;
        if (t.hp <= 0) { spawnParticles(t.x, t.y, t.color, 40); playExplosion(); checkWin(); }
        else playHit();
        updateHUD();
        break;
      }
    }
    if (hit) continue;
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.1;
    p.vx *= 0.98;
    p.life -= 0.022;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

// ══════════════════════════════
//  PARTICLES
// ══════════════════════════════
function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 1 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.6 + Math.random() * 0.6,
      color,
      r: 1.5 + Math.random() * 3
    });
  }
}

// ══════════════════════════════
//  WIN CHECK
// ══════════════════════════════
function checkWin() {
  gameRunning = false;
  cancelAnimationFrame(animId);

  setTimeout(() => {
    const el  = document.getElementById('winOverlay');
    const txt = document.getElementById('winText');
    if (tanks[0].hp <= 0 && tanks[1].hp <= 0) {
      txt.textContent = "DRAW!";
      txt.className = 'win-text p1-win';
    } else if (tanks[0].hp <= 0) {
      txt.textContent = "2-O'YINCHI YUTDI!";
      txt.className = 'win-text p2-win';
    } else {
      txt.textContent = "1-O'YINCHI YUTDI!";
      txt.className = 'win-text p1-win';
    }
    el.classList.add('show');
    playWin();
    // Keep drawing particles during overlay
    drawAll();
  }, 300);
}

// ══════════════════════════════
//  HUD
// ══════════════════════════════
function updateHUD() {
  const [t1, t2] = tanks;
  document.getElementById('hp1Bar').style.width  = Math.max(0, t1.hp) + '%';
  document.getElementById('hp2Bar').style.width  = Math.max(0, t2.hp) + '%';
  document.getElementById('hp1Text').textContent = Math.max(0, t1.hp) + ' HP';
  document.getElementById('hp2Text').textContent = Math.max(0, t2.hp) + ' HP';
}

// ══════════════════════════════
//  DRAW
// ══════════════════════════════
function drawAll() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Background grid
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.028)';
  ctx.lineWidth = 1;
  const gs = 50;
  for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  ctx.restore();

  // Border
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.09)';
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, W-4, H-4);
  ctx.restore();

  // Danger zones (near walls)
  const dz = 30;
  ctx.save();
  ctx.strokeStyle = 'rgba(255,200,0,0.06)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6,6]);
  ctx.strokeRect(dz, dz, W - dz*2, H - dz*2);
  ctx.setLineDash([]);
  ctx.restore();

  // Particles
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Bullets
  bullets.forEach(b => {
    ctx.save();
    const col = b.ownerIdx === 0 ? '#00ff88' : '#ff3355';
    ctx.fillStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur = 16;
    // Trail
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(b.x - b.vx * 2, b.y - b.vy * 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(b.x - b.vx, b.y - b.vy, 3, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Tanks
  tanks.forEach(t => drawTank(t));
}

function drawTank(t) {
  ctx.save();
  ctx.translate(t.x, t.y);

  if (t.hp <= 0) {
    // Destroyed wreck
    ctx.rotate(t.angle + Math.PI / 6);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#442200';
    roundRect(ctx, -t.w/2, -t.h/2, t.w, t.h, 4);
    ctx.fill();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ff6600';
    ctx.shadowColor = '#ff4400';
    ctx.shadowBlur = 20;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(-8 + i * 8, -4 + (i % 2) * 6, 4 + i, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  ctx.rotate(t.angle);

  const hw = t.w / 2, hh = t.h / 2;

  // Glow shadow
  ctx.shadowColor = t.color;
  ctx.shadowBlur = t.moving ? 22 : 14;

  // Tracks
  const tw = 8, tlen = t.h + 8;
  ctx.fillStyle = t.trackColor;

  // Left track
  ctx.beginPath();
  roundRect(ctx, -hw - tw + 2, -tlen/2, tw, tlen, 3);
  ctx.fill();
  // Right track
  ctx.beginPath();
  roundRect(ctx, hw - 2, -tlen/2, tw, tlen, 3);
  ctx.fill();

  // Track grooves
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = t.color;
  ctx.lineWidth = 1;
  for (let seg = 0; seg < tlen; seg += 7) {
    const yy = -tlen/2 + seg;
    // left
    ctx.beginPath(); ctx.moveTo(-hw-tw+2, yy); ctx.lineTo(-hw+2, yy); ctx.stroke();
    // right
    ctx.beginPath(); ctx.moveTo(hw-2, yy); ctx.lineTo(hw+tw-2, yy); ctx.stroke();
  }
  ctx.restore();

  // Body
  ctx.shadowBlur = t.moving ? 18 : 10;
  ctx.fillStyle = t.color;
  ctx.beginPath();
  roundRect(ctx, -hw, -hh, t.w, t.h, 5);
  ctx.fill();

  // Body detail
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = t.turretColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-hw+5, -hh+4); ctx.lineTo(hw-5, -hh+4);
  ctx.moveTo(-hw+5,  hh-4); ctx.lineTo(hw-5,  hh-4);
  ctx.stroke();
  ctx.restore();

  // Turret base
  ctx.shadowBlur = 12;
  ctx.fillStyle = t.turretColor;
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.fill();

  // Gun barrel
  ctx.shadowBlur = 8;
  ctx.fillStyle = t.turretColor;
  ctx.beginPath();
  roundRect(ctx, 4, -3, 22, 6, 3);
  ctx.fill();

  // Muzzle highlight
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(26, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Turret center dot
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ══════════════════════════════
//  HELPERS
// ══════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h,     x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y,         x + r, y);
  ctx.closePath();
}