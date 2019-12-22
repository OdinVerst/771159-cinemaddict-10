import moment from "moment";

import {MIN_RATING, MAX_RATING} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      const {id, name, text, date, emoji} = comment;
      const formatDate = (dateComment) => {
        const today = moment(new Date());
        if (today.diff(dateComment, `week`) >= 1) {
          return moment(dateComment).format(`YYYY/MM/DD hh:mm`);
        }
        return moment(dateComment).fromNow();
      };

      return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${name}</span>
            <span class="film-details__comment-day">${formatDate(date)}</span>
            <button data-id="${id}" class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
    })
    .join(``);
};

const createListMarkup = (list) => {
  let result = ``;
  for (let item of list) {
    result += ` ${item}`;
  }
  return result;
};

const createGenreMarkup = (genres) => {
  return genres
    .map((genre) => {
      return `<span class="film-details__genre">${genre}</span>`;
    })
    .join(`\n`);
};

const renderUserRatingValue = (value) => {
  if (!value) {
    return ``;
  }
  return `<p class="film-details__user-rating">Your rate ${value}</p>`;
};

const renderUserRatingInputs = (isWatched, userRating, name, poster) => {
  if (!isWatched) {
    return ``;
  }

  const renderRtingInput = (min, max) => {
    let result = ``;
    for (let i = min; i <= max; i++) {
      result += `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${Number(userRating) === i ? `checked=""` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `;
    }
    return result;
  };

  return `
  <section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>

    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="./${poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>

      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">${name}</h3>

        <p class="film-details__user-rating-feelings">How you feel it?</p>

        <div class="film-details__user-rating-score">
          ${renderRtingInput(MIN_RATING, MAX_RATING)}
        </div>
      </section>
    </div>
  </section>`;
};

const createFilmPopupTemplate = (film, emoji, textComment) => {
  const {
    name,
    director,
    rating,
    userRating,
    duration,
    description,
    relaese,
    poster,
    genre,
    age,
    isFavorite,
    isWatched,
    isWatchlist,
    comments,
    contry,
    writers,
    actors
  } = film;

  const writersMarkup = createListMarkup(writers);
  const actorsMarkup = createListMarkup(actors);
  const genreMarkup = createGenreMarkup(Array.from(genre));

  const formatRelease = moment(relaese).format(`DD MMMM YYYY`);

  const commentsMarkup = createCommentsMarkup(comments);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">

            <p class="film-details__age">${age}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${name}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
                ${renderUserRatingValue(userRating)}
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writersMarkup}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actorsMarkup}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatRelease}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${contry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.size > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  ${genreMarkup}
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" ${isWatchlist ? `checked` : ``} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" ${isWatched ? `checked` : ``} class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" ${isFavorite ? `checked` : ``} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__middle-container">${renderUserRatingInputs(isWatched, userRating, name, poster)}</div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsMarkup}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              ${emoji ? `<img src="${emoji}" width="55" height="55" alt="emoji">` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${textComment ? textComment : ``}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetail extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._emoji = null;
    this._textComment = null;

    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;

    this._container = document.querySelector(`body`);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, this._emoji, this._textComment);
  }

  getContainer() {
    return this._container;
  }

  setElement(element) {
    this._element = element;
  }

  updateFilm(film) {
    this._film = film;
  }

  rerender() {
    const prevElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    prevElement.querySelector(`.film-details__inner`).parentElement.replaceChild(newElement.querySelector(`.film-details__inner`), prevElement.querySelector(`.film-details__inner`));
    this.setElement(prevElement);
    this.recoveryListeners();
  }

  setCloseHandler(handler) {
    this._closeButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setWatchlistButtonClickHandler(handler) {
    this._watchlistButtonClickHandler = handler;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._watchlistButtonClickHandler);
  }

  setWatchedButtonClickHandler(handler) {
    this._watchedButtonClickHandler = handler;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedButtonClickHandler);
  }

  setFavoriteButtonClickHandler(handler) {
    this._favoriteButtonClickHandler = handler;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteButtonClickHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this._deleteButtonClickHandler = handler;
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    [...deleteButtons].forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const id = evt.currentTarget.getAttribute(`data-id`);
        this._deleteButtonClickHandler(id);
      });
    });
  }

  recoveryListeners() {
    this.setCloseHandler(this._closeButtonClickHandler);
    this.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);

    this._subscribeOnEvents();
  }

  _addNewComment(emoji, text) {
    this._emoji = emoji;
    this._textComment = text;
    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const resetWatchedElement = element.querySelector(`.film-details__watched-reset`);
    const ratingElement = element.querySelector(`.film-details__user-rating-score`);
    const emojiElement = element.querySelector(`.film-details__emoji-list`);
    const textCommentElement = element.querySelector(`.film-details__comment-input`);

    if (resetWatchedElement) {
      resetWatchedElement.addEventListener(`click`, () => {
        this._film.isWatched = !this._film.isWatched;
        this._film.userRating = false;
        this.rerender();
      });
    }

    if (ratingElement) {
      ratingElement.addEventListener(`change`, (evt) => {
        const valueRating = evt.target.value;
        this._film.userRating = valueRating;
        this.rerender();
      });
    }

    emojiElement.addEventListener(`change`, (evt) => {
      const valueEmojiID = evt.target.getAttribute(`id`);
      const emojiURL = element.querySelector(`label[for="${valueEmojiID}"] img`).getAttribute(`src`);
      this._addNewComment(emojiURL, textCommentElement.value);
    });
  }
}
