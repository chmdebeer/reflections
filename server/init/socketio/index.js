// var Handlers = require('./handlers');

exports.register = function (server, options, next) {

  var io = require('socket.io')(server.listener);
  console.log('register');
  server.expose('io', io);

  io.on('connection', function (socket) {

    console.log('New connection!' + socket.id);
/*
    setInterval(function() {
      var value = Math.round(Math.random() * 4000);
      io.sockets.emit("action", {
        rpm: value
      });
    }, 2000);
*/
    socket.emit("action", {
      rpm: 0,
      message: "Hello from Hapi!"
    });

    socket.on('new-subscriber', function( data ) {
      console.log('new-subscriber');
      console.log(data);
      socket.broadcast.emit( 'new-subscriber', data );
    });

    socket.on('statechanged', function( data ) {
      console.log('statechanged');
      console.log(data);
      delete data.state.overview;
      socket.broadcast.emit( 'statechanged', data );
    });

    socket.on('multiplex-statechanged', function( data ) {
      console.log('multiplex-statechanged');
      console.log(data);
      if (typeof data.secret == 'undefined' || data.secret == null || data.secret === '') return;
      //if (createHash(data.secret) === data.socketId) {
        data.secret = null;
        socket.broadcast.emit(data.socketId, data);
      //};
    });

    socket.on('statechanged-speaker', function( data ) {
      console.log('statechanged-speaker');
      console.log(data);
      delete data.state.overview;
      socket.broadcast.emit( 'statechanged-speaker', data );
    });

    socket.on('disconnect', function(){
      console.log('Connection lost');
    });

    socket.on('echo', function(msg){
      console.log('echo ' + msg);
      socket.emit("echo", msg);
    });

  });

  next();
};

exports.register.attributes = {
  name: 'hapi-socketio'
};
