const express=require('express');
const bodyParser =require('body-parser')
const app = express();


//require FILE router
const contact = require('./routers/contact')
const group =require('./routers/group')
const address=require('./routers/address')
const profile=require('./routers/profile')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')


app.get('/',function(req,res){
  res.send('this is HOME')
})
//CONTACTS=======================================================//

app.use(contact)


//GROUPS======================================================

app.use(group)

//Addresses===================================================
app.use(address)

//PROFILES======================================================
app.use(profile)








app.listen(3000)
