import Chart from 'chart.js';
import AbstractComponent from "./abstract-component";
import {parseStatisticsDuration, getTorGenere} from "../utils/statistic";
import {generateUserRating} from "../utils/user-rating";

const renderChart = (movies) => {
  const statisticCanvasElement = document.querySelector(`.statistic__chart`);
  const statisticCnvasContext = statisticCanvasElement.getContext(`2d`);
};

const createStatisticsTemplate = (movies) => {
  const moviesWatched = movies.filter((movie) => movie.isWatched);
  const durationWatched = parseStatisticsDuration(movies.reduce((a, b) => a + b.duration, 0));
  const rating = generateUserRating(movies);
  const topGenere = getTorGenere(moviesWatched);
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rating}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${moviesWatched.length}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${durationWatched.hours}<span class="statistic__item-description">h</span>${durationWatched.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenere}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
`;
};

export default class Statistics extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }
  getTemplate() {
    return createStatisticsTemplate(this._movies);
  }

  setStatisticsFiltesChangeHandler(handler) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, handler);
  }
}
