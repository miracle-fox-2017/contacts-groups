const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./data/database.db');


class Group {


  static findAll(callback){
    db.all(`SELECT * FROM Groups`, (err, rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }



static create(req, callback){
  db.run(`INSERT INTO Groups (name_of_group ) VALUES ("${req.body.name_of_group}")`, (err, rows)=>{
    if(err){
      console.log(err);
    }else{
      callback(rows)
    }
  })
}


static findById(req, callback){
  db.each(`SELECT * FROM Groups WHERE ID = ${req.params.id}`, (err, rows) =>{
    if(err){
      console.log(err);
    }else {
      callback(rows)
    }
  })
}


  static update(req, callback){
    //console.log(req);
    db.run(`UPDATE Groups SET
      name_of_group = '${req.body.name_of_group}'
      WHERE ID = ${req.params.id}
      `, (err, rows)=>{
        if(err){
          console.log(err);
        }else{
          callback(rows)
        }
      })
  }

  static destroy(req, callback){
    db.run(`DELETE FROM Groups WHERE ID = ${req.params.id}`, (err,rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

}
module.exports = Group;
