const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Profile{


  static findAllwithContact(callback){
    // console.log(rowProfiles);
    db.all(`SELECT Profiles.ID,Profiles.username,Profiles.password, Contacts.Name, Profiles.id_contact  FROM Profiles INNER JOIN Contacts ON Profiles.id_contact = Contacts.ID`, function(err, rowProfiles){
      if(!err){
      callback(rowProfiles)
    }else{
        console.log(err)
      }
    } );
  }
  static inputProfile(request,callback){
    db.run(`INSERT INTO Profiles(username, password, id_contact)
    VALUES ('${request.username}','${request.password}',${request.contactsID})`, function(err){
      if(err){
        callback(err)
      }
    } );
  }
  static findProfile(requestparams,callback){
    db.each(`SELECT * FROM Profiles WHERE ID = ${requestparams}`, function(err,rowProfiles){
      callback(null, rowProfiles)
    })
  }
  static editProfile(requestparams,requestbody){
    db.run(`UPDATE Profiles
      SET username = '${requestbody.username}',
      password = '${requestbody.password}'
      WHERE id = ${requestparams}
    ` );
  }
  static deleteProfile(requestparams){
    db.run(`DELETE FROM Profiles WHERE id = ${requestparams}`)
  }
}

module.exports= Profile
