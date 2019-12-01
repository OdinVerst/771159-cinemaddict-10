import {templateUserProfile} from './components/user-profile';
import {templateNavigate} from './components/navigate';
import {temlateFilter} from './components/filter';
import {templateFilmCard} from './components/film-card';
import {templateFilmsList} from './components/film-list';
import {templateBtnMore} from './components/btn-more';
import {templateFilmPopup} from './components/film-popup';
import {generateFilm} from './mock/film';

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, templateUserProfile());
render(main, templateNavigate());
render(main, temlateFilter());
render(main, templateFilmsList());

const filmContainer = document.querySelector(`.films-list .films-list__container`);
const COUNT_FILMS = 5;
const COUNT_EXTRA_FILMS = 2;

[...new Array(COUNT_FILMS)].forEach(() => render(filmContainer, templateFilmCard(generateFilm())));

const filmList = document.querySelector(`.films-list`);

render(filmList, templateBtnMore());

const extraFilmsContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);

[...extraFilmsContainer].forEach((container) => {
  [...new Array(COUNT_EXTRA_FILMS)].forEach(() => render(container, templateFilmCard(generateFilm())));
});

const body = document.querySelector(`body`);

render(body, templateFilmPopup(generateFilm()));

