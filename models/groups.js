const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')


class Groups{

  static findAll(cb){
    db.all(`select * from Groups`, function(err,data_Groups){
      if(!err){
        cb(null,data_Groups)
      }else{
        cb(err,null)
      }
    })
  }

  static create(reqbody){
    db.run(`insert into Groups(name_of_group) values ('${reqbody.name_of_group}')`, function(err){
      if(!err){
        console.log('success insert into Groups');
      }else{
        console.log(err);
      }
    })
  }

  static findById(reqparams,cb){
    db.all(`select * from Groups where id=${reqparams.id}`, function(err,data_Groups){
      if(!err){
        cb(null,data_Groups[0])
      }else{
        cb(err,null)
      }
    })
  }

  static update(reqbody,reqparams){
    db.run(`update Groups set name_of_group="${reqbody.name_of_group}" where id="${reqparams.id}"`, function(err){
      if(!err){
        console.log(`success update Groups`);
      }else{
        console.log(err);
      }
    })
  }

  static reMove(reqparams){
    db.run(`delete from Groups where id='${reqparams.id}'`,function(err){
      if(!err){
        console.log(`succes delete from Groups`);
      }else{
        console.log(err);
      }
    })
  }

}

module.exports = Groups
