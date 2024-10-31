document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Function to create stars based on screen width
    function createStars() {
        const numberOfStars = window.innerWidth <= 991 ? 50 : 100; // 50 for tablets/mobiles, 100 otherwise

        // Clear existing stars to avoid duplication
        document.querySelectorAll('.star').forEach(star => star.remove());

        // Create stars background
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Randomize size
            const size = Math.random() * 5 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.position = "fixed";

            // Randomize position
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;

            // Randomize animation direction
            star.style.animationName = Math.random() > 0.5 ? 'move_right' : 'move_left';

            // Random animation duration
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;

            body.appendChild(star);
        }
    }

    // Initial call to create stars based on current screen width
    createStars();

    // Adjust stars dynamically on window resize
    window.addEventListener('resize', createStars);

    // Toggle mobile navbar
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNavbar = document.querySelector('.mobile-navbar');

    burgerMenu.addEventListener('click', () => {
        mobileNavbar.classList.toggle('open');
        burgerMenu.classList.toggle('open');
    });

    // Close the mobile navbar when a link is clicked
    document.querySelectorAll('.mobile-navbar .nav-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNavbar.classList.remove('open');
            burgerMenu.classList.remove('open');
        });
    });

    // Smooth scroll for nav links
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

    // Smooth scroll for back-to-top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
