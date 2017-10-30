const express    = require('express')
const bodyParser = require('body-parser');
// const sqlite3    = require('sqlite3').verbose();

//require models
const Contact = require('./models/contact');
const Group = require('./models/group');
const Profile = require('./models/profile');
const Address = require('./models/address');
const ContactGroup = require('./models/contactgroup');

const app = express();
// const db  = new sqlite3.Database('database.db');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

/////////////////////////////////////////////////////////////////
//                       START ROUTE                           //
/////////////////////////////////////////////////////////////////

let msg = '';

/////////////////////// 1. CONTACTS /////////////////////////////
                        
//GET CONTACTS
app.get('/contacts', function (req, res) {
  
  Group.showGroups(function(groups){
    ContactGroup.showContactsGroup(function(cg){
      Contact.showContacts(function(contacts){
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
      })
    })
  })
  
})

//POST CONTACTS
app.post('/contacts', function (req, res) {
  //if name not empty
  if(req.body.name != ''){
    //if ga sama dengan kosong
    Contact.insertContacts(req.body, function(data){
      // console.log(req.body.id_groups);
      ContactGroup.insertContactGroup(data.lastID, req.body.id_groups, function(){
          Group.showGroups(function(groups){
            Contact.showContacts(function(contacts){
              // res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
              res.redirect('/contacts')
            })
          })
        })
      })
  } else {
    msg = 'Name cannot empty';
    Group.showGroups(function(groups){
      Contact.showContacts(function(contacts){
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
        // res.redirect('/contacts')
      })
    })
  
  }

})

//GET CONTACTS EDIT
app.get('/contacts/edit/:id', function (req, res) {
  Contact.showSpecificId(req.params.id, function(contacts){
    res.render('contacts_edit',{rows: contacts});
  })
  
})

//POST CONTACT EDIT
app.post('/contacts/edit/:id', function (req, res){
  Contact.updateContact(req.body, function(){
    Contact.showSpecificId(req.params.id, function(contacts){
      res.render('contacts_edit',{rows: contacts});
    })
  })
  
})

//GET DELETE ID
app.get('/contacts/delete/:id', function (req, res){
  Contact.deleteContact(req.params.id, function(){
    res.redirect('/contacts');
  })
})

/////////////////////// RELEASE 11 ///////////////////////////
app.get('/groups/assign_contacts/:id_group', function (req, res) {
  Contact.showContacts(function(contacts){
    Group.showSpecificId(req.params.id_group, function(groups){
      res.render('groupassign',{"rows": groups, "contacts": contacts});
      
    })
  })
  // let id_group = req.params.id_group;
  // res.send('masuk asign profile dengan id '+id_group)
  // let showSpecificId = `SELECT * FROM Groups WHERE id=${id_group}`;
  //execute query
  
  // db.all(showContacts, (err, rows)=>{
  //   let contacts = rows
  //   db.all(showSpecificId, (err, rows)=>{
  //     res.render('groupassign',{"rows": rows, "contacts": contacts});
  //   })
  // })

})

app.post('/groups/assign_contacts/:id_group', function (req, res){
  ContactGroup.insertContactGroup(req.body.id_contacts, req.body.id_groups, function(){
    res.redirect('/groups');
  })
  
  // res.send(req.body);
  // let qInsert = `INSERT INTO ContactGroup
  // (id_groups, id_contacts)
  // VALUES
  // ('${req.body.id_groups}', '${req.body.id_contacts}');`
  // console.log(qInsert);
  // db.run(qInsert, ()=>{
  //   res.redirect('/groups');
  // })
})

/////////////////////// 2. GROUPS /////////////////////////////

//GET GROUPS
app.get('/groups', function (req, res) {
  ContactGroup.contactGroupJoin(function(cg){
    Group.showGroups(function(groups){
      res.render('groups',{"rows": groups, "cg": cg});
    })
  })
  
  // let showGroups = `SELECT * FROM Groups`;
  // let join = `SELECT
  //            ContactGroup.id_contacts, ContactGroup.id_groups,
  //            Contacts.id AS cid, Contacts.name
  //           FROM ContactGroup 
  //           JOIN Contacts 
  //           ON ContactGroup.id_contacts = Contacts.id`;
  // db.all(join, (err, rows)=>{
  //   let cg = rows;
  //   db.all(showGroups, (err, rows)=>{
  //     // console.log(cg);
  //     res.render('groups',{"rows": rows, "cg": cg});
  //   })
  // })

  
})

//POST GROUPS
app.post('/groups', function (req, res) {
  Group.insertGroups(req.body, function(){
    Group.showGroups(function(){
      // res.render('groups',{"rows": groups, "cg": cg});
      res.redirect('/groups');
    })
  })
  //set query
  // let showGroups = `SELECT * FROM Groups`;
  // let query = `INSERT INTO Groups
  //              (name_of_group)
  //              VALUES
  //              ("${req.body.name_of_group}");`
  // 
  // //execute query
  // db.run(query,()=>{
  //   db.all(showGroups, (err, rows)=>{
  //     res.render('groups',{rows});
  //   })
  //   
  // })

})

//GET GROUPS EDIT
app.get('/groups/edit/:id', function (req, res) {
  Group.showSpecificId(req.params.id, function(group){
    res.render('groups_edit',{rows: group});
    
  })
  // let id = req.params.id;
  // let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
  // //execute query
  // db.all(showSpecificId, (err, rows)=>{
  //   res.render('groups_edit',{rows});
  // })
})

//POST GROUPS EDIT
app.post('/groups/edit/:id', function (req, res){
  Group.updateGroups(req.body, function(){
    Group.showSpecificId(req.params.id, function(group){
      res.render('groups_edit',{rows: group});
      
    })
  })
  
  // let id = req.params.id;
  // // console.log(req.body);
  // let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
  // 
  // let query = `UPDATE Groups SET
  //               id = ${req.body.id},
  //               name_of_group = "${req.body.name_of_group}"
  //             WHERE 
  //               id = ${req.body.id}`;
  // //execute query
  // db.run(query, ()=>{
  //   db.all(showSpecificId, (err, rows)=>{
  //     res.render('groups_edit',{rows});
  //   })
  //   
  // })
  
})

//GET DELETE ID
app.get('/groups/delete/:id', function (req, res){
  Group.deleteGroups(req.params.id, function(){
    res.redirect('/groups');
  })
  // let id = req.params.id;
  // let query = `DELETE FROM Groups
  //              WHERE id = ${id}`;
  //              
  // //execute query
  // db.run(query,()=>{
  //   res.redirect('/groups');
  // })
})

//////////////////// 3. ADDRESSES ///////////////////////////
                        
//GET ADDRESSES
app.get('/addresses', function (req, res) {
  // let showAddresses = `SELECT * FROM Addresses`;
  Contact.showContacts(function(contacts){
    Address.addressJoin(function(addressjoin){
        res.render('addresses',{"rows": addressjoin, "contacts": contacts});
    })
  })
  // db.all(showContacts, (err, rows)=>{
  //   let contacts = rows;
  //   db.all(showAddressesJoin, (err, rows)=>{
  //     res.render('addresses',{"rows": rows, "contacts": contacts});
  //   })
  // })

  
})

//POST ADDRESSES
app.post('/addresses', function (req, res) {
  Address.insertAddress(req.body, function(){
    res.redirect('/addresses');
  })
  
  //set query
  // console.log(req.body);
  // let showAddresses = `SELECT * FROM Addresses`;
  // let query = `INSERT INTO Addresses
  //              (street, city, zipcode, id_contacts)
  //              VALUES
  //              ("${req.body.street}", "${req.body.city}", "${req.body.zipcode}", "${req.body.id_contacts}");`
  // 
  // // execute query
  // db.run(query, ()=>{
  //   res.redirect('/addresses');
  //   
  // })

})

//GET ADDRESSES EDIT
app.get('/addresses/edit/:id', function (req, res) {
  
  Contact.showContacts(function(contact){
    Address.addressJoinId(req.params.id, function(addressjoin){
      res.render('addresses_edit',{"rows": addressjoin, "contacts": contact});
    })
  })
  // let id = req.params.id;
  // // let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  // let showSpecificId = `SELECT
  //                          Addresses.id AS id, Addresses.id_contacts, Addresses.street, Addresses.city, Addresses.zipcode,
  //                          Contacts.id AS cid, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email
  //                         FROM Addresses 
  //                         JOIN Contacts 
  //                         ON Addresses.id_contacts = Contacts.id
  //                         WHERE Addresses.id=${id}`;
  // //execute query
  // db.all(showContacts, (err, rows)=>{
  //   let contacts = rows;
  //   db.all(showSpecificId, (err, rows)=>{
  //     res.render('addresses_edit',{"rows": rows, "contacts": contacts});
  //   })
  // })

})

//POST ADDRESSES EDIT
app.post('/addresses/edit/:id', function (req, res){
  Address.updateAddress(req.body, function(){
    res.redirect('/addresses');
  })
  // let id = req.params.id;
  // // console.log(req.body);
  // let showSpecificId = `SELECT * FROM Addresses WHERE id=${id}`;
  // let query = `UPDATE Addresses SET
  //               id = ${req.body.id},
  //               street = "${req.body.street}",
  //               city = "${req.body.city}",
  //               zipcode = ${req.body.zipcode},
  //               id_contacts = ${req.body.id_contacts}
  //             WHERE 
  //               id = ${req.body.id}`;
  // //execute query
  // db.run(query, ()=>{
  //   res.redirect('/addresses');
  //   
  // })
  
})

//GET DELETE ID
app.get('/addresses/delete/:id', function (req, res){
  Address.deleteAddress(req.params.id, function(){
    res.redirect('/addresses');
  })
  // let id = req.params.id;
  // let query = `DELETE FROM Addresses
  //              WHERE id = ${id}`;
  //              
  // //execute query
  // db.run(query,()=>{
  //   res.redirect('/addresses');
  // })
})

app.get('/addresses_with_contact', function (req, res){
  Contact.showContacts(function(contacts){
    Address.showAddress(function(address){
      res.render('addresses_with_contact',{"rows": address, "contacts": contacts});
    })
  })
  
  //show contacts
  //show addresses
  // let qContacts = `SELECT * FROM Contacts`;
  // let qAddresses = `SELECT * FROM Addresses`;
  // 
  // db.all(qContacts, (err, rows) => {
  //   let contacts = rows;
  //   // res.send(contacts);
  //   db.all(qAddresses, (err, rows) =>{
  //     res.render('addresses_with_contact',{"rows": rows, "contacts": contacts});
  //   
  //   })
  // })
  
})


// //////////////////// 4. PROFILES ///////////////////////////
// let showProfilesJoin = `SELECT
//                          Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password,
//                          Contacts.id AS cid, Contacts.name
//                         FROM Profile 
//                         JOIN Contacts 
//                         ON Profile.id_contacts = Contacts.id`;
// 
// //GET PROFILES
// app.get('/profiles', function (req, res) {
//   db.all(showContacts, (err, rows)=>{
//     let contacts = rows;
//     db.all(showProfilesJoin, (err, rows)=>{
//       // console.log(rows);
//       // res.render('profiles',{rows});
//       // console.log('contacts',contacts);
//       res.render('profiles',{"rows": rows, "contacts": contacts, "msg": ""});
//     })
//     
//   })
//   
// })
// 
// //POST PROFILES
// app.post('/profiles', function (req, res) {
//   //set query
//   // console.log(req.body);
//   let qCheckId = `SELECT COUNT (*) FROM Profile WHERE id_contacts = ${req.body.id_contacts}`
//   let query = `INSERT OR IGNORE INTO Profile
//                (username, password, id_contacts)
//                VALUES
//                ("${req.body.username}", "${req.body.password}", "${req.body.id_contacts}");`
//   
//   db.all(qCheckId, (err, rows)=>{
//       let checkId = rows[0]['COUNT (*)'];
//       if(checkId == 0){
//           //execute query
//           db.run(query,()=>{
//             db.all(showContacts, (err, rows)=>{
//               let contacts = rows;
//               db.all(showProfilesJoin, (err, rows)=>{
//                 res.render('profiles',{"rows": rows, "contacts": contacts, "msg": ""});
//               })
//                   
//             })
//             
//           })
//       } else {
//         db.all(showContacts, (err, rows)=>{
//           msg = "Your contact already have profile";
//           let contacts = rows;
//           db.all(showProfilesJoin, (err, rows)=>{
//             res.render('profiles',{"rows": rows, "contacts": contacts, "msg":msg});
//           })
//               
//         })
//       }
//   
//   })
// 
// })
// 
// //GET PROFILES EDIT
// app.get('/profiles/edit/:id', function (req, res) {
//   let id = req.params.id;
//   // let showSpecificId = `SELECT * FROM Profile WHERE id=${id}`;
//   let showSpecificId = `SELECT Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password, Contacts.id AS cid, Contacts.name FROM Profile 
//                           JOIN Contacts 
//                           ON Profile.id_contacts = Contacts.id
//                           WHERE Profile.id=${id}`;
//   //execute query
//   db.all(showContacts, (err, rows)=>{
//     let contacts = rows;
//     db.all(showSpecificId, (err, rows)=>{
//       res.render('profiles_edit',{"rows": rows, "contacts": contacts});
//     })
//         
//   })
//   
// })
// 
// //POST PROFILES EDIT
// app.post('/profiles/edit/:id', function (req, res){
//   let id = req.params.id;
//   // console.log(req.body);
//   let showSpecificId = `SELECT Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password, Contacts.id AS cid, Contacts.name FROM Profile 
//                           JOIN Contacts 
//                           ON Profile.id_contacts = Contacts.id
//                           WHERE Profile.id=${id}`;
//   
//   let query = `UPDATE Profile SET
//                 id = ${req.body.id},
//                 username = "${req.body.username}",
//                 password = "${req.body.password}",
//                 id_contacts = "${req.body.id_contacts}"
//               WHERE 
//                 id = ${req.body.id}`;
//                 
//   // execute query
//   db.run(query, ()=>{
//     db.all(showContacts, (err, rows)=>{
//       let contacts = rows;
//       db.all(showSpecificId, (err, rows)=>{
//         // res.render('profiles',{"rows": rows, "contacts": contacts});
//         res.redirect('/profiles');
//       })
//           
//     })
//     
//   })
//   
// })
// 
// //GET PROFILES ID
// app.get('/profiles/delete/:id', function (req, res){
//   let id = req.params.id;
//   let query = `DELETE FROM Profile
//                WHERE id = ${id}`;
//                
//   //execute query
//   db.run(query,()=>{
//     res.redirect('/profiles');
//   })
// })
// 


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})