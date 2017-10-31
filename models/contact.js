const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Contact {
    static findAll(callback) {
        let getData = "SELECT * FROM contact";
        db.all(getData, function (err, rowsContacts) {
            if(!err){
                return callback(null, rowsContacts);
            }else{
                return callback(err, null);
            }
        });
    }

    static findAllWhere(id,callback) {
        let getData = `SELECT * FROM contact WHERE id = ${id}`;
        db.get(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static createData(obj,callback) {
        let getData = `INSERT INTO contact (name,company,telp_number,email)
                    values('${obj.nama}','${obj.company}','${obj.telp}','${obj.email}')`;
        db.run(getData, function (err, rowsContacts) {
            if(!err){
                return callback(this.lastID);
            }
        });
    }

    static updateData(obj) {
        let getData = `UPDATE contact set name = '${obj.nama}',
                                        company = '${obj.company}',
                                        telp_number = '${obj.telp}',
                                        email = '${obj.email}'
                                    WHERE id = ${obj.id}`;
        db.run(getData);
    }

    static removeData(id) {
        let getData = `DELETE FROM contact WHERE id = ${id}`;
        db.run(getData);
    }

}

module.exports = Contact;