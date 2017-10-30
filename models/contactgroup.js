const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class ContactGroup {
  constructor(){}
  
  static showContactsGroup(cb){
      let q = `SELECT ContactGroup.id_contacts, ContactGroup.id_groups,
                      Groups.id AS gid, Groups.name_of_group
               FROM ContactGroup 
               JOIN Groups 
               ON ContactGroup.id_groups = Groups.id`;
               
      db.all(q, function(err, showContactsGroup){
        // callback here
        if(!err){
          cb(showContactsGroup);
        } else {
          console.log(err);
        }
      })
    }

  static insertContactGroup(id_contacts, id_groups, cb){
    let qCG = `INSERT INTO ContactGroup
                (id_contacts, id_groups)
                VALUES
                (${id_contacts}, ${id_groups})`;
    // console.log(qCG);
    //db run cg
    db.run(qCG, function(err){
      if(!err){
        cb();
      } else {
        console.log(err);
      }
    })
  }
  
  static contactGroupJoin(cb){
    let join = `SELECT
               ContactGroup.id_contacts, ContactGroup.id_groups,
               Contacts.id AS cid, Contacts.name
              FROM ContactGroup 
              JOIN Contacts 
              ON ContactGroup.id_contacts = Contacts.id`;
    db.all(join, (err, cg)=>{
      if(!err){
        cb(cg);
      } else {
        console.log(err);
      }
    })
  }

  static unassign_contacts(data, cb){
    let deleteQuery = `DELETE FROM ContactGroup WHERE id_contacts = ${data.id_contacts} AND id_groups = ${data.id_groups}`
    // console.log(deleteQuery);
    db.run(deleteQuery, function(err){
      if(!err){
        cb();
      } else {
        console.log(err);
      }
    })
  }

}

module.exports = ContactGroup;