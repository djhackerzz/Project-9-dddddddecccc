document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll("[data-goto]");

  function showPage(id) {
    pages.forEach((page) => {
      page.classList.toggle("active", page.id === id);
    });

    // Always scroll to top when page changes (good for mobile)
    window.scrollTo({ top: 0, behavior: "instant" || "auto" });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-goto");
      if (targetId) {
        showPage(targetId);
      }
    });
  });
});
