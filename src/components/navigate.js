import AbstractComponent from "./abstract-component";
import {NavigateType} from "../const";

const getFilterNameByHref = (filterName) => {
  return filterName.getAttribute(`href`).substring(1);
};

const createNavigateItemsMarkup = (list) => {
  return list.map((item)=>{
    const {name, count, checked, url} = item;
    return `<a href="#${url}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">${name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`;
  }).join(``);
};

const createNavigateTemplate = (list) => {
  const isFilterActive = () => {
    const result = list.filter((item) => item.checked);
    return result.length ? true : false;
  };
  const navigateItems = createNavigateItemsMarkup(list);
  return `<nav class="main-navigation">
    ${navigateItems}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional ${isFilterActive() ? `` : `main-navigation__item--active`}">Stats</a>
  </nav>`;
};

export default class Navigate extends AbstractComponent {
  constructor(navigateItems) {
    super();
    this._navigateList = navigateItems;

    this._filterChangeHandler = null;
    this._activePart = NavigateType.FILTER;
  }

  getTemplate() {
    return createNavigateTemplate(this._navigateList);
  }

  setNavigateChangeHandler(handler) {
    this._filterChangeHandler = handler;
    const allFilterItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    [...allFilterItems].forEach((filterItem) => {
      filterItem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const filterName = getFilterNameByHref(evt.currentTarget);
        this._filterChangeHandler(filterName);
      });
    });
  }
}
