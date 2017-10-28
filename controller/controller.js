const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

const getHome = (req, res) => {
    // res.send('hello from controller');
    res.render('home');
};

const getContacts = (req, res) => {
  db.all(`SELECT * FROM Contacts`, (err, rows) => {
    if (err) throw err;
    res.render('contacts', {contacts: rows});
  });
};

const postContacts = (req, res) => {
  const query = `INSERT INTO Contacts (name, telp_number, email, company)
                VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.email}', '${req.body.company}')`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
};

const getEditContacts = (req, res) => {
  db.get(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, (err, row) => {
    if (err) throw err;
    res.render('contacts-edit', row);
  });
};

const postEditContacts = (req, res) => {
  const query = `UPDATE Contacts
                SET
                  name = '${req.body.name}',
                  telp_number = '${req.body.phone}',
                  email = '${req.body.email}',
                  company = '${req.body.company}'
                WHERE id = ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
};

const deleteUserContacts = (req, res) => {
  const query = `DELETE FROM Contacts WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
};

module.exports = {
  getHome,
  getContacts,
  postContacts,
  getEditContacts,
  postEditContacts,
  deleteUserContacts
};