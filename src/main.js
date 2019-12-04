
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
import FilmPopup from "./components/film-popup";
import FilmsContainer from "./components/films-container";

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

const ALL_FILMS = generateFilms(COUNT_FILMS);

render(headerElement, new UserProfile(generateUserRating(ALL_FILMS)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Navigate(generateNavigate(ALL_FILMS)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Filter().getElement(), RenderPosition.BEFOREEND);

render(mainElement, new FilmsList(ALL_FILMS).getElement(), RenderPosition.BEFOREEND);

if (ALL_FILMS.length) {
  const filmsListElement = mainElement.querySelector(`.films-list`);

  render(filmsListElement, new FilmsContainer().getElement(), RenderPosition.BEFOREEND);

  const filmContainer = filmsListElement.querySelector(`.films-list__container`);

  const createFilm = (container, film) => {
    const filmComponent = new FilmCard(film);
    const filmPopupComponent = new FilmPopup(film);
    const popupContainer = document.querySelector(`body`);

    const removePopupFilm = () => {
      popupContainer.removeChild(filmPopupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        removePopupFilm();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
    const titleFilm = filmComponent.getElement().querySelector(`.film-card__title`);
    const commentsFilm = filmComponent.getElement().querySelector(`.film-card__comments`);

    const closeBtn = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);

    const getListner = (item) => {
      item.addEventListener(`click`, () => {
        render(popupContainer, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    };

    closeBtn.addEventListener(`click`, removePopupFilm);

    getListner(poster);
    getListner(titleFilm);
    getListner(commentsFilm);

    render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
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
    if (films) {
      const filmsExtraListComponents = new FilmsExtraList(nameList);
      render(container, filmsExtraListComponents.getElement(), RenderPosition.BEFOREEND);
      const filmListContainer = filmsExtraListComponents.getElement().querySelector(`.films-list__container`);
      films.forEach((film) => {
        createFilm(filmListContainer, film);
      });
    }
  };

  renderFilms(filmsOnList);


  const btnMoreComponent = new BtnMore();
  render(filmsListElement, btnMoreComponent.getElement(), RenderPosition.BEFOREEND);

  const extraFilmsContainer = document.querySelector(`.films`);

  const topCommentsFilms = getTopFilms(ALL_FILMS, `comments`);
  const topRatingFilms = getTopFilms(ALL_FILMS, `rating`);

  renderExtraFilms(extraFilmsContainer, topRatingFilms, `Top rated`);
  renderExtraFilms(extraFilmsContainer, topCommentsFilms, `Most commented`);

  const footerElemet = document.querySelector(`.footer`);
  render(footerElemet, new FooterStatistic(COUNT_FILMS).getElement(), RenderPosition.BEFOREEND);

  btnMoreComponent.getElement().addEventListener(`click`, () => {
    let balanseFilms = COUNT_FILMS - filmsOnList;
    if (balanseFilms) {
      if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
        renderFilms(SHOWING_FILMS_COUNT_ON_ITERATION);
      } else {
        renderFilms(balanseFilms);
        btnMoreComponent.getElement().remove();
        btnMoreComponent.removeElement();
      }
    }
  });
}

