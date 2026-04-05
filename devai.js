const AIs = [
  {
    id:'chatgpt', rankClass:'rank-1', medal:'🥇',
    name:'Pixo AI', feature:'Pixo · Eng ommabop va keng qamrovli AI',
    score:98,
    icon:`    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="url(#gradient)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00c6ff"/>
          <stop offset="50%" stop-color="#0072ff"/>
          <stop offset="100%" stop-color="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>`,
    platforms:[
      {type:'web',   label:'Veb sayt',    url:'https://pixo.com'},
    ],
    copies:[
      {label:'Havola', val:'https://pixo.com'},
      {label:'Nom',    val:'Pixo AI by Pixo'},
    ]
  },
  {
    id:'gemini', rankClass:'rank-2', medal:'🥈',
    name:'Gemini', feature:'Google DeepMind · Multimodal ultra kuchli tizim',
    score:92,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3C16 3 22 11 28 16C22 21 16 29 16 29C16 29 10 21 4 16C10 11 16 3 16 3Z" fill="url(#g2)"/><defs><linearGradient id="g2" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse"><stop stop-color="#4285F4"/><stop offset="1" stop-color="#00C4FF"/></linearGradient></defs></svg>`,
    platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.google.android.apps.bard'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/google-gemini/id6477489876'},
      {type:'web',   label:'Veb sayt',    url:'https://gemini.google.com'},
    ],
    copies:[
      {label:'Havola', val:'https://gemini.google.com'},
      {label:'Nom',    val:'Google Gemini AI'},
    ]
  },
  {
    id:'claude', rankClass:'rank-3', medal:'🥉',
    name:'Claude', feature:'Anthropic · Xavfsizlik va mantiqda raqobatchi yo\'q',
    score:88,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="7" fill="url(#g3)"/><path d="M11 16h10M16 11v10" stroke="#fff" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="g3" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse"><stop stop-color="#CC5500"/><stop offset="1" stop-color="#FF8C42"/></linearGradient></defs></svg>`,
    platforms:[
      {type:'apple', label:'App Store', url:'https://apps.apple.com/app/claude-by-anthropic/id6473753684'},
      {type:'web',   label:'Veb sayt',  url:'https://claude.ai'},
    ],
    copies:[
      {label:'Havola', val:'https://claude.ai'},
      {label:'Nom',    val:'Claude by Anthropic'},
    ]
  },
  {
    id:'copilot', rankClass:'rank-other', medal:null,
    name:'Copilot', feature:'Microsoft · Kod yozishda #1 yordamchi',
    score:85,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(0,120,212,0.12)"/><rect x="6" y="6" width="9" height="9" rx="2" fill="#0078D4"/><rect x="17" y="6" width="9" height="9" rx="2" fill="#00BCF2"/><rect x="6" y="17" width="9" height="9" rx="2" fill="#00BCF2"/><rect x="17" y="17" width="9" height="9" rx="2" fill="#0078D4"/></svg>`,
    platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.microsoft.copilot'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/microsoft-copilot/id6472538445'},
      {type:'web',   label:'Veb sayt',    url:'https://copilot.microsoft.com'},
    ],
    copies:[
      {label:'Havola', val:'https://copilot.microsoft.com'},
      {label:'Nom',    val:'Microsoft Copilot AI'},
    ]
  },
  {
    id:'ChatGPT', rankClass:'rank-other', medal:null,
    name:'OpenAI', feature:'Real-time qidiruv + AI · Yangiliklarda tengsiz',
    score:82,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="url(#g1)"/><path d="M10 16h12M16 10v12" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><defs><radialGradient id="g1" cx="0.3" cy="0.3"><stop stop-color="#10A37F"/><stop offset="1" stop-color="#0a7a60"/></radialGradient></defs></svg>`,
        platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.openai.chatgpt'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/chatgpt/id6448311069'},
      {type:'web',   label:'Veb sayt',    url:'https://chat.openai.com'},
    ],
    copies:[
      {label:'Havola', val:'https://chat.openai.com'},
      {label:'Nom',    val:'ChatGPT by OpenAI'},
    ]
  },
  {
    id:'grok', rankClass:'rank-other', medal:null,
    name:'Grok', feature:'xAI / Elon Musk · Real vaqt X/Twitter ma\'lumoti',
    score:79,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.04)"/><path d="M8 24L24 8M17 8h7v7" stroke="#e0e0e0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.x.android'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/x/id333903271'},
      {type:'web',   label:'Veb sayt',    url:'https://grok.x.ai'},
    ],
    copies:[
      {label:'Havola', val:'https://grok.x.ai'},
      {label:'Nom',    val:'Grok by xAI'},
    ]
  },
  {
    id:'llama', rankClass:'rank-other', medal:null,
    name:'Llama', feature:'Meta AI · Ochiq manba · Mahalliy o\'rnatish',
    score:76,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(0,100,255,0.08)"/><path d="M13 24c0-4 1.5-7 3-8 1.5 1 3 4 3 8" stroke="#4080FF" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="10" r="3" fill="#4080FF" opacity="0.85"/></svg>`,
    platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.meta.ai'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/meta-ai/id6477532801'},
      {type:'web',   label:'Veb sayt',    url:'https://ai.meta.com'},
    ],
    copies:[
      {label:'Havola', val:'https://ai.meta.com'},
      {label:'Nom',    val:'Meta Llama AI'},
    ]
  },
  {
    id:'mistral', rankClass:'rank-other', medal:null,
    name:'Mistral', feature:'Evropa\'ning eng tez ochiq AI modeli',
    score:72,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(255,150,0,0.07)"/><path d="M7 23l4.5-13 4.5 9 4.5-9L25 23" stroke="#FF9600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    platforms:[
      {type:'apple', label:'App Store', url:'https://apps.apple.com/app/le-chat-by-mistral-ai/id6504820996'},
      {type:'web',   label:'Le Chat',   url:'https://chat.mistral.ai'},
    ],
    copies:[
      {label:'Havola', val:'https://chat.mistral.ai'},
      {label:'Nom',    val:'Mistral Le Chat'},
    ]
  },
  {
    id:'deepseek', rankClass:'rank-other', medal:null,
    name:'DeepSeek', feature:'Xitoy · Kod va matematik masalalarda yetakchi',
    score:68,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(100,0,255,0.08)"/><circle cx="16" cy="16" r="7" fill="none" stroke="#a060ff" stroke-width="2"/><circle cx="16" cy="16" r="3" fill="#a060ff" opacity="0.7"/></svg>`,
    platforms:[
      {type:'play',  label:'Play Market', url:'https://play.google.com/store/apps/details?id=com.deepseek.app'},
      {type:'apple', label:'App Store',   url:'https://apps.apple.com/app/deepseek-ai-assistant/id6737597970'},
      {type:'web',   label:'Veb sayt',    url:'https://chat.deepseek.com'},
    ],
    copies:[
      {label:'Havola', val:'https://chat.deepseek.com'},
      {label:'Nom',    val:'DeepSeek AI'},
    ]
  },
  {
    id:'pika', rankClass:'rank-other', medal:null,
    name:'Pika AI', feature:'Matndan video yaratishda eng zamonaviy',
    score:63,
    icon:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="rgba(255,60,120,0.08)"/><path d="M11 10l14 6-14 6V10z" fill="#ff3c78" opacity="0.85"/></svg>`,
    platforms:[
      {type:'web', label:'Veb sayt', url:'https://pika.art'},
    ],
    copies:[
      {label:'Havola', val:'https://pika.art'},
      {label:'Nom',    val:'Pika AI Video Generator'},
    ]
  },
];

// Build list
const list = document.getElementById('ai-list');
AIs.forEach((ai, i) => {
  const rankNum = i + 1;
  const card = document.createElement('div');
  card.className = `ai-card ${ai.rankClass}`;
  card.style.animationDelay = (i * 0.06) + 's';

  const badgeHtml = ai.medal
    ? `<div class="rank-badge"><span class="medal-emoji">${ai.medal}</span></div>`
    : `<div class="rank-badge"><div class="rank-num">${rankNum}</div></div>`;

  card.innerHTML = `
    <div class="card-bar"></div>
    <div class="card-inner">
      ${badgeHtml}
      <div class="ai-icon">${ai.icon}</div>
      <div class="ai-info">
        <div class="ai-name">${ai.name}</div>
        <div class="ai-feature">${ai.feature}</div>
      </div>
      <div class="score-wrap">
        <div class="score-num">${ai.score}</div>
        <div class="score-bar-wrap">
          <div class="score-bar" data-w="${ai.score}%" style="width:0%"></div>
        </div>
      </div>
      <div class="card-arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </div>`;

  card.onclick = () => openModal(ai);
  list.appendChild(card);
});

// Animate bars
setTimeout(() => {
  document.querySelectorAll('.score-bar').forEach(b => {
    b.style.transition = 'width 1.1s cubic-bezier(.23,1,.32,1)';
    b.style.width = b.dataset.w;
  });
}, 200);

// Platform SVGs
const platIcons = {
  play: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 3l15 9-15 9V3z" fill="#00c864"/></svg>`,
  apple: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#c8c8c8"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
  web: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10"/></svg>`,
};
const platLabels = { play:'Play Market', apple:'App Store', web:'Brauzer' };

// Open Modal
function openModal(ai) {
  document.getElementById('mIcon').innerHTML = ai.icon;
  document.getElementById('mName').textContent = ai.name;
  document.getElementById('mFeat').textContent = ai.feature;

  // Platforms
  const pEl = document.getElementById('mPlatforms');
  pEl.innerHTML = '';
  ai.platforms.forEach(p => {
    const a = document.createElement('a');
    a.className = `plat-btn ${p.type}`;
    a.href = p.url; a.target='_blank'; a.rel='noopener';
    a.innerHTML = `
      <div class="plat-icon">${platIcons[p.type]}</div>
      <div class="plat-texts">
        <div class="plat-label">Yuklab olish</div>
        <div class="plat-name">${p.label}</div>
      </div>
      <div class="plat-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>`;
    pEl.appendChild(a);
  });

  // Copies
  const cEl = document.getElementById('mCopies');
  cEl.innerHTML = '';
  ai.copies.forEach(c => {
    const row = document.createElement('div');
    row.className = 'copy-row';
    row.innerHTML = `
      <span class="copy-label-small">${c.label}</span>
      <span class="copy-val">${c.val}</span>
      <button class="copy-btn" onclick="doCopy(this,'${c.val.replace(/'/g,"\\'")}')">NUSXA</button>`;
    cEl.appendChild(row);
  });

  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}
function closeOut(e) { if(e.target===document.getElementById('overlay')) closeModal(); }

function doCopy(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ OK';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'NUSXA'; btn.classList.remove('ok'); }, 2000);
  });
}