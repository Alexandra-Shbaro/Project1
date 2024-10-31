let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
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

document.getElementById("play").onclick = function () {
  const nameInput = document.getElementById("nameInput").value;
  const errorMessage = document.getElementById("errorMessage");

  let selectedCharacter = "";
  slides.forEach(slide => {
    if (slide.style.display === 'block') { 
      selectedCharacter = slide.querySelector("p").textContent.trim(); 
    }
  });

  if (nameInput.trim() === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";

    // Redirect to the new page with parameters
    const url = `game.html?username=${encodeURIComponent(nameInput)}&character=${encodeURIComponent(selectedCharacter)}`;
    window.location.href = url;
  }
};

// Show the first slide initially
showSlide(currentSlide);

// Code to update the welcome message in game.html
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const welcomeMessageElement = document.getElementById('welcomeMessage');
const username = getQueryParam('username');

// If we're on game.html and welcomeMessage exists, update it
if (welcomeMessageElement && username) {
  welcomeMessageElement.textContent = `Welcome, ${username}`;
}
