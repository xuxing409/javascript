class _Promise {
  static PEDDING = 'PEDDING';
  static FULFILLERD = 'FULFILLERD';
  static REJECTED = 'REJECTED';
  constructor(executor) {
    this.status = _Promise.PEDDING;
    this.value = null;
    this.reason = null;
    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];
    executor(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(value) {
    if (this.status === _Promise.PEDDING) {
      this.status = _Promise.FULFILLERD;
      this.value = value;
      this.onFulFilledCallbacks.map(fn => fn());
    }
  }
  _reject(reason) {
    if (this.status === _Promise.PEDDING) {
      this.status = _Promise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.map(fn => fn());
    }
  }
  then(onFulFilled, onRejected) {
    if (typeof onFulFilled !== 'function') {
      onFulFilled = () => {
        return this.value;
      };
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => {
        console.log(this.reason);
        return this.reason;
      };
    }

    let promise = new _Promise((resolve, reject) => {
      switch (this.status) {
        case _Promise.PEDDING:
          this.onFulFilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let result = onFulFilled(this.value);
                this.parser(promise, result, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 4);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let result = onRejected(this.reason);
                this.parser(promise, result, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 4);
          });
          break;
        case _Promise.FULFILLERD:
          setTimeout(() => {
            try {
              let result = onFulFilled(this.value);

              this.parser(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 4);
          break;
        case _Promise.REJECTED:
          setTimeout(() => {
            try {
              let result = onRejected(this.reason);
              this.parser(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 4);
          break;
        default:
          break;
      }
    });
    return promise;
  }

  parser(promise, result, resolve, reject) {
    if (promise === result) {
      throw TypeError('Chaining cycle detected for promise');
    }

    try {
      if (result instanceof _Promise) {
        result.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
  static resolve(value) {
    return new _Promise((resolve, reject) => {
      if (value instanceof _Promise) {
        value.then(value => {
          resolve(value);
        });
      } else {
        resolve(value);
      }
    });
  }
  static reject(value) {
    return new _Promise((resolve, reject) => {
      if (value instanceof _Promise) {
        value.then(null, reason => {
          reject(reason);
        });
      } else {
        reject(value);
      }
    });
  }
  static all(promiseCollection) {
    const values = [];
    return new _Promise((resolve, reject) => {
      promiseCollection.forEach(promise => {
        promise.then(
          value => {
            values.push(value);
            if (values.length === promiseCollection.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }
  static race(promiseCollection) {
    return new _Promise((resolve, reject) => {
      promiseCollection.map(promise => {
        console.log(promise);
        promise.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }
}
