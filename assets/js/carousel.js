document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-image");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let current = 0;

  if (!images.length || !nextBtn || !prevBtn) return;

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  showImage(current); // Show the first image initially
});