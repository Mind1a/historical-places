// dropdowns
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const arrow = btn.querySelector("img");
    const dropdownContent = btn.nextElementSibling;

    dropdownContent.classList.toggle("active");
    arrow.classList.toggle("rotate");

    //init slider
    slideMin();
    slideMax();
  });
});

// slider
const minVal = document.querySelector(".min-val");
const maxVal = document.querySelector(".max-val");
const minTooltip = document.querySelector(".min-tooltip");
const maxTooltip = document.querySelector(".max-tooltip");
const minStick = document.querySelector(".min-stick");
const maxStick = document.querySelector(".max-stick");
const range = document.querySelector(".slider-track");
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);
const minGap = 0;

function slideMin() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    minVal.value = parseInt(maxVal.value) - minGap;
  }
  minTooltip.innerHTML = minVal.value;
  setArea();
}

function slideMax() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }
  maxTooltip.innerHTML = maxVal.value;
  setArea();
}

function setArea() {
  const handlerWidth = 27 / minVal.clientWidth;
  const minPercent =
    (minVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue);
  const adjustedMin =
    (minPercent + handlerWidth / 2 - handlerWidth * minPercent) * 100;
  const maxPercent =
    (maxVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue);
  const adjustedMax =
    (maxPercent + handlerWidth / 2 - handlerWidth * maxPercent) * 100;

  range.style.left = adjustedMin - 1 + "%";
  range.style.right = 100 - adjustedMax - 1 + "%";
  minTooltip.style.left = adjustedMin + "%";
  maxTooltip.style.left = adjustedMax + "%";
  minStick.style.left = adjustedMin + "%";
  maxStick.style.left = adjustedMax + "%";
}

minVal.addEventListener("input", slideMin);
maxVal.addEventListener("input", slideMax);

// nav
const searchBtn = document.querySelector(".lang-search-btn");
const searchArea = document.querySelector(".search-area");
const burgerMenuBtn = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

const headerEvents = function (elements) {
  elements.forEach((el) => {
    el.addEventListener("click", () => {
      el.id === "burger"
        ? mobileNav.classList.toggle("inactive")
        : searchArea.classList.toggle("inactive");

      el.innerHTML = `
     <img
      class="${el.id}"
      src=${
        !el.classList.contains("inactive")
          ? `./assets/icons/close-${el.id}.svg`
          : `./assets/icons/${el.id}-icon.svg`
      }
      alt="${el.classList.contains("inactive") ? el.id : `close-${el.id}`}"
    />
    `;

      el.classList.toggle("inactive");
    });
  });
};

headerEvents([burgerMenuBtn, searchBtn]);

document.querySelector(".clear-btn").addEventListener("click", () => {
  const allFormes = document
    .querySelector(".filter-wrapper")
    .querySelectorAll("form");

  allFormes.forEach((el) => el.reset());

  minVal.value = 1200;
  maxVal.value = 2800;

  slideMin();
  slideMax();
});
