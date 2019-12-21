const navigateNames = [`all`, `watchlist`, `history`, `favorites`];

const navigeteMethods = {
  all() {
    return {
      name: `All movies`,
      count() {
        return;
      }
    };
  },
  watchlist(list) {
    return {
      name: `Watchlist`,
      count() {
        return list.filter((item) => !!item.isWatchlist).length;
      }
    };
  },
  history(list) {
    return {
      name: `History`,
      count() {
        return list.filter((item) => !!item.isWatched).length;
      }
    };
  },
  favorites(list) {
    return {
      name: `Favorites`,
      count() {
        return list.filter((item) => !!item.isFavorite).length;
      }
    };
  },
};

export const generateNavigate = (films) => {
  let result = [];
  for (let name of navigateNames) {
    const itemFilter = navigeteMethods[name](films);
    result.push({name: itemFilter.name, count: itemFilter.count(), url: name});
  }
  return result;
};
