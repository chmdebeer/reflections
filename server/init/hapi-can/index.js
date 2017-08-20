
exports.register = function (server, options, next) {

	var can = require('socketcan');
	var buffer = require('buffer');

	var channel = can.createRawChannel("can0", true /* ask for timestamps */);
	channel.start();

	function toHex(number) {
	  return ("00000000" + number.toString(16)).slice(-8);
	}

	function dumpPacket(msg) {
	  console.log('got something\r\n')
	  console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
		toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase());
	  if ('hapi-socketio' in server.plugins) {
		  var io = server.plugins['hapi-socketio'].io;
		  console.log(msg.data[6]);
		  console.log(msg.data[7]);
		  var value = ((msg.data[6]<<8) | msg.data[7]);
		  value = value - 4000;
		  console.log(value);
		  io.sockets.emit("action", {
			rpm: value
			});
	  } else {
		  console.log(server.plugins);
	  }
	}

	console.log('Starting Can\r\n')
	channel.addListener("onMessage", dumpPacket);

  next();
};

exports.register.attributes = {
  name: 'hapi-can'
};
