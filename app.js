const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const contact = require('./router/contacts');
const group = require('./router/groups');
const profile = require('./router/profiles');
const address = require('./router/addresses');
const addresses_with_contact = require('./router/addresses_with_contact');
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/',contact);
app.use('/',group);
app.use('/',profile);
app.use('/',address);
app.use('/',addresses_with_contact)

 app.listen(3000,function(){
     console.log('hallo bro..!!!')
 })
