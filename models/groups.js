const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./data/database.db');
const Contact = require('../models/contacts.js')
const Contacts_Groups = require('../models/contacts_groups.js')


class Group {


  static findAll(){
    return new Promise ((resolve, reject) =>{
      db.all(`SELECT * FROM Groups`, (err, rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }


  static promiseAll (){
    return new Promise((resolve, reject) => {
    Promise.all([
        this.findAll(),
        Contact.findAll(),
        Contacts_Groups.findAll()
      ]).then(data =>{
        data[0].forEach(groupItem =>{
          groupItem.arrName = []
          data[1].forEach(contactItem =>{
            data[2].forEach(cg =>{
              if(contactItem.id == cg.ContactsId && groupItem.id == cg.GroupsId){
                groupItem.arrName.push(contactItem.name)
              }
            })
          })
        })
        resolve(data[0])
      })
    })
  }



static create(req){
  return new Promise ((resolve, reject) =>{
    db.run(`INSERT INTO Groups (name_of_group ) VALUES ("${req.body.name_of_group}")`, (err, rows)=>{
      if(err){
        reject(err);
      }else{
        resolve(rows)
      }
    })
  })
}


static findById(id){
  return new Promise((resolve, reject) =>{
    db.each(`SELECT * FROM Groups WHERE ID = ${id}`, (err, rows) =>{
      if(err){
        reject(err);
      }else {
        resolve(rows)
      }
    })
  })
}


  static update(req){
    return new Promise ((resolve, reject) =>{
      db.run(`UPDATE Groups SET
        name_of_group = '${req.body.name_of_group}'
        WHERE ID = ${req.params.id}
        `, (err, rows)=>{
          if(err){
            reject(err);
          }else{
            resolve(rows)
          }
        })
    })
  }

  static destroy(req, callback){
    return new Promise ((resolve, reject) =>{
      db.run(`DELETE FROM Groups WHERE ID = ${req.params.id}`, (err,rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })

  }

}
module.exports = Group;
