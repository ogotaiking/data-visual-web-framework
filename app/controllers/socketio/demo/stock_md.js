module.exports=function(io){
  //io.of is a namespace for differenet software functions
  io.of('/stock_md').on('connection', function(socket){
    socket.on('join', function (rooms) {
        console.log('User:%s subscribed to Symbol: %s', socket.request.user.local.username , rooms);
        console.log(socket.request.user);
        if (Array.isArray(rooms)) {
            rooms.forEach(function(room) {
                socket.join(room);
            });
        } else {
            socket.join(rooms);
        }
    });

    socket.on('leave', function (rooms) {
        console.log('User:%s unsubscribed to Symbol: %s', socket.request.user.local.username , rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach(function(room) {
                socket.leave(room);
            });
        } else {
            socket.leave(rooms);
        }
    });

    socket.on('disconnect', function () {
        console.log('User:%s is disconnected', socket.request.user.local.username );
    });
    setInterval(function(){
      socket.broadcast.to('600838').emit('price', {
          symbol: 'SH600838',
          open: 15.2,
          close: 16.3,
          high: 17.1,
          low: 12.1,
          vol : 12412440
      });
      socket.broadcast.to('600839').emit('price', {
          symbol: 'SH600839',
          open: 15.2,
          close: 16.3,
          high: 17.1,
          low: 12.1,
          vol : 12412440
      });
      socket.to('601398').emit('price', {
          symbol: 'SH601398',
          open: 5.2,
          close: 6.3,
          high: 7.1,
          low: 2.1,
          vol : 12412440
      });
    },2000);





});
};
