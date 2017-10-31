var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Group {

  // static findAll(callback) {
  //   db.all(`SELECT * FROM Groups`, (err, rows)=> {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       callback(rows);
  //     }
  //   });
  // }
  //PROMISE
  static findAll(callback) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, (err, rows)=> {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE from Groups WHERE id = "${data}"`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  //menerima input data groups
  static create(body) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into Groups (name_of_group) VALUES ('${body.name_of_group}')`, (err, rows) => {
        if (!err) {
          resolve();
        } else { reject(err); }
      });
    });
  }
  //menerima input data groups
  // app.post('/groups', function (req, res) {
  //   db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, (err, rows) => {
  //     res.redirect('groups');
  //   });
  // });

  // Menampilkan data group spesifik untuk diubah
  static editById(params) {
    return new Promise((resolve, reject) => {
      db.each(`SELECT * FROM Groups WHERE id = ${params}`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static update(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Groups SET name_of_group = '${body.name_of_group}' WHERE id = '${params.id}'`, (err) => {
        if (!err) {
          resolve(err);
        } else { reject(err); }
      });
    });
  }
  // Menampilkan data group spesifik untuk diubah
  // app.get('/groups/edit/:id', (req, res) => {
  //   db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
  //     res.render('groupEdit', { data: rows });
  //   });
  // });
  // app.post('/groups/edit/:id', function (req, res) {
  //   db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, (err) => {
  //     res.redirect('../../groups');
  //   });
  // });
  // app.get('/groups/delete/:id', (req, res) => {
  //   db.run(`DELETE from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
  //     res.redirect('../../groups');
  //   });
  // });
}

module.exports = Group;
