import AbstractComponent from "./abstract-component";

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
  }

  getTemplate() {
    return createNavigateTemplate(this._navigateList);
  }

  setFilterChangeHandler(handler) {
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
