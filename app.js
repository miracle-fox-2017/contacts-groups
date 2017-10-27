const express    = require('express')
const bodyParser = require('body-parser');
const sqlite3    = require('sqlite3').verbose();

const app = express();
const db  = new sqlite3.Database('database.db');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

/////////////////////////////////////////////////////////////////
//                       START ROUTE                           //
/////////////////////////////////////////////////////////////////

/////////////////////// 1. CONTACTS /////////////////////////////

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

/////////////////////// 2. GROUPS /////////////////////////////

//GET GROUPS
app.get('/groups', function (req, res) {
  let showGroups = `SELECT * FROM Groups`;
  db.all(showGroups, (err, rows)=>{
    res.render('groups',{rows});
  })
  
})

//POST GROUPS
app.post('/groups', function (req, res) {
  //set query
  let showGroups = `SELECT * FROM Groups`;
  let query = `INSERT INTO Groups
               (name_of_group)
               VALUES
               ("${req.body.name_of_group}");`
  
  //execute query
  db.run(query,()=>{
    db.all(showGroups, (err, rows)=>{
      res.render('groups',{rows});
    })
    
  })

})

//GET GROUPS EDIT
app.get('/groups/edit/:id', function (req, res) {
  let id = req.params.id;
  let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
  //execute query
  db.all(showSpecificId, (err, rows)=>{
    res.render('groups_edit',{rows});
  })
})

//POST GROUPS EDIT
app.post('/groups/edit/:id', function (req, res){
  let id = req.params.id;
  console.log(req.body);
  let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
  
  let query = `UPDATE Groups SET
                id = ${req.body.id},
                name_of_group = "${req.body.name_of_group}"
              WHERE 
                id = ${req.body.id}`;
  //execute query
  db.run(query, ()=>{
    db.all(showSpecificId, (err, rows)=>{
      res.render('groups_edit',{rows});
    })
    
  })
  
})

//GET DELETE ID
app.get('/groups/delete/:id', function (req, res){
  let id = req.params.id;
  let query = `DELETE FROM Groups
               WHERE id = ${id}`;
               
  //execute query
  db.run(query,()=>{
    res.redirect('/groups');
  })
})

//////////////////// 3. ADDRESSES ///////////////////////////

//GET ADDRESSES
app.get('/addresses', function (req, res) {
  let showAddresses = `SELECT * FROM Addresses`;
  db.all(showAddresses, (err, rows)=>{
    res.render('addresses',{rows});
  })
  
})

//POST ADDRESSES
app.post('/addresses', function (req, res) {
  //set query
  let showAddresses = `SELECT * FROM Addresses`;
  let query = `INSERT INTO Addresses
               (street, city, zipcode)
               VALUES
               ("${req.body.street}", "${req.body.city}", "${req.body.zipcode}");`
  
  //execute query
  db.run(query,()=>{
    db.all(showAddresses, (err, rows)=>{
      res.render('addresses',{rows});
    })
    
  })

})

//GET ADDRESSES EDIT
app.get('/addresses/edit/:id', function (req, res) {
  let id = req.params.id;
  let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  //execute query
  db.all(showSpecificId, (err, rows)=>{
    res.render('addresses_edit',{rows});
  })
})

//POST ADDRESSES EDIT
app.post('/addresses/edit/:id', function (req, res){
  let id = req.params.id;
  console.log(req.body);
  let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  
  let query = `UPDATE Addresses SET
                id = ${req.body.id},
                street = "${req.body.street}",
                city = "${req.body.city}",
                zipcode = ${req.body.zipcode}
              WHERE 
                id = ${req.body.id}`;
  //execute query
  db.run(query, ()=>{
    db.all(showSpecificId, (err, rows)=>{
      res.render('addresses_edit',{rows});
    })
    
  })
  
})

//GET ADDRESSES ID
app.get('/addresses/delete/:id', function (req, res){
  let id = req.params.id;
  let query = `DELETE FROM Addresses
               WHERE id = ${id}`;
               
  //execute query
  db.run(query,()=>{
    res.redirect('/addresses');
  })
})


//////////////////// 3. PROFILES ///////////////////////////

//GET PROFILES
app.get('/profiles', function (req, res) {
  let showProfiles = `SELECT * FROM Profile`;
  db.all(showProfiles, (err, rows)=>{
    // console.log(rows);
    res.render('profiles',{rows});
  })
  
})

//POST PROFILES
app.post('/profiles', function (req, res) {
  //set query
  // console.log(req.body);
  let showProfiles = `SELECT * FROM Profile`;
  let query = `INSERT INTO Profile
               (username, password)
               VALUES
               ("${req.body.username}", "${req.body.password}");`
  
  //execute query
  db.run(query,()=>{
    db.all(showProfiles, (err, rows)=>{
      res.render('profiles',{rows});
    })
    
  })

})

//GET PROFILES EDIT
app.get('/profiles/edit/:id', function (req, res) {
  let id = req.params.id;
  let showSpecificId = `SELECT * FROM Profile WHERE id=${id}`;
  //execute query
  db.all(showSpecificId, (err, rows)=>{
    res.render('profiles_edit',{rows});
  })
})

//POST PROFILES EDIT
app.post('/profiles/edit/:id', function (req, res){
  let id = req.params.id;
  console.log(req.body);
  let showSpecificId = `SELECT * FROM Profile WHERE id=${id}`;
  
  let query = `UPDATE Profile SET
                id = ${req.body.id},
                username = "${req.body.username}",
                password = "${req.body.password}"
              WHERE 
                id = ${req.body.id}`;
  //execute query
  db.run(query, ()=>{
    db.all(showSpecificId, (err, rows)=>{
      res.render('profiles_edit',{rows});
    })
    
  })
  
})

//GET PROFILES ID
app.get('/profiles/delete/:id', function (req, res){
  let id = req.params.id;
  let query = `DELETE FROM Profile
               WHERE id = ${id}`;
               
  //execute query
  db.run(query,()=>{
    res.redirect('/profiles');
  })
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})