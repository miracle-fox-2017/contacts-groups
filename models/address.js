const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./database/database.db");


class Address {

  static findAll(callback){
    let query = `SELECT a.*, c.name as contacts
                FROM address AS a
                LEFT JOIN
                contacts as c
                ON a.id_contacts = c.id`;

    let queryContact = `SELECT * FROM contacts`

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
    let street = req.body.street;
    let city = req.body.city;
    let zipcode = req.body.zipcode;
    let id_contacts = req.body.id_contacts;

    let query = `INSERT INTO address
                (street, city, zipcode, id_contacts)
                VALUES
                ('${street}', '${city}' , '${zipcode}', '${id_contacts}') `;

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows)
      }else {
        callback(rows, null)
      }
    })

  }

  static findById(req, callback){
    let id = req.params.id;
    let query = `SELECT * FROM address WHERE id = '${id}'`
    let queryContact = `SELECT * FROM contacts`;

    db.all(query, function(err, rows) {
      if (!err) {
        db.all(queryContact, function(err, data) {
          callback(null, rows, data);
        })
      }else {
        callback(err, null, null);
      }
    })

  }


  static findByIdContact(req, callback){
    let id = req.params.id;
    let query = `SELECT * FROM address WHERE id_contacts = '${id}'`

    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows);
      }else {
        callback(err, null);
      }
    })

  }

  static update(req, callback){
    let id = req.body.id;
    let street = req.body.street;
    let city = req.body.city;
    let zipcode = req.body.zipcode;
    let id_contacts = req.body.id_contacts;

    let query = `UPDATE address SET street = '${street}', city = '${city}', zipcode = '${zipcode}', id_contacts = '${id_contacts}' WHERE id = '${id}'`;

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

    let query = `DELETE FROM address WHERE id ='${id}'`


    db.all(query, function(err, rows) {
      if (!err) {
        callback(null, rows);
      }else {
        callback(err, null);
      }
    })
  }

}

module.exports = Address;
