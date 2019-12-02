import {templateFilmCard} from './film-card';

const createFilmsListMarkup = (films) => films.map((film) =>
  (templateFilmCard(film))).join(``);

export const templateExtraFilms = (title, films) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
      ${createFilmsListMarkup(films)}
    </div>
  </section>`
);
