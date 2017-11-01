const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const index = require('./routes/index');
const Contact = require('./models/contacts');
const Group = require('./models/groups');
const Address = require('./models/addresses');

const app = express()
const db = new sqlite3.Database('./database.db');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', index)

app.get('/contacts', function(req, res){
  Contact.findAll(function(rowsContacts){
    res.render('contacts', {rowsContacts})
  })
})

app.post('/contacts', function(req, res){
  Contact.addContact(req.body)
  res.redirect('./contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  Contact.formEditContact(req.params.id, function(rowsEdit){
    res.render('editContacts', {rowsEdit})
  })
})

app.post('/contacts/edit/:id', function(req, res){
  Contact.editContact(req.params.id, req.body)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res){
  Contact.deleteContact(req.params.id)
  res.redirect('/contacts')
})

//========GROUPS========
app.get('/groups', function(req, res){
  Group.findAll(function(rowsGroups){
    res.render('groups', {rowsGroups})
  })
})

app.post('/groups', function(req, res){
  Group.addGroup(req.body.name_of_group)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  Group.formEditGroup(req.params.id, function(rowsGroups){
    console.log(rowsGroups);
    res.render('editGroups', {rowsGroups})
  })
})

app.post('/groups/edit/:id', function (req, res){
  Group.updateGroup(req.params.id, req.body.name_of_group)
  res.redirect('/groups');
})

app.get('/groups/delete/:id', function(req, res){
  Group.deleteGroup(req.params.id)
  res.redirect('/groups')
})

//=======RELEASE 2======
//=======ADRRESS======
app.get('/addresses', function(req, res){
  Address.findAll(function(err, rowsAddress) {
  res.render('addresses', {rowsAddress})
  })
})

app.post('/addresses', function(req, res){
  Address.addAddress(req.body)
  res.redirect('./addresses')
})

app.get('/addresses/edit/:id', function(req, res){
  Address.formEditAddress(req.params.id, function(err, rowsEditAddress){
    res.render('editAddresses', {rowsEditAddress})
  })
})

app.post('/addresses/edit/:id', function(req, res){
  Address.editAddress(req.params.id, req.body)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function(req, res){
  Address.hapusAddress(req.params.id)
  res.redirect('/addresses')
})

//=======PROFILES=======
app.get('/profiles', function(req, res){
  db.all(`SELECT * FROM Profiles`, function(err, rowsProfiles) {
  res.render('profiles', {rowsProfiles})
  })
})

app.post('/profiles', function(req, res){
  let username = req.body.username
  let password = req.body.password
  let queryProfiles = `INSERT INTO Profiles (username, password) VALUES ('${username}', '${password}')`
  db.run(queryProfiles)
  res.redirect('./profiles')
})

app.get('/profiles/edit/:id', function(req, res){
  let id = req.params.id;
  let queryEditProfiles = `SELECT * FROM Profiles WHERE id=${id}`
  db.each(queryEditProfiles, function(err, rowsEditProfiles){
    res.render('editProfiles', {rowsEditProfiles})
  })
})

app.post('/profiles/edit/:id', function(req, res){
  let username = req.body.username
  let password = req.body.password

  let updateProfiles = `UPDATE Profiles SET username = "${username}", password = "${password}"
                        WHERE id = "${req.params.id}"`
  db.all(updateProfiles)
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function(req, res){
  let deleteProfiles = `DELETE FROM Profiles WHERE id = "${req.params.id}"`
  db.all(deleteProfiles)
  res.redirect('/profiles')
})
app.listen(3000, function(){
  console.log('ngueeeng jalan');
})
