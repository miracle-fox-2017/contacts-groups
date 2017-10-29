const express    = require('express')
const bodyParser = require('body-parser')
const sqlite3    = require('sqlite3').verbose()

const db         = new sqlite3.Database('data/database.db')
const app        = express()

//set to load css
app.use(express.static(__dirname + '/views'))
// set the view engine to ejs
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// *** ROUTES

//* START INDEX *//
app.get('/',(req,res)=>{
  db.all(`select * from Contacts`,(err,data_Contacts)=>{
    db.all(`select * from Groups`,(err,data_Groups)=>{
      db.all(`select * from Profile`,(err,data_Profile)=>{
        db.all(`select * from Addresses`,(err,data_Addresses)=>{
          res.render('index',{data_Contacts:data_Contacts,data_Groups:data_Groups,data_Profile:data_Profile,data_Addresses:data_Addresses})
        })
      })
    })
  })
})

//* START CONTACTS *//
//CREATE
app.post('/contacts',(req,res)=>{
  db.run(`insert into Contacts(name,company,telp_number,email) VALUES (
    '${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}'
  )`)
  res.redirect('contacts')
  console.log(req.body)
})

//READ
// app.get('/contacts',(req,res)=>{
//   db.all('select * from Groups',(err,data_Groups)=>{
//     if(!err){
//       // let joinToCunjunction = `select Contacts.id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email, ConjContactGroup.id_contacts, ConjContactGroup.id_groups from ConjContactGroup left join Contacts on ConjContactGroup.id_contacts = Contacts.id left join Groups on ConjContactGroup.id_groups = Groups.id`
//       let joinToCunjunction = `select Contacts.id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email, ConjContactGroup.id_contacts, ConjContactGroup.id_groups from Contacts left join ConjContactGroup on ConjContactGroup.id_contacts = Contacts.id left join Groups on ConjContactGroup.id_groups = Groups.id`
//       db.all(joinToCunjunction, (err,data_join)=>{
//         if(!err){
//           // res.send(data_join)
//           db.all(`select * from ConjContactGroup`,(err,data_conjunction)=>{
//             if(!err){
//               res.render('contacts',{data_Groups:data_Groups, data_join:data_join, data_conjunction:data_conjunction})
//             }else{
//               res.send(err)
//               console.log(err,'load db conjunction');
//             }
//           })
//         }else{
//           res.send(err)
//           console.log(err,'load joinToCunjunction');
//         }
//       })
//     }else{
//       res.send(err)
//       console.log(err,'error load db Groups');
//     }
//   })
// })
app.get('/contacts',(req,res)=>{
  db.all(`select * from Contacts`,(err,data_Contacts)=>{
    res.render('contacts',{data_Contacts:data_Contacts})
  })
})
//UPDATE
app.get('/contacts/edit/:id',(req,res)=>{
  db.all(`select * from Contacts where id=${req.params.id}`,(err,data)=>{
    if(!err){
      res.render('contacts-edit',{data_Contacts:data[0]})
      // console.log(data);
    }
  })
})

app.post('/contacts/edit/:id',(req,res)=>{
  db.all(`update Contacts set name = "${req.body.name}", company = "${req.body.company}", telp_number = "${req.body.telp_number}", email = "${req.body.email}" where id = "${req.params.id}"`,(err)=>{
    res.redirect('../../contacts')
  })
})
//DELETE
app.get('/contacts/delete/:id',(req,res)=>{
  db.all(`delete from Contacts where id=${req.params.id}`,(err)=>{
    res.redirect('../../contacts')
  })
})

//* END CONTACTS *//
//* START GROUPS *//
//CREATE
app.post('/groups',(req,res)=>{
  db.run(`insert into Groups(name_of_group) values ('${req.body.name_of_group}')`,(err)=>{
    if(!err){
      res.redirect('groups')
    }
  })
})
//READ
app.get('/groups',(req,res)=>{
  db.all(`select * from Groups`,(err,data)=>{
    if(!err){
      res.render('groups',{data_Groups:data})
    }
  })
})
//UPDATE
app.get('/groups/edit/:id',(req,res)=>{
  db.all(`select * from Groups where id='${req.params.id}'`,(err,data)=>{
    res.render('groups-edit',{data_Groups:data[0]})
  })
})
app.post('/groups/edit/:id',(req,res)=>{
  db.run(`update Groups set name_of_group = '${req.body.name_of_group}' where id = '${req.params.id}'`,(err)=>{
    res.redirect('../../groups')
  })
})
//DELETE
app.get('/groups/delete/:id',(req,res)=>{
  db.run(`delete from Groups where id='${req.params.id}'`,(err)=>{
    res.redirect('../../groups')
  })
})
//* END GROUPS *//
//* START ADDRESSES *//
//CREATE
app.post('/addresses',(req,res)=>{
  db.run(`insert into Addresses(street,city,zipcode,contact_id) values ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.name}')`,(err)=>{
    res.redirect('addresses')
  })
})
//READ
let joinQuery = 'select Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name from Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.id'

app.get('/addresses',(req,res)=>{
  db.all(joinQuery,(err,data_join)=>{
    db.all(`select * from Contacts`,(err,data_Contacts)=>{
      res.render('addresses',{data_Addresses:data_join, data_Contacts:data_Contacts})
    })
  })
})
//UPDATE
app.get('/addresses/edit/:id',(req,res)=>{
  db.all(`select * from Addresses where id='${req.params.id}'`,(err,data)=>{
    db.all(`select * from Contacts`,(err,data_Contacts)=>{
      res.render('addresses-edit',{data_Addresses:data[0], data_Contacts:data_Contacts})
    })
  })
})
app.post('/addresses/edit/:id',(req,res)=>{
  db.run(`update Addresses set street='${req.body.street}',city='${req.body.city}',zipcode='${req.body.zipcode}',contact_id='${req.body.name}' where id='${req.params.id}'`,(err)=>{
    res.redirect('../../addresses')
  })
  // res.send(req.params.id)
})
//DELETE
app.get('/addresses/delete/:id',(req,res)=>{
  db.run(`delete from Addresses where id='${req.params.id}'`,(err)=>{
    res.redirect('../../addresses')
  })
})
//ADRESS WITH CONTACT
app.get('/addresses_with_contact',(req,res)=>{
  function getAddresses(cb){
    let queryAddresses = `select * from Addresses`
    db.all(queryAddresses,(err,data_Addresses)=>{
      if(err){
        cb(err)
      }else{
        cb(data_Addresses)
      }
    })
  }
  function getContacts(cb){
    let queryContacts = `select * from Contacts`
    db.all(queryContacts,(err,data_Contacts)=>{
      if(err){
        cb(err)
      }else{
        cb(data_Contacts)
      }
    })
  }
  getAddresses((data_Addresses)=>{
    getContacts((data_Contacts)=>{
      res.render('addresses_with_contact',{data_Addresses:data_Addresses, data_Contacts:data_Contacts})
    })
  })
})
//* END ADDRESSES *//
//* START PROFILE *//
//CREATE
app.post('/profile',(req,res)=>{
  db.run(`insert into Profile(username,password,contact_id) values ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
    if(!err){
      res.redirect('profile')
    }else{
      res.redirect('profile/?error=true')
    }
    console.log(err);
  })
})
//READ

app.get('/profile',(req,res)=>{
  let error = ''
	if(req.query.hasOwnProperty('error')){
		error = "Your contact already have profile"
	}
  let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.contact_id = Contacts.id'
  db.all(joinQuery,(err,data_join)=>{
    if(!err){
      db.all(`select * from Contacts`,(err,data)=>{
        if(err){
          console.log(err);
        }else{
          res.render('profile',{pesanError:error, data_Profile:data_join, data_Contacts:data})
        }
      })
    }
  })

})
//UPDATE
app.get('/profile/edit/:id',(req,res)=>{
  db.all(`select * from Profile where id='${req.params.id}'`,(err,data_Profile)=>{
    db.all(`select * from Contacts`,(err,data_Contacts)=>{
      if(!err){
        res.render('profile-edit',{data_Profile:data_Profile[0],data_Contacts:data_Contacts})
      }
    })
  })
})
app.post('/profile/edit/:id',(req,res)=>{
  db.run(`update Profile set username='${req.body.username}',password='${req.body.password}',contact_id='${req.body.name}' where id='${req.params.id}'`,(err)=>{
    res.redirect('../../profile')
  })
})
//DELETE
app.get('/profile/delete/:id',(req,res)=>{
  db.run(`delete from profile where id='${req.params.id}'`,(err)=>{
    res.redirect('../../profile')
  })
})


app.listen(3000,(err)=>{
  if(!err){console.log(`running your serv in port:3000`);}
})
