const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicIcon.textContent = "🔊 إيقاف الصوت";
            musicBtn.classList.add("music-playing");
        }).catch(err => console.log("تفاعل المستخدم مطلوب أولاً"));
    } else {
        bgMusic.pause();
        musicIcon.textContent = "👈 تشغيل الصوت 🌙";
        musicBtn.classList.remove("music-playing");
    }
}
musicBtn.addEventListener("click", toggleMusic);

function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    if (fromName && toName) {
        const cleanFrom = decodeURIComponent(fromName).replace(/-/g, ' ');
        const cleanTo = decodeURIComponent(toName).replace(/-/g, ' ');
        document.getElementById("fromText").textContent = `مني أنا ${cleanFrom} إلى`;
        document.getElementById("toNameGlow").textContent = cleanTo;
        // تحديث العنوان للسيو اللحظي
        document.title = `تهنئة رمضان 2026 من ${cleanFrom} إلى ${cleanTo}`;
    }

    // العداد الحي المطور
    const startValue = 144250;
    let currentVisits = parseInt(localStorage.getItem('visitCount')) || startValue;
    if (currentVisits < startValue) currentVisits = startValue;
    currentVisits++;
    localStorage.setItem('visitCount', currentVisits);
    const countEl = document.getElementById('count');
    countEl.innerText = currentVisits.toLocaleString();

    setInterval(() => {
        currentVisits += Math.floor(Math.random() * 3) + 1;
        countEl.innerText = currentVisits.toLocaleString();
        localStorage.setItem('visitCount', currentVisits);
    }, 4500);
}

window.onload = initializePage;

document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    let newTo = input.value.trim();
    if (!newTo) return alert("من فضلك اكتب اسم الشخص");

    const params = new URLSearchParams(window.location.search);
    let currentSender = params.get("to") || "محب"; 
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(currentSender)}&to=${encodeURIComponent(newTo)}`;
    const message = `🌙 تهنئة رمضان خاصة!\nمني أنا ${currentSender.replace(/-/g, ' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});

// أنيميشن الأهلة
setInterval(() => {
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
}, 800);
