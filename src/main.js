import {templateUserProfile} from './components/user-profile';
import {templateNavigate} from './components/navigate';
import {temlateFilter} from './components/filter';
import {templateFilmCard} from './components/film-card';
import {templateFilmsList} from './components/film-list';
import {templateBtnMore} from './components/btn-more';
import {templateFilmPopup} from './components/film-popup';
import {generateFilm, generateFilms} from './mock/film';
import {generateNavigate} from './mock/navigate';
import {templateFooterStatistic} from './components/footer-statistic';
import {generateUserRating} from './mock/user-rating';

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
const COUNT_EXTRA_FILMS = 2;
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

const ALL_FILMS = generateFilms(COUNT_FILMS);

render(header, templateUserProfile(generateUserRating(ALL_FILMS)));
render(main, templateNavigate(generateNavigate(ALL_FILMS)));
render(main, temlateFilter());
render(main, templateFilmsList());

const filmContainer = document.querySelector(`.films-list .films-list__container`);

const createFilms = (count) => {
  const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
  const start = (itaration * SHOWING_FILMS_COUNT_ON_ITERATION);
  const end = start + count;
  ALL_FILMS.slice(start, end).forEach((film) => {
    render(filmContainer, templateFilmCard(film));
  });
  filmsOnList += count;
};

createFilms(filmsOnList);


const filmList = document.querySelector(`.films-list`);

render(filmList, templateBtnMore());

const extraFilmsContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);

[...extraFilmsContainer].forEach((container) => {
  [...new Array(COUNT_EXTRA_FILMS)].forEach(() => render(container, templateFilmCard(generateFilm())));
});

const body = document.querySelector(`body`);

const footer = document.querySelector(`.footer`);
render(footer, templateFooterStatistic(COUNT_FILMS));

render(body, templateFilmPopup(generateFilm()));

const loadMoreButton = main.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  let balanseFilms = COUNT_FILMS - filmsOnList;
  if (balanseFilms) {
    if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
      createFilms(SHOWING_FILMS_COUNT_ON_ITERATION);
    } else {
      createFilms(balanseFilms);
      loadMoreButton.remove();
    }
  }
});

