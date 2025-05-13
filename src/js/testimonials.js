// Testimonials pagination with delayed slide change and auto-rotation
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.pagination-indicators .indicator');
    const testimonialCards = document.querySelectorAll('.testimonials-section .testimonial-card');
    let cardsPerPage = 4; // Default for larger screens
    let activePage = 0;
    let isChanging = false;
    let autoRotateInterval;
    
    // Function to determine cards per page based on screen size
    function getCardsPerPage() {
      // For small screens (mobile and tablets)
      if (window.innerWidth < 992) {
        return 3;
      }
      // For larger screens
      return 4;
    }
    
    // Set initial cards per page
    cardsPerPage = getCardsPerPage();
    
    // Calculate the total number of pages
    let totalPages = Math.ceil(testimonialCards.length / cardsPerPage);
    
    // Recalculate on window resize
    window.addEventListener('resize', function() {
      const newCardsPerPage = getCardsPerPage();
      
      // Only update if the cards per page has changed
      if (newCardsPerPage !== cardsPerPage) {
        cardsPerPage = newCardsPerPage;
        totalPages = Math.ceil(testimonialCards.length / cardsPerPage);
        
        // If current active page is beyond new total, adjust it
        if (activePage >= totalPages) {
          activePage = totalPages - 1;
        }
        
        // Update pagination indicators visibility if needed
        updatePaginationIndicators();
        
        // Reinitialize testimonials with new page size
        initializeTestimonials();
        
        console.log(`Screen resized: ${cardsPerPage} cards per page, ${totalPages} total pages`);
      }
    });
    
    // Function to update pagination indicators
    function updatePaginationIndicators() {
      // Hide all indicators first
      indicators.forEach((indicator, index) => {
        if (index < totalPages) {
          indicator.classList.remove('d-none');
        } else {
          indicator.classList.add('d-none');
        }
      });
      
      // Ensure the active indicator is correct
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activePage);
      });
    }
    
    // Function to initialize the visibility of cards
    function initializeTestimonials() {
      // Hide all cards except the first cardsPerPage
      testimonialCards.forEach((card, index) => {
        const cardElement = card.closest('.col-12');
        // Show cards for the current active page
        const startIndex = activePage * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, testimonialCards.length);
        
        if (index >= startIndex && index < endIndex) {
          cardElement.classList.remove('d-none');
          cardElement.classList.add('active-testimonial');
          cardElement.style.opacity = '1';
          cardElement.style.transform = 'translateY(0)';
        } else {
          cardElement.classList.add('d-none');
          cardElement.classList.remove('active-testimonial');
        }
      });
      
      // Update pagination indicators
      updatePaginationIndicators();
    }
    
    // Function to change the active page
    function changePage(newPage) {
      // Ensure circularity: if newPage goes beyond the boundaries, return to the beginning
      if (newPage >= totalPages) {
        newPage = 0;
      } else if (newPage < 0) {
        newPage = totalPages - 1;
      }
      
      if (isChanging || newPage === activePage) return;
      isChanging = true;
  
      // Change the active indicator
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === newPage);
      });
      
      // Add class for the disappearance animation
      const activeCards = document.querySelectorAll('.active-testimonial');
      activeCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
      });
      
      // Wait 1 second for the disappearance animation to complete
      setTimeout(() => {
        // Hide the current active cards
        activeCards.forEach((card) => {
          card.classList.add('d-none');
          card.classList.remove('active-testimonial');
        });
        
        // Show new cards with initial opacity 0
        const startIndex = newPage * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, testimonialCards.length);
        
        for (let i = startIndex; i < endIndex; i++) {
          const cardElement = testimonialCards[i].closest('.col-12');
          cardElement.classList.remove('d-none');
          cardElement.classList.add('active-testimonial');
          cardElement.style.opacity = '0';
          cardElement.style.transform = 'translateY(16px)';
        }
        
        // Wait 50ms for DOM updates
        setTimeout(() => {
          // Animate the appearance of new cards
          document.querySelectorAll('.active-testimonial').forEach((card) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          
          // Update the active page
          activePage = newPage;
          
          // After 0.5 second of the appearance animation, remove the blocking
          setTimeout(() => {
            isChanging = false;
          }, 500);
        }, 50);
      }, 1000);
    }
    
    // Function to start auto-rotation
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        // Always switch to the next page with circular return to the beginning
        let nextPage = activePage + 1;
        if (nextPage >= totalPages) {
          nextPage = 0;
        }
        changePage(nextPage);
      }, 4000); // 4 seconds between slides
    }
    
    // Function to pause auto-rotation
    function pauseAutoRotate() {
      clearInterval(autoRotateInterval);
    }
    
    // Function to resume auto-rotation
    function resumeAutoRotate() {
      pauseAutoRotate(); // First clear the existing interval
      startAutoRotate();
    }
    
    // Add event handlers for indicators
    if (indicators.length && testimonialCards.length) {
      // Initialize CSS styles for the animation
      const style = document.createElement('style');
      style.textContent = `
        .testimonials-section .col-12 {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
      `;
      document.head.appendChild(style);
      
      // Initialize the cards
      initializeTestimonials();
      
      // Add event handlers for indicators
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          changePage(index);
          // Pause and resume auto-rotation on click
          pauseAutoRotate();
          // Resume auto-rotation after interactive view time
          setTimeout(resumeAutoRotate, 8000);
        });
      });
      
      // Add event handlers for hover on testimonials section
      const testimonialsSection = document.querySelector('.testimonials-section');
      if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', pauseAutoRotate);
        testimonialsSection.addEventListener('mouseleave', resumeAutoRotate);
      }
      
      // Automatically start auto-rotation when the page loads
      // with a small delay to initially show the first testimonials
      setTimeout(startAutoRotate, 1000);
      
      // Console log for debugging
      console.log(`Testimonials initialized with ${testimonialCards.length} cards across ${totalPages} pages.`);
    }
  });
  