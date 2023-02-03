const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "image" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table} `);
  }

  insert(image, imageName) {
    return this.connection.query(
      `insert into ${this.table} (img, name, user_id ) values (?, ?, ?)`,
      [imageName, image.name, image.user_id]
    );
  }

  promotedImage() {
    return this.connection.query(
      `select * from  ${this.table} where promote=1 ORDER BY creation_date DESC LIMIT 20`
    );
  }

  updatePromote(image) {
    return this.connection.query(
      `update ${this.table} set promote= ? where id = ?`,
      [image.id]
    );
  }
}

module.exports = FileManager;
