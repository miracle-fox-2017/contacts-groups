const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Contacts{

  static findAll(cb){
    db.all(`select * from Contacts`,function(err,data_Contacts){
      if(!err){
        cb(null,data_Contacts)
      }else{
        cb(err,null)
      }
    })
  }

  static create(reqbody){
    db.run(`insert into Contacts(name,company,telp_number,email) values ('${reqbody.name}','${reqbody.company}','${reqbody.telp_number}','${reqbody.email}')`, function(err){
      if(!err){
        db.run(`insert into Contacts_Groups(id_contacts,id_groups) values ('${this.lastID}','${reqbody.new_group}')`,function(err){
          if(!err){
            console.log('insert into Contacts_Groups');
          }else{
            console.log(err,'insert into Contacts_Groups');
          }
        })
      }else{
        console.log(err);
      }
    })
  }

  static findById(reqparams,cb){
    db.all(`select * from Contacts where id=${reqparams.id}`,function(err,data_Contacts){
      if(!err){
        cb(null,data_Contacts[0])
      }else{
        cb(err,null)
      }
    })
  }

  static update(reqbody,reqparams){
    db.run(`update Contacts set name = "${reqbody.name}", company = "${reqbody.company}", telp_number = "${reqbody.telp_number}", email = "${reqbody.email}" where id = "${reqparams.id}"`,(err)=>{
    if(err){
      console.log(err);
    }
  })
  }

  static reMove(reqparams){
    db.run(`delete from Contacts where id='${reqparams.id}'`,function(err){
      if(!err){
        console.log(`succes delete from Contacts`);
      }else{
        console.log(err);
      }
    })
  }

}

module.exports = Contacts
