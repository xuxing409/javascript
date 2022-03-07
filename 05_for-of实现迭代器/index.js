const user = {
  name: 'zhangsan',
  age: 21,
  address: 'China'
}


let a  = new Map();

a.set('a',1)
a.set('b',2)
a.set('c',3)
a.set('d',4)

// var genMap = a[Symbol.iterator]()
// console.log(genMap.next());
// console.log(genMap.next());
// console.log(genMap.next());

// 用迭代器给object 补充for of方法
Object.prototype[Symbol.iterator] = function () {
  var keys = Reflect.ownKeys(this)
  var _this = this
  var index = 0
  return {
    next: function(){
      return index < keys.length ? {value:_this[keys[index++]], done:false} : {done: true}
    }
  }
}

// 使用生成器
Object.prototype[Symbol.iterator] = function* () {
  var keys = Reflect.ownKeys(this)
  var _this = this
  var index = 0

  while(index < keys.length){
    yield  {value:_this[keys[index++]], done:false}
   
  }
}

for(var item of user) {
  console.log(item);
}

