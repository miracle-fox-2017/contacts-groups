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

//GROUP
app.get('/groups',function(req,res){
  db.all(`SELECT * FROM Groups`,function(err,rows){
    if(err) throw err;
      res.render('groups',{rows:rows, isEdit:false})
  })
})
app.post('/groups', function(req,res){
  let name = req.body.name
  db.all(`INSERT INTO Groups (name_of_group)
          VALUES("${name}")`)
    res.redirect('/groups')
})
app.get('/groups/delete/:id', function(req,res){
  let id = req.params.id
  db.all(`DELETE FROM Groups
          WHERE id = "${id}"`);
  res.redirect('/groups')
})
app.get('/groups/edit/:id',function(req,res){
  let isEdit = true;
  db.all(`SELECT * FROM Groups where id = "${req.params.id}"`,function(err,rows){
    if(err) throw err;
    res.render('groups',{rows:rows, isEdit:true})
  })
})
app.post('/groups/edit/:id', function(req,res){
  let id = req.params.id
  let name = req.body.name
  db.all(`UPDATE Groups
          SET name_of_group = "${name}"
              WHERE id = "${id}"`);
  res.redirect('/groups')
})
//ADDRESSES
app.get('/addresses',function(req,res){
  db.all(`SELECT * FROM Addresses`,function(err,rows){
    if(err) throw err;
    res.render('addresses',{rows:rows, edit:false})
  })
})

//ADDRESSES
app.get('/addresses',function(req,res){
  db.all(`SELECT * FROM Addresses`,function(err,rows){
    if(err) throw err;
    res.render('addresses',{rows:rows, edit:false})
  })
})
app.post('/addresses',(req,res) =>{
  let street = req.body.street
  let city = req.body.city
  let zipcode = req.body.zipcode
  db.all(`INSERT INTO Addresses (street, city, zipcode) VALUES("${street}", "${city}", "${zipcode}")`)
    res.redirect('/addresses')
})
app.get('/addresses/edit/:id',(req,res)=>{
  let edit = true;
  db.all(`SELECT * FROM Addresses where id = "${req.params.id}"`,(err,rows)=>{
    if(err) throw err;
    res.render('addresses',{rows:rows, edit:true})
  })
})
app.post('/addresses/edit/:id',(req,res)=>{
  let id = req.params.id
  let street = req.body.street
  let city = req.body.city
  let zipcode = req.body.zipcode
  db.all(`UPDATE Addresses SET street = "${street}", city = "${city}", zipcode = "${zipcode}" WHERE id = "${id}"`);
  res.redirect('/addresses')
})
app.get('/addresses/delete/:id', (req,res) =>{
  let id = req.params.id
  db.all(`DELETE FROM Addresses WHERE id = "${id}"`);
  res.redirect('/addresses')
})


//PROFILE
app.get('/profile',function(req,res){
  db.all(`SELECT * FROM Profile`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      res.render('profile',{rows:rows, isEdit:false})

    }
  })
})
//PROFILE ADD
app.post('/profile', function(req,res){
  let username = req.body.username
  let password = req.body.password
  db.all(`INSERT INTO Profile (username, password)
          VALUES("${username}", "${password}")`)
    res.redirect('/profile')
})
//PROFILE DELETE
app.get('/profile/delete/:id', function(req,res){
  let id = req.params.id
  db.all(`DELETE FROM Profile
          WHERE id = "${id}"`);
  res.redirect('/profile')
})
//PROFILE EDIT
app.get('/profile/edit/:id',function(req,res){
  let isEdit = true;
  db.all(`SELECT * FROM Profile where id = "${req.params.id}"`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      res.render('profile',{rows:rows, isEdit:true})
    }
  })
})
app.post('/profile/edit/:id', function(req,res){
  let id = req.params.id
  let username = req.body.username
  let password = req.body.password
  db.all(`UPDATE Profile
          SET username = "${username}",
              password = "${password}"
              WHERE id = "${id}"`);
  res.redirect('/profile')
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
