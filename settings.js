// ================= ELEMENTLAR =================
const planText = document.getElementById("planText");
const remainingText = document.getElementById("remainingText");
const usedText = document.getElementById("usedText");
const endDateText = document.getElementById("endDateText");


// ================= USER =================
const username = localStorage.getItem("username");
const type = localStorage.getItem("premiumType");
const end = localStorage.getItem("premiumEnd");

// ❌ login yo‘q
if (!username) {
    window.location.href = "login.html";
}


// ================= PREMIUM =================
if (type === "lifetime") {

    planText.textContent = "👑 Cheksiz Premium";
    remainingText.textContent = "♾ Cheksiz";
    endDateText.textContent = "Tugamaydi";

}


// ================= VAQTLI PREMIUM =================
else if (type === "timed" && end) {

    planText.textContent = "⏳ Vaqtli Premium";

    const endTime = Number(end); // login.js allaqachon number qilib saqlaydi

    function updateCountdown() {

        const now = Date.now();
        const diff = endTime - now;

        // ❌ tugadi
        if (diff <= 0) {
            alert("⛔ Premium muddati tugadi!");

            localStorage.clear();
            window.location.href = "login.html";
            return;
        }

        // 🔥 ANIQ HISOB
        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        remainingText.textContent =
            `${days} kun ${hours} soat ${minutes} daqiqa ${seconds} soniya`;

        // 📅 TO‘G‘RI FORMAT (timezone muammo yo‘q)
        const date = new Date(endTime);
        endDateText.textContent =
            date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// ================= PREMIUM YO‘Q =================
else {

    planText.textContent = "❌ Premium mavjud emas";
    remainingText.textContent = "-";
    endDateText.textContent = "-";

    setTimeout(() => {
        localStorage.clear();
        window.location.href = "login.html";
    }, 1500);
}


// ================= FOYDALANISH =================
let used = Number(localStorage.getItem("used") || 0);
usedText.textContent = used + " marta foydalanilgan";