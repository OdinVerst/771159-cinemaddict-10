import PageController from "./controllers/page-controller";
import Preloader from "./components/preloader";
import Movies from "./models/movies";
import UserProfile from "./components/user-profile";
import FilterController from "./controllers/filter-controller";
import FooterStatistic from "./components/footer-statistic";
import {generateUserRating} from './utils/user-rating';
import {render} from "./utils/render";
import {NavigateType} from "./const";
import StatisticsController from "./controllers/statistics-controller";
import API from "./api";

const AUTHORIZATION = `Basic testKey=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElemet = document.querySelector(`.footer`);

const preloader = new Preloader();
const moviesModel = new Movies();
const api = new API(AUTHORIZATION, END_POINT);

render(mainElement, preloader);

const pageController = new PageController(mainElement, moviesModel, api);
const filterController = new FilterController(mainElement, moviesModel);
const statisticController = new StatisticsController(mainElement, moviesModel);

api.getMovies()
  .then((movies) => {
    preloader.getElement().remove();
    preloader.removeElement();

    moviesModel.setMovies(movies);
    render(headerElement, new UserProfile(generateUserRating(movies)));
    filterController.render();
    statisticController.render();
    pageController.render();
    render(footerElemet, new FooterStatistic(movies.length));

    filterController.watchFilterValue((typeNavigate) => {
      switch (typeNavigate) {
        case NavigateType.FILTER:
          statisticController.hide();
          pageController.show();
          break;
        case NavigateType.STATISTIC:
          statisticController.show();
          pageController.hide();
          break;
      }
    });
  });

