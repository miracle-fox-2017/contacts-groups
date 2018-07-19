const express=require("express");
const router=express.Router();

// Import model
const Profile=require("../model/profile");
const Contact=require("../model/contact");

router.get("/",(req,res)=>{ // Halaman awal profile
    Profile.leftJoinContact().then((rowsJoin)=>{
        Contact.findAll().then((rowsContact)=>{
            res.render("profile",{profile:rowsJoin,contact:rowsContact});
        });
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/",(req,res)=>{ // Tambah profile
    Profile.checkUniqueContact(req.body.contact).then((row)=>{
        if(row.length > 0){
            res.send("Your contact already have profile! <a href='/profiles'>Back</a>");
            console.log("Your contact already have profile!");
        }else{
            Profile.create(req.body).then((object)=>{
                res.redirect("/profiles");
            }).catch((err)=>{
                res.send(err);
            });
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit profile
    Profile.findById(req.params.id).then((rowProfile)=>{
        if(rowProfile.length === 0){
            res.redirect("/profiles");
        }else{
            Contact.findAll().then((rowsContact)=>{
                res.render("edit-profile",{profile:rowProfile,contact:rowsContact});
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit profile
    Profile.update(req.body).then((object)=>{
        res.redirect("/profiles");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus profile
    Profile.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/profiles");
        }else{
            Profile.remove(req.params.id).then((object)=>{
                res.redirect("/profiles");
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
