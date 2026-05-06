document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-gallery]");
  if (!grid) return;
  const items = [
    ["salon", "ردهة الصالون", "assets/images/gallery/lounge.svg"],
    ["services", "حلاقة كلاسيكية", "assets/images/gallery/classic.svg"],
    ["decor", "تفاصيل الديكور", "assets/images/gallery/decor.svg"],
    ["chairs", "كراسي فاخرة", "assets/images/gallery/chairs.svg"],
    ["products", "منتجات عناية", "assets/images/gallery/products.svg"],
    ["team", "فريق العمل", "assets/images/gallery/team.svg"]
  ];
  const render = (filter = "all") => {
    grid.innerHTML = items.filter(([cat]) => filter === "all" || filter === cat).map(([cat, title, img]) => `
      <article class="gallery-item" data-category="${cat}">
        <img src="${img}" alt="${title}">
        <div>${title}</div>
      </article>
    `).join("");
  };
  render();
  document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.galleryFilter));
  });
});
