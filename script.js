const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = "🔊 إيقاف الصوت";
    } else {
        bgMusic.pause();
        musicIcon.textContent = "👈 اضغط لتشغيل أجواء رمضان 🌙";
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
    } else {
        fromText.textContent = "تهنئة رمضان خاصة";
        toNameGlow.textContent = "لك ولأحبابك";
    }

    let startValue = 144250;
    let currentVisits = localStorage.getItem('visitCount');

    if (!currentVisits) { currentVisits = startValue; }
    else { currentVisits = parseInt(currentVisits) + 1; }

    localStorage.setItem('visitCount', currentVisits);
    document.getElementById('count').innerText = parseInt(currentVisits).toLocaleString();

    setInterval(() => {
        currentVisits = parseInt(currentVisits) + 1;
        document.getElementById('count').innerText = currentVisits.toLocaleString();
    }, 5000);
}
window.onload = initializePage;

document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const params = new URLSearchParams(window.location.search);
    
    let newTo = input.value.trim();
    if (!newTo) { alert("اكتب اسم الشخص الذي تريد تهنئته"); return; }

    let currentSender = params.get("to") || "محب"; 
    
    const cleanFrom = currentSender.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');

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
    crescent.style.left = Math.random() * window.innerWidth + 'px';
    const duration = Math.random() * 3 + 4;
    crescent.style.animation = `fall ${duration}s linear forwards`;
    container.appendChild(crescent);
    setTimeout(() => crescent.remove(), duration * 1000);
}
setInterval(createCrescent, 700);
