const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/database.db");

db.serialize(()=>{
    db.run(
        "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, phone VARCHAR, email VARCHAR)"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR)"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR)"
    );
    db.run(
        "CREATE TABLE IF NOT EXISTS address(id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city TEXT, zipcode INTEGER)"
    );
});
db.close();
