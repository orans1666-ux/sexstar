document.addEventListener("DOMContentLoaded", () => {
  applyTheme(localStorage.getItem("sixthStarsTheme") || "light");
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("sixthStarsTheme", next);
      applyTheme(next);
    });
  });
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => (btn.textContent = theme === "dark" ? "Light" : "Dark"));
}
