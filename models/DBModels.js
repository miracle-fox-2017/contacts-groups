const sqlite3   = require('sqlite3');
const db        = new sqlite3.Database('./database/database.db');

class DBModel {
  constructor()
  {
      
  }
  
  static connection(){
    return db;
  }
  
  static initialize()
  {
    
  }
}

module.exports = DBModel;