const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. تساقط الأهلة
function createCrescent() {
    const crescent = document.createElement('div');
    crescent.style.position = 'absolute';
    crescent.style.color = '#f5e6d1';
    crescent.innerText = '🌙';
    crescent.style.left = Math.random() * window.innerWidth + 'px';
    crescent.style.top = '-50px';
    crescent.style.fontSize = (Math.random() * 20 + 10) + 'px';
    crescent.style.transition = 'transform 6s linear, opacity 6s';
    document.body.appendChild(crescent);
    
    setTimeout(() => {
        crescent.style.transform = `translateY(${window.innerHeight + 100}px) rotate(360deg)`;
        crescent.style.opacity = '0';
    }, 100);
    setTimeout(() => crescent.remove(), 7000);
}
setInterval(createCrescent, 800);

// 2. التحكم بالصوت
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

// 3. تحديث عرض الأسماء
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
    if (!newTo) { alert("يرجى كتابة الاسم"); return; }

    // المستلم الحالي يصبح هو المرسل في الرابط الجديد
    const currentReceiver = params.get("to") || "محب-لك";
    const cleanFrom = currentReceiver.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    const message = `🌙 تهنئة رمضان 2026 خاصة!\nمني أنا ${currentReceiver.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
