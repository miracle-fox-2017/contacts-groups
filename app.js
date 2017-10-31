// CONTROLLER + ROUTER
// ================================================================================
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const AddressesRouter = require('./routers/addressesRouter');
const ContactsRouter = require('./routers/contactsRouter');
const GroupsRouter = require('./routers/groupsRouter');
const ProfilesRouter = require('./routers/profilesRouter');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs');

app.use(`/addresses`, AddressesRouter);
app.use(`/contacts`, ContactsRouter);
app.use(`/groups`, GroupsRouter);
app.use(`/profiles`, ProfilesRouter);


// HOME
// ================================================================================

app.get(`/`, (req, res) =>
  {
    res.render(`home`);
  }
);

app.listen(3000, () =>
  {
    console.log("IT WORKS!");
  }
);

// ================================================================================