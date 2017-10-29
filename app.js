const express = require('express');
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

const app = express()
const db = new sqlite3.Database('./database.db');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', function(req, res){
  res.send('testing 3000')
});

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM contacts`, function(err, rows) {
    console.log(rows);
  res.render('contacts', {rows})
  })
})

app.post('/contacts', function(req, res){
  console.log(req.body);
  db.run(`INSERT INTO contacts (name, company, telp, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp}', '${req.body.email}')`)
  res.redirect('./contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  db.each(`SELECT * FROM contacts WHERE id=${req.params.id}`, function(err, rows){
    res.render('editContacts', {rows})
  })
})

app.post('/contacts/edit/:id', function(req, res){
		db.all(`UPDATE contacts SET name = "${req.body.name}" , company = "${req.body.company}" , telp = "${req.body.telp}", email = "${req.body.email}" WHERE id = "${req.params.id}"`)
    res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res){
  db.all(`DELETE FROM contacts where id = "${req.params.id}"`)
  res.redirect('/contacts')
})

app.listen(3000,function(){
  console.log('brum brum jalan app');
});
