module.exports=function(io){
  io.on('connection', function(socket) {
      socket.emit('news', {
          hello: 'world2'
      });
      setTimeout(function(){
        socket.emit('news',{fuck:"haha"});
      },10000);
      socket.on('my other event', function(data) {
          console.log(data);
      });
  });
};
