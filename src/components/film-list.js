import {createElement} from "../utils";

const createFilmsListTitleMarkup = (existFilms) => {
  const existText = `All movies. Upcoming`;
  const noFilmText = `There are no movies in our database`;
  return `<h2 class="films-list__title ${existFilms ? `visually-hidden` : `` }">${existFilms ? existText : noFilmText}</h2>`;
};

const createFilmsListTemplate = (existFilms) => {
  return `<section class="films">
    <section class="films-list">
      ${createFilmsListTitleMarkup(existFilms)}
    </section>
  </section>`;
};

export default class FilmsList {
  constructor(existFilms) {
    this._element = null;
    this._existFilms = existFilms;
  }

  getTemplate() {
    return createFilmsListTemplate(this._existFilms);
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
