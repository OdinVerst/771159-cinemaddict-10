import he from "he";
import nanoid from "nanoid";
import {cropText} from "./common";

export const collectNewComment = (text, emoji) => {
  return {
    id: nanoid(),
    comment: normalizeTextComment(text),
    date: new Date(),
    emotion: emoji
  };
};

export const normalizeTextComment = (text) => {
  const encodeText = he.encode(text);
  return cropText(encodeText);
};
