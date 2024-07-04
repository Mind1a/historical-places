const dropdownBtn = document.querySelectorAll(".dropdown-btn");

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const arrow = btn.querySelector("img");
    const dropdownContent = btn.nextElementSibling;

    dropdownContent.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });
});
