const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');

app.get('/contacts', function (req, res) {
db.all(`SELECT * FROM Contacts`, function(err, rows)
  {
    // console.log(rows);
    res.render('contacts', {rows})
  })
})

app.post('/contacts', function (req, res) {
  // console.log(req.body);
  db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')` );
  res.redirect('/contacts');
})

app.get('/contacts/edit/:id', function (req, res) {
  // console.log(req.params);
  db.each(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function(err, rows){
    res.render('contactedit', {rows})
  })
})

app.post('/contacts/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  db.run(`UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
})

app.get('/contacts/delete/:id', function (req, res) {
  console.log('masuk DELETE');
  db.each(`DELETE FROM Contacts WHERE id = ${req.params.id}`, function(err, rows){
  });
  res.redirect('/contacts');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})