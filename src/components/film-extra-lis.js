import {templateFilmCard} from './film-card';
import {createElement} from '../utils';

const createFilmsListMarkup = (films) => films.map((film) =>
  (templateFilmCard(film))).join(``);

const createExtraFilmsTemplate = (title, films) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
      ${createFilmsListMarkup(films)}
    </div>
  </section>`
);

export default class FilmsExtraList {
  constructor(tilte, films) {
    this._element = null;
    this._title = tilte;
    this._films = films;
  }

  getTemplate() {
    return createExtraFilmsTemplate();
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
