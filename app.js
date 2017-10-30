
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('views', './views');
app.set('view engine', 'ejs');

let index = require('./routers');
app.use('/', index);

let contacts = require('./routers/contacts.js');
app.use('/contacts', contacts);

//menerima input data contacts
app.post('/contacts', function (req, res) {
  db.run(`INSERT into Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, function (err, rows) {
    // console.log(this.lastID);
    let id = this.lastID;
    // console.log(id, req.body.GroupId);
    db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${id}', '${req.body.GroupId}')`, (err, rows) => {
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
// app.use('/contacts/delete/:id', contacts);
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

const groups = require('./routers/groups.js');
app.use('/groups', groups);

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

const profile = require('./routers/profile.js');
app.use('/profiles', profile);

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

// Menampilkan data groupsContact spesifik untuk diubah
app.get('/groups/assign_contacts/:id', function (req, res) {
  db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
    db.all('SELECT C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group FROM Contacts as C LEFT JOIN ContactsGroups as CG ON C.id = CG.ContactId LEFT JOIN Groups as G on G.id = CG.GroupId', (err, rowsContact) => {
      // console.log(rows);
      res.render('assign_contacts', { data: rows, dataContacts: rowsContact });
    });
  });
});

app.post('/groups/assign_contacts/:id', function (req, res) {
  // db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, function (err, rows2) {
  //   let id = this.lastID;
  // console.log(req.body);
  // console.log(req.params.id);
    db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${req.body.name}', '${req.params.id}')`, (err, rows) => {
      // console.log(err);
      res.redirect('/groups');
    });
  });



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
