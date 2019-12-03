import {createElement} from "../utils";

const createBtnMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class BtnMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtnMoreTemplate();
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
