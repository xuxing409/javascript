// 1.创建一个新对象；
// 2.新对象将被执行[[原型]]连接（连接到构造函数的原型）；
// 3.构造函数中的this会绑定到新对象；
// 4.如果构造函数没有返回其他对象，则自动返回这个新对象。

function foo() {
  const obj = new Object();
  const Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  // 判断ret类型，如果为null，则返回obj
  return typeof ret === "object" ? ret || obj : obj;
}

function bar(aa, bb) {
  this.name = aa;
  this.age = bb;
}

const aa = new foo(bar, "Tj", 18);

console.log(aa);
