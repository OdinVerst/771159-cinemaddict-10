import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
import {remove, render, replace} from "../utils/render";


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._filmDetialOpen = false;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removeFilmDetail = this._removeFilmDetail.bind(this);
  }

  render(movie) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new FilmCard(movie);
    this._filmDetailComponent = new FilmDetail(movie);

    const Controls = [`Watched`, `Watchlist`, `Favorite`];
    Controls.forEach((control)=> {
      this._filmCardControlHandler(control, movie);
      this._filmDetailControlHandler(control, movie);
    });
    this._filmCardClickHandler();
    this._filmDetailCloseHandler();

    if (oldFilmDetailComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      this._filmDetailComponent.disebledAnimate();
      replace(this._filmDetailComponent, oldFilmDetailComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  _filmCardClickHandler() {
    this._filmComponent.setShowDetailsHandler(() => {
      render(this._filmDetailComponent.getContainer(), this._filmDetailComponent);
      this._onViewChange();
      this._filmDetialOpen = true;
    });
  }

  _filmDetailCloseHandler() {
    this._filmDetailComponent.setCloseHandler(this._removeFilmDetail);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _filmCardControlHandler(type, movie) {
    this._filmComponent[`set${type}ButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const key = `is${type}`;
      const updateMovie = Object.assign({}, movie, {[key]: !movie[key]});
      this._onDataChange(this, movie, updateMovie);
    });
  }

  _filmDetailControlHandler(type, movie) {
    this._filmDetailComponent[`set${type}ButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const key = `is${type}`;
      const updateMovie = Object.assign({}, movie, {[key]: !movie[key]});
      this._onDataChange(this, movie, updateMovie);
    });
  }

  _removeFilmDetail() {
    this._filmDetialOpen = false;
    remove(this._filmDetailComponent);
  }

  setDefaultView() {
    if (this._filmDetialOpen) {
      this._removeFilmDetail();
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeFilmDetail();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
