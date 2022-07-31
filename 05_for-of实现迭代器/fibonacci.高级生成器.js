
function* fibonacci() {
  var fn1 = 0;
  var fn2 = 1;
  while (true) {
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset) {
        fn1 = 0;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
console.log(sequence.next());     // 0
console.log(sequence.next());     // 1
console.log(sequence.next());     // 1
console.log(sequence.next());     // 2
console.log(sequence.next());     // 3
console.log(sequence.next());     // 5
console.log(sequence.next());     // 8
// next() 方法也接受一个参数用于修改生成器内部状态。
// 传递给 next() 的参数值会被 yield 接收。
// 要注意的是，传给第一个 next() 的值会被忽略。因为第一次调用没有记录任何内容，因为生成器最初没有产生任何结果。
console.log(sequence.next(true)); // 0  向next传递值，值会作为上一次yeild的返回值   
console.log(sequence.next());     // 1
console.log(sequence.next());     // 1
console.log(sequence.next());     // 2
