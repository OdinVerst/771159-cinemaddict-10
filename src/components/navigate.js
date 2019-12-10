import AbstractComponent from "./abstract-component";

const createNavigateItemsMarkup = (list) => {
  return list.map((item)=>{
    const {name, count} = item;
    return `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`;
  }).join(``);
};

const createNavigateTemplate = (list) => {
  const navigateItems = createNavigateItemsMarkup(list);
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${navigateItems}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

export default class Navigate extends AbstractComponent {
  constructor(navigateItems) {
    super();
    this._navigateList = navigateItems;
  }

  getTemplate() {
    return createNavigateTemplate(this._navigateList);
  }
}
