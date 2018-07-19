const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//REQUIRE
// 1. Contacts
// 2. Groups
// 3. Profile
// 4. Addresses
// 5. Contacts_Groups

// ROUTE

let index = require('./routers/index');
let contacts = require('./routers/contacts');
let groups = require('./routers/groups');
let profiles = require('./routers/profiles');
let addresses = require('./routers/addresses');

app.use('/',index);
app.use('/contacts',contacts);
app.use('/groups',groups);
app.use('/profiles',profiles);
app.use('/addresses',addresses);


//ADDRESSES WITH CONTACTS
app.get('/addresses_with_contact', (req, res) => {
  let query = `SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name, Contacts.company FROM Addresses LEFT JOIN Contacts ON Addresses.ContactsId = Contacts.id`
  db.all(query, (err, rows)=>{
    if(!err){
      res.render('addresses_with_contact', {rowsAddressesContacts:rows})
    } else {
      res.send(err)
    }
  })
})


//RUNNING APP SERVER
app.listen(3000,(err)=>{
  if(!err){
    console.log('OTW di pelabuhan 3000');
  } else {
    console.log(err);
  }

})
