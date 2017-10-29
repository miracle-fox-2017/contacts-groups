const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Address {
  static getall(cb){
    db.all(`SELECT * FROM Addresses`,(err,rows)=>{
      console.log(rows);
      cb(rows)
    })
  }

  static addnew(add){
    db.run(`INSERT INTO Addresses(Street,City,Zipcode)
            VALUES('${add.street}','${add.city}','${add.zipcode}')`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Addresses WHERE Id_address = ${id}`,(err,row)=>{
      cb(row)
    })
  }

  static update (id,edit){
    db.run(`UPDATE Addresses
      SET Street = '${edit.street}',City ='${edit.city}',Zipcode = '${edit.zipcode}'
      WHERE Id_address = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Addresses
            WHERE Id_address ='${id}';`)
  }

}



module.exports = Address;
