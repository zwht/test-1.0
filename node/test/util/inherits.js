var util = require('util');
function a() {
    this.name = "赵伟";
    this.age = 25;
    this.showName = function () {
        console.log(this.name);
    }
}
a.prototype.showAge = function () {
    console.log(this.age);
};
function b() {
    this.age = 25;
}
util.inherits(b, a);

var _a = new a();
console.log(_a.name);
_a.showName();
_a.showAge();

var _b = new b();
console.log(_b.age);
_b.showAge();
//_b.showName();


