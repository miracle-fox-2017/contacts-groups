const express = require('express')
const bodyParser = require ('body-parser')

const route = express.Router()


route.get('/',(req,res)=>{
  res.render('index')
})


module.exports = route;
