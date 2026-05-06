document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-booking-form]");
  const select = document.querySelector("[data-service-select]");
  const summary = document.querySelector("[data-booking-summary]");
  if (!form || !select || !summary) return;

  const params = new URLSearchParams(location.search);
  select.innerHTML = SS.services.map((s) => `<option value="${s.id}">${s.ar} - ${s.price} ر.س</option>`).join("");
  if (params.get("service")) select.value = params.get("service");

  const update = () => {
    const data = Object.fromEntries(new FormData(form).entries());
    const service = SS.services.find((s) => String(s.id) === String(data.service_id)) || SS.services[0];
    summary.innerHTML = `
      <h3>ملخص الحجز</h3>
      <div class="summary-line"><span>الخدمة</span><strong>${service.ar}</strong></div>
      <div class="summary-line"><span>الحلاق</span><strong>${data.barber_name || "-"}</strong></div>
      <div class="summary-line"><span>التاريخ</span><strong>${data.booking_date || "-"}</strong></div>
      <div class="summary-line"><span>الوقت</span><strong>${data.booking_time || "-"}</strong></div>
      <div class="summary-line"><span>السعر</span><strong>${service.price} ر.س</strong></div>
    `;
  };

  form.addEventListener("input", update);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const body = new FormData(form);
    const service = SS.services.find((s) => String(s.id) === String(body.get("service_id")));
    body.set("total_price", service ? service.price : 0);
    try {
      const response = await fetch("backend/booking.php", { method: "POST", body });
      const result = await response.json();
      notify(result.message || "تم إرسال الطلب");
      if (result.success && result.whatsapp) setTimeout(() => location.href = result.whatsapp, 900);
    } catch {
      notify("تعذر الاتصال بالباك اند. تأكد من تشغيل المشروع عبر XAMPP أو Laragon.");
    }
  });
  update();
});
