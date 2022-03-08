function objectFactory1() {
  const obj = new Object();
  const Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  // 判断ret类型，如果为null，则返回obj
  return typeof ret === 'object' ? ret || obj : obj;
}


const user  = new objectFactory1({},1,2,3)
