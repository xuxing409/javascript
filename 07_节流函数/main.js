// 时间戳实现节流 第一次事件肯定触发，最后一次不会触发
function throttle(event, time) {
  let pre = 0;
  return function (...args) {
    if (Date.now() - pre > time) {
      pre = Date.now();
      event.apply(this, args);
    }
  }
}
// 定时器实现 第一次事件不会触发，最后一次一定触发
function throttle(event, time) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        this.timer = null
        event.apply(this, args)
      }, time);
    }

  }
}

// 定时器和时间戳的结合版，也相当于节流和防抖的结合版，第一次和最后一次都会触发
function throttle(event, time) {
  let pre = 0;
  let timer = null;
  return function (...args) {

    if (Date.now() - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      event.apply(this, args);
    }
    // 最后一次一定触发
    else if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, args);
      }, time);
    }
  }
}

