var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Group {
  static findAll(cb){
    db.all(`SELECT * FROM Groups`, function(err, rows){
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static create(body){
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${body.name_of_group}')` );
  }
  
  static findID(params,cb){
    db.each(`SELECT * FROM Groups WHERE id = ${params}`, function(err, rows) {
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static update(body, params){
    db.run(`UPDATE Groups SET name_of_group = '${body.name_of_group}' WHERE id = ${params}`);
  }
  
  static remove(params){
      db.each(`DELETE FROM Groups WHERE id = ${params}`, function(err){
        if(err){
          console.log(err);
        }
      })
  }
}

module.exports = Group