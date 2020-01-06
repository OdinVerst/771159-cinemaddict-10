export default class Comment {
  constructor(data) {
    this.id = data.id;
    this.name = data.author;
    this.text = data.comment;
    this.emoji = data.emotion;
    this.date = data.date;
  }

  toRAW() {
    console.error(`JUNK`);
    // return {
    //   'id': this.id,
    //   'comments': this.comments || [],
    // };
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
