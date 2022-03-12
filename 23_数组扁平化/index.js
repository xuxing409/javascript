const flat = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flat(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

// 使用reduce简化
    function flatten(array) {
      return array.reduce(
        (target, current) =>
          Array.isArray(current) ?
            target.concat(flatten(current)) :
            target.concat(current)
        , [])
    }
// 根据指定深度扁平数组
function flattenByDeep(array, deep = 1) {
  return array.reduce(
    (target, current) =>
      Array.isArray(current) && deep > 1 ?
        target.concat(flattenByDeep(current, deep - 1)) :
        target.concat(current)
    , [])
}
// 最值
// #reduce
array.reduce((c,n)=>Math.max(c,n))
// #Math.max
// Math.max参数原本是一组数字，只需要让他可以接收数组即可。

const array = [3,2,1,4,5];
Math.max.apply(null,array);
Math.max(...array);
// #使用reduce实现map
    Array.prototype.reduceToMap = function (handler) {
      return this.reduce((target, current, index) => {
        target.push(handler.call(this, current, index))
        return target;
      }, [])
    };
// #使用reduce实现filter
    Array.prototype.reduceToFilter = function (handler) {
      return this.reduce((target, current, index) => {
        if (handler.call(this, current, index)) {
          target.push(current);
        }
        return target;
      }, [])
    };
