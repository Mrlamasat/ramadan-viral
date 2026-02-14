const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. تساقط الأهلة تلقائياً
function createCrescent() {
    const container = document.getElementById('crescent-container');
    const crescent = document.createElement('div');
    crescent.classList.add('crescent');
    crescent.innerText = '🌙';
    
    const startPos = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 5;
    const size = Math.random() * 20 + 10;
    
    crescent.style.left = startPos + 'px';
    crescent.style.animationDuration = duration + 's';
    crescent.style.fontSize = size + 'px';
    
    container.appendChild(crescent);
    setTimeout(() => { crescent.remove(); }, duration * 1000);
}

// بدء تساقط الأهلة فوراً
setInterval(createCrescent, 600);

// 2. التحكم في الصوت
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "🔇";
    }
}

musicBtn.addEventListener("click", toggleMusic);

// محاولة تشغيل الصوت تلقائياً عند تحميل الصفحة
window.addEventListener('load', () => {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicIcon.textContent = "🔊";
        }).catch(() => {
            musicIcon.textContent = "🔇";
        });
    }
});

// تشغيل الصوت عند أول نقرة للمستخدم في أي مكان (لضمان التشغيل)
document.body.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊";
    }
}, { once: true });

// --- كود الوظائف الأصلية ---

function sanitizeName(name) {
    return name.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

function adjustFontSize(element, maxFont = 1.2, minFont = 0.4) {
    const parent = element.parentElement;
    if (!parent) return;
    let fontSize = maxFont;
    element.style.fontSize = fontSize + "em";
    while ((element.scrollHeight > parent.clientHeight * 0.95) && fontSize > minFont) {
        fontSize -= 0.02;
        element.style.fontSize = fontSize + "em";
    }
}

document.getElementById("createBtn").addEventListener("click", () => {
    const input = document.getElementById("userName");
    const fromToText = document.getElementById("fromToText");
    const nameCircle = document.getElementById("nameInCircle");
    const viralHint = document.getElementById("viralHint");

    let newTo = input.value.trim();
    if (!newTo) {
        alert("اكتب اسم الشخص الذي تريد تهنئته");
        return;
    }

    newTo = sanitizeName(newTo);
    const params = new URLSearchParams(window.location.search);
    const currentTo = params.get("from");
    const newFrom = currentTo ? sanitizeName(currentTo) : "شخص-يحبك";

    fromToText.textContent = `من ${newFrom.replace(/-/g,' ')} إلى ${newTo.replace(/-/g,' ')}`;
    nameCircle.textContent = "🌙 رمضان كريم 🌙";
    viralHint.textContent = "🎁 اكتب اسم شخص آخر وواصل السلسلة!";

    adjustFontSize(fromToText);
    adjustFontSize(nameCircle);

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(newTo)}`;
    const message = `🚨 وصلك تهنئة رمضان خاصة!\nمن ${newFrom.replace(/-/g,' ')} إلى ${newTo.replace(/-/g,' ')} 🌙\nاضغط وشوفها 👇\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
