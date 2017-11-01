const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) console.error(err);
});

class Contacts {
  static findAllContacts() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Contacts`, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    })
  }

  static createContacts(data) {
    const queryPut = `
      INSERT INTO
        Contacts (name, telp_number, email, company)
      VALUES
        ('${data.name}', '${data.phone}', '${data.email}', '${data.company}')
    `;

    return new Promise((resolve, reject) => {
      db.run(queryPut, function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static editContacts(data) {
    const queryEdit = `SELECT * FROM Contacts WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.get(queryEdit, (err, records) => {
        if (err) reject(err);
        resolve(records, 'test');
      });
    });
  }

  static updateContacts(data) {
    const queryUpdate = `
      UPDATE Contacts
      SET name = '${data.name}',
          telp_number = '${data.phone}',
          email = '${data.email}',
          company = '${data.company}'
      WHERE id IS ${data.id}
    `;

    return new Promise((resolve, reject) => {
      db.run(queryUpdate, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deleteContacts(data) {
    const queryDelete = `DELETE FROM Contacts WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.run(queryDelete, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Contacts;