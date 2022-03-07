function makeIterator(arr) {
  var count = 0
  let result;

  return {
    next: function () {
      result = count < arr.length ?
        {
          value: arr[count++],
          done: false
        } :
        { done: true }
      return result
    }

  }
}

let arr = [1, 2, 3]
let iteratorArr = makeIterator(arr)
// console.log(iteratorArr.next(arr));
// console.log(iteratorArr.next(arr));
// console.log(iteratorArr.next(arr));
// console.log(iteratorArr.next(arr));

let result

while (!((result = iteratorArr.next()).done)) {
  console.log(result);
}
