import {StatisticType} from "../const";
import Statistics from "../components/statistics";
import {render, replace} from "../utils/render";
import {getMoviesByPeriod} from "../utils/statistic";
import {generateUserRating} from "../utils/user-rating";

export default class StatisticsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeStatisticFilter = StatisticType.ALL;
    this._isShowed = false;

    this._statisticComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onStatisticsFiltesChange = this._onStatisticsFiltesChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();

    const oldComponent = this._statisticComponent;

    const wachedMovies = {
      userRating: generateUserRating(allMovies),
      movies: getMoviesByPeriod(allMovies, this._activeStatisticFilter),
      activeStatisticFilter: this._activeStatisticFilter
    };

    this._statisticComponent = new Statistics(wachedMovies);
    if (wachedMovies.movies.length) {
      this._statisticComponent.renderChart(wachedMovies.movies);
    }

    this._statisticComponent.setStatisticsFiltesChangeHandler(this._onStatisticsFiltesChange);

    if (oldComponent) {
      replace(this._statisticComponent, oldComponent);
    } else {
      render(container, this._statisticComponent);
    }

    if (!this._isShowed) {
      this.hide();
    }
  }

  hide() {
    this._isShowed = false;
    this._statisticComponent.hide();
  }

  show() {
    this._isShowed = true;
    this._statisticComponent.show();
  }

  _onStatisticsFiltesChange(statisticsFilterType) {
    this._activeStatisticFilter = statisticsFilterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
