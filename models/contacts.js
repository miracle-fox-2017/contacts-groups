const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../data.db');

class Contact {
  static findAll(callback) {
    db.all(`SELECT * FROM Contacts`, function(err, rows) {
      // console.log(rows);
      callback(err, rows)
    })
  }

  static create() {
    // db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, (err) => {
    //   if(err) {
    //     console.log(err);
    //   }
    // })
  }
}

// test
Contact.findAll((err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.log(rows)
  }
})

module.exports = Contact;
