function handleAction() {
    const input = document.getElementById("userName");
    let recipientAr = input.value.trim(); // الاسم بالعربي للإرسال
    
    if (!recipientAr) {
        alert("اكتب اسم الشخص الذي تريد تهنئته");
        return;
    }

    // تحويل الاسم العربي إلى إنجليزي بسيط للرابط فقط (إزالة المسافات)
    // ملاحظة: الرابط سيعتمد على كلمة "Ramadan-Gift" بدلاً من الرموز
    const linkName = "special-guest"; 

    const params = new URLSearchParams(window.location.search);
    const senderAr = params.get("name") || "شخص يحبك";

    // الرابط الآن أصبح إنجليزي بالكامل ولا يحتوي على رموز %
    const shareUrl = `${window.location.origin}${window.location.pathname}?to=${linkName}`;

    // الرسالة في واتساب تظل عربية وجميلة
    const message = 
`🎁 وصلتك تهنئة رمضان خاصة
من: ${senderAr}
إلى: ${recipientAr} 🌙 ✨

افتح الرابط وشوف مفاجأتك 👇
${shareUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    input.value = "";
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");

    if (toParam === "special-guest") {
        // بما أن الرابط إنجليزي ثابت، سنعرض رسالة ترحيب عامة راقية
        document.getElementById("fromToText").textContent = `تهنئة خاصة`;
        document.getElementById("nameInCircle").textContent = `🌙 رمضان كريم 🌙`;
        
        document.getElementById("viralHint").textContent = "🔥 اكتب اسم صديقك وأرسلها له!";
    }
};
