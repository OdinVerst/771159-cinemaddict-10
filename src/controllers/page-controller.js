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
              renderFilms(filmsContainer.getElement(), films, this._onDataChange, SHOWING_FILMS_COUNT_ON_ITERATION);
            } else {
              renderFilms(filmsContainer.getElement(), films, this._onDataChange, balanseFilms);
              remove(btnMore);
            }
          }
        });
      };

      render(filmsListElement, filmsContainer);
      renderFilms(filmsContainer.getElement(), films, this._onDataChange, filmsOnList);
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
      const topCommentsFilms = getSortTopFilms(films, `comments`);
      const topRatingFilms = getSortTopFilms(films, `rating`);

      renderExtraFilms(extraFilmsContainer, topRatingFilms, this._onDataChange, `Top rated`);
      renderExtraFilms(extraFilmsContainer, topCommentsFilms, this._onDataChange, `Most commented`);

    }
  }

  _onDataChange(movieController, oldData, newData) {
    console.log(oldData);
    console.log(newData);
  }
}
