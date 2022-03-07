// 手写 Array forEach
Array.prototype.myForEach = function (cb) {
  const arr = this
  for (var i = 0; i < arr.length; i++) {
    cb.apply(window, arr[i], i, arr)
  }
}

// 手写map函数
Array.prototype.myMap = function (cb) {
  const arr = this
  let newArr = [];
  let result;
  for (var i = 0; i < arr.length; i++) {
    result = cb.apply(window, arr[i], i, arr)
    result && newArr.push(result)
  }
  return newArr
}

// 手写filter方法

Array.prototype.myFilter = function (cb) {
  const arr = this;
  let newArr = []
  let result;
  for (var i = 0; i < arr.length; i++) {
    result = cb.apply(window, arr[i], i, arr)
    result && newArr.push(result)
  }
  return newArr
}
// 手写some方法
Array.prototype.mySome = function (cb) {
  const arr = this;
  let result;
  for (var i = 0; i < arr.length; i++) {
    result = cb.apply(window, arr[i], i, arr)
    if (result) {
      return true
    }
  }
  return false
}

// 手写every方法
Array.prototype.myEvery = function (cb) {
  const arr = this;
  let result;
  for (var i = 0; i < arr.length; i++) {
    result = cb.apply(window, arr[i], i, arr)
    if (result) {
      return false
    }
  }
  return true
}

// 手写reduce方法
Array.prototype.myReduce = function (cb, initialValue) {
  const arr = this;
  initialValue = typeof initialValue !== 'undefined' ? initialValue : arr[0];
  for (var i = typeof initialValue !== 'undefined' ? 0 : 1; i < arr.length; i++) {
    initialValue = cb.apply(window, [initialValue, arr[i], i, arr]);
  }
  return initialValue
}
