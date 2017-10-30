const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

class Contacts {
  static findAllContacts(callback) {
    db.all(`SELECT * FROM Contacts`, (err, records) => {
      if (err) callback(err, null);
      callback(null, records);
    });
  }

  static createContacts(data, callback) {
    const queryPut = `INSERT INTO Contacts (name, telp_number, email, company)
            VALUES ('${data.name}', '${data.phone}', '${data.email}', '${data.company}')`;
    db.run(queryPut, err => {
      callback(err);
    });
  }

  static editContacts(data, callback) {
    const queryEdit = `SELECT * FROM Contacts WHERE id IS ${data.id}`;
    db.get(queryEdit, (err, records) => {
      if (err) callback(err, null);
      callback(null, records)
    });
  }

  static updateContacts(data, callback) {
    const queryUpdate = `
      UPDATE Contacts
      SET name = '${data.name}',
          telp_number = '${data.phone}',
          email = '${data.email}',
          company = '${data.company}'
      WHERE id IS ${data.id}`;
    
    db.run(queryUpdate, err => {
      callback(err);
    });
  }

  static deleteContacts(data, callback) {
    const queryDelete = `DELETE FROM Contacts WHERE id IS ${data.id}`;

    db.run(queryDelete, err => {
      callback(err);
    });
  }
}

module.exports = Contacts;