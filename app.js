const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const contact = require('./router/contacts');
const group = require('./router/groups');
const profile = require('./router/profiles');
const address = require('./router/addresses');
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './views')
app.set('view engine', 'ejs')
//load/init body parser and save to variable
//const urlencodedParser = bodyParser.urlencoded({ extended: false })
//CONTACTS
app.use('/',contact);
app.use('/',group);
app.use('/',profile);
app.use('/',address);

// CONTACTS EDIT
// app.get('/contacts/edit/:id',function(req,res){
//   //mendifinisikan isEdit untuk form jika dia true tampilkan form edit
//   let isEdit = true;
//   db.all(`SELECT * FROM Contacts where id = "${req.params.id}"`,function(err,rows){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(rows[0].name)
//       res.render('contacts',{rows:rows, isEdit:true})
//     }
//   })
// })
// //CONTACTS menerima value dari form edit
// app.post('/contacts/edit/:id', urlencodedParser, function(req,res){
//   console.log(req.params.id)
//   let id = req.params.id
//   let name = req.body.name
//   let company = req.body.company
//   let phoneNumber = req.body.phoneNumber
//   let email = req.body.email
//   db.all(`UPDATE Contacts
//           SET name = "${name}",
//               company = "${company}",
//               telp_number = "${phoneNumber}",
//               email = "${email}"
//               WHERE id = "${id}"`);
//   res.redirect('/contacts')
// })
//
// //GROUP
// app.get('/groups',function(req,res){
//   db.all(`SELECT * FROM Groups`,function(err,rows1){
//     if(err){
//       console.log(err)
//     }else{
//       db.all(`SELECT * FROM Contacts`,function(err,rows2){
//         if(err){
//           console.log(err)
//         }else{
//           res.render('groups',{groups:rows1, contacts:rows2, isEdit:false})
//         }
//       })
//     }
//   })
// })
// //GROUPS ADD
// app.post('/groups', urlencodedParser, function(req,res){
//   let name = req.body.name
//   db.all(`INSERT INTO Groups (name_of_group)
//           VALUES("${name}")`)
//     res.redirect('/groups')
// })
// //GROUPS DELETE
// app.get('/groups/delete/:id', function(req,res){
//   let id = req.params.id
//   db.all(`DELETE FROM Groups
//           WHERE id = "${id}"`);
//   res.redirect('/groups')
// })
// //GROUPS EDIT
// app.get('/groups/edit/:id',function(req,res){
//   let isEdit = true;
//   db.all(`SELECT * FROM Groups where id = "${req.params.id}"`,function(err,rows){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(rows[0].name)
//       db.all(`SELECT * FROM Contacts`, function(err,rows2){
//         res.render('groups',{groups:rows, contacts:rows2, isEdit:true})
//       })
//     }
//   })
// })
// app.post('/groups/edit/:id', urlencodedParser, function(req,res){
//   let id = req.params.id
//   let name = req.body.name
//   db.all(`UPDATE Groups
//           SET name_of_group = "${name}"
//               WHERE id = "${id}"`);
//   res.redirect('/groups')
// })
// //PROFILE
// app.get('/profile',function(req,res){
//   db.all(`SELECT * FROM Profile`,function(err,rows1){
//     if(err){
//       console.log(err)
//     }else{
//       db.all(`SELECT * FROM Contacts`,function(err,rows2){
//         if(err){
//           console.log(err)
//         }else{
//           console.log(rows1)
//           res.render('profile',{profiles:rows1, contacts:rows2, isEdit:false})
//         }
//       })
//     }
//   })
// })
// //PROFILE ADD
// app.post('/profile', urlencodedParser, function(req,res){
//   let username = req.body.username
//   let password = req.body.password
//   let contacts_id = req.body.contact
//   db.all(`INSERT INTO Profile (username, password, contacts_id)
//           VALUES("${username}", "${password}","${contacts_id}")`)
//           //console.log(req.body.id)
//     res.redirect('/profile')
// })
// //PROFILE DELETE
// app.get('/profile/delete/:id', function(req,res){
//   let id = req.params.id
//   db.all(`DELETE FROM Profile
//           WHERE id = "${id}"`);
//   res.redirect('/profile')
// })
// //PROFILE EDIT
// app.get('/profile/edit/:id',function(req,res){
//   let isEdit = true;
//   let id = req.params.id
//   db.all(`SELECT * FROM Profile WHERE id = ${id}`,function(err,rows1){
//     if(err){
//       console.log(err)
//     }else{
//       db.all(`SELECT id,name FROM Contacts`,function(err,rows2){
//         if(err){
//           console.log(err)
//         }else{
//           res.render('profile',{profiles:rows1, contacts:rows2, isEdit:true})
//         }
//       })
//     }
//   })
// })
// app.post('/profile/edit/:id', urlencodedParser, function(req,res){
//   let id = req.params.id
//   let username = req.body.username
//   let password = req.body.password
//   let contacts_id = req.body.contact
//   db.all(`UPDATE Profile
//           SET username = "${username}",
//               password = "${password}",
//               contacts_id = "${contacts_id}"
//               WHERE id = "${id}"`);
//   res.redirect('/profile')
// })
// //ADDRESSES
// app.get('/addresses',function(req,res){
//     console.log(req.params.error)
//   db.all(`SELECT * FROM Addresses`,function(err,rows1){
//     if(err){
//       console.log(err)
//     }else{
//       db.all(`SELECT * FROM Contacts`,function(err,rows2){
//         if(err){
//           console.log(err)
//         }else{
//           res.render('addresses',{addresses:rows1, contacts:rows2, isEdit:false})
//         }
//       })
//     }
//   })
// })
// //ADDRESSES ADD
// app.post('/addresses', urlencodedParser, function(req,res){
//   let street = req.body.street
//   let city = req.body.city
//   let zipcode = req.body.zipcode
//   let contacts_id = req.body.address
//   db.all(`SELECT id FROM Addresses where contacts_id = '${contacts_id}'`,function(err,rows2){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(rows2)
//       if (rows2.length > 0){
//         res.redirect(201,'/addresses')
//       } else {
//         db.all(`INSERT INTO Addresses (street, city, zipcode, contacts_id)
//                 VALUES("${street}", "${city}", "${zipcode}", "${contacts_id}")`)
//         res.redirect('/addresses')
//       }
//     }
//   })
// })
// //ADDRESSES EDIT
// app.get('/addresses/edit/:id',function(req,res){
//   let isEdit = true;
//   db.all(`SELECT * FROM Addresses where id = "${req.params.id}"`,function(err,rows){
//     if(err){
//       console.log(err)
//     }else{
//       db.all(`SELECT * FROM Contacts`,function(err,rows2){
//         if(err){
//           console.log(err)
//         }else{
//           res.render('addresses',{addresses:rows, contacts:rows2, isEdit:true})
//         }
//       })
//     }
//   })
// })
// app.post('/addresses/edit/:id', urlencodedParser, function(req,res){
//   let id = req.params.id
//   let street = req.body.street
//   let city = req.body.city
//   let zipcode = req.body.zipcode
//   let contacts_id = req.body.address
//   db.all(`UPDATE Addresses
//           SET street = "${street}",
//               city = "${city}",
//               zipcode = "${zipcode}",
//               contacts_id = "${contacts_id}"
//               WHERE id = "${id}"`);
//   res.redirect('/addresses')
// })
// //ADDRESSES DELETE
// app.get('/addresses/delete/:id', function(req,res){
//   let id = req.params.id
//   db.all(`DELETE FROM Addresses
//           WHERE id = "${id}"`);
//   res.redirect('/addresses')
// })
 app.listen(3000,function(){
 })
