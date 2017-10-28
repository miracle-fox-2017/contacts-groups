class Contact {

    constructor() {
        
    }

    panggilData() {
        let getData = "SELECT * FROM contact";
        return getData;
    }

    editData(id) {
        let getData = `SELECT * FROM contact WHERE id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO contact (name,company,telp_number,email)
                    values('${obj.nama}','${obj.company}','${obj.telp}','${obj.email}')`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE contact set name = '${obj.nama}',
                                        company = '${obj.company}',
                                        telp_number = '${obj.telp}',
                                        email = '${obj.email}'
                                    WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM contact WHERE id = ${id}`;
        return getData;
    }

}

module.exports = Contact;