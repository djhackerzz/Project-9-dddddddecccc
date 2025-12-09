document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Let all CSS animations start
  setTimeout(() => {
    body.classList.remove("not-loaded");
  }, 100);

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
        // autoplay blocked, ignore
      });
  }

  // ===== Multi-step screens inside letter =====
  const stepScreens = document.querySelectorAll(".step-screen");
  const prevStepBtn = document.getElementById("prevStepBtn");
  const nextStepBtn = document.getElementById("nextStepBtn");

  let currentStep = 1;
  const totalSteps = stepScreens.length || 0;

  function updateSteps() {
    stepScreens.forEach((screen) => {
      const step = Number(screen.dataset.step);
      screen.classList.toggle("active", step === currentStep);
    });

    if (prevStepBtn) {
      prevStepBtn.disabled = currentStep === 1;
    }

    if (nextStepBtn) {
      if (currentStep === totalSteps) {
        nextStepBtn.textContent = "Close 💌";
      } else {
        nextStepBtn.textContent = "Next ➜";
      }
    }
  }

  // ===== Modal open/close =====
  function openModal() {
    if (!letterModal) return;
    letterModal.classList.add("active");

    if (totalSteps > 0) {
      currentStep = 1;
      updateSteps();
    }

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

  // Music also tries to start on very first tap anywhere (for mobile)
  document.addEventListener(
    "click",
    () => {
      tryPlayMusic();
    },
    { once: true }
  );

  // Step navigation
  if (prevStepBtn && nextStepBtn && totalSteps > 0) {
    prevStepBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateSteps();
      }
    });

    nextStepBtn.addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateSteps();
      } else {
        // Last step → close the letter nicely
        closeModal();
      }
    });

    // Make sure initial state is correct
    updateSteps();
  }
});
