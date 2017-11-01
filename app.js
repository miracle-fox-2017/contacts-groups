
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const contact = require('./router/contacts')
const profile = require('./router/profile')
const groups = require('./router/groups')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './views')
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

app.use( '/', contact);
app.use( '/', profile);
app.use( '/', groups);

 app.listen(3000,function(){
     console.log('Hallo Bro..!!')
 })
