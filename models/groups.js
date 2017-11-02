const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Group{
  static findAll(callBack){
    let queryGroups = `SELECT * FROM Groups`
    db.all(queryGroups, function(err, rowsGroups){
      callBack(rowsGroups)
    })
  }

  static addGroup(groupName){
    let queryPostGroups = `INSERT INTO Groups(name_of_group)
                            VALUES('${groupName}')`
    db.run(queryPostGroups)
  }

  static formEditGroup(params, callBack){
    let updateGroups = `SELECT * FROM Groups WHERE id = ${params}`
    db.each(updateGroups, function(err, rowsGroups){
      console.log(rowsGroups);
      callBack(rowsGroups)
    })
  }

  static updateGroup(params, body){
    let updateGroups = `UPDATE Groups SET name_of_group = '${body}' WHERE id = ${params}`
    db.run(updateGroups);
  }

  static deleteGroup(params){
    let deleteGroups = `DELETE FROM groups where id = "${params}"`
    db.all(deleteGroups)
  }

}

module.exports = Group
