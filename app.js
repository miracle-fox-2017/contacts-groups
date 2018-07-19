const parser=require("body-parser");
const express=require("express");

// Instance
const app=express();

// Body Parser
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

// EJS
app.set("views","./public") // Public directory
app.set("view engine","ejs"); // Template engine
app.use(express.static("./public")); // Static file

//===========================================> Index Page
const index=require("./routers/index");
app.use("/",index);

//===========================================> Contact
const contact=require("./routers/contact");
app.use("/contacts",contact);

//===========================================> Group
const group=require("./routers/group");
app.use("/groups",group);

//===========================================> Profile
const profile=require("./routers/profile");
app.use("/profiles",profile);

//===========================================> Address
const address=require("./routers/address");
app.use("/addresses",address);

// Listen Port
app.listen(3000,()=>{
    console.log("Server started!");
    console.log("Listening on port 3000");
});
