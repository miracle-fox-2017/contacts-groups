const express=require("express");
const router=express.Router();

// Import model
const Profile=require("../model/profile");
const Contact=require("../model/contact");

router.get("/",(req,res)=>{ // Halaman awal profile
    Profile.leftJoinContact((err,rowsProfile)=>{
        if(err){
            res.send(err);
        }else{
            Contact.findAll((err,rowsContact)=>{
                if(err){
                    res.send(err);
                }else{
                    res.render("profile",{profile:rowsProfile,contact:rowsContact});
                }
            });
        }
    });
});
router.post("/",(req,res)=>{ // Tambah profile
    Profile.checkUniqueContact(req.body.contact,(err,row)=>{
        if(row.length > 0){
            res.send("Your contact already have profile! <a href='/profiles'>Back</a>");
            console.log("Your contact already have profile!");
        }else{
            Profile.create(req.body,(err,object)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/profiles");
                }
            });
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit profile
    Profile.findById(req.params.id,(err,rowProfile)=>{
        if(err){
            res.send(err);
        }else if(rowProfile.length === 0){
            res.redirect("/profiles");
        }else{
            Contact.findAll((err,rowsContact)=>{
                if(err){
                    res.send(err);
                }else{
                    res.render("edit-profile",{profile:rowProfile,contact:rowsContact});
                }
            });
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
