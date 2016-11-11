module.exports=function(io){
  io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', socket.request.user.local.username +":" +msg);
  });
});
};
