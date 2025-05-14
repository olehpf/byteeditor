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
  // Select login and contact buttons by their IDs
  const loginButton = document.getElementById("login-button");
  const contactButton = document.getElementById("contact-button");
  // Select menu and close icons
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  // Toggle menu/close icons when navbar is opened/closed
  navbarCollapse.addEventListener('show.bs.collapse', function () {
    menuIcon.classList.add('d-none');
    closeIcon.classList.remove('d-none');
    // Add bg-dark class to navbar container when menu is opened
    document.querySelector('.navbar-collapse').classList.add('bg-dark');
  });

  navbarCollapse.addEventListener('hide.bs.collapse', function () {
    menuIcon.classList.remove('d-none');
    closeIcon.classList.add('d-none');
    // Only remove bg-dark class if we're at the top of the page
    if (window.scrollY === 0) {
      document.querySelector('.navbar-collapse').classList.remove('bg-dark');
    }
  });

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

  // Add an event listener to each nav link, excluding dropdown toggles
  navLinks.forEach(function (link) {
    // When a nav link is clicked, execute the following code:
    link.addEventListener("click", function (event) {
      // Skip if this is a dropdown toggle button
      if (link.getAttribute('data-bs-toggle') === 'dropdown') {
        return;
      }
      
      // Get the Bootstrap collapse instance for the navbar
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      // If the collapse instance exists, hide it
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // Add event listeners for dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
      // Get the Bootstrap collapse instance for the navbar
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      // If the collapse instance exists, hide it
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // Add event listeners to the login and contact buttons
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  }

  if (contactButton) {
    contactButton.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  }
});