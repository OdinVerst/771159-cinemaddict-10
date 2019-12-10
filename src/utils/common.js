export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const normalizeSingleDigit = (numder) => {
  if (numder < 10) {
    return `0${numder}`;
  }
  return numder;
};

export const getSortFilms = (list, characteristic, count = list.length) => {
  const isArray = Array.isArray(list[0][characteristic]);
  const COUNT_TOP = count;

  let newlist = [];
  if (isArray) {
    newlist = list.slice().sort((item1, item2) => item2[characteristic].length - item1[characteristic].length);
    return newlist[0][characteristic].length !== 0 ? newlist.slice(0, COUNT_TOP) : false;
  } else {
    newlist = list.slice().sort((item1, item2) => item2[characteristic] - item1[characteristic]);
    return Number(newlist[0][characteristic]) !== 0 ? newlist.slice(0, COUNT_TOP) : false;
  }
};
