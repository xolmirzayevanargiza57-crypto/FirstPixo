const oyinlar = [
    {
        nom: "Dragon Quest", 
        img: "dragon.png", 
        tur: "Sarguzasht", 
        yulduz: 5,
        url: "dragon.html"
    },

    {
        nom: "Robot", img: 
        "robot.png", 
        tur: "Aksiya",
        yulduz: 4,
        url: "robot.html"
    },


    {
        nom: "Basketbol",
        img: "basketball.png",
        tur: "Sport",
        yulduz: 4,
        url: "basketball.html"
    },

    {
        nom: "X va O",
        img: "xo.png",
        tur: "Jumboq",
        yulduz: 5,
        url: "xo.html"
    },

    {
        nom: "Tank Jangi",
        img: "tank.png",
        tur: "Aksiya",
        yulduz: 4,
        url: "tank.html"
    },

    {
        nom: "Shaxmat Shohi",
        img: "chess.png",
        tur: "Strategiya",
        yulduz: 5,
        url: "chess.html"
    },

    {
        nom: "Shashka",
        img: "shashka.png",
        tur: "Jumboq", 
        yulduz: 4,
        url: "shashka.html"
    },
];

let faolKat = 'Barchasi';

// ─── AUDIO ───────────────────────────────────────────────
let audioCtx = null;
function audioCtxOl() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}
function clickOvozi() {
    try {
        const ctx = audioCtxOl();
        const uzunlik = 0.06;
        const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * uzunlik), ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / ctx.sampleRate;
            data[i] = (Math.sin(2 * Math.PI * 1200 * t) * 0.4 + Math.sin(2 * Math.PI * 600 * t) * 0.2) * Math.exp(-80 * t);
        }
        const manba = ctx.createBufferSource();
        manba.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + uzunlik);
        manba.connect(gain); gain.connect(ctx.destination);
        manba.start(ctx.currentTime);
    } catch (e) { console.warn("Ovoz xatosi:", e); }
}
document.addEventListener('pointerdown', function ochish() {
    audioCtxOl();
    document.removeEventListener('pointerdown', ochish);
}, { once: true });

// ─── YULDUZLAR ───────────────────────────────────────────
const yulduzlarEl = document.getElementById('yulduzlar');
for (let i = 0; i < 80; i++) {
    const y = document.createElement('div');
    y.className = 'yulduz';
    const o = Math.random() * 2.5 + 0.5;
    y.style.cssText = `width:${o}px;height:${o}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation-duration:${Math.random() * 4 + 2}s;animation-delay:${Math.random() * 5}s;`;
    yulduzlarEl.appendChild(y);
}

// ─── RIPPLE ───────────────────────────────────────────────
function rippleQosh(el) {
    el.addEventListener('pointerdown', function (e) {
        const r = document.createElement('div');
        r.className = 'ripple';
        const rect = el.getBoundingClientRect();
        const o = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${o}px;height:${o}px;left:${e.clientX - rect.left - o / 2}px;top:${e.clientY - rect.top - o / 2}px;`;
        el.appendChild(r);
        setTimeout(() => r.remove(), 600);
    });
}

// ─── ASOSIY TUZATISH: O'YIN OCHISH ───────────────────────
// Tashqi URL (http/https) => yangi tabda och
// Lokal fayl (.html) => shu tabda och (localhost muammosi yo'q)
function oyinOch(url) {
    clickOvozi();
    setTimeout(() => {
        const tashqi = url.startsWith('http://') || url.startsWith('https://');
        if (tashqi) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }, 80);
}

// ─── O'YINLARNI CHIZISH ───────────────────────────────────
function oyinlarChiz(royxat) {
    const panjara = document.getElementById('oyinlarPanjara');
    panjara.innerHTML = '';
    if (!royxat.length) {
        panjara.innerHTML = `<div class="topilmadi">⚠️ HECH QANDAY O'YIN TOPILMADI</div>`;
        return;
    }
    royxat.forEach((o, i) => {
        const yulduzlar = '★'.repeat(o.yulduz) + '☆'.repeat(5 - o.yulduz);
        const karta = document.createElement('div');
        karta.className = 'karta';
        karta.style.animationDelay = `${i * 0.055}s`;
        karta.innerHTML = `
      <img src="${o.img}" alt="${o.nom}" class="karta-img"/>
      <h3>${o.nom}</h3>
      <h6>${o.tur}</h6>
      <div class="karta-yulduz">${yulduzlar}</div>
      <button class="karta-oyna">▶ O'YNASH</button>
    `;
        karta.addEventListener('pointerdown', () => clickOvozi());
        karta.addEventListener('click', () => oyinOch(o.url));
        const btn = karta.querySelector('.karta-oyna');
        btn.addEventListener('pointerdown', (e) => { e.stopPropagation(); clickOvozi(); });
        btn.addEventListener('click', (e) => { e.stopPropagation(); oyinOch(o.url); });
        rippleQosh(karta);
        panjara.appendChild(karta);
    });
}

// ─── QIDIRUV ──────────────────────────────────────────────
function qidirOyinlar() {
    const s = document.getElementById('qidiruvInput').value.toLowerCase();
    let royxat = oyinlar;
    if (faolKat !== 'Barchasi') royxat = royxat.filter(o => o.tur === faolKat);
    royxat = royxat.filter(o => o.nom.toLowerCase().includes(s));
    oyinlarChiz(royxat);
}

// ─── KATEGORIYA FILTER ────────────────────────────────────
function katFilter(kat, btn) {
    clickOvozi();
    faolKat = kat;
    document.querySelectorAll('.kat-btn').forEach(b => b.classList.remove('faol'));
    btn.classList.add('faol');
    qidirOyinlar();
}

document.querySelectorAll('.kat-btn').forEach(btn => {
    btn.addEventListener('pointerdown', () => clickOvozi());
});

// ─── TANLANGAN O'YIN ──────────────────────────────────────
const tanlanganEl = document.getElementById('tanlanganKarta');
const tanlanganBtn = document.getElementById('tanlanganOynaBtn');
tanlanganEl.addEventListener('pointerdown', () => clickOvozi());
tanlanganEl.addEventListener('click', () => oyinOch(oyinlar[0].url));
tanlanganBtn.addEventListener('pointerdown', e => { e.stopPropagation(); clickOvozi(); });
tanlanganBtn.addEventListener('click', e => { e.stopPropagation(); oyinOch(oyinlar[0].url); });
rippleQosh(tanlanganEl);

// ─── BOSHQA ───────────────────────────────────────────────
document.getElementById('asosiyBtn').addEventListener('pointerdown', () => clickOvozi());
document.getElementById('qidiruvInput').addEventListener('focus', () => clickOvozi());

// ─── ISHGA TUSHIRISH ──────────────────────────────────────
oyinlarChiz(oyinlar);