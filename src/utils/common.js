import {COUNT_TOPFILMS} from "../const";

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

export const getSortTopFilms = (list, characteristic) => {
  const sortedFilms = getSortFilms(list, characteristic);
  return getCountNumber(sortedFilms[0][characteristic]) !== 0 ? sortedFilms.slice(0, COUNT_TOPFILMS) : false;
};

export const getSortFilms = (list, characteristic) => {
  return list.slice().sort((item1, item2) => getCountNumber(item2[characteristic]) - getCountNumber(item1[characteristic]));
};
