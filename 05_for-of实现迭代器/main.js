
const user = {
  name: 'zhangsan',
  age: 21,
  address: 'China'
}

// 当对象需要迭代时，会去原型上查找是否有迭代属性，
// 迭代属性为一个方法，返回 {value,done}
Object.prototype[Symbol.iterator] = function () {
  // Reflect.ownKeys返回一个由目标对象自身的属性键组成的数组。
  const keys = Reflect.ownKeys(this)
  const _THIS = this
  let count = 0
  return {
    next() {
      return count < keys.length ? { value: _THIS[keys[count++]], done: false } : { value: undefined, done: true }
    }
  }
}
// 生成器 使用 yield返回值，每次调用生成一次，并保留上次运行状态
Object.prototype[Symbol.iterator] = function* () {
  const keys = Reflect.ownKeys(this)
  for (let i = 0; i < keys.length; i++) {
    yield { value: this[keys[i]], done: false }
  }
}


for (const iterator of user) {
  console.log(iterator);
}
