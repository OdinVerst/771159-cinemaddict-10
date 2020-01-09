export default class Comment {
  constructor(data) {
    this.id = data.id;
    this.name = data.author;
    this.text = data.comment;
    this.emoji = data.emotion;
    this.date = data.date;
  }

  toRAW() {
    return {
      'comment': this.text,
      'emotion': this.emoji,
      'date': this.date,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}
