var contacts = [{"ContactId":6,"GroupId":1,"name":"Chontry Novita Dewi"},{"ContactId":7,"GroupId":1,"name":null},{"ContactId":11,"GroupId":2,"name":"Adit Reza"},{"ContactId":7,"GroupId":2,"name":null},{"ContactId":16,"GroupId":2,"name":"wisnu dharma jaya"}]

var groups = [{"id":1,"name_of_group":"javascript indonesia","groups":"Chontry Novita Dewi,"},{"id":2,"name_of_group":"Python ID","groups":"Adit Reza,,wisnu dharma jaya"}]


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
