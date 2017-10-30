const express=require("express");
const router=express.Router();

// Import model
const Profile=require("../model/profile");

router.get("/",(req,res)=>{ // Halaman awal profile
    Profile.findAll((err,allRows)=>{
        if(err){
            res.send(err);
        }else{
            res.render("profile",{data:allRows});
        }
    });
});
router.post("/",(req,res)=>{ // Tambah profile
    Profile.create(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/profiles");
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit profile
    Profile.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/profiles");
        }else{
            res.render("edit-profile",{data:row});
        }
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit profile
    Profile.update(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/profiles");
        }
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus profile
    Profile.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/profiles");
        }else{
            Profile.remove(req.params.id,(err,object)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/profiles");
                }
            });
        }
    });
});

module.exports=router;
