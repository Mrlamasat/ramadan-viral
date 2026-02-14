function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from");
    const toName = params.get("to");
    
    if (fromName && toName) {
        const cleanFrom = fromName.replace(/-/g, ' ');
        const cleanTo = toName.replace(/-/g, ' ');
        document.getElementById("fromText").textContent = `مني أنا ${cleanFrom} إلى`;
        document.getElementById("toNameGlow").textContent = cleanTo;
        
        // تغيير العنوان لكي يظهر في بحث قوقل باسم الشخص
        document.title = `تهنئة رمضان 2026 من ${cleanFrom} إلى ${cleanTo}`;
    }
    // ... باقي كود العداد الخاص بك ...
}
