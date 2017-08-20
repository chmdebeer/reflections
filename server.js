'use strict';

const path = require('path');
const Hapi = require('hapi');
const config = require('nconf');
var pkg = require('./package.json');

config.argv().env().defaults({'NODE_ENV': 'development'});
var nodeEnvironment = config.get('NODE_ENV');
config.file({ file: path.join(__dirname, 'server', 'config', 'config.json') });

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.app.package = pkg;
server.app.config = config;

module.exports = server;

var start = function () {
  server.connection({ port: config.get('port') });

  require('./server/init/plugins')(server);
  require('./server/init/routes')(server);

  server.views({
    engines: {
      html: require('handlebars')
    },
    layout: true,
    isCached: false,
    relativeTo: __dirname,
    path: 'server/views',
    layout: 'default',
    layoutPath: 'server/views/layout',
    partialsPath: 'server/views/partials',
    helpersPath: 'server/views/helpers'
  });

  if (require.main === module) {
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
};

start();
