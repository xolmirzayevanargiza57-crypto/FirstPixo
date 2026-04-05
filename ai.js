    /* ══════════════════════════════
       NAVIGATION JS — animatsiyasiz
    ══════════════════════════════ */
    const lists     = document.querySelectorAll('#navList .list');
    const indicator = document.getElementById('indicator');

    function moveIndicator(li) {
      const navRect = li.parentElement.getBoundingClientRect();
      const liRect  = li.getBoundingClientRect();
      const indW    = indicator.offsetWidth;
      const centerX = (liRect.left - navRect.left) + (liRect.width / 2) - (indW / 2);
      indicator.style.left = centerX + 'px';
    }

    function setActive(li) {
      lists.forEach(l => l.classList.remove('active'));
      li.classList.add('active');
      moveIndicator(li);
    }

    function initIndicator() {
      const active = document.querySelector('#navList .list.active');
      if (active) moveIndicator(active);
    }

    window.addEventListener('load',   () => setTimeout(initIndicator, 50));
    window.addEventListener('resize', () => setTimeout(initIndicator, 20));


    /* ══════════════════════════════
       TRANSACTION JS
    ══════════════════════════════ */
    const _k   = ['gsk_PdZxr23PjP1xcY4Lar2L', 'WGdyb3FYTT5hvIiaN', 'ZNtEqUTbCNumlwu'].join('');
    const MODEL = 'llama-3.3-70b-versatile';

    let records = JSON.parse(localStorage.getItem('pixo_records') || '[]');

    const fmt = n => Number(n).toLocaleString('uz-UZ') + " so'm";

    function showToast(msg, color = 'var(--green)') {
      const t = document.getElementById('toast');
      t.textContent  = msg;
      t.style.borderColor = color;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2500);
    }

    function save() {
      localStorage.setItem('pixo_records', JSON.stringify(records));
    }

    function render() {
      const list = document.getElementById('historyList');
      list.innerHTML = '';
      let totalIn = 0, totalOut = 0;

      records.forEach((r, i) => {
        const isPos = r.type === 'Daromad' || r.type === 'Qarz';
        if (isPos) totalIn  += r.amount;
        else       totalOut += r.amount;

        const iconClass = r.type === 'Daromad'
          ? 'income'
          : r.type === 'Qarz' ? 'debt-in' : 'debt-out';

        const iconSvg = r.type === 'Daromad'
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`
          : r.type === 'Qarz'
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.2"><path d="M12 19V5M19 12l-7-7-7 7"/></svg>`;

        const li = document.createElement('li');
        li.innerHTML = `
          <div class="li-icon ${iconClass}">${iconSvg}</div>
          <div class="li-info">
            <div class="li-type">${r.type}</div>
            <div class="li-note">${r.note || '—'}</div>
          </div>
          <div class="li-amount ${isPos ? 'pos' : 'neg'}">${isPos ? '+' : '−'}${fmt(r.amount)}</div>
          <button class="li-delete" onclick="deleteRecord(${i})" title="O'chirish">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        `;
        list.appendChild(li);
      });

      const balance = totalIn - totalOut;
      const balEl   = document.getElementById('balance');
      balEl.textContent = fmt(balance);
      balEl.style.color = balance >= 0 ? 'var(--green)' : 'var(--red)';
      document.getElementById('totalIncome').textContent  = fmt(totalIn);
      document.getElementById('totalExpense').textContent = fmt(totalOut);
    }

    function addRecord() {
      const type   = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const note   = document.getElementById('note').value.trim();

      if (!amount || amount <= 0) {
        showToast('❗ Summa kiriting!', 'var(--red)');
        return;
      }

      records.unshift({ type, amount, note, date: new Date().toLocaleString('uz-UZ') });
      save();
      render();
      document.getElementById('amount').value = '';
      document.getElementById('note').value   = '';
      showToast('✅ Saqlandi!');
    }

    function deleteRecord(i) {
      records.splice(i, 1);
      save();
      render();
      showToast("🗑 O'chirildi", 'var(--red)');
    }

    function clearHistory() {
      if (!records.length) { showToast("Tarix bo'sh", 'var(--muted)'); return; }
      if (confirm("Barcha tarixni o'chirasizmi?")) {
        records = [];
        save();
        render();
        showToast('🗑 Tarix tozalandi', 'var(--red)');
      }
    }

    async function getAdvice() {
      const el = document.getElementById('aiText');

      if (!records.length) {
        el.textContent = "Hali hech qanday yozuv yo'q. Biror narsa qo'shing! 📝";
        return;
      }

      el.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`;

      const totalIn  = records
        .filter(r => r.type === 'Daromad' || r.type === 'Qarz')
        .reduce((a, r) => a + r.amount, 0);
      const totalOut = records
        .filter(r => r.type === 'Berilgan qarz')
        .reduce((a, r) => a + r.amount, 0);
      const balance  = totalIn - totalOut;

      const prompt = `Siz moliyaviy maslahatchisiniz. Foydalanuvchining ma'lumotlari:
- Jami daromad: ${fmt(totalIn)}
- Jami chiqim: ${fmt(totalOut)}
- Joriy balans: ${fmt(balance)}
- Yozuvlar soni: ${records.length}

Qisqa (3-4 gap), amaliy va iliq uslubda moliyaviy tavsiya bering. Faqat o'zbek tilida javob bering.`;

      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${_k}`
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 400,
            temperature: 0.7
          })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          el.textContent = `⚠️ ${err?.error?.message || 'Xatolik yuz berdi'}`;
          return;
        }

        const data = await res.json();
        el.textContent = data.choices?.[0]?.message?.content || 'Javob kelmadi.';
      } catch {
        el.textContent = '⚠️ Tarmoq xatoligi. Internetni tekshiring.';
      }
    }

    /* ── INIT ── */
    render();