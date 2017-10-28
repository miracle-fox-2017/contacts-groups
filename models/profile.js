class Profile{

    constructor(){
        
    }
    
    panggilData(){
        let getData = "SELECT * FROM profile";
        return getData;
    }

    editData(id) {
        let getData = `SELECT * FROM profile WHERE id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO profile (username,password)
                    values('${obj.nama}','${obj.password}')`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE profile set username = '${obj.nama}',
                                        password = '${obj.password}'
                                    WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM contact WHERE id = ${id}`;
        return getData;
    }
    
}

module.exports = Profile;