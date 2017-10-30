const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Addresses {

    static findAll(callback) {
        let getData = "SELECT address.*,contact.name FROM address INNER JOIN contact ON contact.id = address.idcontact";
        db.all(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static findAllWhere(id,callback) {
        let getData = `SELECT address.*,contact.name FROM address INNER JOIN contact ON contact.id = address.idcontact WHERE address.id = ${id}`;
        db.all(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(null, rowsContacts);
            } else {
                return callback(err, null);
            }
        });
    }

    static createData(obj,callback) {
        let getData = `INSERT INTO address (street,city,zipcode,idcontact)
                    values('${obj.street}','${obj.city}','${obj.zipcode}',${obj.idcontact})`;
        db.run(getData, function (err, rowsContacts) {
            if (!err) {
                return callback(this.lastID);
            }
        });
    }

    static updateData(obj) {
        let getData = `UPDATE address set street = '${obj.street}',
                                        city = '${obj.city}',
                                        zipcode = '${obj.zipcode}',
                                        idcontact = '${obj.idcontact}'
                                    WHERE id = ${obj.id}`;
        db.run(getData);
    }

    static removeData(id) {
        let getData = `DELETE FROM address WHERE id = ${id}`;
        db.run(getData);
    }

}

module.exports = Addresses;