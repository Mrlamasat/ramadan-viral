const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. تساقط الأهلة المستمر (يعمل تلقائياً)
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

// 2. إدارة الصوت
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊 إيقاف الأجواء";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "🔇 تشغيل الأجواء الرمضانية";
    }
}
musicBtn.addEventListener("click", toggleMusic);

// محاولة التشغيل عند أول نقرة في الصفحة لضمان عمل الصوت
document.body.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => musicIcon.textContent = "🔊 إيقاف الأجواء");
    }
}, { once: true });

// 3. عرض الأسماء من الرابط (SEO & Personalization)
function sanitizeName(name) {
    return name.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

function updateDisplay() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    const fromToText = document.getElementById("fromToText");

    if (fromName && toName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        const cleanTo = toName.replace(/-/g, ' ');
        fromToText.textContent = `من ${cleanFrom} إلى ${cleanTo}`;
    } else {
        fromToText.textContent = "تهنئة رمضان خاصة لك";
    }
}

window.onload = updateDisplay;

// 4. إنشاء التهنئة الجديدة والمشاركة
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const params = new URLSearchParams(window.location.search);
    
    let newTo = input.value.trim();
    if (!newTo) { alert("يرجى كتابة اسم الشخص"); return; }

    // الشخص المستلم حالياً يصبح هو المرسل للشخص الجديد
    const currentReceiver = params.get("to") || "محب-لك";
    const cleanFrom = sanitizeName(currentReceiver);
    const cleanTo = sanitizeName(newTo);

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    
    // رسالة واتساب قوية للـ SEO والانتشار
    const message = `🌙 تهنئة رمضان 2026 خاصة باسمك!\nمن ${currentReceiver.replace(/-/g,' ')} إلى ${newTo}\nشاهدها وصمم تهنئتك الخاصة من هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
