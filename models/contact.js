const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Contact{
  static findAll(callback){
    db.all(`SELECT * FROM Contacts`,function(err,rowContacts){
      callback(rowContacts)
    })
  }
  static inputContact(request){
    db.run(`INSERT INTO Contacts(Name, Company, Telp_number, Email)
    VALUES ('${request.Name}','${request.Company}','${request.Telp_number}','${request.Email}')` )
  }
  static findID(request,callback){
    db.each(`SELECT * FROM Contacts WHERE id = ${request}`, function(err,rowContacts){
      callback(rowContacts)
    })
  }
  static editContact(requestparam,requestbody){
    db.run(`UPDATE Contacts
      SET Name = '${requestbody.Name}',
      Company = '${requestbody.Company}',
      Telp_number = '${requestbody.Telp_number}',
      Email = '${requestbody.Email}'
      WHERE id = ${requestparam}
    ` )
  }
static deleteContact(requestparam){
  db.run(`DELETE FROM Contacts WHERE id = ${requestparam}`)
}

}




module.exports = Contact
