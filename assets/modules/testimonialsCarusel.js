export default class TestimonialsCarusel {
  constructor(cards, container, scroll, parameters) {
    this.cards = cards;
    this.container = container;

    this.scroll = scroll;
    this.scroll.addEventListener("input", () => this.shift());

    this.initialize(parameters);
  }

  initialize(parameters) {
    this.parameters = parameters;
    this.container.style.marginLeft = '0';

    if (Object.keys(this.parameters).length === 0) {
      this.container.style.width = 'auto';
      return;
    }

    this.scroll.value = 0;
    this.scroll.max = this.parameters.maxScroll;

    const cardGapsOnPage = this.parameters.cardContainerWidth - (this.parameters.cardCountOnPage * this.parameters.cardWidth);
    this.parameters.cardGap = cardGapsOnPage / (this.parameters.cardCountOnPage - 1);

    this.container.style.width =
      `${this.cards.length * this.parameters.cardWidth + (this.cards.length - 1) * this.parameters.cardGap}px`;
  }

  shift() {
    this.container.style.marginLeft = `${-this.scroll.value * (this.parameters.cardWidth + this.parameters.cardGap)}px`;
  }
}