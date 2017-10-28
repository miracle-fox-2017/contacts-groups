const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

const index = require('./routes/index');
const contacts = require('./routes/contacts');
const groups = require('./routes/groups');
const profiles = require('./routes/profiles');
const addresses = require('./routes/addresses');

app.use('/', index)
app.use('/contacts', contacts)
app.use('/groups', groups)
app.use('/profiles', profiles)
app.use('/addresses', addresses)

app.listen(3000, function () {
  console.log('listening on port 3000!')
})
