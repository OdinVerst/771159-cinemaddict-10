const renderNavigateItems = (list) => {
  return list.map((item)=>{
    const {name, count} = item;
    return `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`;
  }).join(``);
};

export const templateNavigate = (list) => {
  const navigateItems = renderNavigateItems(list);
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${navigateItems}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};
