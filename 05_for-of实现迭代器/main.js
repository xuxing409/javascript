/*
 * @Author: xuxing
 * @Github: 
 * @Date: 2022-03-03 14:48:18
 * @LastEditors: xuxing
 * @LastEditTime: 2022-03-03 15:54:17
 * @Description: 
 */
const user = {
  name: 'zhangsan',
  age: 21,
  address: 'China'
}

// 
Object.prototype[Symbol.iterator] = function () {
  const keys = Reflect.ownKeys(this)
  const _THIS = this
  let count = 0
  return {
    next() {
      return count < keys.length ? { value: _THIS[keys[count++]], done: false } : { value: undefined, done: true }
    }
  }
}

Object.prototype[Symbol.iterator] = function* () {
  const keys = Reflect.ownKeys(this)
  for (let i = 0; i < keys.length; i++) {
    yield { value: this[keys[i]], done: false }
  }
}


for (const iterator of user) {
  console.log(iterator);
}
