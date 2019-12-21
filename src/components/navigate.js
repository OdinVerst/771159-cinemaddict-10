import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

const getFilterNameByHref = (filterName) => {
  return filterName.getAttribute(`href`).split(/[#]/)[0];
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

export default class Navigate extends AbstractComponent {
  constructor(navigateItems) {
    super();
    this._navigateList = navigateItems;
    this._activeFilter = FilterType.ALL;
  }

  getTemplate() {
    return createNavigateTemplate(this._navigateList, this._activeFilter);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const filterName = getFilterNameByHref(evt.target.id);
      handler(filterName);
    });
  }
}
