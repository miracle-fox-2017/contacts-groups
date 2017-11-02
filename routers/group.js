const express = require ('express')
const bodyParser = require('body-parser')
const GroupDB = require('../models/group')

let group = new GroupDB('database.db')
const app = express()





const router = express.Router()

//groupPage
//get database
router.get('/',(req,res) =>{
    group.getDatabase((rows)=>{
        res.render('groups', {rows : rows})
        // res.send('hello')
   })
})
// add data
router.post('/',(req,res) =>{
    group.addData(req);
    res.redirect('/groups')
})
//delete data
router.get('/delete/:id',(req,res) =>{
    group.removeData(req.params.id);
    res.redirect('/groups');
})

router.get('/edit/:id',(req,res) =>{
    group.getDataById((req.params.id),function(err,rowID){
        if(!err){
            
            res.render('groupedit',{data: rowID})
            // console.log(rowID)
        }
        else{
            // console.log(err);
            // console.log(rowID)
        }
    })
})

router.post('/edit/:id',(req,res)=>{

    group.editData(req)
        res.redirect('/groups')


}
)




module.exports = router