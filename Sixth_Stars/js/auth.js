document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const user = {
        name: data.name || "عميل النجمة السادسة",
        phone: data.phone || "966500000000",
        email: data.email || "client@sixthstar.test",
        points: 320
      };
      localStorage.setItem("sixthStarUser", JSON.stringify(user));
      toast("تمت العملية بنجاح في وضع المحاكاة");
      setTimeout(() => location.href = "profile.html", 700);
    });
  });

  const profile = document.querySelector("[data-profile]");
  if (profile) {
    const user = JSON.parse(localStorage.getItem("sixthStarUser") || '{"name":"عميل النجمة السادسة","phone":"966500000000","email":"client@sixthstar.test","points":320}');
    const bookings = JSON.parse(localStorage.getItem("sixthStarBookings") || "[]");
    profile.innerHTML = `
      <div class="avatar">${user.name.trim()[0] || "S"}</div>
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <div class="grid grid-3">
        <div class="stat-card"><strong>${user.phone}</strong><span>رقم الجوال</span></div>
        <div class="stat-card"><strong>${bookings.length || 2}</strong><span>عدد الحجوزات</span></div>
        <div class="stat-card"><strong>${user.points}</strong><span>نقاط الولاء</span></div>
      </div>
    `;
  }

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("sixthStarUser");
      location.href = "login.html";
    });
  });
});
