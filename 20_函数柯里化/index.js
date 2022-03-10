// 函数柯里化通俗易懂的解释：用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。
function currying(fn,...args){
  if(args.length >= fn.length) {  //Function.length 属性指明函数的形参个数。
    return fn(...args)
  }else{
    // 将之前的参数保存起来再返回函数后,再次执行时再将新传入的参数的参数存起来。直到满足参数熟练
    return (...args2) => currying(fn, ...args, ...args2)
  }
}
function fun(arg1,arg2,arg3) {
  console.log(arg1,arg2,arg3);
}
console.log(fun.length);
const curryingFun = currying(fun)
curryingFun(1)(2)(3);  // 1 2 3 
curryingFun(1, 2)(3);  // 1 2 3 
curryingFun(1, 2, 3);  // 1 2 3 


// 应用场景
// 参数复用
function getUrl(protocol, domain, path) {
  return protocol + "://" + domain + "/" + path;
}

var page1 = getUrl('http', 'www.conardli.top', 'page1.html');
var page2 = getUrl('http', 'www.conardli.top', 'page2.html');
// 我们使用currying来简化它：

let conardliSite = currying(simpleURL)('http', 'www.conardli.top');
let page1 = conardliSite('page1.html');    
