const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Profile{

  // static findAll(callback){
  //   db.all(`SELECT * FROM Profiles`,function(err,rowProfiles){
  //     callback(rowProfiles)
  //   })
  // }
  static findAllwithContact(callback){
    // console.log(rowProfiles);
    db.all(`SELECT Profiles.ID,Profiles.username,Profiles.password, Contacts.Name FROM Profiles INNER JOIN Contacts ON Profiles.id_contact = Contacts.ID`, function(err, rowProfiles){
      if(!err){
      callback(rowProfiles)
    }else{
        console.log(err)
      }
    } );
  }
  static inputProfile(request){
    db.run(`INSERT INTO Profiles(username, password, id_contact)
    VALUES ('${request.username}','${request.password}',${request.contactsID})` );
  }
  static findProfile(requestparams,callback){
    db.each(`SELECT * FROM Profiles WHERE id = ${requestparams}`, function(err,rowProfiles){
      callback(rowProfiles)
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
