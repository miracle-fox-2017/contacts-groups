const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

const express = require('express');
const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index.ejs');
});

//menampilkan semua data contacts
app.get('/contacts', function (req, res) {
  db.all('SELECT * FROM Contacts', (err, rows) => {
    db.all('SELECT * FROM Groups', (err, rows2) => {
      db.all('SELECT ContactsGroups.id, ContactsGroups.ContactId, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Groups ON ContactsGroups.GroupId = Groups.name_of_group', (err, rowsContact) => {
        res.render('contacts.ejs', { data: rows, dataGroups: rows2, dataContacts: rowsContact });
      });
    });
  });
});

//menerima input data contacts
app.post('/contacts', function (req, res) {
  db.run(`INSERT into Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, (err, rows) => {
    db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${req.body.ContactId}', '${req.body.GroupId}')`, (err, rows) => {
      res.redirect('contacts');
    });
  });
});

// Menampilkan data contact spesifik untuk diubah
app.get('/contacts/edit/:id', (req, res) => {
  db.each(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, (err, rows) => {
    res.render('contactEdit', { data: rows });
  });
});
app.post('/contacts/edit/:id', function (req, res) {
  db.run(`UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = '${req.params.id}'`, (err) => {
    res.redirect('../../contacts');
  });
});

// Delete data contacts
app.get('/contacts/delete/:id', (req, res) => {
  db.run(`DELETE from Contacts WHERE id = "${req.params.id}"`, (err, rows) => {
    res.redirect('../../contacts');
  });
});

// menampilkan semua address di contact
app.get('/contacts/address/:id', (req, res) => {
  db.all(`SELECT * FROM Addresses where ContactId = "${req.params.id}"`, (err, rows) => {
    db.get(`SELECT * from Contacts where id = "${req.params.id}"`, (err, rowsContact) => {
      res.render('addresses_with_contact', { data: rows, dataContacts: rowsContact });
    });
  });
});

// menerima input contact address
app.post('/contacts/address/:id', (req, res) => {
  db.run(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.body.ContactId}')`, (err) => {
    res.redirect(`/contacts/address/${req.params.id}`);
  });
});

//menampilkan semua data addresses
app.get('/addresses', function (req, res) {
  db.all('SELECT * FROM Addresses', (err, rows) => {
    db.all('SELECT * FROM Contacts', (err, rowsContact) => {
      res.render('addresses', { data: rows, dataContacts: rowsContact });
    });
  });
});

//menerima input data address
app.post('/addresses', function (req, res) {
  db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.ContactId}')`, (err, rows) => {
    res.redirect('addresses');
  });
});

// Menampilkan data address spesifik untuk diubah
app.get('/addresses/edit/:id', (req, res) => {
  db.each(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, (err, rows) => {
    db.all('SELECT * FROM Contacts', (err, rowsContact) => {
      res.render('addressEdit', { data: rows, dataContacts: rowsContact });
    });
  });
});
app.post('/addresses/edit/:id', function (req, res) {
  db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
    res.redirect('../../addresses');
  });
});

// Delete data address
app.get('/addresses/delete/:id', (req, res) => {
  db.run(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    res.redirect('../../addresses');
  });
});

// Menampilkan semua data groups
app.get('/groups', function (req, res) {
  db.all('SELECT * FROM Groups', (err, rows) => {
    res.render('groups', { data: rows });
  });
});

//menerima input data groups
app.post('/groups', function (req, res) {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, (err, rows) => {
    res.redirect('groups');
  });
});

// Menampilkan data group spesifik untuk diubah
app.get('/groups/edit/:id', (req, res) => {
  db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
    res.render('groupEdit', { data: rows });
  });
});
app.post('/groups/edit/:id', function (req, res) {
  db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, (err) => {
    res.redirect('../../groups');
  });
});

// Delete data group
app.get('/groups/delete/:id', (req, res) => {
  db.run(`DELETE from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
    res.redirect('../../groups');
  });
});

// Menampilkan semua data profile
app.get('/profiles', function (req, res) {
  db.all('SELECT * FROM Profile', (err, rows) => {
    db.all('SELECT * FROM Contacts', (err, rowsContact) => {
      res.render('profiles', { data: rows, dataContacts: rowsContact, errorMsg: '' });
    });
  });
});

//menerima input data profile
app.post('/profiles', function (req, res) {
  db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')`, (err, rows) => {
    res.redirect('profiles');
  });
});

// Menampilkan data profile spesifik untuk diubah
app.get('/profiles/edit/:id', (req, res) => {
  db.each(`SELECT * FROM Profile WHERE id = ${req.params.id}`, (err, rows) => {
    db.all('SELECT * FROM Contacts', (err, rowsContact) => {
      res.render('profileEdit', { data: rows, dataContacts: rowsContact });
    });
  });
});

app.post('/profiles/edit/:id', function (req, res) {
  db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
    res.redirect('../../profiles');
  });
});

// Delete data profile
app.get('/profiles/delete/:id', (req, res) => {
  db.run(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    res.redirect('../../profiles');
  });
});

// Menampilkan semua data groupsContact
app.get('/groups/assign_contacts/:id', function (req, res) {
  db.all('SELECT * FROM Groups', (err, rows) => {
    res.render('assign_contacts', { data: rows });
  });
});

//menerima input data groupsContact
app.post('/groups', function (req, res) {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, (err, rows) => {
    res.redirect('groups');
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
