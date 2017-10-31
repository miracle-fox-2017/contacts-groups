var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Address {

  //PROMISE
  static findAll(callback) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.id as ContactId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  // static findAll(callback) {
  //   db.all(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.id as ContactId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId`, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       callback(rows);
  //     }
  //   });
  // }

  //menerima input data address
  // static create(req, callback) {
  //   db.run(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}','${req.body.city}', ${req.body.zipcode}, ${req.body.ContactId})`, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }else {
  //       callback(rows);
  //     }
  //   });
  // }

  static create(body) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ("${body.street}", "${body.city}", "${body.zipcode}", "${body.ContactId}")`, function (err) {
        if (!err) {
          resolve();
        } else { reject(err); }
      });
    });
  }

  // static createForContact(body) {
  //   return new Promise((resolve, reject) => {
  //     db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ("${body.street}", "${body.city}", "${body.zipcode}", "${body.ContactId}") WHERE id = '${params.id}'`, (err) => {
  //       if (!err) {
  //         resolve();
  //       } else { reject(err); }
  //     });
  //   });
  // }

  // Menampilkan data address spesifik untuk diubah
  static editById(params) {
    return new Promise((resolve, reject) => {
      db.each(`SELECT * FROM Addresses WHERE id = ${params}`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static update(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Addresses SET street = '${body.street}', city = '${body.city}', zipcode = '${body.zipcode}', ContactId = '${body.ContactId}' WHERE id = '${params.id}'`, (err) => {
        if (!err) {
          resolve(err);
        } else { reject(err); }
      });
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE from Addresses WHERE id = "${data}"`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static editByContactId(params) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Addresses where ContactId = "${params}"`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }
}

// app.get('/contacts/address/:id', (req, res) => {
//   db.all(`SELECT * FROM Addresses where ContactId = "${req.params.id}"`, (err, rows) => {
//     db.get(`SELECT * from Contacts where id = "${req.params.id}"`, (err, rowsContact) => {
//       res.render('addresses_with_contact', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });

// app.get('/addresses/edit/:id', (req, res) => {
//   db.each(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, (err, rows) => {
//     db.all('SELECT * FROM Contacts', (err, rowsContact) => {
//       res.render('addressEdit', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });
// app.post('/addresses/edit/:id', function (req, res) {
//   db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
//     res.redirect('../../addresses');
//   });
// });
//
// // Delete data address
// app.get('/addresses/delete/:id', (req, res) => {
//   db.run(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
//     res.redirect('../../addresses');
//   });
// });

module.exports = Address;
