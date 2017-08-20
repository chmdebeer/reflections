'use strict';

var base = require('../controllers/base');
var assets = require('../controllers/assets');
var display = require('../controllers/display');

var registerRoutes = function (server) {
  var routes = [
    { method: 'GET', path: '/', config: display.index },

    { method: 'GET', path: '/img/{path*}', config: assets.img },
    { method: 'GET', path: '/css/{path*}', config: assets.css },
    { method: 'GET', path: '/fonts/{path*}', config: assets.fonts },
    { method: 'GET', path: '/js/{path*}', config: assets.js}
  ];

  server.route(routes);
};

module.exports = registerRoutes;
