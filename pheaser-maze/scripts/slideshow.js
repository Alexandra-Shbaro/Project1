let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton'); // Make sure you have this button in your HTML
const playButton = document.getElementById('play');

function showSlide(index) {
  slides.forEach(slide => (slide.style.display = 'none'));
  slides[index].style.display = 'block';
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

nextButton.addEventListener('click', nextSlide);
previousButton.addEventListener('click', previousSlide);

playButton.addEventListener('click', function() {
  const chosenCharacterImage = slides[currentSlide].querySelector('img').src; // Get the source of the image
  // Redirect to the game page with the chosen character as a query parameter
  window.location.href = `pheaserGame.html?character=${encodeURIComponent(chosenCharacterImage)}`;
});

// Show the first slide initially
showSlide(currentSlide);
