=======
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