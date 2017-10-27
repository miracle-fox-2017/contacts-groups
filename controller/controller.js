const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

const getHome = (req, res) => {
    res.send('it works from model');
    console.log(req.body);
};

const getContacts = (req, res) => {
  db.all(`SELECT * FROM Contacts`, (err, rows) => {
    res.render('contacts', {contacts: rows});
  });
};

const postContacts = (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO Contacts (name, telp_number, email, company)
                 VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.email}', '${req.body.company}')`;
  db.run(query, err => {
    if (err) throw err;
    getContacts(req, res);
  });
};

module.exports = {
  getHome,
  getContacts,
  postContacts
};