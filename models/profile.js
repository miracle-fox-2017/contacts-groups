const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Profile {
  constructor(){}
  
  static findAllProfile(){
    let q = `SELECT * FROM Profile`;
    db.all(q, function(err, rows){
      // console.log(rows);
      // console.log('heloo');
    })
  }
}

module.exports = Profile;