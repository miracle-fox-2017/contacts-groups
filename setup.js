const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

db.serialize(()=>{
    db.run( // Contact Table
        `CREATE TABLE IF NOT EXISTS contacts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            company TEXT,
            phone VARCHAR,
            email VARCHAR
        )`
    );

    db.run( // Group Table
        `CREATE TABLE IF NOT EXISTS groups(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_of_group VARCHAR
        )`
    );

    db.run( // Profile Table
        `CREATE TABLE IF NOT EXISTS profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR
        );`
    );
    // db.run(`ALTER TABLE profile ADD COLUMN contact_id INTEGER FOREIGNKEY contact_id REFERENCES contacts(id)`);

    db.run( // Address Table
        `CREATE TABLE IF NOT EXISTS address(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            street VARCHAR,
            city TEXT,
            zipcode INTEGER
        );`
    );
    // db.run(`ALTER TABLE address ADD COLUMN contact_id INTEGER FOREIGNKEY contact_id REFERENCES contacts(id)`);
});
db.close();
