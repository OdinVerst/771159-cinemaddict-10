import {UserRating} from "../const";

const getWatchedFilms = (films) => {
  return films.filter((item) => !!item.isWatched).length;
};

export const generateUserRating = (allFilms) => {
  const watchedFilms = getWatchedFilms(allFilms);
  return UserRating.find((levelRating) => watchedFilms < levelRating.count).value;
};
