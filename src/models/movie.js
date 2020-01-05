
const Sections = {
  INFO: `film_info`,
  USER: `user_details`
};

export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`] || [];

    if (data[Sections.INFO]) {
      this.name = data[Sections.INFO].title;
      this.alternaiveName = data[Sections.INFO].alternative_title;
      this.poster = data[Sections.INFO].poster;
    }

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
