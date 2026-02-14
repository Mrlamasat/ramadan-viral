const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. وظيفة تساقط الأهلة (تعمل فوراً)
function createCrescent() {
    const container = document.getElementById('crescent-container');
    if (!container) return;
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
setInterval(createCrescent, 600);

// 2. إدارة تشغيل الصوت
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "   🔇";
    }
}
musicBtn.addEventListener("click", toggleMusic);

// محاولة التشغيل التلقائي عند التحميل
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        musicIcon.textContent = "🔊";
    }).catch(() => {
        musicIcon.textContent = "🔇";
    });
});

// 3. وظائف معالجة النصوص والأسماء
function sanitizeName(name) {
    return name.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

function adjustFontSize(element, maxFont = 1.2, minFont = 0.4) {
    const parent = element.parentElement;
    if (!parent) return;
    let fontSize = maxFont;
    element.style.fontSize = fontSize + "em";
    while (element.scrollHeight > parent.clientHeight * 0.9 && fontSize > minFont) {
        fontSize -= 0.05;
        element.style.fontSize = fontSize + "em";
    }
}

// دالة العرض الأساسية (تُستدعى عند فتح الرابط)
function updateDisplayFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const fromToText = document.getElementById("fromToText");
    const nameCircle = document.getElementById("nameInCircle");
    const viralHint = document.getElementById("viralHint");

    if (fromName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        fromToText.textContent = `من ${cleanFrom} إلى أنت`;
        nameCircle.textContent = "🌙 رمضان كريم 🌙";
        viralHint.textContent = "🔥 الآن ارسلها لشخص آخر!";
    } else {
        fromToText.textContent = "تهنئة خاصة لك";
        nameCircle.textContent = "🌙 رمضان كريم 🌙";
    }
    
    adjustFontSize(fromToText);
    adjustFontSize(nameCircle);
}

// تنفيذ العرض فور تحميل الصفحة
window.onload = updateDisplayFromUrl;

// 4. معالجة زر "أرسلها الآن"
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const fromToText = document.getElementById("fromToText");
    const nameCircle = document.getElementById("nameInCircle");

    let newTo = input.value.trim();
    if (!newTo) {
        alert("اكتب اسم الشخص الذي تريد تهنئته");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const currentFromUrl = params.get("from");
    const myName = currentFromUrl ? sanitizeName(currentFromUrl) : "شخص-يحبك";
    const cleanNewTo = sanitizeName(newTo);

    // تحديث النص في الدائرة فوراً للمرسل
    fromToText.textContent = `من ${myName.replace(/-/g,' ')} إلى ${cleanNewTo.replace(/-/g,' ')}`;
    
    // إنشاء رابط المشاركة
    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanNewTo)}`;
    
    const message = `🚨 وصلك تهنئة رمضان خاصة!\nمن ${myName.replace(/-/g,' ')} إلى ${cleanNewTo.replace(/-/g,' ')} 🌙\nاضغط وشوفها 👇\n${shareUrl}`;
    
    // فتح واتساب
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    
    // تشغيل الصوت إذا كان صامتاً
    if (bgMusic.paused) toggleMusic();
    
    input.value = "";
});
