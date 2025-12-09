document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Let all CSS animations start
  setTimeout(() => {
    body.classList.remove("not-loaded");
  }, 100); // small delay for nicer entrance

  // ===== Letter modal elements =====
  const letterBtn = document.getElementById("letterBtn");
  const letterModal = document.getElementById("letterModal");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.querySelector(".letter-overlay");

  // ===== Background music =====
  const bgMusic = document.getElementById("bgMusic");
  let isMusicPlaying = false;

  function tryPlayMusic() {
    if (!bgMusic || isMusicPlaying) return;

    bgMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
      })
      .catch(() => {
        // Autoplay might be blocked; that's okay, we just ignore the error
      });
  }

  // ===== Modal open/close =====
  function openModal() {
    if (!letterModal) return;
    letterModal.classList.add("active");
    tryPlayMusic();
  }

  function closeModal() {
    if (!letterModal) return;
    letterModal.classList.remove("active");
  }

  if (letterBtn) {
    letterBtn.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Also try to start music on first click anywhere (mobile friendly)
  document.addEventListener(
    "click",
    () => {
      tryPlayMusic();
    },
    { once: true }
  );

  // ===== Pink / BMW / Tulip cards =====
  const revealCards = document.querySelectorAll(".reveal-card");

  revealCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });
  });

  // ===== Name reveal =====
  const showNameBtn = document.getElementById("showNameBtn");
  const nameWrapper = document.getElementById("nameWrapper");

  if (showNameBtn && nameWrapper) {
    showNameBtn.addEventListener("click", () => {
      nameWrapper.classList.add("visible");
      showNameBtn.style.display = "none";
      tryPlayMusic(); // nice moment to start music too
    });
  }
});
