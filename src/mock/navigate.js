const navigateNames = [`Watchlist`, `History`, `Favorites`];

const navigeteMethods = {
  watchlist(list) {
    return list.filter((item) => !!item.isWatchlist).length;
  },
  history(list) {
    return list.filter((item) => !!item.isWatched).length;
  },
  favorites(list) {
    return list.filter((item) => !!item.isFavorite).length;
  },
};

export const generateNavigate = (films) => {
  let result = [];
  for (let name of navigateNames) {
    result.push({name, count: navigeteMethods[name.toLocaleLowerCase()](films)});
  }
  return result;
};
