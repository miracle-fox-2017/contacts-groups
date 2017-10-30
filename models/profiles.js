const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

class Profiles {
  static findAllProfiles(callback) {
    const queryJoin = `SELECT Profile.id, Profile.username, Profile.password, Contacts.name FROM Profile
    JOIN Contacts ON Profile.id_contact = Contacts.id`;
    db.all(queryJoin, (err, records) => {
      if (err) callback(err, null);
      console.log(records);
      callback(null, records);
    });
  }

  static createProfiles(data, callback) {
    const queryPut = `INSERT INTO Profile (username, password, id_contact)
            VALUES ('${data.username}','${data.password}', '${data.id}')`;
    db.run(queryPut, err => {
      callback(err);
    });
  }

  static editProfiles(data, callback) {
    const queryEdit = `SELECT * FROM Profile WHERE id IS ${data.id}`;
    db.get(queryEdit, (err, records) => {
      if (err) callback(err, null);
      callback(null, records)
    });
  }

  static updateProfiles(data, callback) {
    const queryUpdate = `
      UPDATE Profile
      SET username = '${data.username}',
          password = '${data.password}'
      WHERE id IS ${data.id}`;
    
    db.run(queryUpdate, err => {
      callback(err);
    });
  }

  static deleteProfiles(data, callback) {
    const queryDelete = `DELETE FROM Profile WHERE id IS ${data.id}`;

    db.run(queryDelete, err => {
      callback(err);
    });
  }
}

module.exports = Profiles;