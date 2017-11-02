const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Profile{
  static findAll(callBack){
    db.all(`SELECT * FROM Profiles`, function(err, rowsProfiles){
      callBack(err, rowsProfiles)
    })
  }

  static findAllWithContact(callBack){
    db.all(`SELECT Profiles.*, Contacts.name FROM Profiles LEFT JOIN
            Contacts ON Contacts.id = Profiles.Contacts_id`, function(err, rowsProfiles){
      callBack(err, rowsProfiles)
    })
  }

  static addProfiles(body, callBack){
    let username = body.username
    let password = body.password
    let contactId = body.contact
    let queryProfiles = `INSERT INTO Profiles (username, password, Contacts_id)
                         VALUES ('${username}', '${password}', ${contactId})`
    db.run(queryProfiles, err => {
      callBack(queryProfiles, err)
    })
  }

  static editProfiles(params, body){
    let username = body.username
    let password = body.password
    let contactId = body.contact
    let updateProfiles = `UPDATE Profiles SET username = "${username}", password = "${password}",
                          Contacts_id = ${contactId} WHERE id = "${params}"`

    db.run(updateProfiles)
  }

  static formEditProfiles(params, callBack){
    let queryEditProfiles = `SELECT * FROM Profiles WHERE id=${params}`
    console.log(queryEditProfiles);
    db.get(queryEditProfiles, function(err, rowsEditProfiles){
      // console.log(rowsEditProfiles);
      callBack(err, rowsEditProfiles)
    })
  }

  static deleteProfiles(params){
    let deleteProfiles = `DELETE FROM Profiles WHERE id = "${params}"`
    db.all(deleteProfiles)
  }
}

module.exports = Profile
