import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {remove, render, replace} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetialComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removePopupFilm = this._removePopupFilm.bind(this);
  }

  render(movie) {
    const oldFilmComponent = this._filmComponent;
    const oldfilmDetialComponent = this._filmDetialComponent;

    this._filmComponent = new FilmCard(movie);
    this._filmDetialComponent = new FilmPopup(movie);

    this._filmComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const updateMovie = Object.assign({}, movie, {isWatched: !movie.isWatched});
      this._onDataChange(this, movie, updateMovie);
    });

    this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      const updateMovie = Object.assign({}, movie, {isWatchlist: !movie.isWatchlist});
      this._onDataChange(this, movie, updateMovie);
    });

    this._filmComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      const updateMovie = Object.assign({}, movie, {isFavorite: !movie.isFavorite});
      this._onDataChange(this, movie, updateMovie);
    });

    const filmElements = {
      poster: `.film-card__poster`,
      titleFilm: `.film-card__title`,
      commentsFilm: `.film-card__comments`
    };
    const popupContainer = document.querySelector(`body`);
    const closeButton = `.film-details__close-btn`;

    Object.values(filmElements).forEach((element)=> {
      this._setListners(element, popupContainer, closeButton);
    });

    if (oldfilmDetialComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetialComponent, oldfilmDetialComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  _setListners(selector, container, closeButton) {
    this._filmComponent.setFilmClickHandler(() => {
      render(container, this._filmDetialComponent);
      this._filmDetialComponent.setFilmPopupClickHandler(this._removePopupFilm, closeButton);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }, selector);
  }

  _removePopupFilm() {
    remove(this._filmDetialComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopupFilm();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
