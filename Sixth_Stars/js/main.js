const SixthStar = {
  services: [
    { id: "classic", ar: "حلاقة شعر كلاسيكية", en: "Classic Haircut", descAr: "قص مرتب بتفاصيل دقيقة يناسب العمل والمناسبات.", descEn: "Clean precise cut for work and occasions.", price: 55, duration: "35 دقيقة", image: "assets/images/services/classic-cut.svg" },
    { id: "modern", ar: "حلاقة شعر عصرية", en: "Modern Fade", descAr: "تدرج عصري ولمسة نهائية حادة.", descEn: "Modern fade with a sharp finish.", price: 70, duration: "45 دقيقة", image: "assets/images/services/modern-fade.svg" },
    { id: "beard", ar: "تهذيب اللحية", en: "Beard Trim", descAr: "تحديد وتهذيب باحترافية مع عناية خفيفة.", descEn: "Professional shaping and detailed beard care.", price: 35, duration: "25 دقيقة", image: "assets/images/services/beard-trim.svg" },
    { id: "combo", ar: "حلاقة شعر ولحية", en: "Haircut & Beard", descAr: "تجربة متكاملة للشعر واللحية.", descEn: "Complete grooming for hair and beard.", price: 90, duration: "60 دقيقة", image: "assets/images/services/hair-beard.svg" },
    { id: "facial", ar: "تنظيف البشرة", en: "Skin Refresh", descAr: "تنظيف سريع ومنعش للبشرة الرجالية.", descEn: "Quick refreshing facial care for men.", price: 80, duration: "40 دقيقة", image: "assets/images/services/facial.svg" },
    { id: "styling", ar: "استشوار وتصفيف", en: "Blow Dry & Styling", descAr: "تصفيف أنيق للمناسبات والطلعات.", descEn: "Elegant styling for events and daily looks.", price: 45, duration: "25 دقيقة", image: "assets/images/services/styling.svg" },
    { id: "color", ar: "صبغة شعر", en: "Hair Color", descAr: "لون متوازن بلمسة طبيعية وفاخرة.", descEn: "Balanced color with a natural premium finish.", price: 120, duration: "75 دقيقة", image: "assets/images/services/color.svg" },
    { id: "care", ar: "عناية بالشعر", en: "Hair Care", descAr: "جلسة تغذية وترطيب للشعر.", descEn: "Nourishing and hydrating hair care session.", price: 95, duration: "50 دقيقة", image: "assets/images/services/hair-care.svg" },
    { id: "groom", ar: "باقة العريس", en: "Groom Package", descAr: "باقة فاخرة لإطلالة متكاملة في اليوم المميز.", descEn: "Premium full look package for the big day.", price: 260, duration: "120 دقيقة", image: "assets/images/services/groom.svg" }
  ],
  barbers: ["أحمد", "تركي", "عبدالعزيز", "Faisal"],
  reviews: [
    ["فهد الحربي", "التدرج مضبوط والخدمة راقية، الحجز سهل جدًا.", 5],
    ["Nasser", "Clean place, sharp cut, and friendly team.", 5],
    ["عبدالله", "باقة العريس ممتازة قبل المناسبات.", 4.9]
  ],
  banners: [
    { title: "صالون النجمة السادسة", text: "تجربة حلاقة فاخرة تليق بك", cta: "احجز الآن", media: "بنر رئيسي" },
    { title: "خصم 20% على أول زيارة", text: "احجز الآن واستفد من العرض", cta: "استفد من العرض", media: "عرض خصم" },
    { title: "باقة العريس الفاخرة", text: "إطلالة متكاملة ليومك المميز", cta: "احجز الباقة", media: "باقة العريس" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  ensureLuxuryHeader();
  setupNavigation();
  setYear();
  renderServices();
  renderReviews();
  renderQuickBookings();
});

function getPathPrefix() {
  return location.pathname.includes("/admin/") ? "../" : "";
}

function ensureLuxuryHeader() {
  if (document.body.classList.contains("admin-body")) return;

  const prefix = getPathPrefix();
  const header = `
    <header class="site-header atelier-header">
      <div class="container nav-wrap">
        <a class="brand header-brand" href="${prefix}index.html" aria-label="صالون النجمة السادسة">
          <span class="brand-mark brand-star" aria-hidden="true">
            <img src="${prefix}assets/logo/sixth-star-logo.svg" alt="">
          </span>
          <span class="brand-copy">
            <strong data-i18n="brand_ar">النجمة السادسة</strong>
            <small data-i18n="brand_en">Sixth Star Barbershop</small>
          </span>
        </a>

        <nav class="nav-links primary-nav" data-nav-links aria-label="Main navigation">
          <a href="${prefix}index.html" data-i18n="nav_home">الرئيسية</a>
          <a href="${prefix}services.html" data-i18n="nav_services">الخدمات</a>
          <a href="${prefix}services.html#prices" data-i18n="nav_prices">الأسعار</a>
          <a href="${prefix}gallery.html" data-i18n="nav_works">معرض الأعمال</a>
          <a href="${prefix}booking.html" data-i18n="nav_booking">الحجز</a>
          <a href="${prefix}about.html" data-i18n="nav_about">من نحن</a>
          <a href="${prefix}contact.html" data-i18n="nav_contact">تواصل معنا</a>
          <a class="btn mobile-book" href="${prefix}booking.html" data-i18n="cta_book_full">احجز موعدك الآن</a>
        </nav>

        <div class="nav-actions header-actions">
          <a class="quick-link" href="https://wa.me/966500000000" aria-label="WhatsApp">WA</a>
          <a class="quick-link" href="https://www.snapchat.com/" aria-label="Snapchat">SC</a>
          <button class="icon-btn lang-switch" type="button" data-language-toggle aria-label="تبديل اللغة">عربي | English</button>
          <button class="icon-btn theme-switch" type="button" data-theme-toggle aria-label="تبديل الوضع">Dark</button>
          <a class="login-link" href="${prefix}login.html" data-i18n="nav_login">دخول</a>
          <a class="btn desktop-book book-glow" href="${prefix}booking.html" data-i18n="cta_book_full">احجز موعدك الآن</a>
          <button class="menu-toggle" type="button" data-menu-toggle aria-label="فتح القائمة" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  const existing = document.querySelector(".site-header");
  if (existing) {
    existing.outerHTML = header;
  } else {
    document.body.insertAdjacentHTML("afterbegin", header);
  }

  if (typeof applyTheme === "function") {
    applyTheme(document.documentElement.dataset.theme || localStorage.getItem("sixthStarTheme") || "light");
  }
  if (typeof setupThemeToggles === "function") {
    setupThemeToggles();
  }
  if (typeof applyLanguage === "function") {
    applyLanguage(localStorage.getItem("sixthStarLang") || document.documentElement.lang || "ar");
  }
  if (typeof setupLanguageToggles === "function") {
    setupLanguageToggles();
  }
}

function setupNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (toggle && links) {
    const setMenu = (isOpen) => {
      links.classList.toggle("open", isOpen);
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenu(!links.classList.contains("open"));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", (event) => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .admin-nav a").forEach((link) => {
    const rawHref = link.getAttribute("href") || "";
    const [href, hash] = rawHref.split("#");
    const hrefPage = href.split("/").pop();
    const isSamePage = hrefPage === current || (!href && Boolean(hash)) || link.href.endsWith(current);
    const hashMatches = hash ? location.hash === `#${hash}` : true;
    if (isSamePage && hashMatches) link.classList.add("active");
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function renderServices() {
  document.querySelectorAll("[data-services-list]").forEach((wrap) => {
    const limit = Number(wrap.dataset.limit || SixthStar.services.length);
    wrap.innerHTML = SixthStar.services.slice(0, limit).map((service) => serviceCard(service)).join("");
  });
}

function serviceCard(service) {
  const pathPrefix = getPathPrefix();
  return `
    <article class="service-card">
      <img src="${pathPrefix}${service.image}" alt="${service.ar}">
      <div class="service-body">
        <span class="eyebrow">${service.en}</span>
        <h3>${service.ar}</h3>
        <p>${service.descAr}</p>
        <div class="service-meta">
          <span class="pill">${service.duration}</span>
          <span class="pill"><strong>${service.price} ر.س</strong></span>
        </div>
        <a class="btn" href="${pathPrefix}booking.html?service=${service.id}">حجز الخدمة</a>
      </div>
    </article>
  `;
}

function renderReviews() {
  document.querySelectorAll("[data-reviews]").forEach((wrap) => {
    wrap.innerHTML = SixthStar.reviews.map(([name, text, score]) => `
      <article class="review-card">
        <div class="stars">★★★★★</div>
        <p>${text}</p>
        <strong>${name}</strong>
        <span class="badge">${score}/5</span>
      </article>
    `).join("");
  });
}

function renderQuickBookings() {
  const table = document.querySelector("[data-bookings-table]");
  if (!table) return;
  const bookings = JSON.parse(localStorage.getItem("sixthStarBookings") || "[]");
  const rows = bookings.length ? bookings : [
    { id: "SS-1024", service: "حلاقة شعر ولحية", barber: "أحمد", date: "2026-05-09", time: "7:30 PM", price: 90, status: "مؤكد", payment: "مدفوع" },
    { id: "SS-1019", service: "تهذيب اللحية", barber: "تركي", date: "2026-04-28", time: "6:00 PM", price: 35, status: "منتهي", payment: "مدفوع" }
  ];
  table.innerHTML = rows.map((b) => `
    <tr>
      <td>${b.id}</td><td>${b.service}</td><td>${b.barber}</td><td>${b.date}</td><td>${b.time}</td>
      <td>${b.price} ر.س</td><td><span class="status">${b.status}</span></td><td><span class="status pending">${b.payment}</span></td>
    </tr>
  `).join("");
}

function toast(message) {
  const note = document.createElement("div");
  note.className = "notice";
  note.style.cssText = "position:fixed;left:20px;bottom:20px;z-index:80;max-width:320px;background:var(--surface);box-shadow:var(--shadow)";
  note.textContent = message;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2800);
}
