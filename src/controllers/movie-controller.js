import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {remove, render} from "../utils/render";

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetialComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removePopupFilm = this._removePopupFilm.bind(this);
  }

  render(movie) {
    this._filmComponent = new FilmCard(movie);
    this._filmDetialComponent = new FilmPopup(movie);

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

    render(this._container, this._filmComponent);
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
