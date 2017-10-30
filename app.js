const express=require('express');
const bodyParser =require('body-parser')
const app = express();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')


app.get('/',function(req,res){
  res.send('this is HOME')
})
//CONTACTS=======================================================//
//Menampilkan semua data contacts
app.get('/contacts',function(req,res){
  db.all(`SELECT * FROM Contacts`,function(err,rowContacts){
    res.render('contacts',{rowContacts})
  })
})
//Menerima input contact
app.post('/contacts',function(req,res){
  // console.log(req.body.Name);
  db.run(`INSERT INTO Contacts(Name, Company, Telp_number, Email)
  VALUES ('${req.body.Name}','${req.body.Company}','${req.body.Telp_number}','${req.body.Email}')` );
  res.redirect('/contacts')
})
//Menampilkan data contact spesifik untuk diubah
app.get('/contacts/edit/:id',function(req,res){
  db.each(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function(err,rowContacts){
    // console.log(rowContacts);
    res.render('editcontacts',{rowContacts})
  })
})
//Menerima data form untuk update contact
app.post('/contacts/edit/:id',function(req,res){

  db.run(`UPDATE Contacts
    SET Name = '${req.body.Name}',
    Company = '${req.body.Company}',
    Telp_number = '${req.body.Telp_number}',
    Email = '${req.body.Email}'
    WHERE id = ${req.params.id}
  ` );
  res.redirect('/contacts')
})
// Menghapus data contact berdasarkan id
app.get('/contacts/delete/:id',function(req,res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
    res.redirect('/contacts')
})

//GROUPS======================================================
//Menampilkan semua data groups
app.get('/groups',function(req,res){
  db.all(`SELECT * FROM Groups`,function(err,rowContacts){
    res.render('groups',{rowContacts})
  })
})
//Menerima data form untuk input group
app.post('/groups',function(req,res){
  // console.log(req.body.Name);
  db.run(`INSERT INTO Groups(name_of_group)
  VALUES ('${req.body.name_of_group}')` );
  res.redirect('/groups')
})
//Menampilkan data group spesifik untuk diubah
app.get('/groups/edit/:id',function(req,res){
  db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function(err,rowGroups){
    // console.log(rowContacts);
    res.render('editgroups',{rowGroups})
  })
})
//Menerima data form untuk update group
app.post('/groups/edit/:id',function(req,res){
  db.run(`UPDATE Groups
    SET name_of_group = '${req.body.name_of_group}'
    WHERE id = ${req.params.id}
  ` );
  res.redirect('/groups')
})
//Menghapus data group berdasarkan id
app.get('/groups/delete/:id',function(req,res){
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
    res.redirect('/groups')
})
app.listen(3000)
