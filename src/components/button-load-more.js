import AbstractComponent from "./abstract-component";

const createButtonMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ButtonLoadMore extends AbstractComponent {
  getTemplate() {
    return createButtonMoreTemplate();
  }

  setClickButtonLoadMoreHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
