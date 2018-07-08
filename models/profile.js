const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database ('db/database.db')




let query = `SELECT Profiles.* , Contacts.name FROM Profiles LEFT JOIN Contacts ON
Profiles.Contactsid = Contacts.id ORDER BY Profiles.id`;
let query2 = `SELECT * FROM Contacts`;

class Profile {
  static deleteProfile(params){
    db.run(`DELETE FROM Profiles WHERE id =${params.id}`)
  }
}


module.exports = Profile;
