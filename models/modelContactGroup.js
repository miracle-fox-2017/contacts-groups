const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Group = require('./modelGroup')
const Contact = require('./modelContact')

class ContactGroup {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `select * from contactgroups`
            db.all(query, function (err, rowsContactGroup) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rowsContactGroup)
                }
            })
        })
    }

    static findContactGroup() {

        return new Promise((resolve, reject) => {
            Promise.all([
                Contact.findAll(),
                ContactGroup.findAll(),
                Group.findAll()
            ]).then((dataContactGroup) => {
                dataContactGroup[0].forEach((contact) => {
                    contact.name_of_group = []
                    dataContactGroup[1].forEach((contactgroup) => {
                        if (contact.id == contactgroup.idContact) {
                            dataContactGroup[2].forEach((group) => {
                                if (contactgroup.idGroup == group.id) {
                                    contact.name_of_group.push(group.name_of_group)
                                }
                            })

                        }

                    })
                })
                resolve(dataContactGroup[0])
            }).catch((err) => {
                reject(err)
            })
        })

    }

    static findGroupContact() {
        return new Promise((resolve, reject) => {
            Promise.all([
                Contact.findAll(),
                ContactGroup.findAll(),
                Group.findAll()
            ]).then((contactgroup) => {
                contactgroup[2].forEach((group) => {
                    group.name = []
                    contactgroup[1].forEach((cg) => {
                        if (cg.idGroup == group.id) {
                            contactgroup[0].forEach((contact) => {
                                if (cg.idContact == contact.id) {
                                    group.name.push(contact.name)
                                }
                            })
                        }
                    })
                })
                resolve(contactgroup[2])
            }).catch((reason) => {
                reject(reason)
            })
        })

    }

    static create(idGroup, idContact) {
        let query = `insert into contactgroups(idGroup, idContact) values(${idGroup}, ${idContact})`
        return new Promise((resolve, reject) => {
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



module.exports = ContactGroup