const express=require('express')
const app=express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');

//router
const index=require('./routes/index')
const group=require('./routes/group')
const contact=require('./routes/contact')
const address=require('./routes/address')
const profile=require('./routes/profile')


//----
app.use('/',index)
app.use('/group',group)
app.use('/contact',contact)
app.use('/address',address)
app.use('/profile',profile)

app.listen(3018,()=>{
  console.log('Port 3018');
})
