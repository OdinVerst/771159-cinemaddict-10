import moment from "moment";
import {StatisticType, StatisticPeriod} from "../const";

export const parseStatisticsDuration = (time) => {
  const result = moment.duration(time, `minutes`);
  return {
    hours: result.hours(),
    minutes: result.minutes()
  };
};

export const getTorGenere = (wachedFilms) => {
  if (!wachedFilms.length) {
    return `-`;
  }
  const allGenere = {};
  let maxValue = 0;
  let genereValue;
  wachedFilms.forEach((film) => {
    [...film.genre].forEach((genre) => {
      allGenere[genre] = (allGenere[genre] || 0) + 1;
    });
  });

  for (let key in allGenere) {
    if (maxValue < allGenere[key]) {
      maxValue = allGenere[key];
      genereValue = key;
    }
  }

  return genereValue;
};

const getWatchedFilmsByPeriod = (movies, period) => {
  const watchedMovies = movies.filter((movie) => movie.isWatched);
  if (!period) {
    return watchedMovies;
  }
  return watchedMovies.filter((movie) => {
    return moment(movie.userDateWatch).diff(new Date(), StatisticPeriod[period]) === 0;
  });
};

export const getMoviesByPeriod = (movies, period) => {
  switch (period) {
    case StatisticType.ALL:
      return getWatchedFilmsByPeriod(movies, false);
    case StatisticType.TODAY:
      return getWatchedFilmsByPeriod(movies, period);
    case StatisticType.WEEK:
      return getWatchedFilmsByPeriod(movies, period);
    case StatisticType.MONTH:
      return getWatchedFilmsByPeriod(movies, period);
    case StatisticType.YEAR:
      return getWatchedFilmsByPeriod(movies, period);
  }
  return movies;
};
