function compute(){
    console.log('I am is cpmpute method');
}
function somethingComplited(args){
    console.log("I am is somethingComplited method");
    console.log(args);
}

function doSomething(args,callback){
    somethingComplited(args);
    process.nextTick(callback)
}
doSomething('123456',function onEnd(){
    compute()
});