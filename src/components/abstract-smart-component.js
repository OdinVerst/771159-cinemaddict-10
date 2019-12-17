import AbstractComponent from "./abstract-component";

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
    if (new.target === AbstractSmartComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const {scrollTop} = oldElement;
    const parent = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    newElement.scrollTop = scrollTop;
    this.recoveryListeners();
  }
}
