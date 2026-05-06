document.addEventListener("DOMContentLoaded", async () => {
  const wrap = document.querySelector("[data-analytics]");
  if (!wrap) return;
  let data = [
    ["اليومي", 12], ["الأسبوعي", 64], ["الشهري", 240], ["المكتملة", 190], ["الملغاة", 18]
  ];
  try {
    const response = await fetch("backend/analytics.php");
    const result = await response.json();
    if (result.success) data = result.metrics;
  } catch {}
  wrap.innerHTML = data.map(([label, value]) => `
    <div class="chart-row"><strong>${label}</strong><div class="bar"><span style="width:${Math.min(value, 100)}%"></span></div><span>${value}</span></div>
  `).join("");
});
