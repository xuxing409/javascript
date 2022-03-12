// 创建正则有两种方式  1.使用//包裹的字面量方式是推荐的做法，但不能在其中使用变量
let hd = "houdunren.com"
console.log(/u/.test(hd))

// 虽然可以使用 eval 转换为js语法来实现将变量解析到正则中，但是比较麻烦，所以有变量时建议使用下面的对象创建方式
let a = "u";
console.log(eval(`/${a}/`).test(hd)); //true

// 当正则需要动态创建时使用对象方式
let web = "houdunren";
let reg = new RegExp(web);
console.log(reg.test(hd)); //true
