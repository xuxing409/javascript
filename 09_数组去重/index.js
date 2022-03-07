// 方法1 new Set()
const arr = [1, 2, 2, 3]


const newArr = Array.from(new Set(arr))


console.log(newArr);

// 方法2 filter + indexof

const unique = arr => arr.filter((e, i) => arr.indexOf(e) === i);

// 去除重复的值，只要重复都去掉
const filterNonUnique = arr => arr.filter(i => 
  arr.indexOf(i) === arr.lastIndexOf(i)
)

// 通过比较相邻数字是否重复，将排序后的数组进行去重
const unique = (array) => {
  array.sort((a, b) => a - b);
  let pre = 0;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!i || array[i] != array[pre]) {
      result.push(array[i]);
    }
    pre = i;
  }
  return result;
}
