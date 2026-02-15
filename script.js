const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// إصلاح مشغل الصوت
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicIcon.textContent = "🔊 إيقاف الصوت";
        }).catch(err => {
            console.error("خطأ في تشغيل الصوت:", err);
        });
    } else {
        bgMusic.pause();
        musicIcon.textContent = "🔇 تشغيل الأجواء الرمضانية";
    }
}
musicBtn.addEventListener("click", toggleMusic);

function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    const fromText = document.getElementById("fromText");
    const toNameGlow = document.getElementById("toNameGlow");

    if (fromName && toName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        const cleanTo = toName.replace(/-/g, ' ');
        fromText.textContent = `مني أنا ${cleanFrom} إلى`;
        toNameGlow.textContent = cleanTo;
        document.title = `تهنئة رمضان 2026 من ${cleanFrom} إلى ${cleanTo}`;
    } else {
        fromText.textContent = "تهنئة رمضان خاصة";
        toNameGlow.textContent = "لك ولأحبابك";
    }

    // --- نظام العداد المطور ---
    const startValue = 144250;
    let currentVisits = localStorage.getItem('visitCount');

    // إذا لم يوجد قيمة سابقة أو القيمة المسجلة أقل من رقم البداية، ابدأ من startValue
    if (!currentVisits || parseInt(currentVisits) < startValue) {
        currentVisits = startValue;
    } else {
        currentVisits = parseInt(currentVisits) + 1;
    }

    // حفظ وعرض القيمة فوراً
    localStorage.setItem('visitCount', currentVisits);
    const countDisplay = document.getElementById('count');
    countDisplay.innerText = currentVisits.toLocaleString();

    // جعل العداد "ينبض" بالحياة (يزيد عشوائياً كل بضع ثوانٍ أمام الزائر)
    setInterval(() => {
        let randomPlus = Math.floor(Math.random() * 3) + 1; // زيادة بـ 1 أو 2 أو 3
        currentVisits = parseInt(currentVisits) + randomPlus;
        countDisplay.innerText = currentVisits.toLocaleString();
        localStorage.setItem('visitCount', currentVisits);
    }, 3500); // يتحدث كل 3.5 ثانية
}

window.onload = initializePage;

document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    let newTo = input.value.trim();
    if (!newTo) { alert("اكتب اسم الشخص الذي تريد تهنئته"); return; }

    const params = new URLSearchParams(window.location.search);
    let currentSender = params.get("to") || "محب"; 
    
    const cleanFrom = currentSender.replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/\s+/g, '-');

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    const message = `🌙 تهنئة رمضان خاصة!\nمني أنا ${currentSender.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});

function createCrescent() {
    const container = document.getElementById('crescent-container');
    if (!container) return;
    const crescent = document.createElement('div');
    crescent.className = 'crescent';
    crescent.innerText = '🌙';
    crescent.style.left = Math.random() * 360 + 'px';
    const duration = Math.random() * 3 + 4;
    crescent.style.animation = `fall ${duration}s linear forwards`;
    container.appendChild(crescent);
    setTimeout(() => crescent.remove(), duration * 1000);
}
setInterval(createCrescent, 700);
