import {COUNT_TOP_MOVIES} from "../const";

export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getCountNumber = (value) => {
  if (isNaN(Number(value)) && !Array.isArray(value)) {
    throw new Error(`Invalid type value`);
  }
  return isNaN(Number(value)) ? value.length : value;
};

export const getSortTopMovies = (list, characteristic) => {
  const sortedMovies = getSortMovies(list, characteristic);
  return getCountNumber(sortedMovies[0][characteristic]) !== 0 ? sortedMovies.slice(0, COUNT_TOP_MOVIES) : false;
};

export const getSortMovies = (list, characteristic) => {
  return list.slice().sort((item1, item2) => getCountNumber(item2[characteristic]) - getCountNumber(item1[characteristic]));
};
