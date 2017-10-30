# contacts-groups
-------------------

# express-sqlite3-association-one-to-one

# EXPRESS CONTACTS-GROUPS
---------------------------

## Release 3
1. Tabel Contacts dan Table Profiles memiliki relasi dimana satu data contact hanya boleh memiliki satu data profile.
Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)
2. Tentukan (jika ada dan perlu) column mana saja yang harus di set UNIQUE (baca dokumentasi sqlite3 untuk menambahkan unique pada existing table)

## Release 4
1. Pada route get '/profiles', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
2. Pada saat melakukan add di halaman profiles, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data profile tersebut
3. Pada saat melakukan edit di halaman profiles, data profile harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

## Release 5
- Tambahkan validasi pada halaman Contact, saat melakukan add field name tidak boleh kosong. Munculkan pesan error pada frontend (ejs)
- Tambahkan validasi pada halaman Profile, saat melakukan add profile dan memilih contact yang sudah memiliki profile munculkan pesan error "Your contact already have profile" pada frontend (ejs)

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

## Release 8
- Buatlah routing baru "/addresses_with_contact" yang isinya menampilkan list dari addresses, kemudian tambahkan name dan company dari Contact yang sesuai dengan cara memanipulasi object di routing sebelum dikirimkan ke view menggunakan callback (untuk melatih "callback" kamu maka untuk kasus ini tidak boleh menggunakan JOIN)
- Tambahkan link pada halaman Contact untuk memanggil routing yang baru kalian buat di atas



# express-sqlite3-association-many-to-many

# EXPRESS CONTACTS-GROUPS
---------------------------

## Release 9
Tabel Contacts dan Table Groups memiliki relasi dimana satu data contact boleh memiliki lebih dari satu data group, dan satu group boleh memiliki lebih dari satu data contact. Pada file setup.js tambahkan tabel conjuction yang dibutuhkan dan foreign key-foreign key yang dibutuhkan.

## Release 10
1. Pada saat melakukan add di halaman contacts, tambahkanlah input fields berupa select-options(dropdown/combobox) yang isinya merupakan nama dari semua group yang sudah ada. Ketika user/client menekan tombol save maka data contact dan group akan tersimpan pada tabel contact maupun tabel conjunctionnya.
2. Pada halaman list contacts tambahkan column group dimana pada coloum tersebut berisi nama-nama group yang telah di-assign untuk contact tersebut menggunakan callback. Di release ini table contact tidak boleh di join dengan table manapun, namun table Contacts_Groups boleh join dengan table Groups.

## Release 11
1. Tambahak route '/groups/assign_contacts/:id_group' (GET dan POST) dimana route ini berfungsi untuk menyimpan data relasi antara group dan contact-nya
2. Pada halaman list groups, tambahkan link 'assign contact' untuk setiap data group, dimana jika user/client menekan link tersebut maka akan menuju halaman 'assign_contacts' (gunakan route GET yang telah kamu buat diatas). Pada halaman ini tampilkan tulisan "Assign contacts for group: [nama_group]" dan buatlah form yang didalamnya terdapat select-options untuk memilih contact yang ingin di-assign
3. Pada saat user/client menekan tombol save maka panggilah route POST yang telah kalian buat di-point no.1 dan simpanlah data-data relasi antara contact dan group pada tabel conjunction
4. Pada halaman list groups tambahkan column contact dimana pada coloum tersebut berisi nama-nama contact yang telah di-assign untuk group tersebut menggunakan callback. Di release ini table Groups tidak boleh di join dengan table manapun, namun table Contacts_Groups boleh join dengan table Contacts.
