 let html5QrCode = null;
  let cameraActive = false;

  function setStatus(type, msg) {
    const bar = document.getElementById('status-bar');
    const txt = document.getElementById('status-text');
    bar.className = 'status-bar ' + type;
    txt.textContent = msg;
  }

  function isURL(str) {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch { return false; }
  }

  function triggerSuccessFlash() {
    const el = document.getElementById('success-flash');
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
  }

  function onScanSuccess(decodedText) {
    triggerSuccessFlash();
    setStatus('success', 'QR kod topildi!');
    if (isURL(decodedText)) {
      showModal('url', decodedText);
    } else {
      showModal('text', decodedText);
    }
  }

  function showModal(type, content) {
    const overlay = document.getElementById('modal-overlay');
    const icon    = document.getElementById('modal-icon');
    const label   = document.getElementById('modal-label');
    const title   = document.getElementById('modal-title');
    const body    = document.getElementById('modal-content');
    const actions = document.getElementById('modal-actions');

    if (type === 'url') {
      icon.className = 'modal-icon url';
      // SVG Link icon
      icon.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>`;
      label.textContent = 'URL TOPILDI';
      title.textContent = 'Havolani ochish?';
      body.textContent  = content;
      actions.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModalDirect()">Yopish</button>
        <button class="btn btn-primary" onclick="window.open('${escapeAttr(content)}','_blank')">Havolani ochish</button>
      `;
    } else {
      icon.className = 'modal-icon text';
      // SVG Text/Document icon
      icon.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="9" x2="15" y2="9"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="13" y2="17"/>
      </svg>`;
      label.textContent = 'MATN TOPILDI';
      title.textContent = 'Skaner natijasi';
      body.textContent  = content;
      actions.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModalDirect()">Yopish</button>
        <button class="btn btn-primary" onclick="copyText('${escapeAttr(content)}')">Matnni nusxalash</button>
      `;
    }

    overlay.classList.add('visible');
  }

  function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('#modal-actions .btn-primary');
      if (btn) { btn.textContent = 'Nusxalandi ✓'; setTimeout(() => btn.textContent = 'Matnni nusxalash', 1800); }
    });
  }

  function closeModal(e) {
    if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
  }

  function closeModalDirect() {
    document.getElementById('modal-overlay').classList.remove('visible');
    if (cameraActive) setStatus('scanning', 'Skaner qilinmoqda...');
    else setStatus('', 'Tayyor');
  }

  async function toggleCamera() {
    if (cameraActive) {
      await stopCamera();
    } else {
      await startCamera();
    }
  }

  async function startCamera() {
    const btn = document.getElementById('btn-camera');
    btn.disabled = true;
    setStatus('scanning', 'Kamera yoqilmoqda...');

    try {
      if (!html5QrCode) html5QrCode = new Html5Qrcode('reader');

      const config = {
        fps: 15,
        qrbox: { width: 220, height: 220 },
        aspectRatio: 1.0,
        experimentalFeatures: { useBarCodeDetectorIfSupported: true }
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        onScanSuccess
      );

      cameraActive = true;
      document.getElementById('idle-placeholder').classList.add('hidden');
      document.getElementById('scan-overlay').classList.add('active');
      btn.classList.add('active-cam');
      btn.innerHTML = `
        <!-- SVG Stop Camera icon -->
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <rect x="9" y="9" width="6" height="6" rx="1"/>
        </svg>
        Kamerani o'chirish
      `;
      setStatus('scanning', 'Skaner qilinmoqda...');
    } catch (err) {
      setStatus('error', 'Kameraga ruxsat berilmadi yoki mavjud emas');
      document.getElementById('idle-placeholder').classList.remove('hidden');
    }

    btn.disabled = false;
  }

  async function stopCamera() {
    const btn = document.getElementById('btn-camera');
    btn.disabled = true;

    try {
      if (html5QrCode && cameraActive) await html5QrCode.stop();
    } catch (e) {}

    cameraActive = false;
    document.getElementById('idle-placeholder').classList.remove('hidden');
    document.getElementById('scan-overlay').classList.remove('active');
    btn.classList.remove('active-cam');
    btn.innerHTML = `
      <!-- SVG Camera icon -->
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      Kamerani yoqish
    `;
    setStatus('', 'Tayyor');
    btn.disabled = false;
  }


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