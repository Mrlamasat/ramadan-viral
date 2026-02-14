let takbeerSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

document.getElementById("createBtn").addEventListener("click", handleAction);

// دالة ضبط حجم الخط تلقائيًا
function adjustFontSize(element, maxFont = 1.2, minFont = 0.4) {
    const parent = element.parentElement;
    let fontSize = maxFont;
    element.style.fontSize = fontSize + "em";

    while ((element.scrollHeight > parent.clientHeight * 0.95 || element.scrollWidth > parent.clientWidth * 0.95) && fontSize > minFont) {
        fontSize -= 0.02;
        element.style.fontSize = fontSize + "em";
    }
}

function handleAction() {
    const input = document.getElementById("userName");
    const fromToText = document.getElementById("fromToText");
    const nameCircle = document.getElementById("nameInCircle");
    const viralHint = document.getElementById("viralHint");

    let newTo = input.value.trim();
    if (!newTo) {
        alert("اكتب اسم الشخص الذي تريد تهنئته");
        return;
    }

    newTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '');
    const params = new URLSearchParams(window.location.search);
    const currentTo = params.get("to");
    const newFrom = currentTo || "شخص يحبك ❤️";

    fromToText.textContent = `من ${newFrom} إلى ${newTo}`;
    nameCircle.textContent = "🌙 رمضان كريم 🌙";
    viralHint.textContent = "🎁 اكتب اسم شخص آخر وواصل السلسلة!";

    adjustFontSize(document.getElementById("titleText"));
    adjustFontSize(fromToText);
    adjustFontSize(nameCircle);
    adjustFontSize(viralHint);

    takbeerSound.play();

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(newFrom)}&to=${encodeURIComponent(newTo)}`;
    window.history.replaceState(null, '', shareUrl);

    const message =
`🚨 وصلك تهنئة رمضان خاصة!
من ${newFrom} إلى ${newTo} 🌙
اضغط وشوفها 👇
${shareUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    input.value = "";
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");

    if (from && to) {
        const fromToText = document.getElementById("fromToText");
        const nameCircle = document.getElementById("nameInCircle");
        const viralHint = document.getElementById("viralHint");

        fromToText.textContent = `من ${from} إلى ${to}`;
        nameCircle.textContent = "🌙 رمضان كريم 🌙";
        viralHint.textContent = "🔥 الآن ارسلها لشخص آخر!";

        adjustFontSize(document.getElementById("titleText"));
        adjustFontSize(fromToText);
        adjustFontSize(nameCircle);
        adjustFontSize(viralHint);
    }
};