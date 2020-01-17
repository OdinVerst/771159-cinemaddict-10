import AbstractComponent from "./abstract-component";

const createButtonMoreTemplate = () => {
  return `<h2>Loading...</h2>`;
};

export default class Preloader extends AbstractComponent {
  getTemplate() {
    return createButtonMoreTemplate();
  }
}
