const SS = {
  services: [
    { id: 1, ar: "قص شعر", en: "Haircut", price: 60, duration: "35 دقيقة", icon: "✂" },
    { id: 2, ar: "تهذيب لحية", en: "Beard Trim", price: 35, duration: "25 دقيقة", icon: "◆" },
    { id: 3, ar: "حلاقة ملكية", en: "Royal Shave", price: 120, duration: "70 دقيقة", icon: "♛" },
    { id: 4, ar: "تنظيف بشرة", en: "Skin Care", price: 90, duration: "45 دقيقة", icon: "◎" },
    { id: 5, ar: "صبغ شعر", en: "Hair Color", price: 140, duration: "80 دقيقة", icon: "◈" },
    { id: 6, ar: "باقة العريس", en: "Groom Package", price: 299, duration: "120 دقيقة", icon: "★" },
    { id: 7, ar: "عناية VIP", en: "VIP Care", price: 220, duration: "90 دقيقة", icon: "VIP" },
    { id: 8, ar: "خدمة الأطفال", en: "Kids Service", price: 45, duration: "25 دقيقة", icon: "K" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  renderServices();
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});

function setupMenu() {
  const menu = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  if (!menu || !nav) return;
  menu.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));
}

function renderServices() {
  document.querySelectorAll("[data-services]").forEach((wrap) => {
    const limit = Number(wrap.dataset.limit || SS.services.length);
    wrap.innerHTML = SS.services.slice(0, limit).map((service) => `
      <article class="card service-card">
        <div class="service-art">${service.icon}</div>
        <div class="service-body">
          <span class="eyebrow">${service.en}</span>
          <h3>${service.ar}</h3>
          <p>خدمة احترافية بتفاصيل دقيقة ووقت واضح قبل تأكيد الحجز.</p>
          <p class="price">${service.price} ر.س</p>
          <p>${service.duration}</p>
          <a class="btn" href="booking.html?service=${service.id}">حجز الخدمة</a>
        </div>
      </article>
    `).join("");
  });
}

function notify(message) {
  const note = document.createElement("div");
  note.className = "card";
  note.style.cssText = "position:fixed;left:20px;bottom:20px;z-index:90;max-width:320px";
  note.textContent = message;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2600);
}
