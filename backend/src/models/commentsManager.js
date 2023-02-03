const AbstractManager = require("./AbstractManager");

class commentsManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  getComments(imageId) {
    return this.connection.query(
      `SELECT comment.id, comment.content, comment.creation_date, comment.user_id, comment.image_id, user.firstname, user.lastname, user.avatar
      FROM ${this.table}
      JOIN user on ${this.table}.user_id = user.id 
      WHERE image_id = ?
      ORDER BY comment.creation_date DESC`,
      [imageId]
    );
  }

  insertComment(comment) {
    return this.connection.query(
      `INSERT into ${this.table} (content, user_id, image_id) values ( ?, ?, ?)`,
      [comment.content, comment.user_id, comment.image_id]
    );
  }

  updateComment(comment) {
    return this.connection.query(
      `update ${this.table} set content = ?, where id=? `,
      [comment.content, comment.id]
    );
  }

  deleteCommentByImageId(imageId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where image_id = ?`,
      [imageId]
    );
  }
}

module.exports = commentsManager;
