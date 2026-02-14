document.getElementById("createBtn").addEventListener("click", handleAction);

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
        document.getElementById("fromToText").textContent = `من ${from} إلى ${to}`;
        document.getElementById("nameInCircle").textContent = "🌙 رمضان كريم 🌙";
        document.getElementById("viralHint").textContent =
        "🔥 الآن أرسلها لشخص آخر قبل أن يفوت رمضان!";
    }
};