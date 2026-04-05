// ================= LOGIN + PREMIUM TEKSHIRUV =================
window.addEventListener("load", () => {

    const username = localStorage.getItem("username");
    const type     = localStorage.getItem("premiumType");
    const end      = localStorage.getItem("premiumEnd");

    // ❌ login yo‘q
    if (!username) {
        window.location.href = "login.html";
        return;
    }

    // ⏳ vaqtli premium
    if (type === "timed" && end) {
        const endTime = Number(end);

        if (Date.now() > endTime) {
            alert("⛔ Premium muddati tugagan!");
            localStorage.clear();
            window.location.href = "login.html";
            return;
        }
    }

    // ❌ premium yo‘q
    if (!type) {
        alert("❌ Premium mavjud emas!");
        window.location.href = "sotib.html";
        return;
    }
});


// ================= MENU =================
const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");

        const header = document.querySelector('.header');
        if (header) {
            const rect = header.getBoundingClientRect();
            menu.style.top = (rect.bottom + 8) + 'px';
        }
    });

    window.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.remove("active");
        }
    });
}


// ================= PRELOADER =================
window.addEventListener("load", () => {

    const line = document.querySelector(".loader-line");
    const preloader = document.getElementById("preloader");
    const page = document.getElementById("page");

    if (!line || !preloader || !page) return;

    page.classList.add("loading");

    setTimeout(() => {
        line.style.width = "100%";
        line.style.transition = "width 2s ease";
    }, 100);

    setTimeout(() => {
        preloader.style.opacity = "0";
    }, 2100);

    setTimeout(() => {
        preloader.style.display = "none";
        page.classList.remove("loading");
    }, 2700);
});


// ================= LOGOUT =================
const logoutLink = document.querySelector(".logout-link");

if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (confirm("Pixo tizimidan chiqmoqchimisiz?🤔")) {
            localStorage.clear();
            window.location.href = "login.html";
        }
    });
}


// ================= NAVIGATION =================
const lists = document.querySelectorAll('.navigation ul .list');
const indicator = document.querySelector('.indicator');

function moveIndicator(el) {
    if (!indicator) return;

    const navRect = el.parentElement.getBoundingClientRect();
    const liRect = el.getBoundingClientRect();

    const centerX =
        liRect.left - navRect.left +
        (liRect.width / 2) -
        (indicator.offsetWidth / 2);

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
    const active = document.querySelector(".navigation .list.active");
    if (active) moveIndicator(active);
});

window.addEventListener("resize", () => {
    const active = document.querySelector(".navigation .list.active");
    if (active) moveIndicator(active);
});


// ================= USERNAME + TYPING =================
const usernameText = localStorage.getItem("username") || "Foydalanuvchi";

const words = [`${usernameText} sizni ko‘rganimdan xursandman 😀`];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 70 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200;
        isDeleting = false;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ================= REALTIME PREMIUM CHECK =================
setInterval(() => {

    const type = localStorage.getItem("premiumType");
    const end  = localStorage.getItem("premiumEnd");

    if (type === "timed" && end) {
        const endTime = Number(end);

        if (Date.now() > endTime) {
            alert("⛔ Premium muddati tugadi!");
            localStorage.clear();
            window.location.href = "login.html";
        }
    }

}, 3000);


// ================= BLOKLASH =================
document.addEventListener('keydown', function(e) {
    if (
        (e.ctrlKey && ['c','v','x','u','s','a'].includes(e.key.toLowerCase())) ||
        e.key === 'F12'
    ) {
        e.preventDefault();
    }
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});