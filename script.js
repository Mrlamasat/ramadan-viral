const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// 1. التحكم بالصوت
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

// 2. تحديث عرض الأسماء (تصحيح ظهور كلمة محبلك)
function updateDisplay() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    const fromText = document.getElementById("fromText");
    const toNameGlow = document.getElementById("toNameGlow");

    // إذا كان الرابط يحتوي على أسماء (تم إرساله من شخص لشخص)
    if (fromName && toName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        const cleanTo = toName.replace(/-/g, ' ');
        
        fromText.textContent = `مني أنا ${cleanFrom} إلى`;
        toNameGlow.textContent = cleanTo;
    } 
    // إذا كان الرابط مفتوحاً لأول مرة (رابط الموقع الأساسي)
    else {
        fromText.textContent = "تهنئة رمضان خاصة";
        toNameGlow.textContent = "لك ولأحبابك";
    }
}
window.onload = updateDisplay;

// 3. المشاركة وتحديث الأسماء (بدون كلمة محبلك)
document.getElementById("createBtn").addEventListener("click", function() {
    const input = document.getElementById("userName");
    const params = new URLSearchParams(window.location.search);
    
    let newTo = input.value.trim();
    if (!newTo) { alert("اكتب اسم الشخص الذي تريد تهنئته"); return; }

    // تحديد من هو المرسل الآن:
    // إذا كان الرابط به مستلم سابق (to)، يصبح هو المرسل الجديد.
    // إذا كان الرابط فارغاً، نطلب منه كتابة اسمه أولاً أو نستخدم كلمة "محب" (اختياري).
    
    let currentSender = params.get("to"); 
    
    if (!currentSender) {
        // إذا فتح الموقع لأول مرة وأراد الإرسال، نعتبره هو المرسل الأول
        currentSender = "محب"; 
    }

    const cleanFrom = currentSender.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    const cleanTo = newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    
    // رسالة الواتساب المعدلة
    const message = `🌙 تهنئة رمضان خاصة!\nمني أنا ${currentSender.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
});
// دالة عداد الزيارات
function updateVisitorCounter() {
    const startValue = 144250;
    let currentVisits = localStorage.getItem('visitCount');

    if (!currentVisits) {
        // إذا كانت أول مرة، ابدأ من الرقم المحدد
        currentVisits = startValue;
    } else {
        // زيادة الزيارات في كل مرة يفتح فيها الرابط
        currentVisits = parseInt(currentVisits) + 1;
    }

    // حفظ القيمة الجديدة في متصفح المستخدم
    localStorage.setItem('visitCount', currentVisits);
    
    // عرض الرقم في الصفحة
    document.getElementById('count').innerText = currentVisits.toLocaleString();
}

// تشغيل العداد عند تحميل الصفحة
window.addEventListener('load', updateVisitorCounter);
