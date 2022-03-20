String.prototype.matchAll = function (reg) {
  let res = this.match(reg);
  // console.log(res);

  if (res) {
    let str = this.replace(res[0], "^".repeat(res[0].length));

    let match = str.matchAll(reg) || [];
    return [res, ...match];
  }
};

let hd = "houdunren";

console.log(hd.matchAll(/(u)/i));
