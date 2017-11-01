const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) console.error(err);
});

class Address {
  static findAllAddress() {
    const queryJoin = `
      SELECT *
      FROM Addresses
      JOIN Contacts ON Addresses.id_contact = Contacts.id
    `;

    return new Promise((resolve, reject) => {
      db.all(queryJoin, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });
  }

  static createAddress(data) {
    const queryPut = `
      INSERT INTO Addresses (street, city, zipcode, id_contact)
      VALUES ('${data.street}','${data.city}', '${data.zipcode}', '${data.id}')
    `;

    return new Promise((resolve, reject) => {
      db.run(queryPut, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static editAddress(data) {
    const queryEdit = `SELECT * FROM Addresses WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.get(queryEdit, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });
  }

  static updateAddress(data) {
    const queryUpdate = `
      UPDATE Addresses
      SET street = '${data.street}',
          city = '${data.city}',
          zipcode = '${data.zipcode}'
      WHERE id IS ${data.id}
    `;

    return new Promise((resolve, reject) => {
      db.run(queryUpdate, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deleteAddress(data, callback) {
    const queryDelete = `DELETE FROM Addresses WHERE id IS ${data.id}`;

    return new Promise((resolve, reject) => {
      db.run(queryDelete, err => {
        if (err) reject(err);
        resolve();
      });
    })
  }

  /* static findAddressWithContacts(callback) {
    const queryContacts = `SELECT * FROM Contacts`;
    const queryAddress = `SELECT * FROM Addresses`;

    db.all(queryContacts, (err, contactRecords) => {
      db.all(queryAddress, (err, addressRecords) => {
        if (err) callback(err, null);
        const recordsObj = {
          contacts: contactRecords,
          address: addressRecords
        }
        callback(null, recordsObj);
      });
    });
  } */
}

module.exports = Address;