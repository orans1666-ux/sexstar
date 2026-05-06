document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("sixthStarTheme") || "light";
  applyTheme(savedTheme);
  setupThemeToggles();
});

function setupThemeToggles() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    if (button.dataset.themeReady) return;
    button.dataset.themeReady = "true";
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("sixthStarTheme", next);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.textContent = theme === "dark" ? "Light" : "Dark";
    button.setAttribute("aria-label", theme === "dark" ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي");
  });
}
