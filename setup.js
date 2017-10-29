const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

db.serialize(()=>{
    db.run( // Contact Table
        `CREATE TABLE IF NOT EXISTS contacts(
            id INT PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            company TEXT,
            phone VARCHAR,
            email VARCHAR
        )`
    );
    db.run( // Group Table
        `CREATE TABLE IF NOT EXISTS groups(
            id INT PRIMARY KEY AUTOINCREMENT,
            name_of_group VARCHAR
        )`
    );
    db.run( // Profile Table
        `CREATE TABLE IF NOT EXISTS profile(
            id INT PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR
        );
        CREATE TABLE new_profile(
            id INT PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR,
            contact_id INT UNIQUE
        );
        INSERT INTO new_profile(id,username,password)
        SELECT * FROM profile;
        DROP TABLE profile;
        ALTER TABLE new_profile RENAME TO profile;`
    );
    db.run( // Address Table
        `CREATE TABLE IF NOT EXISTS address(
            id INT PRIMARY KEY AUTOINCREMENT,
            street VARCHAR,
            city TEXT,
            zipcode INT
        )`
    );
});
db.close();
