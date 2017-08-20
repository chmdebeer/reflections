'use strict';

var fs = require('fs');


var registerPlugins = function (server) {

  var plugins = [
    require('inert'),
    require('vision'),
    require('./socketio'),
    require('./hapi-can')
  ];

  const goodOptions = {
    ops: {
      interval: 100000
    },
    reporters: {
      myConsoleReporter: [
        {
          module: 'good-console'
        }, 'stdout'
      ]
    }
  };

  plugins.push({
    register: require('good'),
    options: goodOptions
  });

  server.register(plugins, function (err) {
    if (err) {
      throw err;
    }
  });

};

module.exports = registerPlugins;
