document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-image");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    let current = 0;

    function updateButtons() {
      // Hide prev on first slide
      prevBtn.style.display = current === 0 ? "none" : "flex";

      // Hide next on last slide
      nextBtn.style.display = current === images.length - 1 ? "none" : "flex";
    }

    function showImage(index) {
      current = index;

      images.forEach((img, i) => {
        img.style.display = i === current ? "block" : "none";
      });

      updateButtons();
    }

    nextBtn.addEventListener("click", () => {
      showImage(current + 1);
    });

    prevBtn.addEventListener("click", () => {
      showImage(current - 1);
    });

    // Show first image and hide Prev button
    showImage(0);
  });
});
