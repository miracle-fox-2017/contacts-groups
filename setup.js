const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)`)

  db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)`)

  db.run(`CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`)

  db.run(`CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT)`)
})

db.close()
