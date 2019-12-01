export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const moreTen = (numder) => {
  if (numder < 10) {
    return `0${numder}`;
  }
  return numder;
};
