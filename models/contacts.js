const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Contact{
  static findAll(callBack){
    let queryContacts = `SELECT * FROM Contacts`
    db.all(queryContacts, function(err, rowsContacts){
      callBack(err, rowsContacts)
    })
  }

  static addContact(body, callBack){
    let name = body.name
    let company = body.company
    let telp = body.telp
    let email = body.email
    let queryPostContacts = `INSERT INTO contacts(name, company, telp, email)
                            VALUES('${name}', '${company}', '${telp}', '${email}')`
    db.run(queryPostContacts, err =>{
      callBack(queryPostContacts, err)
    })
  }

  static formEditContact(params, callBack){
    let queryEditContacts = `SELECT * FROM Contacts WHERE id=${params}`
    db.each(queryEditContacts, function(err, rowsEdit){
      callBack(rowsEdit)
    })
  }

  static editContact(params, body){
    let name = body.name
    let company = body.company
    let telp = body.telp
    let email = body.email
    let updateContacts = `UPDATE Contacts SET name = "${name}", company = "${company}",
                          telp = "${telp}", email = "${email}" WHERE id = "${params}"`
    db.all(updateContacts)
  }

  static deleteContact(params){
    let deleteContacts = `DELETE FROM Contacts WHERE id = "${params}"`
    db.all(deleteContacts)
  }
}

module.exports = Contact
