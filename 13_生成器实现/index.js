function* idMaker(maxId) {
  var index = 0;
  while(index <= maxId) {
    yield index++;
  }
}
var gen = idMaker(10)

let result 
// while(!(result = gen.next()).done){
//   console.log(result);
// }

for(var i of gen){
  console.log(i);
}
