
import {createElement} from '../utils';

const createExtraFilmsTemplate = (title) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsExtraList {
  constructor(tilte) {
    this._element = null;
    this._title = tilte;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._title);
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
