// 1.处理参数，返回一个闭包
// 2.判断是否为构造函数调用，如果是则使用new调用当前函数
// 3.如果不是，使用apply，将context和处理好的参数传入

Function.prototype.myBind = function (context, ...args1) {
  // 判断this是否指向原型，防止直接原型调用
  if (this === Function.prototype) {
    throw new TypeError("Error");
  }

  // 保存调用函数
  const _this = this;

  // 利用闭包实现
  return function F(...args2) {
    // 判断是否当作构造函数 new调用(如果是则原来提供的this就会被忽略，但参数还是可以保留)，如果是则使用new调用原来的this指向的函数
    if (this instanceof F) {
      return new _this(...args1, ...args2);
    }
    // 使用apply改变this执行，实现bind
    return _this.apply(context, args1.concat(args2));
  };
};

// 测试bind
const fn = function (a, b) {
  console.log("this", this);
  this.a = a;
  this.b = b;
};
const bindFn = fn.bind({ name: "wk", age: 12 }, 2);
// 都可以分步传参
// const callResult = bindFn(5);
// console.log("callResult", callResult);

// 当 bind 返回的函数作为构造函数的时候, 会丢失this上下文
const newResult = new bindFn(3);
console.log("newResult", newResult);
