import moment from "moment";
import {COUNT_TOP_MOVIES} from "../const";

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

export const parseDuration = (time) => {
  return moment.utc(moment.duration(time, `minutes`).asMilliseconds()).format(`h[h] mm[m]`);
};
