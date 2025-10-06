onload = () => {
  // Prevent layout shifts by setting initial viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }
  
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 500);

  // Letter modal functionality
  const letterBtn = document.getElementById('letterBtn');
  const letterModal = document.getElementById('letterModal');
  const closeBtn = document.getElementById('closeBtn');
  const letterOverlay = document.querySelector('.letter-overlay');

  // Open letter
  letterBtn.addEventListener('click', () => {
    letterModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Close letter functions
  const closeLetter = () => {
    letterModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };

  closeBtn.addEventListener('click', closeLetter);
  letterOverlay.addEventListener('click', closeLetter);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterModal.classList.contains('active')) {
      closeLetter();
    }
  });
};