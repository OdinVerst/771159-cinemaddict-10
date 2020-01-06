
const Sections = {
  INFO: `film_info`,
  USER: `user_details`
};

export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`] || [];

    this.name = data[Sections.INFO].title;
    this.alternaiveName = data[Sections.INFO].alternative_title;
    this.rating = data[Sections.INFO].total_rating;
    this.poster = data[Sections.INFO].poster;
    this.age = data[Sections.INFO].age_rating;
    this.director = data[Sections.INFO].director;
    this.writers = new Set(data[Sections.INFO].writers);
    this.actors = new Set(data[Sections.INFO].actors);
    this.relaese = new Date(data[Sections.INFO].release.date);
    this.contry = data[Sections.INFO].release.release_country;
    this.duration = data[Sections.INFO].runtime;
    this.genre = new Set(data[Sections.INFO].genre);
    this.description = data[Sections.INFO].description;

    this.userRating = data[Sections.USER].personal_rating;
    this.isWatchlist = Boolean(data[Sections.USER].watchlist);
    this.isWatched = Boolean(data[Sections.USER].already_watched);
    this.userDateWatch = data[Sections.USER].watching_date;
    this.isFavorite = Boolean(data[Sections.USER].favorite);
  }

  toRAW() {
    console.error(`JUNK`);
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
