document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-banner-slider]");
  if (!slider) return;
  const slides = [...slider.querySelectorAll(".banner-slide")];
  const dots = document.querySelector("[data-banner-dots]");
  let index = 0;

  dots.innerHTML = slides.map((_, i) => `<button class="banner-dot${i === 0 ? " active" : ""}" aria-label="Banner ${i + 1}"></button>`).join("");
  const dotButtons = [...dots.children];

  const show = (next) => {
    slides[index].classList.remove("active");
    dotButtons[index].classList.remove("active");
    index = next;
    slides[index].classList.add("active");
    dotButtons[index].classList.add("active");
  };

  dotButtons.forEach((button, i) => button.addEventListener("click", () => show(i)));
  setInterval(() => show((index + 1) % slides.length), 5000);
});
