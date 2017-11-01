const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) console.error(err);
});

class Groups {
  static findAllGroups() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });
  }

  static createGroups(data) {
    const queryPut = `
      INSERT INTO Groups (name_of_group)
      VALUES ('${data.name}')
    `;

    return new Promise((resolve, reject) => {
      db.run(queryPut, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static editGroups(data) {
    const queryEdit = `SELECT * FROM Groups WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.get(queryEdit, (err, records) => {
        if (err) reject(err);
        resolve(records)
      });
    });
  }

  static updateGroups(data) {
    const queryUpdate = `
      UPDATE Groups
      SET name_of_group = '${data.name}'
      WHERE id IS ${data.id}
    `;
    
    return new Promise((resolve, reject) => {
      db.run(queryUpdate, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deleteGroups(data) {
    const queryDelete = `DELETE FROM Groups WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.run(queryDelete, err => {
        if(err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Groups;