import {createElement} from "../utils";

const createFooterStatisticTemplate = (count) => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class FooterStatistic {
  constructor(countFilms) {
    this._element = null;
    this._countFilms = countFilms;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._countFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
