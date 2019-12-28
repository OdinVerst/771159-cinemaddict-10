import Chart from 'chart.js';
import AbstractComponent from "./abstract-component";
import {parseStatisticsDuration, getTorGenere} from "../utils/statistic";

const createStatisticsFilterTemplate = (active) => {
  const normalizeValue = (value) => {
    return value.toLowerCase().replace(` `, `-`);
  };
  const StatisticFilters = [`All time`, `Today`, `Week`, `Month`, `Year`];
  return StatisticFilters.map((item)=> {
    const parseItem = normalizeValue(item);
    return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${parseItem}" value="${parseItem}" ${parseItem === active ? `checked` : ``}>
    <label for="statistic-${parseItem}" class="statistic__filters-label">${item}</label>`;
  }).join(``);
};

const createStatisticsTemplate = ({movies, userRating, activeStatisticFilter}) => {
  const durationWatched = parseStatisticsDuration(movies.reduce((a, b) => a + b.duration, 0));
  const topGenere = getTorGenere(movies);
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRating}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${createStatisticsFilterTemplate(activeStatisticFilter)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${movies.length}<span class="statistic__item-description">movies</span></p>
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
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt)=> {
      const valueFilter = evt.target.value;
      handler(valueFilter);
    });
  }

  renderChart() {
    const statisticCanvasElement = this.getElement.querySelector(`.statistic__chart`);
    const statisticCnvasContext = statisticCanvasElement.getContext(`2d`);
  }
}
