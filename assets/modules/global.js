const body = document.querySelector("body");
const header = document.querySelector("header");

const burgerIcon = document.querySelector(".burger-icon");
const navigationMenu = document.querySelector(".navigation-menu");
const background = document.querySelector(".dark-background");

function toggleBurgerMenu() {
  const backgroundIsActive = background.classList.contains("hidden");

  if (backgroundIsActive) {
    background.classList.toggle("hidden");
  }

  body.classList.toggle("no-scroll");
  header.classList.toggle("slide-top");

  setTimeout(() => {
    navigationMenu.classList.toggle("burger-menu");
    header.classList.toggle("slide-top");
  }, 500);

  setTimeout(() => {
    if (!backgroundIsActive) { background.classList.toggle("hidden"); }
  }, 1000);
}

burgerIcon.addEventListener("click", toggleBurgerMenu);
background.addEventListener("click", toggleBurgerMenu);