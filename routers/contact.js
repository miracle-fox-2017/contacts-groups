const express=require("express");
const router=express.Router();

// Import Model
const Contact=require("../model/contact");

router.get("/",(req,res)=>{ // Halaman awal kontak
    Contact.findAll().then((allRows)=>{
        res.render("contact",{data:allRows});
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/",(req,res)=>{ // Tambah kontak
    Contact.create(req.body).then((object)=>{
        res.redirect("/contacts");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman Edit Kontak
    Contact.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/contacts");
        }else{
            res.render("edit-contact",{data:row});
        }
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit Kontak
    Contact.update(req.body).then((object)=>{
        res.redirect("/contacts");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus Kontak
    Contact.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/contacts");
        }else{
            Contact.remove(req.params.id).then((object)=>{
                res.redirect("/contacts");
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
