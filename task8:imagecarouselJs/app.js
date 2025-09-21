// const body = document.querySelector(".body");
const bgOverlay = document.querySelector(".bg-overlay");
const images = Array.from(document.querySelectorAll(".image"));
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const carousel = document.querySelector(".carousel");
const container = document.querySelector(".container");
const imgWidth = images[0].offsetWidth;
const gap = 20;
const center = container.offsetWidth / 2 - imgWidth / 2;

let currentIndex = 1;
let isAnimating = false;
let startX = 0;
let isDragging = false;
let wheelTimeout;

updateCarousel();

function getDistance(index) {
  let dist = index - currentIndex; // calculating distance to determine the image positions

  // calculating distance and setting distance accordingly for enabling infinite slide
  if (dist > images.length / 2) dist -= images.length;
  if (dist < -images.length / 2) dist += images.length;
  return dist;
}
function updateCarousel() {
  images.forEach((img, index) => {
    const distance = getDistance(index);
    // for rest of the images
    let scale = 0.5;
    let zIndex = 1;
    let opacity = 0.5;
    let blur = "4px";

    if (distance === 0) {
      // for central image
      scale = 1;
      zIndex = 10;
      opacity = 1;
      blur = "0px";
    } else if (Math.abs(distance) === 1) {
      // for images left and right to central image
      scale = 0.8;
      zIndex = 5;
      blur = "2px";
      opacity = 0.8;
    }
    // calculating offset distance so that we can translate according to the image position
    const xOffset = distance * (imgWidth * 0.6 + gap) - center; //multiplied by 0.6 so that images are partially overlapped

    // setting different styles to images according to their positions
    img.style.transform = `translateX(${xOffset}px) translateY(-50%) scale(${scale})`;
    img.style.zIndex = zIndex;
    img.style.opacity = opacity;
    img.style.filter = `blur(${blur})`;
  });
  // setting image background to the page
  bgOverlay.style.opacity = 0.9;
  setTimeout(() => {
    bgOverlay.style.backgroundImage = `url(${images[currentIndex].src})`;
    bgOverlay.style.backgroundSize = "cover";
    bgOverlay.style.backgroundPosition = "center";
    bgOverlay.style.opacity = 1;
  }, 250);
}

nextBtn.addEventListener("click", () => {
  if (isAnimating) return; //prevent click while transition
  isAnimating = true;
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  setTimeout(() => {
    isAnimating = false;
  }, 500);
});

prevBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
  setTimeout(() => {
    isAnimating = false;
  }, 500);
});

// Auto-slide every 3 seconds
let autoSlide = setInterval(() => {
  if (isAnimating) return; // skip if user is clicking
  isAnimating = true;
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  setTimeout(() => {
    isAnimating = false;
  }, 500);
}, 3000);

//stop auto slide if hovered over the container
container.addEventListener("mouseenter", () => clearInterval(autoSlide));
container.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
    setTimeout(() => (isAnimating = false), 500);
  }, 3000);
});

//drag functionality

window.addEventListener("dragstart", (e) => e.preventDefault()); // prevent default browswer drag behaviour

// console.log("startX", startX);
carousel.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
});

// images.forEach((img) => {
//   img.addEventListener("dragstart", (e) => e.preventDefault());
// });

carousel.addEventListener("mouseup", (e) => {
  isDragging = false;
  const diff = e.clientX - startX;
  // console.log("diff", diff);

  if (diff > 50) {
    // dragged to the right
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else if (diff < -50) {
    // dragged to the left
    currentIndex = (currentIndex + 1) % images.length;
  }
  updateCarousel();
});

// for laptop touchpad
carousel.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    // clear preevious update
    clearTimeout(wheelTimeout);

    wheelTimeout = setTimeout(() => {
      if (e.deltaY < 0 || e.deltaX < 0)
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      else currentIndex = (currentIndex + 1) % images.length;

      updateCarousel();
    }, 200); // wait 200ms after last wheel event before updating
  },
  { passive: false }
);
