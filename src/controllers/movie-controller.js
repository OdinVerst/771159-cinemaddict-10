import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
import {remove, render, replace} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._filmDetialOpen = false;
    this._existFilmDetailHandler = false;
    this._api = api;

    this._checkEscKeyDown = this._checkEscKeyDown.bind(this);
    this._removeFilmDetail = this._removeFilmDetail.bind(this);
  }

  render(movie) {
    this._film = movie;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new FilmCard(this._film);
    this._setFilmCardControlHandlers();

    this._setFilmCardClickHandler();

    if (oldFilmDetailComponent) {
      oldFilmDetailComponent.updateFilm(movie);
    }

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  _setFilmCardClickHandler() {
    this._filmComponent.setShowDetailsHandler(() => {
      this._api.getComments(this._film.id).then((comments) => {
        this._filmDetailComponent = new FilmDetail(this._film, comments);

        this._filmDetailAllHandlers(this._filmDetailComponent);
        render(this._filmDetailComponent.getContainer(), this._filmDetailComponent);
      });

      this._onViewChange();
      this._filmDetialOpen = true;
    });
  }

  _setFilmCardControlHandlers() {
    this._filmComponent[`setWatchedButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const updateFilm = Object.assign({}, this._film, {isWatched: !this._film.isWatched, userDateWatch: new Date()});
      this._onDataChange(this, this._film, updateFilm);
    });

    this._filmComponent[`setWatchlistButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const updateFilm = Object.assign({}, this._film, {isWatchlist: !this._film.isWatchlist});
      this._onDataChange(this, this._film, updateFilm);
    });

    this._filmComponent[`setFavoriteButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const updateFilm = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      this._onDataChange(this, this._film, updateFilm);
    });
  }

  _filmDetailAllHandlers(component) {
    this._existFilmDetailHandler = true;
    component.setWatchedButtonClickHandler(() => {
      const updateFilm = Object.assign({}, this._film, {isWatched: !this._film.isWatched, userDateWatch: new Date()});
      this._onDataChange(this, this._film, updateFilm);
      component.rerender();
    });
    component.setWatchlistButtonClickHandler(() => {
      const updateFilm = Object.assign({}, this._film, {isWatchlist: !this._film.isWatchlist});
      this._onDataChange(this, this._film, updateFilm);
    });
    component.setFavoriteButtonClickHandler(() => {
      const updateFilm = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      this._onDataChange(this, this._film, updateFilm);
    });
    component.setDeleteButtonClickHandler((id)=> {
      const updateFilm = Object.assign({}, this._film, {comments: this._film.comments.filter((comment) =>comment.id !== Number(id))});
      this._onDataChange(this, this._film, updateFilm);
      component.rerender();
    });
    component.setNewCommentSubmitHandler((newComment)=> {
      const updateFilm = Object.assign({}, this._film, {comments: [...this._film.comments, newComment]});
      this._onDataChange(this, this._film, updateFilm);
      component.rerender();
    });
    component.setCloseHandler(this._removeFilmDetail);
    document.addEventListener(`keydown`, this._checkEscKeyDown);
  }

  _removeFilmDetail() {
    this._existFilmDetailHandler = false;
    this._filmDetialOpen = false;
    remove(this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._checkEscKeyDown);
  }

  setDefaultView() {
    if (this._filmDetialOpen) {
      this._removeFilmDetail();
    }
  }

  _checkEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeFilmDetail();
    }
  }
}
