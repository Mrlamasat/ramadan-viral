document.addEventListener("DOMContentLoaded", function () {

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

if (musicBtn) {
    musicBtn.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            musicIcon.textContent = "إيقاف الصوت";
        } else {
            bgMusic.pause();
            musicIcon.textContent = "تشغيل أجواء رمضان 🌙";
        }
    });
}

const params = new URLSearchParams(window.location.search);
const toName = params.get("to");

if (toName) {
    const cleanTo = toName.replace(/-/g, ' ');
    document.getElementById("nameInCircle").textContent = `🌙 ${cleanTo} 🌙`;
}

document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName").value.trim();
    if (!input) return alert("اكتب الاسم أولاً");

    const cleanTo = input.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
    const shareUrl = `${window.location.origin}?to=${encodeURIComponent(cleanTo)}`;

    const message = `🌙 تهنئة رمضان خاصة باسمك 👇\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});

function createCrescent() {
    const container = document.getElementById('crescent-container');
    const crescent = document.createElement('div');
    crescent.className = 'crescent';
    crescent.innerText = '🌙';
    crescent.style.left = Math.random() * window.innerWidth + 'px';
    container.appendChild(crescent);
    setTimeout(() => crescent.remove(), 5000);
}
setInterval(createCrescent, 1200);

});
