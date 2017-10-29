const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/database.db');
const bodyParser = require('body-parser');

//set
app.set('view engine', 'ejs')

//use
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


//get index
app.get('/', function (req, res) {
  res.render('index')

})


//get contacts
app.get('/contacts', function (req, res) {
  db.all(`SELECT * FROM Contacts left JOIN Profile `,(err,row) => {
    res.render('contacts', {data:row} )
  })
})
app.post('/contacts', function (req, res){
  db.run(`INSERT INTO Contacts (name,company,telp,email)
  VALUES ('${req.body.name}' , '${req.body.company}' , '${req.body.telp}' ,
  '${req.body.email}')`,() =>{
  res.redirect('/contacts');
  })
})
/////------>edit contacts
app.get('/contacts/edit/:id', function(req,res){
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`, (err,row)=>{
    res.render('contacsedit', {data:row})
  })
})

app.post('/contacts/edit/:id', function(req,res){
  db.run(`UPDATE Contacts SET name = '${req.body.name}',
   company = '${req.body.company}',
   telp = '${req.body.telp}',
   email = '${req.body.email}'
   WHERE id = ${req.params.id}`, ()=> {
     res.redirect('/contacts')
   })
})
//----->delet
app.get('/contacts/delete/:id', function (req,res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`,() =>{
    res.redirect('/contacts');
  })
})


//-------------------------------
//get groups
app.get('/groups', function (req, res) {
  db.all(`SELECT * FROM Groups`, (err,row) => {
    res.render('groups', {data:row, title: ''} )
  })
})

app.post('/groups', function (req,res){
  db.run(`INSERT INTO Groups(name_of_group)
  VALUES('${req.body.name}')`,()=>{
    res.redirect('/groups');
  })
})

//----->edit groups
app.get('/groups/edit/:id', function(req,res){
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id}`, (err,row)=>{
    res.render('groupsedit', {data:row})
  })
})
app.post('/groups/edit/:id', function(req,res){
  db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}'
   WHERE id = ${req.params.id}`, ()=> {
     res.redirect('/groups')
   })
})
//-------> delete
app.get('/groups/delete/:id', function (req,res){
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`,() =>{
    res.redirect('/groups');
  })
})


//-------------------------------
//get profile
app.get('/profile', function (req, res) {
  db.all(`SELECT * FROM Profile`,(err,row) =>{
    res.render('profile',{data:row,title: ''})
  })
})
app.post('/profile', function (req,res){
  db.run(`INSERT INTO Profile(Username,password)
  VALUES('${req.body.Username}', '${req.body.password}')`, () =>{
    res.redirect('/profile')
  })
})

//====> edit profile
app.get('/profile/edit/:id', function(req,res){
  db.all(`SELECT * FROM Profile WHERE id=${req.params.id}`, (err,row)=>{
    res.render('profileEdit', {data:row})
  })
})
app.post('/profile/edit/:id', function(req,res){
  db.run(`UPDATE Profile SET Username = '${req.body.Username}',
  password = '${req.body.password}'
   WHERE id = ${req.params.id}`, ()=> {
     res.redirect('/profile')
   })
})

//----delete



//---------
//address
app.get('/addresses', function (req, res) {
  db.all(`SELECT * FROM addresses`, (err,row) =>{
    res.render('addresses',{data:row,title: '' })
  })
})

app.post('/addresses', function (req,res){
  db.run(`INSERT INTO addresses(street,city,zipcode)
  VALUES('${req.body.street}', '${req.body.city}', '${req.body.zipcode}')`, () =>{
    res.redirect('/addresses')
  })
})

app.get('/addresses/delete/:id', function (req,res){
  db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`,() =>{
    res.redirect('/addresses');
  })
})


//-----edit
app.get('/addresses/edit/:id', function(req,res){
  db.all(`SELECT * FROM Addresses WHERE id=${req.params.id}`, (err,row)=>{
    res.render('addressesedit', {data:row})
    //console.log(row);
  })

})

app.post('/addresses/edit/:id', function(req,res){
  db.run(`UPDATE Addresses SET street = '${req.body.street}',
   city = '${req.body.city}',
   zipcode = '${req.body.zipcode}'
   WHERE id = ${req.params.id}`, ()=> {
     res.redirect('/addresses')
   })
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
