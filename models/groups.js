const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./database/database.db");

class Group {
  static findAll(callback){
    let query = `SELECT * FROM groups`;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows);
      }else{
        callback(err, null);
      }
    });
  }

  static create(req, callback){
    let name = req.body.name;
    let query = `INSERT INTO groups
                (name_of_group) VALUES ('${name}')`
    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

  static findById(req, callback){
    let id = req.params.id;
    let query = `SELECT * FROM groups WHERE id ='${id}'`;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

  static update(req, callback){
    let id = req.body.id
    let name = req.body.name
    let query = `UPDATE groups SET name_of_group = '${name}'
                WHERE
                id = '${id}'`
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

    let query = `DELETE FROM groups WHERE id ='${id}' `;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

  static inputconj(req, callback){
    let id_groups = req.body.id;
    let id_contacts = req.body.id_contacts;

    let query = `INSERT INTO consContactGroups (id_contacts, id_groups)
              VALUES
              ('${id_contacts}', '${id_groups}')`

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(err, null)
      }
    })
  }

  static groupContact(req, callback){
    let query = `SELECT g.*, c.name as contacts FROM groups as g
                LEFT JOIN
                consContactGroups as co ON
                co.id_groups = g.id
                LEFT JOIN
                contacts as c ON
                co.id_contacts = c.id`;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows);
      }else{
        callback(err, null);
      }
    });
  }
}

module.exports = Group;
