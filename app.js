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
    // msg = 'Name cannot empty';
    Group.showGroups(function(groups){
      Contact.showContacts(function(contacts){
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": 'Name cannot empty'});      
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

})

app.post('/groups/assign_contacts/:id_group', function (req, res){
  ContactGroup.insertContactGroup(req.body.id_contacts, req.body.id_groups, function(){
    res.redirect('/groups');
  })
  
})

/////////////////////// 2. GROUPS /////////////////////////////

//GET GROUPS
app.get('/groups', function (req, res) {
  ContactGroup.contactGroupJoin(function(cg){
    Group.showGroups(function(groups){
      res.render('groups',{"rows": groups, "cg": cg});
    })
  })
  
})

//POST GROUPS
app.post('/groups', function (req, res) {
  Group.insertGroups(req.body, function(){
    Group.showGroups(function(){
      // res.render('groups',{"rows": groups, "cg": cg});
      res.redirect('/groups');
    })
  })

})

//GET GROUPS EDIT
app.get('/groups/edit/:id', function (req, res) {
  Group.showSpecificId(req.params.id, function(group){
    res.render('groups_edit',{rows: group});
    
  })
  
})

//POST GROUPS EDIT
app.post('/groups/edit/:id', function (req, res){
  Group.updateGroups(req.body, function(){
    Group.showSpecificId(req.params.id, function(group){
      res.render('groups_edit',{rows: group});
      
    })
  })
  
})

//GET DELETE ID
app.get('/groups/delete/:id', function (req, res){
  Group.deleteGroups(req.params.id, function(){
    res.redirect('/groups');
  })
  
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
  
})

//POST ADDRESSES
app.post('/addresses', function (req, res) {
  Address.insertAddress(req.body, function(){
    res.redirect('/addresses');
  })

})

//GET ADDRESSES EDIT
app.get('/addresses/edit/:id', function (req, res) {
  Contact.showContacts(function(contact){
    Address.addressJoinId(req.params.id, function(addressjoin){
      res.render('addresses_edit',{"rows": addressjoin, "contacts": contact});
    })
  })

})

//POST ADDRESSES EDIT
app.post('/addresses/edit/:id', function (req, res){
  Address.updateAddress(req.body, function(){
    res.redirect('/addresses');
  })
  
})

//GET DELETE ID
app.get('/addresses/delete/:id', function (req, res){
  Address.deleteAddress(req.params.id, function(){
    res.redirect('/addresses');
  })
})

app.get('/addresses_with_contact', function (req, res){
  Contact.showContacts(function(contacts){
    Address.showAddress(function(address){
      res.render('addresses_with_contact',{"rows": address, "contacts": contacts});
    })
  })
  
})


//////////////////// 4. PROFILES ///////////////////////////

//GET PROFILES
app.get('/profiles', function (req, res) {
  Contact.showContacts(function(contacts){
    Profile.showProfilesJoin(function(profile){
      res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
    })
  })
  
})

//POST PROFILES
app.post('/profiles', function (req, res) {
  Profile.checkId(req.body.id_contacts, function(avail){
    // console.log(avail);
    if(avail == 0){
      Profile.insertProfile(req.body, function(last){
        Contact.showContacts(function(contacts){
          Profile.showProfilesJoin(function(profile){
            res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
          })
        })
        
      })
    } else {
      Contact.showContacts(function(contacts){
        Profile.showProfilesJoin(function(profile){
          res.render('profiles',{"rows": profile, "contacts": contacts, "msg": "Your contact already have profile"});
        })
      })
    }
  })
  
})

//GET PROFILES EDIT
app.get('/profiles/edit/:id', function (req, res) {
  Contact.showContacts(function(contacts){
    Profile.showSpecificId(req.params.id, function(profile){
      res.render('profiles_edit',{"rows": profile, "contacts": contacts});
    })
  })
  
})

//POST PROFILES EDIT
app.post('/profiles/edit/:id', function (req, res){
  Profile.updateProfile(req.body, function(){
    Contact.showContacts(function(contacts){
      Profile.showSpecificId(req.params.id, function(profile){
        // res.render('profiles_edit',{"rows": profile, "contacts": contacts});
        res.redirect('/profiles');
      })
    })
  })
  
})

//DELETE PROFILES ID
app.get('/profiles/delete/:id', function (req, res){
  Profile.deleteProfile(req.params.id, function(){
    res.redirect('/profiles');
  })
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})