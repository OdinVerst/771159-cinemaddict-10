import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
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
    const oldFilmDetialComponent = this._filmDetialComponent;

    this._filmComponent = new FilmCard(movie);
    this._filmDetialComponent = new FilmDetail(movie);

    const Controls = [`Watched`, `Watchlist`, `Favorite`];

    Controls.forEach((control)=> {
      this._setListnersClickButton(this._filmComponent, control, movie);
      this._setListnersClickButton(this._filmDetialComponent, control, movie);
    });

    const filmElements = {
      poster: `.film-card__poster`,
      titleFilm: `.film-card__title`,
      commentsFilm: `.film-card__comments`
    };
    const popupContainer = document.querySelector(`body`);
    const closeButton = `.film-details__close-btn`;

    Object.values(filmElements).forEach((element)=> {
      this._setListnersOpenDetail(element, popupContainer, closeButton);
    });

    if (oldFilmDetialComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetialComponent, oldFilmDetialComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  _setListnersOpenDetail(selector, container, closeButton) {
    this._filmComponent.setFilmClickHandler(() => {
      render(container, this._filmDetialComponent);
      this._filmDetialComponent.setFilmPopupClickHandler(this._removePopupFilm, closeButton);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }, selector);
  }

  _setListnersClickButton(component, type, movie) {
    component[`set${type}ButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const key = `is${type}`;
      const updateMovie = Object.assign({}, movie, {[key]: !movie[key]});
      this._onDataChange(this, movie, updateMovie);
    });
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
