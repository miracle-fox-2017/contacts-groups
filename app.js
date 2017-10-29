// CONTROLLER + ROUTER
// ================================================================================
const express = require('express');
const bodyParser = require('body-parser');
const addresses = require('./models/addressModel');
const contacts = require('./models/contactsModel')
const groups = require('./models/groupsModel');
const profiles = require('./models/profileModel');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs');


// HOME
// ================================================================================

app.get(`/`, (req, res) =>
  {
    res.render(`home`);
  }
);

// Contacts Router
// ==================================================================================

app.get('/contacts', (req, res) =>
  {
    contacts.select( (contactsData) =>
      {
        res.render('contacts', {contactsData})
      }
    );
  }
);

app.post(`/contacts`, (req, res) =>
  {
    groups.add(req.body);
    res.redirect(`/contacts`);
  }
);

app.get('/contacts/edit/:id', (req, res) =>
  {
    contacts.select( (contactData) =>
      {
        res.render('contactEdit', {contactData})
      },`*`,req.params.id);
  }
);

app.post('/contacts/edit/:id', (req, res) =>
  {
    contacts.update(req.body);
    res.redirect('/contacts');
  }
)

app.get('/contacts/delete/:id', (req, res) =>
  {
    contacts.deleteQuery(req.params.id);
    res.redirect('/contacts');
  }
)


// GROUP ROUTER
// ==============================================================================

app.get('/groups', (req, res) =>
  {
    groups.select( (groupsData) =>
      {
        res.render('groups', {groupsData})
      }
    );
  }
);

app.post(`/groups`, (req, res) =>
  {
    groups.add(req.body);
    res.redirect(`/groups`);
  }
);

app.get('/groups/edit/:id', (req, res) =>
  {
    groups.select( (groupData) =>
      {
        res.render('groupEdit', {groupData})
      },`*`,req.params.id);
  }
);

app.post('/groups/edit/:id', (req, res) =>
  {
    groups.update(req.body);
    res.redirect('/groups');
  }
)

app.get('/groups/delete/:id', (req, res) =>
  {
    groups.deleteQuery(req.params.id);
    res.redirect('/groups');
  }
)


// PROFILE ROUTER
// ==================================================================

app.get('/profiles', (req, res) =>
  {
    profiles.leftJoin( (profilesData) =>
      {
        contacts.select( (contactsData) =>
          {
            res.render('profiles', {profilesData, contactsData});
          }
        )
      }
    );
  }
);

app.post(`/profiles`, (req, res) =>
  {
    profiles.add(req.body);
    res.redirect(`/profiles`);
  }
);

app.get('/profiles/edit/:id', (req, res) =>
  {
    profiles.select( (profileData) =>
      {
        res.render('profileEdit', {profileData})
      },`*`,req.params.id);
  }
);

app.post('/profiles/edit/:id', (req, res) =>
  {
    profiles.update(req.body);
    res.redirect('/profile');
  }
)

app.get('/profiles/delete/:id', (req, res) =>
  {
    profiles.deleteQuery(req.params.id);
    res.redirect('/profile');
  }
)


// ADDRESSES ROUTER
// =====================================================================

app.get('/addresses', (req, res) =>
  {
    addresses.select( (addressesData) =>
      {
        res.render('addresses', {addressesData})
      }
    );
  }
);

app.post(`/addresses`, (req, res) =>
  {
    addresses.add(req.body);
    res.redirect(`addresses`);
  }
);

app.get('/addresses/edit/:id', (req, res) =>
  {
    addresses.select( (addressData) =>
      {
        res.render('addressesEdit', {addressData})
      },`*`,req.params.id);
  }
);

app.post('/addresses/edit/:id', (req, res) =>
  {
    addresses.update(req.body);
    res.redirect('/addresses');
  }
)

app.get('/addresses/delete/:id', (req, res) =>
  {
    addresses.deleteQuery(req.params.id);
    res.redirect('/addresses');
  }
)

app.listen(3000, () =>
  {
    console.log("IT WORKS!");
  }
);



// ================================================================================