const express    = require('express')
const bodyParser = require('body-parser');
const sqlite3    = require('sqlite3').verbose();

const app = express();
const db  = new sqlite3.Database('database.db');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

/////////////////////////START ROUTE/////////////////////////////

//GET CONTACTS
app.get('/contacts', function (req, res) {
  let showContacts = `SELECT * FROM Contacts`;
  db.all(showContacts, (err, rows)=>{
    res.render('contacts',{rows});
  })
  
})

//POST CONTACTS
app.post('/contacts', function (req, res) {
  //set query
  let showContacts = `SELECT * FROM Contacts`;
  let query = `INSERT INTO Contacts
               (name, company, telp_number, email)
               VALUES
               ("${req.body.name}", "${req.body.company}", "${req.body.telp_number}", "${req.body.email}");`
  
  //execute query
  db.run(query,()=>{
    db.all(showContacts, (err, rows)=>{
      res.render('contacts',{rows});
    })
    
  })

})

//GET CONTACTS EDIT
app.get('/contacts/edit/:id', function (req, res) {
  let id = req.params.id;
  let showSpecificId = `SELECT * FROM Contacts WHERE id=${id}`;
  //execute query
  db.all(showSpecificId, (err, rows)=>{
    res.render('contacts_edit',{rows});
  })
})

//POST CONTACT EDIT
app.post('/contacts/edit/:id', function (req, res){
  let id = req.params.id;
  let showSpecificId = `SELECT * FROM Contacts WHERE id=${id}`;
  
  let query = `UPDATE Contacts SET
                id = ${req.body.id},
                name = "${req.body.name}",
                company = "${req.body.company}",
                telp_number = "${req.body.telp_number}",
                email = "${req.body.email}"
              WHERE 
                id = ${req.body.id}`;
  //execute query
  db.run(query, ()=>{
    db.all(showSpecificId, (err, rows)=>{
      res.render('contacts_edit',{rows});
    })
    
  })
  
})

//GET DELETE ID
app.get('/contacts/delete/:id', function (req, res){
  let id = req.params.id;
  let query = `DELETE FROM Contacts
               WHERE id = ${id}`;
               
  //execute query
  db.run(query,()=>{
    res.redirect('/contacts');
  })
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})