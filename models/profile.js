var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Profile {
  static findAll(cb){
    db.all(`SELECT * FROM Profiles`, function(err, rows){
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static create(body){
    db.run(`INSERT INTO Profiles (username, password) VALUES ('${body.username}','${body.password}')` );
  }
  
  static findID(params, cb){
    db.each(`SELECT * FROM Profiles WHERE id = ${params}`, function(err, rows){
      if(!err){
        cb(rows)
      } else {
        console.log();
      }
    })
  }
  
  static update(body, params){
    db.run(`UPDATE Profiles SET username = '${body.username}', password = '${body.password}' WHERE id = ${params}`);
  }
  
  static remove(params){
    db.each(`DELETE FROM Profiles WHERE id = ${params}`, function(err, rows){
      if(err){
        console.log(err);
      }
    })
  }
  
}

module.exports = Profile