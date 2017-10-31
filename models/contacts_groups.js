var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class ContactsGroups {

  // static findAll(callback) {
  //   db.all(`SELECT ContactsGroups.ContactId, ContactsGroups.GroupId, Groups.name_of_group FROM ContactsGroups LEFT JOIN Groups ON Groups.id = ContactsGroups.GroupId`, (err, rows)=> {
  //     if (err) {
  //       console.log(err);
  //     }else {
  //       callback(rows);
  //     }
  //   });
  // }
  //PROMISE
  static findAll(callback) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT ContactsGroups.ContactId, ContactsGroups.GroupId, Groups.name_of_group FROM ContactsGroups LEFT JOIN Groups ON Groups.id = ContactsGroups.GroupId`, (err, rows)=> {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static findName(callback) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT ContactsGroups.ContactId, ContactsGroups.GroupId, Contacts.name FROM ContactsGroups LEFT JOIN Contacts ON Contacts.id = ContactsGroups.ContactId`, (err, rows)=> {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  // Menampilkan data groupsContact spesifik untuk diubah
  static findConjunction(callback) {
    return new Promise((resolve, reject) => {
      db.all('SELECT C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group FROM Contacts as C LEFT JOIN ContactsGroups as CG ON C.id = CG.ContactId LEFT JOIN Groups as G on G.id = CG.GroupId', (err, rowsContact) => {
        if (!err) {
          resolve(rowsContact);
        } else { reject(err); }
      });
    });
  }

  static create(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${body.name}', '${params.id}')`, (err, rows) => {
        if (!err) {
          resolve();
        } else { reject(err); }
      });
    });
  }

  static createContact(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${body}', '${params}')`, (err, rows) => {
        if (!err) {
          resolve();
        } else { reject(err); }
      });
    });
  }

  // Menampilkan data groupsContact spesifik untuk diubah
  // app.get('/groups/assign_contacts/:id', function (req, res) {
  //   db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
  //     db.all('SELECT C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group FROM Contacts as C LEFT JOIN ContactsGroups as CG ON C.id = CG.ContactId LEFT JOIN Groups as G on G.id = CG.GroupId', (err, rowsContact) => {
  //       // console.log(rows);
  //       res.render('assign_contacts', { data: rows, dataContacts: rowsContact });
  //     });
  //   });
  // });
  //
  // app.post('/groups/assign_contacts/:id', function (req, res) {
  //   // db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, function (err, rows2) {
  //   //   let id = this.lastID;
  //   // console.log(req.body);
  //   // console.log(req.params.id);
  //     db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${req.body.name}', '${req.params.id}')`, (err, rows) => {
  //       // console.log(err);
  //       res.redirect('/groups');
  //     });
  //   });
}

module.exports = ContactsGroups;
