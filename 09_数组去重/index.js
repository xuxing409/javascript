// 方法1 new Set()
const arr = [1, 2, 2, 3]


const newArr = Array.from(new Set(arr))


console.log(newArr);

// 方法2 filter + indexof

const unique = arr => arr.filter((e, i) => arr.indexOf(e) === i);
