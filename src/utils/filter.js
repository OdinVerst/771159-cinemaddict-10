import {FilterType} from '../const.js';

const getFavoriteMovies = (movies) => {
  return movies.filter((movie)=> movie.isFavorite);
};

const getWatchlistMovies = (movies) => {
  return movies.filter((movie)=> movie.isWatchlist);
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie)=> movie.isWatched);
};

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getWatchedMovies(movies);
  }

  return movies;
};
