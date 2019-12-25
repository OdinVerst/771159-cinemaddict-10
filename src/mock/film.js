import {getRandomArrayElement, getRandomInteger} from "../utils/common";
import {FilmsNames, FilmsPoster, FilmsGenre, FilmsDescriptons, Directors, Actors, Ages, Contrys, MIN_RATING, MAX_RATING} from "../const";
import {generateCommenst} from "./comments";

const BoolVals = [true, false];

const getRandomDescription = (films) => {
  const count = getRandomInteger(1, 3);
  return [...new Array(count)].map(()=> {
    return getRandomArrayElement(films);
  }).join(``);
};

const getRandomWriters = () => {
  const count = getRandomInteger(1, 3);
  return [...new Array(count)].map(()=> {
    return getRandomArrayElement(Directors);
  });
};

const getRandomActors = () => {
  const count = getRandomInteger(2, 4);
  return [...new Array(count)].map(()=> {
    return getRandomArrayElement(Actors);
  });
};

const getRandomGenres = () => {
  const count = getRandomInteger(1, 3);
  return [...new Array(count)].map(()=> {
    return getRandomArrayElement(FilmsGenre);
  });
};

const getUserRating = (wached) => {
  if (!wached) {
    return false;
  }
  return getRandomInteger(MIN_RATING, MAX_RATING);
};

const getRandomReleaseDate = () => {
  const start = new Date(1930, 0, 1);
  const end = new Date();

  return new Date(getRandomInteger(start.getTime(), end.getTime()));
};

export const generateFilm = () => {
  const isWatched = getRandomArrayElement(BoolVals);
  return {
    id: Symbol(`id`),
    name: getRandomArrayElement(FilmsNames),
    rating: (getRandomInteger(10, 100) / 10).toFixed(1),
    userRating: getUserRating(isWatched),
    age: getRandomArrayElement(Ages),
    relaese: getRandomReleaseDate(),
    duration: getRandomInteger(60, 120),
    genre: new Set(getRandomGenres()),
    poster: getRandomArrayElement(FilmsPoster),
    description: getRandomDescription(FilmsDescriptons),
    isFavorite: getRandomArrayElement(BoolVals),
    isWatched,
    isWatchlist: getRandomArrayElement(BoolVals),
    comments: generateCommenst(),
    contry: getRandomArrayElement(Contrys),
    director: getRandomArrayElement(Directors),
    writers: new Set(getRandomWriters()),
    actors: new Set(getRandomActors())
  };
};

export const generateFilms = (count) => {
  return [...new Array(count)].map(()=> {
    return generateFilm();
  });
};
