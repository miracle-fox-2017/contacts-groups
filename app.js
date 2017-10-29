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

let msg = '';
let showContacts     = `SELECT * FROM Contacts`;
let showGroups       = `SELECT * FROM Groups`;

/////////////////////// 1. CONTACTS /////////////////////////////
let showContactsGroup = `SELECT
                         ContactGroup.id_contacts, ContactGroup.id_groups,
                         Groups.id AS gid, Groups.name_of_group
                        FROM ContactGroup 
                        JOIN Groups 
                        ON ContactGroup.id_groups = Groups.id`;
                        
//GET CONTACTS
app.get('/contacts', function (req, res) {
  db.all(showGroups, (err, rows)=>{
    let groups = rows;
    db.all(showContactsGroup, (err, rows)=>{
      let cg = rows;
      db.all(showContacts, (err, rows)=>{
        res.render('contacts',{"rows": rows, "groups": groups, "cg": cg, "msg": ''});
      })
    })
  })
  
})

//POST CONTACTS
app.post('/contacts', function (req, res) {
  //if name not empty
  console.log(req.body);

  //set query
  let showContacts = `SELECT * FROM Contacts`;
  let query = `INSERT INTO Contacts
               (name, company, telp_number, email)
               VALUES
               ("${req.body.name}", "${req.body.company}", "${req.body.telp_number}", "${req.body.email}");`
  

  
  if(req.body.name != ''){
    //execute query
    db.run(query,()=>{
    
    //cari yang id yang baru di insert
    let qLastId = `SELECT id FROM Contacts ORDER BY id DESC LIMIT 1`;
    db.all(qLastId, (err, rows) =>{
      let lastid = rows[0].id;
      let qCG = `INSERT INTO ContactGroup
                  (id_contacts, id_groups)
                  VALUES
                  (${lastid}, ${req.body.id_groups})`;
      //run query yang di groups
      db.run(qCG, ()=>{
        db.all(showGroups, (err, rows)=>{
          let groups = rows;
          db.all(showContacts, (err, rows)=>{
            res.render('contacts',{"rows": rows, "groups":groups, "msg": ''});
          })
        })
      });
    })
    

      
    })
  } else {
    msg = 'Name cannot empty';
    db.all(showGroups, (err, rows)=>{
      let groups = rows;
      db.all(showContacts, (err, rows)=>{
        res.render('contacts',{"rows": rows, "groups":groups, "msg": msg});
      })
    })
  }

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

/////////////////////// RELEASE 11 ///////////////////////////



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
  // console.log(req.body);
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
let showAddressesJoin = `SELECT
                         Addresses.id AS id, Addresses.id_contacts, Addresses.street, Addresses.city, Addresses.zipcode,
                         Contacts.id AS cid, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email
                        FROM Addresses 
                        JOIN Contacts 
                        ON Addresses.id_contacts = Contacts.id`;
                        
//GET ADDRESSES
app.get('/addresses', function (req, res) {
  // let showAddresses = `SELECT * FROM Addresses`;
  db.all(showContacts, (err, rows)=>{
    let contacts = rows;
    db.all(showAddressesJoin, (err, rows)=>{
      res.render('addresses',{"rows": rows, "contacts": contacts});
    })
  })

  
})

//POST ADDRESSES
app.post('/addresses', function (req, res) {
  //set query
  // console.log(req.body);
  // let showAddresses = `SELECT * FROM Addresses`;
  let query = `INSERT INTO Addresses
               (street, city, zipcode, id_contacts)
               VALUES
               ("${req.body.street}", "${req.body.city}", "${req.body.zipcode}", "${req.body.id_contacts}");`
  
  // execute query
  db.run(query, ()=>{
    res.redirect('/addresses');
    
  })

})

//GET ADDRESSES EDIT
app.get('/addresses/edit/:id', function (req, res) {
  let id = req.params.id;
  // let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  let showSpecificId = `SELECT
                           Addresses.id AS id, Addresses.id_contacts, Addresses.street, Addresses.city, Addresses.zipcode,
                           Contacts.id AS cid, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email
                          FROM Addresses 
                          JOIN Contacts 
                          ON Addresses.id_contacts = Contacts.id
                          WHERE Addresses.id=${id}`;
  //execute query
  db.all(showContacts, (err, rows)=>{
    let contacts = rows;
    db.all(showSpecificId, (err, rows)=>{
      res.render('addresses_edit',{"rows": rows, "contacts": contacts});
    })
  })

})

//POST ADDRESSES EDIT
app.post('/addresses/edit/:id', function (req, res){
  let id = req.params.id;
  // console.log(req.body);
  let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  let query = `UPDATE Addresses SET
                id = ${req.body.id},
                street = "${req.body.street}",
                city = "${req.body.city}",
                zipcode = ${req.body.zipcode},
                id_contacts = ${req.body.id_contacts}
              WHERE 
                id = ${req.body.id}`;
  //execute query
  db.run(query, ()=>{
    res.redirect('/addresses');
    
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

app.get('/addresses_with_contact', function (req, res){
  //show contacts
  //show addresses
  let qContacts = `SELECT * FROM Contacts`;
  let qAddresses = `SELECT * FROM Addresses`;
  
  db.all(qContacts, (err, rows) => {
    let contacts = rows;
    // res.send(contacts);
    db.all(qAddresses, (err, rows) =>{
      res.render('addresses_with_contact',{"rows": rows, "contacts": contacts});
    
    })
  })
  
})


//////////////////// 4. PROFILES ///////////////////////////
let showProfilesJoin = `SELECT
                         Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password,
                         Contacts.id AS cid, Contacts.name
                        FROM Profile 
                        JOIN Contacts 
                        ON Profile.id_contacts = Contacts.id`;

//GET PROFILES
app.get('/profiles', function (req, res) {
  db.all(showContacts, (err, rows)=>{
    let contacts = rows;
    db.all(showProfilesJoin, (err, rows)=>{
      // console.log(rows);
      // res.render('profiles',{rows});
      // console.log('contacts',contacts);
      res.render('profiles',{"rows": rows, "contacts": contacts, "msg": ""});
    })
    
  })
  
})

//POST PROFILES
app.post('/profiles', function (req, res) {
  //set query
  // console.log(req.body);
  let qCheckId = `SELECT COUNT (*) FROM Profile WHERE id_contacts = ${req.body.id_contacts}`
  let query = `INSERT OR IGNORE INTO Profile
               (username, password, id_contacts)
               VALUES
               ("${req.body.username}", "${req.body.password}", "${req.body.id_contacts}");`
  
  db.all(qCheckId, (err, rows)=>{
      let checkId = rows[0]['COUNT (*)'];
      if(checkId == 0){
          //execute query
          db.run(query,()=>{
            db.all(showContacts, (err, rows)=>{
              let contacts = rows;
              db.all(showProfilesJoin, (err, rows)=>{
                res.render('profiles',{"rows": rows, "contacts": contacts, "msg": ""});
              })
                  
            })
            
          })
      } else {
        db.all(showContacts, (err, rows)=>{
          msg = "Your contact already have profile";
          let contacts = rows;
          db.all(showProfilesJoin, (err, rows)=>{
            res.render('profiles',{"rows": rows, "contacts": contacts, "msg":msg});
          })
              
        })
      }
  
  })

})

//GET PROFILES EDIT
app.get('/profiles/edit/:id', function (req, res) {
  let id = req.params.id;
  // let showSpecificId = `SELECT * FROM Profile WHERE id=${id}`;
  let showSpecificId = `SELECT Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password, Contacts.id AS cid, Contacts.name FROM Profile 
                          JOIN Contacts 
                          ON Profile.id_contacts = Contacts.id
                          WHERE Profile.id=${id}`;
  //execute query
  db.all(showContacts, (err, rows)=>{
    let contacts = rows;
    db.all(showSpecificId, (err, rows)=>{
      res.render('profiles_edit',{"rows": rows, "contacts": contacts});
    })
        
  })
  
})

//POST PROFILES EDIT
app.post('/profiles/edit/:id', function (req, res){
  let id = req.params.id;
  // console.log(req.body);
  let showSpecificId = `SELECT Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password, Contacts.id AS cid, Contacts.name FROM Profile 
                          JOIN Contacts 
                          ON Profile.id_contacts = Contacts.id
                          WHERE Profile.id=${id}`;
  
  let query = `UPDATE Profile SET
                id = ${req.body.id},
                username = "${req.body.username}",
                password = "${req.body.password}",
                id_contacts = "${req.body.id_contacts}"
              WHERE 
                id = ${req.body.id}`;
                
  // execute query
  db.run(query, ()=>{
    db.all(showContacts, (err, rows)=>{
      let contacts = rows;
      db.all(showSpecificId, (err, rows)=>{
        // res.render('profiles',{"rows": rows, "contacts": contacts});
        res.redirect('/profiles');
      })
          
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