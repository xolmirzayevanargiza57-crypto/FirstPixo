// ── STARS ──
const stE = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
    const s = document.createElement('div'); s.className = 'star';
    const sz = Math.random() * 2 + .4;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s`;
    stE.appendChild(s);
}

// ── ENERGY ──
let savedEnergy = parseInt(localStorage.getItem('pdq_energy') || '0');

// ── AUDIO ──
const AC = window.AudioContext || window.webkitAudioContext;
let ac;
function gAC() { if (!ac) ac = new AC(); return ac; }
function snd(t) {
    try {
        const a = gAC(), n = a.currentTime;
        if (t === 'attack') {
            const o = a.createOscillator(), g = a.createGain();
            o.connect(g); g.connect(a.destination);
            o.type = 'sawtooth'; o.frequency.setValueAtTime(400, n);
            o.frequency.exponentialRampToValueAtTime(80, n + .25);
            g.gain.setValueAtTime(.4, n); g.gain.linearRampToValueAtTime(0, n + .28);
            o.start(n); o.stop(n + .3);
        } else if (t === 'magic') {
            [523, 659, 784, 1047].forEach((f, i) => {
                const o = a.createOscillator(), g = a.createGain();
                o.connect(g); g.connect(a.destination);
                o.type = 'sine'; o.frequency.value = f;
                g.gain.setValueAtTime(0, n + i * .08);
                g.gain.linearRampToValueAtTime(.22, n + i * .08 + .04);
                g.gain.linearRampToValueAtTime(0, n + i * .08 + .24);
                o.start(n + i * .08); o.stop(n + i * .08 + .27);
            });
        } else if (t === 'heal') {
            [392, 523, 659, 784].forEach((f, i) => {
                const o = a.createOscillator(), g = a.createGain();
                o.connect(g); g.connect(a.destination);
                o.type = 'sine'; o.frequency.value = f;
                g.gain.setValueAtTime(0, n + i * .1);
                g.gain.linearRampToValueAtTime(.18, n + i * .1 + .05);
                g.gain.linearRampToValueAtTime(0, n + i * .1 + .28);
                o.start(n + i * .1); o.stop(n + i * .1 + .32);
            });
        } else if (t === 'eAtk') {
            const o = a.createOscillator(), g = a.createGain();
            o.connect(g); g.connect(a.destination);
            o.type = 'sawtooth'; o.frequency.setValueAtTime(200, n);
            o.frequency.exponentialRampToValueAtTime(60, n + .3);
            g.gain.setValueAtTime(.45, n); g.gain.linearRampToValueAtTime(0, n + .34);
            o.start(n); o.stop(n + .37);
        } else if (t === 'lvlup') {
            [523, 659, 784, 1047, 1319].forEach((f, i) => {
                const o = a.createOscillator(), g = a.createGain();
                o.connect(g); g.connect(a.destination);
                o.type = 'square'; o.frequency.value = f;
                g.gain.setValueAtTime(0, n + i * .11);
                g.gain.linearRampToValueAtTime(.28, n + i * .11 + .04);
                g.gain.linearRampToValueAtTime(0, n + i * .11 + .28);
                o.start(n + i * .11); o.stop(n + i * .11 + .32);
            });
        } else if (t === 'win') {
            [523, 523, 523, 784, 659, 523, 784, 659].forEach((f, i) => {
                const o = a.createOscillator(), g = a.createGain();
                o.connect(g); g.connect(a.destination);
                o.type = 'square'; o.frequency.value = f;
                g.gain.setValueAtTime(0, n + i * .13);
                g.gain.linearRampToValueAtTime(.22, n + i * .13 + .04);
                g.gain.linearRampToValueAtTime(0, n + i * .13 + .18);
                o.start(n + i * .13); o.stop(n + i * .13 + .2);
            });
        } else if (t === 'lose') {
            const o = a.createOscillator(), g = a.createGain();
            o.connect(g); g.connect(a.destination);
            o.type = 'sawtooth'; o.frequency.setValueAtTime(220, n);
            o.frequency.exponentialRampToValueAtTime(55, n + 1.2);
            g.gain.setValueAtTime(.38, n); g.gain.linearRampToValueAtTime(0, n + 1.3);
            o.start(n); o.stop(n + 1.35);
        }
    } catch (e) { }
}

// ── ENEMY SVGs — inline string sifatida ──
const SVGS = {
    goblin: `<svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="38" cy="50" rx="18" ry="16" fill="#4a9a3a"/>
    <ellipse cx="38" cy="30" rx="16" ry="15" fill="#4a9a3a"/>
    <ellipse cx="38" cy="28" rx="12" ry="11" fill="#3a8a2a"/>
    <ellipse cx="32" cy="26" rx="4" ry="5" fill="#ffe000"/>
    <ellipse cx="44" cy="26" rx="4" ry="5" fill="#ffe000"/>
    <circle cx="32" cy="26" r="2.5" fill="#e03030"/>
    <circle cx="44" cy="26" r="2.5" fill="#e03030"/>
    <ellipse cx="33" cy="26" r="1" fill="#fff" rx="1" ry="1"/>
    <ellipse cx="45" cy="26" r="1" fill="#fff" rx="1" ry="1"/>
    <path d="M32 36 Q38 40 44 36" stroke="#2a6020" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M26 22 L20 12 L28 20Z" fill="#3a7a30"/>
    <path d="M50 22 L56 12 L48 20Z" fill="#3a7a30"/>
    <path d="M20 44 Q10 52 10 62 Q18 56 24 58Z" fill="#3a7a30"/>
    <path d="M56 44 Q66 52 66 62 Q58 56 52 58Z" fill="#3a7a30"/>
    <path d="M22 62 Q18 70 16 74 Q22 70 28 66Z" fill="#3a7a30"/>
    <path d="M54 62 Q58 70 60 74 Q54 70 48 66Z" fill="#3a7a30"/>
    <path d="M10 62 L6 66 L12 63 L8 68Z" fill="#5a4a10"/>
    <path d="M66 62 L70 66 L64 63 L68 68Z" fill="#5a4a10"/>
    <ellipse cx="38" cy="54" rx="10" ry="7" fill="#3a8a2a"/>
  </svg>`,

    skeleton: `<svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="38" cy="28" rx="15" ry="16" fill="#e0d8b0"/>
    <circle cx="30" cy="24" r="4.5" fill="#1a1a2e"/>
    <circle cx="46" cy="24" r="4.5" fill="#1a1a2e"/>
    <circle cx="30" cy="24" r="2.5" fill="#4040c0" opacity=".7"/>
    <circle cx="46" cy="24" r="2.5" fill="#4040c0" opacity=".7"/>
    <path d="M32 35 Q38 39 44 35" stroke="#b0a880" stroke-width="2.5" fill="none"/>
    <rect x="29" y="31" width="5" height="3.5" rx="1.2" fill="#b0a880"/>
    <rect x="30" y="44" width="18" height="22" rx="2.5" fill="#d0c8a0"/>
    <line x1="38" y1="44" x2="38" y2="66" stroke="#b0a880" stroke-width="2"/>
    <line x1="30" y1="52" x2="48" y2="52" stroke="#b0a880" stroke-width="2"/>
    <line x1="30" y1="58" x2="48" y2="58" stroke="#b0a880" stroke-width="2"/>
    <rect x="20" y="42" width="11" height="18" rx="4" fill="#d0c8a0"/>
    <rect x="45" y="42" width="11" height="18" rx="4" fill="#d0c8a0"/>
    <rect x="18" y="59" width="13" height="5" rx="2" fill="#c0b890"/>
    <rect x="45" y="59" width="13" height="5" rx="2" fill="#c0b890"/>
    <rect x="25" y="66" width="10" height="10" rx="2.5" fill="#d0c8a0"/>
    <rect x="41" y="66" width="10" height="10" rx="2.5" fill="#d0c8a0"/>
    <line x1="58" y1="12" x2="52" y2="48" stroke="#c0c0d0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="49" y1="28" x2="61" y2="32" stroke="#c09020" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

    orc: `<svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="38" cy="50" rx="20" ry="18" fill="#7a3a18"/>
    <rect x="18" y="34" width="40" height="24" rx="5" fill="#6a3015"/>
    <rect x="22" y="37" width="32" height="18" rx="4" fill="#8a4020"/>
    <ellipse cx="38" cy="28" rx="16" ry="15" fill="#7a3a18"/>
    <ellipse cx="38" cy="26" rx="14" ry="13" fill="#8a4020"/>
    <ellipse cx="31" cy="25" rx="4" ry="5" fill="#e05030"/>
    <ellipse cx="45" cy="25" rx="4" ry="5" fill="#e05030"/>
    <circle cx="31" cy="25" r="2.5" fill="#1a0808"/>
    <circle cx="45" cy="25" r="2.5" fill="#1a0808"/>
    <path d="M30 33 Q38 37 46 33" stroke="#5a2a10" stroke-width="2" fill="none"/>
    <path d="M28 16 L22 6 L30 14Z" fill="#5a2a10"/>
    <path d="M48 16 L54 6 L46 14Z" fill="#5a2a10"/>
    <rect x="12" y="34" width="11" height="18" rx="5" fill="#7a3a18"/>
    <rect x="53" y="34" width="11" height="18" rx="5" fill="#7a3a18"/>
    <rect x="22" y="64" width="14" height="12" rx="2.5" fill="#6a3015"/>
    <rect x="40" y="64" width="14" height="12" rx="2.5" fill="#6a3015"/>
    <rect x="60" y="9" width="4" height="34" rx="2" fill="#8a7050"/>
    <path d="M60 9 Q52 14 52 22 Q60 19 64 9Z" fill="#c0c0d0"/>
    <path d="M64 9 Q72 14 72 22 Q64 19 60 9Z" fill="#a0a0b0"/>
  </svg>`,

    vampire: `<svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 34 Q8 62 18 74 L38 68 L58 74 Q68 62 64 34 Q55 58 38 56 Q21 58 12 34Z" fill="#1a0028"/>
    <rect x="22" y="36" width="32" height="28" rx="5" fill="#e8dfc0"/>
    <rect x="26" y="38" width="24" height="22" rx="4" fill="#f0e8d0"/>
    <path d="M26 36 L32 28 L38 34 L44 28 L50 36Z" fill="#fff"/>
    <ellipse cx="38" cy="26" rx="16" ry="17" fill="#f0e8d0"/>
    <path d="M22 22 Q24 10 38 10 Q52 10 54 22 Q46 14 38 16 Q30 14 22 22Z" fill="#1a0028"/>
    <ellipse cx="30" cy="24" rx="4.5" ry="4" fill="#e00040"/>
    <ellipse cx="46" cy="24" rx="4.5" ry="4" fill="#e00040"/>
    <circle cx="30" cy="24" r="2.5" fill="#ff2060"/>
    <circle cx="46" cy="24" r="2.5" fill="#ff2060"/>
    <circle cx="31" cy="23" r="1" fill="#fff"/>
    <circle cx="47" cy="23" r="1" fill="#fff"/>
    <path d="M32 35 L30 42 L36 35Z" fill="#fff"/>
    <path d="M44 35 L46 42 L40 35Z" fill="#fff"/>
    <path d="M22 38 Q12 46 10 34 Q18 40 22 44Z" fill="#e8dfc0"/>
    <path d="M54 38 Q64 46 66 34 Q58 40 54 44Z" fill="#e8dfc0"/>
    <rect x="24" y="62" width="13" height="14" rx="2.5" fill="#1a0028"/>
    <rect x="39" y="62" width="13" height="14" rx="2.5" fill="#1a0028"/>
  </svg>`,

    dragon: `<svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="38" cy="50" rx="24" ry="16" fill="#a01818"/>
    <ellipse cx="38" cy="54" rx="13" ry="8" fill="#e08020"/>
    <path d="M58 52 Q72 60 74 50 Q72 42 62 48 Q57 42 60 49Z" fill="#a01818"/>
    <path d="M72 48 L76 43 L74 50Z" fill="#e03030"/>
    <path d="M20 42 Q4 24 8 6 Q18 32 26 40Z" fill="#7a0e0e" opacity=".92"/>
    <path d="M8 6 Q16 24 18 38 L26 40Z" fill="#5a0808" opacity=".55"/>
    <path d="M56 42 Q72 24 68 6 Q58 32 50 40Z" fill="#7a0e0e" opacity=".92"/>
    <path d="M68 6 Q60 24 58 38 L50 40Z" fill="#5a0808" opacity=".55"/>
    <ellipse cx="38" cy="35" rx="13" ry="12" fill="#a01818"/>
    <ellipse cx="38" cy="24" rx="16" ry="14" fill="#b02020"/>
    <ellipse cx="38" cy="18" rx="10" ry="8" fill="#901515"/>
    <circle cx="34" cy="17" r="2" fill="#e03030"/>
    <circle cx="42" cy="17" r="2" fill="#e03030"/>
    <ellipse cx="30" cy="20" rx="4.5" ry="5" fill="#f0c040"/>
    <ellipse cx="46" cy="20" rx="4.5" ry="5" fill="#f0c040"/>
    <circle cx="30" cy="20" r="3" fill="#e03030"/>
    <circle cx="46" cy="20" r="3" fill="#e03030"/>
    <circle cx="31" cy="18.5" r="1" fill="#fff"/>
    <circle cx="47" cy="18.5" r="1" fill="#fff"/>
    <path d="M30 12 L24 2 L32 10Z" fill="#e03030"/>
    <path d="M46 12 L52 2 L44 10Z" fill="#e03030"/>
    <path d="M38 10 L34 2 L38 7 L42 2Z" fill="#c02020"/>
    <path d="M18 48 Q8 58 7 68 Q15 62 22 56Z" fill="#a01818"/>
    <path d="M7 68 L4 73 L9 68 L5 74Z" fill="#e08020"/>
    <path d="M58 48 Q68 58 69 68 Q61 62 54 56Z" fill="#a01818"/>
    <path d="M69 68 L72 73 L67 68 L71 74Z" fill="#e08020"/>
    <path d="M28 10 Q38 3 48 10 Q44 1 38 -2 Q32 1 28 10Z" fill="#f06020" opacity=".9"/>
    <path d="M32 8 Q38 0 44 8 Q41 -1 38 -4 Q35 -1 32 8Z" fill="#f0c040"/>
  </svg>`
};

// ── ENEMIES DATA ──
const enemies = [
    { name: 'Goblin', level: 1, hp: 60, maxHp: 60, atk: 12, desc: 'Yovuz yirtqich', xp: 30, gold: 15, svgKey: 'goblin' },
    { name: 'Skeleton', level: 2, hp: 80, maxHp: 80, atk: 16, desc: 'Suyak jangchi', xp: 50, gold: 25, svgKey: 'skeleton' },
    { name: 'Dark Orc', level: 3, hp: 110, maxHp: 110, atk: 20, desc: 'Vahshiy urushchi', xp: 75, gold: 40, svgKey: 'orc' },
    { name: 'Vampire', level: 4, hp: 130, maxHp: 130, atk: 24, desc: 'Qon so\'ruvchi', xp: 100, gold: 60, svgKey: 'vampire' },
    { name: 'Dragon', level: 5, hp: 200, maxHp: 200, atk: 30, desc: 'Qorong\'ulik Ajdahosi!', xp: 200, gold: 120, svgKey: 'dragon' }
];

const areas = ['Qorong\'u O\'rmon', 'Muzli Tog\'lar', 'Lava Caves', 'O\'lik Cho\'l', 'Ajdaho Qo\'rg\'oni'];

// ── PLAYER ──
let bH = Math.floor(savedEnergy * .3), bM = Math.floor(savedEnergy * .2);
let player = {
    name: 'Qahramon', level: 1,
    hp: 100 + bH, maxHp: 100 + bH,
    mp: 50 + bM, maxMp: 50 + bM,
    xp: 0, xpNext: 100, atk: 20, def: 5, gold: 0, wins: 0,
    isDefending: false, energy: savedEnergy
};

let enemy = null, bIdx = 0, pTurn = true, busy = false;

function updEnergy() {
    document.getElementById('beFill').style.width = Math.min(100, player.energy) + '%';
    document.getElementById('beVal').textContent = player.energy + '/100';
    document.getElementById('topEnergy').textContent = player.energy;
}

function updPlayer() {
    const p = player;
    document.getElementById('pHpB').style.width = (p.hp / p.maxHp * 100) + '%';
    document.getElementById('pHpV').textContent = p.hp + '/' + p.maxHp;
    document.getElementById('pMpB').style.width = (p.mp / p.maxMp * 100) + '%';
    document.getElementById('pMpV').textContent = p.mp + '/' + p.maxMp;
    document.getElementById('pXpB').style.width = (p.xp / p.xpNext * 100) + '%';
    document.getElementById('pXpV').textContent = p.xp + '/' + p.xpNext;
    document.getElementById('pLvl').textContent = '⭐' + p.level;
    const canAct = pTurn && !busy;
    document.getElementById('bA').disabled = !canAct;
    document.getElementById('bM').disabled = !canAct || p.mp < 20;
    document.getElementById('bH').disabled = !canAct || p.mp < 15;
    document.getElementById('bD').disabled = !canAct;
}

function updEnemy() {
    document.getElementById('eHpB').style.width = (Math.max(0, enemy.hp) / enemy.maxHp * 100) + '%';
    document.getElementById('eHpV').textContent = Math.max(0, enemy.hp) + '/' + enemy.maxHp;
}

function addLog(msg, cls) {
    const l = document.getElementById('log');
    const d = document.createElement('div');
    d.className = 'll ' + (cls || '');
    d.textContent = msg;
    l.appendChild(d);
    l.scrollTop = l.scrollHeight;
}

function setTurn(v) {
    pTurn = v;
    document.getElementById('pti').classList.toggle('active', v);
    document.getElementById('eti').classList.toggle('active', !v);
    document.getElementById('td1').classList.toggle('active', v);
    document.getElementById('td2').classList.toggle('active', v);
    document.getElementById('td3').classList.toggle('active', !v);
    updPlayer();
}

function flash(t) {
    const e = document.getElementById('eff');
    e.className = 'eff ' + t;
    setTimeout(() => { e.className = 'eff'; }, 200);
}

function dmgNum(val, x, y, col, isHeal) {
    const el = document.createElement('div');
    el.className = 'dmg-num';
    el.textContent = (isHeal ? '+' : '-') + Math.abs(val);
    el.style.cssText = `left:${x}px;top:${y}px;color:${col};font-size:${Math.abs(val) > 30 ? '1.4rem' : '1.1rem'}`;
    document.getElementById('sceneBox').appendChild(el);
    setTimeout(() => el.remove(), 1300);
}

function spellFx(x, y, col) {
    const el = document.createElement('div');
    el.className = 'spell-fx';
    el.style.cssText = `left:${x - 16}px;top:${y - 16}px;width:32px;height:32px;background:${col};filter:blur(6px)`;
    document.getElementById('sceneBox').appendChild(el);
    setTimeout(() => el.remove(), 600);
}

function spawnEnemy() {
    const idx = Math.min(bIdx, enemies.length - 1);
    const base = enemies[idx];
    enemy = { ...base };

    if (bIdx >= enemies.length) {
        const ex = bIdx - enemies.length + 1;
        enemy.hp = Math.round(base.maxHp * (1 + ex * .3));
        enemy.maxHp = enemy.hp;
        enemy.atk = Math.round(base.atk * (1 + ex * .2));
        enemy.xp = Math.round(base.xp * (1 + ex * .3));
        enemy.gold = Math.round(base.gold * (1 + ex * .2));
        enemy.name = base.name + ' II'.repeat(ex);
        enemy.level = base.level + ex * 2;
    }

    // Energy bonus
    const eBonus = Math.floor(player.energy * .5);
    if (eBonus > 0) {
        const red = Math.floor(enemy.maxHp * eBonus / 100);
        enemy.hp = Math.max(10, enemy.hp - red);
        enemy.maxHp = enemy.hp;
    }

    // SVG o'rnatish
    const esEl = document.getElementById('es');
    esEl.innerHTML = SVGS[enemy.svgKey] || SVGS.goblin;
    esEl.classList.remove('dead', 'hurt');
    esEl.style.opacity = '1';

    document.getElementById('eName').textContent = enemy.name;
    document.getElementById('eLvl').textContent = '💀' + enemy.level;
    document.getElementById('eDesc').textContent = enemy.desc;
    document.getElementById('ePwV').textContent = enemy.atk;
    document.getElementById('ePwB').style.width = Math.min(100, enemy.atk / 40 * 100) + '%';
    document.getElementById('areaName').textContent = '📍 ' + areas[Math.min(bIdx, areas.length - 1)];

    setTurn(true);
    addLog('👹 ' + enemy.name + ' paydo bo\'ldi!', 'ls');
    if (eBonus > 0) addLog('⚡ Energiya bonusi: dushman HP kamaydi!', 'ls');
}

function act(type) {
    if (!pTurn || busy) return;
    busy = true; setTurn(false);
    player.isDefending = false;
    document.getElementById('db').classList.remove('show');
    const ps = document.getElementById('ps'), es = document.getElementById('es');

    if (type === 'attack') {
        snd('attack');
        ps.classList.add('attacking');
        setTimeout(() => {
            const dmg = Math.floor(Math.random() * 11 + 15) + Math.floor(player.atk * .3);
            enemy.hp -= dmg;
            flash('fr');
            dmgNum(dmg, 200, 60, '#ff6060', false);
            es.classList.add('hurt');
            setTimeout(() => es.classList.remove('hurt'), 400);
            addLog('⚔️ ' + enemy.name + 'ga ' + dmg + ' zarar!', 'lp');
            updEnemy();
        }, 310);
        setTimeout(() => { ps.classList.remove('attacking'); chkDead(); }, 470);

    } else if (type === 'magic') {
        if (player.mp < 20) { busy = false; setTurn(true); return; }
        player.mp -= 20; snd('magic');
        for (let i = 0; i < 4; i++) setTimeout(() => spellFx(185 + Math.random() * 35, 50 + Math.random() * 35, '#9040e0'), i * 70);
        setTimeout(() => {
            const dmg = Math.floor(Math.random() * 11 + 30) + player.level * 2;
            enemy.hp -= dmg;
            flash('fb');
            dmgNum(dmg, 195, 55, '#c080ff', false);
            es.classList.add('hurt');
            setTimeout(() => es.classList.remove('hurt'), 400);
            addLog('✨ Sehr! ' + dmg + ' zarar!', 'lm');
            updEnemy(); updPlayer();
        }, 360);
        setTimeout(() => chkDead(), 520);

    } else if (type === 'heal') {
        if (player.mp < 15) { busy = false; setTurn(true); return; }
        player.mp -= 15; snd('heal');
        spellFx(55, 65, '#30c060');
        setTimeout(() => {
            const amt = Math.floor(Math.random() * 16 + 30);
            player.hp = Math.min(player.maxHp, player.hp + amt);
            flash('fg');
            dmgNum(amt, 45, 65, '#60e090', true);
            addLog('💚 +' + amt + ' HP!', 'lh');
            updPlayer();
        }, 270);
        setTimeout(() => { busy = false; setTimeout(() => enemyTurn(), 560); }, 460);

    } else if (type === 'defend') {
        player.isDefending = true;
        document.getElementById('db').classList.add('show');
        addLog('🛡️ Himoya! Zarar -50%', 'ls');
        flash('fg'); busy = false;
        setTimeout(() => enemyTurn(), 660);
    }
}

function chkDead() {
    if (enemy.hp <= 0) {
        document.getElementById('es').classList.add('dead');
        setTimeout(() => showWin(), 660);
    } else { busy = false; setTimeout(() => enemyTurn(), 660); }
}

function enemyTurn() {
    if (enemy.hp <= 0) return;
    busy = true;
    addLog('👹 ' + enemy.name + ' hujum qilmoqda...', 'le');
    setTimeout(() => {
        snd('eAtk');
        let dmg = Math.floor(Math.random() * 8 + enemy.atk - 4);
        if (player.isDefending) { dmg = Math.floor(dmg * .5); addLog('🛡️ Himoya! Zarar yarmi!', 'ls'); }
        dmg = Math.max(1, dmg);
        player.hp = Math.max(0, player.hp - dmg);
        flash('fr');
        document.getElementById('ps').classList.add('hurt');
        setTimeout(() => document.getElementById('ps').classList.remove('hurt'), 380);
        dmgNum(dmg, 45, 65, '#ff6060', false);
        addLog('💥 ' + dmg + ' zarar olding!', 'le');
        player.isDefending = false;
        document.getElementById('db').classList.remove('show');
        updPlayer();
        if (player.hp <= 0) setTimeout(() => showLose(), 560);
        else { busy = false; setTurn(true); }
    }, 560);
}

function showWin() {
    snd('win');
    const p = player;
    p.xp += enemy.xp; p.gold += enemy.gold; p.wins++;
    p.mp = Math.min(p.maxMp, p.mp + 10);
    let lvlUp = false;
    while (p.xp >= p.xpNext) {
        p.xp -= p.xpNext; p.level++; p.xpNext = Math.floor(p.xpNext * 1.4);
        p.maxHp += 15; p.hp = p.maxHp; p.maxMp += 8; p.mp = p.maxMp; p.atk += 3; lvlUp = true;
    }
    if (lvlUp) { snd('lvlup'); addLog('🌟 DARAJA OSHDI! Sev.' + p.level, 'ls'); }
    updPlayer();
    document.getElementById('rIcon').textContent = '🏆';
    document.getElementById('rTitle').className = 'rt win';
    document.getElementById('rTitle').textContent = 'G\'ALABA!';
    document.getElementById('rSub').textContent = enemy.name + ' mag\'lub etildi!';
    document.getElementById('rRew').innerHTML =
        `<div class="ri">+${enemy.xp} XP</div><div class="ri">+${enemy.gold}💰</div>` +
        (lvlUp ? `<div class="ri">⭐Sev.${p.level}</div>` : '');
    document.getElementById('rBtn').textContent = '⚔️ DAVOM ETISH';
    document.getElementById('resultOv').classList.add('show');
}

function showLose() {
    snd('lose');
    document.getElementById('rIcon').textContent = '💀';
    document.getElementById('rTitle').className = 'rt lose';
    document.getElementById('rTitle').textContent = 'MAG\'LUBIYAT';
    document.getElementById('rSub').textContent = 'Qaytadan urinib ko\'ring!';
    document.getElementById('rRew').innerHTML = '';
    document.getElementById('rBtn').textContent = '🔄 QAYTA BOSHLASH';
    document.getElementById('resultOv').classList.add('show');
}

function nextBattle() {
    document.getElementById('resultOv').classList.remove('show');
    if (player.hp <= 0) {
        let bH = Math.floor(player.energy * .3), bM = Math.floor(player.energy * .2);
        player = {
            name: 'Qahramon', level: 1, hp: 100 + bH, maxHp: 100 + bH, mp: 50 + bM, maxMp: 50 + bM,
            xp: 0, xpNext: 100, atk: 20, def: 5, gold: 0, wins: 0, isDefending: false, energy: player.energy
        };
        bIdx = 0;
    } else bIdx++;
    busy = false;
    addLog('─────────────────────', 'ls');
    setTimeout(() => spawnEnemy(), 280);
    updPlayer(); updEnergy();
}

// KEYBOARD
document.addEventListener('keydown', e => {
    if (!pTurn || busy) return;
    const k = e.key.toLowerCase();
    if (k === 'a' || k === '1') act('attack');
    else if (k === 's' || k === '2') act('magic');
    else if (k === 'd' || k === '3') act('heal');
    else if (k === 'f' || k === '4') act('defend');
});

// INIT
updEnergy();
updPlayer();
spawnEnemy();
if (savedEnergy > 0) addLog('⚡ Quiz\'dan ' + savedEnergy + ' energiya!', 'ls');