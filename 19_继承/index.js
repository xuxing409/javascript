function People() {
  this.type = 'prople'
}

People.prototype.eat = function () {
  console.log('吃东西啦');
}

function Man(name) {
  this.name = name;
  this.color = 'black';
}
// 1.原型继承
// 将父类指向子类的原型。
Man.prototype = new People();
// 缺点：原型是所有子类实例共享的，改变一个其他也会改变。


// 2.构造继承
// 在子类构造函数中调用父类构造函数
function Man(name) {
  People.call(this);
}
// 缺点：不能继承父类原型，函数在构造函数中，每个子类实例不能共享函数，浪费内存。

// 3.组合继承
// 使用构造继承继承父类参数，使用原型继承继承父类函数
function Man(name) {
  People.call(this);
}
Man.prototype = People.prototype;
// 缺点：父类原型和子类原型是同一个对象，无法区分子类真正是由谁构造。

// 4.寄生组合继承
// 在组合继承的基础上，子类继承一个由父类原型生成的空对象。

function Man(name) {
  People.call(this);
}

Man.prototype = Object.create(People.prototype, {
  constructor: {
    value: Man
  }
})
// inherits函数：

function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};


// 使用：

function Man() {
  People.call(this);
  //...
}
inherits(Man, People);

    // Man.prototype.fun = ...
