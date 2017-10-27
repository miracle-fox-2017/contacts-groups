
# express-sqlite3-association-one-to-one

# EXPRESS CONTACTS-GROUPS
---------------------------

## Release 3
1. Tabel Contacts dan Table Profiles memiliki relasi dimana satu data contact hanya boleh memiliki satu data profile. 
Pada file setup.js tambahkan relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan
2. Tentukan (jika ada dan perlu) column mana saja yang harus di set UNIQUE (baca dokumentasi sqlite3 untuk menambahkan unique pada existing table)

## Release 4
1. Pada route get '/profiles', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
2. Pada saat melakukan add di halaman profiles, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data profile tersebut
3. Pada saat melakukan edit di halaman profiles, data profile harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

## Release 5
- Tambahkan validasi pada halaman Contact, saat melakukan add field name tidak boleh kosong. Munculkan pesan error pada frontend (ejs)
- Tambahkan validasi pada halaman Profile, saat melakukan add profile dan memilih contact yang sudah memiliki profile munculkan pesan error "Your contact already have profile" pada frontend (ejs)

