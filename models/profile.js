const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Profile{
    
    static findAll(callback){
        let getData = "SELECT profile.*, contact.name FROM profile INNER JOIN contact ON contact.id = profile.idcontact";
        db.all(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static cekContact(id) {
        let getData = `SELECT * FROM profile WHERE idcontact = ${id}`;
        return getData;
    }

    static findAllWhere(id,callback) {
        let getData = `SELECT contact.id,contact.name, profile.username, profile.password,profile.id AS idcontact FROM profile INNER JOIN contact ON contact.id = profile.idcontact WHERE profile.id = ${id}`;
        db.all(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static createData(obj,callback) {
        let getData = `INSERT INTO profile (username,password,idcontact)
                    values('${obj.nama}','${obj.password}',${obj.idcontact})`;
        db.run(getData, function (err, rowsProfile) {
            if (!err) {
                return callback(this.lastID);
            }
        });
    }

    static updateData(obj) {
        let getData = `UPDATE profile set username = '${obj.nama}',
                                        password = '${obj.password}'
                                    WHERE id = ${obj.id}`;
        db.run(getData);
    }

    hapusData(id) {
        let getData = `DELETE FROM profile WHERE id = ${id}`;
        db.run(getData);
    }
    
}

module.exports = Profile;