document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-chart]").forEach((wrap) => {
    const data = [["السبت", 76], ["الأحد", 58], ["الاثنين", 88], ["الثلاثاء", 64], ["الأربعاء", 92], ["الخميس", 82], ["الجمعة", 70]];
    wrap.innerHTML = data.map(([label, value]) => `
      <div class="chart-row">
        <span>${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${value}%"></div></div>
        <strong>${value}</strong>
      </div>
    `).join("");
  });
});
