function debounce(fn, time, flag) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer)
    if (flag && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time);
  }
}
