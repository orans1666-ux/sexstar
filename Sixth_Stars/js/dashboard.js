document.addEventListener("DOMContentLoaded", () => {
  renderAdminTables();
  renderKpis();
});

function renderKpis() {
  document.querySelectorAll("[data-kpis]").forEach((wrap) => {
    const items = [
      ["128", "حجز هذا الشهر"],
      ["42k", "إيرادات تجريبية"],
      ["4.9", "متوسط التقييم"],
      ["860", "عميل مسجل"]
    ];
    wrap.innerHTML = items.map(([value, label]) => `<div class="kpi-card"><strong>${value}</strong><span>${label}</span></div>`).join("");
  });
}

function renderAdminTables() {
  const table = document.querySelector("[data-admin-table]");
  if (!table) return;
  const type = table.dataset.adminTable;
  const rows = {
    services: SixthStar.services.map((s) => [s.ar, s.en, `${s.price} ر.س`, s.duration, "نشط"]),
    bookings: [["SS-1024", "حلاقة شعر ولحية", "أحمد", "2026-05-09", "مؤكد"], ["SS-1025", "باقة العريس", "تركي", "2026-05-11", "بانتظار الدفع"]],
    users: [["فهد الحربي", "fahad@test.sa", "966501111111", "عميل"], ["Admin", "admin@sixthstar.test", "966500000000", "مدير"]],
    payments: [["PAY-8021", "SS-1024", "90 ر.س", "بطاقة", "ناجح"], ["PAY-8022", "SS-1025", "260 ر.س", "مدى", "قيد الانتظار"]],
    reviews: [["فهد الحربي", "5", "الخدمة راقية", "ظاهر"], ["Nasser", "5", "Sharp cut", "ظاهر"]],
    settings: [["اسم الصالون", "صالون النجمة السادسة"], ["رقم واتساب", "966500000000"], ["العملة", "SAR"]]
  }[type] || [];
  table.innerHTML = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}<td><button class="btn secondary">تعديل</button></td></tr>`).join("");
}
