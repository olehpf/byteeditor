document.querySelectorAll(".accordion-button").forEach((btn) => {
  btn.addEventListener("click", function () {
    setTimeout(() => {
      document.querySelectorAll(".accordion-button").forEach((b) => {
        const iconPlus = b.querySelector(".icon-plus");
        const iconMinus = b.querySelector(".icon-minus");
        if (b.classList.contains("collapsed")) {
          iconPlus && iconPlus.classList.remove("d-none");
          iconMinus && iconMinus.classList.add("d-none");
        } else {
          iconPlus && iconPlus.classList.add("d-none");
          iconMinus && iconMinus.classList.remove("d-none");
        }
      });
    }, 100); 
  });
});
