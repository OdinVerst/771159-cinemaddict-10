import {createElement} from "../utils";

const createUserProfileTemplate = (range) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${range}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfile {
  constructor(range) {
    this._element = null;
    this._range = range;
  }

  getTemplate() {
    return createUserProfileTemplate(this._range);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
