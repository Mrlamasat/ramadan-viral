const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. الأهلة
function createCrescent() {
    const crescent = document.createElement('div');
    crescent.classList.add('crescent');
    crescent.innerText = '🌙';
    crescent.style.left = Math.random() * window.innerWidth + 'px';
    crescent.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(crescent);
    setTimeout(() => crescent.remove(), 10000);
}
setInterval(createCrescent, 700);

// 2. الصوت
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊 إيقاف الصوت";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "   🔇 تشغيل الأجواء الرمضانية";
    }
}
musicBtn.addEventListener("click", toggleMusic);

// 3. عرض النص المعدل
function updateDisplay() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    const fromText = document.getElementById("fromText");
    const toNameGlow = document.getElementById("toNameGlow");

    if (fromName && toName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        const cleanTo = toName.replace(/-/g, ' ');
        // التعديل المطلوب: مني أنا [المرسل] إلى
        fromText.textContent = `مني أنا ${cleanFrom} إلى`;
        toNameGlow.textContent = cleanTo;
    } else {
        fromText.textContent = "تهنئة رمضان خاصة";
        toNameGlow.textContent = "لك ولأحبابك";
    }
}
window.onload = updateDisplay;

// 4. المشاركة
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const params = new URLSearchParams(window.location.search);
    let newTo = input.value.trim();
    if (!newTo) { alert("اكتب اسم الشخص"); return; }

    const currentTo = params.get("to") || "محب-لك";
    const cleanFrom = currentTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    const message = `🌙 تهنئة رمضان 2026 خاصة!\nمني أنا ${currentTo.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
