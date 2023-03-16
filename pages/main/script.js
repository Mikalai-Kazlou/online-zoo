// -----------------------------------------------------------------------------------
// Testimonials popover
// -----------------------------------------------------------------------------------

const tPopover = document.querySelector(".testimonials-popover");
const tPopoverContent = document.querySelector(".popover-content");
const tCards = document.querySelectorAll(".testimonials-card-background");

function showTestimonialsPopover(event) {
  if (document.documentElement.clientWidth > 980) return;

  const card = event.currentTarget.cloneNode(true);
  tPopoverContent.append(card);

  body.classList.toggle("no-scroll");
  tPopover.classList.toggle("hidden");
}

function closeTestimonialsPopover(event) {
  if (event.target.classList.contains("popover-wrapper")) return;

  tPopover.classList.toggle("hidden");
  body.classList.toggle("no-scroll");

  tPopoverContent.innerHTML = "";
}

tCards.forEach((card) => card.addEventListener("click", showTestimonialsPopover));
tPopover.addEventListener("click", closeTestimonialsPopover);

// -----------------------------------------------------------------------------------
// Testimonials carusel
// -----------------------------------------------------------------------------------

import TestimonialsCarusel from '../../assets/modules/testimonialsCarusel.js';

const tScroll = document.querySelector('input[type="range"]');
const tCardsContainer = document.querySelector('.testimonials-card-container');

function getTestimonialsCaruselParameters() {
  const result = {};

  switch (true) {
    case document.documentElement.clientWidth > 1440:
      result.maxScroll = 7;
      result.cardContainerWidth = 1160;
      result.cardWidth = 268;
      result.cardCountOnPage = 4;
      break;
    case document.documentElement.clientWidth > 980:
      result.maxScroll = 8;
      result.cardContainerWidth = 940;
      result.cardWidth = 293;
      result.cardCountOnPage = 3;
      break;
  }

  return result;
}

const tParameters = getTestimonialsCaruselParameters();
const tCarusel = new TestimonialsCarusel(tCards, tCardsContainer, tScroll, tParameters);

// -----------------------------------------------------------------------------------
// Pets carusel
// -----------------------------------------------------------------------------------

import petsList from '../../assets/modules/petsList.js';

let petsCards = document.querySelectorAll('.pets-card');
const buttons = document.querySelectorAll('.round-button');

const btL1 = document.querySelector('.round-button.button-left');
const btR1 = document.querySelector('.round-button.button-right');

const btL2 = document.querySelector('.round-button.button-center-left');
const btR2 = document.querySelector('.round-button.button-center-right');

let isEnabled = true;

function getRandomNumber() {
  return Math.floor(Math.random() * petsList.length);
}

function getRandomSet() {
  const numbers = [];

  while (numbers.length < petsCards.length) {
    let number = getRandomNumber();
    while (numbers.includes(number)) {
      number = getRandomNumber();
    }
    numbers.push(number);
  }

  return numbers;
}

function changeCurrentItems() {
  const numbers = getRandomSet();

  petsCards = document.querySelectorAll('.pets-card.clone');
  for (let i = 0; i < petsCards.length; i++) {
    let card = petsCards[i];
    let data = petsList[numbers[i]];

    card.querySelector('.pets-name').textContent = data.name;
    card.querySelector('.pets-area').textContent = data.area;

    card.querySelector('.pets-hidden-name').textContent = data.name;
    card.querySelector('.pets-hidden-area').textContent = data.area;

    card.querySelector('.pets-card-photo').src = data.image;
    card.querySelector('.pets-card-photo').alt = data.name;

    card.querySelector('.pets-type').src = data.typeImage;
    card.querySelector('.pets-type').alt = data.type;
  }
}

function hideItems(direction) {
  isEnabled = false;
  buttons.forEach((button) => button.classList.add('disabled'));

  petsCards = document.querySelectorAll('.pets-card');
  petsCards.forEach((item) => {
    item.classList.add(direction);

    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    item.parentElement.append(clone);

    clone.addEventListener('animationend', function () {
      this.classList.remove(direction);
      item.remove();
    }, { once: true });
  });
}

function showItems(direction) {
  petsCards = document.querySelectorAll('.pets-card.clone');
  petsCards.forEach((item) => {
    item.classList.add(direction);

    item.addEventListener('animationend', function () {
      this.classList.remove(direction);
      this.classList.remove('clone');
      buttons.forEach((button) => button.classList.remove('disabled'));
      isEnabled = true;
    }, { once: true });
  });
}

function moveRight() {
  hideItems('hide-right');
  changeCurrentItems();
  showItems('show-right');
}

function moveLeft() {
  hideItems('hide-left');
  changeCurrentItems();
  showItems('show-left');
}

function initializePetsContainer() {
  if (document.documentElement.clientWidth <= 980) {
    const cardsToRemove = document.querySelectorAll('.pets-card-wrapper.pets-card-hidden');
    cardsToRemove.forEach((card) => card.remove());
  }
}

initializePetsContainer();

btL1.addEventListener("click", () => { if (isEnabled) moveLeft(); });
btL2.addEventListener("click", () => { if (isEnabled) moveLeft(); });

btR1.addEventListener("click", () => { if (isEnabled) moveRight(); });
btR2.addEventListener("click", () => { if (isEnabled) moveRight(); });

// -----------------------------------------------------------------------------------
// Global
// -----------------------------------------------------------------------------------

function onResizeWindow() {
  const tParameters = getTestimonialsCaruselParameters();
  if (tParameters.cardCountOnPage !== tCarusel.parameters.cardCountOnPage) {
    tCarusel.initialize(tParameters);
  }
}

window.addEventListener("resize", onResizeWindow, false);