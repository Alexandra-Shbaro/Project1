let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
const playButton = document.getElementById('play');
const errorMessage = document.getElementById("errorMessage");

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
  const nameInput = document.getElementById("nameInput").value;
  const errorMessage = document.getElementById("errorMessage");

  if (nameInput.trim() === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    
    // Get the `src` of the chosen character image based on the visible slide
    const chosenCharacterImage = slides[currentSlide].querySelector('img').src;
    
    // Redirect to the game page with username and character as URL parameters
    const url = `./game.html?nameInput=${encodeURIComponent(nameInput)}&character=${encodeURIComponent(chosenCharacterImage)}`;
    window.location.href = "game.html";
  }
});

// Show the first slide initially
showSlide(currentSlide);
