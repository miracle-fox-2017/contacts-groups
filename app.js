const express = require('express')
const app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//================================================//

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/contacts', function (req, res) {
  let queryContact = `SELECT * FROM Contacts`
  db.all(queryContact, function(err, rowContacts){
    res.render('contacts',{rowContacts})
  })
})

app.post('/contacts/edit/:id', function (req, res) {
  let id = req.params.id;
  let name = req.body.name
  let company = req.body.company;
  let telepon = req.body.telp;
  let email = req.body.email;

  db.run(`UPDATE Contacts
    SET name = '${name}', company = '${company}', telp = '${telepon}', email = '${email}' WHERE id = "${id}"`)
    res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function (req, res) {
  db.run(`DELETE FROM Contacts
   WHERE id = ${req.params.id}`);
   res.redirect('/contacts')
})

app.post('/contacts',function (req, res) {
  let name = req.body.name;
  let company = req.body.company;
  let telepon = req.body.telp;
  let email = req.body.email;
    db.run(`INSERT INTO Contacts
      (name,company,telp,email)
      VALUES('${name}','${company}','${telepon}','${email}')`);
      res.redirect('/contacts')
})

// GROUPPP

app.get('/groups', function (req, res) {
  let queryGroup = `SELECT * FROM Groups`
  db.all(queryGroup, function(err, rowGroups){
    res.render('groups',{rowGroups})
  })
})

app.post('/groups', function (req, res) {
  let groupName = req.body.name_of_group;
    db.run(`INSERT INTO Groups (name_of_group) VALUES('${groupName}')`);
      res.redirect('/groups');
})

app.get('/groups/edit/:id', function (req, res) {
  let getEdit = `SELECT * FROM Groups WHERE id = ${req.params.id}`
  db.all(getEdit, function(err, rowGroups) {
    res.render('editGroups',{rowGroups})
  })
})

app.post('/groups/edit/:id', function (req, res) {
  let id = req.params.id;
  let nameGroup = req.body.name_of_group;
  db.run(`UPDATE Groups
    SET name_of_group = '${nameGroup}' WHERE id = "${id}"`)
    res.redirect('/groups')
})

app.get('/groups/delete/:id', function (req, res) {
  db.run(`DELETE FROM Groups
   WHERE id = ${req.params.id}`);
   res.redirect('/groups')
})

//ADRESSESS

app.get('/addresses', function(req, res) {
  let queryAddresses = `SELECT * FROM Addresses`
  db.all(queryAddresses, function(err, rowAddresses){
    res.render('addresses',{rowAddresses})
  })
})

app.post('/addresses', function (req, res) {
  let addressesStreet = req.body.street;
  let addressesCity = req.body.city;
  let addressesZipcode = req.body.zipcode;
    db.run(`INSERT INTO Addresses (street,city,zipcode) VALUES('${addressesStreet}','${addressesCity}','${addressesZipcode}')`);
      res.redirect('/addresses');
})

app.get('/addresses/edit/:id', function (req, res) {
  let getEdit = `SELECT * FROM Addresses WHERE id = ${req.params.id}`
  db.all(getEdit, function(err, rowAddresses) {
    res.render('editAddresses',{rowAddresses})
  })
})

app.post('/addresses/edit/:id', function (req, res) {
  let id = req.params.id;
  let addressesStreet = req.body.street;
  let addressesCity = req.body.city;
  let addressesZipcode = req.body.zipcode;
  db.run(`UPDATE Addresses
    SET street = '${addressesStreet}', city = '${addressesCity}', zipcode = '${addressesZipcode}' WHERE id = "${id}"`)
    res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function (req, res) {
  db.run(`DELETE FROM Addresses
   WHERE id = ${req.params.id}`);
   res.redirect('/addresses')
})

// PROFILE

app.get('/profiles', function (req, res) {
  let queryProfile = `SELECT * FROM Profile`
  db.all(queryProfile, function(err, rowProfiles) {
    res.render('profiles', {rowProfiles})
  })
})

app.post('/profiles', function (req, res) {
  let profileUsername = req.body.username;
  let profilePassword = req.body.password;
  db.run(`INSERT INTO Profile (username,password) VALUES('${profileUsername}','${profilePassword}')`);
  res.redirect('/profiles');
})

app.get('/profiles/edit/:id', function (req, res) {
  let getEdit = `SELECT * FROM Profile WHERE id = ${req.params.id}`
  db.all(getEdit, function(err, rowProfiles) {
    res.render('editProfiles',{rowProfiles})
  })
})

app.post('/profiles/edit/:id', function (req, res) {
  let id = req.params.id;
  let profileUsername = req.body.username;
  let profilePassword = req.body.password;
  db.run(`UPDATE Profile
    SET username = '${profileUsername}', password = '${profilePassword}' WHERE id = "${id}"`)
    res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function (req, res) {
  db.run(`DELETE FROM Profile
   WHERE id = ${req.params.id}`);
   res.redirect('/profiles')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
