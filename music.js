// ============================================================
// MUSIQALAR SHU YERDA — src ga fayl yo'lini yozing
// Misol: src: "audio/qoshiq.mp3"  yoki to'liq URL
// ============================================================
const TRACKS = [
   { 
     title: "Insonlar", artist: "Konsta", src: "insonlar.m4a" 
   },
   
   { 
     title: "Odamlar nima deydi", 
     artist: "Konsta & Timur Alixonov",
   src: "odamlar.m4a" 
   },
   
   { 
     title: "Progress", artist: "Minor",
   src: "progress.m4a" 
   },
   
   { title: "6/8",
   artist: "MINOR ft UZTEERAN",
   src: "6.m4a" 
   },
   
   { 
    title: "Face", 
    artist: "Bofa & Konsta ", 
    src: "face.m4a" 
   },
   
   { 
    title: "ypx gayilarga uzur", 
    artist: "Shokir", 
    src: "ypx.m4a" 
   },
   
  { 
  title: "Salom Hayr", 
    artist: "Konsta & Salikh", 
    src: "salom.m4a" 
   },
   
  { 
  title: "Bilmaydi", 
    artist: "Konsta", 
    src: "bilmaydi.m4a" 
   },
   
  { 
    title: "Boshqacha", 
    artist: "Shokir", 
    src: "boshqacha.m4a" 
   },
   
  { 
  title: "Tosh", 
    artist: "Shokir", 
    src: "tosh.m4a" 
   },
   
  { 
  title: "Aura", 
    artist: "Shokir", 
    src: "aura.m4a" 
   },
   
  { 
  title: "Formula", 
    artist: "Shokir", 
    src: "formula1.m4a" 
   },
   
  { 
  title: "Prada", 
    artist: "Shokir", 
    src: "prada.m4a" 
   },
   
  {
    title: "Glaza Глаза",
    artist: "Медина-Jah",
    src: "jah.m4a"
  } 
];
// ============================================================

const audio = new Audio();
audio.volume = 0.8;

let tracks = TRACKS.map(t => ({ ...t, duration: '' }));
let cur = -1, playing = false, shuffle = false, repeat = false, muted = false, prevVol = 0.8;
let searchQ = '', vizAF;

// Elements
const $ = id => document.getElementById(id);
const sidebar = $('sidebar'), overlay = $('overlay'), toast = $('toast');
const trackList = $('track-list'), noTracks = $('no-tracks'), trackCount = $('track-count');
const titleEl = $('track-title'), artistEl = $('track-artist');
const playBtn = $('play-btn'), prevBtn = $('prev-btn'), nextBtn = $('next-btn');
const shuffleBtn = $('shuffle-btn'), repeatBtn = $('repeat-btn');
const muteBtn = $('mute-btn'), volInput = $('vol-input'), volFill = $('vol-fill');
const progBar = $('prog-bar'), progFill = $('prog-fill');
const timeCur = $('time-cur'), timeDur = $('time-dur');
const menuBtn = $('menu-btn'), closeSb = $('close-sb');
const searchInput = $('search-input'), searchClear = $('search-clear');
const vizEl = $('viz');
const icoPlay = $('ico-play'), icoPause = $('ico-pause');
const vHigh = $('v-high'), vLow = $('v-low'), vMute = $('v-mute');

// VISUALIZER
for (let i = 0; i < 26; i++) {
  const b = document.createElement('div');
  b.className = 'vbar'; b.style.height = '3px';
  vizEl.appendChild(b);
}
const bars = vizEl.querySelectorAll('.vbar');

function animBars() {
  bars.forEach(b => { b.classList.add('on'); b.style.height = (6 + Math.random() * 40) + 'px'; });
  vizAF = requestAnimationFrame(animBars);
}
function stopBars() {
  cancelAnimationFrame(vizAF);
  bars.forEach(b => { b.classList.remove('on'); b.style.height = '3px'; });
}

// TOAST
let tTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(tTimer);
  tTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// FORMAT
function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}

// HIGHLIGHT
function hl(t, q) {
  if (!q) return t;
  const i = t.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return t;
  return t.slice(0, i) + '<mark>' + t.slice(i, i + q.length) + '</mark>' + t.slice(i + q.length);
}

// RENDER LIST
function render() {
  const filtered = tracks.map((t, i) => ({ ...t, i })).filter(t =>
    !searchQ || t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
    (t.artist && t.artist.toLowerCase().includes(searchQ.toLowerCase()))
  );
  noTracks.style.display = tracks.length === 0 ? 'flex' : 'none';
  trackCount.textContent = tracks.length + ' track' + (tracks.length !== 1 ? 's' : '');
  trackList.querySelectorAll('.track-item, .no-results').forEach(e => e.remove());

  if (tracks.length > 0 && filtered.length === 0) {
    const d = document.createElement('div');
    d.className = 'no-results'; d.textContent = 'Topilmadi';
    trackList.appendChild(d); return;
  }

  filtered.forEach((t, fi) => {
    const d = document.createElement('div');
    d.className = 'track-item' + (t.i === cur ? ' active' : '');
    d.innerHTML = `
      <span class="track-num">${t.i === cur
        ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="0" y="0" width="3" height="10" rx="1" fill="currentColor"/><rect x="7" y="0" width="3" height="10" rx="1" fill="currentColor"/></svg>`
        : fi + 1
      }</span>
      <div class="track-meta">
        <div class="track-name">${hl(t.title, searchQ)}</div>
        <div class="track-dur">${t.duration || '—'}</div>
      </div>
      <button class="track-del" data-i="${t.i}">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>`;
    d.addEventListener('click', e => {
      if (e.target.closest('.track-del')) return;
      load(t.i, true);
    });
    d.querySelector('.track-del').addEventListener('click', e => {
      e.stopPropagation(); del(t.i);
    });
    trackList.appendChild(d);
  });
}

// LOAD
function load(idx, autoplay = false) {
  if (idx < 0 || idx >= tracks.length) return;
  cur = idx;
  const t = tracks[idx];
  audio.src = t.src;
  titleEl.textContent = t.title;
  artistEl.textContent = t.artist || 'Noma\'lum';
  playBtn.disabled = false;
  progFill.style.width = '0%';
  timeCur.textContent = '0:00';
  timeDur.textContent = t.duration || '0:00';
  render();
  if (autoplay) play();
}

// PLAY / PAUSE
function play() {
  audio.play().then(() => {
    playing = true;
    icoPlay.style.display = 'none';
    icoPause.style.display = '';
    animBars();
  }).catch(() => {});
}
function pause() {
  audio.pause();
  playing = false;
  icoPlay.style.display = '';
  icoPause.style.display = 'none';
  stopBars();
}

playBtn.addEventListener('click', () => {
  if (!tracks.length) return;
  if (cur === -1) { load(0, true); return; }
  playing ? pause() : play();
});

// PREV / NEXT
prevBtn.addEventListener('click', () => {
  if (!tracks.length) return;
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  load(cur <= 0 ? tracks.length - 1 : cur - 1, playing);
});
nextBtn.addEventListener('click', () => { if (tracks.length) next(); });

function next() {
  let idx;
  if (shuffle) { do { idx = Math.floor(Math.random() * tracks.length); } while (tracks.length > 1 && idx === cur); }
  else idx = (cur + 1) % tracks.length;
  load(idx, playing);
}

audio.addEventListener('ended', () => { repeat ? (audio.currentTime = 0, play()) : next(); });

// PROGRESS
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
  timeCur.textContent = fmt(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => {
  timeDur.textContent = fmt(audio.duration);
  if (tracks[cur]) { tracks[cur].duration = fmt(audio.duration); render(); }
});
progBar.addEventListener('click', e => {
  if (!audio.duration) return;
  const r = progBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
});

// VOLUME
volInput.addEventListener('input', () => {
  const v = +volInput.value;
  audio.volume = v; volFill.style.width = v * 100 + '%';
  muted = v === 0; updateVol(v);
});
muteBtn.addEventListener('click', () => {
  if (muted) {
    audio.volume = prevVol || 0.8;
    volInput.value = audio.volume;
    volFill.style.width = audio.volume * 100 + '%';
    muted = false; updateVol(audio.volume);
  } else {
    prevVol = audio.volume; audio.volume = 0;
    volInput.value = 0; volFill.style.width = '0%';
    muted = true; updateVol(0);
  }
});
function updateVol(v) {
  vHigh.style.display = v > 0.4 ? '' : 'none';
  vLow.style.display = v > 0 && v <= 0.4 ? '' : 'none';
  vMute.style.display = v === 0 ? '' : 'none';
}

// SHUFFLE / REPEAT
shuffleBtn.addEventListener('click', () => {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('on', shuffle);
  showToast(shuffle ? 'Shuffle yoqildi' : 'Shuffle o\'chirildi');
});
repeatBtn.addEventListener('click', () => {
  repeat = !repeat;
  repeatBtn.classList.toggle('on', repeat);
  showToast(repeat ? 'Repeat yoqildi' : 'Repeat o\'chirildi');
});

// SIDEBAR
menuBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  setTimeout(() => searchInput.focus(), 350);
});
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}
closeSb.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// SEARCH
searchInput.addEventListener('input', () => {
  searchQ = searchInput.value.trim();
  searchClear.classList.toggle('vis', searchQ.length > 0);
  render();
});
searchClear.addEventListener('click', () => {
  searchInput.value = ''; searchQ = '';
  searchClear.classList.remove('vis');
  render(); searchInput.focus();
});

// DELETE
function del(idx) {
  if (idx === cur) {
    pause(); stopBars(); cur = -1;
    titleEl.textContent = 'Musiqa tanlanmagan';
    artistEl.textContent = 'Playlist dan tanlang';
    progFill.style.width = '0%';
    timeCur.textContent = '0:00'; timeDur.textContent = '0:00';
    playBtn.disabled = true; audio.src = '';
  } else if (idx < cur) cur--;
  if (tracks[idx] && tracks[idx].src.startsWith('blob:')) URL.revokeObjectURL(tracks[idx].src);
  tracks.splice(idx, 1);
  render(); showToast('O\'chirildi');
}

// INIT
render();
if (tracks.length > 0) load(0, false);