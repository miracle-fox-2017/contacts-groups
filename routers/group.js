const express=require("express");
const router=express.Router();

// Import model
const Group=require("../model/group");

router.get("/",(req,res)=>{ // Halaman awal group
    Group.findAll((err,allRows)=>{
        if(err){
            res.send(err);
        }else{
            res.render("groups",{data:allRows});
        }
    });
});
router.post("/",(req,res)=>{ // Tambah group
    Group.create(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/groups");
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit group
    Group.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/groups");
        }else{
            res.render("edit-group",{data:row});
        }
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit group
    Group.update(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/groups");
        }
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus group
    Group.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/groups");
        }else{
            Group.remove(req.params.id,(err,object)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/groups");
                }
            });
        }
    });
});

module.exports=router;
