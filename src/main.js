import PageController from "./controllers/page-controller";
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

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElemet = document.querySelector(`.footer`);

const moviesModel = new Movies();
const api = new API(AUTHORIZATION, END_POINT);

const pageController = new PageController(mainElement, moviesModel);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    render(headerElement, new UserProfile(generateUserRating(movies)));
    pageController.render();
    render(footerElemet, new FooterStatistic(movies.length));
  });

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const statisticController = new StatisticsController(mainElement, moviesModel);
statisticController.render();

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
