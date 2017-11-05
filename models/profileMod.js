let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

class Profile{
  constructor(id,username,password,contact_id){
    this.id = id;
    this.username = username;
    this.password = password;
    this.contact_id = contact_id;
  }

  static getProfile(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM profile`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getPost(req){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO profile (username,password,contact_id) VALUES('${req.body.username}', '${req.body.password}', '${req.body.contact_id}')`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getEdit(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM profile WHERE id = ${req.params.id}`,function(err,rows){
    		if(err){
          reject(err)
    		}
    		else {
          db.all(`SELECT profile.id, profile.username, profile.password, profile.contact_id, contacts.name FROM profile LEFT JOIN contacts ON profile.contact_id = contacts.id`,function(err,rows1){
            if(err){
              reject(err)
            }
            else{
              resolve([rows,rows1])
            }
          })
    		}
      })
    })
  }

  static updateProfile(req){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE profile SET username = '${req.body.username}', password = '${req.body.password}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`,function(err){
        if(err){
          reject(err)
        }
        else{
          resolve()
        }
      })
    })
  }

  static deleteProfile(req){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM profile WHERE id = ${req.params.id}`,function(err){
    		if(err){
          reject(err)
    		}
        else{
          resolve()
        }
    	})
    })
  }

}

module.exports = Profile
