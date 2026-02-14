const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. تساقط الأهلة
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
setInterval(createCrescent, 700);

// 2. التحكم بالصوت
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

// 3. عرض الأسماء (تهنئة رمضان بالاسم)
function sanitizeName(name) {
    return name.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

function updateDisplay() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const fromToText = document.getElementById("fromToText");
    const nameCircle = document.getElementById("nameInCircle");
    const viralHint = document.getElementById("viralHint");

    if (fromName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        fromToText.textContent = `من ${cleanFrom} إلى أنت`;
        nameCircle.textContent = "🌙 رمضان كريم 🌙";
        viralHint.textContent = "🔥 أرسلها الآن لشخص آخر!";
    } else {
        fromToText.textContent = "تهنئة رمضان خاصة لك";
        nameCircle.textContent = "🌙 رمضان كريم 🌙";
        viralHint.textContent = "اكتب اسم صديقك بالأسفل 👇";
    }
}

window.onload = updateDisplay;

// 4. السيطرة على واتساب وجوجل
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    let newTo = input.value.trim();
    if (!newTo) { alert("يرجى كتابة اسم الشخص"); return; }

    const cleanNewTo = sanitizeName(newTo);
    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanNewTo)}`;
    
    // رسالة غنية بكلمات البحث (SEO)
    const message = `🌙 تهنئة رمضان 2026 خاصة باسمك!\nوصلتك تبريكات رمضان من أحد المحبين، شاهدها وصمم تهنئة رمضان بالاسم من هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
