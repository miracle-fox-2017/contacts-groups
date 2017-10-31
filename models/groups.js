const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Group {
  static getAll() {
    return new Promise(function(resolve, reject) {
      db.all('SELECT * FROM Groups', (err, rows)=>{
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static create(input) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Groups (name_of_group) VALUES ('${input.name_of_group}')`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static getOne(id, callback) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM Groups WHERE id='${id}'`, (err, rows)=>{
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static update(input, id, callback) {
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE Groups SET name_of_group='${input.name_of_group}' WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else {
          reject(err)
        }
      })
    });
  }

  static destroy(id, callback) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM Groups WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else {
          reject(err)
        }
      })
    });
  }
}

module.exports = Group;
