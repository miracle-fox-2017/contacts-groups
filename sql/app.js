// const express = require('express');

const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const bodyParser = require('body-parser');
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/contacts',function(req,res){
  db.all(`SELECT * FROM Contacts`,function(err,rows){
    if(err){console.log(err)}
      // res.send('masuk ga sih?')
      console.log('masih di get edit?');
      res.render('contacts',{rows:rows, edit:false})
      console.log(rows);
  })
})
app.post('/contacts', function(req,res){
  console.log(req.body)
  let name = req.body.name
  let company = req.body.company
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email
  console.log('testing');
  db.all(`INSERT INTO Contacts (name,company,telp_number,email)
          VALUES("${name}", "${company}", "${phoneNumber}", "${email}")`)
    res.redirect('/contacts')
})
app.get('/contacts/edit/:id',function(req,res){
  //console.log(req.params.id)
  let edit = true;
  db.all(`SELECT * FROM Contacts where id = "${req.params.id}"`,function(err,rows){
    if(err){console.log(err)}
    else{
      // res.send('edit')
      res.render('contacts',{rows:rows, edit:true})
      console.log('edit');}
  })
})
app.post('/contacts/edit/:id', function(req,res){
  let id = req.params.id
  let name = req.body.name
  let company = req.body.company
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email
  db.all(`UPDATE Contacts SET name = "${name}", company = "${company}",telp_number = "${phoneNumber}",email = "${email}"WHERE id = "${id}"`);
  res.redirect('/contacts')
})
app.get('/contacts/delete/:id', function(req,res){
  let id = req.params.id
  db.all(`DELETE FROM Contacts
          WHERE id = "${id}"`);
  res.redirect('/contacts')
})
















app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
