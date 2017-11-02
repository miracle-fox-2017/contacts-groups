const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const index = require('./routes/index');
const contacts = require('./routes/contacts');
const groups = require('./routes/groups');
const addresses = require('./routes/addresses');
const profiles = require('./routes/profiles');
const addressesWithContact = require('./routes/addresses_with_contact');

const app = express()
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', index)
app.use('/contacts', contacts)
app.use('/groups', groups)
app.use('/addresses', addresses)
app.use('/profiles', profiles)
app.use('/addresses_with_contact', addressesWithContact)

app.listen(3000, function(){
  console.log('ngueeeng jalan');
})
