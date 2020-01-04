
export default class Movie {
  constructor(data) {
    this.id = data[`id`];

    this.comments = data[`comments`] || [];

  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments || [],
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
