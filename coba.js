var contacts = [{"id":5,"name":"wisnu dharma jaya","company":"PT. Bahagia Selamanya","telp_number":"08564141085","email":"jayalahwisnu@gmail.com"},{"id":6,"name":"Chontry Novita Dewi","company":"PT.Acset Selalu Bahagia","telp_number":"08576189411","email":"novibdn.gmail.com"},{"id":7,"name":"Novaliani","company":"PT. Bahagia Selamanya","telp_number":"08576189412","email":"nova@gmail.com"}]

var groups = [{"name_of_group":null,"ContactId":"undefined","GroupId":"index.html"},{"name_of_group":null,"ContactId":"undefined","GroupId":"index.html"},{"name_of_group":"javascript indonesia","ContactId":5,"GroupId":1},{"name_of_group":"Python ID","ContactId":5,"GroupId":2},{"name_of_group":"Python ID","ContactId":6,"GroupId":2},{"name_of_group":"javascript indonesia","ContactId":6,"GroupId":1},{"name_of_group":"javascript indonesia","ContactId":7,"GroupId":1}]

for(var i = 0; i < contacts.length; i++) {
  var tampung = []
  groups.forEach((elemen) => {
    if(contacts[i].id == elemen.ContactId) {
      tampung.push(elemen.name_of_group)
    }
  })
  contacts[i].group = tampung.join(',')
}

console.log(contacts);
