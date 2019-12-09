
import AbstractComponent from './abstract-component';

const createExtraFilmsTemplate = (title) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsExtraList extends AbstractComponent {
  constructor(tilte) {
    super();
    this._title = tilte;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._title);
  }
}
