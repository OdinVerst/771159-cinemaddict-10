import AbstractSmartComponent from "./abstract-smart-component";
import {FilterType} from "../const";

const getFilterNameByHref = (filterName) => {
  return filterName.getAttribute(`href`).substring(1);
};

const createNavigateItemsMarkup = (list, active) => {
  return list.map((item)=>{
    const {name, count, url} = item;
    return `<a href="#${url}" class="main-navigation__item ${active === url ? `main-navigation__item--active` : ``}">${name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`;
  }).join(``);
};

const createNavigateTemplate = (list, activeFilter) => {
  const navigateItems = createNavigateItemsMarkup(list, activeFilter);
  return `<nav class="main-navigation">
    ${navigateItems}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

export default class Navigate extends AbstractSmartComponent {
  constructor(navigateItems) {
    super();
    this._navigateList = navigateItems;
    this._activeFilter = FilterType.ALL;

    this._filterChangeHandler = null;
  }

  getTemplate() {
    return createNavigateTemplate(this._navigateList, this._activeFilter);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
    const allFilterItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    [...allFilterItems].forEach((filterItem) => {
      filterItem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const filterName = getFilterNameByHref(evt.currentTarget);
        this._activeFilter = filterName;
        this._filterChangeHandler(filterName.toUpperCase());
        this.rerender();
      });
    });
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }
}
