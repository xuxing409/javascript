const obj = {
  age: 20,
  colors: ["orange", "green", "blue"],
  friend: { name: "小夏" },
  name: "哈默"
}

// es5 深拷贝
function deepCloneEs5(origin, target){
  var tar = target || {}
  var toStr = Object.prototype.toString
  var arrType = '[object Array]'

  for (var key in origin) {
    if(origin.hasOwnProperty(key)){
      if(typeof origin[key] === 'object' && origin[key] !== null){
        tar[key] = toStr.call(origin[key]) === arrType ? []: {}
        deepCloneEs5(origin[key], tar[key])
      }else{
        tar[key] = origin[key]
      }
    }
  }
  return tar
}
// var objTar = {}
// deepCloneEs5(obj,objTar)
// obj.age =100;
// obj.name='Tj'
// console.log(obj, objTar);

// es6 深拷贝
function deepClone(obj = {}) {
  // 值类型退出
  if (typeof obj !== "object" || obj == null) {
    return obj
  }
  // 声明拷贝的数组或对象
  let result;

  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 去除原型链上继承的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }

  }
  return result
}


// es6 升级版深拷贝
function deepClonePro(obj, hashMap = new WeakMap()) {
  // 值类型退出
  if (typeof obj !== "object" || obj == null) {
    return obj
  }
  if(obj instanceof Date){
    return new Date(obj)
  }
  if(obj instanceof RegExp){
    return new RegExp(obj)
  }

  const hashkey = hashMap.get(obj)

  if(hashkey){
    return hashkey
  }

  const target = new obj.constructor();
  hashMap.set(obj, target)
  for (let key in obj) {
    // 去除原型链上继承的属性
    if (obj.hasOwnProperty(key)) {
      target[key] = deepClonePro(obj[key], hashMap)
    }

  }
  return target
}
// console.log(obj);


// const obj2 = deepClonePro(obj)

// obj2.name = '小野'
// obj2.friend.name = 'xx'
// obj2.colors[0] = 'red'

// console.log(obj,obj2);

// 循环引用情况使用weakMap处理
let test1 = {}
let test2 = {}
test2.test1 = test1
test1.test2 = test2

console.log(deepClonePro(test1));
