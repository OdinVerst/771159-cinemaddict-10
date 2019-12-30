import {UserRating} from "../const";

const getWatchedFilms = (films) => {
  return films.filter((item) => !!item.isWatched).length;
};


export const generateUserRating = (allFilms) => {
  const steps = 100 / UserRating.length;
  const watchedFilms = getWatchedFilms(allFilms);
  return UserRating[(Math.round((watchedFilms / allFilms.length) * 100 / steps)) - 1];
};
