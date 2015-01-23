var eventEmitter=require('events').EventEmitter;
var event=new eventEmitter;
event.on('myFirstEv',function(){
    console.log('myFirstEvent');
});
event.emit('myFirstEv');