class Profile{

    constructor(){
        
    }
    
    panggilData(){
        let getData = "SELECT profile.*, contact.name FROM profile INNER JOIN contact ON contact.id = profile.idcontact";
        return getData;
    }

    dataContact() {
        let getData = "SELECT * FROM contact";
        return getData;
    }

    cekContact(id) {
        let getData = `SELECT * FROM profile WHERE idcontact = ${id}`;
        return getData;
    }

    panggilDataSelect() {
        let getData = "SELECT * FROM profile";
        return getData;
    }

    panggilDataContact() {
        let getData = "SELECT contact.*, profile.idcontact FROM contact LEFT JOIN profile ON contact.id = profile.idcontact";
        return getData;
    }

    editData(id) {
        let getData = `SELECT contact.id,contact.name, profile.username, profile.password,profile.id AS idcontact FROM profile INNER JOIN contact ON contact.id = profile.idcontact WHERE profile.id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO profile (username,password,idcontact)
                    values('${obj.nama}','${obj.password}',${obj.idcontact})`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE profile set username = '${obj.nama}',
                                        password = '${obj.password}'
                                    WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM profile WHERE id = ${id}`;
        return getData;
    }
    
}

module.exports = Profile;