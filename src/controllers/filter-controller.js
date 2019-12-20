export default class FilterController {
  constructor(container, movieModel) {
    this._containrer = container;
    this._movieModel = movieModel;
  }

  render() {
    const container = this._container;
    const allMovies = this._movieModel.getTasksAll();
  }
}
