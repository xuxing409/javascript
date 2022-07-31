// // 01简单版
// class Subject{
//   constructor(name){
//     this.name = name
//     this.observers = []
//     this.state = 'XXXX'
//   }
//   // 被观察者要提供一个接受观察者的方法
//   attach(observer){
//     this.observers.push(observer)
//   }

//   // 改变被观察着的状态
//   setState(newState){
//     this.state = newState
//     this.observers.forEach(o=>{
//       o.update(newState)
//     })
//   }
// }

// class Observer{
//   constructor(name){
//     this.name = name
//   }

//   update(newState){
//     console.log(`${this.name}say:${newState}`)
//   }
// }

// // 被观察者 灯
// let sub = new Subject('灯')
// let mm = new Observer('小明')
// let jj = new Observer('小健')

// // 订阅 观察者
// sub.attach(mm)
// sub.attach(jj)

// sub.setState('灯亮了来电了')

// 详细版
function EventEmitter() {
  this._maxListeners = 10; // 最大连接数
  this._events = Object.create(null); // 事件队列
}

// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  // 检查队列是否存在
  if (!this._events) {
    this._events = Object.create(null);
  }

  // 判断事件是否存在,存在则向队列添加事件
  if (this._events[type]) {
    if (prepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    //不存在则创建一个队列，并将本次listener添加进去
    this._events[type] = [listener];
  }
};

// 移除某个事件
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    // 不存在则移除整个type属性的队列
    if (!listener) {
      delete this._events[type];
    } else {
      this._events[type] = this._events[type].filter(
        (e) => e !== listener && e.origin !== listener
      );
    }
  }
};

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args); //执行一次函数
    this.removeListener(type, listener); // 移除事件
  };
  only.origin = listener;
  this.addListener(type, only);
};

// 执行某类事件
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    // 队列依次执行
    this._events[type].forEach((fn) => {
      fn.apply(this, args);
    });
  }
};

// 设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count;
};

// 测试订阅
var emitter = new EventEmitter();

var onceListener = function (args) {
  console.log("我只能被执行一次", args, this);
};

var listener = function (args) {
  console.log("我是一个listener", args, this);
};

// emitter.once('click', onceListener);
emitter.addListener("click", listener);

// emitter.emit('click', '参数');
// emitter.emit('click');

// emitter.removeListener("click", listener);
emitter.emit("click");
