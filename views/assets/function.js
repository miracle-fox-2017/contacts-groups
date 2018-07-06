
function validasiProfile() {
  let nama     = document.getElementById("namauser").value;
  let password = document.getElementById("passuser").value;
  let select   = document.getElementById("selectuser").value;
  if (nama == "" && password == "") {
    alert('Anda harus mengisi data dengan lengkap !');
    return false
  }
}

function validasiContacts(){
  let nama          = document.getElementById("nama").value;
  let company       = document.getElementById("company").value;
  let telp_number   = document.getElementById("telp_number").value;
  let email         = document.getElementById("email").value;
  if (nama == "" && company == "" && telp_number == "" && email == "") {
    alert('Anda harus mengisi data dengan lengkap !');
    return false
  }
}

function myFunction() {
  confirm("are you sure?!");
  // swal ( "Oops" ,  "Something went wrong!" ,  "error" )
  swal({
    icon: "success",
  });
}
