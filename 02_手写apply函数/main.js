/*
 * @Author: xuxing
 * @Github: 
 * @Date: 2022-03-03 10:51:07
 * @LastEditors: xuxing
 * @LastEditTime: 2022-03-03 11:30:34
 * @Description: 
 */

// apply实现类似call，参数为数组

Function.prototype.myApply = function (context = window, args) {
  // 1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
  if (context === Function.prototype) {
    return
  }
  // 2.context 为可选参数，如果不传的话默认上下文为 window
  context = context || window;
  // 3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
  const fn = Symbol()
  context[fn] = this

  let result;

  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }

  return result
}
