const express = require('express')
const app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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

app.post('/contacts', function (req, res) {
  let queryContact = ` * FROM Contacts`
  db.all(queryContact, function(err, rowContacts){
    res.render('contacts',{rowContacts})
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})