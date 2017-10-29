# contacts-groups

> moved task to here

# express-sqlite3-crud

# EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact, Group, Addresses dan Profiles menambah data Contact, Group, Addresses dan Profiles ,
melakukan edit data dan delete data berdasarkan data yang dipilih

- [x] completed
## Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: 
  - attribute id ber-type integer
  - attribute name ber-type string
  - attribute company ber-type string
  - attribute telp_number ber-type string
  - attribute email ber-type string
* Groups: 
  - attribute id ber-type integer
  - attribute name_of_group ber-type string
* Profile: 
  - attribute id ber-type integer
  - attribute username ber-type string
  - attribute password ber-type string
* Addresses: 
  - attribute id ber-type integer
  - attribute street ber-type string
  - attribute city ber-type string 
  - attribute zipcode ber-type integer

- [x] completed
## Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs

|METHOD | ROUTE                   | KETERANGAN                                          |
|-------|:------------------------|:-----------------------------------------------------
|GET    | /contacts               | Menampilkan semua data contacts                     |
|POST   | /contacts               | Menerima input contact                              |
|GET    | /contacts/edit/:id      | Menampilkan data contact spesifik untuk diubah      |
|POST   | /contacts/edit/:id      | Menerima data form untuk update contact             |
|GET    | /contacts/delete/:id    | Menghapus data contact berdasarkan id               |
|GET    | /groups                 | Menampilkan semua data groups                       |
|POST   | /groups                 | Menerima data form untuk input group                |
|GET    | /groups/edit/:id        | Menampilkan data group spesifik untuk diubah        |
|POST   | /groups/edit/:id        | Menerima data form untuk update group               |
|GET    | /groups/delete/:id      | Menghapus data group berdasarkan id                 |

- [x] completed
## Release 2 - Basic Routing for Addresses dan Profiles
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs

|METHOD | ROUTE                   | KETERANGAN                                          |
|-------|:------------------------|:-----------------------------------------------------
|GET    | /addresses              | Menampilkan semua data addresses                    |
|POST   | /addresses              | Menerima data form untuk input address              |
|GET    | /addresses/edit/:id     | Menampilkan data address spesifik untuk diubah      |
|POST   | /addresses/edit/:id     | Menerima data form untuk update address             |
|GET    | /addresses/delete/:id   | Menghapus data address berdasarkan id               |
|GET    | /profiles               | Menampilkan semua data profiles                     |
|POST   | /profiles               | Menerima data form untuk input profile              |
|GET    | /profiles/edit/:id      | Menampilkan data profile spesifik untuk diubah      |
|POST   | /profiles/edit/:id      | Menerima data form untuk update profile             |
|GET    | /profiles/delete/:id    | Menghapus data profile berdasarkan id               |

- [x] completed
## Release 3
1. Tabel Contacts dan Table Profiles memiliki relasi dimana satu data contact hanya boleh memiliki satu data profile. 
Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)
2. Tentukan (jika ada dan perlu) column mana saja yang harus di set UNIQUE (baca dokumentasi sqlite3 untuk menambahkan unique pada existing table)

- [] incomplete
## Release 4
1. Pada route get '/profiles', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
2. Pada saat melakukan add di halaman profiles, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data profile tersebut
3. Pada saat melakukan edit di halaman profiles, data profile harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

- [] incomplete
## Release 5
- Tambahkan validasi pada halaman Contact, saat melakukan add field name tidak boleh kosong. Munculkan pesan error pada frontend (ejs)
- Tambahkan validasi pada halaman Profile, saat melakukan add profile dan memilih contact yang sudah memiliki profile munculkan pesan error "Your contact already have profile" pada frontend (ejs)

- [] incomplete
## Release 6
Tabel Contacts dan Table Address memiliki relasi dimana satu data contact boleh memiliki lebih dari satu data address 
Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)

- [] incomplete
## Release 7
1. Pada route get '/addresses', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
2. Pada saat melakukan add di halaman address, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data address tersebut
3. Pada saat melakukan edit di halaman address, data address harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

- [] incomplete
## Release 8
- Buatlah routing baru "/addresses_with_contact" yang isinya menampilkan list dari addresses, kemudian tambahkan name dan company dari Contact yang sesuai dengan cara memanipulasi object di routing sebelum dikirimkan ke view menggunakan callback (untuk melatih "callback" kamu maka untuk kasus ini tidak boleh menggunakan JOIN)
- Tambahkan link pada halaman Contact untuk memanggil routing yang baru kalian buat di atas

- [] incomplete
## Release 9
Tabel Contacts dan Table Groups memiliki relasi dimana satu data contact boleh memiliki lebih dari satu data group, dan satu group boleh memiliki lebih dari satu data contact. Pada file setup.js tambahkan tabel conjuction yang dibutuhkan dan foreign key-foreign key yang dibutuhkan.

- [] incomplete
## Release 10
1. Pada saat melakukan add di halaman contacts, tambahkanlah input fields berupa select-options(dropdown/combobox) yang isinya merupakan nama dari semua group yang sudah ada. Ketika user/client menekan tombol save maka data contact dan group akan tersimpan pada tabel contact maupun tabel conjunctionnya.
2. Pada halaman list contacts tambahkan column group dimana pada coloum tersebut berisi nama-nama group yang telah di-assign untuk contact tersebut menggunakan callback. Di release ini table contact tidak boleh di join dengan table manapun, namun table Contacts_Groups boleh join dengan table Groups. 

- [] incomplete
## Release 11
1. Tambahak route '/groups/assign_contacts/:id_group' (GET dan POST) dimana route ini berfungsi untuk menyimpan data relasi antara group dan contact-nya
2. Pada halaman list groups, tambahkan link 'assign contact' untuk setiap data group, dimana jika user/client menekan link tersebut maka akan menuju halaman 'assign_contacts' (gunakan route GET yang telah kamu buat diatas). Pada halaman ini tampilkan tulisan "Assign contacts for group: [nama_group]" dan buatlah form yang didalamnya terdapat select-options untuk memilih contact yang ingin di-assign
3. Pada saat user/client menekan tombol save maka panggilah route POST yang telah kalian buat di-point no.1 dan simpanlah data-data relasi antara contact dan group pada tabel conjunction
4. Pada halaman list groups tambahkan column contact dimana pada coloum tersebut berisi nama-nama contact yang telah di-assign untuk group tersebut menggunakan callback. Di release ini table Groups tidak boleh di join dengan table manapun, namun table Contacts_Groups boleh join dengan table Contacts. 
