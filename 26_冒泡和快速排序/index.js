/**
 * 冒泡排序
 * @param {*} arr
 * @returns
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const array = [5, 3, 6, 1, 4, 2];

// console.log(bubbleSort(array));

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const target = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < target) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([target], quickSort(right));
}
console.log(quickSort(array));
