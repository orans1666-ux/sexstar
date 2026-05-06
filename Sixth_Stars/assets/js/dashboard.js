document.addEventListener("DOMContentLoaded", async () => {
  const stats = document.querySelector("[data-dashboard-stats]");
  const table = document.querySelector("[data-dashboard-table]");
  if (!stats && !table) return;
  try {
    const response = await fetch("backend/dashboard.php?action=overview");
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    if (stats) {
      stats.innerHTML = `
        <article class="stat-card"><h3>${data.stats.bookings}</h3><p>عدد الحجوزات</p></article>
        <article class="stat-card"><h3>${data.stats.users}</h3><p>عدد العملاء</p></article>
        <article class="stat-card"><h3>${data.stats.revenue} ر.س</h3><p>إجمالي الإيرادات</p></article>
        <article class="stat-card"><h3>${data.stats.services}</h3><p>عدد الخدمات</p></article>
      `;
    }
    if (table) {
      table.innerHTML = data.bookings.map((b) => `<tr><td>${b.id}</td><td>${b.customer_name}</td><td>${b.service_name}</td><td>${b.booking_date}</td><td>${b.booking_time}</td><td><span class="status pending">${b.status}</span></td></tr>`).join("");
    }
  } catch {
    if (stats) stats.innerHTML = `<article class="stat-card"><h3>Demo</h3><p>شغل المشروع عبر PHP لعرض البيانات الحقيقية.</p></article>`;
  }
});
