const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')


class Contact {

    static findAll() {
        let query = "select * from contacts"
        return new Promise((resolve, reject) => {
            db.all(query, function (err, rowscontact) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rowscontact)
                }
            })
        })
    }
    static create(newData) {
        return new Promise((resolve, reject) => {
            let query = `insert into contacts(name, company, telp_number, email) values('${newData.name}', '${newData.company}', '${newData.telp_number}', '${newData.email}')`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })

    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            let query = `select * from contacts where id = ${id}`
            db.each(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static updateData(id, newData) {
        return new Promise((resolve, reject) => {
            let query = `update contacts set name = '${newData.name}', company = '${newData.company}', telp_number = '${newData.telp_number}', email = '${newData.email}' where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static removeData(id) {
        return new Promise((resolve, reject) => {
            let query = `delete from contacts where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

}

module.exports = Contact