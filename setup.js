var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30) NOT NULL,company varchar(225),telp_number int ,email varchar(100))");
    
    db.run("CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group varchar(225))");

    db.run("CREATE TABLE IF NOT EXISTS Profile(id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(18), password varchar(12))");

    db.run("CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT, street varchar(180), city varchar(120),zipcode int)");
    })

    db.close();