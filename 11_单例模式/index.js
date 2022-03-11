// 在合适的时候才创建对象，并且只创建唯一的一个。

// 创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模式的威力。

// 使用闭包实现：


var Singleton = function(name) {
  this.name = name;
};

Singleton.prototype.getName = function() {
  alert(this.name);
};
// 使用立即执行函数 返回用于保存实例的函数
Singleton.getInstance = (function(name) {
  var instance;
  return function(name){
    // 实例不存在，则用构造函数new一个实例
      if (!instance) {
          instance = new Singleton(name);
      }
      // 存在则返回实例
      return instance;
  }
})();
// 无论声明多少次都是返回唯一实例，这就是单例模式的概念
var a = Singleton.getInstance('ConardLi');
var b = Singleton.getInstance('ConardLi2');
console.log(a, b);
console.log(a===b);   //true
