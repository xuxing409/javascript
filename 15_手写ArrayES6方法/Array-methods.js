Array.prototype.myForEach = function (cb) {
  const _arr = this;

  for (let i = 0; i < _arr.length; i++) {
    cb.apply(window, [_arr[i], i, _arr]);
  }
};

Array.prototype.myMap = function (cb) {
  let _arr = this,
    _newArr = [],
    _result;

  for (let i = 0; i < _arr.length; i++) {
    _result = cb.apply(window, [_arr[i], i, _arr]);
    _result && _newArr.push(_result);
  }
  return _newArr;
};

Array.prototype.myFilter = function (cb) {
  let _arr = this,
    _newArr = [],
    _result;

  for (let i = 0; i < _arr.length; i++) {
    _result = cb.apply(window, [_arr[i], i, _arr]);
    _result && _newArr.push(_arr[i]);
  }
  return _newArr;
};

Array.prototype.mySome = function (cb) {
  const _arr = this;
  let _result;

  for (let i = 0; i < _arr.length; i++) {
    _result = cb.apply(window, [_arr[i], i, _arr]);
    if (_result) {
      return true;
    }
  }
  return false;
};

Array.prototype.myEvery = function (cb) {
  const _arr = this;
  let _result;

  for (let i = 0; i < _arr.length; i++) {
    _result = cb.apply(window, [_arr[i], i, _arr]);
    if (!_result) {
      return false;
    }
  }
  return true;
};

Array.prototype.myReduce = function (cb, initialValue) {
  const _arr = this;
  initialValue = initialValue ? initialValue : _arr[0];

  for (let i = initialValue ? 0 : 1; i < _arr.length; i++) {
    initialValue = cb.apply(window, [initialValue, _arr[i], i, arr]);
  }

  return initialValue;
};
