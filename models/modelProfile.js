const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

class Profile {

    static getData(callback) {
        let query = 'select p.id, p.username, p.password, c.name from  profiles p left join contacts c on p.idContact = c.id'
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }
    static addData(callback, newData) {

        let query = `insert into profiles (username, password, idContact) values ('${newData.username}', '${newData.password}', '${newData.idContact}')`
        db.run(query, function (err) {
            if (err) {
                callback(err)
            } else {
                callback()
            }
        })
    }

    static getDataById(callback, id) {
        let query = `select * from profiles  where id = ${id}`
        db.each(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }

    static updateData(callback, id, newData) {
        // console.log(id, newData)
        let query = `update profiles set username = '${newData.username}', password = '${newData.password}', idContact = '${newData.idContact}' where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                callback(err)
            } else {
                callback()
            }
        })
    }

    static deleteData(id) {
        let query = `delete from profiles where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    // static removeByIdContact(idContact) {
    //     let query = `delete from profiles where idContact = ${idContact}`
    //     db.run(query, function (err) {
    //         if (err) {
    //             console.log(err)
    //         }
    //     })
    // }


}

module.exports = Profile