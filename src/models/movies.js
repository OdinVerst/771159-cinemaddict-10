import {getMoviesByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = null;
    this._dataChangeHandlers = [];
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers();
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers = handler;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
