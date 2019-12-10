import FilmsList from "../components/film-list";
import FilmsContainer from "../components/films-container";
import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import FilmsExtraList from "../components/film-extra-list";
import {render, remove} from "../utils/render";
import {getSortFilms} from "../utils/common";
import BtnMore from "../components/btn-more";
import Sort, {SortType} from "../components/sort";


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

const renderFilms = (container, films, count = films.length) => {
  const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
  const start = ((itaration - 1) * SHOWING_FILMS_COUNT_ON_ITERATION);
  const end = start + count;
  films.slice(start, end).map((film) => {
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

    render(this._container, this._filmsListComponent);

    if (this._films.length) {
      let films = this._films;
      const filmsListElement = this._container.querySelector(`.films-list`);
      const filmsContainer = this._filmsContainerComponent;

      const renderLoadMoreButton = () => {
        if (films.length <= SHOWING_FILMS_COUNT_ON_ITERATION) {
          return;
        }
        const btnMore = this._btnMoreComponent;
        render(filmsListElement, btnMore);
        let balanseFilms = films.length;
        btnMore.setBtnMoreClickHandler(() => {
          balanseFilms -= SHOWING_FILMS_COUNT_ON_ITERATION;
          if (balanseFilms) {
            if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
              renderFilms(filmsContainer.getElement(), films, SHOWING_FILMS_COUNT_ON_ITERATION);
            } else {
              renderFilms(filmsContainer.getElement(), films, balanseFilms);
              remove(btnMore);
            }
          }
        });
      };

      render(filmsListElement, filmsContainer);
      renderFilms(filmsContainer.getElement(), films, filmsOnList);
      renderLoadMoreButton();

      this._sortComponent.setSortTypeChangeHandler((sortType)=> {
        let sortedFilms = [];

        switch (sortType) {
          case SortType.DATE:
            sortedFilms = getSortFilms(this._films, `relaese`);
            break;
          case SortType.RATING:
            sortedFilms = getSortFilms(this._films, `rating`);
            break;
          case SortType.DEFAULT:
            sortedFilms = this._films.slice(0, SHOWING_FILMS_COUNT_ON_ITERATION);
            break;
        }
        filmsContainer.getElement().innerHTML = ``;
        filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

        renderFilms(filmsContainer.getElement(), sortedFilms);
        if (sortType === SortType.DEFAULT) {
          renderLoadMoreButton();
        } else {
          remove(this._btnMoreComponent);
        }
      });

      const extraFilmsContainer = document.querySelector(`.films`);
      const COUNT_TOPFILMS = 2;
      const topCommentsFilms = getSortFilms(films, `comments`, COUNT_TOPFILMS);
      const topRatingFilms = getSortFilms(films, `rating`, COUNT_TOPFILMS);

      renderExtraFilms(extraFilmsContainer, topRatingFilms, `Top rated`);
      renderExtraFilms(extraFilmsContainer, topCommentsFilms, `Most commented`);

    }
  }
}
