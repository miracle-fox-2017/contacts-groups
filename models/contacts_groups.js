const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')


class Contacts_Groups{

  static findAll(data_Contacts){
    return new Promise((resolve,reject)=>{
      let result = []
      for(let i=0; i<data_Contacts.length; i++){
        data_Contacts[i].name_of_group = []

        let query = `select * from Contacts_Groups inner join Groups on Contacts_Groups.id_groups = Groups.id where Contacts_Groups.id_contacts = ${data_Contacts[i].id}`
        db.all(query,function(err,data_get_all){
          for(let j=0; j<data_get_all.length; j++){
            data_Contacts[i].name_of_group.push(`${data_get_all[j].name_of_group}`)
          }

          result.push(data_Contacts[i])
          // console.log('++',result.length);
          // console.log(data_Contacts.length);
          if(result.length == data_Contacts.length){
            // console.log(result);
            resolve(result)
          }
          if(err){
            reject(err)
          }
        })
      }
    })
  }

  static create(reqparams,reqbody){
    return new Promise(function(resolve,reject){
      db.run(`insert into Contacts_Groups(id_contacts, id_groups) values ('${reqbody.name}','${reqparams.id}')`,function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }


}

module.exports = Contacts_Groups
