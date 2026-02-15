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
        // تغيير العنوان لـ SEO
        document.title = `تهنئة رمضان 2026 من ${cleanFrom} إلى ${cleanTo}`;
    } else {
        fromText.textContent = "تهنئة رمضان خاصة";
        toNameGlow.textContent = "لك ولأحبابك";
    }

    // عداد الزيارات
    const startValue = 144250;
    let currentVisits = localStorage.getItem('visitCount') || startValue;
    currentVisits = parseInt(currentVisits) + 1;
    localStorage.setItem('visitCount', currentVisits);
    document.getElementById('count').innerText = currentVisits.toLocaleString();
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
