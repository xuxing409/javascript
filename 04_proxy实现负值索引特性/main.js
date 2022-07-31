// const p = new Proxy(target, handler)
// 参数
// target
// 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
// handler
// 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

/*
 * @param {Array} array
 * @return {Array} new array
 */
function proxy(array) {
  // 使用Proxy
  const p = new Proxy(array, {
    // get 参数（target：目标对象，property：被获取的属性名，receiver：Proxy 或者继承 Proxy 的对象）
    get: function (data, prop) {
      const index = Number(prop);
      // 判断索引是不是负数
      if (index < 0) {
        return data[data.length + index];
      } else {
        return data[index];
      }
    },
  });

  // 返回代理的对象
  return p;
}
const array = proxy([1, 2, 3]);

console.log(array[1]);
console.log(array[-1]);
console.log(array[-8]);
