document.addEventListener("DOMContentLoaded", () => {
  const summary = document.querySelector("[data-payment-summary]");
  const booking = JSON.parse(localStorage.getItem("sixthStarLastBooking") || "null") || {
    id: "SS-1024",
    service: "حلاقة شعر ولحية",
    barber: "أحمد",
    date: "2026-05-09",
    time: "7:30 PM",
    price: 90
  };

  if (summary) {
    summary.innerHTML = `
      <div class="summary-line"><span>رقم الحجز</span><strong>${booking.id}</strong></div>
      <div class="summary-line"><span>الخدمة</span><strong>${booking.service}</strong></div>
      <div class="summary-line"><span>الموعد</span><strong>${booking.date} - ${booking.time}</strong></div>
      <div class="summary-line"><span>الإجمالي</span><strong>${booking.price} ر.س</strong></div>
    `;
  }

  document.querySelectorAll("[data-payment-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const ok = form.querySelector("[name='method']:checked")?.value !== "fail";
      toast("محاكاة دفع فقط، لا يتم حفظ بيانات البطاقة");
      setTimeout(() => location.href = ok ? "payment-success.html" : "payment-failed.html", 900);
    });
  });
});
