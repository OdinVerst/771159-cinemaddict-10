import {getRandomArrayElement, getRandomInteger} from "../utils";
import {FilmsNames, FilmsPoster, FilmsGenre, FilmsDescriptons} from "../const";
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
  const countRandomItems = getRandomInteger(1, 3);
  return [...new Array(countRandomItems)].map(()=> {
    return getRandomArrayElement(films);
  }).join(``);
};

export const generateFilm = () => {
  return {
    name: getRandomArrayElement(FilmsNames),
    rating: (getRandomInteger(10, 100) / 10).toFixed(1),
    year: getRandomInteger(1900, 2020),
    duration: getRandomDuration(),
    genre: getRandomArrayElement(FilmsGenre),
    poster: getRandomArrayElement(FilmsPoster),
    description: getRandomDescription(FilmsDescriptons),
    isFavorite: getRandomArrayElement(BoolVals),
    isWatched: getRandomArrayElement(BoolVals),
    isWatchlis: getRandomArrayElement(BoolVals),
    comments: generateCommenst()
  };
};
