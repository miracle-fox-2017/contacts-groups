let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

class Groups {
  constructor(id,name_of_group) {
    this.id = id;
    this.name_of_group = name_of_group;
  }

  static getGroups(){
    return new Promise(function(resolve,reject){
      db.all('SELECT * FROM groups',function(err,dataJsonGroups){
    		if(err){
          reject(err);
    		}
    		else{
          let result = [];
          for(let i = 0; i < dataJsonGroups.length; i++){
            let groups = new Groups(dataJsonGroups[i].id,dataJsonGroups[i].name_of_group);
            result.push(groups)
          }
          resolve(result)
    		}
    	})
    })
  }

  static addGroup(req){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO groups (name_of_group) VALUES('${req.body.name_of_group}')`, function(err,rows){
    		if(err){
    			console.log(err);
    		}
        else{
          resolve(rows);
        }
    	})
    })
  }

  static getGroup(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`,function(err,rows){
    		if(err){
    			reject(err);
    		}
    		else{
          resolve(rows)
    		}
    	})
    })
  }

  static editGroup(req){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`,function(err){
    		if(err){
    			reject(err);
    		}
        else{
          resolve();
        }
    	})
    })
  }

  static deleteGroup(req){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM groups WHERE id = ${req.params.id}`,function(err){
    		if(err){
    			reject(err)
    		}
        else{
          resolve()
        }
    	})
    })
  }

  static assignContacts(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static postAssignContacts(req){
    console.log(req.body);
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO contacts_groups (id_contacts,id_groups) VALUES ('${req.body.id_contacts}','${req.params.id}')`,function(err){
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

module.exports = Groups
