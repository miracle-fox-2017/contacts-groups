const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')


class Contacts_Groups{

  static findAll(data_Contacts,cb){
    let result = []
    for(let i=0; i<data_Contacts.length; i++){
      data_Contacts[i].name_of_group = []

      let query = `select * from Contacts_Groups inner join Groups on Contacts_Groups.id_groups = Groups.id where Contacts_Groups.id_contacts = ${data_Contacts[i].id}`
      db.all(query,function(err,data_get_all){
        for(let j=0; j<data_get_all.length; j++){
          data_Contacts[i].name_of_group.push(`${data_get_all[j].name_of_group}`)
        }

        result.push(data_Contacts[i])
        // console.log(data_Contacts.length);
        if(result.length == data_Contacts.length){
          cb(null, result)
        }else{
          cb(err, null)
        }
      })
    }
  }


}

module.exports = Contacts_Groups
