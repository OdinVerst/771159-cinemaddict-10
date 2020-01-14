import he from "he";
import nanoid from "nanoid";

export const collectNewComment = (text, emoji) => {
  return {
    id: nanoid(),
    comment: normalizeTextComment(text),
    date: new Date(),
    emotion: emoji
  };
};

export const cropComment = (text) => {
  const MAX_LENGTH = 140;
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH - 1) + `...`;
  }
  return text;
};

export const normalizeTextComment = (text) => {
  const encodeText = he.encode(text);
  return cropComment(encodeText);
};
