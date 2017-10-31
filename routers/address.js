const express=require("express");
const router=express.Router();

// Import model
const Address=require("../model/address");
const Contact=require("../model/contact");

router.get("/",(req,res)=>{ // Halaman awal alamat
    Address.leftJoinContact().then((rowsJoin)=>{
        Contact.findAll().then((rowsContact)=>{
            res.render("address",{address:rowsJoin,contact:rowsContact});
        });
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/",(req,res)=>{ // Tambah alamat
    Address.create(req.body).then((object)=>{
        res.redirect("/addresses");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/edit/:id",(req,res)=>{ // Halaman edit alamat
    Address.findById(req.params.id).then((rowAddress)=>{
        if(rowAddress.length === 0){
            res.redirect("/addresses");
        }else{
            Contact.findAll().then((rowsContact)=>{
                res.render("edit-address",{address:rowAddress,contact:rowsContact});
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});
router.post("/edit/:id",(req,res)=>{ // Edit alamat
    Address.update(req.body).then((object)=>{
        res.redirect("/addresses");
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/delete/:id",(req,res)=>{ // Hapus alamat
    Address.findById(req.params.id).then((row)=>{
        if(row.length === 0){
            res.redirect("/addresses");
        }else{
            Address.remove(req.params.id).then((object)=>{
                res.redirect("/addresses");
            });
        }
    }).catch((err)=>{
        res.send(err);
    });
});
router.get("/with-contact",(req,res)=>{ // Address with Owner Name - NO JOIN
    Address.findAll().then((addressRows)=>{
        addressRows.forEach((value,i)=>{
            Contact.findById(value.contact_id).then((row)=>{
                value["contact"]=row[0].name;
                if(i === addressRows.length - 1){
                    res.render("address-with-contact",{data:addressRows});
                }
            });
        });
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
