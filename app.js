
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

let groups = require('./routers/groups.js');
app.use('/groups', groups);

let profile = require('./routers/profile.js');
app.use('/profiles', profile);

let address = require('./routers/addresses.js');
app.use('/addresses', address);

//menerima input data contacts
app.post('/contacts', function (req, res) {
  db.run(`INSERT into Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, function (err, rows) {
    let id = this.lastID;
    db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${id}', '${req.body.GroupId}')`, (err, rows) => {
      res.redirect('contacts');
    });
  });
});

// Menampilkan data groupsContact spesifik untuk diubah
app.get('/groups/assign_contacts/:id', function (req, res) {
  db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
    db.all('SELECT C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group FROM Contacts as C LEFT JOIN ContactsGroups as CG ON C.id = CG.ContactId LEFT JOIN Groups as G on G.id = CG.GroupId', (err, rowsContact) => {
      res.render('assign_contacts', { data: rows, dataContacts: rowsContact });
    });
  });
});

app.post('/groups/assign_contacts/:id', function (req, res) {
  db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${req.body.name}', '${req.params.id}')`, (err, rows) => {
    res.redirect('/groups');
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
