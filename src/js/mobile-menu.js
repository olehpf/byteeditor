/* This JavaScript code snippet is responsible for handling the behavior of a Bootstrap navbar. Here's
a breakdown of what the code is doing: */

// Import bootstrap
import * as bootstrap from 'bootstrap';

// When the DOM is loaded, execute the following code:
document.addEventListener("DOMContentLoaded", function () {
  // Select the navbar collapse element
  const navbarCollapse = document.querySelector(".navbar-collapse");
  // Select the navbar toggler element
  const navbarToggler = document.querySelector(".navbar-toggler");
  // Select all nav links within the navbar collapse
  const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");

  // Add an event listener to the document for clicks
  document.addEventListener("click", function (event) {
    // Check if the click is inside the navbar collapse
    const isClickInsideMenu = navbarCollapse.contains(event.target);
    // Check if the click is on the navbar toggler
    const isClickOnToggler = navbarToggler.contains(event.target);
    // Check if the menu is currently shown
    const isMenuShown = navbarCollapse.classList.contains("show");

    if (!isClickInsideMenu && !isClickOnToggler && isMenuShown) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });

  // Add an event listener to each nav link
  navLinks.forEach(function (link) {
    // When a nav link is clicked, execute the following code:
    link.addEventListener("click", function () {
      // Get the Bootstrap collapse instance for the navbar
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      // If the collapse instance exists, hide it
      if (bsCollapse) bsCollapse.hide();
    });
  });
});
