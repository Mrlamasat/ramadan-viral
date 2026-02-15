/* ======== التواريخ التلقائية ======== */
const currentYear = new Date().getFullYear();
function getHijriYear(){return new Intl.DateTimeFormat('ar-TN-u-ca-islamic',{year:'numeric'}).format(new Date());}
const hijriYear = getHijriYear();

/* ======== تحديث العنوان و Meta ======== */
document.getElementById("dynamicTitle").textContent = `تهنئة رمضان ${currentYear} / ${hijriYear}هـ بالاسم | بطاقة معايدة`;
document.getElementById("dynamicDescription").setAttribute("content",`صمم بطاقة تهنئة رمضان ${currentYear} / ${hijriYear}هـ باسمك مجاناً وشاركها عبر واتساب.`);
document.querySelector('meta[property="og:title"]').setAttribute("content",document.getElementById("dynamicTitle").textContent);
document.querySelector('meta[property="og:description"]').setAttribute("content",document.getElementById("dynamicDescription").getAttribute("content"));

/* ======== Schema JSON-LD ======== */
const schema={ "@context":"https://schema.org", "@type":"WebApplication", "name":`أداة تهنئة رمضان ${currentYear} / ${hijriYear}هـ بالاسم`, "applicationCategory":"EntertainmentApplication", "operatingSystem":"All", "author":{"@type":"Person","name":"Mohammed Almohsen"} };
const scriptTag=document.createElement("script"); scriptTag.type="application/ld+json"; scriptTag.text=JSON.stringify(schema); document.head.appendChild(scriptTag);

/* ======== الموسيقى ======== */
const bgMusic=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicControl");
const musicIcon=document.getElementById("musicIcon");
function toggleMusic(){ if(bgMusic.paused){bgMusic.play();musicIcon.textContent="🔊 إيقاف الصوت";}else{bgMusic.pause();musicIcon.textContent="🔇 تشغيل أجواء رمضان 🌙";} }
musicBtn.addEventListener("click",toggleMusic);

/* ======== صفحة الأداة ======== */
function initializePage(){
    const params=new URLSearchParams(window.location.search);
    const fromName=params.get("from"); const toName=params.get("to");
    const fromText=document.getElementById("fromText");
    const toNameGlow=document.getElementById("toNameGlow");
    if(fromName && toName){ fromText.textContent=`مني أنا ${fromName.replace(/-/g,' ')} إلى`; toNameGlow.textContent=toName.replace(/-/g,' ');} 
    else{ fromText.textContent="تهنئة رمضان خاصة"; toNameGlow.textContent="لك ولأحبابك";}
    
    let startValue=144250;
    let currentVisits=localStorage.getItem('visitCount');
    if(!currentVisits){currentVisits=startValue;}else{currentVisits=parseInt(currentVisits)+1;}
    localStorage.setItem('visitCount',currentVisits);
    document.getElementById('count').innerText=parseInt(currentVisits).toLocaleString();
    setInterval(()=>{currentVisits=parseInt(currentVisits)+1;document.getElementById('count').innerText=currentVisits.toLocaleString();},5000);
}
document.addEventListener("DOMContentLoaded",initializePage);

/* ======== مشاركة واتساب ======== */
document.getElementById("createBtn").addEventListener("click",function(){
    const input=document.getElementById("userName"); const params=new URLSearchParams(window.location.search);
    let newTo=input.value.trim(); if(!newTo){alert("اكتب اسم الشخص الذي تريد تهنئته"); return;}
    let currentSender=params.get("to")||"محب";
    const cleanFrom=currentSender.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g,'').trim().replace(/\s+/g,'-');
    const cleanTo=newTo.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g,'').trim().replace(/\s+/g,'-');
    const shareUrl=`${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(cleanFrom)}&to=${encodeURIComponent(cleanTo)}`;
    const message=`🌙 مفاجأة رمضانية خاصة لك بالاسم!\nمني أنا ${currentSender.replace(/-/g,' ')} إلى ${newTo}\nشاهدها هنا 👇\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`,"_blank");
});

/* ======== الأهلة المتساقطة ======== */
function createCrescent(){
    const container=document.getElementById('crescent-container'); if(!container)return;
    const crescent=document.createElement('div'); crescent.className='crescent'; crescent.innerText='🌙';
    crescent.style.left=Math.random()*window.innerWidth+'px';
    const duration=Math.random()*3+4;
    crescent.style.animation=`fall ${duration}s linear forwards`;
    container.appendChild(crescent);
    setTimeout(()=>crescent.remove(),duration*1000);
}
setInterval(createCrescent,700);
