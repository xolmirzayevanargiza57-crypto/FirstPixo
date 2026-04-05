/* ═══════════════════════════════
   CONFIG
═══════════════════════════════ */
const GROQ_KEY   = typeof ENV !== 'undefined' ? ENV.GROQ_KEY : ""; // env.js dan olinadi
const GROQ_URL   = "https://api.groq.com/openai/v1/chat/completions";
const TEXT_MODEL   = "llama-3.3-70b-versatile";
const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

/* ═══════════════════════════════
   STATE
═══════════════════════════════ */
let messages      = [{ role:"system", content:"Men Xojiakbar tomonidan yasalgan Pixo AI nomli o'zbek tilida gaplashadigan sun'iy intellekt yordamchiman. Doim foydali va aniq javob beraman." }];
let selectedImage = null;
let isRecording   = false;
let recognition   = null;
let currentChatId = null;
let ctxTargetId   = null;
let longPressTimer= null;

/* ═══════════════════════════════
   TYPEWRITER STATE  ← NEW
═══════════════════════════════ */
let activeTypewriter = null; // tracks current interval so we can kill it

/* ═══════════════════════════════
   ELEMENTS
═══════════════════════════════ */
const chat        = document.getElementById("chat");
const input       = document.getElementById("input");
const themeToggle = document.getElementById("themeToggle");
const menu        = document.getElementById("menu");
const overlay     = document.getElementById("overlay");
const hamburger   = document.getElementById("hamburger");
const closeBtn    = document.getElementById("closeModal2");
const micBtn      = document.getElementById("micBtn");
const ctxMenu     = document.getElementById("ctxMenu");

/* ═══════════════════════════════
   SCROLL HELPERS  ← NEW
═══════════════════════════════ */
function isNearBottom() {
  return chat.scrollHeight - chat.scrollTop - chat.clientHeight < 80;
}

function scrollIfNeeded() {
  if (isNearBottom()) {
    chat.scrollTop = chat.scrollHeight;
  }
}

/* ═══════════════════════════════
   MOBILE KEYBOARD FIX  ← NEW
═══════════════════════════════ */
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    // When keyboard opens/closes, keep scroll position stable
    if (isNearBottom()) {
      setTimeout(() => { chat.scrollTop = chat.scrollHeight; }, 50);
    }
  });
}

/* ═══════════════════════════════
   MENU
═══════════════════════════════ */
function openMenu()  { menu.style.left='0';      overlay.style.display='block'; }
function closeMenu() { menu.style.left='-280px'; overlay.style.display='none';  }

hamburger.addEventListener('click', e => {
  e.stopPropagation();
  menu.style.left === '0px' ? closeMenu() : openMenu();
});
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', () => { closeMenu(); hideCtx(); });
menu.addEventListener('click', e => e.stopPropagation());
document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeMenu(); hideCtx(); } });

/* ═══════════════════════════════
   THEME
═══════════════════════════════ */
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});
if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
  themeToggle.checked = true;
}

/* ═══════════════════════════════
   TEXTAREA RESIZE
═══════════════════════════════ */
function autoResize(el){
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

/* ═══════════════════════════════
   IMAGE UPLOAD
═══════════════════════════════ */
function handleImage(e){
  const file = e.target.files[0];
  if(!file) return;
  if(file.size > 4 * 1024 * 1024){
    addSystemMsg("⚠️ Rasm 4MB dan kichik bo'lishi kerak.");
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    const dataUrl = ev.target.result;
    const base64  = dataUrl.split(',')[1];
    const mime    = file.type || 'image/jpeg';
    selectedImage = { base64, name: file.name, dataUrl, mime };
    document.getElementById('previewImg').src = dataUrl;
    document.getElementById('previewName').textContent = file.name;
    document.getElementById('imagePreview').style.display = 'flex';
    input.placeholder = "Rasm haqida savol yozing...";
    input.focus();
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function removeImage(){
  selectedImage = null;
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('previewImg').src = '';
  input.placeholder = "Savol yozing...";
}

/* ═══════════════════════════════
   MICROPHONE
═══════════════════════════════ */
function toggleMic(){
  if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
    addSystemMsg("⚠️ Brauzeringiz mikrofonni qo'llab-quvvatlamaydi. Chrome ishlatib ko'ring.");
    return;
  }
  isRecording ? stopMic() : startMic();
}

function startMic(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = 'uz-UZ';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    isRecording = true;
    micBtn.classList.add('mic-active');
  };
  recognition.onresult = e => {
    let t = '';
    for(let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
    input.value = t;
    autoResize(input);
  };
  recognition.onend = () => {
    isRecording = false;
    micBtn.classList.remove('mic-active');
    recognition = null;
  };
  recognition.onerror = e => {
    isRecording = false;
    micBtn.classList.remove('mic-active');
    if(e.error === 'not-allowed') addSystemMsg("⚠️ Mikrofon ruxsati berilmagan. Brauzer sozlamalarini tekshiring.");
  };
  recognition.start();
}

function stopMic(){
  if(recognition) recognition.stop();
}

/* ═══════════════════════════════
   MESSAGES UI
═══════════════════════════════ */
function removeWelcome(){
  const w = document.getElementById('welcomeScreen');
  if(w) w.remove();
}

function addUserMsg(text, imgDataUrl){
  removeWelcome();
  const div = document.createElement("div");
  div.className = "msg user";
  if(imgDataUrl){
    const img = document.createElement('img');
    img.src = imgDataUrl;
    img.className = 'msg-image';
    div.appendChild(img);
  }
  if(text){
    const p = document.createElement('div');
    p.textContent = text;
    div.appendChild(p);
  }
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; // always scroll on user send
}

function addAiMsg(text){
  // ── Kill any existing typewriter before starting new one ← NEW
  if (activeTypewriter !== null) {
    clearInterval(activeTypewriter);
    activeTypewriter = null;
  }

  const box = document.createElement("div");
  box.className = "msg ai";

  const label = document.createElement('div');
  label.className = 'msg-label';
  label.textContent = 'Pixo AI';
  box.appendChild(label);

  const content = document.createElement("div");
  box.appendChild(content);

  const copy = document.createElement("button");
  copy.className = "copy";
  copy.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Nusxalash`;
  copy.onclick = () => {
    navigator.clipboard.writeText(text);
    copy.textContent = '✅ Nusxalandi';
    setTimeout(() => {
      copy.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Nusxalash`;
    }, 1500);
  };
  box.appendChild(copy);
  chat.appendChild(box);
  scrollIfNeeded(); // ← respect user scroll position

  // Typewriter with scroll-awareness ← PATCHED
  let i = 0;
  activeTypewriter = setInterval(() => {
    content.textContent += text[i++];
    scrollIfNeeded(); // only scroll if user is near bottom
    if(i >= text.length) {
      clearInterval(activeTypewriter);
      activeTypewriter = null; // clean up ref
    }
  }, 14);
}

function addTyping(){
  removeWelcome();
  const div = document.createElement("div");
  div.className = "msg ai";
  div.id = "typing";
  div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chat.appendChild(div);
  scrollIfNeeded(); // ← respect scroll position
}

function removeTyping(){
  const t = document.getElementById("typing");
  if(t) t.remove();
}

function addSystemMsg(text){
  removeWelcome();
  const div = document.createElement("div");
  div.className = "msg ai";
  div.style.opacity = "0.75";
  div.textContent = text;
  chat.appendChild(div);
  scrollIfNeeded(); // ← respect scroll position
}

/* ═══════════════════════════════
   SEND — faqat Groq (matn + vision)
═══════════════════════════════ */
async function send(){
  const userText = input.value.trim();
  if(!userText && !selectedImage) return;
  if(isRecording) stopMic();

  // ── Stop any running typewriter immediately ← NEW
  if (activeTypewriter !== null) {
    clearInterval(activeTypewriter);
    activeTypewriter = null;
  }

  if(!currentChatId) currentChatId = 'chat_' + Date.now();

  addUserMsg(userText, selectedImage?.dataUrl);
  input.value = '';
  input.style.height = 'auto';
  const imgSnap = selectedImage ? {...selectedImage} : null;
  removeImage();
  addTyping();

  try {
    let aiText = "";

    if(imgSnap){
      const visionMessages = [
        {
          role: "system",
          content: "Sen Pixo AI — o'zbek tilida javob beradigan yordamchi. Rasmlarni tahlil qilishda yordam berasan."
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${imgSnap.mime};base64,${imgSnap.base64}`
              }
            },
            {
              type: "text",
              text: userText || "Bu rasm haqida batafsil ayt. O'zbek tilida javob ber."
            }
          ]
        }
      ];

      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
          model: VISION_MODEL,
          messages: visionMessages,
          max_tokens: 1024
        })
      });

      const data = await res.json();
      if(data.error) throw new Error(data.error.message);
      aiText = data.choices[0].message.content;

    } else {
      messages.push({ role: "user", content: userText });

      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
          model: TEXT_MODEL,
          messages: messages,
          max_tokens: 1024
        })
      });

      const data = await res.json();
      if(data.error) throw new Error(data.error.message);
      aiText = data.choices[0].message.content;
      messages.push({ role: "assistant", content: aiText });
    }

    removeTyping();
    addAiMsg(aiText);
    saveCurrentChat(userText || imgSnap?.name || "Rasm", aiText);

  } catch(err){
    removeTyping();
    let errMsg = err.message || "Internet aloqasini tekshiring.";
    if(errMsg.includes("decommissioned") || errMsg.includes("no longer supported")){
      errMsg = "Model yangilandi. Iltimos sahifani qayta yuklang.";
    } else if(errMsg.includes("quota") || errMsg.includes("rate limit")){
      errMsg = "So'rovlar limiti tugadi. Biroz kuting.";
    } else if(errMsg.includes("401") || errMsg.includes("invalid_api_key")){
      errMsg = "API kalit noto'g'ri. Tekshirib ko'ring.";
    }
    if (!GROQ_KEY) errMsg = "API kalit topilmadi! (env.js yoki .env ni tekshiring)";
    addSystemMsg("⚠️ Xatolik: " + errMsg);
    console.error(err);
  }
}

/* ═══════════════════════════════
   CHAT HISTORY
═══════════════════════════════ */
function getChats(){
  try { return JSON.parse(localStorage.getItem('pixo_chats') || '[]'); }
  catch { return []; }
}

function saveChats(chats){
  localStorage.setItem('pixo_chats', JSON.stringify(chats));
}

function saveCurrentChat(firstUserMsg, lastAiMsg){
  const chats = getChats();
  const existing = chats.findIndex(c => c.id === currentChatId);
  const title = firstUserMsg.slice(0, 40) + (firstUserMsg.length > 40 ? '...' : '');
  const now = Date.now();
  const saveMsgs = messages.map(m => ({
    ...m,
    content: typeof m.content === 'string' ? m.content : '[rasm]'
  }));

  if(existing >= 0){
    chats[existing] = { ...chats[existing], title, updatedAt: now, messages: saveMsgs };
  } else {
    chats.unshift({ id: currentChatId, title, createdAt: now, updatedAt: now, messages: saveMsgs });
  }
  if(chats.length > 50) chats.splice(50);
  saveChats(chats);
  renderHistory();
}

function renderHistory(){
  const items = document.getElementById('historyItems');
  const chats = getChats();
  if(!chats.length){
    items.innerHTML = `<div style="font-size:12px;color:var(--muted);text-align:center;padding:20px 0;line-height:1.6;">Hali saqlangan chat yo'q.<br>Yangi chat boshlang!</div>`;
    return;
  }
  items.innerHTML = chats.map(c => `
    <div class="history-item ${c.id === currentChatId ? 'active' : ''}"
      id="hi_${c.id}"
      onclick="loadChat('${c.id}')"
      oncontextmenu="showCtx(event,'${c.id}')"
      ontouchstart="startLongPress(event,'${c.id}')"
      ontouchend="cancelLongPress()"
      ontouchmove="cancelLongPress()"
    >
      <div class="history-icon">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6c47ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div class="history-text">
        <div class="history-title">${escHtml(c.title || 'Chat')}</div>
        <div class="history-time">${timeAgo(c.updatedAt)}</div>
      </div>
      <button class="history-del" onclick="event.stopPropagation();deleteChat('${c.id}')" title="O'chirish">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');
}

function loadChat(id){
  const chats = getChats();
  const c = chats.find(x => x.id === id);
  if(!c) return;

  currentChatId = id;
  messages = c.messages || [{ role:"system", content:"Men Pixo AI yordamchiman." }];

  chat.innerHTML = '';
  const displayMsgs = c.messages.filter(m => m.role !== 'system');
  if(!displayMsgs.length){ showWelcome(); renderHistory(); return; }

  displayMsgs.forEach(m => {
    const div = document.createElement('div');
    div.className = 'msg ' + (m.role === 'user' ? 'user' : 'ai');
    if(m.role === 'assistant'){
      const label = document.createElement('div');
      label.className = 'msg-label';
      label.textContent = 'Pixo AI';
      div.appendChild(label);
    }
    const content = document.createElement('div');
    content.textContent = m.content;
    div.appendChild(content);
    if(m.role === 'assistant'){
      const copy = document.createElement('button');
      copy.className = 'copy';
      const txt = m.content;
      copy.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Nusxalash`;
      copy.onclick = () => {
        navigator.clipboard.writeText(txt);
        copy.textContent = '✅ Nusxalandi';
        setTimeout(() => {
          copy.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Nusxalash`;
        }, 1500);
      };
      div.appendChild(copy);
    }
    chat.appendChild(div);
  });

  chat.scrollTop = chat.scrollHeight;
  renderHistory();
  closeMenu();
}

function deleteChat(id){
  hideCtx();
  let chats = getChats();
  chats = chats.filter(c => c.id !== id);
  saveChats(chats);
  if(currentChatId === id){
    currentChatId = null;
    messages = [{ role:"system", content:"Men Pixo AI yordamchiman." }];
    showWelcome();
  }
  renderHistory();
}

function clearAllChats(){
  if(!confirm("Barcha chatlarni o'chirishni xohlaysizmi?")) return;
  localStorage.removeItem('pixo_chats');
  currentChatId = null;
  messages = [{ role:"system", content:"Men Pixo AI yordamchiman." }];
  showWelcome();
  renderHistory();
  closeMenu();
}

/* ═══════════════════════════════
   CONTEXT MENU
═══════════════════════════════ */
function showCtx(e, id){
  e.preventDefault();
  ctxTargetId = id;
  const x = Math.min(e.clientX, window.innerWidth - 165);
  const y = Math.min(e.clientY, window.innerHeight - 110);
  ctxMenu.style.left = x + 'px';
  ctxMenu.style.top  = y + 'px';
  ctxMenu.style.display = 'block';
}

function hideCtx(){
  ctxMenu.style.display = 'none';
  ctxTargetId = null;
}

document.getElementById('ctxDelete').addEventListener('click', () => {
  if(ctxTargetId) deleteChat(ctxTargetId);
});

document.getElementById('ctxRename').addEventListener('click', () => {
  if(!ctxTargetId){ hideCtx(); return; }
  const chats = getChats();
  const c = chats.find(x => x.id === ctxTargetId);
  if(!c){ hideCtx(); return; }
  const newName = prompt("Yangi nom:", c.title || 'Chat');
  if(newName && newName.trim()){
    c.title = newName.trim();
    saveChats(chats);
    renderHistory();
  }
  hideCtx();
});

document.addEventListener('click', e => {
  if(!ctxMenu.contains(e.target)) hideCtx();
});

function startLongPress(e, id){
  cancelLongPress();
  longPressTimer = setTimeout(() => {
    const touch = e.touches[0];
    showCtx({ preventDefault:()=>{}, clientX: touch.clientX, clientY: touch.clientY }, id);
  }, 600);
}

function cancelLongPress(){
  if(longPressTimer){ clearTimeout(longPressTimer); longPressTimer = null; }
}

/* ═══════════════════════════════
   NEW CHAT
═══════════════════════════════ */
function newChat(){
  // Kill any running typewriter ← NEW
  if (activeTypewriter !== null) {
    clearInterval(activeTypewriter);
    activeTypewriter = null;
  }

  currentChatId = null;
  messages = [{ role:"system", content:"Men Xojiakbar tomonidan yasalgan Pixo AI nomli o'zbek tilida gaplashadigan sun'iy intellekt yordamchiman. Doim foydali va aniq javob beraman." }];
  const msgs = chat.querySelectorAll(".msg");
  msgs.forEach((m, i) => {
    setTimeout(() => {
      m.style.opacity = "0";
      m.style.transform = "translateY(8px)";
      m.style.transition = "0.18s";
      setTimeout(() => m.remove(), 180);
    }, i * 20);
  });
  setTimeout(() => showWelcome(), msgs.length * 20 + 220);
  removeImage();
  closeMenu();
  renderHistory();
}

function showWelcome(){
  if(document.getElementById('welcomeScreen')) return;
  chat.innerHTML = '';
  const w = document.createElement('div');
  w.className = 'welcome';
  w.id = 'welcomeScreen';
  w.innerHTML = `
    <div class="welcome-icon">✦</div>
    <h2>Pixo AI</h2>
    <p>Savol bering, rasm yuboring yoki mikrofon orqali gaplashing</p>
  `;
  chat.appendChild(w);
}

/* ═══════════════════════════════
   UTILS
═══════════════════════════════ */
function escHtml(t){
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function timeAgo(ts){
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if(m < 1)  return 'Hozirgina';
  if(m < 60) return m + ' daq oldin';
  if(h < 24) return h + ' soat oldin';
  if(d < 7)  return d + ' kun oldin';
  return new Date(ts).toLocaleDateString('uz');
}

window.addEventListener('resize', () => {
  setTimeout(() => { scrollIfNeeded(); }, 100); // ← use scrollIfNeeded, not force-scroll
});

// Init
renderHistory();