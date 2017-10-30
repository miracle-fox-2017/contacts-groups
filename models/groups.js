const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

class Groups {
  static findAllGroups(callback) {
    db.all(`SELECT * FROM Groups`, (err, records) => {
      if (err) callback(err, null);
      callback(null, records);
    });
  }

  static createGroups(data, callback) {
    const queryPut = `INSERT INTO Groups (name_of_group)
            VALUES ('${data.name}')`;
    db.run(queryPut, err => {
      callback(err);
    });
  }

  static editGroups(data, callback) {
    const queryEdit = `SELECT * FROM Groups WHERE id IS ${data.id}`;
    db.get(queryEdit, (err, records) => {
      if (err) callback(err, null);
      callback(null, records)
    });
  }

  static updateGroups(data, callback) {
    const queryUpdate = `
      UPDATE Groups
      SET name_of_group = '${data.name}'
      WHERE id IS ${data.id}`;
    
    db.run(queryUpdate, err => {
      callback(err);
    });
  }

  static deleteGroups(data, callback) {
    const queryDelete = `DELETE FROM Groups WHERE id IS ${data.id}`;

    db.run(queryDelete, err => {
      callback(err);
    });
  }
}

module.exports = Groups;