const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');
const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')
//load/init body parser and save to variable
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/contacts',function(req,res){
  db.all(`SELECT * FROM Contacts`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      //console.log(rows[0].name)
      res.render('contacts',{rows:rows, isEdit:false})

    }
  })
})
app.post('/contacts', urlencodedParser, function(req,res){
  console.log(req.body)
  let name = req.body.name
  let company = req.body.company
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email
  db.all(`INSERT INTO Contacts (name,company,telp_number,email)
          VALUES("${name}", "${company}", "${phoneNumber}", "${email}")`)
    res.redirect('/contacts')
})

app.get('/contacts/edit/:id',function(req,res){
  //console.log(req.params.id)
  let isEdit = true;
  db.all(`SELECT * FROM Contacts where id = "${req.params.id}"`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      console.log(rows[0].name)
      res.render('contacts',{rows:rows, isEdit:true})
    }
  })
})
app.post('/contacts/edit/:id', urlencodedParser, function(req,res){
  console.log(req.params.id)
  let id = req.params.id
  let name = req.body.name
  let company = req.body.company
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email
  db.all(`UPDATE Contacts
          SET name = "${name}",
              company = "${company}",
              telp_number = "${phoneNumber}",
              email = "${email}"
              WHERE id = "${id}"`);
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
    if(err){
      console.log(err)
    }else{
      res.render('groups',{rows:rows, isEdit:false})

    }
  })
})
//GROUPS ADD
app.post('/groups', urlencodedParser, function(req,res){
  let name = req.body.name
  db.all(`INSERT INTO Groups (name_of_group)
          VALUES("${name}")`)
    res.redirect('/groups')
})
//GROUPS DELETE
app.get('/groups/delete/:id', function(req,res){
  let id = req.params.id
  db.all(`DELETE FROM Groups
          WHERE id = "${id}"`);
  res.redirect('/groups')
})
//GROUPS EDIT
app.get('/groups/edit/:id',function(req,res){
  let isEdit = true;
  db.all(`SELECT * FROM Groups where id = "${req.params.id}"`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      console.log(rows[0].name)
      res.render('groups',{rows:rows, isEdit:true})
    }
  })
})
app.post('/groups/edit/:id', urlencodedParser, function(req,res){
  let id = req.params.id
  let name = req.body.name
  db.all(`UPDATE Groups
          SET name_of_group = "${name}"
              WHERE id = "${id}"`);
  res.redirect('/groups')
})
app.listen(3000,function(){
})
