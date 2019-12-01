const isActive = (prop) => {
  return prop ? `film-card__controls-item--active` : ``;
};

const cropDescription = (text) => {
  return text.substring(0, 140) + `...`;
};

export const templateFilmCard = (film) => {
  const {name, rating, duration, description, year, poster, genre, isFavorite, isWatched, isWatchlis, comments} = film;
  const commentsCount = comments.length;
  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${cropDescription(description)}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(isWatchlis)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}">Mark as favorite</button>
    </form>
  </article>`;
};
