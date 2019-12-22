import PageController from "./controllers/page-controller";
import Movies from "./models/movies";
import UserProfile from "./components/user-profile";
import FilterController from "./controllers/filter-controller";
import FooterStatistic from "./components/footer-statistic";
import {generateFilms} from './mock/film';
import {generateUserRating} from './mock/user-rating';
import {render} from "./utils/render";


const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const ALL_FILMS = generateFilms(COUNT_FILMS);

const moviesModel = new Movies();
moviesModel.setMovies(ALL_FILMS);

render(headerElement, new UserProfile(generateUserRating(ALL_FILMS)));

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const pageController = new PageController(mainElement, moviesModel);
pageController.render();

const footerElemet = document.querySelector(`.footer`);
render(footerElemet, new FooterStatistic(COUNT_FILMS));

