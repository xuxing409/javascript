// 1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
// 2.context 为可选参数，如果不传的话默认上下文为 window
// 3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
// 4.处理参数，传入第一个参数后的其余参数
// 5.调用函数后即删除该Symbol属性

Function.prototype.myCall = function (context = window, ...args) {
  // 1.判断当前this是否指向Function原型链，防止Function.prototype.myCall() 直接调用
  if (context === Function.prototype) {
    return;
  }
  // 2.context 为可选参数，如果不传的话默认上下文为 window
  context = context || window;
  // 3.为context 创建一个 Symbol（保证上下文不会重名）属性，将当前函数赋值给这个属性
  const fn = Symbol();
  context[fn] = this;
  // 4.处理参数，传入第一个参数后的其余参数
  const result = context[fn](...args);
  // 5.调用函数后即删除该Symbol属性
  delete context[fn];

  return result;
};


// 测试 myCall
const XiaoHong = {
  name: "小红",
  age: 20,
  learn: function () {
    console.log(this.name);
  },
};
function sayName(lable) {
  console.log(lable + this.name);
}

sayName.myCall(XiaoHong, "我是");

console.log(window.name);
sayName.myCall(undefined, "我是");
