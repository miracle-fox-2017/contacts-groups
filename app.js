const express    = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

/////////////////////////////////////////////////////////////////
//                       START ROUTE                           //
/////////////////////////////////////////////////////////////////

/////////////////////// 1. CONTACTS /////////////////////////////

let contacts = require('./routers/contacts');
app.use('/contacts', contacts)

/////////////////////// 2. GROUPS ///////////////////////////////

let groups = require('./routers/groups');
app.use('/groups', groups)

//////////////////// 3. ADDRESSES ///////////////////////////////

let addresses = require('./routers/addresses');
app.use('/addresses', addresses)

//////////////////// 4. PROFILES ////////////////////////////////

let profiles = require('./routers/profiles');
app.use('/profiles', profiles)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})