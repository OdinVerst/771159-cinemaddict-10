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
import {render, remove} from "./utils/render";
import {getTopFilms} from "./utils/common";
import FilmsExtraList from "./components/film-extra-list";
import FilmPopup from "./components/film-popup";
import FilmsContainer from "./components/films-container";

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
const ALL_FILMS = generateFilms(COUNT_FILMS);
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

render(headerElement, new UserProfile(generateUserRating(ALL_FILMS)).getElement());
render(mainElement, new Navigate(generateNavigate(ALL_FILMS)).getElement());
render(mainElement, new Filter().getElement());
render(mainElement, new FilmsList(ALL_FILMS.length).getElement());

if (ALL_FILMS.length) {
  const filmsListElement = mainElement.querySelector(`.films-list`);

  render(filmsListElement, new FilmsContainer().getElement());

  const filmContainer = filmsListElement.querySelector(`.films-list__container`);

  const createFilm = (container, film) => {
    const filmComponent = new FilmCard(film);
    const filmElements = {
      poster: `.film-card__poster`,
      titleFilm: `.film-card__title`,
      commentsFilm: `.film-card__comments`
    };

    const filmPopupComponent = new FilmPopup(film);
    const closeBtn = `.film-details__close-btn`;
    const popupContainer = document.querySelector(`body`);

    const removePopupFilm = () => {
      remove(filmPopupComponent);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        removePopupFilm();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const setListner = (selector) => {
      filmComponent.setFilmClickHandler(() => {
        render(popupContainer, filmPopupComponent.getElement());
        filmPopupComponent.setFilmPopupClickHandler(removePopupFilm, closeBtn);
        document.addEventListener(`keydown`, onEscKeyDown);
      }, selector);
    };

    Object.values(filmElements).forEach((element)=> setListner(element));

    render(container, filmComponent.getElement());
  };

  const renderFilms = (count) => {
    const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
    const start = (itaration * SHOWING_FILMS_COUNT_ON_ITERATION);
    const end = start + count;
    ALL_FILMS.slice(start, end).forEach((film) => {
      createFilm(filmContainer, film);
    });
    filmsOnList += count;
  };

  const renderExtraFilms = (container, films, nameList) => {
    if (films.length) {
      const filmsExtraListComponents = new FilmsExtraList(nameList);
      render(container, filmsExtraListComponents.getElement());
      const filmListContainer = filmsExtraListComponents.getElement().querySelector(`.films-list__container`);
      films.forEach((film) => {
        createFilm(filmListContainer, film);
      });
    }
  };

  renderFilms(filmsOnList);

  const extraFilmsContainer = document.querySelector(`.films`);
  const topCommentsFilms = getTopFilms(ALL_FILMS, `comments`);
  const topRatingFilms = getTopFilms(ALL_FILMS, `rating`);

  renderExtraFilms(extraFilmsContainer, topRatingFilms, `Top rated`);
  renderExtraFilms(extraFilmsContainer, topCommentsFilms, `Most commented`);

  const btnMoreComponent = new BtnMore();
  render(filmsListElement, btnMoreComponent.getElement());
  btnMoreComponent.setBtnMoreClickHandler(() => {
    let balanseFilms = COUNT_FILMS - filmsOnList;
    if (balanseFilms) {
      if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
        renderFilms(SHOWING_FILMS_COUNT_ON_ITERATION);
      } else {
        renderFilms(balanseFilms);
        remove(btnMoreComponent);
      }
    }
  });
}

const footerElemet = document.querySelector(`.footer`);
render(footerElemet, new FooterStatistic(COUNT_FILMS).getElement());

