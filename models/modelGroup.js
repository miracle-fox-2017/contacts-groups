const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

class Group {

    static getData(callback) {
        let query = 'select * from  groups'
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }
    static addData(newData) {
        //console.log(newData.name_of_group)
        let query = `insert into groups (name_of_group) values ('${newData.name_of_group}')`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    static getDataById(callback, id) {
        let query = `select * from groups where id = ${id}`
        db.each(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }

    static updateData(id, newData) {
        // console.log(id, newData)
        let query = `update groups set name_of_group = '${newData.name_of_group}' where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    static deleteData(id) {
        let query = `delete from groups where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }


}

module.exports = Group