import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
import {remove, render, replace} from "../utils/render";

const Controls = [`Watched`, `Watchlist`, `Favorite`];

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._filmDetialOpen = false;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removeFilmDetail = this._removeFilmDetail.bind(this);
  }

  render(movie) {
    this._film = movie;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new FilmCard(this._film);
    this._filmDetailComponent = new FilmDetail(this._film);

    this._filmDetail = this._setFilmDetailAllHandlers(this._filmDetailComponent);

    Controls.forEach((control)=> {
      this._setFilmCardControlHandler(control);
    });
    this._setFilmCardClickHandler();

    if (oldFilmDetailComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      this._filmDetailComponent.disebledAnimate();
      replace(this._filmDetailComponent, oldFilmDetailComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  _setFilmCardClickHandler() {
    this._filmComponent.setShowDetailsHandler(() => {
      this._filmDetail = this._setFilmDetailAllHandlers(this._filmDetailComponent);
      render(this._filmDetailComponent.getContainer(), this._filmDetail);
      this._onViewChange();
      this._filmDetialOpen = true;
    });
  }

  _setFilmCardControlHandler(type) {
    this._filmComponent[`set${type}ButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const key = `is${type}`;
      const updateFilm = Object.assign({}, this._film, {[key]: !this._film[key]});
      this._onDataChange(this, this._film, updateFilm);
    });
  }

  _setFilmDetailAllHandlers(component) {
    Controls.forEach((control)=> {
      this._setFilmDetailControlHandler(control);
    });
    this._setFilmDetailCloseHandler();

    return component;
  }

  _setFilmDetailControlHandler(type) {
    this._filmDetailComponent[`set${type}ButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const key = `is${type}`;
      const updateFilm = Object.assign({}, this._film, {[key]: !this._film[key]});
      this._onDataChange(this, this._film, updateFilm);
    });
  }

  _setFilmDetailCloseHandler() {
    this._filmDetailComponent.setCloseHandler(this._removeFilmDetail);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _removeFilmDetail() {
    this._filmDetialOpen = false;
    remove(this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
    }
  }
}
