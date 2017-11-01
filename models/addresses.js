const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class Address{
  static findAll(cb){
    let query = `SELECT * FROM Address`;
    db.all(query,function(err,rowAddress){
      if(!err){
        cb(null,rowAddress)
      }else{
        console.log(err)
      }
    })
  }
  
  static create(obj,cb){
    let query = `INSERT INTO Address (name,company,telp_number,email)
                 VALUES("${obj.name}", "${obj.company}", "${obj.telp_number}", "${obj.email}")`;
    db.all(query,function(err,rowAddress){
      if(!err){
        cb(null,rowAddress)
      }else{
        console.log(err)
      }
    })
  }

  static findById(id,cb) {
    let query = `SELECT * FROM Address where id = "${id}`;
    db.all(query, function(err, rowAddress) {
      if(!err) {
        cb(null, rowAddress)
      } else {
        console.log(err)
      }
    })
  } 

  static Update(request, callback){
    db.all(`SELECT * FROM Address where id = "${request.params}"`,function(err,rowAddress){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rowAddress)
      }
  })
}
static EditPost(Obj, callback){
db.all(`UPDATE Address SET name = "${Obj.name}",
        company = "${Obj.company}",
        telp_number = "${Obj.telp_number}",
        email = "${Obj.email}" WHERE id = "${Obj.id}"`, function (err,rowAddress){
    if(err){
      callback(err,null)
    }
    else{
      callback(null, rowAddress)
    }
  })
}

  

  static remove(id,cb){
    let query = `DELETE FROM Address
                 WHERE id = ${id}`;
    db.all(query,function(err,rowAddress){
      if(!err){
        cb(null,rowAddress)
      }else{
        console.log(err)
      }
    })
  }
}

module.exports = Address
