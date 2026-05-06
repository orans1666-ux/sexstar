const i18n = {
  en: {
    home: "Home", services: "Services", booking: "Booking", offers: "Offers", contact: "Contact", login: "Login",
    book_now: "Book Now", hero_title: "Sixth Star Barbershop", hero_text: "Premium grooming, precise cuts, refined beard care and an easy booking experience.",
    services_title: "Signature Services", offers_title: "Offers and Surprises", contact_title: "Contact Sixth Star"
  },
  ar: {
    home: "الرئيسية", services: "الخدمات", booking: "الحجز", offers: "العروض", contact: "التواصل", login: "تسجيل الدخول",
    book_now: "احجز الآن", hero_title: "النجمة السادسة", hero_text: "حلاقة فاخرة، قصات دقيقة، عناية راقية باللحية وتجربة حجز سهلة.",
    services_title: "خدماتنا المميزة", offers_title: "العروض والمفاجآت", contact_title: "تواصل مع النجمة السادسة"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applyLang(localStorage.getItem("sixthStarsLang") || "ar");
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.lang === "ar" ? "en" : "ar";
      localStorage.setItem("sixthStarsLang", next);
      applyLang(next);
    });
  });
});

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => (btn.textContent = lang === "ar" ? "EN" : "AR"));
}
