// 1创建一个空的简单JavaScript对象（即{}）；
// 2为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
// 3将步骤1新创建的对象作为this的上下文 ；
// 4如果该函数没有返回对象，则返回this。
function Animal(type){
  this.type = type; //实例上的属性
  //如果当前构造函数返回的是一个引用类型，需要把这个对象返回
  return {name:'gjf'}
}
Animal.prototype.say = function(){
  console.log('say')
}

function objectFactory1() {
  const obj = new Object();
  const Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  // 判断ret类型，如果为null，则返回obj
  return typeof ret === 'object' ? ret || obj : obj;
}


const user  = new objectFactory1(Animal,'cccc')
console.log(user);
