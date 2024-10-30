const numberOfStars = 100; // Number of stars
    const body = document.body;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize size
        const size = Math.random() * 5 + 2; // Size between 2px and 7px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Randomize position
        star.style.left = `${Math.random() * 100}vw`; // 0% to 100% of the viewport width
        star.style.top = `${Math.random() * 100}vh`; // 0% to 100% of the viewport height

        // Randomize animation direction
        if (Math.random() > 0.5) {
            star.style.animationName = 'move_right';
        } else {
            star.style.animationName = 'move_left';
        }

        // Randomize animation duration
        star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Between 2s and 5s

        body.appendChild(star);
	}

//for scrolling

document.querySelectorAll('.nav-item a').forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const targetClass = link.getAttribute('data-scroll');
		const targetSection = document.querySelector(targetClass);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: 'smooth' });
		}
	});
});
