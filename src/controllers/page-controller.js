import FilmsList from "../components/film-list";
import FilmsContainer from "../components/films-container";
import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import FilmsExtraList from "../components/film-extra-list";
import {render, remove} from "../utils/render";
import {getTopFilms} from "../utils/common";
import BtnMore from "../components/btn-more";
import Sort, { SortType } from "../components/sort";


const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

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
      render(popupContainer, filmPopupComponent);
      filmPopupComponent.setFilmPopupClickHandler(removePopupFilm, closeBtn);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, selector);
  };

  Object.values(filmElements).forEach((element)=> setListner(element));

  render(container, filmComponent);
};

const renderFilms = (container, films, count) => {
  const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
  const start = (itaration * SHOWING_FILMS_COUNT_ON_ITERATION);
  const end = start + count;
  films.slice(start, end).forEach((film) => {
    createFilm(container, film);
  });
  filmsOnList += count;
};

const renderExtraFilms = (container, films, nameList) => {
  if (films.length) {
    const filmsExtraListComponents = new FilmsExtraList(nameList);
    render(container, filmsExtraListComponents);
    const filmListContainer = filmsExtraListComponents.getElement().querySelector(`.films-list__container`);
    films.forEach((film) => {
      createFilm(filmListContainer, film);
    });
  }
};

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._filmsListComponent = new FilmsList(this._films.length);
    this._filmsContainerComponent = new FilmsContainer();
    this._btnMoreComponent = new BtnMore();
    this._sortComponent = new Sort();
  }

  render() {

    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler((sortType)=> {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE:
          sortedTasks = this._films.slice().sort((a, b) => a.relaese - b.relaese);
          break;
        case SortType.RATING:
          sortedTasks = this._films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedTasks = this._films;
          break;
      }

      console.log(sortedTasks);
    });

    render(this._container, this._filmsListComponent);

    if (this._films.length) {
      const filmsListElement = this._container.querySelector(`.films-list`);
      const filmsContainer = this._filmsContainerComponent;

      render(filmsListElement, filmsContainer);
      renderFilms(filmsContainer.getElement(), this._films, filmsOnList);

      const extraFilmsContainer = document.querySelector(`.films`);
      const topCommentsFilms = getTopFilms(this._films, `comments`);
      const topRatingFilms = getTopFilms(this._films, `rating`);

      renderExtraFilms(extraFilmsContainer, topRatingFilms, `Top rated`);
      renderExtraFilms(extraFilmsContainer, topCommentsFilms, `Most commented`);

      if (this._films.length > SHOWING_FILMS_COUNT_ON_ITERATION) {
        const btnMore = this._btnMoreComponent;
        render(filmsListElement, btnMore);
        btnMore.setBtnMoreClickHandler(() => {
          let balanseFilms = this._films.length - filmsOnList;
          if (balanseFilms) {
            if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
              renderFilms(filmsContainer.getElement(), this._films, SHOWING_FILMS_COUNT_ON_ITERATION);
            } else {
              renderFilms(filmsContainer.getElement(), this._films, balanseFilms);
              remove(btnMore);
            }
          }
        });
      }
    }
  }
}
