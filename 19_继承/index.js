function People() {
  this.type = 'prople'
}

People.prototype.eat = function () {
  console.log('吃东西啦');
}

function Man(name) {
  this.name = name;
  this.color = 'black';
}

// 原型继承
Man.prototype = new People()

