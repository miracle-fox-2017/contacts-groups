const parser=require("body-parser");
const express=require("express");
const sqlite3=require("sqlite3");

// Instance
const app=express();
const db=new sqlite3.Database("./database/database.db");

// Body Parser
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

// EJS
app.set("views","./public") // Public directory
app.set("view engine","ejs"); // Template engine
app.use(express.static("./public")); // Static file

//======================> Ladies & Gentlemen, let's get started!
// Index Page / Main Page
app.get("/",(req,res)=>{
    res.render("index");
});

// Contact
app.get("/contacts",(req,res)=>{ // Halaman awal kontak
    db.all(`SELECT * FROM contacts`,(err,data)=>{
        if(err){
            throw err;
        }else{
            res.render("contact",{data:data});
        }
    });
});
app.post("/contacts",(req,res)=>{ // Tambah kontak
    const data=req.body;
    db.run(
        `INSERT INTO contacts
        (name, company, phone, email)
        VALUES ("${data.name}", "${data.company}", "${data.phone}", "${data.email}")`
    );
    db.redirect("/contacts");
});
app.get("/contacts/edit/:id",(req,res)=>{ // Halaman Edit Kontak
    db.all(`SELECT * FROM contacts WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/contacts");
        }else{
            res.render("edit-contact",{data:data});
        }
    });
});
app.post("/contacts/edit/:id",(req,res)=>{ // Edit Kontak
    const data=req.body;
    db.run(
        `UPDATE contacts SET
        name="${data.name}",
        company="${data.company}",
        phone="${data.phone}",
        email="${data.email}"
        WHERE id="${data.id}"`
    );
    res.redirect("/contacts");
});
app.get("/contacts/delete/:id",(req,res)=>{ // Hapus Kontak
    db.all(`SELECT * FROM contacts WHERE id="${req.params.id}"`,(err,data)=>{
        if(data.length === 0){
            res.redirect("/contacts");
        }else{
            db.run(
                `DELETE FROM contacts
                WHERE id="${req.params.id}"`
            );
            res.redirect("/contacts");
        }
    });
});

// Group
app.get("/groups",(req,res)=>{ // Halaman awal group
    db.all(`SELECT * FROM groups`,(err,data)=>{
        if(err){
            throw err;
        }else{
            res.render("groups",{data:data});
        }
    });
});
app.post("/groups",(req,res)=>{ // Tambah group
    const data=req.body;
    db.run(
        `INSERT INTO groups (name_of_group)
        VALUES ("${data.group}")`
    );
    res.redirect("/groups");
});
app.get("/groups/edit/:id",(req,res)=>{ // Halaman edit group
    db.all(`SELECT * FROM groups WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/groups");
        }else{
            res.render("edit-group",{data:data});
        }
    });
});
app.post("/groups/edit/:id",(req,res)=>{ // Edit group
    const data=req.body;
    db.run(
        `UPDATE groups SET
        name_of_group="${data.group}"
        WHERE id="${data.id}"`
    );
    res.redirect("/groups");
});
app.get("/groups/delete/:id",(req,res)=>{ // Hapus group
    db.all(`SELECT * FROM groups WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/groups");
        }else{
            db.run(
                `DELETE FROM groups
                WHERE id="${req.params.id}"`
            );
            res.redirect("/groups");
        }
    });
});

// Profile
app.get("/profiles",(req,res)=>{ // Halaman awal profile
    db.all(`SELECT * FROM profile`,(err,data)=>{
        if(err){
            throw err;
        }else{
            res.render("profile",{data:data});
        }
    });
});
app.post("/profiles",(req,res)=>{ // Tambah profile
    const data=req.body;
    db.run(
        `INSERT INTO profile (username,password)
        VALUES ("${data.username}","${data.password}")`
    );
    res.redirect("/profiles");
});
app.get("/profiles/edit/:id",(req,res)=>{ // Halaman edit group
    db.all(`SELECT * FROM profile WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/profiles");
        }else{
            res.render("edit-profile",{data:data});
        }
    });
});
app.post("/profiles/edit/:id",(req,res)=>{ // Edit group
    const data=req.body;
    db.run(
        `UPDATE profile SET
        username="${data.username}",
        password="${data.password}"
        WHERE id="${data.id}"`
    );
    res.redirect("/profiles");
});
app.get("/profiles/delete/:id",(req,res)=>{ // Hapus group
    db.all(`SELECT * FROM profile WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/profiles");
        }else{
            db.run(
                `DELETE FROM profile
                WHERE id="${req.params.id}"`
            );
            res.redirect("/profiles");
        }
    });
});

// Address
app.get("/addresses",(req,res)=>{ // Halaman awal alamat
    db.all(`SELECT * FROM address`,(err,data)=>{
        if(err){
            throw err;
        }else{
            res.render("address",{data:data});
        }
    });
});
app.post("/addresses",(req,res)=>{ // Tambah alamat
    const data=req.body;
    db.run(
        `INSERT INTO address (street,city,zipcode)
        VALUES ("${data.street}","${data.city}","${data.zipcode}")`
    );
    res.redirect("/addresses");
});
app.get("/addresses/edit/:id",(req,res)=>{ // Halaman edit alamat
    db.all(`SELECT * FROM address WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/addresses");
        }else{
            res.render("edit-address",{data:data});
        }
    });
});
app.post("/addresses/edit/:id",(req,res)=>{ // Edit alamat
    const data=req.body;
    db.run(
        `UPDATE address SET
        street="${data.street}",
        city="${data.city}",
        zipcode="${data.zipcode}"
        WHERE id="${data.id}"`
    );
    res.redirect("/addresses");
});
app.get("/addresses/delete/:id",(req,res)=>{ // Hapus group
    db.all(`SELECT * FROM address WHERE id="${req.params.id}"`,(err,data)=>{
        if(err){
            throw err;
        }else if(data.length === 0){
            res.redirect("/addresses");
        }else{
            db.run(
                `DELETE FROM address
                WHERE id="${req.params.id}"`
            );
            res.redirect("/addresses");
        }
    });
});

// Listen Port
app.listen(3000,()=>{
    console.log("Server started!");
    console.log("Listening on port 3000");
});
