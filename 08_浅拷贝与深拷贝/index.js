const obj = {
  age: 20,
  colors: ["orange", "green", "blue"],
  friend: { name: "小夏" },
  name: "哈默"
}

function deepClone(obj = {}) {
  // 值类型退出
  if (typeof obj !== "obj" || obj == null) {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
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

console.log(obj);


const obj2 = deepClone(obj)

obj2.name = '小野'
obj2.friend.name = 'xx'
obj2.colors[0] = 'red'

console.log(obj2);
