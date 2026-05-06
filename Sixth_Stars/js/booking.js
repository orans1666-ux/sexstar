document.addEventListener("DOMContentLoaded", () => {
  const serviceSelect = document.querySelector("[data-booking-service]");
  if (!serviceSelect) return;

  const params = new URLSearchParams(location.search);
  serviceSelect.innerHTML = SixthStar.services.map((s) => `<option value="${s.id}">${s.ar} - ${s.price} ر.س</option>`).join("");
  serviceSelect.value = params.get("service") || SixthStar.services[0].id;

  const barberSelect = document.querySelector("[data-booking-barber]");
  barberSelect.innerHTML = SixthStar.barbers.map((name) => `<option>${name}</option>`).join("");

  const form = document.querySelector("[data-booking-form]");
  const summary = document.querySelector("[data-booking-summary]");
  const update = () => updateBookingSummary(summary);
  form.querySelectorAll("input, select").forEach((field) => field.addEventListener("input", update));
  update();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = SixthStar.services.find((s) => s.id === serviceSelect.value);
    const data = Object.fromEntries(new FormData(form).entries());
    const booking = {
      id: `SS-${Date.now().toString().slice(-5)}`,
      service: selected.ar,
      barber: data.barber,
      date: data.date,
      time: data.time,
      price: selected.price,
      status: "مؤكد",
      payment: "بانتظار الدفع",
      customer: data.name,
      phone: data.phone
    };
    const bookings = JSON.parse(localStorage.getItem("sixthStarBookings") || "[]");
    bookings.unshift(booking);
    localStorage.setItem("sixthStarBookings", JSON.stringify(bookings));
    localStorage.setItem("sixthStarLastBooking", JSON.stringify(booking));
    toast("تم حفظ الحجز التجريبي بنجاح");
    setTimeout(() => location.href = "payment.html", 700);
  });
});

function updateBookingSummary(summary) {
  if (!summary) return;
  const form = document.querySelector("[data-booking-form]");
  const data = Object.fromEntries(new FormData(form).entries());
  const selected = SixthStar.services.find((s) => s.id === data.service) || SixthStar.services[0];
  summary.innerHTML = `
    <div class="summary-line"><span>الخدمة</span><strong>${selected.ar}</strong></div>
    <div class="summary-line"><span>الحلاق</span><strong>${data.barber || "-"}</strong></div>
    <div class="summary-line"><span>التاريخ</span><strong>${data.date || "-"}</strong></div>
    <div class="summary-line"><span>الوقت</span><strong>${data.time || "-"}</strong></div>
    <div class="summary-line"><span>السعر</span><strong>${selected.price} ر.س</strong></div>
  `;
}
