const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

class Group {
    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `select * from groups`
            db.all(query, function (err, rowsgroup) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rowsgroup)
                }
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            let query = `select * from groups where id = ${id}`
            db.each(query, function (err, rowsgroup) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rowsgroup)
                }
            })
        })
    }

    static updateData(id, newData) {
        return new Promise((resolve, reject) => {
            let query = `update groups set name_of_group = '${newData.name_of_group}' where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    static create(newData) {
        return new Promise((resolve, reject) => {
            let query = `insert into groups(name_of_group) values('${newData.name_of_group}')`
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
            let query = `delete from groups where id = ${id}`
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

module.exports = Group