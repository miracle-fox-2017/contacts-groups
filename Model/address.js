const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Address {
  static gettable(call){
    db.all(`SELECT * FROM Addresses`,(err,rowstable)=>{
      call(rowstable)
    })
  }

  static getall(cb){ //buat join table bisa pake left atau inner
    //dicoba dlu takut masih salah
    db.all(`SELECT Addresses.Id_address, Addresses.Street, Addresses.City, Addresses.Zipcode, Contacts.Name
      FROM Addresses LEFT JOIN Contacts ON Addresses.ContactID=Contacts.ID`,(err,rows)=>{
      console.log(rows);
      cb(rows)
    })
  }

  static addnew(add){
    db.run(`INSERT INTO Addresses(Street,City,Zipcode,ContactID)
            VALUES('${add.street}','${add.city}','${add.zipcode}',${add.contactid})`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Addresses WHERE Id_address = ${id}`,(err,row)=>{
      cb(row)
    })
  }

  static update (id,edit){
    db.run(`UPDATE Addresses
      SET Street = '${edit.street}',City ='${edit.city}',Zipcode = '${edit.zipcode}',ContactID ='${edit.contactid}'
      WHERE Id_address = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Addresses
            WHERE Id_address ='${id}';`)
  }

}



module.exports = Address;
