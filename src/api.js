import Movie from "./models/movie";
import Comment from "./models/comment";

const Methods = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getMovies() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(Movie.parseMovies);
  }

  updateMovie(idMove, data) {
    return this._load({
      url: `movies/${idMove}`,
      method: Methods.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  getComments(idMove) {
    return this._load({url: `comments/${idMove}`})
    .then((response) => response.json())
    .then(Comment.parseComments);
  }

  deleteComment(idComment) {
    return this._load({
      url: `comments/${idComment}`,
      method: Methods.DELETE,
    })
    .then((response) => response);
  }

  addNewComment(idMove, data) {
    return this._load({
      url: `comments/${idMove}`,
      method: Methods.POST,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((parseData)=> Movie.parseMovie(parseData.movie));
  }

  _load({url, method = Methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
