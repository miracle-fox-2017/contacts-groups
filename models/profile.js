const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Profile{

  static findAll(){
    return new Promise(function(resolve,reject){
      let queryJoinProfileContacts = `select Profile.id, Profile.username, Profile.password, Contacts.name from profile left join Contacts on Profile.contact_id = Contacts.id`
      db.all(queryJoinProfileContacts, function(err,data_join){
        if(!err){
          resolve(data_join)
        }else{
          reject(err)
        }
      })
    })
  }

  static create(reqbody){
    return new Promise(function(resolve,reject){
      db.run(`insert into profile(username,password,contact_id) values ('${reqbody.username}','${reqbody.password}','${reqbody.name}')`, function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

  static findById(reqparams){
    return new Promise(function(resolve,reject){
      db.all(`select * from Profile where id="${reqparams.id}"`,function(err,data_Profile){
        if(!err){
          resolve(data_Profile[0])
        }else{
          reject(err)
        }
      })
    })
  }

  static update(reqbody,reqparams){
    return new Promise(function(resolve,reject){
      db.run(`update Profile set username="${reqbody.username}", password="${reqbody.password}", contact_id="${reqbody.name}" where id="${reqparams.id}"`, function(err){
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
      db.run(`delete from Profile where id='${reqparams.id}'`,function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

}



module.exports = Profile
