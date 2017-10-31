const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Contacts{

  static findAll(){
    return new Promise(function(resolve,reject){
      db.all(`select * from Contacts`,function(err,data_Contacts){
        if(!err){
          resolve(data_Contacts)
        }else{
          reject(err)
        }
      })
    })
  }

  static create(reqbody){
    return new Promise(function(resolve,reject){
      db.run(`insert into Contacts(name,company,telp_number,email) values ('${reqbody.name}','${reqbody.company}','${reqbody.telp_number}','${reqbody.email}')`, function(err){
        if(!err){
          db.run(`insert into Contacts_Groups(id_contacts,id_groups) values ('${this.lastID}','${reqbody.new_group}')`,function(err){
            if(!err){
              resolve()
            }else{
              reject(err)
            }
          })
        }else{
          console.log(err);
        }
      })
    })
  }

  static findById(reqparams){
    return new Promise(function(resolve,reject){
      db.all(`select * from Contacts where id=${reqparams.id}`,function(err,data_Contacts){
        if(!err){
          resolve(data_Contacts[0])
        }else{
          reject(err)
        }
      })
    })
  }

  static update(reqbody,reqparams){
    return new Promise(function(resolve,reject){
      db.run(`update Contacts set name = "${reqbody.name}", company = "${reqbody.company}", telp_number = "${reqbody.telp_number}", email = "${reqbody.email}" where id = "${reqparams.id}"`,(err)=>{
      if(!err){
        resolve()
      }else{
        reject(err)
      }
      })
    })
  }

  static reMove(reqparams){
    return new Promise(function(resolve,reject){
      db.run(`delete from Contacts where id='${reqparams.id}'`,function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

}

module.exports = Contacts
