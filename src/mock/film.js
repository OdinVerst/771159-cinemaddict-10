import {getRandomArrayElement, getRandomInteger} from "../utils/common";
import {FilmsNames, FilmsPoster, FilmsGenre, FilmsDescriptons, Directors, Actors, Ages, Contrys} from "../const";
import {generateCommenst} from "./comments";

const BoolVals = [true, false];

const getRandomDuration = () => {
  const hours = getRandomInteger(1, 3);
  let minutes = getRandomInteger(0, 59);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h ${minutes}m`;
};

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

const getRandomReleaseDate = () => {
  const start = new Date(1930, 0, 1);
  const end = new Date();

  return new Date(getRandomInteger(start.getTime(), end.getTime()));
};

export const generateFilm = () => {
  return {
    id: getRandomInteger(10, 100),
    name: getRandomArrayElement(FilmsNames),
    rating: (getRandomInteger(10, 100) / 10).toFixed(1),
    age: getRandomArrayElement(Ages),
    relaese: getRandomReleaseDate(),
    duration: getRandomDuration(),
    genre: new Set(getRandomGenres()),
    poster: getRandomArrayElement(FilmsPoster),
    description: getRandomDescription(FilmsDescriptons),
    isFavorite: getRandomArrayElement(BoolVals),
    isWatched: getRandomArrayElement(BoolVals),
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
