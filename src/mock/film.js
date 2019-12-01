import { getRandomArrayElement, getRandomInteger } from "../utils";
import { FilmsNames, FilmsPoster, FilmsGenre } from "../const";

const BoolVals = [true, false];


export const generateFilm = () => {
  return {
    name: getRandomArrayElement(FilmsNames),
    rating: (getRandomInteger(10, 100) / 10).toFixed(1),
    year: getRandomInteger(1900, 2020),
    duration: `1h 55m`,
    genre: getRandomArrayElement(FilmsGenre),
    poster: getRandomArrayElement(FilmsPoster),
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    isFavorite: getRandomArrayElement(BoolVals),
    isWatched: getRandomArrayElement(BoolVals),
    isWatchlis: getRandomArrayElement(BoolVals),
    comments: [{}, {}]
  };
};
