const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./database/database.db");


class Profile {
  static findAll(callback){
    let query = `SELECT p.*, c.name as contacts FROM profile as p
                LEFT JOIN contacts as c
                ON p.id_contacts = c.id`;

    let queryContact = `SELECT * FROM contacts`;

    db.all(query, function(err, rows) {
      if (!err) {
        db.all(queryContact, function(err, data) {
          if (!err) {
            callback(null, rows, data)
          }
        })
      }else {
        callback(err, null, null)
      }
    })
  }

  static create(req, callback){
    let username = req.body.username;
    let password = req.body.password;
    let contacts = req.body.id_contacts;

    let queryCount = `SELECT COUNT(*) FROM profile WHERE id_contacts = '${contacts}'`
    let query = `INSERT INTO
                profile (username, password, id_contacts)
                VALUES
                ('${username}', '${password}', '${contacts}')`;

    db.all(queryCount, function(err, count) {
      let check = count[0];
      if (!err) {
        if (check ==0) {
          db.all(query, function (err, rows){
            if(!err){
              callback(null, check, rows)
            }
          });
        }else {
          callback(null, check, null)
        }
      }else {
        callback(err, null, null)
      }
    })
  }

  static findById(req, callback){
    let id = req.params.id;

    let query = `SELECT * FROM profile WHERE id = '${id}'`
    let queryContact = `SELECT * FROM contacts`;

    db.all(query, function(err, rows) {
      if (!err) {
        db.all(queryContact, function(err, data) {
          if (!err) {
            callback(null, rows, data);
          }
        })
      }else {
        callback(err, null, null);
      }
    })

  }

  static update(req, callback){
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    let id_contacts = req.body.id_contacts;

    let query = `UPDATE profile
                SET
                username = '${username}',
                password = '${password}',
                id_contacts = '${id_contacts}'
                WHERE
                id = '${id}'`;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

  static remove(req, callback){
    let id = req.params.id;
    let query = `DELETE FROM profile WHERE id = '${id}'`

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

}

module.exports = Profile;
