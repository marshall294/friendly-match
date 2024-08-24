document.addEventListener('DOMContentLoaded', () => {
    const adPopup = document.getElementById('ad-popup');
    const closeButton = document.getElementById('close-btn');
    const slides = document.querySelectorAll('.slide');

    let slideIndex = 0;

    function showSlides() {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });

        // Show the current slide
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';

        // Change slide every 5 seconds (or adjust to your preference)
        setTimeout(showSlides, 5000);
    }

    // Show the ad popup after 5 seconds
    setTimeout(() => {
        adPopup.style.display = 'block';
        showSlides();

        // Hide the ad popup after 20 seconds
        setTimeout(() => {
            adPopup.style.display = 'none';
        }, 20000);
    }, 5000);

    // Close button functionality
    closeButton.addEventListener('click', () => {
        adPopup.style.display = 'none';
    });
});
