import AbstractComponent from "./abstract-component";

const createFilmsListTitleMarkup = (existFilms) => {
  const existText = `All movies. Upcoming`;
  const noFilmText = `There are no movies in our database`;
  return `<h2 class="films-list__title ${existFilms.length > 0 ? `visually-hidden` : `` }">${existFilms ? existText : noFilmText}</h2>`;
};

const createFilmsListTemplate = (existFilms) => {
  return `<section class="films">
    <section class="films-list">
      ${createFilmsListTitleMarkup(existFilms)}
    </section>
  </section>`;
};

export default class FilmsList extends AbstractComponent {
  constructor(existFilms) {
    super();
    this._existFilms = existFilms;
  }

  getTemplate() {
    return createFilmsListTemplate(this._existFilms);
  }
}
