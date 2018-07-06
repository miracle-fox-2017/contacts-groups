const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')


class Groups{

  static findAll(){
    return new Promise(function(resolve,reject){
      db.all(`select * from Groups`, function(err,data_Groups){
        if(!err){
          resolve(data_Groups)
        }else{
          reject(err)
        }
      })
    })
  }

  static create(reqbody){
    return new Promise(function(resolve,reject){
      db.run(`insert into Groups(name_of_group) values ('${reqbody.name_of_group}')`, function(err){
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
      db.all(`select * from Groups where id=${reqparams}`, function(err,data_Groups){
        if(!err){
          resolve(data_Groups[0])
        }else{
          reject(err)
        }
      })
    })
  }

  static update(reqbody,reqparams){
    return new Promise(function(resolve,reject){
      db.run(`update Groups set name_of_group="${reqbody.name_of_group}" where id="${reqparams.id}"`, function(err){
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
      db.run(`delete from Groups where id='${reqparams.id}'`,function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

}

module.exports = Groups
