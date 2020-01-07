import he from "he";
import nanoid from "nanoid";

import {UESR_NAME} from "../const";

export const collectNewComment = (text, emoji) => {
  return {
    id: nanoid(),
    name: UESR_NAME,
    text: normalizeTextComment(text),
    date: new Date(),
    emoji
  };
};

export const normalizeTextComment = (text) => {
  const encodeText = he.encode(text);
  const MAX_LENGTH = 140;
  if (encodeText.length > MAX_LENGTH) {
    return encodeText.substring(0, MAX_LENGTH - 1) + `...`;
  }
  return encodeText;
};
