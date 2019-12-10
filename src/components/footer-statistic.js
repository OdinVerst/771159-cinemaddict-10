import AbstractComponent from "./abstract-component";

const createFooterStatisticTemplate = (count) => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class FooterStatistic extends AbstractComponent {
  constructor(countFilms) {
    super();
    this._countFilms = countFilms;
  }
  getTemplate() {
    return createFooterStatisticTemplate(this._countFilms);
  }
}
