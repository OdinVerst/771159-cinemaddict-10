import {getRandomInteger, getRandomArrayElement} from "../utils";
import {UsersNames, UsersEmoji, UserComments} from "../const";

const getRandomDate = () => {
  const year = getRandomInteger(2017, 2019);
  const mounth = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 27);

  const hours = getRandomInteger(0, 23);
  const minuters = getRandomInteger(0, 59);
  return new Date(`${year}-${mounth}-${day} ${hours}:${minuters}`);
};

const generateComment = () => {
  return {
    name: getRandomArrayElement(UsersNames),
    text: getRandomArrayElement(UserComments),
    date: getRandomDate(),
    emoji: getRandomArrayElement(UsersEmoji)
  };
};

export const generateCommenst = () => {
  const countComments = getRandomInteger(0, 10);
  return [...new Array(countComments)].map(()=> {
    return generateComment();
  });
};
