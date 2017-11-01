const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./database/database.db");


class Contact {
  // SELECT ALL
  static findAll(callback){
    let query = `SELECT * FROM contacts`;
    db.all(query, function (err, contact){
      if(!err){
        callback(null, contact)
      }else {
        callback(err, null)
      }
    })
  }

  // INSERT
  static create(req, callback){
    let name = req.body.name;
    let company = req.body.company;
    let telp = req.body.telp;
    let email = req.body.email;
    let id_contacts = req.body.id;
    let id_groups = req.body.id_groups;

    let query = `INSERT INTO contacts
                (name, company, telp, email)
                VALUES
                ('${name}', '${company}', '${telp}', '${email}')`;

    let queryContactGroup = `INSERT INTO consContactGroups
                              (id_contacts, id_groups)
                              VALUES
                              ('${id_contacts}', '${id_groups}')`;

    db.all(query, function (err, contact){
      if(!err){
        db.all(queryContactGroup, function (err, contactGroup) {
          if (!err) {
            callback(null, contact, contactGroup)
          }
        })
      }else{
        callback(err, null, null)
      }
    });
  }

  // SELECT BY ID
   static findById(req, callback){
     let id = req.params.id;

     let query = `SELECT * FROM contacts WHERE id = '${id}'`
     db.all(query, function (err, rows){
       if(!err){
         callback(null, rows);
       }else {
         callback(err, null);
       }
     });
   }

   static update(req, callback){
     let id = req.body.id;
     let name = req.body.name;
     let company = req.body.company;
     let telp = req.body.telp;
     let email = req.body.email;

     let query = `UPDATE contacts SET
                  name = '${name}',
                  company = '${company}',
                  telp = '${telp}',
                  email = '${email}'
                  WHERE
                  id = ${id}`;

      db.all(query, function(err, rows) {
        if (!err) {
          callback(null, rows);
        }else {
          callback(err, null);
        }
      })
   }

   static remove(req, callback){
     let id = req.params.id;
     let query = `DELETE FROM contacts WHERE id = '${id}'`
     db.all(query, function(err, rows) {
       if (!err) {
         callback(null, rows);
       }else {
         callback(err, null);
       }
     })
   }

}


module.exports = Contact;
