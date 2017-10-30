const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


const app = express()
const db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.set('views','./views');
app.set('view engine','ejs')

app.get('/',function(req,res) {
  res.send('masih rilis 0 menuju rilis 1')
})
  //Contacts
app.get('/contacts',function(req,res){
  db.all("SELECT * FROM Contacts", function(err, rows) {
        // console.log(rows);
        res.render('contacts',{rows})
        })
      })

//add
app.post('/contacts',function(req,res) {
  db.all(`INSERT INTO Contacts(name,company,telp_number,email) VALUES("${req.body.name}",
  "${req.body.company}",
  "${req.body.telp_number}",
  "${req.body.email}")`
  ,function(err,rows) {
      res.redirect('/Contacts')
  })
})

//delete
app.get('/contacts/delete/:id',function(req,res) {
  db.all(`DELETE FROM Contacts WHERE id = "${req.params.id}"`,function(err,rows) {
    res.redirect('/Contacts')
  })
})

//edit
app.get('/contacts/edit/:id',function(req,res) {
  db.all(`SELECT * FROM Contacts`,function(err,rows) {
res.render('editcontacts',{rows})
  })
})

app.post('/contacts/edit/:id',function(req,res) {
  db.all(`UPDATE Contacts SET
    name = '${req.body.name}',
    company = '${req.body.company}',
    telp_number = '${req.body.telp_number}',
    email = '${req.body.email}'
    WHERE
    id = ${req.params.id}`,function(err,rows) {
      res.redirect('/contacts')
    })

})



//Addresses
app.get('/addresses',function(req,res){
  db.all("SELECT * FROM Addresses",function(err,rows) {
    res.render('addresses',{rows})
  })
})

//add
app.post('/addresses',function(req,res) {
  db.all(`INSERT INTO Addresses(street,city,zipcode) VALUES("${req.body.street}","${req.body.city}","${req.body.zipcode}")`,function(err,rows){
    res.redirect('/Addresses')
  })
})

//delete
app.get('/addresses/delete/:id',function(req,res) {
  db.all(`DELETE FROM Addresses WHERE id = "${req.params.id}"`,function(err,rows) {
    res.redirect('/Addresses')
  })
})

//edit
app.get('/addresses/edit/:id',function(req,res) {
  db.all(`SELECT * FROM Addresses`,function(err,rows) {
res.render('editaddresses',{rows})
  })
})

app.post('/addresses/edit/:id',function(req,res) {
  db.all(`UPDATE Addresses SET
    street = '${req.body.street}',
    city = '${req.body.city}',
    zipcode = '${req.body.zipcode}'
    WHERE
    id = ${req.params.id}`,function(err,rows) {
      res.redirect('/addresses')
    })

})


//Groups
app.get('/groups',function(req,res){
  db.all("SELECT * FROM Groups",function(err,rows) {
      res.render('groups',{rows})
  })
})

//add
app.post('/groups',function(req,res){
  // console.log(req.body.groups);
  db.all(`INSERT INTO Groups(name_of_group) VALUES("${req.body.groups}")`,function(err,rows) {
      res.redirect('/groups')
  })
})

//delete
app.get('/groups/delete/:id',function(req,res) {
  db.all(`DELETE FROM Groups WHERE id = "${req.params.id}"`,function(err,rows) {
    res.redirect('/Groups')
  })
})

//edit
app.get('/groups/edit/:id',function(req,res) {
  db.all(`SELECT * FROM Groups`,function(err,rows) {
res.render('editgroups',{rows})
  })
})

app.post('/groups/edit/:id',function(req,res) {
  db.all(`UPDATE Groups SET
    name_of_group = '${req.body.groups}'
    WHERE
    id = ${req.params.id}`,function(err,rows) {
      res.redirect('/groups')
    })

})


//Profile
app.get('/profile',function(req,res){
  db.all("SELECT * FROM Profile",function(err,rows) {
      res.render('profile',{rows})
  })
})
//add
app.post('/profile',function(req,res) {
  db.all(`INSERT INTO Profile(username,password) VALUES("${req.body.username}","${req.body.password}")`,function(err,rows){
    res.redirect('/Profile')
  })
})

//delete
app.get('/profile/delete/:id',function(req,res) {
  db.all(`DELETE FROM Profile WHERE id = "${req.params.id}"`,function(err,rows) {
    res.redirect('/profile')
  })
})

//edit
app.get('/profile/edit/:id',function(req,res) {
  db.all(`SELECT * FROM profile`,function(err,rows) {
res.render('editprofile',{rows})
  })
})

app.post('/profile/edit/:id',function(req,res) {
  db.all(`UPDATE Profile SET
    username = '${req.body.username}',
    password = '${req.body.password}'
    WHERE
    id = ${req.params.id}`,function(err,rows) {
      res.redirect('/profile')
    })

})




app.listen(3000,function() {
  console.log('masuk port 3000');
})
