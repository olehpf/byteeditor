/* This JavaScript code snippet is setting up an event listener for click events on elements with the
class name "accordion-button". When a click event occurs on any of these elements, the code runs a
function that includes a setTimeout function with a delay of 100 milliseconds. Inside the setTimeout
function, it iterates over all elements with the class name "accordion-button" again, and for each
element, it checks if it has the class "collapsed". Depending on whether the element has the class
"collapsed" or not, it toggles the visibility of elements with the class "icon-plus" and
"icon-minus" by adding or removing the class "d-none" (which typically hides the element). */

// Select all elements with the class name "accordion-button"
document.querySelectorAll(".accordion-button").forEach((btn) => {
  // Add an event listener to each "accordion-button" element
  btn.addEventListener("click", function () {
    // Set a timeout to delay the execution of the following code
    setTimeout(() => {
      document.querySelectorAll(".accordion-button").forEach((b) => {
        // Select the "icon-plus" and "icon-minus" elements within the current "accordion-button" element
        const iconPlus = b.querySelector(".icon-plus");
        const iconMinus = b.querySelector(".icon-minus");
        // Check if the current "accordion-button" element has the class "collapsed"
        if (b.classList.contains("collapsed")) {
          // If the element has the class "collapsed", show the "icon-plus" element and hide the "icon-minus" element
          iconPlus && iconPlus.classList.remove("d-none");
          iconMinus && iconMinus.classList.add("d-none");
        } else {
          // If the element does not have the class "collapsed", show the "icon-plus" element and hide the "icon-minus" element
          iconPlus && iconPlus.classList.add("d-none");
          iconMinus && iconMinus.classList.remove("d-none");
        }
      });
    }, 100); // 100 milliseconds delay
  });
});
