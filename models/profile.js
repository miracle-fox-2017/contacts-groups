const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Profile{

  static findAll(cb){
    let queryJoinProfileContacts = `select Profile.id, Profile.username, Profile.password, Contacts.name from profile left join Contacts on Profile.contact_id = Contacts.id`
    db.all(queryJoinProfileContacts, function(err,data_join){
      if(!err){
        cb(null,data_join)
      }else{
        cb(err,null)
      }
    })
  }

  static create(reqbody, cb){
    db.run(`insert into profile(username,password,contact_id) values ('${reqbody.username}','${reqbody.password}','${reqbody.name}')`, function(err){
      if(!err){
        cb(null,'succes insert into Profile')
      }else{
        cb(err,null)
      }
    })
  }

  static findById(reqparams,cb){
    db.all(`select * from Profile where id="${reqparams.id}"`,function(err,data_Profile){
      if(!err){
        cb(null,data_Profile[0])
      }else{
        cb(err,null)
      }
    })
  }

  static update(reqbody,reqparams){
    db.run(`update Profile set username="${reqbody.username}", password="${reqbody.password}", contact_id="${reqbody.name}" where id="${reqparams.id}"`, function(err){
      if(err){
        console.log(err);
      }
    })
  }

  static reMove(reqparams){
    db.run(`delete from Profile where id='${reqparams.id}'`,function(err){
      if(err){
        console.log(err);
      }
    })
  }

}



module.exports = Profile
