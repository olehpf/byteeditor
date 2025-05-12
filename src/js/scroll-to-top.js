// Get the back to top button
const backToTopButton = document.getElementById('to-top');

// Add click event listener
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}