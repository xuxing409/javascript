const obj = {
  age: 20,
  colors: ["orange", "green", "blue"],
  friend: { name: "小夏" },
  name: "哈默",
};

// es5 深拷贝
function deepCloneEs5(origin, target) {
  var tar = target || {};
  var toStr = Object.prototype.toString;
  var arrType = "[object Array]";

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === "object" && origin[key] !== null) {
        tar[key] = toStr.call(origin[key]) === arrType ? [] : {};
        deepCloneEs5(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }
  return tar;
}
// var objTar = {}
// deepCloneEs5(obj,objTar)
// obj.age =100;
// obj.name='Tj'
// console.log(obj, objTar);

// es6 深拷贝
function deepClone(obj = {}) {
  // 值类型退出
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 声明拷贝的数组或对象
  let result;

  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 去除原型链上继承的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

// 1.判断是否非引用类型，是则直接返回该值 退出
// 2.日期和正则特殊处理， 使用new包裹处理  正则需要两个参数 source 和flags
// 3.解决循环引用问题，默认参数建立weakmap 存储对象键值对，
// 4.hashmap.get 判断是否已经存在，存在则返回
// 5.返回的target通过 new obj.constructor 建立对象 或者 数组 （总之是处理引用类型，不必管他是数组还是对象）
// 6.遍历obj对象的键， hasOwnProperty找出不是原型的属性， 递归调用deepClone函数
// 7.返回拷贝对象

// es6 升级版深拷贝
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
function deepClonePro(obj, hashMap = new WeakMap()) {
  // 值类型退出
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //  source正则表达式的文本  flags 含有 RegExp 对象 flags 的字符串。 例如/foo/gi source：foo flags：gi
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  // 返回 WeakMap 中与 key 相关联的值，如果 key 不存在则返回 undefined。
  const hashkey = hashMap.get(obj);

  // 存在则返回该值
  if (hashkey) {
    return hashkey;
  }

  const target = new obj.constructor();
  hashMap.set(obj, target);
  for (let key in obj) {
    // 去除原型链上继承的属性
    if (obj.hasOwnProperty(key)) {
      target[key] = deepClonePro(obj[key], hashMap);
    }
  }
  return target;
}
// console.log(obj);

// const obj2 = deepClonePro(obj)

// obj2.name = '小野'
// obj2.friend.name = 'xx'
// obj2.colors[0] = 'red'

// console.log(obj,obj2);

// 循环引用情况使用weakMap处理
let test1 = {};
let test2 = {};
test2.test1 = test1;
test1.test2 = test2;

console.log(deepClonePro(test1));
