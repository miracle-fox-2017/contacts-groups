const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//REQUIRE
// 1. Contacts
// 2. Groups
// 3. Profile
// 4. Addresses
// 5. Contacts_Groups

// HOME
app.get('/', (req, res)=>{
  res.render('index')
})

// CONTACTS
app.get('/contacts', (req, res)=>{
  // db.all(`SELECT * FROM Addresses` ,(err, rowAddress)=>{
  //       var count = 0
  //       rowAddress.forEach((row) => {
  //         //get contact by row.contact_id
  //         Contact.getIdContacts(row.ContactsId)
  //         .then((dataContact) => {
  //           row.contactName = dataContact.nama
  //           row.company = dataContact.company
  //           count++
  //           if(count == rowAddress.length) {
  //             resolve(rowAddress)
  //           }
  //         })
  //       })
  //     });
  //contacts -->Contacts_Groups --> groups
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Email sudah terdaftar, coba email lain"
  }
  let queryGroups = `SELECT * FROM Groups`
  db.all(queryGroups, (err, dataGroups)=>{
    if(!err){
                                                                                            // `SELECT detail.id,detail.user_id, user.name, detail.movie_id,title,price FROM detail INNER JOIN user ON detail.user_id = user.id INNER JOIN movie ON detail.movie_id=movie.id;`
      let query = `SELECT Contacts.id, Contacts.name, Contacts.company, Contacts_Groups.GroupsId, Contacts_Groups.ContactsId, Contacts.telp_number, Contacts.email, Groups.name_of_group FROM Contacts_Groups JOIN Contacts ON Contacts_Groups.ContactsId = Contacts.id   JOIN Groups ON Contacts_Groups.GroupsId = Groups.id`
      db.all(query, (err, rows)=>{
        if(!err){
          db.all(`SELECT * FROM Contacts_Groups`, (err, dataConjuction)=>{
            if(!err){
              res.send(rows)
                res.render('contacts', {msgError:msgError,rowsContacts:rows, dataGroups:dataGroups,dataConjuction:dataConjuction})
            } else {
              res.send(err)
            }
          })

        } else {
          res.send(err)
          console.log(err);
        }
      })
    } else {
      res.send(err)
    }
  })

})

app.post('/contacts', (req, res)=>{
  // res.send(req)
  let query = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`
  db.run(query, (err)=>{
    if(!err){
        db.get(`SELECT last_insert_rowid()`,(err, idContact)=>{
          if(!err){
            for (let id in idContact) {
              if (idContact.hasOwnProperty(id)) {
                let queryConjuction = `INSERT INTO Contacts_Groups (ContactsId, GroupsId) VALUES ('${idContact[id]}','${req.body.GroupsId}')`
                db.run(queryConjuction, (err)=>{
                  if(!err){
                    res.redirect('/contacts')
                  } else {
                    res.redirect('/contacts/?msgError=true')
                  }
                })
              }
            }
          } else {
            res.send(err)
          }
        })
    } else {
      res.redirect('/contacts/?msgError=true')
    }
  })
})

app.get('/contacts/edit/:id', (req, res)=>{
  let query = `SELECT * FROM Contacts WHERE id = '${req.params.id}'`
  db.get(query, (err, rows)=>{
    if(!err){
      res.render('editContacts', {dataContacts:rows})
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/contacts/edit/:id', (req, res)=>{
  let query = `UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', (req, res)=>{
  let query = `DELETE FROM Contacts WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/contacts')
})

// GROUPS
app.get('/groups', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama grup sudah ada, coba nama lainya"
  }
  let query = `SELECT * FROM Groups`
  db.all(query, (err, rows)=>{
    if(!err){
      res.render('groups', {msgError:msgError,rowsGroups:rows})
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/groups', (req, res)=>{
  let query = `INSERT INTO Groups (name_of_group) VALUES ('${req.body.name_of_group}')`
  db.run(query, (err)=>{
    if(!err){
      res.redirect('/groups')
    } else {
      res.redirect('/groups/?msgError=true')
    }
  })

})

app.get('/groups/edit/:id', (req, res)=>{
  let query = `SELECT * FROM Groups WHERE id = '${req.params.id}'`
  db.get(query, (err, rows)=>{
    if(!err){
      res.render('editGroups', {dataGroups:rows})
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/groups/edit/:id', (req, res)=>{
  let query = `UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', (req, res)=>{
  let query = `DELETE FROM Groups WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/groups')
})

// ADDRESSES
app.get('/addresses', (req, res)=>{
  let query = `SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode,Addresses.ContactsId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactsId = Contacts.id`
  db.all(query, (err, rows)=>{
    if(!err){
      // res.send(rows)
      let queryContacts = `SELECT * FROM Contacts`
      db.all(queryContacts, (err, dataContacts)=>{
        if(!err){
          res.render('addresses', {rowsAddresses:rows, dataContacts:dataContacts})
        } else {
          console.log(err);
          res.send(err)
        }
      })
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/addresses', (req, res)=>{
  let query = `INSERT INTO Addresses (street, city, zipcode, ContactsId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}', '${req.body.ContactsId}')`
  db.run(query)
  res.redirect('/addresses')
})

app.get('/addresses/edit/:id', (req, res)=>{
  let query = `SELECT * FROM Addresses WHERE id = '${req.params.id}'`
  db.get(query, (err, rows)=>{
    if(!err){
      let queryContacts = `SELECT * FROM Contacts`
      db.all(queryContacts, (err, dataContacts)=>{
          if(!err){
            res.render('editAddresses', {dataAddresses:rows,dataContacts:dataContacts})
            // res.send(dataContacts)
          } else {
            res.send(err)
          }
      })

    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/addresses/edit/:id', (req, res)=>{
  let query = `UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}',zipcode = '${req.body.zipcode}', ContactsId = '${req.body.ContactsId}' WHERE id = '${req.params.id}'`
  db.run(query,(err)=>{
    if(!err){
      res.redirect('/addresses')
    } else {
      res.send(err)
    }
  })

})

app.get('/addresses/delete/:id', (req, res)=>{
  let query = `DELETE FROM Addresses WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/addresses')
})

// PROFILES
app.get('/profiles', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Username sudah ada coba yang lainya"
  }
  let query = `SELECT Profile.id, Profile.username, Profile.password, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id`
  db.all(query, (err, rows)=>{
    if(!err){
      let queryContacts = `SELECT * FROM Contacts`
      db.all(queryContacts, (err, dataContacts)=>{
          res.render('profiles', {msgError:msgError,rowsProfiles:rows, dataContacts:dataContacts})
          // res.send(dataContacts)
      })
    } else {
      res.render('profiles')
      console.log(err);
    }
  })
})

app.post('/profiles', (req, res)=>{

  let query = `INSERT INTO Profile (username, password, ContactsId) VALUES ('${req.body.username}','${req.body.password}', '${req.body.ContactsId}')`
  db.run(query, (err)=>{
    if(!err){
      res.redirect('/profiles')
    } else  {
      res.redirect('/profiles/?msgError=true')
      // res.send(err)
      // console.log(err);
    }
  })

})

app.get('/profiles/edit/:id', (req, res)=>{
  let query = `SELECT * FROM Profile WHERE id = '${req.params.id}'`
  db.get(query, (err, rows)=>{
    if(!err){
      let queryContacts = `SELECT * FROM Contacts`
      db.all(queryContacts, (err, dataContacts)=>{
        if(!err){
          res.render('editProfile', {dataProfiles:rows, dataContacts:dataContacts})
        } else {
          res.render('editProfile',{error :''})
          console.log(err);
        }
      })
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

app.post('/profiles/edit/:id', (req, res)=>{
  let query = `UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}', ContactsId = '${req.body.ContactsId}' WHERE id = '${req.params.id}'`
  db.run(query,(err)=>{
    if(!err){
      res.redirect('/profiles')
    } else {
      res.render('profiles', {error:''})
    }
  })

})

app.get('/profiles/delete/:id', (req, res)=>{
  let query = `DELETE FROM Profile WHERE id = '${req.params.id}'`
  db.run(query)
  res.redirect('/profiles')
})

//ADDRESSES WITH CONTACTS
app.get('/addresses_with_contact', (req, res) => {
  let query = `SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name, Contacts.company FROM Addresses LEFT JOIN Contacts ON Addresses.ContactsId = Contacts.id`
  db.all(query, (err, rows)=>{
    if(!err){
      res.render('addresses_with_contact', {rowsAddressesContacts:rows})
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

//ASSIG GROUPS

app.get('/groups/assign_contacts/:id_group', (req, res)=>{
  let query = `SELECT * FROM Groups WHERE id = '${req.params.id_group}'`
  db.get(query, (err, dataGroup)=>{
    if(!err){
      let queryContacts = `SELECT * FROM Contacts`
      db.all(queryContacts, (err, dataContacts)=>{
        if(!err){
          res.render('assignContacts', {dataGroup:dataGroup, dataContacts:dataContacts})
        } else {
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
})

app.post('/groups/assign_contacts/:id_group', (req, res)=>{
  let query = `INSERT INTO Contacts_Groups (ContactsId, GroupsId) VALUES ('${req.body.ContactsId}', '${req.params.id_group}')`
  db.run(query,(err)=>{
    if(!err){
      res.redirect('/groups')
    } else {
      res.send(err)
    }
  })
})
//RUNNING APP SERVER
app.listen(3000,(err)=>{
  if(!err){
    console.log('OTW di pelabuhan 3000');
  } else {
    console.log(err);
  }

})
