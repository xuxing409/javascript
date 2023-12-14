function PromiseAll(promiseArray) {
  //请在此处补全代码
  const result = [];
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      //判断一下传入的参数是否为数组
      return reject(new Error("传入的参数不是数组！"));
    }

    promiseArray.forEach((promiseItem, index) => {
      // promiseArray[i] 可能不是数组，包裹上Promise.resolve 即使不是promise也会返回一个promise包裹，保证.then不会报错
      Promise.resolve(promiseItem)
        .then((res) => {
          result.push(res);
          if (result.length === promiseArray.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("p1");
  }, 1000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("p2");
  }, 2000);
});

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("p3");
  }, 3000);
});

const test = PromiseAll([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

console.log(test);
