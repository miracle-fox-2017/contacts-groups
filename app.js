
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/database.db');

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
