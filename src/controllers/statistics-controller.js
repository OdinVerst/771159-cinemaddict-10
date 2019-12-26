import {StatisticType} from "../const";
import Statistics from "../components/statistics";
import {render, replace} from "../utils/render";

export default class StatisticsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeStatisticFilter = StatisticType.ALL;
    this._isShowed = false;

    this._statisticComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();

    const oldComponent = this._statisticComponent;

    this._statisticComponent = new Statistics(allMovies);

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

  _onDataChange() {
    console.log(this);
    this.render();
  }
}
