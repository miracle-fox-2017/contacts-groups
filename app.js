const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Contact = require('./models/contact')
const Group = require('./models/group')
const Address = require('./models/address')
const Profile = require('./models/profile')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');


// Contacts
//===================================================================
app.get('/contacts', function (req, res) {
  Contact.findAll(function(rows){
      res.render('contacts', {rows})
  })
  
})

app.post('/contacts', function (req, res) {
  // console.log(req.body);
  Contact.create(req.body)
  res.redirect('/contacts');
})

app.get('/contacts/edit/:id', function (req, res) {
  // console.log(req.params);
  Contact.findID(req.params.id, function(rows){
  res.render('contactedit', {rows})
  })
})

app.post('/contacts/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Contact.update(req.body,req.params.id);
  res.redirect('/contacts');
})

app.get('/contacts/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Contact.remove(req.params.id);
  res.redirect('/contacts');
})
//===================================================================
// End of Contacts

// Groups
//===================================================================
app.get('/groups', function (req, res) {
  Group.findAll(function(rows){
    // console.log(rows);
    res.render('groups', {rows})
  })
})

app.post('/groups', function (req, res) {
  // console.log(req.body);
  Group.create(req.body)
    res.redirect('/groups');
})

app.get('/groups/edit/:id', function (req, res) {
  // console.log(req.params);
  Group.findID(req.params.id, function(rows){
    res.render('groupedit', {rows})
  })
})

app.post('/groups/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Group.update(req.body, req.params.id)
    res.redirect('/groups');
  
})

app.get('/groups/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Group.remove(req.params.id);
  res.redirect('/groups');
})

//===================================================================
// End of Groups

// Addresses
//===================================================================
app.get('/addresses', function (req, res) {
  Address.findAll(function(rows)
  {
    console.log(rows);
    res.render('addresses', {rows})
  })
})

app.post('/addresses', function (req, res) {
  // console.log(req.body);
  Address.create(req.body);
  res.redirect('/addresses');
})

app.get('/addresses/edit/:id', function (req, res) {
  // console.log(req.params);
  Address.findID(req.params.id, function(rows){
    res.render('addressedit', {rows})
  })
})

app.post('/addresses/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Address.update(req.body, req.params.id)
  res.redirect('/addresses');
})

app.get('/addresses/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Address.remove(req.params.id);
  res.redirect('/addresses');
})

//===================================================================
// End of Addresses

// Profiles
//===================================================================
app.get('/profiles', function (req, res) {
  Profile.findAll(function(rows)
  {
    // console.log(rows);
    res.render('profiles', {rows})
  })
})

app.post('/profiles', function (req, res) {
  // console.log(req.body);
  Profile.create(req.body);
  res.redirect('/profiles');
})

app.get('/profiles/edit/:id', function (req, res) {
  // console.log(req.params);
  Profile.findID(req.params.id, function(rows){
    res.render('profileedit', {rows})
  })
})

app.post('/profiles/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Profile.update(req.body,req.params.id)
  res.redirect('/profiles');
})

app.get('/profiles/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Profile.remove(req.params.id);
  res.redirect('/profiles');
})

//===================================================================
// End of Profiles

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
