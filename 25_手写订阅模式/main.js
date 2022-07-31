function EventEmitter() {
  this._events = Object.create(null);
  this.maxEventListener = 10;
}

EventEmitter.prototype.addListener = function (type, listener, append) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[type]) {
    if (append) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    if (!listener) {
      delete this._events[type];
    } else {
      this._events[type] = this._events[type].filter(
        (e) => listener !== e && listener !== e.origin
      );
    }
  }
};

EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this.removeListener(type, listener);
  };
  only.origin = listener;
  this.addListener(type,only)
};
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach((fn) => {
      fn.apply(this, args);
    });
  }
};
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxEventListener = count;
};

// 测试订阅
var emitter = new EventEmitter();

var onceListener = function (args) {
  console.log("我只能被执行一次", args, this);
};

// var listener = function (args) {
//   console.log("我是一个listener", args, this);
// };

emitter.once("click", onceListener);
// emitter.addListener("click", listener);

emitter.emit("click", "参数");
emitter.emit("click");
