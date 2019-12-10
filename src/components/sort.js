import AbstractComponent from "./abstract-component";

const activeClassName = `sort__button--active`;
export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`,
};

const createSortTemlate = (active) => {
  return `<ul class="sort">
    ${Object.values(SortType).map((sortItem) => (
    `<li><a href="#" data-sort-type="${sortItem}" class="sort__button ${sortItem === active ? activeClassName : ``}">Sort by ${sortItem}</a></li>`
  )).join(``)}
  </ul>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemlate(this._currenSortType);
  }

  _changeActiveSortItem(active) {
    const allSortsBtns = this.getElement().querySelectorAll(`.sort__button`);
    [...allSortsBtns].forEach((sortBtn) => {
      if (sortBtn.dataset.sortType !== active) {
        sortBtn.classList.remove(activeClassName);
      } else {
        sortBtn.classList.add(activeClassName);
      }
    });
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      this._changeActiveSortItem(sortType);

      handler(this._currenSortType);
    });
  }
}
