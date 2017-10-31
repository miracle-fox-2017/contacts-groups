const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');
const Group = require('./groupsModel')
const Contact = require('./contactsModel')

class ContactGroup{

	static getAllKonjungsi(){

		return new Promise((resolve, reject) => {
			db.all(`select * from ContactGroup`, (err, konjungsi)=>{
				if(err){
					reject(err);
				}else{
					resolve(konjungsi)
				}
			})
		})
	}

	static getKonjungsiByGroupId(data){

		return new Promise((resolve, reject) => {
			db.all(`select * from ContactGroup where id_group = ${data}`, (err, groups)=>{
				if(!err){
					resolve(groups)
				}else{
					reject(err)
				}
			})
		});
	}

	static getAllGroupContact(){
		
		return new Promise((resolve, reject) => {
			Group.getAllGroup().then(groups=>{
				let result = groups.map(group=>{
					group.name = []
					return new Promise((resolve, reject) => {
						this.getContactKonjById(group.id).then(contact=>{
							contact.forEach(kontak=>{
								group.name.push(kontak.name)	
							})
							resolve(group)
						})
					})
				})

				Promise.all(result).then(grup=>{
					resolve(grup)
				})
			})
		});
	}

	static getContactKonjById(data){
		return new Promise((resolve, reject) => {
			this.getKonjungsiByGroupId(data).then(result=>{

				let konjungsi = result.map(konj=>{
					return new Promise((resolve, reject) => {
						Contact.getContactById(konj.id_contact).then(kontak=>{
							konj.name = kontak.name
							resolve(konj)
						})	
					})
				})


				Promise.all(konjungsi).then(keluaran=>{
					resolve(keluaran)
				})
			})
		})
	}
}
module.exports = ContactGroup