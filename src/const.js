export const UserRating = [`Junior`, `Proffsessional`, `Movie Buff`];

export const COUNT_TOP_MOVIES = 2;
export const MIN_RATING = 1;
export const MAX_RATING = 9;

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  FAVORITES: `favorites`,
  HISTORY: `history`
};

export const StatisticType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const StatisticPeriod = {
  [StatisticType.TODAY]: `days`,
  [StatisticType.WEEK]: `week`,
  [StatisticType.MONTH]: `month`,
  [StatisticType.YEAR]: `year`
};

export const NavigateType = {
  STATISTIC: `stats`,
  FILTER: `filter`
};

export const CommentsActions = {
  DELETE: `delete`,
  ADD: `add`
};
