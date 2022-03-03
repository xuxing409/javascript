
/*
 * @param {Array} array
 * @return {Array} new array 
 */
function proxy(array) {
  const p = new Proxy(array, {
    get: function (data, prop) {

      if ((/\-/).test(prop)) {
        return data[data.length + Number(prop)]
      } else {
        return data[Number(prop)]
      }
    }
  })
  return p
}
const array = proxy([1, 2, 3])


console.log(array[1]);
console.log(array[-1]);

