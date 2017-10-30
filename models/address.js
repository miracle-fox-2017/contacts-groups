const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

class Address {
  static findAllAddress(callback) {
    db.all(`SELECT * FROM Addresses`, (err, records) => {
      if (err) callback(err, null);
      callback(null, records);
    });
  }

  static createAddress(data, callback) {
    const queryPut = `INSERT INTO Addresses (street, city, zipcode)
            VALUES ('${data.street}','${data.city}', '${data.zipcode}')`;
    db.run(queryPut, err => {
      callback(err);
    });
  }

  static editAddress(data, callback) {
    const queryEdit = `SELECT * FROM Addresses WHERE id IS ${data.id}`;
    db.get(queryEdit, (err, records) => {
      if (err) callback(err, null);
      callback(null, records)
    });
  }

  static updateAddress(data, callback) {
    const queryUpdate = `
      UPDATE Addresses
      SET street = '${data.street}',
          city = '${data.city}',
          zipcode = '${data.zipcode}'
      WHERE id IS ${data.id}`;
    
    db.run(queryUpdate, err => {
      callback(err);
    });
  }

  static deleteAddress(data, callback) {
    const queryDelete = `DELETE FROM Addresses WHERE id IS ${data.id}`;

    db.run(queryDelete, err => {
      callback(err);
    });
  }
}

module.exports = Address;