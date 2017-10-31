const express=require("express");
const router=express.Router();

// Import model
const Group=require("../model/group");

router.get("/",(req,res)=>{ // Halaman awal group
    Group.findAll().then((allRows)=>{
        res.render("groups",{data:allRows});
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/",(req,res)=>{ // Tambah group
    Group.create(req.body).then((object)=>{
        res.redirect("/groups");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit group
    Group.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/groups");
        }else{
            res.render("edit-group",{data:row});
        }
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit group
    Group.update(req.body).then((object)=>{
        res.redirect("/groups");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus group
    Group.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/groups");
        }else{
            Group.remove(req.params.id).then((object)=>{
                res.redirect("/groups");
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
