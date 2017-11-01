const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) console.error(err);;
});

class Profiles {
  static findAllProfiles() {
    const queryJoin = `
      SELECT Profile.id, Profile.username, Profile.password, Contacts.name
      FROM Profile JOIN Contacts ON Profile.id_contact = Contacts.id
    `;

    return new Promise((resolve, reject) => {
      db.all(queryJoin, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });
  }

  static createProfiles(data) {
    const queryPut = `
      INSERT INTO Profile (username, password, id_contact)
      VALUES ('${data.username}','${data.password}', '${data.id}')
    `;

    return new Promise((resolve, reject) => {
      db.run(queryPut, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static editProfiles(data) {
    const queryEdit = `SELECT * FROM Profile WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.get(queryEdit, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });
  }

  static updateProfiles(data) {
    const queryUpdate = `
      UPDATE Profile
      SET username = '${data.username}',
          password = '${data.password}'
      WHERE id IS ${data.id}
    `;
    
    return new Promise((resolve, reject) => {
      db.run(queryUpdate, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deleteProfiles(data) {
    const queryDelete = `DELETE FROM Profile WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.run(queryDelete, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Profiles;