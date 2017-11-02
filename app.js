const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express()
const db = new sqlite3.Database('./db/data.db')
//router
const addwithcon = require('./router/addwithcon')
const contacts = require('./router/contacts')
const addresses = require('./router/addresses')
const profile = require('./router/profile')
const groups = require('./router/groups')
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.set('views','./views');
app.set('view engine','ejs')

app.get('/',function(req,res) {
  res.send('masih rilis 0 menuju rilis 1')
})
app.use('/',contacts)
app.use('/',profile)
app.use('/',groups)
app.use('/',addresses)
app.use('/',addwithcon)
app.listen(3000,function() {
  console.log('masuk port 3000');
})
