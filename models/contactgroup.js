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
        cb(showContactsGroup);
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
      cb(err);
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
      cb(cg);
    })
  }

}

// Contact.findAllContacts();

module.exports = ContactGroup;