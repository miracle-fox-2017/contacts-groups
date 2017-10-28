// CONTROLLER + ROUTER
// ================================================================================
const express = require('express');
const bodyParser = require('body-parser');
const contacts = require('./models/contactsModel')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs');


// Contacts Router
// ==================================================================================

app.get('/contacts', (req, res) =>
  {
    contacts.select( (contactsData) =>
      {
        // console.log(contactsData);
        res.render('contacts', {contactsData})
      }
    );
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
    contacts.select( (groupsData) =>
      {
        // console.log(contactsData);
        res.render('groups', groupsData})
      }
    );
  }
);

app.get('/groups/edit/:id', (req, res) =>
  {
    contacts.select( (groupData) =>
      {
        res.render('groupEdit', {groupData})
      },`*`,req.params.id);
  }
);

app.post('/groups/edit/:id', (req, res) =>
  {
    contacts.update(req.body);
    res.redirect('/groups');
  }
)

app.get('/groups/delete/:id', (req, res) =>
  {
    contacts.deleteQuery(req.params.id);
    res.redirect('/groups');
  }
)


// PROFILE ROUTER
// ==================================================================

app.get('/contacts', (req, res) =>
  {
    contacts.select( (contactsData) =>
      {
        // console.log(contactsData);
        res.render('contacts', {contactsData})
      }
    );
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


// ADDRESSES ROUTER
// =====================================================================

app.get('/contacts', (req, res) =>
  {
    contacts.select( (contactsData) =>
      {
        // console.log(contactsData);
        res.render('contacts', {contactsData})
      }
    );
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

app.listen(3000, () =>
  {
    console.log("IT WORKS!");
  }
);



// ================================================================================