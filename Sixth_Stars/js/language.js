const translations = {
  en: {
    brand_ar: "Sixth Star",
    brand_en: "Sixth Star Barbershop",
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_prices: "Prices",
    nav_works: "Portfolio",
    nav_booking: "Booking",
    nav_promotions: "Promotions",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    nav_login: "Login",
    cta_book: "Book Now",
    cta_book_full: "Book Your Appointment",
    cta_whatsapp: "WhatsApp",
    hero_title: "Sixth Star Barbershop",
    hero_subtitle: "Premium grooming, sharp fades, beard care, and a calm experience for the modern gentleman.",
    about_title: "A luxury men’s barbershop with a modern Saudi spirit",
    services_title: "Signature Services",
    features_title: "Why Clients Choose Us",
    reviews_title: "Client Reviews",
    contact_title: "Visit Sixth Star Barbershop",
    footer_text: "Sixth Star Barbershop delivers precise grooming with a refined black and gold identity."
  },
  ar: {
    brand_ar: "النجمة السادسة",
    brand_en: "Sixth Star Barbershop",
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "الخدمات",
    nav_prices: "الأسعار",
    nav_works: "معرض الأعمال",
    nav_booking: "الحجز",
    nav_promotions: "العروض",
    nav_gallery: "المعرض",
    nav_contact: "تواصل معنا",
    nav_login: "دخول",
    cta_book: "احجز الآن",
    cta_book_full: "احجز موعدك الآن",
    cta_whatsapp: "واتساب",
    hero_title: "صالون النجمة السادسة",
    hero_subtitle: "حلاقة فاخرة، تدرجات دقيقة، عناية باللحية، وتجربة هادئة تليق بالرجل العصري.",
    about_title: "صالون رجالي فاخر بروح سعودية عصرية",
    services_title: "خدماتنا المميزة",
    features_title: "لماذا يختارنا العملاء",
    reviews_title: "آراء العملاء",
    contact_title: "زر صالون النجمة السادسة",
    footer_text: "صالون النجمة السادسة يقدم عناية دقيقة بهوية سوداء وذهبية راقية."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("sixthStarLang") || "ar";
  applyLanguage(savedLang);
  setupLanguageToggles();
});

function setupLanguageToggles() {
  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    if (button.dataset.languageReady) return;
    button.dataset.languageReady = "true";
    button.addEventListener("click", () => {
      const next = document.documentElement.lang === "ar" ? "en" : "ar";
      applyLanguage(next);
      localStorage.setItem("sixthStarLang", next);
    });
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[lang] && translations[lang][key]) node.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.textContent = "عربي | English";
    button.setAttribute("aria-label", lang === "ar" ? "Switch language to English" : "تبديل اللغة إلى العربية");
  });
}
