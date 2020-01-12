import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
import {remove, render, replace} from "../utils/render";
import Movie from "../models/movie";
import {CommentsActions} from "../const";
import Comment from "../models/comment";

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._film = null;
    this._comments = null;
    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._filmDetialOpen = false;
    this._existFilmDetailHandler = false;
    this._api = api;

    this._errorComment = false;

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
      oldFilmDetailComponent.clearDisable();

      this._api.getComments(this._film.id).then((comments) => {
        this._comments = comments;
        oldFilmDetailComponent.updateFilm(this._film, this._comments);
        oldFilmDetailComponent.rerender();
      });
      if (!this._errorComment) {
        oldFilmDetailComponent.reset();
      }
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
        this._comments = comments;
        this._filmDetailComponent = new FilmDetail(this._film, this._comments);

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
      const updateFilm = Movie.clone(this._film);
      updateFilm.isWatched = !this._film.isWatched;
      this._onDataChange(this, this._film, updateFilm);
    });

    this._filmComponent[`setWatchlistButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const updateFilm = Movie.clone(this._film);
      updateFilm.isWatchlist = !this._film.isWatchlist;
      this._onDataChange(this, this._film, updateFilm);
    });

    this._filmComponent[`setFavoriteButtonClickHandler`]((evt) => {
      evt.preventDefault();
      const updateFilm = Movie.clone(this._film);
      updateFilm.isFavorite = !this._film.isFavorite;
      this._onDataChange(this, this._film, updateFilm);
    });
  }

  _filmDetailAllHandlers(component) {
    this._existFilmDetailHandler = true;
    component.setWatchedButtonClickHandler(() => {
      const updateFilm = Movie.clone(this._film);
      updateFilm.isWatched = !this._film.isWatched;
      updateFilm.userDateWatch = new Date();
      this._onDataChange(this, this._film, updateFilm);
    });
    component.setWatchlistButtonClickHandler(() => {
      const updateFilm = Movie.clone(this._film);
      updateFilm.isWatchlist = !this._film.isWatchlist;
      this._onDataChange(this, this._film, updateFilm);
    });
    component.setFavoriteButtonClickHandler(() => {
      const updateFilm = Movie.clone(this._film);
      updateFilm.isFavorite = !this._film.isFavorite;
      this._onDataChange(this, this._film, updateFilm);
    });
    component.setDeleteButtonClickHandler((id)=> {
      const updateFilm = Movie.clone(this._film);
      updateFilm.comments = updateFilm.comments.filter((comment) => Number(comment) !== Number(id));
      this._onDataChange(this, this._film, updateFilm, {action: CommentsActions.DELETE, id});
    });
    component.setNewCommentSubmitHandler((newComment)=> {
      const updateFilm = Movie.clone(this._film);
      this._onDataChange(this, this._film, updateFilm, {action: CommentsActions.ADD, id: this._film.id, comment: Comment.parseComment(newComment)});
    });
    component.setUserRatingHandler((rating) => {
      const updateFilm = Movie.clone(this._film);
      updateFilm.userRating = rating;
      this._onDataChange(this, this._film, updateFilm);
    });
    component.resetWatchingHandler((isWatched)=> {
      const updateFilm = Movie.clone(this._film);
      updateFilm.isWatched = isWatched;
      this._onDataChange(this, this._film, updateFilm);
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

  shake() {
    this._errorComment = true;
    if (this._filmDetailComponent.getElementShake()) {
      const {element, style} = this._filmDetailComponent.getElementShake();
      element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
      if (style) {
        element.style[style.name] = style.value;
      }
      this._filmDetailComponent.clearDisable();

      setTimeout(() => {
        element.style.animation = ``;
        if (style) {
          element.style[style.name] = ``;
        }
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  }

  _checkEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeFilmDetail();
    }
  }
}
