  const KEYS = {
    username: 'prof_username',
    fullname: 'prof_fullname',
    phone:    'prof_phone',
    email:    'prof_email',
    job:      'prof_job',
    avatar:   'prof_avatar'
  };

  const defaultSVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23141929'/%3E%3Ccircle cx='60' cy='46' r='24' fill='%231e2640'/%3E%3Cellipse cx='60' cy='104' rx='40' ry='30' fill='%231e2640'/%3E%3C/svg%3E";

  function loadProfile() {
    const u = localStorage.getItem(KEYS.username) || '';
    const f = localStorage.getItem(KEYS.fullname) || '';
    const p = localStorage.getItem(KEYS.phone)    || '';
    const e = localStorage.getItem(KEYS.email)    || '';
    const j = localStorage.getItem(KEYS.job)      || '';
    const a = localStorage.getItem(KEYS.avatar)   || '';

    setVal('dispUsername', u);
    setVal('dispFullname', f);
    setVal('dispPhone', p);
    setVal('dispEmail', e);
    setVal('dispJob', j);

    document.getElementById('dispNameHeader').textContent = f || 'Foydalanuvchi';
    document.getElementById('dispJobHeader').textContent  = j || 'Kasb kiritilmagan';
    document.getElementById('avatarImg').src = a || defaultSVG;

    const btn = document.getElementById('btnRemoveImg');
    if (a) btn.classList.add('visible');
    else   btn.classList.remove('visible');
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (val) { el.textContent = val; el.classList.remove('empty'); }
    else      { el.textContent = 'Kiritilmagan'; el.classList.add('empty'); }
  }

  function openModal() {
    document.getElementById('inpUsername').value = localStorage.getItem(KEYS.username) || '';
    document.getElementById('inpFullname').value = localStorage.getItem(KEYS.fullname) || '';
    document.getElementById('inpPhone').value    = localStorage.getItem(KEYS.phone)    || '';
    document.getElementById('inpEmail').value    = localStorage.getItem(KEYS.email)    || '';
    document.getElementById('inpJob').value      = localStorage.getItem(KEYS.job)      || '';
    document.getElementById('modalBg').classList.add('open');
  }

  function closeModal() { document.getElementById('modalBg').classList.remove('open'); }

  function saveProfile() {
    localStorage.setItem(KEYS.username, document.getElementById('inpUsername').value.trim());
    localStorage.setItem(KEYS.fullname, document.getElementById('inpFullname').value.trim());
    localStorage.setItem(KEYS.phone,    document.getElementById('inpPhone').value.trim());
    localStorage.setItem(KEYS.email,    document.getElementById('inpEmail').value.trim());
    localStorage.setItem(KEYS.job,      document.getElementById('inpJob').value.trim());
    loadProfile();
    closeModal();
    showToast('Ma\'lumotlar saqlandi!', 'success');
  }

  function changeAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      localStorage.setItem(KEYS.avatar, ev.target.result);
      loadProfile();
      showToast('Rasm yangilandi!', 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function confirmRemove() { document.getElementById('confirmBg').classList.add('open'); }
  function closeConfirm()  { document.getElementById('confirmBg').classList.remove('open'); }

  function removeAvatar() {
    localStorage.removeItem(KEYS.avatar);
    loadProfile();
    closeConfirm();
    showToast('Rasm o\'chirildi!', 'removed');
  }

  function showToast(msg, type) {
    const t   = document.getElementById('toast');
    const ico = document.getElementById('toastIcon');
    document.getElementById('toastMsg').textContent = msg;
    t.className = 'toast ' + type;

    ico.innerHTML = type === 'removed'
      ? '<polyline points="3 6 5 6 21 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6L18.1245 19.1338C18.0544 20.1818 17.1818 21 16.1311 21H7.86891C6.81824 21 5.94561 20.1818 5.87554 19.1338L5 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01L9 11.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';

    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  document.getElementById('modalBg').addEventListener('click',   e => { if (e.target === document.getElementById('modalBg'))   closeModal(); });
  document.getElementById('confirmBg').addEventListener('click', e => { if (e.target === document.getElementById('confirmBg')) closeConfirm(); });

  loadProfile();
  
  
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