import FilmsList from "../components/film-list";
import FilmsContainer from "../components/films-container";
import FilmsExtraList from "../components/film-extra-list";
import {render, remove} from "../utils/render";
import {getSortMovies, getSortTopMovies} from "../utils/common";
import ButtonLoadMore from "../components/button-load-more";
import Sort, {SortType} from "../components/sort";
import MovieController from "./movie-controller";
import {CommentsActions} from "../const";


const SHOWING_MOVIES_COUNT_ON_ITERATION = 5;
let moviesOnList = SHOWING_MOVIES_COUNT_ON_ITERATION;

export default class PageController {
  constructor(container, moviesController, api) {
    this._container = container;
    this._moviesController = moviesController;
    this._movies = [];
    this._api = api;
    this._showedMovieControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesListComponent = new FilmsList(this._movies);
    this._moviesContainerComponent = new FilmsContainer();
    this._buttonLoadMoreComponent = new ButtonLoadMore();
    this._sortComponent = new Sort();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesController.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    render(this._container, this._sortComponent);

    render(this._container, this._moviesListComponent);

    let movies = this._moviesController.getMovies();

    if (movies.length) {
      const movieListElement = this._container.querySelector(`.films-list`);
      const moviesContainer = this._moviesContainerComponent;

      render(movieListElement, moviesContainer);
      const newMovie = this._renderMovies(movies, moviesOnList);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovie);
      this._renderLoadMoreButton(movieListElement);

      const extraMoviesContainer = document.querySelector(`.films`);
      const topCommentsMovies = getSortTopMovies(movies, `comments`);
      const topRatingMovies = getSortTopMovies(movies, `rating`);

      const topRated = this._renderExtraMovies(extraMoviesContainer, topRatingMovies, `Top rated`);
      if (topRated) {
        this._showedMovieControllers = this._showedMovieControllers.concat(topRated);
      }
      const topComment = this._renderExtraMovies(extraMoviesContainer, topCommentsMovies, `Most commented`);
      if (topComment) {
        this._showedMovieControllers = this._showedMovieControllers.concat(topComment);
      }

    }
  }

  hide() {
    this._sortComponent.hide();
    this._moviesListComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._moviesListComponent.show();
  }

  _renderMovies(movies, count = movies.length) {
    const itaration = Math.round(moviesOnList / SHOWING_MOVIES_COUNT_ON_ITERATION);
    const start = ((itaration - 1) * SHOWING_MOVIES_COUNT_ON_ITERATION);
    const end = start + count;
    moviesOnList += count;

    return movies.slice(start, end).map((movie) => {
      const movieController = new MovieController(this._moviesContainerComponent.getElement(), this._onDataChange, this._onViewChange, this._api);
      movieController.render(movie);
      return movieController;
    });
  }

  _renderExtraMovies(container, movies, nameList) {
    if (movies.length) {
      const moviesExtraListComponents = new FilmsExtraList(nameList);
      render(container, moviesExtraListComponents);
      const movieListContainer = moviesExtraListComponents.getElement().querySelector(`.films-list__container`);
      return movies.map((movie) => {
        const movieController = new MovieController(movieListContainer, this._onDataChange, this._onViewChange, this._api);
        movieController.render(movie);
        return movieController;
      });
    }
    return false;
  }

  _onDataChange(movieController, oldData, newData, comment = false) {
    if (comment) {
      switch (comment.action) {
        case CommentsActions.DELETE:
          this._api.deleteComment(comment.id).then((response) => {
            if (response.ok) {
              movieController.render(newData);
            }
          });
          break;
        case CommentsActions.ADD:
          this._api.addNewComment(comment.id, comment.comment).then((response) => {
            movieController.render(response);
          })
          .catch(() => {
            movieController.shake();
          });
          break;
        default:
          return;
      }
    } else {
      this._api.updateMovie(oldData.id, newData)
      .then((movie) => {
        const isSuccess = this._moviesController.updateMovie(oldData.id, movie);

        if (isSuccess) {
          movieController.render(movie);
        }
      });
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((item) => item.setDefaultView());
  }

  _renderLoadMoreButton(container) {
    const movies = this._moviesController.getMovies();
    if (movies.length <= SHOWING_MOVIES_COUNT_ON_ITERATION) {
      return;
    }

    const buttonLoadMore = this._buttonLoadMoreComponent;
    render(container, buttonLoadMore);
    let balanseMovies = movies.length;
    buttonLoadMore.setClickButtonLoadMoreHandler(() => {
      balanseMovies -= SHOWING_MOVIES_COUNT_ON_ITERATION;
      if (balanseMovies) {
        if (balanseMovies - SHOWING_MOVIES_COUNT_ON_ITERATION >= 1) {
          const newMovies = this._renderMovies(movies, SHOWING_MOVIES_COUNT_ON_ITERATION);
          this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
        } else {
          const newMovies = this._renderMovies(movies, balanseMovies);
          this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
          remove(buttonLoadMore);
        }
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedMoies = [];
    let movies = this._moviesController.getMovies();

    switch (sortType) {
      case SortType.DATE:
        sortedMoies = getSortMovies(movies, `relaese`);
        break;
      case SortType.RATING:
        sortedMoies = getSortMovies(movies, `rating`);
        break;
      case SortType.DEFAULT:
        sortedMoies = movies.slice(0, SHOWING_MOVIES_COUNT_ON_ITERATION);
        break;
    }
    this._moviesContainerComponent.getElement().innerHTML = ``;
    moviesOnList = SHOWING_MOVIES_COUNT_ON_ITERATION;

    this._renderMovies(sortedMoies);
    if (sortType === SortType.DEFAULT) {
      const moviesListElement = this._container.querySelector(`.films-list`);
      this._renderLoadMoreButton(moviesListElement);
    } else {
      remove(this._buttonLoadMoreComponent);
    }
  }

  _removeMovies() {
    this._moviesContainerComponent.getElement().innerHTML = ``;
    moviesOnList = SHOWING_MOVIES_COUNT_ON_ITERATION;
    remove(this._buttonLoadMoreComponent);
  }

  _onFilterChange() {
    this._sortComponent.resetActiveSortItem();
    this._removeMovies();
    this._movies = this._moviesController.getMovies();
    this._renderMovies(this._moviesController.getMovies(), SHOWING_MOVIES_COUNT_ON_ITERATION);

    const moviesListElement = this._container.querySelector(`.films-list`);
    this._renderLoadMoreButton(moviesListElement);
  }
}
