// Auto-scroll reviews with infinite loop
const carousel = document.querySelector(".carousel");
const reviews = document.querySelectorAll(".review");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 2; // Start with the middle review
let autoScrollInterval;

function updateCarousel() {
  // Remove all active classes
  reviews.forEach(review => review.classList.remove("active"));
  
  // Calculate the middle index (current) and adjacent indices
  const middleIndex = currentIndex;
  const prevIndex = (middleIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (middleIndex + 1) % reviews.length;
  
  // Set active class to the middle review
  reviews[middleIndex].classList.add("active");
  
  // Set adjacent reviews to visible but inactive
  reviews[prevIndex].style.opacity = "0.3";
  reviews[nextIndex].style.opacity = "0.3";
  
  // Hide all other reviews
  reviews.forEach((review, index) => {
    if (index !== middleIndex && index !== prevIndex && index !== nextIndex) {
      review.style.opacity = "0";
    }
  });
  
  // Calculate transform value to center the active review
  const itemWidth = reviews[0].offsetWidth + 30; // width + gap
  const transformValue = -currentIndex * itemWidth + (carousel.offsetWidth / 2 - itemWidth / 2);
  carousel.style.transform = `translateX(${transformValue}px)`;
}

function nextReview() {
  currentIndex = (currentIndex + 1) % reviews.length;
  updateCarousel();
}

function prevReview() {
  currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  updateCarousel();
}

function startAutoScroll() {
  autoScrollInterval = setInterval(nextReview, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Initialize carousel
updateCarousel();
startAutoScroll();

// Button event listeners
nextBtn.addEventListener("click", () => {
  stopAutoScroll();
  nextReview();
  startAutoScroll();
});

prevBtn.addEventListener("click", () => {
  stopAutoScroll();
  prevReview();
  startAutoScroll();
});

// Pause auto-scroll on hover
carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

// Dark mode toggle
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Scroll arrow buttons
const sections = document.querySelectorAll('.section');
let sectionIndex = 0;

document.getElementById('scroll-down').addEventListener('click', () => {
  if (sectionIndex < sections.length - 1) {
    sectionIndex++;
    sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
  }
});

document.getElementById('scroll-up').addEventListener('click', () => {
  if (sectionIndex > 0) {
    sectionIndex--;
    sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
  }
});

document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach((section, i) => {
    if (section.offsetTop <= scrollY + 100) {
      sectionIndex = i;
    }
  });
});