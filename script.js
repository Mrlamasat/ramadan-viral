// --- إعدادات الصوت ---
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => console.log("تفاعل مع الصفحة لتشغيل الصوت"));
        musicIcon.textContent = "🔊 إيقاف الصوت";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "👈 اضغط لتشغيل أجواء رمضان 🌙";
    }
}
if (musicBtn) musicBtn.addEventListener("click", toggleMusic);

// --- العداد الوهمي العالمي (يزداد دائمًا) ---
const countElement = document.getElementById('count');
const startDate = new Date(2026, 1, 1).getTime(); // 1 فبراير 2026
const baseCount = 144250; // رقم البداية
const incrementPerSecond = 3; // عدد الزيادات لكل ثانية

function updateCounter() {
    const now = new Date().getTime();
    const secondsPassed = Math.floor((now - startDate) / 1000);
    const totalCount = baseCount + (secondsPassed * incrementPerSecond);
    countElement.innerText = totalCount.toLocaleString();
}

setInterval(updateCounter, 1000);
updateCounter(); // عرض الرقم مباشرة عند التحميل

// --- تهيئة الصفحة والأسماء ---
function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    const fromText = document.getElementById("fromText");
    const nameInCircle = document.getElementById("nameInCircle");

    if (toName) {
        const cleanTo = toName.replace(/-/g, ' ');
        nameInCircle.textContent = `🌙 ${cleanTo} 🌙`;
        document.title = `تهنئة خاصة إلى ${cleanTo} 🌙`;
    } else {
        nameInCircle.textContent = "🌙 رمضان كريم 🌙";
    }

    if (fromName && fromText) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        fromText.textContent = `مني أنا ${cleanFrom} إلى`;
    }
}
window.onload = initializePage;

// --- إنشاء رابط المشاركة عبر واتساب ---
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const params = new URLSearchParams(window.location.search);
    
    let newTo = input.value.trim();
    if (!newTo) { 
        alert("لطفاً، اكتب اسم الشخص الذي تريد تهنئته"); 
        return; 
    }

    let currentSender = params.get("to") || "محب"; 
    
    const cleanFrom = currentSender.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    const message = `🌙 تهنئة رمضان خاصة!\nمني أنا ${currentSender.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});

// --- تأثير تساقط الأهلة ---
function createCrescent() {
    const container = document.getElementById('crescent-container');
    if (!container) return;
    const crescent = document.createElement('div');
    crescent.className = 'crescent';
    crescent.innerText = '🌙';
    crescent.style.left = Math.random() * window.innerWidth + 'px';
    const duration = Math.random() * 3 + 4;
    crescent.style.animation = `fall ${duration}s linear forwards`;
    container.appendChild(crescent);
    setTimeout(() => crescent.remove(), duration * 1000);
}
setInterval(createCrescent, 700);
