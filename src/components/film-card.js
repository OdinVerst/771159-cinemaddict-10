import AbstractComponent from "./abstract-component";
import {parseDuration} from "../utils/common";

const isActive = (prop) => {
  return prop ? `film-card__controls-item--active` : ``;
};

const cropDescription = (text) => {
  return text.substring(0, 140) + `...`;
};

const getFirstGenre = (set) => {
  let iterator = set.values();
  return iterator.next().value;
};

const createFilmCardTemplate = (film) => {
  const {name, rating, duration, description, relaese, poster, genre, isFavorite, isWatched, isWatchlist, comments} = film;
  const commentsCount = comments.length;
  const formatDuration = parseDuration(duration);
  const mainGenre = getFirstGenre(genre);
  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${relaese.getFullYear()}</span>
      <span class="film-card__duration">${formatDuration}</span>
      <span class="film-card__genre">${mainGenre}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${cropDescription(description)}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}">Mark as favorite</button>
    </form>
  </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setShowDetailsHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
