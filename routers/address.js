const express=require("express");
const router=express.Router();

// Import model
const Address=require("../model/address");

router.get("/",(req,res)=>{ // Halaman awal alamat
    Address.findAll((err,allRows)=>{
        if(err){
            res.send(err);
        }else{
            res.render("address",{data:allRows});
        }
    });
});
router.post("/",(req,res)=>{ // Tambah alamat
    Address.create(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/addresses");
        }
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit alamat
    Address.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/addresses");
        }else{
            res.render("edit-address",{data:row});
        }
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit alamat
    Address.update(req.body,(err,object)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect("/addresses");
        }
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus alamat
    Address.findById(req.params.id,(err,row)=>{
        if(err){
            res.send(err);
        }else if(row.length === 0){
            res.redirect("/addresses");
        }else{
            Address.remove(req.params.id,(err,object)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/addresses");
                }
            });
        }
    });
});

module.exports=router;
