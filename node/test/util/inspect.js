var util=require('util');
function A(){
    this.name='赵伟';
    this.age=25;
    this.showName=function(){
        console.log(this.name);
    }
}

var _a=new A();
console.log(util.inspect(_a,true,3,true));