const express = require('express')
const router = express.Router();

router.get('/', function(req, res){
  res.send('tessst di port 3000!')
})

module.exports = router
