const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

db.serialize(()=>{
    db.run(
        `CREATE TABLE IF NOT EXISTS contacts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT NOT NULL,
            phone VARCHAR NOT NULL,
            email VARCHAR NOT NULL
        )`
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS groups(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_of_group VARCHAR NOT NULL
        )`
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR NOT NULL,
            password VARCHAR NOT NULL
        )`
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS address(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            street VARCHAR NOT NULL,
            city TEXT NOT NULL,
            zipcode INTEGER NOT NULL
        )`
    );
});
db.close();
