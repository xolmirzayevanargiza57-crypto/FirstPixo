// ================= KONFIG =================
const BASE_MONTHLY     = 35000;
const DISCOUNT_PERCENT = { 1: 0, 3: 1, 6: 2, 12: 3 };

const plansMeta = [
    { months: 1,  popular: false },
    { months: 3,  popular: true  },
    { months: 6,  popular: false },
    { months: 12, popular: false }
];

let currentPlan = { months: 1, totalPrice: BASE_MONTHLY, perMonth: BASE_MONTHLY };


// ================= FORMAT =================
function formatUZS(value) {
    return Math.round(value).toLocaleString('uz-UZ') + " so'm";
}

function calculatePrice(months) {
    const discount = DISCOUNT_PERCENT[months] || 0;
    const total    = Math.round(BASE_MONTHLY * months * (1 - discount / 100));
    const perMonth = Math.round(total / months);
    return { total, perMonth, discountPercent: discount };
}

function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}


// ================= PLANLAR =================
function renderPlans() {
    const container = document.getElementById('planGrid');
    if (!container) return;

    container.innerHTML = '';

    plansMeta.forEach(({ months, popular }) => {
        const { total, perMonth, discountPercent } = calculatePrice(months);

        const card = document.createElement('div');
        card.className = 'plan-card' + (months === currentPlan.months ? ' active' : '');
        card.dataset.months = months;

        if (popular) {
            const badge = document.createElement('span');
            badge.className = 'popular-badge';
            badge.innerText = 'Mashhur';
            card.appendChild(badge);
        }

        card.innerHTML += `
            <div class="plan-months">${months} <span>oy</span></div>
            <div class="price-mo">Oyiga <strong>${formatUZS(perMonth)}</strong></div>
        `;

        if (discountPercent > 0) {
            const save = document.createElement('div');
            save.className = 'save-badge';
            save.innerText = `${discountPercent}% tejash`;
            card.appendChild(save);
        }

        card.addEventListener('click', () => selectPlan(months, total, perMonth));
        container.appendChild(card);
    });
}


// ================= TANLASH =================
function selectPlan(months, totalPrice, perMonthVal) {
    currentPlan = { months, totalPrice, perMonth: perMonthVal };

    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.toggle('active', parseInt(card.dataset.months) === months);
    });

    updateSummary();
}


// ================= SUMMARY =================
function updateSummary() {
    const { months, totalPrice, perMonth } = currentPlan;

    setEl('totalAmount', formatUZS(totalPrice));
    setEl('monthlyCost', formatUZS(perMonth));
    setEl('durationText', `Muddat: ${months} oy`);
    setEl('selectedPlanName', `${months} oylik Premium`);
    setEl('selectedPlanPriceDisplay', formatUZS(totalPrice));
}


// ================= TELEGRAM =================
const BOT_TOKEN = "7675356918:AAF50e176_8TLqOgo50exfQSS4bjij5pHkA";
const CHAT_ID   = "7747756904";

async function sendOrderToTelegram(name, phone, email) {
    const { months, totalPrice, perMonth } = currentPlan;

    const msg =
`⭐️ PREMIUM BUYURTMA
━━━━━━━━━━━━━━━
👤 ${name}
📱 ${phone}
📧 ${email}

📦 ${months} oy
💰 ${formatUZS(perMonth)} / oy
💳 ${formatUZS(totalPrice)}
━━━━━━━━━━━━━━━`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: msg
            })
        });

        return res.ok;
    } catch {
        return false;
    }
}


// ================= PREMIUM SAQLASH =================
function savePremium() {
    const now = Date.now();

    const data = {
        startDate: now,
        endDate: now + currentPlan.months * 30 * 24 * 60 * 60 * 1000
    };

    localStorage.setItem("premiumUser", JSON.stringify(data));
}


// ================= VALIDATSIYA =================
function validate(name, phone, email) {
    if (!name || !phone || !email) return "❗ Barcha maydonlarni to‘ldiring!";
    if (!email.includes('@')) return "❗ Email noto‘g‘ri!";
    if (phone.length < 9) return "❗ Telefon noto‘g‘ri!";
    return null;
}


// ================= SUBMIT =================
async function submitOrderHandler(e) {
    if (e) e.preventDefault();

    const nameEl   = document.getElementById('fullName');
    const phoneEl  = document.getElementById('phoneNumber');
    const emailEl  = document.getElementById('emailAddress');
    const statusEl = document.getElementById('statusMessage');
    const btn      = document.getElementById('orderBtn');

    if (!nameEl || !phoneEl || !emailEl || !statusEl || !btn) return;

    const name  = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const email = emailEl.value.trim();

    const err = validate(name, phone, email);
    if (err) {
        statusEl.className = 'status error';
        statusEl.innerText = err;
        statusEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.innerText = "⏳ Yuborilmoqda...";
    statusEl.style.display = 'none';

    const success = await sendOrderToTelegram(name, phone, email);

    if (success) {
        savePremium();

        statusEl.className = 'status success';
        statusEl.innerText = "✅ Ma'lumotlaringiz muvafaqiyyatli yuborildi! Tez orada siz bilan bog‘lanamiz!";
        statusEl.style.display = 'block';

        // 🔥 login sahifaga qaytaramiz
        setTimeout(() => {
            localStorage.removeItem("username");
            window.location.href = "login.html";
        }, 1500);

    } else {
        statusEl.className = 'status error';
        statusEl.innerText = "⚠️ Xatolik! Internetni tekshiring.";
        statusEl.style.display = 'block';
    }

    btn.disabled = false;
    btn.innerText = "Sotib olish";
}


// ================= INIT =================
function init() {
    const initial = calculatePrice(1);
    currentPlan = {
        months: 1,
        totalPrice: initial.total,
        perMonth: initial.perMonth
    };

    renderPlans();
    updateSummary();

    const btn = document.getElementById('orderBtn');
    if (btn) {
        const clone = btn.cloneNode(true);
        btn.replaceWith(clone);
        clone.addEventListener('click', submitOrderHandler);
    }
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();