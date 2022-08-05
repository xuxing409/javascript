// 1.手写Promise 实现1
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = MyPromise.PENDING; //状态
    this.value = null; // 值
    this.callbacks = []; // pending状态下，回调收集
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
      throw new Error(error);
    }
  }
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      // 异步代码和同步代码处理
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulFilled(value);
        });
      });
    }
  }
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason);
        });
      });
    }
  }
  then(onFulFilled, onRejected) {
    if (typeof onFulFilled !== "function") {
      onFulFilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }
    let promise = new MyPromise((resolve, reject) => {
      // settimeout 中执行resolve\reject

      // PENDING
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulFilled: (value) => {
            // 错误统一用onRejected处理
            this.parse(promise, onFulFilled(value), resolve, reject);
          },
          onRejected: (value) => {
            // 新返回的promise不受上一次promise的状态影响，默认使用resolve处理
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }

      // FULFILLED
      if (this.status === MyPromise.FULFILLED) {
        // 实现异步
        setTimeout(() => {
          this.parse(promise, onFulFilled(this.value), resolve, reject);
        });
      }

      // REJECTED
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }
  parse(promise, result, resolve, reject) {
    // 特性：返回类型不能是当前promise
    if (promise === result) {
      throw TypeError("Chaining cycle detected for promise");
    }
    try {
      // 判断返回的是否为新的promise
      // 新的promise 就拿到返回值将其返回到链式的then中
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      // 判断参数是否promise（比如传递一个异步请求ajax
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(null, reject);
      } else {
        reject(value);
      }
    });
  }
  /**
   * 这个方法返回一个新的 promise 对象，
   * 等到所有的 promise 对象都成功或有任意一个 promise 失败。
   */
  static all(promises) {
    const values = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
  // 等到任意一个 promise 的状态变为已敲定。
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.map((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
  /**
   * 最终执行方法
   */
  finally(fn) {
    return this.then(
      (value) => {
        fn();
        return value;
      },
      (reason) => {
        fn();
        throw reason;
      }
    );
  }
}
