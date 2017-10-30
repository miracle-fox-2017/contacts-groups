const express=require("express");
const router=express.Router();

// Import Model
const Contact=require("../model/contact");

router.get("/",(req,res)=>{ // Halaman awal kontak
    Contact.findAll((err,allRows)=>{
        if(err){
            res.send(err);
        }else{
            res.render("contact",{data:allRows});
        }
    });
});
router.post("/",(req,res)=>{ // Tambah kontak
    Contact.create(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/contacts");
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman Edit Kontak
    Contact.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/contacts");
        }else{
            res.render("edit-contact",{data:row});
        }
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit Kontak
    Contact.update(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/contacts");
        }
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus Kontak
    Contact.findById(req.params.id,(err,rows)=>{
        if(err){
            res.send(err);
        }else if(rows.length === 0){
            res.redirect("/contacts");
        }else{
            Contact.remove(req.params.id,(err,object)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/contacts");
                }
            });
        }
    });
});

module.exports=router;
