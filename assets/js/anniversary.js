// Run only once
if (!localStorage.getItem("techn0tz_confetti")) {
  localStorage.setItem("techn0tz_confetti", "true");

  window.addEventListener("load", () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 200);
  });
}

// Smooth fade-out after 5 seconds
/*setTimeout(() => {
  const banner = document.querySelector(".anniversary-banner");
  if (banner) {
    banner.classList.add("hide");

    // Remove from DOM after animation completes
    setTimeout(() => {
      banner.remove();
    }, 600); // match CSS transition time
  }
}, 6000);*/