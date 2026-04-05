// ─── SVG ICONS ───────────────────────────────────────────────
const ICONS = {
  db: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v5c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 10v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5"/><path d="M3 15v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><rect x="3" y="8" width="18" height="13" rx="3"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1.5"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/><path d="M7 18h10"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="13" width="20" height="7" rx="2"/><circle cx="6" cy="6.5" r="1"/><circle cx="6" cy="16.5" r="1"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><path d="M8 9l-3 3 3 3"/><path d="M16 9l3 3-3 3"/><path d="M13 6l-2 12"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>`,
  mobile: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,
  desktop: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  term: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 9l4 3-4 3"/><path d="M14 15h4"/></svg>`,
  py: `<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.8"><path d="M12 2C8.13 2 8 4.02 8 6v2h8v1H6C3.8 9 2 10.79 2 13v3c0 2.21 1.79 4 4 4h2v-2.5c0-2.21 1.79-4 4-4h4c1.1 0 2-.9 2-2V6c0-2.21-1.35-4-6-4z"/><circle cx="9.5" cy="6.5" r="1"/><path d="M12 22c3.87 0 4-2.02 4-4v-2H8v-1h10c2.2 0 4-1.79 4-4v-3c0-2.21-1.79-4-4-4h-2v2.5c0 2.21-1.79 4-4 4H8c-1.1 0-2 .9-2 2v4c0 2.21 1.35 4 6 4z"/><circle cx="14.5" cy="17.5" r="1"/></svg>`,
};

// ─── DATA ────────────────────────────────────────────────────
const DATA = {
  db: [
    {name:"Supabase",desc:"PostgreSQL asosidagi tekin open-source backend va database xizmati.",icon:"db",web:"https://supabase.com",copytext:"https://supabase.com"},
    {name:"PlanetScale",desc:"MySQL-compatible serverless database. Tekin rejada kengaytirilgan limit.",icon:"db",web:"https://planetscale.com",copytext:"https://planetscale.com"},
    {name:"Railway (DB)",desc:"PostgreSQL va MySQL bazalarini bir zumda deploy qiling.",icon:"db",web:"https://railway.app",copytext:"https://railway.app"},
    {name:"Neon",desc:"Serverless PostgreSQL — cold start yo'q, avtomatik masshtablash.",icon:"db",web:"https://neon.tech",copytext:"https://neon.tech"},
    {name:"MongoDB Atlas",desc:"NoSQL cloud database, tekin 512MB cluster bilan.",icon:"db",web:"https://www.mongodb.com/atlas",copytext:"https://www.mongodb.com/atlas"},
    {name:"Turso",desc:"Edge-da ishlaydigan libSQL database, SQLite asosida.",icon:"db",web:"https://turso.tech",copytext:"https://turso.tech"},
  ],
  tg: [
    {name:"Vercel",desc:"Telegram botni Edge Functions orqali deploy qiling — bepul.",icon:"bot",web:"https://vercel.com",copytext:"https://vercel.com"},
    {name:"Render",desc:"Bot uchun free web service, 750 soat/oy tekin.",icon:"bot",web:"https://render.com",copytext:"https://render.com"},
    {name:"Railway",desc:"Bot deploy qilish, tekin $5 kredit har oy.",icon:"bot",web:"https://railway.app",copytext:"https://railway.app"},
    {name:"Glitch",desc:"Bot loyihalarini online tahrirlash va hosting.",icon:"bot",web:"https://glitch.com",copytext:"https://glitch.com"},
    {name:"Fly.io",desc:"Bot containerlarini global edge nodalarda ishlatish.",icon:"bot",web:"https://fly.io",copytext:"https://fly.io"},
  ],
  be: [
    {name:"Vercel",desc:"Serverless functions va full-stack ilovalar uchun eng mashhur platforma.",icon:"server",web:"https://vercel.com",copytext:"https://vercel.com"},
    {name:"Render",desc:"Web service, cron job, va static site — barchasi bepul rejada.",icon:"server",web:"https://render.com",copytext:"https://render.com"},
    {name:"Netlify",desc:"JAMstack va serverless functions bilan kuchli backend imkoniyatlari.",icon:"server",web:"https://netlify.com",copytext:"https://netlify.com"},
    {name:"Fly.io",desc:"Docker konteynerlarni global tarzda ishlatish uchun ajoyib platforma.",icon:"server",web:"https://fly.io",copytext:"https://fly.io"},
    {name:"Deno Deploy",desc:"TypeScript/JavaScript edge runtime, zero config bilan.",icon:"server",web:"https://deno.com/deploy",copytext:"https://deno.com/deploy"},
    {name:"Cloudflare Workers",desc:"Edge computing, global tarqalgan, 100K so'rov/kun tekin.",icon:"server",web:"https://workers.cloudflare.com",copytext:"https://workers.cloudflare.com"},
  ],
  api: [
    {name:"Postman",desc:"Eng mashhur API testing va hujjatlashtirish vositasi.",icon:"api",play:"https://play.google.com/store/apps/details?id=com.postman",web:"https://postman.com",copytext:"https://postman.com"},
    {name:"Insomnia",desc:"REST, GraphQL va gRPC uchun qulay API client.",icon:"api",web:"https://insomnia.rest",copytext:"https://insomnia.rest"},
    {name:"Hoppscotch",desc:"Ochiq manbali, brauzerda ishlaydigan API test vositasi.",icon:"api",web:"https://hoppscotch.io",copytext:"https://hoppscotch.io"},
    {name:"Thunder Client",desc:"VS Code ichida ishlaydi, engil va tez API tester.",icon:"api",web:"https://www.thunderclient.com",copytext:"https://www.thunderclient.com"},
    {name:"ReqBin",desc:"Brauzerda onlayn API so'rovlarini sinab ko'rish.",icon:"api",web:"https://reqbin.com",copytext:"https://reqbin.com"},
  ],
  cs: [
    {name:"Cloudflare R2",desc:"S3-mos object storage, egress to'lovi yo'q, 10GB tekin.",icon:"cloud",web:"https://cloudflare.com/r2",copytext:"https://cloudflare.com/r2"},
    {name:"Backblaze B2",desc:"Arzon va ishonchli cloud storage, 10GB bepul.",icon:"cloud",web:"https://backblaze.com",copytext:"https://backblaze.com"},
    {name:"Supabase Storage",desc:"PostgreSQL bilan integratsiya, fayl va media saqlash.",icon:"cloud",web:"https://supabase.com/storage",copytext:"https://supabase.com/storage"},
    {name:"Cloudinary",desc:"Rasm va video saqlash, optimallashtirish, CDN — tekin reja.",icon:"cloud",web:"https://cloudinary.com",copytext:"https://cloudinary.com"},
    {name:"ImageKit",desc:"Media saqlash va real-time transformatsiya, bepul rejada.",icon:"cloud",web:"https://imagekit.io",copytext:"https://imagekit.io"},
  ],
};

const MOBILE_APPS = [
  {name:"Acode",desc:"Android uchun kuchli kod muharriri, syntax highlighting bilan.",icon:"mobile",play:"https://play.google.com/store/apps/details?id=com.foxdebug.acodefree",copytext:"https://play.google.com/store/apps/details?id=com.foxdebug.acodefree"},
  {name:"Spck Editor",desc:"HTML, CSS, JS va Node.js qo'llab-quvvatlash, live preview.",icon:"code",play:"https://play.google.com/store/apps/details?id=io.spck",copytext:"https://play.google.com/store/apps/details?id=io.spck"},
  {name:"TrebEdit",desc:"Mobil qurilmalar uchun HTML/CSS muharriri, real-time ko'rinish.",icon:"mobile",play:"https://play.google.com/store/apps/details?id=com.teejay.trebedit",copytext:"https://play.google.com/store/apps/details?id=com.teejay.trebedit"},
  {name:"Pydroid 3",desc:"Android uchun Python IDE, pip va kutubxonalar bilan.",icon:"py",play:"https://play.google.com/store/apps/details?id=ru.iiec.pydroid3",copytext:"https://play.google.com/store/apps/details?id=ru.iiec.pydroid3"},
  {name:"Termux",desc:"Android terminal muhiti, apt va bash orqali to'liq Linux.",icon:"term",play:"https://play.google.com/store/apps/details?id=com.termux",web:"https://termux.dev",copytext:"https://termux.dev"},
];

const DESKTOP_APPS = [
  {name:"VS Code",desc:"Microsoft tomonidan, eng ko'p ishlatiladigan kod muharriri.",icon:"desktop",web:"https://code.visualstudio.com",copytext:"https://code.visualstudio.com"},
  {name:"Sublime Text",desc:"Engil va tez, professional kod muharriri.",icon:"desktop",web:"https://sublimetext.com",copytext:"https://sublimetext.com"},
  {name:"Notepad++",desc:"Windows uchun ochiq manbali, ko'p tilli muharrir.",icon:"desktop",web:"https://notepad-plus-plus.org",copytext:"https://notepad-plus-plus.org"},
  {name:"WebStorm",desc:"JetBrains'dan JavaScript IDE, talabalar uchun tekin.",icon:"desktop",web:"https://jetbrains.com/webstorm",copytext:"https://jetbrains.com/webstorm"},
  {name:"Cursor",desc:"AI yordamida kod yozish uchun zamonaviy muharrir.",icon:"desktop",web:"https://cursor.sh",copytext:"https://cursor.sh"},
];

// ─── AUDIO ───────────────────────────────────────────────────
const ctx = new (window.AudioContext || window.webkitAudioContext)();
function playClick() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

// ─── RENDER ──────────────────────────────────────────────────
function card(item) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-icon">${ICONS[item.icon]||ICONS.code}</div>
    <div class="card-name">${item.name}</div>
    <div class="card-desc">${item.desc}</div>
    <button class="card-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      Ko'rish
    </button>`;
  div.addEventListener('click', () => { playClick(); openModal(item); });
  return div;
}

function render(id, arr) {
  const g = document.getElementById(id);
  arr.forEach(i => g.appendChild(card(i)));
}

render('db-grid', DATA.db);
render('tg-grid', DATA.tg);
render('be-grid', DATA.be);
render('api-grid', DATA.api);
render('cs-grid', DATA.cs);
render('mobile-grid', MOBILE_APPS);
render('desktop-grid', DESKTOP_APPS);

// ─── MODAL ───────────────────────────────────────────────────
const overlay = document.getElementById('overlay');
const modalClose = document.getElementById('modal-close');

function openModal(item) {
  document.getElementById('m-icon').innerHTML = ICONS[item.icon]||ICONS.code;
  document.getElementById('m-name').textContent = item.name;
  document.getElementById('m-desc').textContent = item.desc;
  document.getElementById('m-copytext').textContent = item.copytext;

  const links = document.getElementById('m-links');
  links.innerHTML = '';

  if (item.play) {
    const a = document.createElement('a');
    a.className = 'dl-btn play'; a.href = item.play; a.target = '_blank';
    a.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17l18 8.5-18 8.5z"/></svg> Play Market`;
    links.appendChild(a);
  }
  if (item.apple) {
    const a = document.createElement('a');
    a.className = 'dl-btn apple'; a.href = item.apple; a.target = '_blank';
    a.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> App Store`;
    links.appendChild(a);
  }
  if (item.web) {
    const a = document.createElement('a');
    a.className = 'dl-btn web'; a.href = item.web; a.target = '_blank';
    a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg> Saytga o'tish`;
    links.appendChild(a);
  }
  if (!item.play && !item.apple && !item.web) {
    links.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">Havola mavjud emas</span>';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', () => { playClick(); closeModal(); });
overlay.addEventListener('click', e => { if (e.target === overlay) { playClick(); closeModal(); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── COPY ────────────────────────────────────────────────────
document.getElementById('copy-btn').addEventListener('click', () => {
  playClick();
  const txt = document.getElementById('m-copytext').textContent;
  navigator.clipboard.writeText(txt).then(() => showToast());
});

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ─── CLICK SOUND ON ALL BUTTONS/CARDS ───────────────────────
document.querySelectorAll('.dl-btn').forEach(b => b.addEventListener('click', playClick));

  const lists = document.querySelectorAll('.navigation ul .list');
const indicator = document.querySelector('.indicator');

function moveIndicator(el) {
    const navRect = el.parentElement.getBoundingClientRect();
    const liRect = el.getBoundingClientRect();
    const indicatorSize = indicator.offsetWidth;

    const centerX = liRect.left - navRect.left + (liRect.width / 2) - (indicatorSize / 2);
    indicator.style.left = centerX + "px";
}

lists.forEach(item => {
    item.addEventListener("click", function () {
        lists.forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        moveIndicator(this);
    });
});

window.addEventListener("load", () => {
    const active = document.querySelector(".navigation ul .list.active");
    if (active) moveIndicator(active);
});

window.addEventListener("resize", () => {
    const active = document.querySelector(".navigation ul .list.active");
    if (active) moveIndicator(active);
});