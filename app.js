//require
const express    = require('express')
const sqlite3    = require('sqlite3').verbose();
const bodyParser = require('body-parser')


const db = new sqlite3.Database('./database.db');
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const Contacts   = require('./routes/contacts')
const Groups     = require('./routes/groups')
const Profile    = require('./routes/profile')
const Addresses  = require('./routes/addresses')



app.use('/contacts', Contacts)
app.use('/groups', Groups)
app.use('/profiles', Profile)
app.use('/addresses', Addresses)

app.get('/', (req, res)=>{
	res.render('index.ejs')
})
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)