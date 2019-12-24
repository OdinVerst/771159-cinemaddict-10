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
  const navigateItems = createNavigateItemsMarkup(list);
  return `<nav class="main-navigation">
    ${navigateItems}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
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

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
    const allFilterItems = this.getElement().querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);
    [...allFilterItems].forEach((filterItem) => {
      filterItem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const filterName = getFilterNameByHref(evt.currentTarget);
        this._filterChangeHandler(filterName);
      });
    });
  }

  setNavigateItemClickHandler(handler) {
    const allNavigateItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    [...allNavigateItems].forEach((navigateItem) => {
      navigateItem.addEventListener(`click`, (evt)=> {
        evt.preventDefault();
        if (evt.target.classList.contains(`main-navigation__item--additional`)) {
          this._activePart = NavigateType.STATISTIC;
        } else {
          this._activePart = NavigateType.FILTER;
        }

        handler(this._activePart);
      });
    });
  }
}
