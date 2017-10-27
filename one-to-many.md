
# express-sqlite3-association-one-to-many

# EXPRESS CONTACTS-GROUPS
---------------------------

## Release 6
Tabel Contacts dan Table Address memiliki relasi dimana satu data contact boleh memiliki lebih dari satu data address 
Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)

## Release 7
1. Pada route get '/addresses', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
2. Pada saat melakukan add di halaman address, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data address tersebut
3. Pada saat melakukan edit di halaman address, data address harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

## Release 5
- Buatlah routing baru "/addresses_with_contact" yang isinya menampilkan list dari addresses, kemudian tambahkan name dan company dari Contact yang sesuai (hint: JOIN)
- Tambahkan link pada halaman Contact untuk memanggil routing yang baru kalian buat di atas

