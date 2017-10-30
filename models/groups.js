const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Groups {

    static findAll(callback) {
        let getData = "SELECT * FROM groups";
        db.all(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static findAllWhere(id,callback) {
        let getData = `SELECT * FROM groups WHERE id = ${id}`;
        db.get(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static createData(obj,callback) {
        let getData = `INSERT INTO groups (name_of_group) values('${obj.nama}')`;
        db.run(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(this.lastID);
            }
        });
    }

    static updateData(obj) {
        let getData = `UPDATE groups set name_of_group = '${obj.nama}' WHERE id = ${obj.id}`;
        db.run(getData);
    }

    static removeData(id) {
        let getData = `DELETE FROM groups WHERE id = ${id}`;
        db.run(getData);
    }

}

module.exports = Groups;