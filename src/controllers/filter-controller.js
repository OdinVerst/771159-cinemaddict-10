import Navigate from "../components/navigate";
import {FilterType} from "../const";
import {getMoviesByFilter, pareseFilterItem} from "../utils/filter";
import {replace, render} from "../utils/render";

export default class FilterController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;
    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._movieModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._movieModel.getMoviesAll();

    const filters = Object.values(FilterType).map((filterType) => {
      const nameFilter = pareseFilterItem[filterType.toLocaleUpperCase()];
      return {
        name: nameFilter.name,
        count: nameFilter.count(getMoviesByFilter(allMovies, filterType).length),
        checked: filterType === this._activeFilterType,
        url: filterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new Navigate(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._movieModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
