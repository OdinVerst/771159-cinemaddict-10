import PageController from "./controllers/page-controller";
import Movies from "./models/movies";
import UserProfile from "./components/user-profile";
import Navigate from "./components/navigate";
import FooterStatistic from "./components/footer-statistic";
import {generateFilms} from './mock/film';
import {generateNavigate} from './mock/navigate';
import {generateUserRating} from './mock/user-rating';
import {render} from "./utils/render";


const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const COUNT_FILMS = 22;
const ALL_FILMS = generateFilms(COUNT_FILMS);

const moviesModel = new Movies();
moviesModel.setMovies(ALL_FILMS);

render(headerElement, new UserProfile(generateUserRating(ALL_FILMS)));
render(mainElement, new Navigate(generateNavigate(ALL_FILMS)));

const pageController = new PageController(mainElement, moviesModel);
pageController.render();

const footerElemet = document.querySelector(`.footer`);
render(footerElemet, new FooterStatistic(COUNT_FILMS));

