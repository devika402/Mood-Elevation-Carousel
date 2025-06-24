const carousel = document.getElementById("carousel");
const dotsContainer = document.getElementById("dots");
const totalSlides = 10;

let currentSlide = 0;
let slides = [];

const quotes = [
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Push yourself, because no one else is going to do it for you.",
  "Success is what comes after you stop making excuses.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream it. Wish it. Do it.",
  "Great things never come from comfort zones.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Little things make big days.",
  "You don’t have to be great to start, but you have to start to be great.",
  "It always seems impossible until it’s done. — Nelson Mandela"
];

function getQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  return quotes[random];
}

function getImageUrl(index) {
  return `https://picsum.photos/960/500?random=${index}`;
}

function createSlides() {
  for (let i = 0; i < totalSlides; i++) {
    const imgUrl = getImageUrl(i);
    const quote = getQuote();

    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <img src="${imgUrl}" alt="random image" />
      <div class="caption">${quote}</div>
    `;
    carousel.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);

    slides.push(slide);
  }

  updateCarousel();
  document.getElementById("loading").style.display = "none";
  document.querySelector(".carousel-container").style.display = "block";
  setInterval(nextSlide, 5000); 
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) =>
    dot.classList.toggle("active", index === currentSlide)
  );
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("prev").addEventListener("click", prevSlide);

// 👉 Swipe support for mobile
let startX = 0;
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
});

createSlides();
