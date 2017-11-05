let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

class Contacts {
  constructor(id,name,company,telp_number,email){
    this.id = id;
    this.name = name;
    this.company = company;
    this.telp_number = telp_number;
    this.email = email;
  }

  static getContacts(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM contacts`,function(err,dataJsonContacts){
    		if(err){
          reject(err)
    		}
    		else{
          let result = []
          for(let i = 0; i < dataJsonContacts.length; i++){
            let contacts = new Contacts(dataJsonContacts[i].id,dataJsonContacts[i].name,dataJsonContacts[i].company,dataJsonContacts[i].telp_number,dataJsonContacts[i].email);
            result.push(contacts);
          }
          resolve(result)
    		}
    	})
    })
  }

  static getPost(req){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, function(err){
    		if(err){
          reject(err)
    		}
        else{
          resolve(this.lastID)
        }
    	})
    })
  }

  static getEdit(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`,function(err,rows){
    		if(err){
          reject(err)
    		}
    		else{
          resolve(rows)
    		}
    	})
    })
  }

  static updateContacts(req){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`,function(err){
        if(err){
          reject(err)
        }
        else{
          resolve()
        }
      })
    })
  }

  static deleteContact(req){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`,function(err){
    		if(err){
          reject(err)
    		}
        else{
          resolve()
        }
    	})
    })
  }

  static getContactById(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getAddAddress(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM addresses WHERE contact_id = ${req.params.id}`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static postAddAddress(req){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO addresses (street,city,zipcode,contact_id) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.params.id}')`,function(err){
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

module.exports = Contacts
