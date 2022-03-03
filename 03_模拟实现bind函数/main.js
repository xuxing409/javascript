/*
 * @Author: xuxing
 * @Github: 
 * @Date: 2022-03-03 11:31:33
 * @LastEditors: xuxing
 * @LastEditTime: 2022-03-03 15:52:30
 * @Description: 
 */

// 1.处理参数，返回一个闭包
// 2.判断是否为构造函数调用，如果是则使用new调用当前函数
// 3.如果不是，使用apply，将context和处理好的参数传入

Function.prototype.myBind = function (context, ...args1) {
  // 判断this是否为函数，而不是直接原型调用
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  const _this = this
  return function F(...args2) {
    // 判断是否为构造函数调用例如：const a =  foo.myBind(b); const c = new a(11)
    if (this instanceof F) {
      return new _this(...args1, ...args2)
    }
    return _this.apply(context, args1.concat(args2))
  }
}
