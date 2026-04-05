const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("error-msg");

let users = [];


// ================= USERS LOAD =================
async function loadUsers() {
    try {
        const res = await fetch("users.json?nocache=" + Date.now());
        users = await res.json();

    } catch (err) {
        console.error(err);
        errorMsg.textContent = "⚠️ Users yuklanmadi!";
    }
}


// ================= DATE PARSE =================
function parseDate(dateStr) {
    // "20.03.2026 02:20"
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split(".");
    const [hour, minute] = timePart.split(":");

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
    ).getTime();
}


// ================= PREMIUM CHECK =================
function checkPremium(user) {

    const now = Date.now();

    // 👑 CHEKSIZ
    if (user.premium === true) {
        localStorage.setItem("premiumType", "lifetime");
        localStorage.removeItem("premiumEnd");
        return { ok: true };
    }

    // ⏳ VAQTLI
    if (user.premiumEnd) {
        const endTime = parseDate(user.premiumEnd);

        console.log("NOW:", new Date(now));
        console.log("END:", new Date(endTime));

        if (now < endTime) {
            localStorage.setItem("premiumType", "timed");
            localStorage.setItem("premiumEnd", endTime);
            return { ok: true };
        } else {
            return { ok: false, msg: "⛔ Premium muddati tugagan!" };
        }
    }

    // ❌ YO'Q
    return { ok: false, msg: "❌ Sizda premium mavjud emas!" };
}


// ================= AUTO LOGIN =================
window.addEventListener("load", async () => {

    await loadUsers();

    const savedUser = localStorage.getItem("username");

    if (savedUser) {
        const user = users.find(u => u.username === savedUser);

        if (user) {
            const result = checkPremium(user);
            if (result.ok) {
                window.location.href = "dashboard.html";
            } else {
                localStorage.clear();
                alert(result.msg);
                errorMsg.textContent = result.msg;
            }
        } else {
            localStorage.clear();
        }
    }
});


// ================= LOGIN CLICK =================
loginBtn.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // 🔥 ADMIN LOGIN
    if (username === "admin" && password === "1234") {
        window.location.href = "admin.html";
        return;
    }

    if (!username || !password) {
        errorMsg.textContent = "Hamma maydonlarni to'ldiring❗️";
        return;
    }

    errorMsg.textContent = "⏳ Tekshirilmoqda...";

    setTimeout(() => {

        const userExists = users.find(u => u.username === username);
        const passExists = users.find(u => u.password === password);
        const user = users.find(u => u.username === username && u.password === password);

        // ❌ ikkalasi ham xato
        if (!userExists && !passExists) {
            errorMsg.textContent = "❌ Login va Parol xato!";
            setTimeout(() => errorMsg.textContent = "", 2000);
            return;
        }

        // ❌ faqat username xato
        if (!userExists) {
            errorMsg.textContent = "❌ Username noto'g'ri!";
            setTimeout(() => errorMsg.textContent = "", 2000);
            return;
        }

        // ❌ faqat parol xato
        if (!user) {
            errorMsg.textContent = "❌ Parol noto'g'ri!";
            setTimeout(() => errorMsg.textContent = "", 2000);
            return;
        }

        // 🔥 PREMIUM CHECK
        const result = checkPremium(user);
        if (!result.ok) {
            localStorage.clear();
            alert(result.msg);
            errorMsg.textContent = result.msg;
            return;
        }

        // ✅ SUCCESS
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";

    }, 500);
});