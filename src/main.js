
import UserProfile from "./components/user-profile";
import Navigate from "./components/navigate";
import Filter from "./components/filter";
import FilmsList from "./components/film-list";
import FilmCard from "./components/film-card";
import BtnMore from "./components/btn-more";
import FooterStatistic from "./components/footer-statistic";
import {generateFilms} from './mock/film';
import {generateNavigate} from './mock/navigate';
import {generateUserRating} from './mock/user-rating';
import {render, RenderPosition, getTopFilms} from "./utils";
import FilmsExtraList from "./components/film-extra-list";

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

const ALL_FILMS = generateFilms(COUNT_FILMS);

render(headerElement, new UserProfile(generateUserRating(ALL_FILMS)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Navigate(generateNavigate(ALL_FILMS)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Filter().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsList().getElement(), RenderPosition.BEFOREEND);

const filmContainer = document.querySelector(`.films-list .films-list__container`);

const createFilms = (count) => {
  const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
  const start = (itaration * SHOWING_FILMS_COUNT_ON_ITERATION);
  const end = start + count;
  ALL_FILMS.slice(start, end).forEach((film) => {
    render(filmContainer, new FilmCard(film).getElement(), RenderPosition.BEFOREEND);
  });
  filmsOnList += count;
};

const createExtraFilms = (container, films, nameList) => {
  if (films) {
    const filmsExtraListComponents = new FilmsExtraList(nameList);
    render(container, filmsExtraListComponents.getElement(), RenderPosition.BEFOREEND);
    topRatingFilms.slice(0, 2).forEach((film) => {
      render(filmsExtraListComponents.getElement().querySelector(`.films-list__container`), new FilmCard(film).getElement(), RenderPosition.BEFOREEND);
    });
  }
}

createFilms(filmsOnList);


const filmListElement = document.querySelector(`.films-list`);

const btnMoreComponent = new BtnMore();
render(filmListElement, btnMoreComponent.getElement(), RenderPosition.BEFOREEND);

const extraFilmsContainer = document.querySelector(`.films`);

const topCommentsFilms = getTopFilms(ALL_FILMS, `comments`);
const topRatingFilms = getTopFilms(ALL_FILMS, `rating`);

createExtraFilms(extraFilmsContainer, topCommentsFilms, `Top rated`);
createExtraFilms(extraFilmsContainer, topRatingFilms, `Most commented`);

const footerElemet = document.querySelector(`.footer`);
render(footerElemet, new FooterStatistic(COUNT_FILMS).getElement(), RenderPosition.BEFOREEND);

btnMoreComponent.getElement().addEventListener(`click`, () => {
  let balanseFilms = COUNT_FILMS - filmsOnList;
  if (balanseFilms) {
    if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
      createFilms(SHOWING_FILMS_COUNT_ON_ITERATION);
    } else {
      createFilms(balanseFilms);
      btnMoreComponent.getElement().remove();
      btnMoreComponent.removeElement();
    }
  }
});

