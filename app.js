const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()

//set to load css
app.use(express.static(__dirname + '/views'))
// set the view engine to ejs
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//require routes
let index     = require('./routers/index')
let contacts  = require('./routers/contacts')
let groups    = require('./routers/groups')
let addresses = require('./routers/addresses')
let profile   = require('./routers/profile')
let addresses_with_contact = require('./routers/addressesWithContacts')

app.use('/', index)
app.use('/contacts', contacts)
app.use('/groups', groups)
app.use('/addresses', addresses)
app.use('/profile', profile)
app.use('/addresses_with_contact', addresses_with_contact)

app.listen(3000,(err)=>{
  if(!err){console.log(`running your serv in port:3000`);}
})
