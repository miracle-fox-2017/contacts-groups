var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db/database.db');

class Address {

  static findAll(callback) {
    db.all('SELECT * FROM addresses', (err, rows) => {
      let arrAddress = [];
      rows.forEach(function (rowObj, index) {
        arrAddress.push(new Address(rowObj));

        if (index >= rows.length - 1) {
          callback(err, aarrAddress);
        }
      });
    });
  }
}
