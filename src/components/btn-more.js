import AbstractComponent from "./abstract-component";

const createBtnMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class BtnMore extends AbstractComponent {
  getTemplate() {
    return createBtnMoreTemplate();
  }

  setBtnMoreClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
