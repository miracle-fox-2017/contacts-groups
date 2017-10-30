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
    // Update Release 3
    // Buat table sementara dengan tambahan kolom contact_id
    // Migrasi seluruh data dari table profile ke table baru
    // Hapus tabel lama profile
    // Ubah nama tabel baru menjadi profile
    db.run( // Profile Table
        `CREATE TABLE IF NOT EXISTS profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR
        );`
    );
    db.run(
        `CREATE TABLE new_profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR,
            contact_id INT UNIQUE
        );`
    );
    db.run(`INSERT INTO new_profile (id,username,password) SELECT id,username,password FROM profile`);
    db.run(`DROP TABLE profile`);
    db.run(`ALTER TABLE new_profile RENAME TO profile`);

    db.run( // Address Table
        `CREATE TABLE IF NOT EXISTS address(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            street VARCHAR,
            city TEXT,
            zipcode INT
        );`
    );
});
db.close();
