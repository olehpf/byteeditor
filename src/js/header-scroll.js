// Script to animate header transition when scrolling
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header.fixed-top');
  const navContainer = header?.querySelector('.container-fluid');
  
  if (header && navContainer) {
    // Initial state with larger margin
    let isScrolled = false;
    const initialMargin = 'mt-5';
    const scrolledMargin = 'mt-0';
    
    // Transition timing
    header.style.transition = 'margin-top 200ms ease';
    navContainer.style.transition = 'background-color 200ms ease, border 200ms ease, box-shadow 200ms ease';
    
    // Initial transparent state
    navContainer.classList.remove('bg-dark');
    navContainer.style.border = 'none';
    navContainer.style.boxShadow = 'none';
    
    // Scroll event handler
    window.addEventListener('scroll', function() {
      // If we've scrolled down and the state hasn't been changed yet
      if (window.scrollY > 10 && !isScrolled) {
        // Change margin
        header.classList.remove(initialMargin);
        header.classList.add(scrolledMargin);
        
        // Add background and border effects
        navContainer.classList.add('bg-dark');
        navContainer.style.border = '1px solid rgba(255, 255, 255, 0.08)';
        navContainer.style.boxShadow = '0 1px 4px 0 rgba(33, 37, 41, 0.24)';
        
        isScrolled = true;
      } 
      // If we're at the top and state needs to be restored
      else if (window.scrollY <= 10 && isScrolled) {
        // Restore margin
        header.classList.remove(scrolledMargin);
        header.classList.add(initialMargin);
        
        // Remove background and border effects
        navContainer.classList.remove('bg-dark');
        navContainer.style.border = 'none';
        navContainer.style.boxShadow = 'none';
        
        isScrolled = false;
      }
    });
    
    // Initial check to set the correct state on page load
    if (window.scrollY > 10) {
      header.classList.remove(initialMargin);
      header.classList.add(scrolledMargin);
      navContainer.classList.add('bg-dark');
      navContainer.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      navContainer.style.boxShadow = '0 1px 4px 0 rgba(33, 37, 41, 0.24)';
      isScrolled = true;
    }
  }
}); 