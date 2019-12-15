import FilmsList from "../components/film-list";
import FilmsContainer from "../components/films-container";
import FilmsExtraList from "../components/film-extra-list";
import {render, remove} from "../utils/render";
import {getSortFilms, getSortTopFilms} from "../utils/common";
import BtnMore from "../components/btn-more";
import Sort, {SortType} from "../components/sort";
import MovieController from "./movie-controller";


const SHOWING_FILMS_COUNT_ON_ITERATION = 5;
let filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

const renderFilms = (container, films, onDataChange, count = films.length) => {
  const itaration = Math.round(filmsOnList / SHOWING_FILMS_COUNT_ON_ITERATION);
  const start = ((itaration - 1) * SHOWING_FILMS_COUNT_ON_ITERATION);
  const end = start + count;
  films.slice(start, end).map((film) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(film);
  });
  filmsOnList += count;
};

const renderExtraFilms = (container, films, onDataChange, nameList) => {
  if (films.length) {
    const filmsExtraListComponents = new FilmsExtraList(nameList);
    render(container, filmsExtraListComponents);
    const filmListContainer = filmsExtraListComponents.getElement().querySelector(`.films-list__container`);
    films.forEach((film) => {
      const movieController = new MovieController(filmListContainer, onDataChange);
      movieController.render(film);
    });
  }
};

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._filmsListComponent = new FilmsList(this._films.length);
    this._filmsContainerComponent = new FilmsContainer();
    this._btnMoreComponent = new BtnMore();
    this._sortComponent = new Sort();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {

    render(this._container, this._sortComponent);

    render(this._container, this._filmsListComponent);

    if (this._films.length) {
      let films = this._films;
      const filmsListElement = this._container.querySelector(`.films-list`);
      const filmsContainer = this._filmsContainerComponent;

      render(filmsListElement, filmsContainer);
      renderFilms(filmsContainer.getElement(), films, this._onDataChange, filmsOnList);
      this._renderLoadMoreButton(filmsListElement);

      const extraFilmsContainer = document.querySelector(`.films`);
      const topCommentsFilms = getSortTopFilms(films, `comments`);
      const topRatingFilms = getSortTopFilms(films, `rating`);

      renderExtraFilms(extraFilmsContainer, topRatingFilms, this._onDataChange, `Top rated`);
      renderExtraFilms(extraFilmsContainer, topCommentsFilms, this._onDataChange, `Most commented`);

    }
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }
    this._films[index] = newData;
    movieController.render(this._films[index]);
  }

  _renderLoadMoreButton(container) {
    if (this._films.length <= SHOWING_FILMS_COUNT_ON_ITERATION) {
      return;
    }

    const btnMore = this._btnMoreComponent;
    render(container, btnMore);
    let balanseFilms = this._films.length;
    btnMore.setBtnMoreClickHandler(() => {
      balanseFilms -= SHOWING_FILMS_COUNT_ON_ITERATION;
      if (balanseFilms) {
        if (balanseFilms - SHOWING_FILMS_COUNT_ON_ITERATION >= 1) {
          renderFilms(this._filmsContainerComponent.getElement(), this._films, this._onDataChange, SHOWING_FILMS_COUNT_ON_ITERATION);
        } else {
          renderFilms(this._filmsContainerComponent.getElement(), this._films, this._onDataChange, balanseFilms);
          remove(btnMore);
        }
      }
    });
  }

  _onSortTypeChange(sortType) {
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
    this._filmsContainerComponent.getElement().innerHTML = ``;
    filmsOnList = SHOWING_FILMS_COUNT_ON_ITERATION;

    renderFilms(this._filmsContainerComponent.getElement(), sortedFilms);
    if (sortType === SortType.DEFAULT) {
      const filmsListElement = this._container.querySelector(`.films-list`);
      this._renderLoadMoreButton(filmsListElement);
    } else {
      remove(this._btnMoreComponent);
    }
  }
}
