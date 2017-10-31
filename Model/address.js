const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Address {
  static gettable(){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM Addresses`,(err,rowstable)=>{
        if (err){
          reject(err)
        }
        else{
          resolve(rowstable)
        }
      })
    })
    // db.all(`SELECT * FROM Addresses`,(err,rowstable)=>{
    //   call(rowstable)
    // })
  }

  static getall(cb){ //buat join table bisa pake left atau inner
    //dicoba dlu takut masih salah
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT Addresses.Id_address, Addresses.Street, Addresses.City, Addresses.Zipcode, Contacts.Name
        FROM Addresses LEFT JOIN Contacts ON Addresses.ContactID=Contacts.Id`,(err,rows)=>{
        if (err){ reject(err) }
        else{ resolve(rows) }
    })
    // db.all(`SELECT Addresses.Id_address, Addresses.Street, Addresses.City, Addresses.Zipcode, Contacts.Name
    //   FROM Addresses LEFT JOIN Contacts ON Addresses.ContactID=Contacts.ID`,(err,rows)=>{
    //   console.log(rows);
    //   cb(rows)
    })
  }
  static findbyid (id){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM Addresses WHERE ContactID ='${id}'`,(err,rowsbyid) => {
        if(err){
          reject(err)
        } else { resolve(rowsbyid) }
      })
    })
  }
//
  static addnew(add){
    db.run(`INSERT INTO Addresses(Street,City,Zipcode,ContactID)
            VALUES('${add.street}','${add.city}','${add.zipcode}',${add.contactid})`)
  }
//
  static edit (id){
    return new Promise ((resolve,reject)=>{
      db.get(`SELECT * FROM Addresses WHERE Id_address = ${id}`,(err,row)=>{
        if (err){ reject(err) }
        else{ resolve(row) }
      })
    })
    // db.get(`SELECT * FROM Addresses WHERE Id_address = ${id}`,(err,row)=>{
    //   cb(row)
    // })
  }
//
  static update (id,edit){
    db.run(`UPDATE Addresses
      SET Street = '${edit.street}',City ='${edit.city}',Zipcode = '${edit.zipcode}',ContactID ='${edit.contactid}'
      WHERE Id_address = '${id}';`)
  }
//
  static addDelete(id){
    db.get(`DELETE FROM Addresses
            WHERE Id_address ='${id}';`)
  }
//
}
//


module.exports = Address;
