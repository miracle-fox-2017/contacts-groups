let express = require('express');
let app = express()
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');
let body = require('body-parser');

//Routers
let index = require('./routers/index');
let contacts = require('./routers/contacts')
let groups = require('./routers/groups')
let profile = require('./routers/profile')
let addresses = require('./routers/addresses')

//Views Engine Setup
app.set('view engine','ejs')
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

//Index
app.use('/',index);
//Contacts
app.use('/contacts',contacts);
//Groups
app.use('/groups',groups);
//profile
app.use('/profile',profile);
//Addresses
app.use('/addresses',addresses);

//Listening on which server
app.listen(3000,function(){
    console.log('Example app listening on port 3000!')
})
