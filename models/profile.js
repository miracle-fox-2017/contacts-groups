var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Profile {
  static findAll(callback) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name, Contacts.id as ContactId FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.ContactId`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  // Delete data profile
  static delete(data) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE from Profile WHERE id = "${data}"`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  //menerima input data profile
  static create(body) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${body.username}', '${body.password}', '${body.ContactId}')`, (err, rows) => {
        if (!err) {
          resolve();
        } else { reject(err); }
      });
    });
  }

  // Menampilkan data profile spesifik untuk diubah
  static editById(params) {
    return new Promise((resolve, reject) => {
      db.each(`SELECT * FROM Profile WHERE id = ${params}`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static update(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Profile SET username = '${body.username}', password = '${body.password}', ContactId = '${body.ContactId}' WHERE id = '${params.id}'`, (err) => {
        if (!err) {
          resolve(err);
        } else { reject(err); }
      });
    });
  }

  // Menampilkan data profile spesifik untuk diubah
  // app.get('/profiles/edit/:id', (req, res) => {
  //   db.each(`SELECT * FROM Profile WHERE id = ${req.params.id}`, (err, rows) => {
  //     db.all('SELECT * FROM Contacts', (err, rowsContact) => {
  //       res.render('profileEdit', { data: rows, dataContacts: rowsContact });
  //     });
  //   });
  // });
  //
  // app.post('/profiles/edit/:id', function (req, res) {
  //   db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
  //     res.redirect('../../profiles');
  //   });
  // });
  // app.post('/profiles', function (req, res) {
  //   db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')`, (err, rows) => {
  //     res.redirect('profiles');
  //   });
  // });
  // app.get('/profiles/delete/:id', (req, res) => {
  //   db.run(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
  //     res.redirect('../../profiles');
  //   });
  // });
  // static findAll(callback) {
  //   db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name, Contacts.id as ContactId FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.ContactId`, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       callback(rows);
  //     }
  //   });
  // }
}

module.exports = Profile;
