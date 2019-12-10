import AbstractComponent from "./abstract-component";

const createUserProfileTemplate = (range) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${range}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfile extends AbstractComponent {
  constructor(range) {
    super();
    this._range = range;
  }

  getTemplate() {
    return createUserProfileTemplate(this._range);
  }
}
