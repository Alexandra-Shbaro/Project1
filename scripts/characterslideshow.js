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

onclick="toggleDiv()"
function toggleDiv() {
  const div = document.getElementById("before-play");
  if (div.style.display === "none") {
    div.style.display = "block"; // Show the div
  } else {
    div.style.display = "none";   // Hide the div
  }
}

document.getElementById("play").onclick = function () {
  const nameInput = document.getElementById("nameInput").value;
  const errorMessage = document.getElementById("errorMessage");

  if (nameInput.trim() === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    console.log("Starting the game for", nameInput);

    console.log("Selected character image source:", slides[currentSlide].querySelector("img").src);
  }
};


// Show the first slide initially
showSlide(currentSlide);
